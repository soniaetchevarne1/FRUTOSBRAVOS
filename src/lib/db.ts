import fs from 'fs';
import path from 'path';
import { Product, Order, BlogContent } from './types';

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
// ... (Order logic can be added similarly)

