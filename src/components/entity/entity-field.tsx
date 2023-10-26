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
        {title && <span className="title">{title}</span>}
        <div className="desc-wrapper">
          {description && <div className="desc">{description}</div>}
          {avatar && <span className="avatar">{avatar}</span>}
        </div>
      </div>
      <style jsx global>{`
        .field-wrapper {
          display: flex;
          justify-content: center;
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
              justify-content: flex-end !important;
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

        .desc {
          margin-top: 0px;
          margin-bottom: 0px;
        }
      `}</style>
    </>
  );
}

EntityFieldComponent.displayName = 'HimalayaEntityField';
const EntityField = withScale(EntityFieldComponent);

export default EntityField;
