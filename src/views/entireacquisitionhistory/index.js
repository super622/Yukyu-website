import React, { useState } from 'react';
import { Button, Col, Row, Collapse, Card, Form } from 'react-bootstrap';
import 'rsuite/DatePicker/styles/index.css';

const EntireAcquisitionHistory = () => {
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
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Collapse in={open}>
            <Card>
              <Card.Body>
                <Row>
                  <Col sm={12} md={6}>
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
                  <Col sm={12} md={6}>
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
                    <div className="text-center">
                      <Button variant={'dark'} size="sm" className="text-capitalize">
                        クリア
                      </Button>
                      <Button variant={'primary'} size="sm" className="text-capitalize">
                        <i className="feather icon-search" />
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
              <Row>
                <Col sm={12} md={6}>
                  <h5 className="mb-3">対象期間選択</h5>
                </Col>
              </Row>
              <Row>
                <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                  <Form.Label className="col-sm-2">開始年</Form.Label>
                  <div className="col-sm-3">
                    <Form.Select aria-label="Default select example">
                      <option>2024年</option>
                      <option>2025年</option>
                      <option>2026年</option>
                    </Form.Select>
                  </div>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                  <Form.Label className="col-sm-2">開始月</Form.Label>
                  <div className="col-sm-3">
                    <Form.Select aria-label="Default select example">
                      <option>1月</option>
                      <option>2月</option>
                      <option>3月</option>
                      <option>4月</option>
                      <option>5月</option>
                      <option>6月</option>
                      <option>7月</option>
                      <option>8月</option>
                      <option>9月</option>
                      <option>10月</option>
                      <option>11月</option>
                      <option>12月</option>
                    </Form.Select>
                  </div>
                </Form.Group>
              </Row>
              <p className="text-info">選択した開始年月から1年間の有休取得履歴を表示します。</p>
              <hr />
              <Row>
                <Col sm={12} md={6}>
                  <h5 className="mb-3 required">対象者</h5>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Check type={'checkbox'} id={'checkbox'} name="group1" className="m-r-10" label={'在職中の全従業員'} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={6} md={4} xl={3}>
                  <Form.Group className="user-check-item" controlId="exampleForm.ControlInput1">
                    <Form.Check type={'checkbox'} id={'checkbox'} name="group1" className="m-r-10" label={'出水 亜須加'} />
                  </Form.Group>
                </Col>
                <Col sm={6} md={4} xl={3}>
                  <Form.Group className="user-check-item" controlId="exampleForm.ControlInput1">
                    <Form.Check type={'checkbox'} id={'checkbox'} name="group1" className="m-r-10" label={'辻本 尚子'} />
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <Row className="m-t-20">
                <div className="text-center">
                  <Button variant={'success'} className="text-capitalize">
                    <i className="feather icon-check"></i>
                    全体取得履歴を発行
                  </Button>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EntireAcquisitionHistory;
