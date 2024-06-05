import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { yukAPI, auth_token } from '../../utils/api';
import moment from 'moment/moment';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Button, Col, Row, Alert, Collapse, Card, Form, Dropdown, DropdownButton, ButtonGroup, Badge } from 'react-bootstrap';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Employee = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [empNumber, setEmpNumber] = useState('');
  const [workingType, setWorkingType] = useState(0);
  const [status, setStatus] = useState(0);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getDepartment();
    getEmployee();
  }, []);

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

  const getEmployee = async () => {
    await yukAPI('employee_list', {}, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          console.log(res.data.data);
          setEmployees(res.data.data);
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  const searchEmployee = async () => {
    await yukAPI('employee_list',
      {
        name: name,
        department: department,
        emp_number: empNumber,
        working_type: workingType,
        status: status
      },
      'post',
      auth_token
    )
      .then((res) => {
        if (res.data.status === 'success') {
          setEmployees(res.data.data);
          setOpen(false);
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  const resetSearch = () => {
    setName('');
    setDepartment(0);
    setEmpNumber('');
    setWorkingType(0);
    setStatus(0);
    getEmployee();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={12} md={12}>
          <Alert variant="info" dismissible>
            <Alert.Heading>残日数の引継ぎができます。</Alert.Heading>
            <hr />
            <p>
              「残り有休日数を設定」ボタンから、従業員の現在までの残日数を登録することができます。
              <br />
              素早くセットアップするための機能ですが使わなくても問題ございません。
            </p>
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12}>
          <Button href="/employee/create" variant={'primary'} className="text-capitalize">
            <i className="feather icon-plus-circle" />
            新規追加
          </Button>
          <Button
            variant={'dark'}
            className="text-capitalize"
            onClick={() => setOpen(!open)}
            aria-controls="request-search"
            aria-expanded={open}
          >
            <i className="feather icon-search" />
            絞り込む
          </Button>
          <DropdownButton
            title={'CSV操作'}
            as={ButtonGroup}
            variant={'success'}
            className="text-capitalize"
            style={{ verticalAlign: 'top' }}
          >
            <Dropdown.Item eventKey="1">
              <i className="feather icon-file-plus me-2"></i>
              CSVで社員を登録
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <i className="feather icon-file-minus me-2"></i>
              社員情報をCSVでエクスポート
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Collapse in={open}>
            <Card>
              <Card.Body>
                <Row>
                  <Col sm={12} md={4}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>氏名</Form.Label>
                      <Form.Control type="input" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={3}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>所属部署</Form.Label>
                      <Form.Select aria-label="Default select example" onChange={(e) => setDepartment(e.target.value)}>
                        <option value={""}></option>
                        {departments.map((department, idx) => (
                          <option key={idx} value={department.id}>{department.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={2}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>社員番号</Form.Label>
                      <Form.Control type="input" value={empNumber} onChange={(e) => setEmpNumber(e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={3}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>勤務形態</Form.Label>
                      <Form.Select aria-label="Default select example" onChange={(e) => setWorkingType(e.target.value)}>
                        <option value="0"></option>
                        <option value="1">正社員</option>
                        <option value="2">パート(週5日)</option>
                        <option value="3">パート(週4日)</option>
                        <option value="4">パート(週3日)</option>
                        <option value="5">パート(週2日)</option>
                        <option value="6">パート(週1日)</option>
                        <option value="7">パート(不定期)</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <div className="d-flex">
                      <Form.Check type="checkbox" className="m-r-10" label="在職中" onClick={(e) => setStatus(e.target.checked ? 0 : status)} />
                      <Form.Check type="checkbox" className="m-r-10" label="休職中" onClick={(e) => setStatus(e.target.checked ? 1 : status)} />
                      <Form.Check type="checkbox" className="m-r-10" label="退職済み" onClick={(e) => setStatus(e.target.checked ? 2 : status)} />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <Button variant={'primary'} size="sm" className="text-capitalize" onClick={searchEmployee}>
                      <i className="feather icon-search" />
                      検索する
                    </Button>
                    <Button variant={'dark'} size="sm" className="text-capitalize" onClick={resetSearch}>
                      クリア
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Collapse>
        </Col>
      </Row>
      <Row className="m-t-10">
        <Col sm={12} md={12}>
          <Card>
            <Card.Body>
              <Table>
                <Thead>
                  <Tr>
                    <Th>社員番号 / 部署 / 名前</Th>
                    <Th>E-mail</Th>
                    <Th>残り有休 / 特休</Th>
                    <Th>有休付与予定日</Th>
                    <Th>有休取得率</Th>
                    <Th>入社日 / 勤務形態</Th>
                    <Th>操作</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {employees.map((item, idx) => (
                    <Tr key={idx}>
                      <Td>
                        <i>{item.employee_number}&nbsp;{item.department_name ? item.department_name : ''}</i>
                        <br />
                        <Link href="#">
                          {item.name}
                          <i className="feather icon-info ms-1"></i>
                        </Link>
                      </Td>
                      <Td>{item.email}</Td>
                      <Td>
                        <span>1日と6時間 / 0日と2時間</span>
                        <br />
                        <Badge bg={'danger'}>
                          特休消化の異常
                        </Badge>
                      </Td>
                      <Td>2022/09/01</Td>
                      <Td>12 %</Td>
                      <Td>
                        <span>{moment(item.hire_date).format('YYYY/MM/DD')}</span>
                        <br />
                        <span>{item.working_type_label}</span>
                        <br />
                        <Badge bg={'primary'}>
                          {item.status_label}
                        </Badge>
                      </Td>
                      <Td>
                        <div>
                          <Button href="/treat_single" variant={'success'} className="text-capitalize" size="sm">
                            休暇管理
                          </Button>
                          <Button href="/remaining_days/form" variant={'primary'} className="text-capitalize" size="sm">
                            残り有休日数を設定
                          </Button>
                        </div>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Employee;
