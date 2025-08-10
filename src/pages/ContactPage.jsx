import { useEffect, useState } from 'react'
import { setPageSEO } from '../utils/seo'

export default function ContactPage() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  useEffect(() => setPageSEO({ title: 'Contact Us – Gadgets Store', description: 'Get in touch with our support team.' }), [])

  function handleSubmit(e) {
    e.preventDefault()
    const { name, email, message } = values
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!name || !emailOk || !message) {
      setStatus('Please fill out all fields correctly.')
      return
    }
    setStatus('Thanks for reaching out! We will reply soon.')
    setValues({ name: '', email: '', message: '' })
  }

  return (
    <div className="container-responsive py-12 grid gap-8 md:grid-cols-2">
      <section>
        <h1 className="text-2xl font-bold">Contact Us</h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">Have questions? Send us a message.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="label" htmlFor="name">Name</label>
            <input id="name" className="input" value={values.name} onChange={e => setValues(v => ({ ...v, name: e.target.value }))} required />
          </div>
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input id="email" type="email" className="input" value={values.email} onChange={e => setValues(v => ({ ...v, email: e.target.value }))} required />
          </div>
          <div>
            <label className="label" htmlFor="message">Message</label>
            <textarea id="message" className="input h-32" value={values.message} onChange={e => setValues(v => ({ ...v, message: e.target.value }))} required />
          </div>
          <button className="btn-primary" type="submit">Send Message</button>
          {status && <div className="text-green-600">{status}</div>}
        </form>
      </section>
      <aside className="card p-6 h-fit">
        <h2 className="font-semibold mb-2">Store Details</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Email: support@gadgets.store</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Phone: +1 (555) 012-3456</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Hours: Mon–Fri, 9am–6pm</p>
      </aside>
    </div>
  )
}
