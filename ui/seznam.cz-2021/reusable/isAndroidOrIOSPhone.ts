import * as sbrowserApis from '@seznam/seznam.cz-browser-game-module-api'

export default () => {
  const isTablet = sbrowserApis.isTablet()
  const userAgent = (typeof navigator !== 'undefined' && navigator ? navigator : {}).userAgent || ''
  return !isTablet && /(?:\(iPhone;| Android )/.test(userAgent)
}
