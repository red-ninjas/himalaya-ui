import ToggleList from './toggle-list';
import ToggleItem from './toggle-list-item';

export * from './shared';
export type ToggleComponentType = typeof ToggleList & {
  Item: typeof ToggleItem;
};
(ToggleList as ToggleComponentType).Item = ToggleItem;
export default ToggleList as ToggleComponentType;
