"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import styles from './pedido.module.css';
import Link from 'next/link';
import { createOrderAction } from '@/app/actions';
import { Trash2, Plus, Minus, ShoppingBag, Truck, CreditCard, User } from 'lucide-react';

export default function MobileCartPage() {
    const { cart, cartTotal, isWholesale, clearCart, updateQuantity, removeFromCart } = useStore();

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
    const [paymentMethod, setPaymentMethod] = useState<'transferencia' | 'efectivo'>('transferencia');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Shipping Cost Logic
    const shippingCost = deliveryMethod === 'envio' ? (cartTotal > 50000 ? 0 : 3500) : 0;

    // Payment Logic (10% OFF for cash)
    const discountAmount = paymentMethod === 'efectivo' ? cartTotal * 0.10 : 0;
    const finalTotal = cartTotal + shippingCost - discountAmount;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (isSuccess) {
        return (
            <>
                <Navbar />
                <div className={styles.container} style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                    <div style={{ width: '80px', height: '80px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'white' }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h1 style={{ fontWeight: 900, marginBottom: '1rem' }}>¡PEDIDO ENVIADO!</h1>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>
                        Tu pedido ha sido recibido con éxito. Nos pondremos en contacto contigo pronto por WhatsApp o Email.
                    </p>
                    <Link href="/tienda" className={styles.submitBtn}>VOLVER A LA TIENDA</Link>
                </div>
                <Footer />
            </>
        );
    }

    if (cart.length === 0) {
        return (
            <>
                <Navbar />
                <div className={styles.container} style={{ textAlign: 'center', padding: '5rem 1rem' }}>
                    <ShoppingBag size={64} style={{ color: '#ccc', marginBottom: '1.5rem' }} />
                    <h2 style={{ fontWeight: 800 }}>TU CARRITO ESTÁ VACÍO</h2>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>¡Agrega algunos productos deliciosos!</p>
                    <Link href="/tienda" className={styles.submitBtn}>EXPLORAR PRODUCTOS</Link>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.mainTitle}>MI PEDIDO 🛒</h1>

                <form>
                    {/* 1. DATOS DE ENVIO (PRIMARY ON MOBILE) */}
                    <div className={styles.card} style={{ borderTop: '4px solid #D4AF37' }}>
                        <h2 className={styles.cardTitle}><User size={20} /> PASO 1: MIS DATOS</h2>
                        <div className={styles.grid}>
                            <div className={styles.inputGroup}>
                                <label>Nombre *</label>
                                <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Tu nombre" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Apellido *</label>
                                <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Tu apellido" />
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Teléfono (WhatsApp) *</label>
                            <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Ej: 11 1234 5678" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Email *</label>
                            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="ejemplo@correo.com" />
                        </div>
                    </div>

                    {/* 2. ENTREGA */}
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}><Truck size={20} /> PASO 2: ENTREGA</h2>
                        <div className={styles.radioGroup}>
                            <label className={`${styles.radioCard} ${deliveryMethod === 'envio' ? styles.active : ''}`}>
                                <input type="radio" checked={deliveryMethod === 'envio'} onChange={() => setDeliveryMethod('envio')} />
                                <div className={styles.radioContent}>
                                    <strong>Envío a Domicilio</strong>
                                    <span>{cartTotal > 50000 ? 'GRATIS' : '$3.500'}</span>
                                </div>
                            </label>
                            <label className={`${styles.radioCard} ${deliveryMethod === 'retiro' ? styles.active : ''}`}>
                                <input type="radio" checked={deliveryMethod === 'retiro'} onChange={() => setDeliveryMethod('retiro')} />
                                <div className={styles.radioContent}>
                                    <strong>Retiro en Local</strong>
                                    <span>GRATIS</span>
                                </div>
                            </label>
                        </div>

                        {deliveryMethod === 'envio' && (
                            <div className={styles.addressFields}>
                                <div className={styles.inputGroup}>
                                    <label>Calle y Número *</label>
                                    <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="Ej. Av. Rivadavia 1234" />
                                </div>
                                <div className={styles.grid}>
                                    <div className={styles.inputGroup}>
                                        <label>Localidad *</label>
                                        <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="Tu ciudad" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Cód. Postal *</label>
                                        <input required name="zip" value={formData.zip} onChange={handleInputChange} placeholder="CP" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 3. PAGO */}
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}><CreditCard size={20} /> PASO 3: PAGO</h2>
                        <div className={styles.radioGroup}>
                            <label className={`${styles.radioCard} ${paymentMethod === 'transferencia' ? styles.active : ''}`}>
                                <input type="radio" checked={paymentMethod === 'transferencia'} onChange={() => setPaymentMethod('transferencia')} />
                                <div className={styles.radioContent}>
                                    <strong>Transferencia</strong>
                                    <span>Precio de lista</span>
                                </div>
                            </label>
                            <label className={`${styles.radioCard} ${paymentMethod === 'efectivo' ? styles.active : ''}`}>
                                <input type="radio" checked={paymentMethod === 'efectivo'} onChange={() => setPaymentMethod('efectivo')} />
                                <div className={styles.radioContent}>
                                    <strong>Efectivo</strong>
                                    <span style={{ color: '#22c55e' }}>10% DE DESCUENTO</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* 4. TOTAL Y BOTON FINAL */}
                    <div className={styles.totalCard}>
                        <div className={styles.totalRow}>
                            <span>Subtotal</span>
                            <span>${new Intl.NumberFormat('es-AR').format(cartTotal)}</span>
                        </div>
                        <div className={styles.totalRow}>
                            <span>Envío</span>
                            <span>{shippingCost === 0 ? 'GRATIS' : `$${new Intl.NumberFormat('es-AR').format(shippingCost)}`}</span>
                        </div>
                        {discountAmount > 0 && (
                            <div className={styles.totalRow} style={{ color: '#22c55e' }}>
                                <span>Descuento Efectivo</span>
                                <span>-${new Intl.NumberFormat('es-AR').format(discountAmount)}</span>
                            </div>
                        )}
                        <div className={styles.finalTotal}>
                            <span>TOTAL A PAGAR</span>
                            <span>${new Intl.NumberFormat('es-AR').format(finalTotal)}</span>
                        </div>

                        <button
                            type="button"
                            disabled={isLoading}
                            className={styles.submitBtn}
                            onClick={async () => {
                                if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
                                    alert("Por favor completa tus datos (Nombre, Apellido, Teléfono y Email)");
                                    return;
                                }
                                if (deliveryMethod === 'envio' && (!formData.address || !formData.city)) {
                                    alert("Por favor completa tu dirección para el envío");
                                    return;
                                }

                                setIsLoading(true);
                                try {
                                    const newOrder = {
                                        id: crypto.randomUUID(),
                                        customer: { ...formData },
                                        deliveryMethod,
                                        paymentMethod,
                                        date: new Date().toISOString(),
                                        items: cart.map(item => ({
                                            productId: item.id,
                                            productName: item.name,
                                            quantity: item.quantity,
                                            price: isWholesale ? item.priceWholesale : item.priceRetail,
                                            image: item.image
                                        })),
                                        subtotal: cartTotal,
                                        shippingCost: shippingCost,
                                        discount: discountAmount,
                                        total: finalTotal,
                                        status: 'Pendiente' as const,
                                        type: isWholesale ? 'Mayorista' as const : 'Minorista' as const,
                                    };

                                    await createOrderAction(newOrder);
                                    alert("¡PEDIDO RECIBIDO! Nos pondremos en contacto contigo pronto por WhatsApp.");
                                    clearCart();
                                    window.location.href = '/tienda';
                                } catch (error) {
                                    alert("Error al enviar el pedido. Por favor intenta de nuevo.");
                                } finally {
                                    setIsLoading(false);
                                }
                            }}
                        >
                            {isLoading ? 'ENVIANDO...' : 'ENVIAR MI PEDIDO 🚀'}
                        </button>
                    </div>
                </form>

                {/* RESUMEN DE PRODUCTOS (AT THE END ON MOBILE) */}
                <div className={styles.card} style={{ marginTop: '3rem', background: '#fcfcfc' }}>
                    <h2 className={styles.cardTitle} style={{ fontSize: '0.9rem', color: '#888' }}><ShoppingBag size={16} /> Tu Bolsa</h2>
                    <div className={styles.itemList}>
                        {cart.map((item) => (
                            <div key={item.id} className={styles.item} style={{ padding: '0.5rem 0' }}>
                                <div className={styles.itemImage} style={{ width: '40px', height: '40px' }}>
                                    {item.image ? <img src={item.image} alt={item.name} /> : <span>🌰</span>}
                                </div>
                                <div className={styles.itemInfo}>
                                    <h3 style={{ fontSize: '0.85rem' }}>{item.quantity}x {item.name}</h3>
                                </div>
                                <span className={styles.itemPrice} style={{ fontSize: '0.85rem' }}>
                                    ${new Intl.NumberFormat('es-AR').format((isWholesale ? item.priceWholesale : item.priceRetail) * item.quantity)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
}
