import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Badge, Collapse } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { yukAPI, auth_token } from '../../utils/api';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Paidleavemanagebook = () => {
  let params = useParams();
  let initEmp = {
    id: '',
    name: ' '
  };
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showLeftEmp, setShowLeftEmp] = useState(2);
  const [department, setDepartment] = useState(0);
  const [search, setSearch] = useState('');
  const [empList, setEmpList] = useState([]);
  const [curData, setCurData] = useState([]);
  const [prevEmp, setPrevEmp] = useState(initEmp);
  const [nextEmp, setNextEmp] = useState(initEmp);

  useEffect(() => {
    getEmployeeInfo();
    getEmpData();
    getDepData();
  }, [params]);

  const getEmployeeInfo = async () => {
    await yukAPI('show_employee', { id: params.id }, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          setCurData(res.data.data);
          if (res.data.prev) {
            setPrevEmp(res.data.prev);
          } else {
            setPrevEmp(initEmp);
          }
          if (res.data.next) {
            setNextEmp(res.data.next);
          } else {
            setNextEmp(initEmp);
          }
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  const getEmpData = async () => {
    await yukAPI('employee_list', {}, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          setEmployees(res.data.data);
          handleSearch(res.data.data, department, showLeftEmp, search);
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  const getDepData = async () => {
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

  const handleSearch = async (employees, dep, left, empName) => {
    let data = [];
    for (let i = 0; i < employees.length; i++) {
      if (dep !== 0) {
        if (employees[i].department_id !== dep) {
          continue;
        }
      }
      if (employees[i].name.includes(empName) && employees[i].status < left) {
        data.push(employees[i]);
      }
    }
    setEmpList(data);
    setDepartment(dep);
    setShowLeftEmp(left);
    setSearch(empName);
  };

  return (
    <React.Fragment>
      <Row>
        <Col lg={4} xl={4}>
          <Row className="mb-2">
            <Col className="gap-2 mt-2 pe-1 col-6">
              <Button
                href={`/management_book/${prevEmp.id}`}
                variant={'outline-dark'}
                className="text-truncate m-0 w-100 h-100"
                disabled={prevEmp.id === ''}
                style={prevEmp.id === '' ? { opacity: 0.2 } : {}}
              >
                <i className="feather icon-chevron-left position-relative pe-1" style={{ top: '4px', float: 'left' }}></i>
                {prevEmp.name}
              </Button>
            </Col>
            <Col className="gap-2 mt-2 ps-1 col-6">
              <Button
                href={`/management_book/${nextEmp.id}`}
                variant={'outline-primary'}
                className="text-truncate m-0 w-100 h-100"
                disabled={nextEmp.id === ''}
                style={nextEmp.id === '' ? { opacity: 0.2 } : {}}
              >
                <i
                  className="feather icon-chevron-right position-relative"
                  style={{ top: '4px', float: 'right', marginLeft: '12px', marginRight: '0px' }}
                ></i>
                {nextEmp.name}
              </Button>
            </Col>
          </Row>
          <Card>
            <Card.Body>
              <Form.Select onChange={(e) => handleSearch(employees, parseInt(e.target.value), showLeftEmp, search)}>
                <option value={0}>全ての部署</option>
                {departments.map((item, idx) => (
                  <option value={item.id} key={idx}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
              <Row className="mt-2">
                <Col sm={12} className="d-flex justify-content-end">
                  <Form.Check
                    type={'checkbox'}
                    id={'checkbox'}
                    ame="group1"
                    className="m-r-10"
                    label={'退職者を表示する'}
                    onClick={(e) => handleSearch(employees, department, e.target.checked ? 3 : 2, search)}
                  />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={12}>
                  <Form.Control
                    type="input"
                    placeholder="氏名 / 社員番号"
                    value={search}
                    onChange={(e) => handleSearch(employees, department, showLeftEmp, e.target.value)}
                  />
                </Col>
              </Row>
              <div className="mt-2">
                <div className="user-list">
                  {empList.map((item, idx) => (
                    <Link key={idx} to={`/management_book/${item.id}`}>
                      <div
                        className={
                          params.id
                            ? parseInt(params.id) === item.id
                              ? 'user-list-row select-user-row active'
                              : 'user-list-row select-user-row'
                            : idx === 0
                            ? 'user-list-row select-user-row active'
                            : 'user-list-row select-user-row'
                        }
                      >
                        <div className="person-name">{item.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8} xl={8}>
          <Card>
            <Card.Body className="border-bottom">
              <Row className="d-flex align-items-center">
                <Col className="col-auto">
                  <i className="feather icon-user f-40 text-green-300"></i>
                </Col>
                <Col>
                  <Row className="d-flex align-items-center">
                    <Col sm={12}>
                      <span>{curData.department_label}</span>
                      <span className="float-right text-muted ms-2">
                        社員番号： {curData.employee_number ? curData.employee_number : '-'}
                      </span>
                    </Col>
                  </Row>
                  <div className="d-flex flex-wrap f-w-300 align-items-end">
                    <Link to={`/employee/${curData.id}`}>
                      <div className="d-flex">
                        <div className="user-detail-name">{curData.name}</div>
                        <i className="feather icon-info mt-2 ms-2"></i>
                      </div>
                    </Link>
                  </div>
                  <div className="user-detail-kana">{curData.kana_name}</div>
                  <span className="d-block">
                    {curData.status === 0 ? (
                      <Badge bg={'primary'}>在職中</Badge>
                    ) : curData.status === 1 ? (
                      <Badge bg={'success'}>休職中</Badge>
                    ) : (
                      <Badge bg={'info'}>退職済み</Badge>
                    )}
                  </span>
                </Col>
              </Row>
            </Card.Body>
            <Card.Body>
              <Row className="d-flex align-items-center">
                <Col sm={12} className="py-1">
                  <span>勤務形態: {curData.working_type_label}</span>
                  <span className="float-right text-muted"></span>
                </Col>
                <Col sm={12} className="py-1">
                  <span>入社日: {moment(curData.hire_date).format('YYYY/MM/DD')}</span>
                  <span className="float-right text-muted"></span>
                </Col>
                <Col sm={12} className="py-1 d-flex flex-wrap">
                  <div className="text-nowrap me-4">
                    <span>残り有休: 14日</span>
                    <span className="float-right text-danger pl-3"></span>
                  </div>
                  <div>
                    <span>
                      <a href="#remainCard">
                        <i className="feather icon-bar-chart"></i>
                        &nbsp;有休残日数グラフ
                      </a>
                    </span>
                  </div>
                </Col>
                <Col sm={12} className="py-1">
                  <span>残り特休: 0日</span>
                  <span className="float-right text-danger ps-3"></span>
                </Col>
                <Col sm={12} className="py-1">
                  <span>有休付与予定日: 2025/03/01</span>
                </Col>
                <Col sm={12} className="py-1">
                  <span>有休消滅予定日: 2025/02/28 に 6日が消滅予定です。</span>
                </Col>
                <Col sm={12} className="py-1">
                  <span>有休取得率: 12 %</span>
                </Col>
                <Col sm={12} className="py-1">
                  <span>時間単位の有休取得上限: 40時間(年5日分)</span>
                </Col>
                <Col sm={12} className="py-1">
                  <span>時間単位の有休取得合計(今回分): 0 時間 ※半日(4時間)も含まれています</span>
                </Col>
              </Row>
            </Card.Body>
            <hr />
          </Card>
          <Card>
            <Card.Header>
              <h5>年次有給休暇管理簿</h5>
              <div className="history-media-menu">
                <Button variant={'outline-dark'} size={'sm'}>
                  CSV
                </Button>
                <Link to={`/management_book/print/${params.id}`} className="outline-dark btn btn-outline-dark btn-sm" target="_blank">
                  印刷ページ
                </Link>
              </div>
              <div className="history-mobile-menu">
                <Link to="#" className="text-muted" id="mobile-collapse" onClick={() => setOpen(!open)}>
                  <i className="feather icon-menu"></i>
                </Link>
              </div>
              <Collapse in={open} className="mt-2">
                <Card>
                  <Card.Body>
                    <div className="border-bottom p-2 media-menu-content">
                      <Link to={`/management_book/print/${params.id}`} className="text-muted" target="_blank">
                        印刷ページ
                      </Link>
                    </div>
                    <div className="p-2 text-muted media-menu-content">
                      <Link to={'#'} className="text-muted">
                        CSV出力
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Collapse>
            </Card.Header>
            <Card.Body>
              <div>
                <Table className="table-bordered table-striped">
                  <Thead>
                    <Tr>
                      <Th>氏名</Th>
                      <Th>社員番号</Th>
                      <Th>所属部署</Th>
                      <Th>入社日</Th>
                      <Th>勤務形態</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>{curData.name}</Td>
                      <Td>{curData.employee_number}</Td>
                      <Td>{curData.department_label}</Td>
                      <Td>{moment(curData.hire_date).format('YYYY/MM/DD')}</Td>
                      <Td>{curData.working_type_label}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </div>
              <div className="management-item" style={show ? { display: 'block' } : { display: 'none' }}>
                <h5 className="m-t-50">■ 2024/05/01 付与日数: 10日, 期限: 2026/04/30, 残日数:2日</h5>
                <Table className="table-bordered table-striped">
                  <Thead>
                    <Tr>
                      <Th>NO</Th>
                      <Th>取得日</Th>
                      <Th>曜日</Th>
                      <Th>残日数</Th>
                      <Th>取得内容</Th>
                      <Th>理由/備考</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>1</Td>
                      <Td>2024/05/01</Td>
                      <Td>水</Td>
                      <Td>9日</Td>
                      <Td>全休</Td>
                      <Td>システムによる自動消化です。</Td>
                    </Tr>
                    <Tr>
                      <Td>2</Td>
                      <Td>2024/05/02</Td>
                      <Td>木</Td>
                      <Td>8日</Td>
                      <Td>全休</Td>
                      <Td>システムによる自動消化です。</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </div>
              <div className="management-item">
                <h5 className="m-t-50">
                  ■ 2024/05/24 付与日数: 5日, 期限: 2026/05/29, 残日数:5日
                  <Badge pill bg={'primary'}>
                    基準日
                  </Badge>
                </h5>
                ※ 有休の使用日はありません。
              </div>
              <div className="text-center mt-5" style={show ? { display: 'none' } : { display: 'block' }}>
                <Link to={'#'} onClick={() => setShow(true)}>
                  全て表示
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Paidleavemanagebook;
