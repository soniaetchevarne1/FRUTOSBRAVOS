"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
    const password = formData.get('password') as string;

    // Simple hardcoded password for now - User can change this later
    const CORRECT_PASSWORD = "sonia";

    if (password === CORRECT_PASSWORD) {
        const cookieStore = await cookies();
        // Set a cookie that lasts 7 days
        cookieStore.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        });
        redirect('/admin');
    } else {
        // Determine how to return error, for simple action we redirect with error param
        redirect('/admin/login?error=true');
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/admin/login');
}
