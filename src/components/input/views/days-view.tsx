import React from 'react';
import ViewNavigation from './view-navigation';

export interface DaysViewProps {
  viewDate: moment.Moment;
  selectedDate: moment.Moment | undefined | null;

  navigate: (value: number, type: string) => void;
  showView: (type: string) => void;
  moment: () => any;
  isValidDate?: (currentDate: moment.Moment) => boolean;
  timeFormat?: string;
  updateDate?: (event: React.MouseEvent<HTMLTableCellElement>) => void;
  className?: string;
}

interface DayProp {
  onClick?: (event) => void;
  className?: string;
  'data-value': string;
  'data-month': string;
  'data-year': string;
}
const defaultValidDate = () => true;

const DaysView: React.FC<DaysViewProps> = ({ viewDate, isValidDate = defaultValidDate, ...props }: DaysViewProps) => {
  const renderNavigation = () => {
    const locale = viewDate.localeData();
    return (
      <ViewNavigation
        onClickPrev={() => props.navigate(-1, 'months')}
        onClick={() => props.showView('months')}
        onClickNext={() => props.navigate(1, 'months')}
        switchContent={locale.months(viewDate) + ' ' + viewDate.year()}
        colSpan={5}
        data-value={viewDate.month()}
      />
    );
  };

  const renderDayHeaders = () => {
    const locale = viewDate.localeData();
    const dayItems = getDaysOfWeek(locale).map((day, index) => (
      <th key={day + index} className="dow">
        {day}
      </th>
    ));

    return <tr>{dayItems}</tr>;
  };

  const renderDays = () => {
    const date = viewDate;
    const startOfMonth = date.clone().startOf('month');
    const endOfMonth = date.clone().endOf('month');

    // We need 42 days in 6 rows
    // starting in the last week of the previous month
    const rows = [[], [], [], [], [], []];

    const startDate = date.clone().subtract(1, 'months');
    startDate.date(startDate.daysInMonth()).startOf('week');

    const endDate = startDate.clone().add(42, 'd');
    let i = 0;

    while (startDate.isBefore(endDate)) {
      const row = getRow(rows, i++);
      row.push(renderDay(i, startDate, startOfMonth, endOfMonth));
      startDate.add(1, 'd');
    }

    return rows.map((r, i) => <tr key={`${endDate.month()}_${i}`}>{r}</tr>);
  };

  const renderDay = (index: number, date: any, startOfMonth: any, endOfMonth: any) => {
    const selectedDate = props.selectedDate;

    const dayProps: DayProp = {
      'data-value': date.date(),
      'data-month': date.month(),
      'data-year': date.year(),
    };

    let className = 'rdtDay';
    if (date.isBefore(startOfMonth)) {
      className += ' rdtOld';
    } else if (date.isAfter(endOfMonth)) {
      className += ' rdtNew';
    }
    if (selectedDate && date.isSame(selectedDate, 'day')) {
      className += ' rdtActive';
    }
    if (date.isSame(props.moment(), 'day')) {
      className += ' rdtToday';
    }

    if (isValidDate(date)) {
      dayProps.onClick = _setDate;
    } else {
      className += ' rdtDisabled';
    }

    dayProps.className = className;

    return (
      <td key={'day-' + date.format('M_D')} {...dayProps}>
        {date.date()}
      </td>
    );
  };

  const renderFooter = () => {
    if (!props.timeFormat) return;

    const date = viewDate;
    return (
      <tfoot>
        <tr>
          <td onClick={() => props.showView('time')} colSpan={7} className="rdtTimeToggle">
            {date.format(props.timeFormat)}
          </td>
        </tr>
      </tfoot>
    );
  };

  const _setDate = (e: any) => {
    if (props.updateDate) {
      props.updateDate(e);
    }
  };

  const getRow = (rows: any[], day: number) => {
    return rows[Math.floor(day / 7)];
  };

  /**
   * Get a list of the days of the week
   * depending on the current locale
   * @return {array} A list with the shortname of the days
   */
  const getDaysOfWeek = (locale: any) => {
    const first = locale.firstDayOfWeek();
    const dow: string[] = [];
    let i = 0;

    locale._weekdaysMin.forEach(function (day: string) {
      dow[(7 + i++ - first) % 7] = day;
    });

    return dow;
  };

  return (
    <div className="rdtDays">
      <table>
        <thead>
          {renderNavigation()}
          {renderDayHeaders()}
        </thead>
        <tbody>{renderDays()}</tbody>
        {renderFooter()}
      </table>

      <style jsx>{`
        .rdtDays {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default DaysView;
