'use client'

import React, { useMemo } from 'react'
import { useTheme, useToasts, Code, Grid, useClipboard, useLayout } from 'components'
import { getColorData, getCurrentColor } from './colors-data'
import { UIThemesPalette } from 'components/themes'
import { Gradient } from '../../../../components/themes/presets/index'

interface Props {
  type: string
}

const getColorItem = (
  type: string,
  palette: UIThemesPalette,
  copy: (text: string) => void,
) => {
  const data = getColorData(type)
  const getColor = (index: number) => getCurrentColor(palette, type, index)
  const keys = Object.keys(data)

  return (keys as Array<keyof UIThemesPalette>).map((key, index) => (
    <div className="color" key={`color-item-${index}`}>
      <Grid.Container justify="space-between" style={{ height: '4.5rem' }}>
        <Grid.Container alignItems="center" sm={8} xs={16}>
          <h4>{data[key]}</h4>
        </Grid.Container>
        <Grid.Container alignItems="center" justify="center" sm={8} xs={0}>
          <span className="usage" onClick={() => copy(`theme.palette.${key}`)}>
            theme.palette.{key}
          </span>
        </Grid.Container>

        {typeof palette[key] === 'string' && (
          <Grid.Container alignItems="center" justify="flex-end" sm={8} xs>
            <span className="value" onClick={() => copy(palette[key] as string)}>
              {palette[key] as string}
            </span>
          </Grid.Container>
        )}

        {typeof palette[key] !== 'string' && (
          <Grid.Container alignItems="center" justify="flex-end" sm={8} xs>
            <div className="values">
              <span
                className="value"
                onClick={() => copy((palette[key] as Gradient).from)}
              >
                {(palette[key] as Gradient).from}
              </span>

              <span className="value" onClick={() => copy((palette[key] as Gradient).to)}>
                {(palette[key] as Gradient).to}
              </span>
            </div>
          </Grid.Container>
        )}
      </Grid.Container>
      <style jsx>{`
        .color {
          background: ${typeof palette[key] === 'string'
            ? palette[key]
            : 'linear-gradient(to right, ' +
              (palette[key] as Gradient).from +
              ' 0% , ' +
              (palette[key] as Gradient).to +
              ') 100%'};
          color: ${getColor(index)};
        }
      `}</style>
    </div>
  ))
}

const Colors: React.FC<Props> = ({ type }) => {
  const theme = useTheme()
  const layout = useLayout()
  const { copy } = useClipboard()
  const { setToast } = useToasts()
  const copyText = (text: string) => {
    copy(text)
    setToast({
      text: (
        <span>
          Copied <Code>{text}</Code>
        </span>
      ),
    })
  }
  const colorItems = useMemo(
    () => getColorItem(type, theme.palette, copyText),
    [type, theme.palette],
  )

  return (
    <div className="colors">
      {colorItems}
      <style jsx>{`
        .colors {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .colors :global(.color) {
          padding: ${layout.gap};
          position: relative;
          user-select: none;
        }
        .colors :global(.color:first-child) {
          border-top-left-radius: ${theme.style.radius};
          border-top-right-radius: ${theme.style.radius};
        }
        .colors :global(.color:last-child) {
          border-bottom-left-radius: ${theme.style.radius};
          border-bottom-right-radius: ${theme.style.radius};
        }
        .colors :global(.color h4) {
          margin: 0;
        }
        .colors :global(.usage) {
          font-size: 1rem;
          padding: 1rem;
          cursor: pointer;
        }
        .colors :global(.value) {
          font-size: 0.875rem;
          text-transform: uppercase;
          cursor: pointer;
        }
        .colors :global(.values) {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  )
}

export default Colors
