import React from 'react';
import Caneldar from '../../components/Calendar';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CalendarContainer = () => {
  return (
    <React.Fragment>
      <Caneldar />
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
        <Button variant={'primary'} className="text-capitalize">
          休暇取得記録表
        </Button>
      </div>
    </React.Fragment>
  );
};

export default CalendarContainer;
