import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { yukAPI, auth_token } from '../../utils/api';
import dateJson from '../../assets/date.json';

const CalendarContainer = () => {
  const [show, setShow] = useState(false);
  const [eventData, setEventData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const calendarRef = useRef(null);

  useEffect(() => {
    let curYear = new Date().getFullYear();
    getEventData(curYear, '');
    setTimeout(() => {
      displayHoliday();
    }, 100);
  }, []);

  const getEventData = async (year, month, departments) => {
    await yukAPI('get_event_data', { year: year, month: month, departments: departments }, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          console.log(res.data.data);
          setEventData(res.data.data);
          const calendarApi = calendarRef.current.getApi();
          calendarApi.addEventSource(res.data.data);
          calendarApi.refetchEvents();
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  const displayHoliday = () => {
    $('.fc-holiday-text').remove();
    Object.entries(dateJson).forEach(([date, holidayName]) => {
      if (holidayName.includes('振替休日')) {
        holidayName = '振替休日';
      }
      const $dayGrid = $(`.fc-daygrid-day[data-date="${date}"]`);
      $dayGrid.addClass('fc-holiday');
      $dayGrid.children('.fc-daygrid-day-frame').prepend(`<div class="fc-holiday-text">${holidayName}</div>`);
    });
  };

  const goNextMonth = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
    setFormMonth(1);
    displayHoliday();
  };

  const goPrevMonth = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    setFormMonth(-1);
    displayHoliday();
  };

  const goAnyDate = () => {
    var curDate = getStrDateForm();
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(curDate);
    displayHoliday();
  };

  const getStrDateForm = () => {
    var year = $('#year').val();
    var month = $('#month').val();
    if (month <= 9) {
      month = `0${month}`;
    }
    return `${year}-${month}-01`;
  };

  const setFormMonth = (num) => {
    var curDate = getStrDateForm();
    var dateObj = new Date(curDate);
    var prevMonth = new Date(dateObj.getFullYear(), dateObj.getMonth() + num, dateObj.getDate());
    $('#month').val(prevMonth.getMonth() + 1);
    $('#year').val(prevMonth.getFullYear());
  };

  return (
    <React.Fragment>
      <div style={{ margin: 'auto' }}>
        <div>
          <div className="d-flex calendar-form-wrap team-position">
            <div className="w-100">
              <Button variant={'outline-dark'} className="btn-sm" onClick={handleShow}>
                部署を絞込む
              </Button>
              <Button variant={'outline-success'} className="btn-sm d-none">
                <i className="feather icon-check"></i>
                部署を絞込む
              </Button>
            </div>
          </div>
          <div className="d-flex mb-2" style={{ alignItems: 'end' }}>
            <div className="d-flex m-r-10">
              <div className="d-flex" style={{ alignItems: 'flex-end' }}>
                <div className="calendar-form-group">
                  <select name="year" id="year" className="calendar-form-control year" onChange={goAnyDate}>
                    <option value="2000">2000</option>
                    <option value="2001">2001</option>
                    <option value="2002">2002</option>
                    <option value="2003">2003</option>
                    <option value="2004">2004</option>
                    <option value="2005">2005</option>
                    <option value="2006">2006</option>
                    <option value="2007">2007</option>
                    <option value="2008">2008</option>
                    <option value="2009">2009</option>
                    <option value="2010">2010</option>
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                  </select>
                </div>
                <div className="ms-1">年</div>
              </div>
              <div className="d-flex ms-2" style={{ alignItems: 'flex-end' }}>
                <div className="calendar-form-group">
                  <select name="month" id="month" className="calendar-form-control month" onChange={goAnyDate}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
                <div className="ms-1">年</div>
              </div>
            </div>
            <div className="fc-button-group d-inline-flex">
              <Button variant="light" className="btn-sm m-0" onClick={goPrevMonth}>
                <i className="feather icon-chevron-left m-0"></i>
              </Button>
              <Button variant="light" className="btn-sm m-0 ms-1" onClick={goNextMonth}>
                <i className="feather icon-chevron-right m-0"></i>
              </Button>
            </div>
          </div>
        </div>
        <FullCalendar
          ref={calendarRef}
          locale={'ja-JP'}
          initialView={'dayGridMonth'}
          plugins={[dayGridPlugin]}
          events={eventData}
          headerToolbar={false}
          handleWindowResize={true}
          contentHeight={'auto'}
          height={'auto'}
          expandRows={true}
          views={{
            dayGridMonth: {
              dayMaxEventRows: 4
            }
          }}
        />
        <div className="d-flex event-demo-wrap mt-2">
          <div className="me-3">
            <span className="event-demo all"></span>
            全休
          </div>
          <div className="me-3">
            <span className="event-demo half"></span>
            半休
          </div>
          <div className="me-3">
            <span className="event-demo many"></span>
            5~7時間
          </div>
          <div className="me-3">
            <span className="event-demo little"></span>
            1~3時間
          </div>

          <div className="me-3">
            <span className="event-demo absent"></span>
            欠勤
          </div>
        </div>
        <div className="m-t-10">
          <p>
            従業員が見るカレンダーに社内の休暇状況を表示するときは<Link href="#"> カレンダー共有設定 </Link>を変更してください。
          </p>
        </div>
        <div className="text-end">
          <Button href="/used_day_book" variant={'primary'} className="text-capitalize">
            休暇取得記録表
          </Button>
        </div>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>部署を絞り込む</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-wrap">
              <Form.Check type={'checkbox'} id={'checkbox1'} name="group1" className="m-r-10" label={'部署名3'} />
              <Form.Check type={'checkbox'} id={'checkbox2'} name="group1" className="m-r-10" label={'部署名3'} />
              <Form.Check type={'checkbox'} id={'checkbox3'} name="group1" className="m-r-10" label={'部署名3'} />
              <Form.Check type={'checkbox'} id={'checkbox4'} name="group1" className="m-r-10" label={'部署名3'} />
              <Form.Check type={'checkbox'} id={'checkbox5'} name="group1" className="m-r-10" label={'部署名3'} />
              <Form.Check type={'checkbox'} id={'checkbox6'} name="group1" className="m-r-10" label={'部署名3'} />
              <Form.Check type={'checkbox'} id={'checkbox7'} name="group1" className="m-r-10" label={'部署名3'} />
              <Form.Check type={'checkbox'} id={'checkbox8'} name="group1" className="m-r-10" label={'部署名3'} />
              <Form.Check type={'checkbox'} id={'checkbox9'} name="group1" className="m-r-10" label={'部署名3'} />
            </div>
          </Modal.Body>
          <Modal.Footer className="text-center" style={{ justifyContent: 'center' }}>
            <Button variant="secondary">クリア</Button>
            <Button variant="primary">絞り込む</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default CalendarContainer;
