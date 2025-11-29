import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const queryText = searchParams.get('q');

        if (!queryText || queryText.length < 2) {
            return NextResponse.json([]);
        }

        const likeQuery = `%${queryText}%`;
        // Fetch titles and categories that match
        const results = await query(
            'SELECT title FROM products WHERE title LIKE ? LIMIT 5',
            [likeQuery]
        ) as any[];

        const suggestions = results.map((row: any) => row.title);

        return NextResponse.json(suggestions);
    } catch (error: any) {
        return NextResponse.json({ message: 'Failed to fetch suggestions', error: error.message }, { status: 500 });
    }
}
