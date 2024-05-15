import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Badge, Button, Card, Col, Row, Collapse, Form } from 'react-bootstrap';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const ApprovalOfLeaveRequest = () => {
  const [open, setOpen] = useState(false);

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
                  <Col sm={12} md={4}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>部署名</Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option></option>
                        <option value="1">部署名1</option>
                        <option value="2">部署名2</option>
                        <option value="3">部署名3</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={4}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>従業員名</Form.Label>
                      <Form.Control type="input" placeholder="" />
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={3}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>ステータス</Form.Label>
                      <div className="d-flex">
                        <Form.Check type="checkbox" className="m-r-10" id="custom-check1" label="在職中" />
                        <Form.Check type="checkbox" className="m-r-10" id="custom-check2" label="休職中" />
                        <Form.Check type="checkbox" className="m-r-10" id="custom-check3" label="退職済み" />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <div className="text-center">
                      <Button variant={'dark'} size="sm" className="text-capitalize">
                        クリア
                      </Button>
                      <Button variant={'primary'} size="sm" className="text-capitalize">
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
      <Row className="m-t-10">
        <Col sm={12} md={12}>
          <Card>
            <Card.Body>
              <Table>
                <Thead>
                  <Tr>
                    <Th>名前</Th>
                    <Th>取得希望日</Th>
                    <Th>休暇種類</Th>
                    <Th>理由/備考</Th>
                    <Th>申請提出日時</Th>
                    <Th>ステータス</Th>
                    <Th>操作</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>出水 亜須加</Td>
                    <Td>
                      2024/04/02
                      <br />
                      <span> (火)</span>から、
                      <br />
                      2024/04/19
                      <br />
                      <span> (金)</span>まで
                    </Td>
                    <Td>
                      <Badge bg={'warning'} className="text-capitalize">
                        有休
                      </Badge>
                      &nbsp;/ 全休
                    </Td>
                    <Td></Td>
                    <Td>2024/04/02 15:33</Td>
                    <Td>
                      <Badge bg={'success'} className="text-capitalize">
                        承認済み
                      </Badge>
                    </Td>
                    <Td>
                      <div>
                        <Button href="/used_day_requests/show/123" variant={'warning'} className="text-capitalize" size="sm">
                          詳細
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

export default ApprovalOfLeaveRequest;
