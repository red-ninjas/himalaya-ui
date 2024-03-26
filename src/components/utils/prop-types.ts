import { UIColorKeys } from 'components/themes/presets';

export const tuple = <T extends string[]>(...args: T) => args;

export const tupleNumber = <T extends number[]>(...args: T) => args;

const normalTypes = tuple('default', 'primary', 'tertiary', 'secondary', 'success', 'warning', 'error');

const snippetTypes = tuple('default', 'primary', 'tertiary', 'secondary', 'success', 'warning', 'error', 'dark', 'lite');
const quickActionTypes = tuple('default', 'primary', 'tertiary', 'secondary', 'success', 'warning', 'error', 'dark', 'lite');

const copyTypes = tuple('default', 'silent', 'prevent');

const triggerTypes = tuple('hover', 'click');

const placement = tuple('top', 'topStart', 'topEnd', 'left', 'leftStart', 'leftEnd', 'bottom', 'bottomStart', 'bottomEnd', 'right', 'rightStart', 'rightEnd');

const dividerAlign = tuple('start', 'center', 'end', 'left', 'right');

export type ButtonTypes = COLOR_TYPES | 'abort';

export type NormalTypes = (typeof normalTypes)[number];

export type SnippetTypes = (typeof snippetTypes)[number];

export type QuickActionTypes = (typeof quickActionTypes)[number];

export type CopyTypes = (typeof copyTypes)[number];

export type TriggerTypes = (typeof triggerTypes)[number];

export type Placement = (typeof placement)[number];

export type DividerAlign = (typeof dividerAlign)[number];

export type COLOR_TYPES = UIColorKeys | 'default' | 'dark';
