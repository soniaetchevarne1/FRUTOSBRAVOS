"use client";

import { Search } from 'lucide-react';
import styles from './Navbar.module.css';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function NavbarSearch() {
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="text"
                placeholder="Buscar productos..."
                className={styles.searchInput}
                defaultValue={searchParams.get('q')?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <div className={styles.iconBtn}>
                <Search size={20} />
            </div>
        </div>
    );
}
