import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET() {
    try {
        const videos = await query(
            "SELECT * FROM shoppable_videos WHERE status = 'active'"
        );
        return NextResponse.json(videos);
    } catch (error) {
        console.error('Error fetching shoppable videos:', error);
        return NextResponse.json(
            { error: 'Failed to fetch videos' },
            { status: 500 }
        );
    }
}
