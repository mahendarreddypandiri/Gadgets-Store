import { useEffect } from 'react'
import { setPageSEO } from '../utils/seo'

const faqs = [
  { q: 'What is the return policy?', a: 'You can return items within 30 days of delivery in original condition.' },
  { q: 'Do you offer international shipping?', a: 'Yes, we ship to most countries. Shipping fees apply.' },
  { q: 'How can I track my order?', a: 'You will receive a tracking link via email once your order ships.' },
]

export default function FaqPage() {
  useEffect(() => setPageSEO({ title: 'FAQ – Gadgets Store', description: 'Answers to common questions.' }), [])
  return (
    <div className="container-responsive py-12">
      <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
      <div className="mt-6 space-y-4">
        {faqs.map((f, idx) => (
          <div key={idx} className="card p-4">
            <h3 className="font-semibold">{f.q}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
