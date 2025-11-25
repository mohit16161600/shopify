import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET() {
    try {
        const categories = await query('SELECT name, image, id FROM categories ORDER BY `row` ASC');
        return NextResponse.json(categories);
    } catch (error: any) {
        return NextResponse.json({ message: 'Failed to fetch categories', error: error.message }, { status: 500 });
    }
}
