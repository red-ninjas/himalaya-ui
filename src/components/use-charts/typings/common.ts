/**
 * This type should be used when you need to save result of the setTimeout/setInterval functions.
 * It makes the compilation with non-composite project happy.
 */
export type TimerId = ReturnType<typeof setTimeout>;

/**
 * The type declares compile-time constants for mouse buttons.
 * e.button values for MouseEvents.
 * It's NOT e.buttons (with s)!
 */
export const enum MouseEventButton {
  Left = 0,
  Middle = 1,
  Right = 2,
  Fourth = 3,
  Fifth = 4,
}

interface InputDeviceCapabilities {
  firesTouchEvents?: boolean;
}

export interface UIEvent {
  /** https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/sourceCapabilities */
  sourceCapabilities?: InputDeviceCapabilities;
}

/**
 * Navigator userAgentData
 * https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData
 * More reliable way of determining chromium browsers.
 * Note: This is a partial type definition for the low entropy properties.
 */
export interface UADataBrand {
  brand: string;
  version: string;
}
export interface Navigator {
  userAgentData?: {
    brands: UADataBrand[];
    platform: string;
    mobile: boolean;
  };
}

export interface Window {
  chrome: unknown;
}
