// https://webpack.js.org/guides/typescript/#importing-other-assets

declare module '*.svg' {
  const content: React.ComponentType<{className?: string}>
  export default content
}

declare module '!!raw-loader!*' {
  const contents: string
  export = contents
}
