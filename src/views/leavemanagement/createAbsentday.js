import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { DatePicker } from 'rsuite';
import { yukAPI, auth_token, goRedirect } from '../../utils/api';
import jaJp from 'rsuite/locales/ja_JP';
import 'rsuite/DatePicker/styles/index.css';

const CreateAbsentday = () => {
  let params = useParams();
  const [showMsg, setShowMsg] = useState('');
  const [absenceDay, setAbsenceDay] = useState(new Date());
  const [absenceEndDay, setAbsenceEndDay] = useState(new Date());
  const [absenceUnit, setAbsenceUnit] = useState(8);
  const [note, setNote] = useState('');
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    employee_number: '',
    department_label: ''
  });

  useEffect(() => {
    getData();
    console.log(userData);
  }, []);

  const getData = async () => {
    await yukAPI('show_employee', { id: params.id }, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          setUserData(res.data.data);
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  const saveEmployee = async () => {
    await yukAPI(
      'create_absenceregistration',
      {
        employee_id: params.id,
        absence_day: absenceDay,
        absence_end_day: absenceEndDay,
        absence_unit: absenceUnit,
        note: note
      },
      'post',
      auth_token
    )
      .then((res) => {
        if (res.data.status === 'success') {
          console.log(res.data);
          goRedirect('/treat_single/' + params.id);
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
      <p>
        従業員の欠勤（有休、特休や会社都合ではない休み）を記録したい場合にご利用ください。
        <br />
        労働基準法では所定労働日の8割以上出勤した労働者に対して有休が付与されますが、有休ノートは労働日数の管理を行っていません。
        <br />
        それなので、欠勤が多く有休付与の対象から外れる従業員がいる場合は、有休の付与日や日数を手動で修正してください。
      </p>
      <Row>
        <Col sm={8} className="center-card">
          <Card>
            <Card.Body>
              <Alert variant="danger" show={showMsg}>
                <li>{showMsg}</li>
              </Alert>
              <Row className="mb-4">
                <div className="text-muted">
                  {userData.employee_number} {userData.department_label}
                </div>
                <div>{userData.name}</div>
              </Row>
              <Row>
                <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                  <Form.Label className="col-sm-3 required">欠勤日</Form.Label>
                  <div className="col-sm-9">
                    <Row>
                      <Col sm={12} md={5}>
                        <DatePicker
                          oneTap
                          style={{ width: '100%' }}
                          locale={jaJp}
                          defaultValue={new Date()}
                          onChange={(e) => setAbsenceDay(e ? e : '')}
                        />
                      </Col>
                      <Col sm={12} md={1}>
                        <div className="text-center d-flex" style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                          ~
                        </div>
                      </Col>
                      <Col sm={12} md={5}>
                        <DatePicker
                          oneTap
                          style={{ width: '100%' }}
                          locale={jaJp}
                          defaultValue={new Date()}
                          onChange={(e) => setAbsenceEndDay(e ? e : '')}
                        />
                      </Col>
                    </Row>
                  </div>
                </Form.Group>
                <hr />
                <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                  <Form.Label className="col-sm-3 required">欠勤単位</Form.Label>
                  <div className="col-sm-9">
                    <Form.Select aria-label="Default select example" onChange={(e) => setAbsenceUnit(e.target.value)}>
                      <option value={8}>全休</option>
                      <option value={7}>7時間</option>
                      <option value={6}>6時間</option>
                      <option value={5}>5時間</option>
                      <option value={4}>4時間</option>
                      <option value={3}>3時間</option>
                      <option value={2}>2時間</option>
                      <option value={1}>1時間</option>
                    </Form.Select>
                  </div>
                </Form.Group>
                <hr />
                <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                  <Form.Label className="col-sm-3">理由/備考</Form.Label>
                  <div className="col-sm-9">
                    <Form.Control as="textarea" rows={3} onChange={(e) => setNote(e.target.value)} />
                  </div>
                </Form.Group>
                <hr />
                <Col sm={12}>
                  <div className="text-center">
                    <Button href="/employee" variant={'light'} className="text-capitalize">
                      キャンセル
                    </Button>
                    <Button variant={'primary'} className="text-capitalize" onClick={saveEmployee}>
                      登録する
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

export default CreateAbsentday;
