'use client';

import { Code, Grid, useClipboard, useLayout, useTheme, useToasts } from 'components';
import { UIThemesPalette } from 'components/themes';
import { generateColor } from 'components/themes/utils';
import { ColorVariable } from 'components/themes/utils/color-variable';
import React, { useMemo } from 'react';
import { Gradient } from '../../../../components/themes/presets/index';
import { getColorData } from './colors-data';

interface Props {
  type: string;
}

const getColorItem = (type: string, palette: UIThemesPalette, copy: (text: string) => void) => {
  const data = getColorData(type);

  const getColor = (color: string) => {
    const generated = generateColor(color);
    return generated.contrast;
  };

  const keys = Object.keys(data);

  const isGradient = (obj: any): obj is Gradient => {
    if (typeof obj === 'string') {
      return false;
    }
    return obj && 'from' in obj && 'to' in obj;
  };

  const isColorVariable = obj => {
    if (typeof obj === 'string') {
      return false;
    }
    return obj && 'value' in obj && 'contrast' in obj && 'light' in obj && 'dark' in obj;
  };

  const isSingleColor = obj => {
    return typeof obj === 'string';
  };

  const SingleColorComponent = ({ name, palette }: { name: string; palette: string }) => (
    <div className="color" style={{ color: getColor(palette), background: palette }}>
      <Grid.Container justify="space-between" style={{ height: '4.5rem' }}>
        <Grid.Container alignItems="center" sm={8} xs={16}>
          <span className="usage" onClick={() => copy(`theme.palette.${name}`)}>
            theme.palette.{name}
          </span>
        </Grid.Container>

        <Grid.Container alignItems="center" justify="flex-end" sm={8} xs>
          <span className="value" onClick={() => copy(palette as string)}>
            {palette as string}
          </span>
        </Grid.Container>
      </Grid.Container>
    </div>
  );

  const GradientColorComponent = ({ name, palette }: { name: string; palette: Gradient }) => (
    <div
      className="color"
      style={{ color: getColor(palette.from), background: 'linear-gradient(to right, ' + palette.from + ' 0% , ' + palette.to + ') 100%' }}
    >
      <Grid.Container justify="space-between" style={{ height: '4.5rem' }}>
        <Grid.Container alignItems="center" sm={8} xs={16}>
          <span className="usage" onClick={() => copy(`theme.palette.${name}.from`)}>
            theme.palette.{name}.from
          </span>

          <span className="usage" onClick={() => copy(`theme.palette.${name}.to`)}>
            theme.palette.{name}.to
          </span>
        </Grid.Container>

        <Grid.Container alignItems="center" justify="flex-end" sm={8} xs>
          <div className="values">
            <span className="value" onClick={() => copy((palette as Gradient).from)}>
              {(palette as Gradient).from}
            </span>

            <span className="value" onClick={() => copy((palette as Gradient).to)}>
              {(palette as Gradient).to}
            </span>
          </div>
        </Grid.Container>
      </Grid.Container>
    </div>
  );

  const ColorVariantComponent = ({ palette, name }: { name: string; palette: ColorVariable }) => {
    const keys = Object.keys(palette);
    return (
      <>
        {keys.map((key, index) => (
          <div key={index}>
            <div className="color" style={{ color: getColor(palette[key]), background: palette[key] }}>
              <Grid.Container justify="space-between" style={{ height: '4.5rem' }}>
                <Grid.Container alignItems="center" sm={8} xs={16}>
                  <span className="usage" onClick={() => copy(`theme.palette.${name}.${key}`)}>
                    theme.palette.{name}.{key}
                  </span>
                </Grid.Container>

                <Grid.Container alignItems="center" justify="flex-end" sm={8} xs>
                  <span className="value" onClick={() => copy(palette[key] as string)}>
                    {palette[key] as string}
                  </span>
                </Grid.Container>
              </Grid.Container>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (keys as Array<keyof UIThemesPalette>).map((key, index) => (
    <div className="color-stack" key={`color-item-${index}`}>
      {isSingleColor(palette[key]) && <SingleColorComponent key={`color-item-${index}`} name={key} palette={palette[key] as string}></SingleColorComponent>}
      {isGradient(palette[key]) && <GradientColorComponent key={`color-item-${index}`} name={key} palette={palette[key] as Gradient}></GradientColorComponent>}
      {isColorVariable(palette[key]) && (
        <ColorVariantComponent key={`color-item-${index}`} name={key} palette={palette[key] as ColorVariable}></ColorVariantComponent>
      )}
    </div>
  ));
};

const Colors: React.FC<Props> = ({ type }) => {
  const theme = useTheme();
  const layout = useLayout();
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
          padding: ${layout.gap};
          position: relative;
          user-select: none;
          border-radius: 4px;
          margin-top: 12px;
        }

        .colors :global(.color h4) {
          margin: 0;
        }
        .colors :global(.usage) {
          font-size: 1rem;
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
  );
};

export default Colors;
