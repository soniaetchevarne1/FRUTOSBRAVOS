"use client";

import { useStore } from "@/context/StoreContext";
import { products } from "@/lib/data";
import { Ingredient } from "@/lib/types";
import { ShoppingBasket } from "lucide-react";

export default function AddIngredientsButton({ ingredients }: { ingredients: Ingredient[] }) {
    const { addToCart } = useStore();

    const handleAddAll = () => {
        let addedCount = 0;
        ingredients.forEach(ing => {
            // Find the actual product in the catalog to ensure we have price/details
            // In a real app, we might just use the ID if the cart handles fetching details from ID
            // But our simple context expects a full Product object.
            // We might need to iterate over `products` from data (imported).
            const product = products.find(p => p.id === ing.productId);
            if (product) {
                addToCart(product, ing.quantity);
                addedCount++;
            }
        });

        if (addedCount > 0) {
            alert(`${addedCount} productos agregados al carrito!`);
        } else {
            alert('No se encontraron los productos en el catálogo.');
        }
    };

    return (
        <button
            onClick={handleAddAll}
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
        >
            <ShoppingBasket size={20} /> Agregar ingredientes al carrito
        </button>
    );
}
