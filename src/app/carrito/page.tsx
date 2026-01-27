"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
    const { cart, removeFromCart, clearCart, cartTotal, isWholesale } = useStore();

    return (
        <>
            <Navbar />
            <div className="container" style={{ padding: '2rem 0' }}>
                <header style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/tienda" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="h2" style={{ margin: 0 }}>Carrito de Compras</h1>
                </header>

                {cart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                        <div style={{ fontSize: '5rem', marginBottom: '2rem' }}>🛒</div>
                        <h2 className="h3">Tu carrito está vacío</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>¡Explorá nuestros deliciosos frutos secos y empezá a sumar!</p>
                        <Link href="/tienda" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>
                            IR A LA TIENDA
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) 350px', gap: '3rem' }}>
                        {/* Items List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {cart.map((item) => (
                                <div key={item.id} style={{
                                    display: 'flex',
                                    gap: '1.25rem',
                                    padding: '1rem 1.25rem',
                                    background: 'white',
                                    borderRadius: '16px',
                                    border: '1px solid #eee',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                                    alignItems: 'center',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                        border: '1px solid #f0f0f0'
                                    }}>
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', fontSize: '1.5rem' }}>🌰</div>
                                        )}
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2c3e50', marginBottom: '0.5rem' }}>{item.name}</h3>
                                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                            <div>
                                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#888', fontWeight: 600 }}>CANTIDAD</p>
                                                <p style={{ margin: 0, fontWeight: 700 }}>{item.quantity} un.</p>
                                            </div>
                                            <div>
                                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#888', fontWeight: 600 }}>PRECIO UNITARIO</p>
                                                <p style={{ margin: 0, fontWeight: 700, color: 'var(--primary)' }}>${new Intl.NumberFormat('es-AR').format(isWholesale ? item.priceWholesale : item.priceRetail)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'right', minWidth: '120px' }}>
                                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#888', fontWeight: 600 }}>SUBTOTAL</p>
                                        <p style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--primary)', margin: 0 }}>
                                            ${new Intl.NumberFormat('es-AR').format((isWholesale ? item.priceWholesale : item.priceRetail) * item.quantity)}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        style={{
                                            background: '#fff5f5',
                                            color: '#ff4444',
                                            padding: '10px',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.2s ease',
                                            marginLeft: '1rem'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.background = '#ffebeb'}
                                        onMouseOut={(e) => e.currentTarget.style.background = '#fff5f5'}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', padding: '0 1rem' }}>
                                <Link href="/tienda" style={{
                                    color: 'var(--primary)',
                                    fontWeight: 800,
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    border: '3px solid var(--primary)',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '12px',
                                    transition: 'all 0.1s ease',
                                    backgroundColor: 'white'
                                }}
                                    onMouseDown={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--primary)';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onMouseUp={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.color = 'var(--primary)';
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#f0fdf4';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.color = 'var(--primary)';
                                    }}
                                >
                                    <ArrowLeft size={20} /> SEGUIR COMPRANDO
                                </Link>
                                <button
                                    onClick={clearCart}
                                    style={{ background: 'none', border: 'none', color: '#888', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Vaciar mi carrito
                                </button>
                            </div>
                        </div>

                        {/* Summary Section */}
                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '20px',
                            height: 'fit-content',
                            border: '1px solid #eee',
                            boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
                            position: 'sticky',
                            top: '100px'
                        }}>
                            <h3 className="h3" style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem' }}>
                                <ShoppingBag size={22} /> Total Pedido
                            </h3>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#666', fontWeight: 600, fontSize: '0.9rem' }}>
                                <span>Subtotal</span>
                                <span>${new Intl.NumberFormat('es-AR').format(cartTotal)}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', padding: '1.25rem 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                                <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>TOTAL</span>
                                <span style={{ fontWeight: 900, fontSize: '1.6rem', color: 'var(--primary)' }}>
                                    ${new Intl.NumberFormat('es-AR').format(cartTotal)}
                                </span>
                            </div>

                            <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', textDecoration: 'none', padding: '1rem', fontSize: '1rem', borderRadius: '12px' }}>
                                INICIAR COMPRA 🚀
                            </Link>

                            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#888', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                🔒 Pago 100% Seguro
                            </p>

                            <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '2rem' }}>
                                🥜😊✨
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
