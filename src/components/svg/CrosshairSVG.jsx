export default function CrosshairSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="36" stroke="#e8c53a" strokeWidth="2" />
      <line x1="22" y1="22" x2="58" y2="58" stroke="#e8c53a" strokeWidth="2" />
      <line x1="58" y1="22" x2="22" y2="58" stroke="#e8c53a" strokeWidth="2" />
      <circle cx="40" cy="40" r="6" stroke="#e8c53a" strokeWidth="1.5" />
      <line x1="40" y1="4"  x2="40" y2="14" stroke="#e8c53a" strokeWidth="1.5" />
      <line x1="40" y1="66" x2="40" y2="76" stroke="#e8c53a" strokeWidth="1.5" />
      <line x1="4"  y1="40" x2="14" y2="40" stroke="#e8c53a" strokeWidth="1.5" />
      <line x1="66" y1="40" x2="76" y2="40" stroke="#e8c53a" strokeWidth="1.5" />
    </svg>
  )
}
