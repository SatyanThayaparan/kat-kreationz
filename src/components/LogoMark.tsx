type LogoMarkProps = {
  size?: number
  className?: string
  /** Full circle (nav/footer) or flat-bottom mark for hero + wordmark. */
  variant?: 'mark' | 'hero'
  alt?: string
}

/**
 * Brand logo from the overlapping script KK artwork.
 * - mark: full circular emblem (navbar / footer)
 * - hero: bottom of circle cropped flat for text underneath
 */
export function LogoMark({
  size = 120,
  className = '',
  variant = 'mark',
  alt = 'Kat Kreationz logo',
}: LogoMarkProps) {
  if (variant === 'hero') {
    const height = Math.round(size * 0.89)
    return (
      <img
        className={`logo-mark logo-mark--hero ${className}`.trim()}
        src="/brand/kat-kreationz-mark-script-hero-v4.png"
        alt={alt}
        width={size}
        height={height}
        decoding="async"
      />
    )
  }

  return (
    <img
      className={`logo-mark ${className}`.trim()}
      src="/brand/kat-kreationz-mark-script-v4.png"
      alt={alt}
      width={size}
      height={size}
      decoding="async"
      style={{ width: size, height: size }}
    />
  )
}
