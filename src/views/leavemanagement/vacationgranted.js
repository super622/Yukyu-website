import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { DatePicker } from 'rsuite';
import Swal from 'sweetalert2';
import { yukAPI, auth_token, goRedirect } from '../../utils/api';
import jaJp from 'rsuite/locales/ja_JP';
import 'rsuite/DatePicker/styles/index.css';

const Vacationgranted = () => {
  let params = useParams();
  const [showMsg, setShowMsg] = useState('');
  const [gratedDate, setGrantedDate] = useState(new Date());
  const [expiredDate, setExpiredDate] = useState(new Date().setFullYear(new Date().getFullYear() + 2));
  const [givenType, setGivenType] = useState(5);
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    employee_number: '',
    department_label: ''
  });


  useEffect(() => {
    getData();
    init();
  }, []);

  const init = async () => {
    document.getElementById('given_type').selectedIndex = givenType;
  };

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

  const saveData = async () => {
    await yukAPI(
      'update_absenceregistration',
      {
        id: params.id,
        employee_id: userData.id,
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
          goRedirect('/treat_single/' + userData.id);
        } else {
          setShowMsg(res.data.msg);
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  const removeAlert = () => {
    Swal.fire({
      title: '本当に削除しますか?',
      text: '',
      icon: 'error',
      showCancelButton: true,
      cancelButtonColor: '#e8e8e8',
      confirmButtonColor: '#f44236',
      iconColor: '#f44236',
      confirmButtonText: '削除する',
      cancelButtonText: 'キャンセル',
      reverseButtons: true
    }).then(function (result) {
      if (result.isConfirmed) {
        removeData();
      }
    });
  };

  const removeData = async () => {
    await yukAPI('remove_absenceregistration', { id: params.id }, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          goRedirect('/treat_single/' + userData.id);
        } else {
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
              <Row className="mb-4">
                <div className="text-muted">
                  {userData.employee_number} {userData.department_label}
                </div>
                <div>{userData.name}</div>
              </Row>
              <Row>
                <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                  <Form.Label className="col-sm-3 required">付与日</Form.Label>
                  <div className="col-sm-9">
                    <DatePicker
                      oneTap
                      locale={jaJp}
                      format="yyyy年MM月dd日"
                      value={gratedDate}
                      onChange={(e) => setGrantedDate(e ? e : '')}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                  <Form.Label className="col-sm-3 required">有効期限</Form.Label>
                  <div className="col-sm-9">
                    <DatePicker
                      oneTap
                      locale={jaJp}
                      format="yyyy年MM月dd日"
                      value={expiredDate}
                      onChange={(e) => setExpiredDate(e ? e : '')}
                    />
                  </div>
                </Form.Group>
                <hr />
                <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                  <Form.Label className="col-sm-3">付与種別</Form.Label>
                  <div className="col-sm-9">
                    <Form.Select aria-label="Default select example" id="given_type" onChange={(e) => setGivenType(e.target.value)}>
                      <option value={0}>定期付与 (6ヶ月) </option>
                      <option value={1}>定期付与 (1年6ヶ月) </option>
                      <option value={2}>定期付与 (2年6ヶ月) </option>
                      <option value={3}>定期付与 (3年6ヶ月) </option>
                      <option value={4}>定期付与 (4年6ヶ月) </option>
                      <option value={5}>定期付与 (5年6ヶ月) </option>
                      <option value={6}>定期付与 (6年6ヶ月) </option>
                    </Form.Select>
                  </div>
                </Form.Group>
                <hr />
                <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                  <Form.Label className="col-sm-3">理由/備考</Form.Label>
                  <div className="col-sm-9">
                    <Form.Control as="textarea" rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
                  </div>
                </Form.Group>
                <hr />
                <Col sm={12}>
                  <div className="text-center">
                    <Button href={`/treat_single/${userData.id}`} variant={'light'} className="text-capitalize">
                      キャンセル
                    </Button>
                    <Button variant={'primary'} className="text-capitalize" onClick={saveData}>
                      登録する
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={8} className="center-card">
          <hr />
          <div className="text-end">
            <Button variant={'danger'} className="text-capitalize" onClick={removeAlert}>
              削除
            </Button>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Vacationgranted;
