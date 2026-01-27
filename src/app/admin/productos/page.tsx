import { getProducts } from '@/lib/db';
import AdminProductsClient from './AdminProductsClient';

// Force dynamic rendering so we always see fresh data from JSON
export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
    const products = await getProducts();
    return <AdminProductsClient initialProducts={products} />;
}
