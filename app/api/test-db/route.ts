import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET() {
    try {
        const result = await query('SELECT 1 as val');
        return NextResponse.json({ message: 'Database connected successfully', result });
    } catch (error: any) {
        return NextResponse.json({ message: 'Database connection failed', error: error.message }, { status: 500 });
    }
}
