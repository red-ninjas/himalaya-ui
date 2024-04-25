import React, { useEffect, useState } from 'react';

interface TimeViewProps {
  viewDate: moment.Moment;
  selectedDate: moment.Moment | undefined | null;
  dateFormat?: string;
  timeFormat: string;
  setTime: (type: string, value: number) => void;
  showView: (type: string) => void;
  timeConstraints?: any;
}

const TimeView: React.FC<TimeViewProps> = ({ viewDate, selectedDate, dateFormat, timeFormat, setTime, showView, timeConstraints }) => {
  const [timeParts, setTimeParts] = useState<any>({});

  useEffect(() => {
    setTimeParts(getTimeParts(selectedDate || viewDate));
  }, [selectedDate, viewDate]);

  const timeConstraintsWithDefaults = createConstraints(timeConstraints);

  const renderCounter = (type: string, val: string) => {
    let value = val;
    if (type === 'hours' && isAMPM()) {
      value = (((parseInt(value, 10) - 1) % 12) + 1).toString();

      if (parseInt(value, 10) === 0) {
        value = '12';
      }
    }

    if (type === 'ampm') {
      if (timeFormat.indexOf(' A') !== -1) {
        value = viewDate.format('A');
      } else {
        value = viewDate.format('a');
      }
    }

    return (
      <div key={type} className="rdtCounter">
        <span className="rdtBtn" onMouseDown={e => onStartClicking(e, 'increase', type)}>
          ▲
        </span>
        <div className="rdtCount">{value}</div>
        <span className="rdtBtn" onMouseDown={e => onStartClicking(e, 'decrease', type)}>
          ▼
        </span>
      </div>
    );
  };

  const renderHeader = () => {
    if (!dateFormat) return;

    const date = selectedDate || viewDate;

    return (
      <thead>
        <tr>
          <td className="rdtSwitch" colSpan={4} onClick={() => showView('days')}>
            {date.format(dateFormat)}
          </td>
        </tr>
      </thead>
    );
  };

  const onStartClicking = (e: React.MouseEvent<HTMLSpanElement>, action: string, type: string) => {
    if (e && e.button && e.button !== 0) {
      // Only left clicks, thanks
      return;
    }

    if (type === 'ampm') return toggleDayPart();

    const update: any = {};
    const body = document.body;
    update[type] = action === 'increase' ? increase(type) : decrease(type);
    setTimeParts(update);

    const timer = setTimeout(() => {
      const increaseTimer = setInterval(() => {
        update[type] = action === 'increase' ? increase(type) : decrease(type);
        setTimeParts(update);
      }, 70);

      const mouseUpListener = () => {
        clearTimeout(timer);
        clearInterval(increaseTimer);
        setTime(type, parseInt(timeParts[type], 10));
        body.removeEventListener('mouseup', mouseUpListener);
        body.removeEventListener('touchend', mouseUpListener);
      };

      body.addEventListener('mouseup', mouseUpListener);
      body.addEventListener('touchend', mouseUpListener);
    }, 500);
  };

  const toggleDayPart = () => {
    let hours = parseInt(timeParts.hours, 10);

    if (hours >= 12) {
      hours -= 12;
    } else {
      hours += 12;
    }

    setTime('hours', hours);
  };

  const increase = (type: string) => {
    const tc = timeConstraintsWithDefaults[type];
    let value = parseInt(timeParts[type], 10) + tc.step;
    if (value > tc.max) value = tc.min + (value - (tc.max + 1));
    return pad(type, value);
  };

  const decrease = (type: string) => {
    const tc = timeConstraintsWithDefaults[type];
    let value = parseInt(timeParts[type], 10) - tc.step;
    if (value < tc.min) value = tc.max + 1 - (tc.min - value);
    return pad(type, value);
  };

  const getCounters = () => {
    const counters: string[] = [];
    const format = timeFormat;

    if (format.toLowerCase().indexOf('h') !== -1) {
      counters.push('hours');
      if (format.indexOf('m') !== -1) {
        counters.push('minutes');
        if (format.indexOf('s') !== -1) {
          counters.push('seconds');
          if (format.indexOf('S') !== -1) {
            counters.push('milliseconds');
          }
        }
      }
    }

    if (isAMPM()) {
      counters.push('ampm');
    }

    return counters;
  };

  const isAMPM = () => {
    return timeFormat.toLowerCase().indexOf(' a') !== -1;
  };

  const getTimeParts = (date: any) => {
    const hours = date.hours();

    return {
      hours: pad('hours', hours),
      minutes: pad('minutes', date.minutes()),
      seconds: pad('seconds', date.seconds()),
      milliseconds: pad('milliseconds', date.milliseconds()),
      ampm: hours < 12 ? 'am' : 'pm',
    };
  };

  const pad = (type: string, value: number) => {
    const padValues = {
      hours: 1,
      minutes: 2,
      seconds: 2,
      milliseconds: 3,
    };

    let str = value + '';
    while (str.length < padValues[type]) str = '0' + str;
    return str;
  };

  return (
    <div className="rdtTime">
      <table>
        {renderHeader()}
        <tbody>
          <tr>
            <td>
              <div className="rdtCounters">
                {getCounters().map((c, i) => {
                  if (i && c !== 'ampm') {
                    return (
                      <div key={`sep${i}`} className="rdtCounterSeparator">
                        :
                      </div>
                    );
                  }
                  return renderCounter(c, timeParts[c]);
                })}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const timeConstraints = {
  hours: {
    min: 0,
    max: 23,
    step: 1,
  },
  minutes: {
    min: 0,
    max: 59,
    step: 1,
  },
  seconds: {
    min: 0,
    max: 59,
    step: 1,
  },
  milliseconds: {
    min: 0,
    max: 999,
    step: 1,
  },
};

function createConstraints(overrideTimeConstraints: any) {
  const constraints: any = {};

  Object.keys(timeConstraints).forEach(type => {
    constraints[type] = { ...timeConstraints[type], ...(overrideTimeConstraints[type] || {}) };
  });

  return constraints;
}

export default TimeView;
