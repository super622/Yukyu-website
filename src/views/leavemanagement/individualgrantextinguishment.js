import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Badge, Collapse } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { yukAPI, auth_token } from '../../utils/api';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import CanvasJSReact from '@canvasjs/react-charts';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const IndividualGrantExtinguishment = () => {
  let params = useParams();
  let initEmp = {
    id: '',
    name: ' '
  };
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showLeftEmp, setShowLeftEmp] = useState(2);
  const [department, setDepartment] = useState(0);
  const [search, setSearch] = useState('');
  const [empList, setEmpList] = useState([]);
  const [curData, setCurData] = useState([]);
  const [prevEmp, setPrevEmp] = useState(initEmp);
  const [nextEmp, setNextEmp] = useState(initEmp);

  const options = {
    theme: 'light2',
    axisY: {
      suffix: '日'
    },
    toolTip: {
      shared: true
    },
    data: [
      {
        type: 'area',
        name: 'GBP',
        showInLegend: true,
        xValueFormatString: 'YYYY',
        yValueFormatString: '$#,##0.##',
        dataPoints: [
          { x: new Date('2017-01-01'), y: 5 },
          { x: new Date('2017-02-01'), y: 8 },
          { x: new Date('2017-03-01'), y: 8 },
          { x: new Date('2017-04-01'), y: 7 },
          { x: new Date('2017-05-01'), y: 7 },
          { x: new Date('2017-06-01'), y: 7 },
          { x: new Date('2017-07-01'), y: 7 },
          { x: new Date('2017-08-01'), y: 7 },
          { x: new Date('2017-09-01'), y: 8 },
          { x: new Date('2017-10-01'), y: 8 },
          { x: new Date('2017-11-01'), y: 8 },
          { x: new Date('2017-12-01'), y: 8 }
        ]
      },
      {
        type: 'area',
        name: 'USD',
        showInLegend: true,
        xValueFormatString: 'YYYY',
        yValueFormatString: '$#,##0.##',
        dataPoints: [
          { x: new Date('2017-01-01'), y: 7 },
          { x: new Date('2017-02-01'), y: 7 },
          { x: new Date('2017-03-01'), y: 6 },
          { x: new Date('2017-04-01'), y: 6 },
          { x: new Date('2017-05-01'), y: 6 },
          { x: new Date('2017-06-01'), y: 6 },
          { x: new Date('2017-07-01'), y: 6 },
          { x: new Date('2017-08-01'), y: 6 },
          { x: new Date('2017-09-01'), y: 7 },
          { x: new Date('2017-10-01'), y: 6 },
          { x: new Date('2017-11-01'), y: 6 },
          { x: new Date('2017-12-01'), y: 6 }
        ]
      }
    ]
  };
  const flag = true;

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
                href={`/treat_single/${prevEmp.id}`}
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
                href={`/treat_single/${nextEmp.id}`}
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
                    <Link key={idx} to={`/treat_single/${item.id}`}>
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
            <Card.Body className="operation-button-row">
              <Button href="#" variant={'success'}>
                休暇付与
              </Button>
              <Button href="#" variant={'warning'}>
                休暇消化
              </Button>
              <Button href={`/absent_day/new/${curData.id}`} variant={'outline-danger'}>
                欠勤登録
              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <span>休暇・欠勤履歴</span>
              <div className="history-media-menu">
                <Button variant={'outline-dark'} size={'sm'}>
                  CSV
                </Button>
                <Button variant={'outline-danger'} size={'sm'}>
                  PDF
                </Button>
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
                      <Link to={'#'} className="text-muted">
                        PDF出力
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
              <div className="d-flex justify-content-end">
                <Form.Check type={'checkbox'} id={'checkbox1'} name="group1" className="m-r-10" label={'有休'} />
                <Form.Check type={'checkbox'} id={'checkbox2'} name="group1" className="m-r-10" label={'特休'} />
                <Form.Check type={'checkbox'} id={'checkbox3'} name="group1" className="m-r-10" label={'欠勤'} />
              </div>
              <div>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>種類</Th>
                      <Th>日付/曜日</Th>
                      <Th>日数</Th>
                      <Th>理由/備考</Th>
                      <Th>操作</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>
                        <Badge pill bg={'warning'}>
                          消化
                        </Badge>
                      </Td>
                      <Td>2024/04/04 (木)</Td>
                      <Td>1日</Td>
                      <Td>
                        有効期限:2026/02/28
                        <br />
                        【パート週4】
                        <br />
                        自動付与による付与です。
                      </Td>
                      <Td>
                        <div>
                          <Button href="/department/123" variant={'warning'} className="text-capitalize" size="sm">
                            編集
                          </Button>
                        </div>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </div>
              <div className="mt-2"></div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Card id="remainCard">
            <Card.Header>
              <h5>有休残日数グラフ</h5>
            </Card.Header>
            <Card.Body>
              {flag ? (
                <CanvasJSChart options={options} />
              ) : (
                <h6 className="p-10" style={{ color: '#888' }}>
                  対象のデータがありません
                </h6>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default IndividualGrantExtinguishment;
