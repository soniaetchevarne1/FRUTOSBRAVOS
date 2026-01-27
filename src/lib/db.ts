import fs from 'fs';
import path from 'path';
import { Product, Order, OrderStatus, BlogContent } from './types';

// Path to the JSON file
const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');

// Helper to read DB
function readDb() {
    if (!fs.existsSync(dbPath)) {
        return { products: [], orders: [], blog: [] };
    }
    const fileContent = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(fileContent);
}

// Helper to write DB
function writeDb(data: any) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// --- PRODUCTS ---

export async function getProducts(): Promise<Product[]> {
    const db = readDb();
    return db.products || [];
}

export async function getProduct(slug: string): Promise<Product | undefined> {
    const products = await getProducts();
    return products.find((p) => p.slug === slug);
}

export async function saveProduct(product: Product) {
    const db = readDb();
    const index = db.products.findIndex((p: Product) => p.id === product.id);

    if (index >= 0) {
        db.products[index] = product;
    } else {
        db.products.push(product);
    }

    writeDb(db);
    return product;
}

export async function deleteProduct(id: string) {
    const db = readDb();
    db.products = db.products.filter((p: Product) => p.id !== id);
    writeDb(db);
}

export async function reorderProducts(products: Product[]) {
    const db = readDb();
    db.products = products;
    writeDb(db);
}

// --- ORDERS ---
export async function getOrders(): Promise<Order[]> {
    const db = readDb();
    return db.orders || [];
}

export async function saveOrder(order: Order) {
    const db = readDb();
    if (!db.orders) {
        db.orders = [];
    }
    db.orders.unshift(order); // Add new orders to the top
    writeDb(db);
    return order;
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
    const db = readDb();
    const order = db.orders.find((o: Order) => o.id === id);
    if (order) {
        order.status = status;
        writeDb(db);
    }
}

