import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import clientStyles from './admin.module.css'; // Assuming this has styles we can reuse or simpler inline
import { loginAction } from '../auth';

// We need a small client wrapper or just a form with action.
// Let's make this page a server component with a form that posts to server action.

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    const cookieStore = await cookies();
    const isLoggedIn = cookieStore.get('admin_session');

    if (isLoggedIn) {
        redirect('/admin');
    }

    const { error } = await searchParams;

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--background)'
        }}>
            <div className="card" style={{ padding: '2rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <h1 className="h2" style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Acceso Admin</h1>
                <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                    Ingresá la contraseña para gestionar tu tienda.
                </p>

                <form action={loginAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        required
                        style={{
                            padding: '0.75rem',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            fontSize: '1rem'
                        }}
                    />
                    {error && (
                        <div style={{ color: 'var(--error)', fontSize: '0.9rem' }}>Contraseña incorrecta</div>
                    )}
                    <button type="submit" className="btn btn-primary">
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
}
