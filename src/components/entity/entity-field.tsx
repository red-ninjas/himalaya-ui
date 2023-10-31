'use client';

import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { EntityFieldProps } from './index';

function EntityFieldComponent({
  title,
  description,
  active = true,
  width = 'auto',
  right = false,
  avatar = null,
  skeleton = null,
  ...others
}: EntityFieldProps) {
  const theme = useTheme();
  const { SCALES } = useScale();
  const wrapperClasses = useClasses({
    'field-wrapper': true,
    disabled: !active,
    right,
  });
  return (
    <>
      <div className={wrapperClasses} {...others}>
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
            color: ${theme.palette.accents_5};
          }

          display: flex;
          flex-direction: column;
          align-items: stretch;
          flex: 1;
          width: ${width};

          &.disabled * {
            color: ${theme.palette.accents_4};
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
            margin-left: ${SCALES.ml(1)};
            .image {
              width: 24px !important;
              height: 24px !important;
              border-radius: 50%;
              background: ${theme.palette.accents_8};
            }
          }
        }

        @media screen and (max-width: 600px) {
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
      `}</style>
    </>
  );
}

EntityFieldComponent.displayName = 'HimalayaEntityField';
const EntityField = withScale(EntityFieldComponent);

export default EntityField;
