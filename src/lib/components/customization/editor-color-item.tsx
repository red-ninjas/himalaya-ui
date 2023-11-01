import { Popover, Themes, useLayout, useTheme } from 'components';
import { UIThemesPalette } from 'components/themes';
import React, { useMemo } from 'react';
import { TwitterPicker } from 'react-color';
const DefaultTheme = Themes.getPresetStaticTheme();

interface Props {
  value?: string;
  keyName: keyof UIThemesPalette;
}

const getRandomColor = () => {
  const hex = `00000${((Math.random() * 0x1000000) << 0).toString(16)}`;
  return `#${hex.substr(-6)}`;
};

const getRandomColors = () => {
  const kyes = Object.keys(DefaultTheme.palette) as Array<keyof UIThemesPalette>;
  const basicColors = new Array(5).fill('').map(() => {
    const index = Math.round(Math.random() * kyes.length) + kyes.length;
    const value = DefaultTheme.palette[kyes[index]];

    if (typeof value === 'string') {
      return value;
    } else if (value['from'] !== undefined) {
      return (value as any).from as string;
    } else if (value['value'] !== undefined) {
      return (value as any).value as string;
    }
  });
  const deduplicatedColors = [...new Set(...basicColors)];
  const randomColors = new Array(10 - deduplicatedColors.length).fill('').map(() => getRandomColor());
  return deduplicatedColors.concat(randomColors);
};

const EditorColorItem: React.FC<React.PropsWithChildren<Props>> = ({ keyName }) => {
  const theme = useTheme();
  const layout = useLayout();
  const label = `${keyName}`;
  const mainColor = useMemo(() => theme.palette[keyName], [theme.palette, keyName]);
  let mainColorConverted = '';
  if (typeof mainColor === 'string') {
    mainColorConverted = mainColor;
  } else if (mainColor['from'] !== undefined) {
    return (mainColor as any).from;
  } else if (mainColor['value'] !== undefined) {
    return (mainColor as any).value;
  }
  const randomColors = useMemo(() => getRandomColors(), []);
  const colorChangeHandler = () => {};

  const popoverContent = (color: string) => <TwitterPicker triangle="hide" color={color} onChangeComplete={colorChangeHandler} colors={randomColors} />;
  return (
    <Popover content={() => popoverContent(mainColorConverted)} portalClassName="editor-popover" offset={3}>
      <div className="editor-item">
        <div className="dot-box">
          <span className="dot" />
        </div>
        {label}
        <style jsx>{`
          .editor-item {
            background-color: transparent;
            width: auto;
            padding: 0 ${layout.gapHalf};
            line-height: 2rem;
            display: inline-flex;
            align-items: center;
            border: 1px solid ${theme.palette.border};
            border-radius: ${theme.style.radius};
            color: ${theme.palette.accents_5};
            margin-right: 0.75rem;
            margin-bottom: 0.5rem;
            cursor: pointer;
            transition: color 200ms ease;
          }

          :global(.editor-popover .inner) {
            padding: 0 !important;
          }

          :global(.editor-popover .twitter-picker) {
            box-shadow: none !important;
            border: 0 !important;
            background: transparent !important;
          }

          .editor-item:hover {
            color: ${theme.palette.accents_8};
          }

          .editor-item:hover .dot {
            transform: scale(1);
          }

          .dot-box,
          .dot {
            display: inline-flex;
            justify-content: center;
            align-items: center;
          }

          .dot-box {
            width: 1rem;
            height: 1rem;
            margin-right: 0.75rem;
          }

          .dot {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: ${mainColor};
            transform: scale(0.8);
            transition: transform 200ms ease;
          }
        `}</style>
      </div>
    </Popover>
  );
};

export default EditorColorItem;
