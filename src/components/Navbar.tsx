"use client";

import Link from 'next/link';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import styles from './Navbar.module.css';
import { useStore } from '@/context/StoreContext';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Navbar() {
    const { cartCount } = useStore();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }

        if (pathname !== '/tienda') {
            router.push(`/tienda?${params.toString()}`);
        } else {
            router.replace(`${pathname}?${params.toString()}`);
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                <Link href="/" className={styles.logoWrapper}>
                    <img src="/logo-fruto-bravo.png" alt="Fruto Bravo Logo" className={styles.logoImg} />
                    <span className={styles.logoText}>FRUTO BRAVO</span>
                </Link>

                {/* Desktop Menu */}
                <div className={styles.links}>
                    <Link href="/">Inicio</Link>
                    <Link href="/tienda">Tienda</Link>
                    <Link href="/mayorista">Mayorista</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/contacto">Contacto</Link>
                </div>

                {/* Icons */}
                <div className={styles.icons}>
                    <div className={styles.searchWrapper}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                className={styles.searchInput}
                                defaultValue={searchParams.get('q')?.toString()}
                                onChange={(e) => handleSearch(e.target.value)}
                                autoFocus
                            />
                            <div className={styles.iconBtn}>
                                <Search size={20} />
                            </div>
                        </div>
                    </div>
                    <Link href="/cuenta" aria-label="Cuenta" className={styles.iconBtn}><User size={20} /></Link>
                    <Link href="/carrito" aria-label="Carrito" className={`${styles.iconBtn} ${styles.cartBtn}`}>
                        <ShoppingCart size={20} />
                        {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                    </Link>
                    <button className={styles.mobileMenu} aria-label="Menu"><Menu size={24} /></button>
                </div>
            </div>
        </nav>
    );
}
