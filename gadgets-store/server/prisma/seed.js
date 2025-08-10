import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.review.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()

  const items = [
    {
      slug: 'iphone-15-pro-256gb',
      title: 'iPhone 15 Pro 256GB',
      category: 'Smartphones',
      description: 'The latest iPhone 15 Pro with powerful A17 Pro chip, ProMotion display, and advanced camera system.',
      price: 1099,
      stock: 12,
      images: [
        'https://images.unsplash.com/photo-1695048131573-0dc27dedd288?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1695048140738-3f2263f4b3f5?q=80&w=1200&auto=format&fit=crop',
      ],
      reviews: [
        { author: 'Alex', rating: 5, text: 'Blazing fast and beautiful display.' },
        { author: 'Mia', rating: 4, text: 'Great phone, battery life could be better.' },
      ],
    },
    {
      slug: 'samsung-galaxy-s24-ultra',
      title: 'Samsung Galaxy S24 Ultra',
      category: 'Smartphones',
      description: 'Epic camera, vivid display, and all-day battery in the Galaxy S24 Ultra.',
      price: 1199,
      stock: 8,
      images: [
        'https://images.unsplash.com/photo-1610945415295-d9bbf67f6b1b?q=80&w=1200&auto=format&fit=crop',
      ],
      reviews: [
        { author: 'Sam', rating: 5, text: 'Camera is phenomenal!' },
      ],
    },
    {
      slug: 'sony-wh-1000xm5',
      title: 'Sony WH-1000XM5 Headphones',
      category: 'Headphones',
      description: 'Industry-leading noise cancellation with premium sound and comfort.',
      price: 399,
      stock: 25,
      images: [
        'https://images.unsplash.com/photo-1518447962129-5bcf8f65b7a6?q=80&w=1200&auto=format&fit=crop',
      ],
      reviews: [
        { author: 'Priya', rating: 5, text: 'Best ANC headphones I have used.' },
      ],
    },
    {
      slug: 'apple-watch-series-9',
      title: 'Apple Watch Series 9',
      category: 'Smartwatches',
      description: 'Powerful health features, brilliant display, and seamless iPhone integration.',
      price: 449,
      stock: 0,
      images: [
        'https://images.unsplash.com/photo-1511732351157-1865efcb7b7b?q=80&w=1200&auto=format&fit=crop',
      ],
      reviews: [],
    },
  ]

  for (const p of items) {
    await prisma.product.create({
      data: {
        slug: p.slug,
        title: p.title,
        category: p.category,
        description: p.description,
        price: p.price,
        stock: p.stock,
        images: { create: p.images.map(url => ({ url })) },
        reviews: { create: p.reviews },
      }
    })
  }

  console.log('Seed complete')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(async () => { await prisma.$disconnect() })