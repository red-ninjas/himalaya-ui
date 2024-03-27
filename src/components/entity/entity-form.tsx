'use client';

import { EntityFormProps } from './index';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';
import { PropsWithChildren } from 'react';

function EntityFormComponent({
  children,
  title = 'Add New',
  primaryAction = null,
  secondaryAction = null,
  destructiveAction = null,
  extraActions = null,
  footerNote = null,
  footerSeparator = true,
}: PropsWithChildren<EntityFormProps>) {
  const { SCALER, RESPONSIVE } = useScale();
  const entityFormClasses = useClasses({
    'entity-form-wrapper': true,
  });

  const entityFooterClasses = useClasses({
    'entity-form-footer': true,
    separator: footerSeparator,
  });

  const footerNoteInlineClasses = useClasses({
    'entity-footer-note-inline': true,
    separator: footerSeparator,
  });

  return (
    <>
      <div className={entityFormClasses}>
        <div className="entity-form-title">
          <p className="entity-title entity-ellipsis">{title}</p>
          {extraActions}
        </div>
        {children}
        {destructiveAction && footerNote && (
          <div className={footerNoteInlineClasses}>
            <p className="entity-body-text">{footerNote}</p>
          </div>
        )}
        <div className={entityFooterClasses}>
          {!destructiveAction && footerNote && (
            <div className="entity-footer-note-inline">
              <p className="entity-body-text">{footerNote}</p>
            </div>
          )}
          {destructiveAction && <div className="entity-form-footer-destructive-action">{destructiveAction}</div>}
          <span className="entity-form-spacer entity-spacer expand"></span>
          {secondaryAction && <div className="entity-form-footer-secondary-action">{secondaryAction}</div>}
          {primaryAction && <div className="entity-form-footer-primary-action">{primaryAction}</div>}
        </div>
      </div>
      <style jsx>{`
        .entity-form-wrapper {
          position: relative;
          box-sizing: border-box;
          border: 1px solid var(--color-border-1000);

          .entity-body-text {
            font-weight: 600;
            line-height: 1.6;
          }

          .entity-form-title {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            border-bottom: 1px solid var(--color-border);
            margin-bottom: 23px;

            .entity-title {
              self-align: 'flex-start';
              margin-top: 0;
              margin-bottom: 0;
              font-weight: 600;
              color: var(--color-background-100);
              flex: 1 1;
            }
          }
        }

        .entity-form-footer {
          display: flex;
          box-sizing: content-box;
          align-items: center;
          justify-content: center;
          .entity-footer-note-inline {
            margin-top: var(--entity-form-mt);
          }
        }

        .entity-form-footer-primary-action {
          margin-left: var(--entity-form-ml);
        }

        ${RESPONSIVE.padding(1, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, `entity-form-wrapper`)}
        ${RESPONSIVE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', `entity-form-wrapper`)}
        ${RESPONSIVE.mt(100, value => `margin-top: ${value}px;`, undefined, 'entity-footer-note-inline')}
        ${RESPONSIVE.ml(1, value => `margin-right: ${value}px;`, undefined, 'entity-form-footer-primary-action')}

        ${RESPONSIVE.padding(
          { left: 0, right: 0, top: 1, bottom: 1 },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'entity-form-title',
        )}
        ${RESPONSIVE.font(0.875, value => `font-size: ${value}rem;`, undefined, 'entity-body-text')}
        ${SCALER('entity-form-wrapper')}
      `}</style>
    </>
  );
}

EntityFormComponent.displayName = 'HimalayaEntityForm';
const EntityForm = withScale(EntityFormComponent);

export default EntityForm;
