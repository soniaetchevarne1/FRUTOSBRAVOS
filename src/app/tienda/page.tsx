import { getProducts } from '@/lib/db';
import TiendaClient from './TiendaClient';

export const dynamic = 'force-dynamic';

export default async function TiendaPage() {
    const products = await getProducts();
    return <TiendaClient initialProducts={products} />;
}
