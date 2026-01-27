"use client";

import { useState } from 'react';
import { Product } from '@/lib/types';
import { updateProductAction, uploadImageAction } from '@/app/actions';
import { X, Upload } from 'lucide-react';

interface ProductFormProps {
    initialProduct?: Product;
    onClose: () => void;
}

export default function ProductForm({ initialProduct, onClose }: ProductFormProps) {
    const [product, setProduct] = useState<Product>(initialProduct || {
        id: crypto.randomUUID(),
        name: '',
        slug: '',
        category: 'Frutos Secos',
        description: '',
        priceRetail: 0,
        priceWholesale: 0,
        unit: 'kg',
        stock: 0,
        image: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        // Handle number inputs
        if (type === 'number') {
            setProduct(prev => ({ ...prev, [name]: Number(value) }));
        } else {
            setProduct(prev => ({ ...prev, [name]: value }));
        }

        // Auto-generate slug from name if slug is empty
        if (name === 'name' && !initialProduct) {
            setProduct(prev => ({ ...prev, slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }));
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        try {
            const imagePath = await uploadImageAction(formData);
            setProduct(prev => ({ ...prev, image: imagePath }));
        } catch (error) {
            alert('Error subiendo imagen');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await updateProductAction(product);
        setLoading(false);
        onClose();
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-secondary)' }}><X /></button>
                <h2 className="h3" style={{ marginBottom: '1.5rem' }}>{initialProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Nombre</label>
                            <input required name="name" value={product.name} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '6px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Categoría</label>
                            <select name="category" value={product.category} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '6px' }}>
                                <option value="Frutos Secos">Frutos Secos</option>
                                <option value="Frutas Desecadas">Frutas Desecadas</option>
                                <option value="Especias y Condimentos">Especias y Condimentos</option>
                                <option value="Harinas">Harinas</option>
                                <option value="Semillas y Legumbres">Semillas y Legumbres</option>
                                <option value="Maní">Maní</option>
                                <option value="Cereales">Cereales</option>
                                <option value="Aceites">Aceites</option>
                                <option value="Arroz">Arroz</option>
                                <option value="Suplementos">Suplementos</option>
                                <option value="Otros">Otros</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Slug (URL)</label>
                        <input required name="slug" value={product.slug} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '6px', background: '#f9fafb' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Descripción</label>
                        <textarea required name="description" value={product.description} onChange={handleChange} rows={3} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '6px' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Precio Minorista</label>
                            <input required type="number" name="priceRetail" value={product.priceRetail} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '6px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Precio Mayorista</label>
                            <input required type="number" name="priceWholesale" value={product.priceWholesale} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '6px' }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Stock</label>
                            <input required type="number" name="stock" value={product.stock} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '6px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Unidad (ej. kg)</label>
                            <input required name="unit" value={product.unit} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '6px' }} />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Imagen</label>
                        <div style={{ border: '2px dashed var(--border)', padding: '1.5rem', borderRadius: '6px', textAlign: 'center', cursor: 'pointer', position: 'relative' }}>
                            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                            {product.image ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <img src={product.image} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                    <span style={{ fontSize: '0.9rem', color: 'var(--success)' }}>Imagen cargada correctamente</span>
                                </div>
                            ) : (
                                <div style={{ color: 'var(--text-secondary)' }}>
                                    <Upload size={24} style={{ marginBottom: '0.5rem' }} />
                                    <div>Arrastra o haz clic para subir imagen</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        {loading ? 'Guardando...' : 'Guardar Producto'}
                    </button>
                </form>
            </div>
        </div>
    );
}
