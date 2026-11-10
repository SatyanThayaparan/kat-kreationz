type LogoMarkProps = {
  size?: number
  className?: string
}

export function LogoMark({ size = 120, className = '' }: LogoMarkProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Kat Kreationz logo"
    >
      <circle cx="80" cy="80" r="72" stroke="var(--gold)" strokeWidth="1.4" />
      <circle cx="80" cy="80" r="66" stroke="var(--gold)" strokeWidth="0.7" opacity="0.75" />
      <path
        d="M48 48 L48 112 M48 80 L82 48 M48 80 L82 112"
        stroke="var(--ivory)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M72 48 L72 112 M72 80 L106 48 M72 80 L106 112"
        stroke="var(--ivory)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <path
        d="M28 108 C38 98, 44 84, 48 68 C52 84, 58 98, 70 110"
        stroke="var(--ivory)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M34 104 C40 96, 44 88, 46 78"
        stroke="var(--ivory)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
    </svg>
  )
}
