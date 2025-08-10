import { Link } from 'react-router-dom'
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  function subscribe(e) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg('Please enter a valid email')
      return
    }
    setMsg('Thanks for subscribing!')
    setEmail('')
  }

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="container-responsive grid gap-8 py-10 md:grid-cols-4">
        <div>
          <h3 className="font-heading font-semibold text-lg">Gadgets Store</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Shop smartphones, headphones, smartwatches, and accessories.</p>
          <div className="mt-4 flex gap-3 text-xl text-primary">
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary">Returns</a></li>
            <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Newsletter</h4>
          <form onSubmit={subscribe} className="space-y-2">
            <label htmlFor="newsletter" className="label">Email</label>
            <div className="flex gap-2">
              <input id="newsletter" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="input" required />
              <button className="btn-primary" type="submit">Subscribe</button>
            </div>
            {msg && <p className="text-sm text-green-600">{msg}</p>}
          </form>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Gadgets Store. All rights reserved.
      </div>
    </footer>
  )
}