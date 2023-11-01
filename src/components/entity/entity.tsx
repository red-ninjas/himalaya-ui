'use client';

import { PropsWithChildren, ReactElement } from 'react';
import { MoreHorizontal } from '../icons';
import Menu from '../menu';
import MenuItem from '../menu/menu-item';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { pickChild } from '../utils/collections';
import EntityField from './entity-field';
import { EntityProps } from './index';
import { addColorAlpha } from '../utils/color';

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
              <Menu placement="bottomEnd" trigger={<MoreHorizontal />}>
                {items}
              </Menu>
            </span>
          )}
        </div>
        {footer && <div className="entity-footer">{footer}</div>}
      </div>
      <style jsx>{`
        .entity-outer-wrapper {
          font-size: ${SCALES.font(0.88)};
          width: 100%;
          display: flex;
          gap: 12px;
          justify-content: flex-start;
          flex-direction: column;
          align-items: flex-start;

          padding: ${SCALES.pt(1)} ${SCALES.pr(1)} ${SCALES.pb(1)} ${SCALES.pl(1)};
          margin: ${SCALES.mt(1, 'auto')} ${SCALES.mr(1, 'auto')} ${SCALES.mb(1, 'auto')} ${SCALES.ml(1, 'auto')};
          background: ${addColorAlpha(theme.palette.accents_0, 0.15)};

          &.disabled {
            background: ${theme.palette.accents_1};
            cursor: not-allowed;

            .entity-wrapper {
              opacity: 0.6;
            }
          }
          border: 1px solid ${theme.palette.border};
          border-radius: ${theme.style.radius};
        }

        .entity-thumbnail {
          margin-right: ${SCALES.mr(1)};
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

          .entity-menu {
            position: relative;
            margin-left: ${SCALES.ml(0.5)};
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

        .entity-spacer {
          display: block;
          width: 1px;
          height: 1px;
          min-width: 1px;
          min-height: 1px;
          margin-left: calc(24px - 1px);
          margin-top: calc(24px - 1px);

          &.expand {
            flex: 1 1;
          }
        }

        @media screen and (max-width: 600px) {
          .entity-wrapper {
            flex-direction: column;
            flex-wrap: wrap;
          }
          .entity-wrapper :global(.field-wrapper) {
            border-bottom: 1px solid ${theme.palette.border};
            padding-bottom: 12px;
          }
        }
      `}</style>
    </>
  );
}

EntityComponent.displayName = 'HimalayaEntity';
const Entity = withScale(EntityComponent);
export default Entity;
