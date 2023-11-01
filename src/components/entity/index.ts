import { ReactElement } from 'react';

import Entity from './entity';
import EntityField from './entity-field';
import EntityForm from './entity-form';
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
  skeleton?: ReactElement | null;
};

export type EntityThumbnailProps = {
  size?: number;
};

export type EntityFormProps = {
  title?: ReactElement | string | null;
  footerSeparator?: boolean;
  footerNote?: ReactElement | string | null;
  primaryAction?: ReactElement | null;
  secondaryAction?: ReactElement | null;
  destructiveAction?: ReactElement | null;
  extraActions?: ReactElement | null;
};

export { default as EntityField } from './entity-field';

export type EntityComponentType = typeof Entity & {
  Field: typeof EntityField;
  Form: typeof EntityForm;
};
(Entity as EntityComponentType).Field = EntityField;
(Entity as EntityComponentType).Form = EntityForm;

export default Entity as EntityComponentType;
