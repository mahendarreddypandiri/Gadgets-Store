import { useEffect } from 'react'
import { setPageSEO } from '../utils/seo'

export default function AboutPage() {
  useEffect(() => setPageSEO({ title: 'About Us – Gadgets Store', description: 'Learn about our mission and story.' }), [])
  return (
    <div className="container-responsive py-12">
      <h1 className="text-2xl font-bold">About Gadgets Store</h1>
      <p className="mt-4 max-w-3xl text-gray-700 dark:text-gray-300">We are passionate about bringing the latest and greatest gadgets to tech enthusiasts worldwide. Our mission is to provide a seamless, trustworthy, and delightful shopping experience with fast shipping and supportive customer service.</p>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="card p-6"><h3 className="font-semibold">Quality Products</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-2">We curate devices from top brands and trusted partners.</p></div>
        <div className="card p-6"><h3 className="font-semibold">Fast Delivery</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Orders ship quickly so you get your tech sooner.</p></div>
        <div className="card p-6"><h3 className="font-semibold">Easy Returns</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Not satisfied? Our return process is simple and fair.</p></div>
      </div>
    </div>
  )
}