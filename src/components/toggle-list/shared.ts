export interface ToggleEventTarget {
  checked: boolean;
}

export interface ToggleListEvent {
  target: ToggleEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: React.ChangeEvent;
}
