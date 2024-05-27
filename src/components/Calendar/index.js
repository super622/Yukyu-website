import React, { useEffect } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import dateJson from '../../assets/date.json';

const event = [
  {
    start: '2024-05-01',
    end: '2024-05-08',
    title: '藤村',
    color: 'red'
  },
  {
    start: '2024-05-07',
    end: '2024-05-15',
    title: '藤村',
    color: 'green'
  },
  {
    start: '2024-05-07',
    end: '2024-05-15',
    title: '藤村',
    color: 'yellow'
  },
  {
    start: '2024-05-07',
    end: '2024-05-15',
    title: '藤村'
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
      handleWindowResize: true,
      contentHeight: 'auto',
      height: 'auto',
      moreLinkContent: function (args) {
        return '+' + args.num + '件';
      },
      eventClick: function (info) {
        // v5から？勝手にリンク生成されていた
        // window.open(info.event.url)
        console.log(info);
      },
      expandRows: true,
      views: {
        dayGridMonth: {
          dayMaxEventRows: 3
        }
      }
    });
    calendar.render();

    setTimeout(() => {
      displayHoliday();
    }, 100);
  }, []);

  const displayHoliday = () => {
    Object.entries(dateJson).forEach(([date, holidayName]) => {
      if (holidayName.includes('振替休日')) {
        holidayName = '振替休日';
      }
      const $dayGrid = $(`.fc-daygrid-day[data-date="${date}"]`);
      $dayGrid.addClass('fc-holiday');
      $dayGrid.children('.fc-daygrid-day-frame').prepend(`<div class="fc-holiday-text">${holidayName}</div>`);
    });
  };

  return (
    <React.Fragment>
      <div id="calendar"></div>
    </React.Fragment>
  );
};

export default CalendarComponent;
