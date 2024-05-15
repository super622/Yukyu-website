import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const EditDepartment = () => {
  let params = useParams();
  console.log(params);

  return (
    <React.Fragment>
      <Row>
        <Col sm={8} className="center-card">
          <Card>
            <Card.Body>
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3 required">部署名</Form.Label>
                <div className="col-md-9">
                  <Form.Control type="input" placeholder="開発部" value={'部署名321'} />
                </div>
              </Form.Group>
              <hr />
              <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                <Form.Label className="col-md-3">優先度</Form.Label>
                <div className="col-md-9">
                  <Form.Control type="number" style={{ maxWidth: '150px' }} value={5} />
                  <div className="hint">優先度の数値が高い部署が先に表示されます</div>
                </div>
              </Form.Group>
              <hr />
              <Row>
                <Col sm={12}>
                  <div className="text-center">
                    <Button href="/department" variant={'light'} className="text-capitalize">
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

export default EditDepartment;
