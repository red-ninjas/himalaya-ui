'use client';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import FieldsetTitle from './fieldset-title';
import FieldsetSubtitle from './fieldset-subtitle';
import FieldsetFooter from './fieldset-footer';
import FieldsetContent from './fieldset-content';
import { hasChild, pickChild } from '../utils/collections';
import { useFieldset } from './fieldset-context';
import useWarning from '../utils/use-warning';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {
  value?: string;
  label?: string;
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
}

type NativeAttrs = Omit<React.FieldsetHTMLAttributes<HTMLDivElement>, keyof Props>;
export type FieldsetProps = Props & NativeAttrs;

const FieldsetComponent: React.FC<React.PropsWithChildren<FieldsetProps>> = ({
  className,
  title = '' as string | ReactNode,
  subtitle = '' as string | ReactNode,
  children,
  value = '',
  label = '',
  ...props
}: React.PropsWithChildren<FieldsetProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();

  const { inGroup, currentValue, register } = useFieldset();
  const [hidden, setHidden] = useState<boolean>(inGroup);
  const classes = useClasses('fieldset', className, CLASS_NAMES);

  const [withoutFooterChildren, FooterChildren] = pickChild(children, FieldsetFooter);
  const hasTitle = hasChild(withoutFooterChildren, FieldsetTitle);
  const hasSubtitle = hasChild(withoutFooterChildren, FieldsetSubtitle);
  const hasContent = hasChild(withoutFooterChildren, FieldsetContent);

  if (inGroup) {
    if (!label) {
      useWarning('Props "label" is required when in a group.', 'Fieldset Group');
    }
    if (!value || value === '') {
      value = label;
    }

    useEffect(() => {
      register && register({ value, label });
    }, []);

    useEffect(() => {
      // In a few cases, the user will set Fieldset state manually.
      // If the user incorrectly set the state, Group component should ignore it.
      /* istanbul ignore if */
      if (!currentValue || currentValue === '') return;
      setHidden(currentValue !== value);
    }, [currentValue]);
  }

  const content = useMemo(
    () => (
      <>
        {withoutFooterChildren}
        {!hasTitle && title && <FieldsetTitle>{title}</FieldsetTitle>}
        {!hasSubtitle && subtitle && <FieldsetSubtitle>{subtitle}</FieldsetSubtitle>}
      </>
    ),
    [withoutFooterChildren, hasTitle, hasSubtitle, title, subtitle],
  );

  return (
    <div className={classes} {...props}>
      {hasContent ? content : <FieldsetContent>{content}</FieldsetContent>}
      {FooterChildren && FooterChildren}
      <style jsx>{`
        .fieldset {
          background-color: var(--color-background-1000);
          border: 1px solid var(--color-border-1000);
          border-radius: var(--layout-radius);
          overflow: hidden;
          display: ${hidden ? 'none' : 'block'};
        }

        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'fieldset')}
        ${SCALE.w(1, value => `width: ${value};`, 'auto', 'fieldset')}
        ${SCALE.font(1, value => `--fieldset-font-size: ${value};`, undefined, 'fieldset')}
        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'fieldset')}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'fieldset')}
        ${UNIT('fieldset')}
      `}</style>
    </div>
  );
};

FieldsetComponent.displayName = 'HimalayaFieldset';
const Fieldset = React.memo(withScale(FieldsetComponent));
export default Fieldset;
