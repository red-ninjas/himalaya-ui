import { ReactElement } from 'react';

import Entity from './entity';
import EntityField from './entity-field';
import EntityThumbnail from './entity-thumbnail';
export type EntityProps = {
  thumbnail?: ReactElement | null;
  footer?: ReactElement | null;
  menuItems?: ReactElement | null;
  actions?: ReactElement | null;
  checkbox?: ReactElement | null;
  disabled?: boolean;
};

export type EntityFieldProps = {
  title?: string;
  description?: string | ReactElement | null;
  active?: boolean;
  width?: string;
  right?: boolean;
  avatar?: ReactElement | null;
};

export type EntityThumbnailProps = {
  size?: number;
};

export { default as EntityField } from './entity-field';

export type EntityComponentType = typeof Entity & {
  Field: typeof EntityField;
  Thumbnail: typeof EntityThumbnail;
};
(Entity as EntityComponentType).Field = EntityField;
(Entity as EntityComponentType).Thumbnail = EntityThumbnail;

export default Entity as EntityComponentType;
