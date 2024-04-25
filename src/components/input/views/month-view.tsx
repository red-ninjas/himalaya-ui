import React from 'react';
import ViewNavigation from './view-navigation';

interface MonthsViewProps {
  viewDate: moment.Moment;
  selectedDate: moment.Moment | undefined | null;
  navigate: (value: number, type?: string) => void;
  showView: (type: string) => void;
  updateDate?: (event: React.MouseEvent<HTMLTableCellElement>) => void;
  isValidDate?: (currentDate: moment.Moment) => boolean;
}

const MonthsView: React.FC<MonthsViewProps> = ({ viewDate, navigate, updateDate, showView, selectedDate, isValidDate = () => true }) => {
  const renderNavigation = () => {
    const year = viewDate.year();

    return (
      <ViewNavigation
        onClickPrev={() => navigate(-1, 'years')}
        onClick={() => showView('years')}
        onClickNext={() => navigate(1, 'years')}
        switchContent={year}
        colSpan={2}
      />
    );
  };

  const renderMonths = () => {
    // 12 months in 3 rows for every view
    const rows = [[], [], []];

    for (let month = 0; month < 12; month++) {
      const row = getRow(rows, month);

      row.push(renderMonth(month));
    }

    return rows.map((months, i) => <tr key={i}>{months}</tr>);
  };

  const renderMonth = (month: number) => {
    const localSelectedDate = selectedDate;
    let className = 'rdtMonth';
    let onClick;

    if (isDisabledMonth(month)) {
      className += ' rdtDisabled';
    } else {
      onClick = _updateSelectedMonth;
    }

    if (localSelectedDate && localSelectedDate.year() === viewDate.year() && localSelectedDate.month() === month) {
      className += ' rdtActive';
    }

    const tdProps = { className, 'data-value': month, onClick };

    return (
      <td key={'month-' + month} {...tdProps}>
        {getMonthText(month)}
      </td>
    );
  };

  const isDisabledMonth = (month: number) => {
    const isValidDateFunc = isValidDate;

    if (!isValidDateFunc) {
      // If no validator is set, all days are valid
      return false;
    }

    // If one day in the month is valid, the year should be clickable
    const date = viewDate.clone().set({ month });
    let day = date.endOf('month').date() + 1;

    while (day-- > 1) {
      if (isValidDateFunc(date.date(day))) {
        return false;
      }
    }
    return true;
  };

  const getMonthText = (month: number) => {
    const localMoment = viewDate;
    const monthStr = localMoment.localeData().monthsShort(localMoment.month(month));

    // Because some months are up to 5 characters long, we want to
    // use a fixed string length for consistency
    return capitalize(monthStr.substring(0, 3));
  };

  const _updateSelectedMonth = (event: any) => {
    if (updateDate) {
      updateDate(event);
    }
  };

  const getRow = (rows: any[], year: number) => {
    if (year < 4) {
      return rows[0];
    }
    if (year < 8) {
      return rows[1];
    }

    return rows[2];
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="rdtMonths">
      <table>
        <thead>{renderNavigation()}</thead>
      </table>
      <table>
        <tbody>{renderMonths()}</tbody>
      </table>
      <style jsx>{`
        .rdtMonths {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default MonthsView;
