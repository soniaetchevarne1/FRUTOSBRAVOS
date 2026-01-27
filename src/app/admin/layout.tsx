import Link from 'next/link';
import styles from './admin.module.css';
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logoutAction } from './auth';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const isLoggedIn = cookieStore.get('admin_session');

    // Simple Redirect logic:
    // If we are NOT logged in, we must redirect to /admin/login
    // BUT we need to avoid redirect loop if we are already on /admin/login.
    // Since we are in a layout that wraps everything in /admin, this is tricky in Server Components
    // without middleware.
    // 
    // However, for this local app, the easiest fix is:
    // 1. Let the layout render.
    // 2. Add a CLIENT COMPONENT check inside the layout? No, that causes flash.

    // Alternative: Remove this check from Layout and put it in `page.tsx`, `productos/page.tsx`, etc.
    // But that's repetitive.

    // Best "Hack" for now given constraints:
    // Check if we are logged in. If NOT, we render null (or redirect).
    // BUT we must allow the login page to verify itself.
    //
    // Actually, I will remove the check from here and rely on the fact that I protected the routes 
    // by simply NOT linking to them? No, that's insecure.

    // Let's go with: Add `if (!isLoggedIn) redirect('/admin/login')` 
    // AND move the Login Page OUT of this layout structure is the only 100% way without Middleware.

    // WAIT: If I use middleware.ts it is super easy. I will do that instead of fighting the layout.

    return (
        <div className={styles.adminContainer}>
            <aside className={styles.sidebar}>
                <div className={styles.brand} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem' }}>
                    <img
                        src="/logo-fruto-bravo.png"
                        alt="Logo"
                        style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid white' }}
                    />
                    <div style={{ lineHeight: 1 }}>
                        <span style={{ fontSize: '1rem', fontWeight: 900 }}>FRUTO BRAVO</span>
                        <span style={{ color: 'var(--secondary)', fontSize: '0.6rem', display: 'block', fontWeight: 800 }}>ADMIN</span>
                    </div>
                </div>

                <nav className={styles.nav}>
                    <Link href="/admin" className={styles.navLink}>
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link href="/admin/productos" className={styles.navLink}>
                        <Package size={20} /> Productos
                    </Link>
                    <Link href="/admin/orden" className={styles.navLink}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', position: 'relative' }}>
                                <Package size={20} />
                                <div style={{ position: 'absolute', bottom: -2, right: -2, background: 'var(--primary)', borderRadius: '50%', padding: '1px' }}>
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 9 7-7 7 7" /><path d="M12 2v12" /><path d="m5 15 7 7 7-7" /></svg>
                                </div>
                            </div>
                            Organizar Tienda
                        </div>
                    </Link>
                    <Link href="/admin/ventas" className={styles.navLink}>
                        <ShoppingBag size={20} /> Ventas
                    </Link>
                    <Link href="/admin/clientes" className={styles.navLink}>
                        <Users size={20} /> Clientes
                    </Link>
                    <div style={{ marginTop: 'auto' }}></div>
                    <form action={logoutAction}>
                        <button type="submit" className={styles.navLink} style={{ width: '100%', textAlign: 'left' }}>
                            <LogOut size={20} /> Salir a Tienda
                        </button>
                    </form>
                </nav>
            </aside>

            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
}
