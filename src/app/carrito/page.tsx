"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';
import { createOrderAction } from '@/app/actions';

export default function CarritoPage() {
    const { cart, cartTotal, isWholesale, clearCart, updateQuantity, removeFromCart } = useStore();

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [cp, setCp] = useState('');
    const [envio, setEnvio] = useState('envio');
    const [pago, setPago] = useState('transferencia');
    const [enviando, setEnviando] = useState(false);

    const costoEnvio = envio === 'envio' ? (cartTotal > 50000 ? 0 : 3500) : 0;
    const descuento = pago === 'efectivo' ? cartTotal * 0.10 : 0;
    const total = cartTotal + costoEnvio - descuento;

    const enviarPedido = async () => {
        if (!nombre || !telefono || !email) {
            alert('Por favor completa Nombre, Teléfono y Email');
            return;
        }
        if (envio === 'envio' && !direccion) {
            alert('Por favor completa la dirección');
            return;
        }

        setEnviando(true);

        try {
            const pedido = {
                id: 'PED-' + Date.now(),
                customer: {
                    firstName: nombre,
                    lastName: '',
                    email: email,
                    phone: telefono,
                    dni: '',
                    address: direccion,
                    city: ciudad,
                    zip: cp
                },
                deliveryMethod: envio,
                paymentMethod: pago,
                date: new Date().toISOString(),
                items: cart.map(item => ({
                    productId: item.id,
                    productName: item.name,
                    quantity: item.quantity,
                    price: isWholesale ? item.priceWholesale : item.priceRetail,
                })),
                subtotal: cartTotal,
                shippingCost: costoEnvio,
                discount: descuento,
                total: total,
                status: 'Pendiente' as const,
                type: isWholesale ? 'Mayorista' as const : 'Minorista' as const,
            };

            await createOrderAction(pedido);
            alert('¡PEDIDO ENVIADO CON ÉXITO! Te contactaremos pronto.');
            clearCart();
            window.location.href = '/tienda';
        } catch (error) {
            alert('Error al enviar el pedido. Intenta nuevamente.');
        } finally {
            setEnviando(false);
        }
    };

    if (cart.length === 0) {
        return (
            <>
                <Navbar />
                <div style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem 1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem' }}>🛒</div>
                    <h2 style={{ fontWeight: 800, marginBottom: '1rem' }}>CARRITO VACÍO</h2>
                    <Link href="/tienda" style={{
                        display: 'inline-block',
                        padding: '1rem 2rem',
                        background: '#D4AF37',
                        color: 'white',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontWeight: 800
                    }}>
                        IR A LA TIENDA
                    </Link>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '2rem 1rem 150px',
                background: '#f8f9fa',
                minHeight: '100vh'
            }}>

                <h1 style={{
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    textAlign: 'center',
                    marginBottom: '2rem',
                    color: '#333'
                }}>
                    MI PEDIDO
                </h1>

                {/* PRODUCTOS */}
                <div style={{ background: 'white', borderRadius: '15px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#2c5e50' }}>
                        TUS PRODUCTOS
                    </h2>
                    {cart.map((item) => (
                        <div key={item.id} style={{
                            display: 'flex',
                            gap: '1rem',
                            padding: '1rem 0',
                            borderBottom: '1px solid #eee'
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                background: '#f5f5f5',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                {item.image ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} /> : '🥜'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.name}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', background: '#f0f0f0', padding: '2px 8px', borderRadius: '6px' }}>
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ border: 'none', background: 'none', fontSize: '1.2rem', fontWeight: 800 }}>-</button>
                                        <span style={{ fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ border: 'none', background: 'none', fontSize: '1.2rem', fontWeight: 800 }}>+</button>
                                    </div>
                                    <span style={{ fontWeight: 800, color: '#2c5e50' }}>
                                        ${new Intl.NumberFormat('es-AR').format((isWholesale ? item.priceWholesale : item.priceRetail) * item.quantity)}
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} style={{ border: 'none', background: 'none', color: '#ff4444', fontSize: '1.2rem' }}>×</button>
                        </div>
                    ))}
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '2px dashed #ddd', display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                        <span>Subtotal:</span>
                        <span>${new Intl.NumberFormat('es-AR').format(cartTotal)}</span>
                    </div>
                </div>

                {/* DATOS */}
                <div style={{ background: 'white', borderRadius: '15px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', color: '#2c5e50' }}>
                        MIS DATOS
                    </h2>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem', color: '#555' }}>
                            NOMBRE COMPLETO *
                        </label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ej: Juan Perez"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem', color: '#555' }}>
                            WHATSAPP / TELÉFONO *
                        </label>
                        <input
                            type="tel"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            placeholder="Ej: 11 1234 5678"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem', color: '#555' }}>
                            EMAIL *
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>
                </div>

                {/* ENVÍO */}
                <div style={{ background: 'white', borderRadius: '15px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#2c5e50' }}>
                        ENTREGA
                    </h2>

                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        border: envio === 'envio' ? '2px solid #2c5e50' : '1px solid #eee',
                        borderRadius: '10px',
                        marginBottom: '0.75rem',
                        background: envio === 'envio' ? 'rgba(44,94,80,0.05)' : 'white',
                        cursor: 'pointer'
                    }}>
                        <input
                            type="radio"
                            checked={envio === 'envio'}
                            onChange={() => setEnvio('envio')}
                            style={{ width: '20px', height: '20px' }}
                        />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700 }}>Envío a Domicilio</div>
                            <div style={{ fontSize: '0.85rem', color: '#666' }}>{cartTotal > 50000 ? 'GRATIS' : '$3.500'}</div>
                        </div>
                    </label>

                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        border: envio === 'retiro' ? '2px solid #2c5e50' : '1px solid #eee',
                        borderRadius: '10px',
                        background: envio === 'retiro' ? 'rgba(44,94,80,0.05)' : 'white',
                        cursor: 'pointer'
                    }}>
                        <input
                            type="radio"
                            checked={envio === 'retiro'}
                            onChange={() => setEnvio('retiro')}
                            style={{ width: '20px', height: '20px' }}
                        />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700 }}>Retiro en Local</div>
                            <div style={{ fontSize: '0.85rem', color: '#22c55e', fontWeight: 700 }}>GRATIS</div>
                        </div>
                    </label>

                    {envio === 'envio' && (
                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem', color: '#555' }}>
                                    DIRECCIÓN *
                                </label>
                                <input
                                    type="text"
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                    placeholder="Calle y Número"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '10px',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem', color: '#555' }}>
                                        CIUDAD
                                    </label>
                                    <input
                                        type="text"
                                        value={ciudad}
                                        onChange={(e) => setCiudad(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            border: '1px solid #ddd',
                                            borderRadius: '10px',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem', color: '#555' }}>
                                        CP
                                    </label>
                                    <input
                                        type="text"
                                        value={cp}
                                        onChange={(e) => setCp(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            border: '1px solid #ddd',
                                            borderRadius: '10px',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* PAGO */}
                <div style={{ background: 'white', borderRadius: '15px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#2c5e50' }}>
                        FORMA DE PAGO
                    </h2>

                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        border: pago === 'transferencia' ? '2px solid #2c5e50' : '1px solid #eee',
                        borderRadius: '10px',
                        marginBottom: '0.75rem',
                        background: pago === 'transferencia' ? 'rgba(44,94,80,0.05)' : 'white',
                        cursor: 'pointer'
                    }}>
                        <input
                            type="radio"
                            checked={pago === 'transferencia'}
                            onChange={() => setPago('transferencia')}
                            style={{ width: '20px', height: '20px' }}
                        />
                        <span style={{ fontWeight: 700 }}>Transferencia Bancaria</span>
                    </label>

                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        border: pago === 'efectivo' ? '2px solid #2c5e50' : '1px solid #eee',
                        borderRadius: '10px',
                        background: pago === 'efectivo' ? 'rgba(44,94,80,0.05)' : 'white',
                        cursor: 'pointer'
                    }}>
                        <input
                            type="radio"
                            checked={pago === 'efectivo'}
                            onChange={() => setPago('efectivo')}
                            style={{ width: '20px', height: '20px' }}
                        />
                        <div>
                            <div style={{ fontWeight: 700 }}>Efectivo (contra entrega)</div>
                            <div style={{ fontSize: '0.85rem', color: '#22c55e', fontWeight: 800 }}>10% DE DESCUENTO</div>
                        </div>
                    </label>
                </div>

                {/* TOTAL */}
                <div style={{ background: '#222', color: 'white', borderRadius: '15px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', opacity: 0.8 }}>
                        <span>Subtotal:</span>
                        <span>${new Intl.NumberFormat('es-AR').format(cartTotal)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', opacity: 0.8 }}>
                        <span>Envío:</span>
                        <span>{costoEnvio === 0 ? 'GRATIS' : `$${new Intl.NumberFormat('es-AR').format(costoEnvio)}`}</span>
                    </div>
                    {descuento > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#22c55e' }}>
                            <span>Descuento:</span>
                            <span>-${new Intl.NumberFormat('es-AR').format(descuento)}</span>
                        </div>
                    )}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '1rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        fontSize: '1.5rem',
                        fontWeight: 900,
                        color: '#D4AF37'
                    }}>
                        <span>TOTAL:</span>
                        <span>${new Intl.NumberFormat('es-AR').format(total)}</span>
                    </div>
                </div>

            </div>

            {/* BOTÓN FIJO ABAJO */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'white',
                padding: '1rem',
                boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
                zIndex: 1000
            }}>
                <button
                    onClick={enviarPedido}
                    disabled={enviando}
                    style={{
                        width: '100%',
                        padding: '1.2rem',
                        background: '#D4AF37',
                        color: 'white',
                        border: 'none',
                        borderRadius: '15px',
                        fontSize: '1.2rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        boxShadow: '0 5px 20px rgba(212, 175, 55, 0.4)'
                    }}
                >
                    {enviando ? 'ENVIANDO...' : 'CONFIRMAR PEDIDO 🚀'}
                </button>
            </div>

            <Footer />
        </>
    );
}
