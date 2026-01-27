"use client";

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Category, Product } from '@/lib/types';
import { useStore } from '@/context/StoreContext';
import styles from './page.module.css';
import { Filter, Minus, Plus, ShoppingCart, SearchX } from 'lucide-react';
import SideCart from './SideCart';
import { useSearchParams } from 'next/navigation';

const CATEGORIES: Category[] = ['Frutos Secos', 'Frutas Desecadas', 'Especias y Condimentos', 'Harinas', 'Semillas y Legumbres', 'Maní', 'Cereales', 'Aceites', 'Arroz', 'Suplementos', 'Otros'];

const WEIGHT_OPTIONS = [
    { value: 1000, label: '1kg', multiplier: 1 },
    { value: 500, label: '500g', multiplier: 0.5 },
    { value: 250, label: '250g', multiplier: 0.25 }
];

function ProductCard({ product, onAdd }: { product: Product, onAdd: () => void }) {
    const { addToCart, isWholesale } = useStore();
    const [selectedWeight, setSelectedWeight] = useState(WEIGHT_OPTIONS[0]);
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);

    const isOutOfStock = product.stock === 0;

    const basePrice = isWholesale ? product.priceWholesale : product.priceRetail;
    const adjustedPrice = basePrice * selectedWeight.multiplier;
    const totalPrice = adjustedPrice * quantity;

    const handleAddToCart = () => {
        if (isOutOfStock) return;
        const modifiedProduct = {
            ...product,
            priceRetail: adjustedPrice,
            priceWholesale: adjustedPrice,
            name: `${product.name} (${selectedWeight.label})`
        };
        addToCart(modifiedProduct, quantity);
        setShowToast(true);
        onAdd(); // Abrir el carrito lateral
        setTimeout(() => setShowToast(false), 2000);
    };

    return (
        <div className={styles.productCard} style={{
            position: 'relative',
            opacity: isOutOfStock ? 0.7 : 1,
            filter: isOutOfStock ? 'grayscale(0.6)' : 'none'
        }}>
            {/* Toast de Agregado */}
            {showToast && (
                <div className="toast-in" style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    left: '10px',
                    background: 'white',
                    padding: '0.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    border: '2px solid var(--primary)'
                }}>
                    <span style={{ fontSize: '1.2rem' }}>🌰</span>
                    <span style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary)' }}>¡AGREGADO!</span>
                </div>
            )}

            <div className={styles.imageContainer}>
                {product.image ? (
                    <img src={product.image} alt={product.name} style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }} />
                ) : (
                    <span>{product.name}</span>
                )}

                {/* Overlay de Sin Stock */}
                {isOutOfStock && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 3,
                        color: 'white',
                        backdropFilter: 'blur(2px)'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '0.5rem', filter: 'grayscale(1)' }}>🌰💧</div>
                        <span style={{
                            background: '#ff4444',
                            padding: '4px 12px',
                            borderRadius: '50px',
                            fontWeight: 900,
                            fontSize: '0.9rem',
                            letterSpacing: '1px'
                        }}>SIN STOCK</span>
                        <p style={{ margin: '5px 0 0', fontSize: '0.7rem', fontWeight: 600 }}>Pronto volveremos...</p>
                    </div>
                )}

                {product.isBestSeller && !isOutOfStock && (
                    <span style={{
                        position: 'absolute', top: 10, left: 10, background: 'var(--secondary)', color: 'black',
                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', zIndex: 2
                    }}>
                        Bestseller
                    </span>
                )}
            </div>

            <div className={styles.productInfo}>
                <div className={styles.productCategory}>{product.category}</div>
                <h3 className={styles.productName}>{product.name}</h3>

                <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: '2.5rem'
                }}>
                    {product.description}
                </p>

                {/* Weights Selector */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem' }}>
                    {WEIGHT_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            disabled={isOutOfStock}
                            onClick={() => setSelectedWeight(opt)}
                            style={{
                                flex: 1,
                                padding: '6px 2px',
                                fontSize: '0.75rem',
                                borderRadius: '8px',
                                border: selectedWeight.value === opt.value ? '2px solid var(--primary)' : '1px solid #ddd',
                                background: isOutOfStock ? '#eee' : (selectedWeight.value === opt.value ? 'var(--primary)' : 'white'),
                                color: selectedWeight.value === opt.value ? 'white' : '#666',
                                fontWeight: 700,
                                cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                {/* Info de precio y cantidad */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div className={styles.productPrice} style={{
                        margin: '0',
                        fontSize: '1.2rem',
                        color: isOutOfStock ? '#888' : 'var(--primary)',
                        textDecoration: isOutOfStock ? 'line-through' : 'none'
                    }}>
                        ${new Intl.NumberFormat('es-AR').format(totalPrice)}
                    </div>

                    {/* Quantity Selector */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: isOutOfStock ? '#eee' : '#f5f5f5',
                        padding: '4px 8px',
                        borderRadius: '10px'
                    }}>
                        <button
                            disabled={isOutOfStock}
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            style={{ background: 'none', border: 'none', padding: '2px', color: isOutOfStock ? '#aaa' : 'var(--primary)', display: 'flex', alignItems: 'center', cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}
                        >
                            <Minus size={16} strokeWidth={3} />
                        </button>
                        <span style={{ fontWeight: 800, fontSize: '0.9rem', minWidth: '15px', textAlign: 'center', color: isOutOfStock ? '#aaa' : 'inherit' }}>{quantity}</span>
                        <button
                            disabled={isOutOfStock}
                            onClick={() => setQuantity(quantity + 1)}
                            style={{ background: 'none', border: 'none', padding: '2px', color: isOutOfStock ? '#aaa' : 'var(--primary)', display: 'flex', alignItems: 'center', cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}
                        >
                            <Plus size={16} strokeWidth={3} />
                        </button>
                    </div>
                </div>

                <button
                    disabled={isOutOfStock}
                    className={styles.addToCartBtn}
                    onClick={handleAddToCart}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        backgroundColor: isOutOfStock ? '#ccc' : 'var(--primary)',
                        cursor: isOutOfStock ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isOutOfStock ? 'AGOTADO 😿' : 'AGREGAR AL CARRITO'}
                </button>
            </div>
        </div>
    );
}

export default function TiendaClient({ initialProducts }: { initialProducts: Product[] }) {
    const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartCount } = useStore();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('q')?.toLowerCase() || '';

    const filteredProducts = useMemo(() => {
        return initialProducts
            .filter(p => {
                const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
                const matchesSearch = !searchQuery ||
                    p.name.toLowerCase().includes(searchQuery) ||
                    p.description.toLowerCase().includes(searchQuery);
                return matchesCategory && matchesSearch;
            });
    }, [initialProducts, selectedCategory, searchQuery]);

    return (
        <>
            <Navbar />

            <div className="container">
                <header style={{ padding: '1.5rem 0 0.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1 className="h2">Nuestros Productos</h1>
                        <p className="body-lg" style={{ color: 'var(--text-secondary)' }}>
                            {filteredProducts.length} productos encontrados
                        </p>
                    </div>

                    {/* Botón flotante de carrito */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '50px',
                            fontWeight: 800,
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            marginBottom: '1rem',
                            position: 'relative'
                        }}
                    >
                        <ShoppingCart size={20} />
                        MI PEDIDO
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-5px',
                                background: 'red',
                                color: 'white',
                                borderRadius: '50%',
                                width: '22px',
                                height: '22px',
                                fontSize: '0.7rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid white'
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </button>
                </header>

                <div className={styles.shopContainer}>
                    {/* Sidebar Filtros */}
                    <aside className={styles.filters}>
                        <div className={styles.filterSection}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <Filter size={20} />
                                <h3 className={styles.filterTitle} style={{ margin: 0 }}>Categorías</h3>
                            </div>

                            <div className={styles.categoryList}>
                                <button
                                    className={`${styles.categoryBtn} ${selectedCategory === 'Todos' ? styles.active : ''}`}
                                    onClick={() => setSelectedCategory('Todos')}
                                >
                                    Todos
                                </button>
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.active : ''}`}
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Grid de Productos */}
                    <div style={{ flex: 1 }}>
                        {filteredProducts.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '3rem 1rem',
                                background: 'white',
                                borderRadius: '24px',
                                boxShadow: 'var(--shadow-sm)',
                                border: '1px solid #eee'
                            }}>
                                <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🔍🥜</div>
                                <h2 className="h3" style={{ marginBottom: '1rem' }}>No encontramos lo que buscás</h2>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                    Probá con otra palabra o revisá nuestras categorías.
                                </p>
                                <button
                                    onClick={() => window.location.href = '/tienda'}
                                    className="btn btn-outline"
                                    style={{ padding: '0.75rem 2rem' }}
                                >
                                    Ver todos los productos
                                </button>
                            </div>
                        ) : (
                            <div className={styles.productsGrid}>
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAdd={() => {
                                            setIsCartOpen(true);
                                            // Cerrar automáticamente después de 1.5 segundos
                                            setTimeout(() => setIsCartOpen(false), 1500);
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Carrito Lateral */}
            <SideCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            <Footer />
        </>
    );
}
