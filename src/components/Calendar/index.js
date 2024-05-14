import React, { useEffect } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
// import dateJson from '../../assets/date.json';

const event = [
  {
    start: '2024-05-10T10:00:00',
    end: '2024-05-10T16:00:00',
    display: 'background'
  }
];

const CalendarComponent = () => {
  useEffect(() => {
    const calendarEl = document.getElementById('calendar');
    const calendar = new Calendar(calendarEl, {
      locale: 'ja-JP',
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin],
      events: event,
      headerToolbar: false,
      dayRender: function (arg) {
        var dayNumberEl = calendarEl.querySelector('.fc-day-top[data-date="' + arg.el.dataset.date + '"] > span');
        dayNumberEl.innerText = arg.date.getDate();
      }
    });
    calendar.render();
  }, []);

  return (
    <React.Fragment>
      <div id="calendar"></div>
    </React.Fragment>
  );
};

export default CalendarComponent;
