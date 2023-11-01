'use client';

import { EntityFormProps } from './index';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';
import useTheme from '../use-theme';
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
  const theme = useTheme();
  const { SCALES } = useScale();
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
          padding: ${SCALES.pt(1)} ${SCALES.pr(1)} ${SCALES.pb(1)} ${SCALES.pl(1)};
          border: 1px solid ${theme.palette.accents_2};
          border-radius: ${theme.style.radius};

          .entity-body-text {
            font-weight: 600;
            font-size: ${SCALES.font(0.875)};
            line-height: 1.6;
          }

          .entity-form-title {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            padding-bottom: ${SCALES.pb(1)};
            margin-bottom: ${SCALES.mb(1)};
            border-bottom: 1px solid ${theme.palette.accents_3};

            .entity-title {
              self-align: 'flex-start';
              margin-top: 0;
              margin-bottom: 0;
              font-weight: 600;
              color: ${theme.palette.accents_8};
              flex: 1 1;
            }
          }

          .entity-form-footer {
            display: flex;
            box-sizing: content-box;
            align-items: center;
            justify-content: center;
            min-height: ${SCALES.height(2)};
            padding-top: ${SCALES.pt(1)};

            .entity-form-spacer {
              margin-top: ${SCALES.mt(0.9375)};
            }

            .entity-form-footer-primary-action {
              margin-left: ${SCALES.ml(1)};
            }
          }

          .separator {
            margin-top: ${SCALES.mt(1)};
            border-top: 1px solid ${theme.palette.accents_3};
          }
        }
      `}</style>
    </>
  );
}

EntityFormComponent.displayName = 'HimalayaEntityForm';
const EntityForm = withScale(EntityFormComponent);

export default EntityForm;
