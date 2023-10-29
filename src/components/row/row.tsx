'use client';
import React, { useMemo } from 'react';
import useLayout from '../use-layout';

type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
type Align = 'top' | 'middle' | 'bottom';

interface Props {
  gap?: number;
  justify?: Justify;
  align?: Align;
  component?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type RowProps = Props & NativeAttrs;

const getFlexAlignment = (justify: Justify, align: Align) => {
  const flexJustifyMap: { [key in Justify]?: string } = {
    end: 'flex-end',
    center: 'center',
    'space-around': 'space-around',
    'space-between': 'space-between',
  };
  const flexAlignMap: { [key in Align]?: string } = {
    middle: 'center',
    bottom: 'flex-end',
  };
  return {
    justifyValue: flexJustifyMap[justify] || 'normal',
    alignValue: flexAlignMap[align] || 'normal',
  };
};

const Container: React.FC<React.PropsWithChildren<RowProps>> = ({
  children,
  component = 'div' as keyof React.JSX.IntrinsicElements,
  gap = 0,
  justify = 'start' as Justify,
  align = 'top' as Align,
  className = '',
  ...props
}: React.PropsWithChildren<RowProps>) => {
  const Component = component;
  const layout = useLayout();
  const { justifyValue, alignValue } = useMemo(() => getFlexAlignment(justify, align), [justify, align]);

  return (
    <Component className={`row ${className}`} {...props}>
      {children}
      <style jsx>{`
        .row {
          display: flex;
          position: relative;
          box-sizing: border-box;
          margin-left: calc(${gap} * ${layout.gap} / 2);
          margin-right: calc(${gap} * ${layout.gap} / 2);
          --row-gap: calc(${gap} * ${layout.gap});
          justify-content: ${justifyValue};
          align-items: ${alignValue};
        }
      `}</style>
    </Component>
  );
};

Container.displayName = 'HimalayaContainer';
export default Container;
