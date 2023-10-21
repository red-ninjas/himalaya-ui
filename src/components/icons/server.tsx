import * as React from 'react'
const SvgServer = props => (
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
    <rect width={20} height={8} x={2} y={2} rx={2} ry={2} />
    <rect width={20} height={8} x={2} y={14} rx={2} ry={2} />
    <path d="M6 6h.01M6 18h.01" />
  </svg>
)
export default SvgServer

