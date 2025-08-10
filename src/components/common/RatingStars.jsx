export default function RatingStars({ rating = 0, count }) {
  const rounded = Math.round(rating * 2) / 2
  const stars = [1, 2, 3, 4, 5]
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
      {stars.map(s => (
        <svg key={s} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={s <= rounded ? '#f59e0b' : 'none'} stroke="#f59e0b" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.2 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.986 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.2-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ))}
      {typeof count === 'number' && (
        <span className="ml-1 text-xs text-gray-500">({count})</span>
      )}
    </div>
  )
}
