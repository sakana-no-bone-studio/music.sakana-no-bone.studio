import { Cookies } from 'react-cookie-consent'

export default function removeMatchedCookies(regex: RegExp, domain: string) {
  if (!navigator.cookieEnabled) return
  const cookieNames = document.cookie.split(/=[^;]*(?:;\s*|$)/)
  cookieNames.forEach((name) => {
    if (regex.test(name)) {
      Cookies.remove(name)
    }
  })
}
