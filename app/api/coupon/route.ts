import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET() {
    try {
        const results = await query('SELECT code, percentage_off FROM discount_coupons');

        // Transform DB results to the expected format
        const coupons: { [key: string]: { discount: number; type: 'percent' | 'fixed' } } = {};

        if (Array.isArray(results)) {
            results.forEach((row: any) => {
                if (row.code && row.percentage_off) {
                    coupons[row.code] = {
                        discount: Number(row.percentage_off),
                        type: 'percent' // Assuming percentage based on column name
                    };
                }
            });
        }

        return NextResponse.json(coupons);
    } catch (error: any) {
        console.error('Database error fetching coupons:', error);
        return NextResponse.json(
            { message: 'Failed to fetch coupons', error: error.message },
            { status: 500 }
        );
    }
}
