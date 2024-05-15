import React from 'react';
import { Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';

const CreateSpecialHoliday = () => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={8} className="center-card">
          <Card>
            <Card.Body>
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3 required">名前</Form.Label>
                <div className="col-md-9">
                  <Form.Control type="input" placeholder="誕生日休暇" />
                </div>
              </Form.Group>
              <hr />
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3">優先度</Form.Label>
                <div className="col-md-9">
                  <Form.Control type="number" style={{ maxWidth: '150px' }} />
                  <div className="hint">優先度の数値が高い部署が先に表示されます</div>
                </div>
              </Form.Group>
              <hr />
              <Row>
                <Col sm={3} className="h5 mt-3">
                  ステータス
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
                  <div className="hint">有効になっているもののみが休暇登録画面や申請フォームに表示されます。</div>
                </Col>
              </Row>
              <hr />
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3">消化超過のお知らせ</Form.Label>
                <div className="col-md-9">
                  <Form.Check type={'radio'} id={'radio3'} name="group4" className="m-r-10" label={'表示しない'} />
                  <div className="hint">消化の記録だけ残したい特休や、付与と消化の順序が逆でも良い特休の場合チェックを入れます。</div>
                </div>
              </Form.Group>
              <hr />
              <Row>
                <Col sm={3} className="h5 mt-3">
                  最小取得単位
                </Col>
                <Col sm={9} className="mt-3">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <div className="d-flex align-items-center">
                      <Form.Control type="number" value={0} style={{ width: '80px' }} />
                      <div className="preset_life_bottom ms-1">年</div>
                      <Form.Control type="number" value={0} style={{ width: '80px' }} />
                      <div className="preset_life_bottom ms-1">ヶ月</div>
                      <Form.Control type="number" value={0} style={{ width: '80px' }} />
                      <div className="preset_life_bottom ms-1">日</div>
                    </div>
                  </Form.Group>
                  <div className="hint">
                    特休付与を行うときに有効期限の自動入力に利用されます。
                    <br />
                    「0年0ヶ月0日」とした場合は、有休設定の有効期限が自動入力されます。
                  </div>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={12}>
                  <div className="text-center">
                    <Button href="/special_items" variant={'light'} className="text-capitalize">
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

export default CreateSpecialHoliday;
