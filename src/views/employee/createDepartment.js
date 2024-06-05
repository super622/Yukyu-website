import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { yukAPI, auth_token, goRedirect } from '../../utils/api';

const CreateDepartment = () => {
  const [showMember, setShowMembers] = useState(false);
  const [showMsg, setShowMsg] = useState('');
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [priority, setPriority] = useState(0);
  const members = [];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await yukAPI('get_employee_without_department', {}, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          setData(res.data.data);
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  const handleCheck = (id, checked) => {
    if (checked) {
      members.push(id);
    } else {
      if (members.indexOf(id) >= 0) {
        members.splice(members.indexOf(id), 1);
      }
    }
  };

  const saveDepartment = async () => {
    if (name === '') {
      setShowMsg('部署名を入力してください');
    } else {
      let member = '';
      if (members.length > 0) {
        member = members.join(',');
      }
      await yukAPI('create_department', { name: name, priority: priority, member: member }, 'post', auth_token)
        .then((res) => {
          if (res.data.status === 'success') {
            goRedirect('/department/' + res.data.data.id);
          } else {
            console.log(res.data.msg);
          }
        })
        .catch((e) => {
          console.log('Login request error => ', e);
        });
    }
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
                <Form.Label className="col-md-3 required">部署名</Form.Label>
                <div className="col-md-9">
                  <Form.Control type="input" placeholder="開発部" value={name} onChange={(e) => setName(e.target.value)} />
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
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3">従業員を追加する</Form.Label>
                <div className="col-md-9">
                  <div className="d-flex">
                    <Form.Check
                      type="switch"
                      className="input-success f-16"
                      style={{ marginTop: '.7rem' }}
                      disabled={data.length === 0}
                      onChange={(e) => setShowMembers(e.target.checked)}
                    />
                    <Form.Label className="hint">どの部署にも属していない従業員を選択できます</Form.Label>
                  </div>
                  <div>
                    {showMember ? (
                      <div className="checkboxes-container">
                        <div className="d-flex flex-wrap border rounded p-3">
                          {data.map((item) => (
                            <Form.Check
                              key={item.id}
                              type={'checkbox'}
                              id={`emp${item.id}`}
                              className="m-r-10"
                              label={`${item.name}`}
                              onClick={(e) => handleCheck(item.id, e.target.checked)}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </Form.Group>
              <hr />
              <Row>
                <Col sm={12}>
                  <div className="text-center">
                    <Button href="/department" variant={'light'} className="text-capitalize">
                      キャンセル
                    </Button>
                    <Button variant={'primary'} className="text-capitalize" onClick={saveDepartment}>
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

export default CreateDepartment;
