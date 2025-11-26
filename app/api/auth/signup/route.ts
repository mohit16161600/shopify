import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const { firstName, lastName, email, phone, password } = await request.json();

        // Basic validation
        if (!firstName || !lastName || !email || !phone || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUsers: any = await query(
            'SELECT id FROM customers WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return NextResponse.json(
                { error: 'Email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Generate UUID
        const userId = crypto.randomUUID();

        // Insert new user
        const result: any = await query(
            `INSERT INTO customers (id, first_name, last_name, email, phone, password, status) 
       VALUES (?, ?, ?, ?, ?, ?, '1')`,
            [userId, firstName, lastName, email, phone, password]
        );

        return NextResponse.json(
            {
                message: 'User created successfully',
                userId: userId
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
