import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { yukAPI, auth_token, goRedirect } from '../../utils/api';

const RuleEdit = () => {
  const [showMsg, setShowMsg] = useState('');
  const [acquisition, setAcquisition] = useState(0);
  const [minimumAcquisitionUnit, setMinimumAcquisitionUnit] = useState(0);
  const [scheduledWorkingHours, setScheduledWorkingHours] = useState(0);
  const [dateOfExpireYear, setDateOfExpireYear] = useState(0);
  const [dateOfExpireMonth, setDateOfExpireMonth] = useState(0);
  const [acquisitionOrderContainer, setAcquisitionOrderContainer] = useState([]);
  const [minimumAcquisitionUnitContainer, setMinimumAcquisitionUnitContainer] = useState([]);
  const [scheduledWorkingHoursContainer, setScheduledWorkingHoursContainer] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await yukAPI('show_paidholidaysettings', {}, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          setAcquisitionOrderContainer(res.data.data.acquisition_order_container);
          setMinimumAcquisitionUnitContainer(res.data.data.minimum_acquisition_unit_container);
          setScheduledWorkingHoursContainer(res.data.data.scheduled_working_hours_container);
          setDateOfExpireYear(res.data.data.date_of_expiry_year);
          setDateOfExpireMonth(res.data.data.date_of_expiry_month);
          setAcquisition(res.data.data.acquisition_order);
          setMinimumAcquisitionUnit(res.data.data.minimum_acquisition_unit);
          setScheduledWorkingHours(res.data.data.scheduled_working_hours);
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  const saveSettings = async () => {
    await yukAPI(
      'update_paidholidaysettings',
      {
        acquisition_order: acquisition,
        minimum_acquisition_unit: minimumAcquisitionUnit,
        scheduled_working_hours: scheduledWorkingHours,
        date_of_expiry_year: dateOfExpireYear,
        date_of_expiry_month: dateOfExpireMonth
      },
      'post',
      auth_token
    )
      .then((res) => {
        if (res.data.status === 'success') {
          goRedirect('/settings');
        } else {
          setShowMsg(res.data.msg);
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={8} className="center-card">
          <Card>
            <Card.Body>
              <Alert variant="danger" show={showMsg}>
                <li>{showMsg}</li>
              </Alert>
              <Row>
                <Col sm={3} className="h5 mt-3">
                  取得順序
                </Col>
                <Col sm={9} className="mt-3">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    {acquisitionOrderContainer.map((item, idx) => (
                      <Form.Check
                        key={idx}
                        type={'radio'}
                        id={`acquisition${idx}`}
                        name="acquisition"
                        className="m-r-10"
                        label={item}
                        defaultChecked={idx === acquisition}
                        onClick={() => setAcquisition(idx)}
                      />
                    ))}
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3} className="h5 mt-3">
                  最小取得単位
                </Col>
                <Col sm={9} className="mt-3">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    {minimumAcquisitionUnitContainer.map((item, idx) => (
                      <Form.Check
                        key={idx}
                        type={'radio'}
                        id={`minimum_acquisition_unit${idx}`}
                        name="minimum_acquisition_unit"
                        className="m-r-10"
                        label={item}
                        defaultChecked={idx === minimumAcquisitionUnit}
                        onClick={() => setMinimumAcquisitionUnit(idx)}
                      />
                    ))}
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3} className="h5 mt-3">
                  所定労働時間
                </Col>
                <Col sm={9} className="mt-3">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    {scheduledWorkingHoursContainer.map((item, idx) => (
                      <Form.Check
                        key={idx}
                        type={'radio'}
                        id={`scheduled_working_hours${idx}`}
                        name="scheduled_working_hours"
                        className="m-r-10"
                        label={item}
                        defaultChecked={idx === scheduledWorkingHours}
                        onClick={() => setScheduledWorkingHours(idx)}
                      />
                    ))}
                  </Form.Group>
                  <div className="hint">時間単位の休暇は所定労働時間を元に1日分の休暇に換算されます。</div>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3} className="h5 mt-3">
                  有効期限
                </Col>
                <Col sm={9} className="mt-3">
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="number"
                      value={dateOfExpireYear}
                      style={{ width: '80px' }}
                      onChange={(e) => setDateOfExpireYear(e.target.value)}
                    />
                    <div className="preset_life_bottom ms-1">年</div>
                    <Form.Control
                      type="number"
                      value={dateOfExpireMonth}
                      style={{ width: '80px' }}
                      onChange={(e) => setDateOfExpireMonth(e.target.value)}
                    />
                    <div className="preset_life_bottom ms-1">ヶ月</div>
                  </div>
                  <div className="hint">有効期限は付与日より、2年後以降の日付を指定してください。</div>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={12}>
                  <div className="text-center">
                    <Button href="/settings" variant={'light'} className="text-capitalize">
                      キャンセル
                    </Button>
                    <Button variant={'primary'} className="text-capitalize" onClick={saveSettings}>
                      更新する
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default RuleEdit;
