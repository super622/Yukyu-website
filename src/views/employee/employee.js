import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Button, Col, Row, Alert, Collapse, Card, Form, Dropdown, DropdownButton, ButtonGroup, Badge } from 'react-bootstrap';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Employee = () => {
  const [open, setOpen] = useState(false);

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
                      <Form.Control type="input" placeholder="" />
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={3}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>所属部署</Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option></option>
                        <option value="1">部署名1</option>
                        <option value="2">部署名2</option>
                        <option value="3">部署名3</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={2}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>社員番号</Form.Label>
                      <Form.Control type="input" placeholder="" />
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={3}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>勤務形態</Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option></option>
                        <option value="fulltime">正社員</option>
                        <option value="parttime_5">パート(週5日)</option>
                        <option value="parttime_4">パート(週4日)</option>
                        <option value="parttime_3">パート(週3日)</option>
                        <option value="parttime_2">パート(週2日)</option>
                        <option value="parttime_1">パート(週1日)</option>
                        <option value="irregular">パート(不定期)</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <div className="d-flex">
                      <Form.Check type="checkbox" className="m-r-10" id="custom-check1" label="在職中" />
                      <Form.Check type="checkbox" className="m-r-10" id="custom-check2" label="休職中" />
                      <Form.Check type="checkbox" className="m-r-10" id="custom-check3" label="退職済み" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <Button variant={'primary'} size="sm" className="text-capitalize">
                      <i className="feather icon-search" />
                      検索する
                    </Button>
                    <Button variant={'dark'} size="sm" className="text-capitalize">
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
                  <Tr>
                    <Td>
                      <Link href="#">
                        辻本 尚子
                        <i className="feather icon-info-circle ms-1"></i>
                      </Link>
                    </Td>
                    <Td>demizu@kouyou-p.co.jp</Td>
                    <Td>10日 / 0日</Td>
                    <Td>2025/03/01</Td>
                    <Td>12 %</Td>
                    <Td>
                      <span>2022/09/01</span>
                      <br />
                      <span>パート(週4日)</span>
                      <br />
                      <Badge bg={'primary'} className={'mx-2'}>
                        在職中
                      </Badge>
                    </Td>
                    <Td>
                      <div>
                        <Button variant={'success'} className="text-capitalize" size="sm">
                          休暇管理
                        </Button>
                        <Button variant={'primary'} className="text-capitalize" size="sm">
                          残り有休日数を設定
                        </Button>
                      </div>
                    </Td>
                  </Tr>
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
