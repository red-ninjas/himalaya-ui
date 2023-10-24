import { isChrome } from './browsers';
import { MouseEventButton } from '../typings/common';

export function preventScrollByWheelClick(el: HTMLElement): void {
  if (!isChrome()) {
    return;
  }

  el.addEventListener('mousedown', (e: MouseEvent) => {
    if (e.button === MouseEventButton.Middle) {
      // prevent incorrect scrolling event
      e.preventDefault();
      return false;
    }
    return undefined;
  });
}
