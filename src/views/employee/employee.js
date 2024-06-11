import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { yukAPI, auth_token } from '../../utils/api';
import moment from 'moment/moment';
import axios from 'axios';
import { BASE_API_URL } from '../../config/constant';
import { CSVLink } from 'react-csv';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Button, Col, Row, Alert, Collapse, Card, Form, Dropdown, DropdownButton, ButtonGroup, Badge, Modal } from 'react-bootstrap';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import SampleCSV from '../../assets/sample_data.zip';

const Employee = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [showMsg, setShowMsg] = useState('');
  const [csvUpload, setCSVUpload] = useState(false);
  const [filename, setFilename] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [empNumber, setEmpNumber] = useState('');
  const [workingType, setWorkingType] = useState(0);
  const [status, setStatus] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [csvData, setCSVData] = useState([]);

  let csvHeaders = [
    { label: 'No', key: 'no' },
    { label: '社員番号', key: 'employee_number' },
    { label: '勤務形態', key: 'working_type_label' },
    { label: '氏名', key: 'name' },
    { label: '部署', key: 'department_name' },
    { label: 'メールアドレス', key: 'email' },
    { label: '残り有休日数', key: 'paid_holidays' },
    { label: '残り特休日数', key: 'special_holidays' },
    { label: '有休取得率', key: 'acquisition_rate' },
    { label: '有休付与予定日', key: 'grant_date' },
    { label: '入社日', key: 'hire_date' },
    { label: '退職', key: 'resignation' },
    { label: '休職', key: 'leave_of_absence' },
    { label: 'メモ', key: 'note' }
  ];

  useEffect(() => {
    getDepartment();
    getEmployee();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            data[i].no = i + 1;
            data[i].hire_date = moment(data[i].hire_date).format('YYYY/MM/DD');
            if (data[i].status === 1) {
              data[i].leave_of_absence = data[i].status_label;
              data[i].resignation = '';
            } else if (data[i].status === 2) {
              data[i].leave_of_absence = '';
              data[i].resignation = data[i].status_label;
            }
          }
          setCSVData(data);
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
    await yukAPI(
      'employee_list',
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

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    setFilename(`C:\\fakepath\\` + event.target.files[0].name);
  };

  const handleCSVFile = async () => {
    if (file) {
      setCSVUpload(true);
      const formData = new FormData();
      formData.append('file', file);
      let config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      console.log(BASE_API_URL + 'csv_create_employee');
      await axios
        .post(BASE_API_URL + 'csv_create_employee', formData, config)
        .then((response) => {
          console.log(response.data);
          if (response.data.status === 'success') {
            console.log('uploaded');
          } else {
            setShow(false);
            setShowMsg(response.data.msg);
          }
          setCSVUpload(false);
          setFilename('');
        })
        .catch((error) => {
          console.log(error);
          setShow(false);
          setCSVUpload(false);
          setFilename('');
        });
    } else {
      setShow(false);
      setFilename('');
      setShowMsg('ファイルをアップロードしてください');
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={12} md={12}>
          <Alert variant="danger" show={showMsg} onClick={() => setShowMsg('')} dismissible>
            {showMsg}
          </Alert>
        </Col>
      </Row>
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
            <Dropdown.Item eventKey="1" onClick={handleShow}>
              <i className="feather icon-file-plus me-2"></i>
              CSVで社員を登録
            </Dropdown.Item>
            <CSVLink
              className="text-muted dropdown-item"
              id="fileDownload"
              data={csvData}
              headers={csvHeaders}
              filename={`${moment(new Date()).format('YYYY_MM_DD')}_people.csv`}
              target="_blank"
            >
              <i className="feather icon-file-minus me-2"></i>
              社員情報をCSVでエクスポート
            </CSVLink>
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
                        <option value={''}></option>
                        {departments.map((department, idx) => (
                          <option key={idx} value={department.id}>
                            {department.name}
                          </option>
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
                      <Form.Check
                        type="checkbox"
                        className="m-r-10"
                        label="在職中"
                        onClick={(e) => setStatus(e.target.checked ? 0 : status)}
                      />
                      <Form.Check
                        type="checkbox"
                        className="m-r-10"
                        label="休職中"
                        onClick={(e) => setStatus(e.target.checked ? 1 : status)}
                      />
                      <Form.Check
                        type="checkbox"
                        className="m-r-10"
                        label="退職済み"
                        onClick={(e) => setStatus(e.target.checked ? 2 : status)}
                      />
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
                        <i>
                          {item.employee_number}&nbsp;{item.department_name ? item.department_name : ''}
                        </i>
                        <br />
                        <Link href="#">
                          {item.name}
                          <i className="feather icon-info ms-1"></i>
                        </Link>
                      </Td>
                      <Td>{item.email}</Td>
                      <Td>
                        <span>
                          {item.paid_holidays} / {item.special_holidays}
                        </span>
                        <br />
                        <Badge bg={'danger'}>特休消化の異常</Badge>
                      </Td>
                      <Td>{item.grant_date}</Td>
                      <Td>{item.acquisition_rate}</Td>
                      <Td>
                        <span>{moment(item.hire_date).format('YYYY/MM/DD')}</span>
                        <br />
                        <span>{item.working_type_label}</span>
                        <br />
                        {item.status === 0 ? (
                          <Badge bg={'primary'}>{item.status_label}</Badge>
                        ) : item.status === 1 ? (
                          <Badge bg={'success'}>{item.status_label}</Badge>
                        ) : (
                          <Badge bg={'danger'}>{item.status_label}</Badge>
                        )}
                      </Td>
                      <Td>
                        <div>
                          <Button href={`/treat_single/${item.id}`} variant={'success'} className="text-capitalize" size="sm">
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
      <Modal show={show} onHide={handleClose} keyboard={false}>
        <Modal.Header>
          <Modal.Title>ファイルをアップロードしてください。</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={11} sm={11} style={{ margin: 'auto' }}>
              <input type="file" className="custom-file-input" id="inputFile" onChange={handleChange} />
              <label className="custom-file-label" htmlFor="inputFile" id="file_name">
                {filename ? filename : 'CSVファイルをアップロードしてください。'}
              </label>
              <hr />
            </Col>
            <Col md={11} sm={11} style={{ margin: 'auto' }}>
              <div className="m-t-30">
                <Link to={SampleCSV} target="_blank" download>
                  サンプルデータ
                </Link>
                に沿ってCSVファイルを作成してください。
              </div>
              <hr />
            </Col>
          </Row>
          <div className="text-end">
            <Button variant="primary" size="sm" onClick={handleCSVFile} disabled={csvUpload}>
              保存する
            </Button>
            <Button variant="secondary" size="sm" onClick={handleClose}>
              キャンセル
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default Employee;
