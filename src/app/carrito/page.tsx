"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import styles from './pedido.module.css';
import Link from 'next/link';
import { createOrderAction } from '@/app/actions';
import { Trash2, Plus, Minus, ShoppingBag, Truck, CreditCard, User, ChevronLeft, ArrowRight } from 'lucide-react';

export default function MobileCartPage() {
    const { cart, cartTotal, isWholesale, clearCart, updateQuantity, removeFromCart } = useStore();
    const [step, setStep] = useState(1); // 1: Resumen, 2: Datos

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
    const [isLoading, setIsLoading] = useState(false);

    // Auto-scroll top when step changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    const shippingCost = deliveryMethod === 'envio' ? (cartTotal > 50000 ? 0 : 3500) : 0;
    const discountAmount = paymentMethod === 'efectivo' ? cartTotal * 0.10 : 0;
    const finalTotal = cartTotal + shippingCost - discountAmount;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (cart.length === 0) {
        return (
            <>
                <Navbar />
                <div className={styles.container} style={{ textAlign: 'center', padding: '5rem 1rem' }}>
                    <div style={{ fontSize: '4rem' }}>🛒</div>
                    <h2 style={{ fontWeight: 800, margin: '1rem 0' }}>EL CARRITO ESTÁ VACÍO</h2>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>Agregá productos para continuar.</p>
                    <Link href="/tienda" className={styles.submitBtn}>IR A LA TIENDA</Link>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
            <Navbar />

            <div className={styles.container}>

                {/* CABECERA DE PASOS */}
                <div className={styles.stepHeader}>
                    <div className={`${styles.stepIndicator} ${step >= 1 ? styles.stepActive : ''}`}>
                        <div className={styles.stepNumber}>1</div>
                        <span>CARRITO</span>
                    </div>
                    <div className={styles.stepLine} />
                    <div className={`${styles.stepIndicator} ${step >= 2 ? styles.stepActive : ''}`}>
                        <div className={styles.stepNumber}>2</div>
                        <span>ENVÍO</span>
                    </div>
                </div>

                {step === 1 ? (
                    <div className={styles.contentWrapper}>
                        <h1 className={styles.titleMobile}>Resumen de Compra</h1>
                        <div className={styles.card}>
                            <div className={styles.itemList}>
                                {cart.map((item) => (
                                    <div key={item.id} className={styles.itemMobile}>
                                        <div className={styles.itemImageMobile}>
                                            {item.image ? <img src={item.image} alt={item.name} /> : <span>🥜</span>}
                                        </div>
                                        <div className={styles.itemDetailsMobile}>
                                            <h3>{item.name}</h3>
                                            <div className={styles.itemRowMobile}>
                                                <div className={styles.qtyBoxMobile}>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                                </div>
                                                <span className={styles.priceMobile}>
                                                    ${new Intl.NumberFormat('es-AR').format((isWholesale ? item.priceWholesale : item.priceRetail) * item.quantity)}
                                                </span>
                                            </div>
                                        </div>
                                        <button className={styles.trashBtn} onClick={() => removeFromCart(item.id)}><Trash2 size={18} /></button>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.totalBoxMobile}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span>Subtotal:</span>
                                    <span>${new Intl.NumberFormat('es-AR').format(cartTotal)}</span>
                                </div>
                                <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>* No incluye costo de envío</p>
                            </div>
                        </div>

                        <div className={styles.actionFixed}>
                            <button
                                className={styles.mainActionBtn}
                                onClick={() => setStep(2)}
                            >
                                CONTINUAR AL ENVÍO <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.contentWrapper}>
                        <button className={styles.backBtn} onClick={() => setStep(1)}>
                            <ChevronLeft size={20} /> MODIFICAR CARRITO
                        </button>

                        <h1 className={styles.titleMobile}>Tus Datos</h1>

                        <div className={styles.card}>
                            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>Completá con tus datos para que podamos coordinar la entrega.</p>

                            <div className={styles.formGroupMobile}>
                                <label>Nombre Completo *</label>
                                <input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Ej: Juan Perez" />
                            </div>

                            <div className={styles.formGroupMobile}>
                                <label>WhatsApp / Teléfono *</label>
                                <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="Ej: 11 1234 5678" />
                            </div>

                            <div className={styles.formGroupMobile}>
                                <label>Email *</label>
                                <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="tu@email.com" />
                            </div>
                        </div>

                        <div className={styles.card}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Entrega</h2>
                            <div className={styles.optsList}>
                                <label className={`${styles.optItem} ${deliveryMethod === 'envio' ? styles.optActive : ''}`}>
                                    <input type="radio" checked={deliveryMethod === 'envio'} onChange={() => setDeliveryMethod('envio')} />
                                    <div>
                                        <strong>Envío a Domicilio</strong>
                                        <small>{cartTotal > 50000 ? 'GRATIS' : '$3.500'}</small>
                                    </div>
                                </label>
                                <label className={`${styles.optItem} ${deliveryMethod === 'retiro' ? styles.optActive : ''}`}>
                                    <input type="radio" checked={deliveryMethod === 'retiro'} onChange={() => setDeliveryMethod('retiro')} />
                                    <div>
                                        <strong>Retiro en Local</strong>
                                        <small>GRATIS</small>
                                    </div>
                                </label>
                            </div>

                            {deliveryMethod === 'envio' && (
                                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
                                    <div className={styles.formGroupMobile}>
                                        <label>Calle y Número *</label>
                                        <input name="address" value={formData.address} onChange={handleInputChange} placeholder="Ej: Av. Rivadavia 123" />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className={styles.formGroupMobile}>
                                            <label>Ciudad</label>
                                            <input name="city" value={formData.city} onChange={handleInputChange} />
                                        </div>
                                        <div className={styles.formGroupMobile}>
                                            <label>CP</label>
                                            <input name="zip" value={formData.zip} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={styles.card}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Pago</h2>
                            <div className={styles.optsList}>
                                <label className={`${styles.optItem} ${paymentMethod === 'transferencia' ? styles.optActive : ''}`}>
                                    <input type="radio" checked={paymentMethod === 'transferencia'} onChange={() => setPaymentMethod('transferencia')} />
                                    <span>Transferencia Bancaria</span>
                                </label>
                                <label className={`${styles.optItem} ${paymentMethod === 'efectivo' ? styles.optActive : ''}`}>
                                    <input type="radio" checked={paymentMethod === 'efectivo'} onChange={() => setPaymentMethod('efectivo')} />
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span>Efectivo (Contra entrega)</span>
                                        <small style={{ color: '#22c55e', fontWeight: 800 }}>10% DE DESCUENTO</small>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className={styles.grandTotalCard}>
                            <div className={styles.totalRowMobile}><span>Subtotal:</span><span>${new Intl.NumberFormat('es-AR').format(cartTotal)}</span></div>
                            <div className={styles.totalRowMobile}><span>Envío:</span><span>{shippingCost === 0 ? 'GRATIS' : `$${new Intl.NumberFormat('es-AR').format(shippingCost)}`}</span></div>
                            {discountAmount > 0 && <div className={styles.totalRowMobile} style={{ color: '#22c55e' }}><span>Ahorro Efectivo:</span><span>-${new Intl.NumberFormat('es-AR').format(discountAmount)}</span></div>}
                            <div className={styles.finalTotalMobile}>
                                <span>TOTAL:</span>
                                <span>${new Intl.NumberFormat('es-AR').format(finalTotal)}</span>
                            </div>
                        </div>

                        <div className={styles.actionFixed}>
                            <button
                                className={styles.mainActionBtn}
                                disabled={isLoading}
                                onClick={async () => {
                                    if (!formData.firstName || !formData.phone || !formData.email) {
                                        alert("Por favor completá Nombre, WhatsApp y Email");
                                        return;
                                    }
                                    setIsLoading(true);
                                    try {
                                        const newOrder = {
                                            id: "ORDER-" + Date.now(), // No crypto.uuid for better compatibility
                                            customer: { ...formData },
                                            deliveryMethod,
                                            paymentMethod,
                                            date: new Date().toISOString(),
                                            items: cart.map(item => ({
                                                productId: item.id,
                                                productName: item.name,
                                                quantity: item.quantity,
                                                price: isWholesale ? item.priceWholesale : item.priceRetail,
                                            })),
                                            subtotal: cartTotal,
                                            shippingCost,
                                            discount: discountAmount,
                                            total: finalTotal,
                                            status: 'Pendiente' as const,
                                            type: isWholesale ? 'Mayorista' as const : 'Minorista' as const,
                                        };
                                        await createOrderAction(newOrder);
                                        alert("¡PEDIDO ENVIADO! Pronto nos comunicaremos.");
                                        clearCart();
                                        window.location.href = '/tienda';
                                    } catch (e) {
                                        alert("Error al enviar el pedido.");
                                    } finally {
                                        setIsLoading(false);
                                    }
                                }}
                            >
                                {isLoading ? 'CARGANDO...' : 'CONFIRMAR PEDIDO 🚀'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
