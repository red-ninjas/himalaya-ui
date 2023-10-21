import * as React from 'react'
const SvgCreditCard = props => (
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
    <rect width={22} height={16} x={1} y={4} rx={2} ry={2} />
    <path d="M1 10h22" />
  </svg>
)
export default SvgCreditCard

