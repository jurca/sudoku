export default () => {
  const userAgent = (typeof navigator !== 'undefined' && navigator ? navigator : {}).userAgent || ''
  return /(?: iPhone | Android )/.test(userAgent)
}
