"use client";

import { useState, useMemo } from 'react';
import { Product, Category } from '@/lib/types';
import { reorderProductsAction } from '@/app/actions';
import { Move, Save, RefreshCcw, GripVertical, Layers } from 'lucide-react';
import styles from '../admin.module.css';

const CATEGORIES: Category[] = ['Frutos Secos', 'Frutas Desecadas', 'Especias y Condimentos', 'Harinas', 'Semillas y Legumbres', 'Maní', 'Cereales', 'Aceites', 'Arroz', 'Suplementos', 'Otros'];

export default function OrderClient({ initialProducts }: { initialProducts: Product[] }) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [draggedCategory, setDraggedCategory] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Grouping products for display but we still manage a flat list for saving the master order
    // if we want to preserve a global order. However, since the user wants them separated,
    // we'll handle drag and drop within each category section.

    const productsByCategory = useMemo(() => {
        const grouped: Record<string, Product[]> = {};
        CATEGORIES.forEach(cat => {
            grouped[cat] = products.filter(p => p.category === cat);
        });
        return grouped;
    }, [products]);

    const handleDragStart = (index: number, category: string) => {
        setDraggedIndex(index);
        setDraggedCategory(category);
    };

    const handleDragOver = (e: React.DragEvent, targetIndex: number, category: string) => {
        e.preventDefault();
        if (draggedIndex === null || draggedCategory !== category || draggedIndex === targetIndex) return;

        // Find the absolute indices in the main 'products' array
        const categoryProducts = productsByCategory[category];
        const itemToMove = categoryProducts[draggedIndex];
        const targetItem = categoryProducts[targetIndex];

        const absSourceIndex = products.findIndex(p => p.id === itemToMove.id);
        const absTargetIndex = products.findIndex(p => p.id === targetItem.id);

        const newProducts = [...products];
        const [removed] = newProducts.splice(absSourceIndex, 1);
        newProducts.splice(absTargetIndex, 0, removed);

        setProducts(newProducts);
        setDraggedIndex(targetIndex);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDraggedCategory(null);
    };

    const saveOrder = async () => {
        setIsSaving(true);
        try {
            await reorderProductsAction(products);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={{ padding: '1rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '2px solid #eee', paddingBottom: '1.5rem' }}>
                <div>
                    <h1 className="h2" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)' }}>
                        <Move size={28} /> Organizar por Categorías
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontWeight: 500 }}>
                        Ordená tus productos dentro de cada categoría arrastrándolos.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {showSuccess && (
                        <div style={{
                            background: '#dcfce7',
                            color: '#166534',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '12px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                        }}>
                            ✅ ¡Cambios Guardados!
                        </div>
                    )}
                    <button
                        onClick={saveOrder}
                        disabled={isSaving}
                        className="btn btn-primary"
                        style={{ padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: 800 }}
                    >
                        {isSaving ? <RefreshCcw className="spinning" size={20} /> : <Save size={20} />}
                        {isSaving ? 'Guardando...' : 'GUARDAR TODO'}
                    </button>
                </div>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {CATEGORIES.map((category) => {
                    const categoryItems = productsByCategory[category];
                    if (categoryItems.length === 0) return null;

                    return (
                        <section key={category} style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '24px', border: '1px solid #eee' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: '10px' }}>
                                    <Layers size={18} />
                                </div>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#333', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    {category}
                                    <span style={{ fontSize: '0.8rem', color: '#888', marginLeft: '1rem', fontWeight: 600, textTransform: 'none' }}>
                                        ({categoryItems.length} productos)
                                    </span>
                                </h2>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                                gap: '1rem'
                            }}>
                                {categoryItems.map((product, idx) => (
                                    <div
                                        key={product.id}
                                        draggable
                                        onDragStart={() => handleDragStart(idx, category)}
                                        onDragOver={(e) => handleDragOver(e, idx, category)}
                                        onDragEnd={handleDragEnd}
                                        style={{
                                            background: 'white',
                                            borderRadius: '16px',
                                            border: '2px solid',
                                            borderColor: (draggedIndex === idx && draggedCategory === category) ? 'var(--primary)' : 'transparent',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            cursor: 'grab',
                                            transition: 'all 0.2s cubic-bezier(0.1, 0.7, 0.1, 1)',
                                            boxShadow: (draggedIndex === idx && draggedCategory === category) ? '0 10px 25px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.05)',
                                            transform: (draggedIndex === idx && draggedCategory === category) ? 'scale(1.05)' : 'scale(1)',
                                            zIndex: (draggedIndex === idx && draggedCategory === category) ? 10 : 1,
                                            opacity: (draggedCategory === category && draggedIndex !== null && draggedIndex !== idx) ? 0.9 : 1
                                        }}
                                    >
                                        <div style={{
                                            position: 'absolute',
                                            top: '6px',
                                            right: '6px',
                                            background: 'rgba(255,255,255,0.8)',
                                            borderRadius: '6px',
                                            padding: '2px',
                                            color: 'var(--primary)',
                                            zIndex: 2,
                                            backdropFilter: 'blur(4px)',
                                            border: '1px solid #eee'
                                        }}>
                                            <GripVertical size={14} />
                                        </div>

                                        <div style={{ height: '110px', background: '#f0f0f0' }}>
                                            {product.image ? (
                                                <img src={product.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🌰</div>
                                            )}
                                        </div>

                                        <div style={{ padding: '0.6rem' }}>
                                            <h3 style={{
                                                fontSize: '0.8rem',
                                                fontWeight: 800,
                                                margin: '0',
                                                lineHeight: '1.2',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                height: '1.9rem'
                                            }}>
                                                {product.name}
                                            </h3>
                                            <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.8rem', marginTop: '4px' }}>
                                                ${new Intl.NumberFormat('es-AR').format(product.priceRetail)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>

            <style jsx global>{`
                .spinning {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
