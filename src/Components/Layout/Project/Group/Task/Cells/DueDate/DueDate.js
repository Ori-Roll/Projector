import React, { useState } from 'react';
import PropTypes from 'prop-types';

import _, { templateSettings } from 'lodash';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import add from 'date-fns/add';
import { Portal } from 'react-portal';

import style from './DueDate.module.css';
import CellsStyle from '../CellsStyle.module.css';
import AppIcon from '../../../../../../../GlobalComponents/AppIcon/AppIcon';
import ReminderPicker from '../../../../../../../GlobalComponents/ReminderPicker/ReminderPicker';

function DueDate({ cell, doCellChange, task, taskChange }) {
  /* const [datePickerActive, setDatePickerActive] */
  const [date, setDate] = useState(task.dueDate ? task.dueDate : null);

  const defaultEventStartsAt = { hour: 11, minute: 0 }; // TODO: set this globally

  const SETTINGS_TIME_FORMAT = 'HH:mm';
  const SETTINGS_DATE_FORMAT = 'dd/MM/yy';

  function onChange(newDate) {
    setDate(newDate);
    taskChange({ ...task, dueDate: newDate });
  }

  function handleChangeRaw(value) {
    if (value === 'tomorrow') {
      setToNamedDate('tomorrow');
    }
  }

  function setToNamedDate(namedDate = 'today') {
    // TODO: these don't work properly
    let newDate;

    switch (namedDate) {
      case 'today':
        newDate = add(new Date(), {
          minutes: defaultEventStartsAt.minute,
          hours: defaultEventStartsAt.hour,
        });
      case 'tomorrow':
        newDate = add(new Date(), {
          days: 1,
          minutes: defaultEventStartsAt.minute,
          hours: defaultEventStartsAt.hour,
        });
      case 'inAweek':
        newDate = add(new Date(), {
          days: 7,
          minutes: defaultEventStartsAt.minute,
          hours: defaultEventStartsAt.hour,
        });
      default:
        newDate = new Date();
    }

    setDate(newDate);
    taskChange({ ...task, dueDate: newDate });
  }

  const customInput = ({ value, onClick }) => (
    <button
      style={{ border: 'none', backgroundColor: 'red' }}
      className={style['date-picker-costum-input']}
      onClick={onClick}
    >
      {value}
    </button>
  );

  return (
    <div className={`${CellsStyle.cell} ${style['duedate-cell']}`}>
      <div className={style['duedate-icon-wrapper']}>
        <AppIcon
          icon={
            date ? 'app-icon-calendar-red.jpg' : 'app-icon-calendar-gray.png'
          }
          cssOptions={{ background: 'none' }}
          size={35}
        />
        {/* <input
                className={style["duedate-input"]}
                value={ date && _.isDate(date) ?
                    `${date.toLocaleString("default", { weekday: "short" })}, ${date.getDate()}/${date.getMonth()}, ${date.getHours()}:${date.getMinutes()}` : "choose date" }
                onChange={ e=> onChange(e.target.value)}
                /> */}
      </div>
      <DatePicker
        // TODO: This might need localization support for other countries see documentation under Localization
        selected={date}
        onChange={(newDate) => onChange(newDate)}
        showTimeSelect
        placeholderText="Select a date"
        locale="pt-BR"
        dateFormat="Pp"
        timeFormat={SETTINGS_TIME_FORMAT}
        timeIntervals="30"
        dateFormat={`${SETTINGS_DATE_FORMAT} ${SETTINGS_TIME_FORMAT}`}
        shouldCloseOnSelect={true}
        calendarClassName={style['date-picker-costum']}
        onChangeRaw={(event) => handleChangeRaw(event.target.value)}
        costumInput={<customInput />}
        popperModifiers={{
          offset: {
            enabled: true,
            offset: '20px, 5px',
          },
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: 'viewport',
            rootBoundary: 'document',
          },
        }}
      >
        <div className={style['specific-selectable-header']}>
          Other options:
        </div>
        <div
          onClick={() => setToNamedDate('today')}
          className={style['specific-selectable-date']}
        >
          Today
        </div>
        <div
          onClick={() => setToNamedDate('tomorrow')}
          className={style['specific-selectable-date']}
        >
          Tomorrow
        </div>
        <div
          onClick={() => setToNamedDate('inAweek')}
          className={style['specific-selectable-date']}
        >
          In a week
        </div>
      </DatePicker>
    </div>
  );
}

DueDate.propTypes = {};

export default DueDate;
