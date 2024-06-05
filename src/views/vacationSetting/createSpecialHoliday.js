import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Badge, Alert } from 'react-bootstrap';
import { yukAPI, auth_token, goRedirect } from '../../utils/api';

const CreateSpecialHoliday = () => {
  const [showMsg, setShowMsg] = useState('');
  const [name, setName] = useState('');
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState(1);
  const [notification, setNotification] = useState(0);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    init(1);
  };

  const init = async (status) => {
    if (status === 1) {
      document.getElementById('status1').checked = true;
    } else {
      document.getElementById('status0').checked = true;
    }
  };

  const saveData = async () => {
    await yukAPI(
      'create_speicalholidaysettings',
      {
        name: name,
        priority: priority,
        status: status,
        notice_excess_consumption: notification,
        expire_year: year,
        expire_month: month,
        expire_day: day
      },
      'post',
      auth_token
    )
      .then((res) => {
        if (res.data.status === 'success') {
          goRedirect('/special_items/' + res.data.data.id);
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
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3 required">名前</Form.Label>
                <div className="col-md-9">
                  <Form.Control type="input" placeholder="誕生日休暇" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </Form.Group>
              <hr />
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3">優先度</Form.Label>
                <div className="col-md-9">
                  <Form.Control
                    type="number"
                    style={{ maxWidth: '150px' }}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                  <div className="hint">優先度の数値が高い部署が先に表示されます</div>
                </div>
              </Form.Group>
              <hr />
              <Row>
                <Col sm={3} className="h5 mt-3">
                  ステータス
                </Col>
                <Col sm={9} className="mt-3">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Check type={'radio'} id={'status1'} className="m-r-10">
                      <Form.Check.Input type={'radio'} name="status" defaultChecked={status === 1} onClick={() => setStatus(1)} />
                      <Form.Check.Label>
                        <h5>
                          <Badge bg="success">有効</Badge>
                        </h5>
                      </Form.Check.Label>
                    </Form.Check>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Check type={'radio'} id={'status0'} className="m-r-10">
                      <Form.Check.Input type={'radio'} name="status" defaultChecked={status === 0} onClick={() => setStatus(0)} />
                      <Form.Check.Label>
                        <h5>
                          <Badge bg="danger">無効</Badge>
                        </h5>
                      </Form.Check.Label>
                    </Form.Check>
                  </Form.Group>
                  <div className="hint">有効になっているもののみが休暇登録画面や申請フォームに表示されます。</div>
                </Col>
              </Row>
              <hr />
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3">消化超過のお知らせ</Form.Label>
                <div className="col-md-9">
                  <Form.Check
                    type={'checkbox'}
                    className="m-r-10 p0"
                    label={'表示しない'}
                    defaultChecked={notification}
                    onClick={(e) => setNotification(e.target.checked ? 1 : 0)}
                  />
                  <div className="hint">消化の記録だけ残したい特休や、付与と消化の順序が逆でも良い特休の場合チェックを入れます。</div>
                </div>
              </Form.Group>
              <hr />
              <Row>
                <Col sm={3} className="h5 mt-3">
                  最小取得単位
                </Col>
                <Col sm={9} className="mt-3">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <div className="d-flex align-items-center">
                      <Form.Control type="number" value={year} style={{ width: '80px' }} onChange={(e) => setYear(e.target.value)} />
                      <div className="preset_life_bottom ms-1">年</div>
                      <Form.Control type="number" value={month} style={{ width: '80px' }} onChange={(e) => setMonth(e.target.value)} />
                      <div className="preset_life_bottom ms-1">ヶ月</div>
                      <Form.Control type="number" value={day} style={{ width: '80px' }} onChange={(e) => setDay(e.target.value)} />
                      <div className="preset_life_bottom ms-1">日</div>
                    </div>
                  </Form.Group>
                  <div className="hint">
                    特休付与を行うときに有効期限の自動入力に利用されます。
                    <br />
                    「0年0ヶ月0日」とした場合は、有休設定の有効期限が自動入力されます。
                  </div>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={12}>
                  <div className="text-center">
                    <Button href="/special_items" variant={'light'} className="text-capitalize">
                      キャンセル
                    </Button>
                    <Button variant={'primary'} className="text-capitalize" onClick={saveData}>
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

export default CreateSpecialHoliday;
