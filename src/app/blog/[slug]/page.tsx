import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogContent } from "@/lib/data";
import { Clock, Calendar, User } from "lucide-react";
import AddIngredientsButton from "./AddIngredients";

export async function generateStaticParams() {
    return blogContent.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const post = blogContent.find((p) => p.slug === slug);

    if (!post) {
        return <div>Contenido no encontrado</div>;
    }

    const isRecipe = post.type === 'receta';

    return (
        <>
            <Navbar />

            <article className="container section">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span className="badge" style={{ marginBottom: '1rem', background: isRecipe ? 'var(--secondary)' : 'var(--primary)', color: isRecipe ? 'var(--text-main)' : 'white' }}>
                            {isRecipe ? 'Receta' : 'Artículo'}
                        </span>
                        <h1 className="h1" style={{ marginBottom: '1.5rem', lineHeight: 1.2 }}>{post.title}</h1>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            {isRecipe ? (
                                <>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> <strong>Tiempo:</strong> {post.prepTime}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><strong>Dificultad:</strong> {post.difficulty}</span>
                                </>
                            ) : (
                                <>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> {post.date}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={16} /> {post.author}</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div style={{ height: '450px', background: 'var(--surface-alt)', borderRadius: 'var(--radius)', marginBottom: '3rem', overflow: 'hidden' }}>
                        <img
                            src={post.image}
                            alt={post.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    {/* Content */}
                    <div className="body-lg" style={{ lineHeight: 1.8, color: 'var(--text-main)' }}>
                        {isRecipe ? (
                            <div>
                                <p style={{ marginBottom: '2rem', fontSize: '1.2rem', fontStyle: 'italic' }}>{post.description}</p>

                                <div style={{ background: 'var(--surface-alt)', padding: '2rem', borderRadius: 'var(--radius)', marginBottom: '3rem' }}>
                                    <h3 className="h3" style={{ marginBottom: '1.5rem' }}>Ingredientes</h3>
                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        {post.ingredients.map((ing, idx) => (
                                            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></span>
                                                {ing.name}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Call to Client Component */}
                                    <AddIngredientsButton ingredients={post.ingredients} />
                                </div>

                                <h3 className="h3" style={{ marginBottom: '1.5rem' }}>Instrucciones</h3>
                                <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {post.steps.map((step, idx) => (
                                        <li key={idx} style={{ paddingLeft: '1rem' }}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        ) : (
                            <div>
                                {/* Simple rendering for article content */}
                                <p>{post.content}</p>
                            </div>
                        )}
                    </div>

                </div>
            </article>

            <Footer />
        </>
    );
}
