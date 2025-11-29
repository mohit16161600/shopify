import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET() {
    try {
        const doctors = await query('SELECT image, star, detail, name, post FROM doctor_detail');
        return NextResponse.json(doctors);
    } catch (error: any) {
        return NextResponse.json({ message: 'Failed to fetch doctors', error: error.message }, { status: 500 });
    }
}
