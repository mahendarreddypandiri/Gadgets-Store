import { useEffect, useState } from 'react'

export default function PriceRange({ min = 0, max = 2000, value, onChange }) {
  const [minVal, setMinVal] = useState(value?.[0] ?? min)
  const [maxVal, setMaxVal] = useState(value?.[1] ?? max)

  useEffect(() => { onChange([minVal, maxVal]) }, [minVal, maxVal])

  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span>${minVal}</span>
        <span>${maxVal}</span>
      </div>
      <div className="relative h-2">
        <input type="range" min={min} max={max} value={minVal} onChange={(e) => setMinVal(Math.min(Number(e.target.value), maxVal - 1))} className="absolute w-full appearance-none pointer-events-none" style={{ zIndex: 3 }} />
        <input type="range" min={min} max={max} value={maxVal} onChange={(e) => setMaxVal(Math.max(Number(e.target.value), minVal + 1))} className="absolute w-full appearance-none pointer-events-none" style={{ zIndex: 4 }} />
        <div className="absolute inset-0 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="absolute h-2 rounded bg-primary" style={{ left: `${(minVal - min) / (max - min) * 100}%`, right: `${100 - (maxVal - min) / (max - min) * 100}%` }} />
      </div>
    </div>
  )
}