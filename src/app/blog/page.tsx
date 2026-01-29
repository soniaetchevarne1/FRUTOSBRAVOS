"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogContent } from "@/lib/data";
import Link from "next/link";
import { Clock, ChefHat, FileText, ArrowRight } from "lucide-react";

export default function BlogPage() {
    return (
        <>
            <Navbar />

            <div className="section" style={{ background: 'var(--surface-alt)' }}>
                <div className="container">
                    <h1 className="h2" style={{ marginBottom: '1rem', textAlign: 'center' }}>Blog & Recetas</h1>
                    <p className="body-lg" style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Ideas saludables, consejos de nutrición y las mejores recetas para aprovechar nuestros productos.
                    </p>
                </div>
            </div>

            <div className="container section">
                <div className="grid-cols-2">
                    {blogContent.map((item) => (
                        <Link href={`/blog/${item.slug}`} key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div style={{ height: '250px', background: 'var(--surface-alt)', overflow: 'hidden' }}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <span className="badge" style={{ background: item.type === 'receta' ? 'var(--secondary)' : 'var(--primary)', color: item.type === 'receta' ? 'var(--text-main)' : 'white' }}>
                                        {item.type === 'receta' ? 'Receta' : 'Artículo'}
                                    </span>
                                    {item.type === 'receta' && (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            <Clock size={14} /> {item.prepTime}
                                        </span>
                                    )}
                                </div>

                                <h3 className="h3" style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{item.title}</h3>

                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>
                                    {item.type === 'receta' ? item.description : item.excerpt}
                                </p>

                                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)', fontWeight: 600 }}>
                                    Leer más <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}
