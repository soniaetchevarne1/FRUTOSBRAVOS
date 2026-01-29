export type Category = 'Frutos Secos' | 'Frutas Desecadas' | 'Especias y Condimentos' | 'Harinas' | 'Semillas y Legumbres' | 'Maní' | 'Cereales' | 'Aceites' | 'Arroz' | 'Suplementos' | 'Otros';

export interface Product {
    id: string;
    name: string;
    slug: string;
    category: Category;
    description: string;
    priceRetail: number;
    priceWholesale: number;
    unit: string; // e.g., 'kg', '100g', 'unidad'
    stock: number;
    image: string;
    isNew?: boolean;
    isBestSeller?: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}

export type OrderStatus = 'Pendiente' | 'Pagado' | 'Enviado' | 'Entregado';

export interface Order {
    id: string;
    customer: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        dni?: string;
        address?: string;
        city?: string;
        province?: string;
        zip?: string;
    };
    deliveryMethod: 'envio' | 'retiro';
    paymentMethod: 'transferencia' | 'efectivo' | 'tarjeta';
    date: string; // ISO String
    items: {
        productId: string;
        productName: string;
        quantity: number;
        price: number;
        image?: string;
    }[];
    subtotal: number;
    shippingCost: number;
    discount: number;
    total: number;
    status: OrderStatus;
    type: 'Minorista' | 'Mayorista';
    // Actually the previous one was just 'Minorista' | 'Mayorista'. I'll keep it simple but allow 'const' if that was a typo in my thought process? No, let's stick to clean types.
}

export interface Ingredient {
    productId: string; // Links to Product ID
    name: string;      // Display name (e.g. "200g de Almendras")
    quantity: number;  // Quantity to add to cart
}

export interface Recipe {
    id: string;
    title: string;
    slug: string;
    image: string;
    description: string;
    prepTime: string;
    difficulty: 'Fácil' | 'Media' | 'Difícil';
    ingredients: Ingredient[];
    steps: string[];
    type: 'receta';
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    image: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    type: 'articulo';
}

export type BlogContent = Recipe | BlogPost;
