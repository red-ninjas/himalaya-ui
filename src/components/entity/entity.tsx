import { PropsWithChildren } from 'react';
import { EntityProps } from './index';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { pickChild } from '../utils/collections';
import EntityField from './entity-field';

function EntityComponent({
  children,
  thumbnail = null,
  menuItems = null,
  actions = null,
  checkbox = null,
  footer = null,
  disabled = false,
  ...others
}: PropsWithChildren<EntityProps>) {
  const classes = useClasses('entity-wrapper');
  const theme = useTheme();
  const { SCALES } = useScale();
  const [, entityFields] = pickChild(children, EntityField);

  const outerClasses = useClasses({
    'entity-outer-wrapper': true,
    disabled,
  });

  return (
    <>
      <div className={outerClasses} {...others}>
        <div className={classes}>
          {checkbox && <span className="entity-checkbox">{checkbox}</span>}
          {thumbnail}
          {entityFields}
          {actions && <span className="entity-actions">{actions}</span>}
          {menuItems}
        </div>
        {footer && <div className="entity-footer">{footer}</div>}
      </div>
      <style jsx>{`
        .entity-outer-wrapper {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
          align-items: flex-start;

          &.disabled {
            background: ${theme.palette.accents_1};
            pointer-events: none;
            cursor: not-allowed;
          }
        }

        .entity-wrapper {
          height: auto;
          width: 100%;
          padding: ${SCALES.px(1)} ${SCALES.py(1)};
          border: 1px solid ${theme.palette.border};
          border-radius: ${theme.style.radius};
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          align-items: center;
          background-clip: padding-box;

          .entity-checkbox {
            display: flex;
            margin-right: ${SCALES.mr(1)};
          }

          .entity-actions {
            display: flex;
            justify-content: flex-start;

            :not(:first-child) {
              margin-left: ${SCALES.ml(0.5)};
            }
          }

          .entity-footer {
            width: calc(100% - ${SCALES.ml(1)});
            margin-left: ${SCALES.ml(1)};
          }
        }
      `}</style>
    </>
  );
}

EntityComponent.displayName = 'HimalayaEntity';
const Entity = withScale(EntityComponent);
export default withScale(Entity);
