import React from 'react';
import ViewNavigation from './view-navigation';
import moment from 'moment';

interface YearsViewProps {
  viewDate: moment.Moment;
  selectedDate: moment.Moment | undefined | null;
  navigate: (amount: number, unit: string) => void;
  showView: (type: string) => void;
  isValidDate?: (currentDate: moment.Moment) => boolean;
  updateDate?: (event: React.MouseEvent<HTMLTableCellElement>) => void;
}

const YearsView: React.FC<YearsViewProps> = ({ viewDate, selectedDate, navigate, showView, isValidDate, updateDate }) => {
  const renderNavigation = () => {
    const viewYear = getViewYear();
    return (
      <ViewNavigation
        onClickPrev={() => navigate(-10, 'years')}
        onClick={() => showView('years')}
        onClickNext={() => navigate(10, 'years')}
        switchContent={`${viewYear}-${viewYear + 9}`}
      />
    );
  };

  const renderYears = () => {
    const viewYear = getViewYear();
    // 12 years in 3 rows for every view
    const rows = [[], [], []];
    for (let year = viewYear - 1; year < viewYear + 11; year++) {
      const row = getRow(rows, year - viewYear);

      row.push(renderYear(year));
    }

    return rows.map((years, i) => <tr key={i}>{years}</tr>);
  };

  const renderYear = (year: number) => {
    const selectedYear = getSelectedYear();
    let className = 'rdtYear';
    let onClick;

    if (isDisabledYear(year)) {
      className += ' rdtDisabled';
    } else {
      onClick = _updateSelectedYear;
    }

    if (selectedYear === year) {
      className += ' rdtActive';
    }

    const props = { 'data-value': year, onClick };

    return (
      <td {...props} className={className} key={'year-' + year}>
        {year}
      </td>
    );
  };

  const getViewYear = () => {
    return parseInt(viewDate.year() / 10, 10) * 10;
  };

  const getSelectedYear = () => {
    return selectedDate && selectedDate.year();
  };

  const disabledYearsCache: any = {};
  const isDisabledYear = (year: number) => {
    const cache = disabledYearsCache;
    if (cache[year] !== undefined) {
      return cache[year];
    }

    const isValidDateFunc = isValidDate;

    if (!isValidDateFunc) {
      // If no validator is set, all days are valid
      return false;
    }

    // If one day in the year is valid, the year should be clickable
    const date = viewDate.clone().set({ year });
    let day = date.endOf('year').dayOfYear() + 1;

    while (day-- > 1) {
      if (isValidDateFunc(date.dayOfYear(day))) {
        cache[year] = false;
        return false;
      }
    }

    cache[year] = true;
    return true;
  };

  const _updateSelectedYear = (event: React.MouseEvent<HTMLTableCellElement>) => {
    if (updateDate) {
      updateDate(event);
    }
  };

  const getRow = (rows: any[], year: number) => {
    if (year < 3) {
      return rows[0];
    }
    if (year < 7) {
      return rows[1];
    }

    return rows[2];
  };

  return (
    <div className="rdtYears">
      <table>
        <thead>{renderNavigation()}</thead>
      </table>
      <table>
        <tbody>{renderYears()}</tbody>
      </table>
      <style jsx>{`
        .rdtYears {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default YearsView;
