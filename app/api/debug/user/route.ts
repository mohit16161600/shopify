import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET() {
    try {
        const users: any = await query('SELECT id, email, password, status FROM customers ORDER BY id DESC LIMIT 5');
        const schema: any = await query('DESCRIBE customers');
        return NextResponse.json({ users, schema });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
