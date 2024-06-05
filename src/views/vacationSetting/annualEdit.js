import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Badge, Alert } from 'react-bootstrap';
import { yukAPI, auth_token, goRedirect } from '../../utils/api';

const AnnualEdit = () => {
  const [showMsg, setShowMsg] = useState('');
  const [grantImplementDate, setGrantImplementDate] = useState('');
  const [autoGrant, setAutoGrant] = useState('');
  const [baseDay, setBaseDay] = useState(0);
  const [baseMonth, setBaseMonth] = useState(0);
  const month = Array.from({ length: 12 }, (v, k) => k + 1);
  const days = Array.from({ length: 31 }, (v, k) => k + 1);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await yukAPI('show_paidholidaysettings', {}, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          setGrantImplementDate(res.data.data.grant_implementation_date);
          setAutoGrant(res.data.data.automatic_grant);
          setBaseDay(res.data.data.base_date_day);
          setBaseMonth(res.data.data.base_date_month);
          init(res.data.data.automatic_grant, res.data.data.grant_implementation_date);
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  const init = async (automatic_grant, grant_implementation_date) => {
    if (automatic_grant === 1) {
      document.getElementById('autogrant1').checked = true;
    } else {
      document.getElementById('autogrant0').checked = true;
    }

    if (grant_implementation_date === 1) {
      document.getElementById('grantimplementdate1').checked = true;
    } else {
      document.getElementById('grantimplementdate0').checked = true;
    }
  };

  const saveSetting = async () => {
    await yukAPI(
      'update_paidholidaysettings',
      {
        grant_implementation_date: grantImplementDate,
        base_date_month: baseMonth,
        base_date_day: baseDay,
        automatic_grant: autoGrant
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
                  自動付与
                </Col>
                <Col sm={9} className="mt-3">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Check type={'radio'} id="autogrant1" className="m-r-10">
                      <Form.Check.Input type={'radio'} name="autogrant" defaultChecked={autoGrant === 1} onClick={() => setAutoGrant(1)} />
                      <Form.Check.Label>
                        <h5>
                          <Badge bg="success">有効</Badge>
                        </h5>
                      </Form.Check.Label>
                    </Form.Check>
                    <Form.Check type={'radio'} id="autogrant0" className="m-r-10">
                      <Form.Check.Input type={'radio'} name="autogrant" defaultChecked={autoGrant === 0} onClick={() => setAutoGrant(0)} />
                      <Form.Check.Label>
                        <h5>
                          <Badge bg="danger">無効</Badge>
                        </h5>
                      </Form.Check.Label>
                    </Form.Check>
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3} className="h5 mt-3">
                  最小取得単位
                </Col>
                <Col sm={9} className="mt-3">
                  <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Check type={'radio'} id={'grantimplementdate0'} className="m-r-10">
                      <Form.Check.Input
                        type={'radio'}
                        id={'grantimplementdate0'}
                        name="grantimplementdate"
                        defaultChecked={grantImplementDate === 0}
                        onClick={() => setGrantImplementDate(0)}
                      />
                      <Form.Check.Label>
                        <span>入社日から算出した日</span>
                        <div className="hint">
                          各従業員ごとに入社日から経過した日数を算出して、それぞれ該当の継続日数を経過した時点で付与する方式です。
                        </div>
                      </Form.Check.Label>
                    </Form.Check>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Check type={'radio'} id={'grantimplementdate1'} className="m-r-10">
                      <Form.Check.Input
                        type={'radio'}
                        id={'grantimplementdate1'}
                        name="grantimplementdate"
                        defaultChecked={grantImplementDate === 1}
                        onClick={() => setGrantImplementDate(1)}
                      />
                      <Form.Check.Label>
                        <span>入社日に関わらず同一の日</span>
                        <div className="hint">毎年設定した基準日に一斉付与を行います。</div>
                      </Form.Check.Label>
                    </Form.Check>
                  </Form.Group>
                  {grantImplementDate ? (
                    <div>
                      <Form.Group>
                        <div className="d-flex align-items-center">
                          <div className="preset_life_bottom ms-1">基準日:</div>
                          <Form.Select style={{ width: '80px' }} onChange={(e) => setBaseMonth(e.target.value)}>
                            {month.map((m) => (
                              <option key={m} value={m} selected={m === baseMonth}>
                                {m}
                              </option>
                            ))}
                          </Form.Select>
                          <div className="preset_life_bottom ms-1">月</div>
                          <Form.Select style={{ width: '80px' }} onChange={(e) => setBaseDay(e.target.value)}>
                            {days.map((m) => (
                              <option key={m} value={m} selected={m === baseDay}>
                                {m}
                              </option>
                            ))}
                          </Form.Select>
                          <div className="preset_life_bottom ms-1">日</div>
                        </div>
                      </Form.Group>
                    </div>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={12}>
                  <div className="text-center">
                    <Button href="/settings" variant={'light'} className="text-capitalize">
                      キャンセル
                    </Button>
                    <Button variant={'primary'} className="text-capitalize" onClick={saveSetting}>
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

export default AnnualEdit;
