"use client";

import { useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function WhatsAppPage() {
    const { cart, cartTotal, isWholesale, clearCart } = useStore();

    useEffect(() => {
        if (cart.length === 0) return;

        const itemsList = cart.map(item => `- ${item.name} x${item.quantity}`).join('%0A');
        const message = `¡Hola! Quiero realizar este pedido (Directo) 🚀%0A%0A` +
            `*Detalle:*%0A${itemsList}%0A%0A` +
            `*TOTAL APROX: $${new Intl.NumberFormat('es-AR').format(cartTotal)}*%0A%0A` +
            `Por favor, pásame el link de pago o datos de transferencia.`;

        const whatsappNumber = "5493416091224";
        const waUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        // Intentar abrir WhatsApp
        window.location.href = waUrl;
    }, [cart, cartTotal]);

    if (cart.length === 0) {
        return (
            <>
                <Navbar />
                <div style={{ padding: '5rem 1rem', textAlign: 'center' }}>
                    <h2>Tu carrito está vacío 🌰</h2>
                    <p>Agrega productos para poder enviarlos por WhatsApp.</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <div style={{ padding: '5rem 1rem', textAlign: 'center' }}>
            <h2>Redirigiendo a WhatsApp... 🚀</h2>
            <p>Si no se abre automáticamente, haz clic en el botón de abajo.</p>
            <a
                href="#"
                onClick={() => window.location.reload()}
                style={{
                    display: 'inline-block',
                    marginTop: '1rem',
                    padding: '1rem 2rem',
                    background: '#25D366',
                    color: 'white',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                }}
            >
                REINTENTAR ABRIR WHATSAPP
            </a>
        </div>
    );
}
