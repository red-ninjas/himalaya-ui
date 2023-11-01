import RotateCcwIcon from 'components/icons/rotateCcw';
import { Button, Text, useLayout, useTheme } from 'components';
import { UIThemesExpressiveness, UIThemesPalette } from 'components/themes';
import EditorColorItem from './editor-color-item';
import EditorInputItem from './editor-input-item';

const basicColors: Array<keyof UIThemesPalette> = [
  'accents_1',
  'accents_2',
  'accents_3',
  'accents_4',
  'accents_5',
  'accents_6',
  'accents_7',
  'accents_8',
  'foreground',
  'background',
];
const statusColors: Array<keyof UIThemesPalette> = ['success', 'error', 'warning', 'primary', 'tertiary', 'secondary'];
const otherColors: Array<keyof UIThemesPalette> = ['primary', 'tertiary', 'selection', 'secondary', 'link', 'border', 'code'];
const expressiveness: Array<keyof UIThemesExpressiveness> = ['linkStyle', 'linkHoverStyle', 'dropdownBoxShadow', 'shadowSmall', 'shadowMedium', 'shadowLarge'];

const Editor = () => {
  const theme = useTheme();
  const layout = useLayout();

  const restColors = () => {};
  const resetExpressiveness = () => {};

  return (
    <div className="editor">
      <Text h3 mt="40px" font="22px">
        {'Colors'}
        <Button type="abort" icon={<RotateCcwIcon />} auto px={0.65} scale={0.4} ml="10px" onClick={restColors} />
      </Text>
      <p className="subtitle">{'basic'}</p>
      <div className="content">
        {basicColors.map((item, index) => (
          <EditorColorItem key={`${item}-${index}`} keyName={item} />
        ))}
      </div>
      <p className="subtitle">{'status'}</p>
      <div className="content">
        {statusColors.map((item, index) => (
          <EditorColorItem key={`${item}-${index}`} keyName={item} />
        ))}
      </div>
      <p className="subtitle">{'others'}</p>
      <div className="content">
        {otherColors.map((item, index) => (
          <EditorColorItem key={`${item}-${index}`} keyName={item} />
        ))}
      </div>

      <Text h3 mt="40px">
        {'Expressiveness'}
        <Button type="abort" icon={<RotateCcwIcon />} auto px={0.65} scale={0.4} ml="10px" onClick={resetExpressiveness} />
      </Text>
      <p className="subtitle">{'basic'}</p>
      <div className="content">
        {expressiveness.map((item, index) => (
          <EditorInputItem key={`${item}-${index}`} groupName="expressiveness" keyName={item} />
        ))}
      </div>
      <style jsx>{`
        .content {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          width: auto;
          margin: 0 auto;
          padding-left: ${layout.gapQuarter};
        }

        .subtitle {
          color: ${theme.palette.accents_4};
          text-transform: uppercase;
          font-size: 0.75rem;
          margin-top: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Editor;
