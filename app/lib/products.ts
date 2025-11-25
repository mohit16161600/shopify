import { query } from '@/app/lib/db';

export interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    originalPrice: number;
    discount: number;
    rating: number;
    reviews: number;
    loyaltyCoins: number;
    images: string[];
    variants: any[];
    description: string;
    keyBenefits: string[];
    keyIngredients: any[];
    howToUse: any;
    faqs: any[];
    testimonials: any[];
    frequentlyBoughtTogether: number[];
    celebrity?: any;
    doctorAdvice?: any;
    symptoms?: any;
}

export async function getProduct(id: number): Promise<Product | null> {
    try {
        const results = await query('SELECT * FROM products WHERE id = ?', [id]);

        if (!Array.isArray(results) || results.length === 0) {
            return null;
        }

        const row = (results as any)[0];
        let variants: any[] = [];
        let body: any[] = [];
        let price = 0;
        let originalPrice = 0;
        let discount = 0;

        // Parse Variants
        try {
            variants = JSON.parse(row.variants || '[]');
            if (variants.length > 0) {
                price = parseFloat(variants[0].price || '0');
                originalPrice = parseFloat(variants[0].compare_at_price || '0');
                if (originalPrice > price) {
                    discount = Math.round(((originalPrice - price) / originalPrice) * 100);
                }
            }
        } catch (e) {
            console.error('Error parsing variants:', e);
        }

        // Parse Body
        try {
            body = JSON.parse(row.body || '[]');
        } catch (e) {
            console.error('Error parsing body:', e);
        }

        // Extract sections from body
        const descriptionSection = body.find((item: any) => item.type === 'description');
        const keyBenefitsSection = body.find((item: any) => item.type === 'key_benefits');
        const keyIngredientsSection = body.find((item: any) => item.type === 'key_ingredients');
        const howToUseSection = body.find((item: any) => item.type === 'how_to_use');
        const faqsSection = body.find((item: any) => item.type === 'faqs');
        const testimonialsSection = body.find((item: any) => item.type === 'testimonials');
        const celebritySection = body.find((item: any) => item.type === 'celebrity');
        const doctorAdviceSection = body.find((item: any) => item.type === 'doctor_advice');
        const symptomsSection = body.find((item: any) => item.type === 'symptoms');

        // Parse Images
        const images: string[] = [];
        try {
            const imagesData = JSON.parse(row.images || '[]');
            if (Array.isArray(imagesData)) {
                imagesData.sort((a: any, b: any) => (a.position || 0) - (b.position || 0));
                imagesData.forEach((img: any) => {
                    if (img.src) images.push(img.src);
                });
            }
        } catch (e) {
            console.error('Error parsing images:', e);
        }

        // Fallback if no images found
        if (images.length === 0) {
            if (row.image) images.push(row.image); // Legacy fallback
            else images.push('/placeholder.jpg');
        }

        return {
            id: row.id,
            name: row.title,
            brand: row.vendor,
            price,
            originalPrice,
            discount,
            rating: row.rating || 0,
            reviews: 0, // Not in DB
            loyaltyCoins: parseInt(row.prefrence || '0'),
            images,
            variants: variants.map((v: any) => ({
                id: v.id,
                name: v.title, // e.g. "1 Month"
                price: parseFloat(v.price),
                originalPrice: parseFloat(v.compare_at_price || v.price)
            })),
            description: descriptionSection?.description || '',
            keyBenefits: keyBenefitsSection?.items?.map((item: any) => item.description) || [],
            keyIngredients: keyIngredientsSection?.items || [],
            howToUse: howToUseSection || null,
            faqs: faqsSection?.items || [],
            testimonials: testimonialsSection?.items || [], // These seem to be videos in the JSON
            frequentlyBoughtTogether: [], // Not in DB, maybe hardcode or logic?
            celebrity: celebritySection || null,
            doctorAdvice: doctorAdviceSection || null,
            symptoms: symptomsSection || null
        };

    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}
