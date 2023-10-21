import * as React from 'react'
const SvgChrome = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    {...props}>
    <circle cx={12} cy={12} r={10} />
    <circle cx={12} cy={12} r={4} />
    <path d="M21.17 8H12M3.95 6.06 8.54 14M10.88 21.94 15.46 14" />
  </svg>
)
export default SvgChrome

