import * as React from 'react'
const SvgImage = props => (
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
    <circle cx={8.5} cy={8.5} r={1.5} />
    <path d="m21 15-5-5L5 21" />
  </svg>
)
export default SvgImage

