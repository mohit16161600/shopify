import { notFound } from 'next/navigation';
import ProductDetails from '@/app/components/Product/ProductDetails';
import { getProduct } from '@/app/lib/products';

export async function generateStaticParams() {
  // Generate static params for all products
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ];
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Handle both Promise and direct params (for Next.js 15 compatibility)
  const resolvedParams = params instanceof Promise ? await params : params;
  const productId = parseInt(resolvedParams.id);

  // Validate product ID
  if (isNaN(productId)) {
    notFound();
  }

  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}

