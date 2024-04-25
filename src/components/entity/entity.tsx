'use client';

import { PropsWithChildren, ReactElement } from 'react';
import MoreHorizontal from '../icons/moreHorizontal';
import Menu from '../menu';
import MenuItem from '../menu/menu-item';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { pickChild } from '../utils/collections';
import EntityField from './entity-field';
import { EntityProps } from './index';
import { useConfig } from '../use-config';

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
  const { UNIT, SCALE, CLASS_NAMES } = useScale();
  const { layout } = useConfig();
  const [, entityFields] = pickChild(children, EntityField);

  const outerClasses = useClasses('entity-outer-wrapper', CLASS_NAMES, {
    disabled,
  });

  let items = menuItems;

  if (items) {
    const [, mItems] = pickChild(items.props.children, MenuItem);
    items = mItems as unknown as ReactElement;
  }
  return (
    <>
      <div className={outerClasses} {...others}>
        <div className={classes}>
          {checkbox && <span className="entity-checkbox">{checkbox}</span>}
          {thumbnail && <span className="entity-thumbnail">{thumbnail}</span>}
          {entityFields}
          {actions && <span className="entity-actions">{actions}</span>}
          {items && (
            <span className="entity-menu">
              <Menu placement="bottomEnd" content={<MoreHorizontal />}>
                {items}
              </Menu>
            </span>
          )}
        </div>
        {footer && <div className="entity-footer">{footer}</div>}
      </div>
      <style jsx>{`
        .entity-outer-wrapper {
          width: 100%;
          display: flex;
          gap: 12px;
          justify-content: flex-start;
          flex-direction: column;
          align-items: flex-start;
          background-color: rgba(var(--color-background), 0.15);
          border: 1px solid var(--color-border-1000);

          &.disabled {
            background: var(--color-background-900);
            cursor: not-allowed;

            .entity-wrapper {
              opacity: 0.6;
            }
          }
        }

        .entity-thumbnail {
          margin-right: var(--entity-mr);
        }

        .entity-wrapper {
          height: auto;
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          align-items: center;
          background-clip: padding-box;

          gap: 12px;

          .entity-checkbox {
            display: flex;
            margin-right: var(--entity-mr);
          }

          .entity-actions {
            display: flex;
            justify-content: flex-start;

            :not(:first-child) {
              margin-left: var(--entity-ml);
            }
          }

          .entity-footer {
            width: calc(100% - var(--entity-ml));
            margin-left: var(--entity-ml);
          }

          .entity-menu {
            position: relative;
            margin-left: var(--entity-ml);
            right: 0;
            justify-content: center;
            align-items: center;
            display: flex;
          }
        }

        .entity-ellipsis {
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          max-width: 100%;
          min-width: 0;
        }

        @media only screen and (max-width: ${layout.breakpoints.sm.max}) {
          .entity-wrapper {
            flex-direction: column;
            flex-wrap: wrap;
          }
          .entity-wrapper :global(.field-wrapper) {
            border-bottom: 1px solid var(--color-border-1000);
            padding-bottom: 12px;
          }
        }

        ${SCALE.font(0.9, value => `font-size: ${value};`, undefined, 'entity-outer-wrapper')}
        ${SCALE.padding(1, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, `entity-outer-wrapper`)}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, `entity-outer-wrapper`)}
        ${SCALE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', `entity-outer-wrapper`)}


        ${SCALE.mr(1, value => `--entity-mr: ${value};`, undefined, 'entity-thumbnail')}
        ${SCALE.ml(0.5, value => `--entity-ml: ${value};`, undefined, 'entity-thumbnail')}

        ${UNIT('entity-outer-wrapper')}
      `}</style>
    </>
  );
}

EntityComponent.displayName = 'HimalayaEntity';
const Entity = withScale(EntityComponent);
export default Entity;
