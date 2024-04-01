'use client';

import { Code, Grid, Tooltip, useClasses, useClipboard, useTheme, useToasts } from 'components';
import { UIThemesPalette } from 'components/themes';
import { getContrast } from 'components/themes/utils';
import { isColorVariable, isGradient } from 'components/utils/color';
import React, { useMemo } from 'react';
import { Gradient } from '../../../../components/themes/presets/index';
import { getColorData } from './colors-data';

interface Props {
  type: string;
}

const getColorItem = (type: string, palette: UIThemesPalette, copy: (text: string) => void) => {
  const data = getColorData(type);

  const getColor = (color: string) => {
    const generated = getContrast(color);
    return generated;
  };

  const keys = Object.keys(data);

  const GradientColorComponent = ({ name, palette }: { name: string; palette: Gradient }) => (
    <div
      className="color"
      style={{ color: getColor(palette.from), background: 'linear-gradient(to right, ' + palette.from + ' 0% , ' + palette.to + ') 100%' }}
    >
      <Grid.Container justify="space-between" style={{ height: '4.5rem' }}>
        <Grid xs>
          <div className="values">
            <span className="usage" onClick={() => copy(`--${name.replace('_', '-')}-from`)}>
              <Tooltip style={{ width: '100%' }} text={`--${name.replace('_', '-')}-from`}>
                {(palette as Gradient).from}
              </Tooltip>
            </span>
          </div>
        </Grid>

        <Grid xs>
          <div className="values">
            <span className="usage" onClick={() => copy(`--${name.replace('_', '-')}-to`)}>
              <Tooltip style={{ width: '100%' }} text={`--${name.replace('_', '-')}-to`}>
                {(palette as Gradient).to}
              </Tooltip>
            </span>
          </div>
        </Grid>
      </Grid.Container>
    </div>
  );

  const ColorVariantComponent = ({ palette, name }: { name: string; palette: any }) => {
    const keys = Object.keys(palette);
    return (
      <Grid.Container gap={1}>
        {keys.map((key, index) => (
          <Grid xs={12} md={4} lg={3} key={index}>
            <div
              className={useClasses('color', {
                main: key == 'hex_1000',
              })}
              style={{ color: getColor(palette[key]), background: palette[key], width: '100%' }}
              onClick={() => copy(`--color-${name}-${key.replace('hex_', '')}`)}
            >
              <Tooltip style={{ width: '100%' }} text={`--color-${name}-${key.replace('hex_', '')}`}>
                <div className="usage">{palette[key] as string}</div>
              </Tooltip>
            </div>
          </Grid>
        ))}
      </Grid.Container>
    );
  };

  return (keys as Array<keyof UIThemesPalette>).map((key, index) => (
    <div className="color-stack" key={`color-item-${index}`}>
      {isGradient(palette[key]) && <GradientColorComponent key={`color-item-${index}`} name={key} palette={palette[key] as Gradient}></GradientColorComponent>}
      {isColorVariable(palette[key]) && <ColorVariantComponent key={`color-item-${index}`} name={key} palette={palette[key]}></ColorVariantComponent>}
    </div>
  ));
};

const Colors: React.FC<Props> = ({ type }) => {
  const theme = useTheme();
  const { copy } = useClipboard();
  const { setToast } = useToasts();
  const copyText = (text: string) => {
    copy(text);
    setToast({
      text: (
        <span>
          Copied <Code>{text}</Code>
        </span>
      ),
    });
  };
  const colorItems = useMemo(() => getColorItem(type, theme.palette, copyText), [type, theme.palette]);

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
          position: relative;
          user-select: none;
          border-radius: 4px;
          margin-top: 12px;
          border: 2px solid var(--color-border-1000);
        }

        .colors :global(.color.main) {
          border: 2px solid var(--color-primary-1000);
        }

        .colors :global(.color h4) {
          margin: 0;
        }
        .colors :global(.usage) {
          font-size: 0.8rem;
          cursor: pointer;
          width: 100%;
          height: 100%;
          cursor: pointer;
          display: block;
          padding: 6px 8px;
          line-height: 40px;
          text-align: center;
        }
        .colors :global(.value) {
          font-size: 1rem;
          text-transform: uppercase;
          cursor: pointer;
        }
        .colors :global(.values) {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default Colors;
