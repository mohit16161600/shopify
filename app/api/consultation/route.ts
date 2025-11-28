import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const customer_id = searchParams.get('customer_id');

        if (!customer_id) {
            return NextResponse.json({ error: 'Missing customer_id' }, { status: 400 });
        }

        const history = await query(
            'SELECT * FROM consult_doctors WHERE customer_id = ? ORDER BY created_at DESC',
            [customer_id]
        );

        return NextResponse.json(history);
    } catch (error) {
        console.error('Error fetching consultation history:', error);
        return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            customer_id,
            name,
            email,
            phone,
            weight,
            height,
            age,
            health_issues,
            consult_time,
            consult_date
        } = body;

        if (!customer_id || !name || !email) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check for existing active consultation (pending)
        const existing = await query(
            "SELECT id FROM consult_doctors WHERE customer_id = ? AND status = 'pending'",
            [customer_id]
        );

        if (Array.isArray(existing) && existing.length > 0) {
            return NextResponse.json(
                { error: 'You already have a pending consultation request.' },
                { status: 400 }
            );
        }

        const sql = `
      INSERT INTO consult_doctors (
        customer_id, name, email, phone, weight, height, age, health_issues, consult_time, consult_date, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `;

        await query(sql, [
            customer_id,
            name,
            email,
            phone,
            weight,
            height,
            age,
            health_issues,
            consult_time,
            consult_date
        ]);

        return NextResponse.json({ success: true, message: 'Consultation request submitted' });
    } catch (error) {
        console.error('Error submitting consultation:', error);
        return NextResponse.json(
            { error: 'Failed to submit consultation' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const {
            id,
            customer_id,
            weight,
            height,
            age,
            health_issues,
            consult_time,
            consult_date
        } = body;

        if (!id || !customer_id) {
            return NextResponse.json({ error: 'Missing ID or Customer ID' }, { status: 400 });
        }

        // Check if meeting link is already generated
        const current = await query(
            "SELECT meet_link FROM consult_doctors WHERE id = ? AND customer_id = ?",
            [id, customer_id]
        ) as any[];

        if (Array.isArray(current) && current.length > 0 && current[0].meet_link) {
            return NextResponse.json(
                { error: 'Cannot update consultation after meeting link is generated.' },
                { status: 403 }
            );
        }

        const sql = `
            UPDATE consult_doctors 
            SET weight = ?, height = ?, age = ?, health_issues = ?, consult_time = ?, consult_date = ?
            WHERE id = ? AND customer_id = ?
        `;

        await query(sql, [
            weight,
            height,
            age,
            health_issues,
            consult_time,
            consult_date,
            id,
            customer_id
        ]);

        return NextResponse.json({ success: true, message: 'Consultation updated successfully' });
    } catch (error) {
        console.error('Error updating consultation:', error);
        return NextResponse.json({ error: 'Failed to update consultation' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const customer_id = searchParams.get('customer_id');

        if (!id || !customer_id) {
            return NextResponse.json({ error: 'Missing ID or Customer ID' }, { status: 400 });
        }

        const sql = `
            UPDATE consult_doctors 
            SET status = 'deleted'
            WHERE id = ? AND customer_id = ? AND status = 'pending'
        `;

        const result = await query(sql, [id, customer_id]) as any;

        // Check if any row was updated (if not, it might not be pending or not exist)
        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Consultation cannot be deleted (must be pending).' }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: 'Consultation deleted successfully' });
    } catch (error) {
        console.error('Error deleting consultation:', error);
        return NextResponse.json({ error: 'Failed to delete consultation' }, { status: 500 });
    }
}
