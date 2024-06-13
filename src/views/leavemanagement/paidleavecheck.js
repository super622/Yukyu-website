import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { yukAPI, auth_token } from '../../utils/api';
import { Badge, Button, Card, Col, Row, Collapse, Form } from 'react-bootstrap';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const PaidLeaveCheck = () => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [empNumber, setEmpNumber] = useState('');
  const [digestionday, setDigestionDay] = useState(0);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    getData();
    getDepartment();
  }, []);

  useEffect(() => {
    if (members.length === count) {
      document.getElementById('all-checkbox').checked = true;
    }

    if (members.length === 0) {
      document.getElementById('all-checkbox').checked = false;
    }
  }, [members]);

  const getData = async () => {
    await yukAPI(
      'get_obligation',
      {
        name: name,
        department: department,
        emp_number: empNumber,
        digestion_day: digestionday,
        status: status
      },
      'post',
      auth_token
    )
      .then((res) => {
        if (res.data.status === 'success') {
          setData(res.data.data);
          setCount(res.data.count);
        } else {
          console.log(res.data.msg);
          setData([]);
          setCount(0);
        }
        setOpen(false);
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  const getDepartment = async () => {
    await yukAPI('department_list', {}, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          setDepartments(res.data.data);
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  const sendNotification = async () => {
    let member = '';
    if (members.length > 0) {
      member = members.join(',');
    }
    await yukAPI('send_oblication_notice', { members: member }, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          console.log(res.data.msg);
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  const selectAllCheckbox = (status) => {
    let checkboxes = document.getElementsByClassName('checkbox-item');
    setMembers([]);

    if (status) {
      document.getElementById('all-checkbox').checked = true;
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].childNodes[0].checked = true;
        setMembers((prevMembers) => [...prevMembers, parseInt(checkboxes[i].childNodes[0].getAttribute('data-id'))]);
      }
    } else {
      document.getElementById('all-checkbox').checked = false;
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].childNodes[0].checked = false;
      }
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      setDisabled(false);
      selectAllCheckbox(true);
    } else {
      setDisabled(true);
      selectAllCheckbox(false);
    }
  };

  const handleCheck = (id, checked) => {
    if (checked) {
      setDisabled(false);
      setMembers((prevMembers) => [...prevMembers, id]);
    } else {
      if (members.indexOf(id) >= 0) {
        setMembers((prevMembers) => prevMembers.filter((memberId) => memberId !== id));
      }
    }
  };

  const resetSearch = () => {
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={12} md={12}>
          <Button
            variant={'success'}
            className="text-capitalize"
            onClick={() => setOpen(!open)}
            aria-controls="request-search"
            aria-expanded={open}
          >
            <i className="feather icon-search" />
            絞り込む
          </Button>
          <Collapse in={open}>
            <Card>
              <Card.Body>
                <Row>
                  <Col sm={3} md={3}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>所属部署</Form.Label>
                      <Form.Select aria-label="Default select example" onChange={(e) => setDepartment(e.target.value)}>
                        <option value=""></option>
                        {departments.map((department, idx) => (
                          <option key={idx} value={department.id}>
                            {department.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={3} md={3}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>氏名</Form.Label>
                      <Form.Control type="input" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col sm={2} md={2}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>社員番号</Form.Label>
                      <Form.Control type="input" value={empNumber} onChange={(e) => setEmpNumber(e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col sm={2} md={2}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>消化済日</Form.Label>
                      <Form.Control type="number" value={digestionday} onChange={(e) => setDigestionDay(e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col sm={2} md={2}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>ステータス</Form.Label>
                      <div className="d-flex">
                        <Form.Check
                          type="checkbox"
                          className="m-r-10"
                          id="custom-check1"
                          label="注意・警告"
                          onClick={(e) => setStatus(e.target.checked ? 1 : 0)}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <div className="text-center">
                      <Button variant={'dark'} size="sm" className="text-capitalize" onClick={resetSearch}>
                        クリア
                      </Button>
                      <Button variant={'primary'} size="sm" className="text-capitalize" onClick={getData}>
                        検索する
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Collapse>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Body>
              <div className="mb-3">
                <h5>年次有給休暇の年5日取得義務について</h5>
                <br />
                企業は従業員に対し、有休を10日以上付与した日(基準日)から1年以内に5日分の有休を取得させる義務があります。
                <br />
                <hr />
                ※義務の消化計算に時間がかかるため、有休を登録してから反映までに時間がかかります。
                <br />
                ※メールアドレスを登録済みの従業員には「通知する」ボタンを押して「残り有休及び有休消化義務の期日と日数」を通知できます。
              </div>
              <div className="d-flex">
                <Button variant={'info'} size={'sm'} id="js-notice-btn" disabled={disabled} onClick={sendNotification}>
                  <i className="feather icon-info"></i>
                  通知する
                </Button>
                <Button variant={'outline-dark'} size={'sm'} style={{ marginLeft: 'auto' }}>
                  CSV
                </Button>
              </div>
              <div>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>
                        <Form.Check
                          type={'checkbox'}
                          id="all-checkbox"
                          className="m-r-10"
                          disabled={count === 0}
                          label={''}
                          onChange={(e) => handleAllCheck(e.target.checked)}
                        />
                      </Th>
                      <Th>氏名</Th>
                      <Th>部署</Th>
                      <Th>基準日</Th>
                      <Th>義務日数</Th>
                      <Th>期限</Th>
                      <Th>消化済み日数</Th>
                      <Th>チェック</Th>
                      <Th>備考</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((item, idx) => (
                      <Tr key={idx}>
                        <Td>
                          {item.email ? (
                            <Form.Check
                              type={'checkbox'}
                              className="m-r-10 checkbox-item"
                              label={''}
                              data-id={item.id}
                              onChange={(e) => handleCheck(item.id, e.target.checked)}
                            />
                          ) : (
                            <Badge bg={'dark'}>メール未登録</Badge>
                          )}
                        </Td>
                        <Td>{item.name}</Td>
                        <Td>{item.department_name}</Td>
                        <Td>{item.base_date}</Td>
                        <Td>{item.obligation_date}</Td>
                        <Td>{item.deadline}</Td>
                        <Td>{item.used_days}</Td>
                        <Td>{item.check ? <Badge bg={'success'}>消化済</Badge> : ''}</Td>
                        <Td>{item.note}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PaidLeaveCheck;
