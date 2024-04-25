import React from 'react';
import { HTMLAttributes } from 'react';

type SwitchProps = {
  onClickPrev: React.MouseEventHandler<HTMLTableCellElement>;
  onClickNext: React.MouseEventHandler<HTMLTableCellElement>;
  switchContent: React.ReactNode | string;
};
type NativeAttributes = Omit<React.ThHTMLAttributes<HTMLTableCellElement>, keyof SwitchProps>;
export type NativeSwitchProps = SwitchProps & NativeAttributes;

export default function ViewNavigation({ onClickPrev, onClickNext, switchContent, ...props }: NativeSwitchProps) {
  return (
    <tr>
      <th className="rdtPrev" onClick={onClickPrev}>
        <span>‹</span>
      </th>
      <th className="rdtSwitch" {...props}>
        {switchContent}
      </th>
      <th className="rdtNext" onClick={onClickNext}>
        <span>›</span>
      </th>

      <style jsx>{`
        th.rdtNext,
        th.rdtPrev {
          font-size: 21px;
          vertical-align: top;
        }

        .rdtPrev span,
        .rdtNext span {
          display: block;
          user-select: none;
        }
      `}</style>
    </tr>
  );
}
