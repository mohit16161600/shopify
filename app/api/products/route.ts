import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';
import { getProduct } from '@/app/lib/products';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const category = searchParams.get('category');
        const categoryId = searchParams.get('categoryId');

        if (id) {
            const product = await getProduct(parseInt(id));
            if (!product) {
                return NextResponse.json({ message: 'Product not found' }, { status: 404 });
            }
            return NextResponse.json(product);
        }

        let sql = 'SELECT id, title, vendor, rating, variants, prefrence, image, images, view_category FROM products';
        const params: any[] = [];

        if (category) {
            sql += ' WHERE view_category = ?';
            params.push(category);
        } else if (categoryId) {
            sql += ' WHERE category_id = ?';
            params.push(categoryId);
        }

        const results = await query(sql, params);

        const products = Array.isArray(results) ? results.map((row: any) => {
            let price = 0;
            let originalPrice = 0;
            let discount = 0;

            let variants: any[] = [];
            try {
                variants = JSON.parse(row.variants);
                if (variants && variants.length > 0) {
                    price = parseFloat(variants[0].price || '0');
                    originalPrice = parseFloat(variants[0].compare_at_price || '0');

                    if (originalPrice > price) {
                        discount = Math.round(((originalPrice - price) / originalPrice) * 100);
                    }
                }
            } catch (e) {
                console.error('Error parsing variants for product', row.id, e);
            }

            let image = row.image || '/placeholder.jpg';
            try {
                const imagesData = JSON.parse(row.images || '[]');
                if (Array.isArray(imagesData) && imagesData.length > 0) {
                    imagesData.sort((a: any, b: any) => (a.position || 0) - (b.position || 0));
                    if (imagesData[0].src) {
                        image = imagesData[0].src;
                    }
                }
            } catch (e) {
                console.error('Error parsing images for product', row.id, e);
            }

            return {
                id: row.id,
                name: row.title,
                brand: row.vendor,
                price: price,
                originalPrice: originalPrice,
                discount: discount,
                rating: row.rating || 0,
                reviews: 0, // Not available in DB yet
                loyaltyCoins: parseInt(row.prefrence || '0'),
                image: image,
                category: row.view_category,
                variants: variants.map((v: any) => ({
                    id: v.id,
                    name: v.title,
                    price: parseFloat(v.price),
                    originalPrice: parseFloat(v.compare_at_price || v.price)
                }))
            };
        }) : [];

        return NextResponse.json(products);
    } catch (error: any) {
        console.error('Database error fetching products:', error);
        return NextResponse.json(
            { message: 'Failed to fetch products', error: error.message },
            { status: 500 }
        );
    }
}
