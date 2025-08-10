import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()
const app = express()

app.use(cors({ origin: '*'}))
app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (_, res) => res.json({ ok: true }))

// Products
app.get('/products', async (req, res) => {
  const { category, minPrice, maxPrice, sort } = req.query
  const where = {
    ...(category ? { category } : {}),
    ...(minPrice || maxPrice ? { price: { gte: minPrice ? Number(minPrice) : undefined, lte: maxPrice ? Number(maxPrice) : undefined } } : {}),
  }
  const orderBy = sort === 'price-asc' ? { price: 'asc' } : sort === 'price-desc' ? { price: 'desc' } : { createdAt: 'desc' }
  const products = await prisma.product.findMany({ where, orderBy, include: { images: true, reviews: true } })
  res.json(products)
})

app.get('/products/:slug', async (req, res) => {
  const product = await prisma.product.findUnique({ where: { slug: req.params.slug }, include: { images: true, reviews: true } })
  if (!product) return res.status(404).json({ error: 'Not found' })
  res.json(product)
})

// Reviews
app.post('/products/:slug/reviews', async (req, res) => {
  const schema = z.object({ author: z.string().min(1), rating: z.number().min(1).max(5), text: z.string().min(1) })
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error)
  const product = await prisma.product.findUnique({ where: { slug: req.params.slug } })
  if (!product) return res.status(404).json({ error: 'Not found' })
  const review = await prisma.review.create({ data: { ...parsed.data, productId: product.id } })
  res.status(201).json(review)
})

// Orders
app.post('/orders', async (req, res) => {
  const schema = z.object({
    email: z.string().email(), fullName: z.string().min(2), phone: z.string().min(7), address: z.string().min(4), city: z.string().min(1), zip: z.string().min(1), payment: z.enum(['card','cod']),
    items: z.array(z.object({ productId: z.string(), quantity: z.number().int().positive() })).min(1),
  })
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error)

  // fetch products and compute total
  const ids = parsed.data.items.map(i => i.productId)
  const dbProducts = await prisma.product.findMany({ where: { id: { in: ids } } })
  const idToProduct = new Map(dbProducts.map(p => [p.id, p]))
  let total = 0
  for (const item of parsed.data.items) {
    const p = idToProduct.get(item.productId)
    if (!p) return res.status(400).json({ error: 'Invalid product: ' + item.productId })
    total += Number(p.price) * item.quantity
  }

  const order = await prisma.order.create({
    data: {
      email: parsed.data.email,
      fullName: parsed.data.fullName,
      phone: parsed.data.phone,
      address: parsed.data.address,
      city: parsed.data.city,
      zip: parsed.data.zip,
      payment: parsed.data.payment,
      total,
      items: {
        create: parsed.data.items.map(item => {
          const p = idToProduct.get(item.productId)
          return { productId: item.productId, title: p.title, price: p.price, quantity: item.quantity }
        })
      }
    },
    include: { items: true }
  })
  res.status(201).json(order)
})

// Newsletter
app.post('/newsletter', async (req, res) => {
  const schema = z.object({ email: z.string().email() })
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error)
  const sub = await prisma.newsletter.upsert({ where: { email: parsed.data.email }, update: {}, create: { email: parsed.data.email } })
  res.status(201).json(sub)
})

// Contact
app.post('/contact', async (req, res) => {
  const schema = z.object({ name: z.string().min(1), email: z.string().email(), message: z.string().min(1) })
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error)
  const msg = await prisma.contactMessage.create({ data: parsed.data })
  res.status(201).json(msg)
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`))