import * as React from 'react'
const SvgVideo = props => (
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
    <path d="m23 7-7 5 7 5V7z" />
    <rect width={15} height={14} x={1} y={5} rx={2} ry={2} />
  </svg>
)
export default SvgVideo

