'use client';

import useLayout from 'components/use-layout';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { EntityFieldProps } from './index';

function EntityFieldComponent({
  title,
  description,
  active = true,
  width = 'auto',
  right = false,
  avatar = null,
  skeleton = null,
  ...props
}: EntityFieldProps) {
  const { SCALER, RESPONSIVE, HIDER } = useScale();
  const layout = useLayout();

  const wrapperClasses = useClasses({
    'field-wrapper': true,
    disabled: !active,
    right,
    HIDER,
  });
  return (
    <>
      <div className={wrapperClasses} {...props}>
        {skeleton}
        {!skeleton && (
          <>
            {title && <span className="title">{title}</span>}
            <div className="desc-wrapper">
              {description && <div className="desc">{description}</div>}
              {avatar && <span className="avatar">{avatar}</span>}
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        .field-wrapper {
          justify-content: flex-start;
          width: 100%;

          .title {
            font-weight: 600;
          }

          .desc {
            margin-top: 0px;
            margin-bottom: 0px;
            color: var(--color-background-400);
          }

          display: flex;
          flex-direction: column;
          align-items: stretch;
          flex: 1;
          width: ${width};

          &.disabled * {
            color: var(--color-background-500);
            pointer-events: none;
          }

          &.right {
            .desc-wrapper {
              justify-content: flex-end;
            }
          }

          .desc-wrapper {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }

          .avatar {
            margin-left: var(--avatar-margin-left);
            .image {
              width: 24px !important;
              height: 24px !important;
              border-radius: 50%;
              background: var(--color-background-100);
            }
          }
        }

        @media only screen and (max-width: ${layout.breakpoints.xs.max}) {
          .field-wrapper {
            flex-wrap: wrap;
            width: 100%;
          }

          .right {
            .desc-wrapper {
              justify-content: flex-start !important;
            }
          }
        }

        ${RESPONSIVE.ml(1, value => `--avatar-margin-left: ${value};`, undefined, 'avatar')}
        ${SCALER('field-wrapper')}
      `}</style>
    </>
  );
}

EntityFieldComponent.displayName = 'HimalayaEntityField';
const EntityField = withScale(EntityFieldComponent);

export default EntityField;
