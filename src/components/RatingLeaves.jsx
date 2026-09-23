function Leaf({ filled, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'var(--color-moss)' : 'none'}
      stroke={filled ? 'var(--color-moss)' : 'var(--color-stone)'}
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="M20 4C10 4 4 10 4 18c0 1 0 2 .3 2.7C5 21 6 21 6 21c8 0 14-6 14-14 0-1-.3-2-1-3z" />
      <path d="M6 21C10 15 14 11 19 6" strokeWidth="1" opacity={filled ? 0.6 : 0.3} />
    </svg>
  )
}

export default function RatingLeaves({ value = 0, onChange, size = 20, readOnly = false }) {
  const leaves = [1, 2, 3, 4, 5]
  return (
    <div
      className="rating-leaves"
      role={readOnly ? undefined : 'radiogroup'}
      aria-label="Avaliação em folhas"
    >
      {leaves.map((n) => (
        <button
          key={n}
          type="button"
          disabled={readOnly}
          className="leaf-btn"
          aria-label={`${n} de 5 folhas`}
          aria-pressed={value >= n}
          onClick={() => onChange && onChange(n === value ? 0 : n)}
        >
          <Leaf filled={value >= n} size={size} />
        </button>
      ))}
    </div>
  )
}
