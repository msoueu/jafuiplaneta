export default function EmptyState({ title, text, cta }) {
  return (
    <div className="empty-state">
      <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="var(--color-stone)" strokeWidth="1.2">
        <path d="M20 4C10 4 4 10 4 18c0 1 0 2 .3 2.7C5 21 6 21 6 21c8 0 14-6 14-14 0-1-.3-2-1-3z" />
        <path d="M6 21C10 15 14 11 19 6" strokeWidth="1" opacity="0.4" />
      </svg>
      <h3>{title}</h3>
      <p>{text}</p>
      {cta}
    </div>
  )
}
