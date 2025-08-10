export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700">
      <button type="button" className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-900" onClick={() => onChange(Math.max(min, value - 1))} aria-label="Decrease">-</button>
      <input type="number" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} className="w-14 border-x border-gray-300 dark:border-gray-700 bg-transparent text-center py-2 focus:outline-none" />
      <button type="button" className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-900" onClick={() => onChange(Math.min(max, value + 1))} aria-label="Increase">+</button>
    </div>
  )
}
