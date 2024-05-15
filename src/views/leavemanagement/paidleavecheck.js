import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Badge, Button, Card, Col, Row, Collapse, Form } from 'react-bootstrap';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const PaidLeaveCheck = () => {
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
                  <Col sm={3} md={3}>
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
                  <Col sm={3} md={3}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>氏名</Form.Label>
                      <Form.Control type="input" placeholder="" />
                    </Form.Group>
                  </Col>
                  <Col sm={2} md={2}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>社員番号</Form.Label>
                      <Form.Control type="input" placeholder="" />
                    </Form.Group>
                  </Col>
                  <Col sm={2} md={2}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>消化済日</Form.Label>
                      <Form.Control type="number" value={'0'} />
                    </Form.Group>
                  </Col>
                  <Col sm={2} md={2}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>ステータス</Form.Label>
                      <div className="d-flex">
                        <Form.Check type="checkbox" className="m-r-10" id="custom-check1" label="注意・警告" />
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
                <Button variant={'info'} size={'sm'} id="js-notice-btn" disabled>
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
                        <Form.Check type={'checkbox'} id={'checkbox'} name="group1" className="m-r-10" label={''} />
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
                    <Tr>
                      <Td>
                        <Form.Check type={'checkbox'} id={'checkbox'} name="group1" className="m-r-10" label={''} />
                      </Td>
                      <Td>辻本 尚子</Td>
                      <Td></Td>
                      <Td>2024/05/01</Td>
                      <Td>5日</Td>
                      <Td>2025/04/30</Td>
                      <Td>8日</Td>
                      <Td>
                        <Badge bg={'success'}>消化済</Badge>
                      </Td>
                      <Td>基準日がありません</Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Badge bg={'dark'}>メール未登録</Badge>
                      </Td>
                      <Td>辻本 尚子</Td>
                      <Td></Td>
                      <Td>2024/05/01</Td>
                      <Td>5日</Td>
                      <Td>2025/04/30</Td>
                      <Td>8日</Td>
                      <Td>
                        <Badge bg={'success'}>消化済</Badge>
                      </Td>
                      <Td>基準日がありません</Td>
                    </Tr>
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
