import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET() {
    try {
        // Check if columns exist first to avoid errors on re-run (simplified approach: just try adding)
        // Using separate queries for safety
        try {
            await query("ALTER TABLE consult_doctors ADD COLUMN status VARCHAR(20) DEFAULT 'pending'");
        } catch (e) {
            console.log("Column status might already exist");
        }

        try {
            await query("ALTER TABLE consult_doctors ADD COLUMN remarks TEXT");
        } catch (e) {
            console.log("Column remarks might already exist");
        }

        return NextResponse.json({ success: true, message: 'Table consult_doctors updated' });
    } catch (error) {
        console.error('Error updating table:', error);
        return NextResponse.json({ error: 'Failed to update table' }, { status: 500 });
    }
}
