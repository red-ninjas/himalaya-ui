import { parserStyle, getSpecifiedColorVar } from './utils'
import type { Config, CustomPlugin } from 'svgo'
import type { XastElement } from 'svgo/lib/types'



export const svgoOptions: Config = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          cleanupNumericValues: {
            floatPrecision: 1,
          },
        },
      },
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: ['svg:width', 'svg:height', 'svg:color', 'svg:data-testid', 'svg:class'],
      },
    },
  ],
}