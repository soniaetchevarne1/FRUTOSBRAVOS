"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import { ShieldCheck, TrendingUp, Truck } from 'lucide-react';
import Link from 'next/link';

export default function MayoristaPage() {
    const { isWholesale, toggleWholesale } = useStore();

    return (
        <>
            <Navbar />

            {/* Hero */}
            <div style={{ background: 'var(--primary)', color: 'white', padding: '4rem 0' }}>
                <div className="container">
                    <h1 className="h1" style={{ marginBottom: '1rem' }}>Venta Mayorista</h1>
                    <p className="body-lg" style={{ maxWidth: '600px', opacity: 0.9 }}>
                        Abastecé tu negocio con productos de la mejor calidad. Precios especiales para dietéticas, restaurantes y emprendedores.
                    </p>
                </div>
            </div>

            <div className="container section">

                {/* Benefits Grid */}
                <div className="grid-cols-3" style={{ marginBottom: '4rem' }}>
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ margin: '0 auto 1rem', width: '50px', height: '50px', background: 'var(--surface-alt)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                            <TrendingUp />
                        </div>
                        <h3 className="h3" style={{ marginBottom: '0.5rem' }}>Márgenes Rentables</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Accedé a listas de precios diferenciadas permitiéndote un excelente margen de ganancia.</p>
                    </div>
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ margin: '0 auto 1rem', width: '50px', height: '50px', background: 'var(--surface-alt)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                            <ShieldCheck />
                        </div>
                        <h3 className="h3" style={{ marginBottom: '0.5rem' }}>Calidad Garantizada</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Productos seleccionados y frescos. Tu cliente final notará la diferencia.</p>
                    </div>
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ margin: '0 auto 1rem', width: '50px', height: '50px', background: 'var(--surface-alt)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                            <Truck />
                        </div>
                        <h3 className="h3" style={{ marginBottom: '0.5rem' }}>Envíos Prioritarios</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Logística optimizada para que nunca te falte stock.</p>
                    </div>
                </div>

                {/* Action Section / Demo Toggle */}
                <div style={{ background: 'var(--surface-alt)', padding: '3rem', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                    <h2 className="h2" style={{ marginBottom: '1rem' }}>¿Ya tenés cuenta?</h2>
                    <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                        Ingresá a tu cuenta para ver los precios mayoristas o solicitá el alta.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center', flexDirection: 'column' }}>
                        <div style={{ padding: '1rem', border: '1px dashed var(--primary)', borderRadius: '8px', background: 'rgba(44, 94, 80, 0.05)' }}>
                            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>DEMO DE FUNCIONALIDAD</p>
                            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Estado Actual: <strong>{isWholesale ? 'MAYORISTA ACTIVADO' : 'CLIENTE MINORISTA'}</strong></p>
                            <button onClick={toggleWholesale} className="btn btn-secondary">
                                {isWholesale ? 'Volver a vista Minorista' : 'Simular Login Mayorista'}
                            </button>
                            {isWholesale && (
                                <div style={{ marginTop: '1rem' }}>
                                    <Link href="/tienda" className="btn btn-primary">Ir a comprar con precios mayoristas</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
}
