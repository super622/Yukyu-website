import React from 'react';
import { Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';

const AnnualEdit = () => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={8} className="center-card">
          <Card>
            <Card.Body>
              <Row>
                <Col sm={3} className="h5 mt-3">
                  自動付与
                </Col>
                <Col sm={9} className="mt-3">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Check type={'radio'} id={'radio1'} name="group1" className="m-r-10">
                      <Form.Check.Input type={'radio'} />
                      <Form.Check.Label>
                        <h5>
                          <Badge bg="success">有効</Badge>
                        </h5>
                      </Form.Check.Label>
                    </Form.Check>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Check type={'radio'} id={'radio2'} name="group1" className="m-r-10">
                      <Form.Check.Input type={'radio'} />
                      <Form.Check.Label>
                        <h5>
                          <Badge bg="danger">無効</Badge>
                        </h5>
                      </Form.Check.Label>
                    </Form.Check>
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3} className="h5 mt-3">
                  最小取得単位
                </Col>
                <Col sm={9} className="mt-3">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Check type={'radio'} id={'radio3'} name="group4" className="m-r-10">
                      <Form.Check.Input type={'radio'} />
                      <Form.Check.Label>
                        <span>入社日から算出した日</span>
                        <div className="hint">
                          各従業員ごとに入社日から経過した日数を算出して、それぞれ該当の継続日数を経過した時点で付与する方式です。
                        </div>
                      </Form.Check.Label>
                    </Form.Check>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Check type={'radio'} id={'radio4'} name="group4" className="m-r-10">
                      <Form.Check.Input type={'radio'} />
                      <Form.Check.Label>
                        <span>入社日に関わらず同一の日</span>
                        <div className="hint">毎年設定した基準日に一斉付与を行います。</div>
                      </Form.Check.Label>
                    </Form.Check>
                  </Form.Group>
                  <div id="schedule_form" style={{ display: 'none' }}>
                    <Form.Group>
                      <div className="d-flex align-items-center">
                        <div className="preset_life_bottom ms-1">基準日:</div>
                        <Form.Control type="number" value={2} style={{ width: '80px' }} />
                        <div className="preset_life_bottom ms-1">月</div>
                        <Form.Control type="number" value={0} style={{ width: '80px' }} />
                        <div className="preset_life_bottom ms-1">日</div>
                      </div>
                    </Form.Group>
                  </div>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={12}>
                  <div className="text-center">
                    <Button href="/settings" variant={'light'} className="text-capitalize">
                      キャンセル
                    </Button>
                    <Button variant={'primary'} className="text-capitalize">
                      更新する
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

export default AnnualEdit;
