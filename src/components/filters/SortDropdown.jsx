export default function SortDropdown({ value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className="input">
      <option value="popular">Popularity</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="newest">Newest</option>
    </select>
  )
}
