let lockCount = 0

function shellScroll() {
  return document.querySelector('.shell-scroll') as HTMLElement | null
}

export function lockPageScroll() {
  lockCount += 1
  if (lockCount !== 1) return
  document.body.style.overflow = 'hidden'
  const shell = shellScroll()
  if (shell) shell.style.overflow = 'hidden'
}

export function unlockPageScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount !== 0) return
  document.body.style.overflow = ''
  const shell = shellScroll()
  if (shell) shell.style.overflow = ''
}
