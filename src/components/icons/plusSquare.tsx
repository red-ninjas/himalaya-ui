import * as React from 'react'
const SvgPlusSquare = props => (
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
    <path d="M12 8v8M8 12h8" />
  </svg>
)
export default SvgPlusSquare

