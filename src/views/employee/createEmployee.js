import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import moment from 'moment/moment';
import { DatePicker } from 'rsuite';
import { yukAPI, auth_token, goRedirect } from '../../utils/api';
import jaJp from 'rsuite/locales/ja_JP';
import 'rsuite/DatePicker/styles/index.css';

const CreateEmployee = () => {
  const [showMsg, setShowMsg] = useState('');
  const [name, setName] = useState('');
  const [kana, setKana] = useState('');
  const [hireDate, setHireDate] = useState(moment(new Date()).format('YYYY-MM-DD hh:mm:ss'));
  const [status, setStatus] = useState(0);
  const [employeeNum, setEmployeeNum] = useState('');
  const [workingStyle, setWorkingStyle] = useState(1);
  const [workingHours, setWorkingHours] = useState(7);
  const [department, setDepartment] = useState(0);
  const [note, setNote] = useState('');
  const [email, setEmail] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartment();
  }, []);

  const getDepartment = async () => {
    await yukAPI('department_list', {}, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          console.log(res.data);
          setDepartments(res.data.data);
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
      'create_employee',
      {
        name: name,
        kana_name: kana,
        hire_date: hireDate !== '' ? moment(hireDate).format('YYYY-MM-DD hh:mm:ss') : hireDate,
        status: status,
        employee_number: employeeNum,
        working_type: workingStyle,
        working_hours: workingHours,
        department: department,
        note: note,
        email: email
      },
      'post',
      auth_token
    )
      .then((res) => {
        if (res.data.status === 'success') {
          console.log(res.data);
          goRedirect('/employee');
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
                  <Form.Control type="input" placeholder="有休太郎" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </Form.Group>
              <hr />
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3">名前（カナ）</Form.Label>
                <div className="col-md-9">
                  <Form.Control type="input" placeholder="ユウキュウタロウ" value={kana} onChange={(e) => setKana(e.target.value)} />
                </div>
              </Form.Group>
              <hr />
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3 required">入社日</Form.Label>
                <div className="col-md-9">
                  <DatePicker
                    oneTap
                    style={{ maxWidth: '200px' }}
                    locale={jaJp}
                    defaultValue={new Date()}
                    onChange={(e) => setHireDate(e ? e : '')}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3 row" controlId="exampleForm.ControlInput1">
                <div className="col-md-9 offset-md-3">
                  <Form.Check
                    type={'checkbox'}
                    id={'checkbox'}
                    name="group1"
                    className="m-r-10"
                    label={'休職中'}
                    onClick={(e) => setStatus(e.target.checked ? 1 : 0)}
                  />
                  <div className="hint">休職中に設定することでシステムによる有休の自動付与を停止することができます。</div>
                </div>
              </Form.Group>
              <hr />
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3">社員番号</Form.Label>
                <div className="col-md-9">
                  <Form.Control
                    type="input"
                    placeholder=""
                    style={{ maxWidth: '200px' }}
                    value={employeeNum}
                    onChange={(e) => setEmployeeNum(e.target.value)}
                  />
                </div>
              </Form.Group>
              <hr />
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3">勤務形態</Form.Label>
                <div className="col-md-9">
                  <Form.Select
                    aria-label="Default select example"
                    style={{ maxWidth: '250px' }}
                    onChange={(e) => setWorkingStyle(e.target.value)}
                  >
                    <option value="1">正社員</option>
                    <option value="2">パート(週5日)</option>
                    <option value="3">パート(週4日)</option>
                    <option value="4">パート(週3日)</option>
                    <option value="5">パート(週2日)</option>
                    <option value="6">パート(週1日)</option>
                    <option value="7">パート(不定期)</option>
                  </Form.Select>
                  <div className="hint">
                    週所定労働時間が30時間以上の場合は、労働日数に関係なく「正社員」・「パート(週5日)」と同じ形態になるためどちらかを選択してください。
                    <br />
                    勤務日数を計算してから有休を手動で付与したい場合は、「パート(不定期)」を選択してください。
                  </div>
                </div>
              </Form.Group>
              <hr />
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3">所定労働時間</Form.Label>
                <div className="col-md-9">
                  <Form.Select
                    aria-label="Default select example"
                    style={{ maxWidth: '250px' }}
                    onChange={(e) => setWorkingHours(e.target.value)}
                  >
                    <option value="7">7時間</option>
                    <option value="6">6時間</option>
                    <option value="5">5時間</option>
                    <option value="4">4時間</option>
                    <option value="3">3時間</option>
                    <option value="2">2時間</option>
                    <option value="1">1時間</option>
                  </Form.Select>
                  <div className="hint">
                    時間単位で休暇を消化した場合、1日分に対応する休暇時間は所定労働時間に応じて計算されます。
                    <br />
                    例えば、所定労働時間が6時間の場合、4時間の休暇と2時間の休暇を取得すると1日分の休暇となります。
                  </div>
                </div>
              </Form.Group>
              <hr />
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3">所属部署</Form.Label>
                <div className="col-md-9">
                  <Form.Select aria-label="Default select example" onChange={(e) => setDepartment(e.target.value)}>
                    <option value="0"></option>
                    {departments.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>
              <hr />
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3">メモ</Form.Label>
                <div className="col-md-9">
                  <Form.Control as="textarea" rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
                  <div className="hint">退職日など、その他管理に必要な情報を自由に保存することができます。</div>
                </div>
              </Form.Group>
              <hr />
              <Row className="border border-info p-3">
                <Col sm={12} md={12}>
                  <p className="text-info">
                    従業員情報にメールアドレスを登録すると従業員自身でメールアドレスを使ってログインできるようになります。
                    <br />
                    従業員に休暇を確認・申請させる場合はメールアドレスを追加してください。
                  </p>
                </Col>
                <Col sm={12} md={12}>
                  <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                    <Form.Label className="col-md-3">メールアドレス</Form.Label>
                    <div className="col-md-9">
                      <Form.Control
                        type="email"
                        placeholder="taro@yukyu-note.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <Row>
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

export default CreateEmployee;
