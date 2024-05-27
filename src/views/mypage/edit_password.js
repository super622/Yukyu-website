import React from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';

const EditPassword = () => {
  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card>
            <Card.Body>
              <div className="container"></div>
              <Row>
                <Form.Label className="col-md-3 col-form-label required">新しいパスワード</Form.Label>
                <div className="col-md-8">
                  <Form.Control type="text" placeholder="" />
                </div>
              </Row>
              <hr />
              <Row>
                <Form.Label className="col-md-3 col-form-label required">新しいパスワード (確認) </Form.Label>
                <div className="col-md-8">
                  <Form.Control type="text" placeholder="" />
                </div>
              </Row>
              <hr />
              <Row>
                <Form.Label className="col-md-3 col-form-label required">現在のパスワード</Form.Label>
                <div className="col-md-8">
                  <Form.Control type="text" placeholder="" />
                </div>
              </Row>
              <hr />
              <div className="text-center">
                <Button href="/mypage" variant={'outline-dark'}>
                  キャンセル
                </Button>
                <Button href="#" variant={'primary'}>
                  更新する
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EditPassword;
