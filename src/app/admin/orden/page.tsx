import { getProducts } from '@/lib/db';
import OrderClient from './OrderClient';

export const dynamic = 'force-dynamic';

export default async function OrderPage() {
    const products = await getProducts();
    return <OrderClient initialProducts={products} />;
}
