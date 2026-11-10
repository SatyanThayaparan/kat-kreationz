import { useLocation, useOutlet } from 'react-router-dom'

/** Soft enter fade on route change — remount keyed by pathname. */
export function PageFade() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <div key={location.pathname} className="page-fade">
      {outlet}
    </div>
  )
}
