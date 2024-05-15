import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

const RuleEdit = () => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={8} className="center-card">
          <Card>
            <Card.Body>
              <Row>
                <Col sm={3} className="h5 mt-3">
                  取得順序
                </Col>
                <Col sm={9} className="mt-3">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Check type={'radio'} id={'radio1'} name="group1" className="m-r-10" label={'付与日の古い有休から消化'} />
                    <Form.Check type={'radio'} id={'radio2'} name="group1" className="m-r-10" label={'付与日の新しい有休から消化'} />
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
                    <Form.Check type={'radio'} id={'radio1'} name="group2" className="m-r-10" label={'1日'} />
                    <Form.Check type={'radio'} id={'radio2'} name="group2" className="m-r-10" label={'半日'} />
                    <Form.Check type={'radio'} id={'radio2'} name="group2" className="m-r-10" label={'1時間'} />
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3} className="h5 mt-3">
                  所定労働時間
                </Col>
                <Col sm={9} className="mt-3">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Check type={'radio'} id={'radio1'} name="group3" className="m-r-10" label={'8時間'} />
                    <Form.Check type={'radio'} id={'radio2'} name="group3" className="m-r-10" label={'従業員ごとに設定する'} />
                  </Form.Group>
                  <div className="hint">時間単位の休暇は所定労働時間を元に1日分の休暇に換算されます。</div>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3} className="h5 mt-3">
                  有効期限
                </Col>
                <Col sm={9} className="mt-3">
                  <div className="d-flex align-items-center">
                    <Form.Control type="number" value={2} style={{ width: '80px' }} />
                    <div className="preset_life_bottom ms-1">年</div>
                    <Form.Control type="number" value={0} style={{ width: '80px' }} />
                    <div className="preset_life_bottom ms-1">ヶ月</div>
                  </div>
                  <div className="hint">有効期限は付与日より、2年後以降の日付を指定してください。</div>
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

export default RuleEdit;
