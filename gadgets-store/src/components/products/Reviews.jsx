import RatingStars from '../common/RatingStars'

export default function Reviews({ reviews = [] }) {
  if (!reviews.length) return <p className="text-sm text-gray-500">No reviews yet.</p>
  return (
    <ul className="space-y-4">
      {reviews.map((r, idx) => (
        <li key={idx} className="border-b border-gray-200 dark:border-gray-800 pb-3">
          <div className="flex items-center justify-between">
            <div className="font-medium">{r.author}</div>
            <RatingStars rating={r.rating} />
          </div>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{r.text}</p>
        </li>
      ))}
    </ul>
  )
}