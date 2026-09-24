import type { IconName } from '../data/pillars'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function PillarIcon({ name }: { name: IconName }) {
  switch (name) {
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" {...stroke}>
          <path d="M12 3l7 3v5c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'heart':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 20.5S3.5 15.6 3.5 9.6C3.5 6.7 5.7 4.7 8.3 4.7c1.7 0 3 1 3.7 2.2.7-1.2 2-2.2 3.7-2.2 2.6 0 4.8 2 4.8 4.9 0 6-8.5 10.9-8.5 10.9z" />
        </svg>
      )
    case 'paw':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="6.5" cy="10" r="1.7" />
          <circle cx="11" cy="7.6" r="1.9" />
          <circle cx="16" cy="8.4" r="1.7" />
          <circle cx="19" cy="12" r="1.5" />
          <path d="M12 12.4c-2.9 0-5.2 2-5.2 4.3 0 1.9 2.1 2.4 5.2 2.4s5.2-.5 5.2-2.4c0-2.3-2.3-4.3-5.2-4.3z" />
        </svg>
      )
    case 'chip':
      return (
        <svg viewBox="0 0 24 24" {...stroke}>
          <rect x="7" y="7" width="10" height="10" rx="2" />
          <rect x="10" y="10" width="4" height="4" rx="1" />
          <path d="M9.5 7V4M14.5 7V4M9.5 20v-3M14.5 20v-3M7 9.5H4M7 14.5H4M20 9.5h-3M20 14.5h-3" />
        </svg>
      )
    case 'star':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.5l1.9 6.1 6.1.1-4.9 3.7 1.8 6.1-4.9-3.6-4.9 3.6 1.8-6.1L4 8.7l6.1-.1z" />
        </svg>
      )
    case 'smile':
      return (
        <svg viewBox="0 0 24 24" {...stroke}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 14c.9 1.3 2.1 2 3.5 2s2.6-.7 3.5-2" />
          <circle cx="9" cy="10" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="15" cy="10" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      )
  }
}
