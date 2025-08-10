const products = [
  {
    id: 'sp-iphone-15',
    title: 'iPhone 15 Pro 256GB',
    category: 'Smartphones',
    price: 1099,
    stock: 12,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1695048131573-0dc27dedd288?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1695048140738-3f2263f4b3f5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1696766252672-7fddb4d53dca?q=80&w=1200&auto=format&fit=crop',
    ],
    description: 'The latest iPhone 15 Pro with powerful A17 Pro chip, ProMotion display, and advanced camera system.',
    reviews: [
      { author: 'Alex', rating: 5, text: 'Blazing fast and beautiful display.' },
      { author: 'Mia', rating: 4, text: 'Great phone, battery life could be better.' },
    ],
  },
  {
    id: 'sp-galaxy-s24',
    title: 'Samsung Galaxy S24 Ultra',
    category: 'Smartphones',
    price: 1199,
    stock: 8,
    rating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf67f6b1b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610945413385-1a1d21fb9056?q=80&w=1200&auto=format&fit=crop',
    ],
    description: 'Epic camera, vivid display, and all-day battery in the Galaxy S24 Ultra.',
    reviews: [
      { author: 'Sam', rating: 5, text: 'Camera is phenomenal!' },
    ],
  },
  {
    id: 'hp-sony-wh1000xm5',
    title: 'Sony WH-1000XM5 Headphones',
    category: 'Headphones',
    price: 399,
    stock: 25,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1518447962129-5bcf8f65b7a6?q=80&w=1200&auto=format&fit=crop',
    ],
    description: 'Industry-leading noise cancellation with premium sound and comfort.',
    reviews: [
      { author: 'Priya', rating: 5, text: 'Best ANC headphones I have used.' },
    ],
  },
  {
    id: 'sw-apple-watch',
    title: 'Apple Watch Series 9',
    category: 'Smartwatches',
    price: 449,
    stock: 0,
    rating: 4.5,
    images: [
      'https://images.unsplash.com/photo-1511732351157-1865efcb7b7b?q=80&w=1200&auto=format&fit=crop',
    ],
    description: 'Powerful health features, brilliant display, and seamless iPhone integration.',
    reviews: [],
  },
  {
    id: 'ac-anker-powerbank',
    title: 'Anker 20,000mAh Power Bank',
    category: 'Accessories',
    price: 59,
    stock: 50,
    rating: 4.4,
    images: [
      'https://images.unsplash.com/photo-1585060543828-cb23e89c79fa?q=80&w=1200&auto=format&fit=crop',
    ],
    description: 'High-capacity portable charger for phones and tablets with fast charging.',
    reviews: [
      { author: 'Diego', rating: 4, text: 'Great value and capacity.' },
    ],
  },
  {
    id: 'hp-airpods-pro-2',
    title: 'AirPods Pro (2nd Gen)',
    category: 'Headphones',
    price: 249,
    stock: 18,
    rating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=1200&auto=format&fit=crop',
    ],
    description: 'Active noise cancellation with adaptive transparency and personalized fit.',
    reviews: [],
  },
  {
    id: 'sw-galaxy-watch',
    title: 'Samsung Galaxy Watch 6',
    category: 'Smartwatches',
    price: 329,
    stock: 10,
    rating: 4.3,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop',
    ],
    description: 'Track your fitness and stay connected with a stylish smartwatch.',
    reviews: [],
  },
  {
    id: 'ac-usb-c-cable',
    title: 'USB-C Fast Charging Cable (2m)',
    category: 'Accessories',
    price: 19,
    stock: 100,
    rating: 4.2,
    images: [
      'https://images.unsplash.com/photo-1586917383423-c25e88ac05ce?q=80&w=1200&auto=format&fit=crop',
    ],
    description: 'Durable braided USB-C cable for fast data transfer and charging.',
    reviews: [],
  },
]

export const allCategories = Array.from(new Set(products.map(p => p.category)))

export default products
