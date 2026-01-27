"use client";

import { useStore } from "@/context/StoreContext";
import { Product } from "@/lib/types";
import { useState } from "react";

type WeightOption = {
    value: number;
    label: string;
    multiplier: number;
};

const WEIGHT_OPTIONS: WeightOption[] = [
    { value: 1000, label: '1 Kg', multiplier: 1 },
    { value: 500, label: '500 g', multiplier: 0.5 },
    { value: 250, label: '250 g', multiplier: 0.25 }
];

export default function AddToCartClient({ product }: { product: Product }) {
    const { addToCart, isWholesale } = useStore();
    const [quantity, setQuantity] = useState(1);
    const [selectedWeight, setSelectedWeight] = useState<WeightOption>(WEIGHT_OPTIONS[0]);
    const [showToast, setShowToast] = useState(false);

    const basePrice = isWholesale ? product.priceWholesale : product.priceRetail;
    const adjustedPrice = basePrice * selectedWeight.multiplier;
    const totalPrice = adjustedPrice * quantity;

    const handleAddToCart = () => {
        const modifiedProduct = {
            ...product,
            priceRetail: adjustedPrice,
            priceWholesale: adjustedPrice,
            name: `${product.name} (${selectedWeight.label})`
        };
        addToCart(modifiedProduct, quantity);

        // Mostrar el cartelito
        setShowToast(true);
        setTimeout(() => setShowToast(false), 1500);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
            {/* Notificación (Toast) */}
            {showToast && (
                <div
                    className="toast-in"
                    style={{
                        position: 'fixed',
                        top: '30px',
                        right: '30px',
                        backgroundColor: 'white',
                        padding: '1.25rem 2rem',
                        borderRadius: '24px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.25rem',
                        zIndex: 9999,
                        border: '4px solid #D4AF37', // Dorado Premium
                    }}
                >
                    <div style={{
                        fontSize: '3.5rem',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                        position: 'relative'
                    }}>
                        🌰
                        <div style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '-10px',
                            fontSize: '1.5rem',
                            animation: 'bounce 1s infinite'
                        }}>✨</div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <p style={{ margin: 0, fontWeight: 900, color: 'var(--primary)', fontSize: '1.5rem', lineHeight: 1.1 }}>¡AGREGADO!</p>
                        <p style={{ margin: 0, color: '#444', fontSize: '1rem', fontWeight: 600 }}>
                            {quantity}x {product.name}
                        </p>
                        <p style={{ margin: 0, color: '#D4AF37', fontSize: '1.1rem', letterSpacing: '2px' }}>😊🥜✨</p>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
            `}</style>

            {/* Weight Selector */}
            <div>
                <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    fontWeight: 600,
                    color: '#2c3e50',
                    fontSize: '1rem'
                }}>
                    Seleccionar peso:
                </label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {WEIGHT_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => setSelectedWeight(option)}
                            style={{
                                flex: 1,
                                padding: '0.75rem 1rem',
                                borderRadius: '10px',
                                border: selectedWeight.value === option.value
                                    ? '3px solid var(--primary)'
                                    : '2px solid #ddd',
                                background: selectedWeight.value === option.value
                                    ? 'var(--primary)'
                                    : 'white',
                                color: selectedWeight.value === option.value
                                    ? 'white'
                                    : '#2c3e50',
                                fontWeight: selectedWeight.value === option.value ? 700 : 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontSize: '1rem',
                                boxShadow: selectedWeight.value === option.value
                                    ? '0 4px 12px rgba(44, 94, 80, 0.3)'
                                    : '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Display */}
            <div style={{
                padding: '1.25rem',
                background: '#f8f9fa',
                borderRadius: '12px',
                border: '2px solid var(--primary)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
            }}>
                <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 500 }}>Total a pagar:</span>
                <p style={{
                    fontSize: '2.25rem',
                    fontWeight: 800,
                    color: 'var(--primary)',
                    margin: 0,
                    lineHeight: 1
                }}>
                    ${new Intl.NumberFormat('es-AR').format(totalPrice)}
                </p>
                <span style={{ fontSize: '0.85rem', color: '#888' }}>
                    ({quantity} x ${new Intl.NumberFormat('es-AR').format(adjustedPrice)} por {selectedWeight.label})
                </span>
            </div>

            {/* Quantity Selector */}
            <div>
                <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    fontWeight: 600,
                    color: '#2c3e50',
                    fontSize: '1rem'
                }}>
                    Cantidad:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            border: '2px solid #333',
                            background: '#2c3e50',
                            color: 'white',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                        }}
                    >-</button>
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        width: '50px',
                        textAlign: 'center',
                        color: '#2c3e50'
                    }}>{quantity}</span>
                    <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            border: '2px solid #333',
                            background: '#2c3e50',
                            color: 'white',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                        }}
                    >+</button>
                </div>
            </div>

            {/* Add to Cart Button */}
            <button
                className="btn btn-primary"
                type="button"
                onClick={handleAddToCart}
                style={{ fontSize: '1.1rem', padding: '1rem' }}
            >
                Agregar al Carrito
            </button>
        </div>
    );
}
