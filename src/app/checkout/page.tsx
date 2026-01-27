"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import styles from './page.module.css';
import Link from 'next/link';

export default function CheckoutPage() {
    const { cart, cartTotal, isWholesale, clearCart } = useStore();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dni: '',
        address: '',
        city: '',
        province: '',
        zip: '',
    });

    const [deliveryMethod, setDeliveryMethod] = useState<'envio' | 'retiro'>('envio');
    const [paymentMethod, setPaymentMethod] = useState<'transferencia' | 'efectivo' | 'tarjeta'>('transferencia');
    const [isSuccess, setIsSuccess] = useState(false);

    // Mock Shipping Cost Logic
    const shippingCost = deliveryMethod === 'envio' ? (cartTotal > 50000 ? 0 : 3500) : 0;

    // Mock Payment Logic
    const getPaymentModifier = () => {
        if (paymentMethod === 'efectivo') return -0.10; // 10% discount
        // if (paymentMethod === 'tarjeta') return 0.05; // 5% surcharge
        return 0; // Transferencia same price
    };

    const discountAmount = cartTotal * (getPaymentModifier() < 0 ? Math.abs(getPaymentModifier()) : 0);
    const surchargeAmount = cartTotal * (getPaymentModifier() > 0 ? getPaymentModifier() : 0);

    const finalTotal = cartTotal + shippingCost - discountAmount + surchargeAmount;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would send data to backend
        console.log('Order Data:', {
            customer: formData,
            cart,
            deliveryMethod,
            paymentMethod,
            totals: {
                subtotal: cartTotal,
                shipping: shippingCost,
                discount: discountAmount,
                final: finalTotal
            }
        });

        // Simulate success
        setIsSuccess(true);
        clearCart();
    };

    if (isSuccess) {
        return (
            <>
                <Navbar />
                <div className="container section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', color: 'white' }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h1 className="h2" style={{ marginBottom: '1rem' }}>¡Gracias por tu compra!</h1>
                    <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: '2rem' }}>
                        Tu pedido ha sido recibido correctamente. Te enviamos un email con los detalles y los pasos a seguir para el pago.
                    </p>
                    <Link href="/" className="btn btn-primary">Volver al inicio</Link>
                </div>
                <Footer />
            </>
        );
    }

    if (cart.length === 0) {
        return (
            <>
                <Navbar />
                <div className="container section">
                    <p>No hay items en el carrito para finalizar la compra.</p>
                    <Link href="/tienda" className="btn btn-primary" style={{ marginTop: '1rem' }}>Ir a la tienda</Link>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div style={{ padding: '3rem 0' }}>
                    <h1 className="h2" style={{ marginBottom: '2rem' }}>Finalizar Compra</h1>

                    <form onSubmit={handleSubmit} className={styles.checkoutContainer}>

                        {/* LEFT COLUMN - FORMS */}
                        <div className={styles.formSection}>

                            {/* 1. Datos Personales */}
                            <section>
                                <h2 className={styles.sectionTitle}>1. Datos Personales</h2>
                                <div className={styles.grid2}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Nombre</label>
                                        <input required name="firstName" className={styles.input} value={formData.firstName} onChange={handleInputChange} />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Apellido</label>
                                        <input required name="lastName" className={styles.input} value={formData.lastName} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className={styles.grid2}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Email</label>
                                        <input required type="email" name="email" className={styles.input} value={formData.email} onChange={handleInputChange} />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Teléfono</label>
                                        <input required type="tel" name="phone" className={styles.input} value={formData.phone} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </section>

                            {/* 2. Entrega */}
                            <section>
                                <h2 className={styles.sectionTitle}>2. Método de Entrega</h2>
                                <div className={styles.radioGroup} style={{ marginBottom: '2rem' }}>
                                    <label className={`${styles.radioOption} ${deliveryMethod === 'envio' ? styles.selected : ''}`}>
                                        <input type="radio" name="delivery" className={styles.radioInput} checked={deliveryMethod === 'envio'} onChange={() => setDeliveryMethod('envio')} />
                                        <div style={{ flex: 1 }}>
                                            <span style={{ fontWeight: 600 }}>Envío a domicilio</span>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Te lo llevamos a la puerta de tu casa.</div>
                                        </div>
                                        <span style={{ fontWeight: 600 }}>{cartTotal > 50000 ? 'GRATIS' : '$3.500'}</span>
                                    </label>

                                    <label className={`${styles.radioOption} ${deliveryMethod === 'retiro' ? styles.selected : ''}`}>
                                        <input type="radio" name="delivery" className={styles.radioInput} checked={deliveryMethod === 'retiro'} onChange={() => setDeliveryMethod('retiro')} />
                                        <div>
                                            <span style={{ fontWeight: 600 }}>Retiro en Local</span>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Calle Falsa 123, Buenos Aires.</div>
                                        </div>
                                        <span style={{ fontWeight: 600, color: 'var(--success)' }}>GRATIS</span>
                                    </label>
                                </div>

                                {deliveryMethod === 'envio' && (
                                    <div className="fade-in">
                                        <h3 className="h3" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Dirección de envío</h3>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.label}>Calle y Número</label>
                                            <input required name="address" className={styles.input} value={formData.address} onChange={handleInputChange} />
                                        </div>
                                        <div className={styles.grid2}>
                                            <div className={styles.inputGroup}>
                                                <label className={styles.label}>Ciudad</label>
                                                <input required name="city" className={styles.input} value={formData.city} onChange={handleInputChange} />
                                            </div>
                                            <div className={styles.inputGroup}>
                                                <label className={styles.label}>Código Postal</label>
                                                <input required name="zip" className={styles.input} value={formData.zip} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* 3. Pago */}
                            <section>
                                <h2 className={styles.sectionTitle}>3. Método de Pago</h2>
                                <div className={styles.radioGroup}>
                                    <label className={`${styles.radioOption} ${paymentMethod === 'transferencia' ? styles.selected : ''}`}>
                                        <input type="radio" name="payment" className={styles.radioInput} checked={paymentMethod === 'transferencia'} onChange={() => setPaymentMethod('transferencia')} />
                                        <div>
                                            <span style={{ fontWeight: 600 }}>Transferencia Bancaria</span>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Datos bancarios al finalizar.</div>
                                        </div>
                                    </label>

                                    <label className={`${styles.radioOption} ${paymentMethod === 'efectivo' ? styles.selected : ''}`}>
                                        <input type="radio" name="payment" className={styles.radioInput} checked={paymentMethod === 'efectivo'} onChange={() => setPaymentMethod('efectivo')} />
                                        <div style={{ flex: 1 }}>
                                            <span style={{ fontWeight: 600 }}>Efectivo (Contra entrega)</span>
                                        </div>
                                        <span className="badge badge-new" style={{ background: 'var(--success)', color: 'white' }}>10% OFF</span>
                                    </label>
                                </div>
                            </section>

                        </div>

                        {/* RIGHT COLUMN - SUMMARY */}
                        <aside>
                            <div className={styles.summaryCard}>
                                <h3 className="h3" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Resumen del Pedido</h3>

                                <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
                                    {cart.map(item => (
                                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                                            <span>{item.quantity}x {item.name}</span>
                                            <span>${new Intl.NumberFormat('es-AR').format((isWholesale ? item.priceWholesale : item.priceRetail) * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.summaryRow}>
                                    <span>Subtotal</span>
                                    <span>${new Intl.NumberFormat('es-AR').format(cartTotal)}</span>
                                </div>

                                <div className={styles.summaryRow}>
                                    <span>Envío</span>
                                    <span>{shippingCost === 0 ? 'Gratis' : `$${new Intl.NumberFormat('es-AR').format(shippingCost)}`}</span>
                                </div>

                                {discountAmount > 0 && (
                                    <div className={styles.summaryRow} style={{ color: 'var(--success)' }}>
                                        <span>Descuento (Efectivo)</span>
                                        <span>-${new Intl.NumberFormat('es-AR').format(discountAmount)}</span>
                                    </div>
                                )}

                                <div className={`${styles.summaryRow} ${styles.total}`}>
                                    <span>Total</span>
                                    <span>${new Intl.NumberFormat('es-AR').format(finalTotal)}</span>
                                </div>

                                <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                                    Finalizar Compra
                                </button>

                                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                    Compra 100% Segura
                                </div>
                            </div>
                        </aside>

                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
