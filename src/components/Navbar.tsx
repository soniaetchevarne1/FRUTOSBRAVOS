"use client";

import { Suspense } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X, LogIn, UserPlus, Phone, Store, Home } from 'lucide-react';
import styles from './Navbar.module.css';
import { useStore } from '@/context/StoreContext';
import NavbarSearch from './NavbarSearch';
import { useState } from 'react';

export default function Navbar() {
    const { cartCount } = useStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                <Link href="/" className={styles.logoWrapper}>
                    <img src="/logo-fruto-bravo.png" alt="Fruto Bravo Logo" className={styles.logoImg} />
                    <span className={styles.logoText}>FRUTOS BRAVOS</span>
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
                        <Suspense fallback={<div style={{ width: '200px' }}></div>}>
                            <NavbarSearch />
                        </Suspense>
                    </div>
                    <Link href="/cuenta" aria-label="Cuenta" className={styles.iconBtn}><User size={20} /></Link>
                    <Link href="/carrito" aria-label="Carrito" className={`${styles.iconBtn} ${styles.cartBtn}`}>
                        <ShoppingCart size={20} />
                        {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                    </Link>
                    <button
                        className={styles.mobileMenu}
                        aria-label="Menu"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileOverlay} ${isMenuOpen ? styles.menuOpen : ''}`}>
                <div className={styles.mobileLinks}>
                    <Link href="/" onClick={() => setIsMenuOpen(false)}>
                        <Home size={20} /> Inicio
                    </Link>
                    <Link href="/tienda" onClick={() => setIsMenuOpen(false)}>
                        <Store size={20} /> Nuestra Tienda
                    </Link>
                    <Link href="/contacto" onClick={() => setIsMenuOpen(false)}>
                        <Phone size={20} /> Contacto
                    </Link>

                    <div className={styles.divider}></div>

                    <Link href="/registro" onClick={() => setIsMenuOpen(false)} className={styles.authLink}>
                        <UserPlus size={20} /> Crear una cuenta
                    </Link>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)} className={styles.authLink}>
                        <LogIn size={20} /> Iniciar sesión
                    </Link>
                </div>
            </div>
        </nav>
    );
}
