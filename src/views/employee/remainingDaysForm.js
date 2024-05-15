import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import Img from '../../assets/images/description_remaining_days.png';

const RemainingDaysForm = () => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <p className="text-center">
            有給休暇の残り日数を有休ノートに引継げます。
            <br />
            <img src={Img} alt="remainingdays" className="m-3" width={'80%'} />
            <br />
            (例) 2023年4月1日時点での残り有休日数が8日の場合は、設定日に「2023/04/01」 残日数に「8」と入力してください
          </p>
        </Col>
      </Row>
      <Row className="m-t-20">
        <Col sm={8} className="center-card">
          <Card>
            <Card.Header>
              <h5>辻本 尚子</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3 required">設定日</Form.Label>
                <div className="col-md-9">
                  <Form.Control type="input" placeholder="" />
                </div>
              </Form.Group>
              <hr />
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3 required">残日数</Form.Label>
                <div className="col-md-9">
                  <div className="d-flex align-items-center">
                    <Form.Control type="number" value={0} style={{ width: '80px' }} />
                    <div className="ms-1">日</div>
                  </div>
                </div>
              </Form.Group>
              <hr />
              <Row>
                <Col sm={12}>
                  <div className="text-center">
                    <Button href="/employee" variant={'light'} className="text-capitalize">
                      戻る
                    </Button>
                    <Button variant={'primary'} className="text-capitalize">
                      調整する
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

export default RemainingDaysForm;
