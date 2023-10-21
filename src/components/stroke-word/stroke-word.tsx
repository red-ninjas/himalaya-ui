'use client'

import { StrokeWordsProp } from '.'
import useTheme from '../use-theme'
import { PropsWithChildren } from 'react'

const StrokeWord: React.FC<PropsWithChildren<StrokeWordsProp>> = ({
  children,
  stroke = 1,
}) => {
  const theme = useTheme()
  return (
    <span className="stroke">
      {children}
      <style jsx>
        {`
          .stroke {
            display: inline-block;
            color: transparent;
            -webkit-text-stroke: ${stroke}px ${theme.palette.foreground};
          }
        `}
      </style>
    </span>
  )
}
export default StrokeWord
