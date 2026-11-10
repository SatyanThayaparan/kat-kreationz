type IconProps = {
  className?: string
}

export function PhoneIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7.2 3.8c.4-.4 1-.5 1.5-.3l2.2.9c.6.2 1 .8.9 1.4l-.4 2.3c-.1.5.1 1 .5 1.3l1.6 1.3c1.3 1 2.5 2.2 3.5 3.5l1.3 1.6c.3.4.8.6 1.3.5l2.3-.4c.6-.1 1.2.3 1.4.9l.9 2.2c.2.5.1 1.1-.3 1.5l-1.1 1.1c-.5.5-1.2.8-1.9.7-2.3-.2-5.3-1.5-8.3-4.5S4.4 9.8 4.2 7.5c-.1-.7.2-1.4.7-1.9L7.2 3.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function InstagramIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  )
}
