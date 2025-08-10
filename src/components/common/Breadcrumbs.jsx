import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
      <ol className="flex items-center gap-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {idx > 0 && <span>/</span>}
            {item.to ? <Link to={item.to} className="hover:text-primary">{item.label}</Link> : <span>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
