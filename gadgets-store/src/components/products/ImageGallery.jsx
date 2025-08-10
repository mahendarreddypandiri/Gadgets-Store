import { useState } from 'react'

export default function ImageGallery({ images = [], title }) {
  const [active, setActive] = useState(0)
  const main = images[active] || images[0]
  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
        {main && (
          <img src={main} alt={title} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((src, idx) => (
            <button key={idx} className={`aspect-square overflow-hidden rounded border ${idx === active ? 'border-primary' : 'border-gray-200 dark:border-gray-800'}`} onClick={() => setActive(idx)} aria-label={`Show image ${idx + 1}`}>
              <img src={src} alt={`${title} thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}