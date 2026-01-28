"use client";

import styles from './admin.module.css';
import { orders, products } from '@/lib/data';

export default function AdminDashboard() {
    const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
    const totalOrders = orders.length;
    const recentOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

    return (
        <>
            <div className={styles.header}>
                <h1 className="h2" style={{ color: 'var(--text-main)' }}>Dashboard General</h1>
                <div className="badge badge-new" style={{ background: 'var(--secondary)' }}>{new Date().toLocaleDateString()}</div>
            </div>

            {/* Stats */}
            <div className={styles.statGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Ventas Totales</div>
                    <div className={styles.statValue}>${new Intl.NumberFormat('es-AR').format(totalSales)}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Pedidos</div>
                    <div className={styles.statValue}>{totalOrders}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Productos Activos</div>
                    <div className={styles.statValue}>{products.length}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Ticket Promedio</div>
                    <div className={styles.statValue}>${new Intl.NumberFormat('es-AR').format(totalSales / (totalOrders || 1))}</div>
                </div>
            </div>

            {/* Recent Orders */}
            <h3 className="h3" style={{ marginBottom: '1rem' }}>Ventas Recientes</h3>
            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID Pedido</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Tipo</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map(order => (
                            <tr key={order.id}>
                                <td style={{ fontWeight: 500 }}>#{order.id}</td>
                                <td>{order.customer.firstName} {order.customer.lastName}</td>
                                <td>{order.date}</td>
                                <td style={{ fontWeight: 700 }}>${new Intl.NumberFormat('es-AR').format(order.total)}</td>
                                <td>
                                    <span style={{ fontSize: '0.8em', padding: '2px 6px', background: order.type === 'Mayorista' ? '#e0f2fe' : '#f3f4f6', color: order.type === 'Mayorista' ? '#0369a1' : '#374151', borderRadius: '4px' }}>
                                        {order.type}
                                    </span>
                                </td>
                                <td>
                                    <span className={`${styles.statusBadge} ${order.status === 'Entregado' ? styles.statusSuccess : styles.statusWarning}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
