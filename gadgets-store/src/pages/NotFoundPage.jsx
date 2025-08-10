import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="container-responsive py-20 text-center">
      <h1 className="text-4xl font-extrabold">404</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary mt-6 inline-flex">Go Home</Link>
    </div>
  )
}