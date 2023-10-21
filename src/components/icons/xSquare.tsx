import * as React from 'react'
const SvgXSquare = props => (
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
    <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
    <path d="m9 9 6 6M15 9l-6 6" />
  </svg>
)
export default SvgXSquare

