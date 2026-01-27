import { getOrders } from '@/lib/db';
import VentasClient from './VentasClient';

export const dynamic = 'force-dynamic';

export default async function VentasPage() {
    const orders = await getOrders();
    return <VentasClient initialOrders={orders} />;
}
