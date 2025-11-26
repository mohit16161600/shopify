import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Find user
        const users: any = await query('SELECT * FROM customers WHERE email = ?', [email]);

        if (users.length === 0) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const user = users[0];

        if (user.status !== 1) {
            return NextResponse.json({ error: 'Account is inactive. Contact support.' }, { status: 403 });
        }

        // Password match (plain text)
        if (password !== user.password) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Remove password before sending response
        const { password: _, ...safeUser } = user;

        return NextResponse.json({ message: 'Login successful', user: safeUser }, { status: 200 });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
