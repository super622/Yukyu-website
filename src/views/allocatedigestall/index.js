import React, { useState } from 'react';
import { Button, Col, Row, Collapse, Card, Form, Tab, Tabs, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DatePicker } from 'rsuite';
import jaJp from 'rsuite/locales/ja_JP';
import 'rsuite/DatePicker/styles/index.css';

const AllocateDigestAll = () => {
  const [open, setOpen] = useState(false);
  const [showAnnualAlert, setShowAnnualAlert] = useState(false);
  const [showSpecialAlert, setShowSpecialAlert] = useState(false);

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
      <Row className="m-t-20">
        <Col sm={12} md={12}>
          <Tabs variant="pills" defaultActiveKey="given" className="mb-3">
            <Tab eventKey="given" title="休暇一斉付与をする">
              <Card>
                <Card.Body>
                  <Row>
                    <Col sm={3}>
                      <h5>休暇付与の詳細</h5>
                    </Col>
                    <Col sm={6}>
                      <div className="d-flex">
                        <Form.Check type={'radio'} id={'radio1'} name="group1" className="m-r-10" label={'有休'} />
                        <Form.Check type={'radio'} id={'radio2'} name="group1" className="m-r-10" label={'特休'} />
                      </div>
                    </Col>
                    <Col sm={3}>
                      <div className="text-end">
                        <div id="givenAnnualHelp">
                          <Button
                            className={'text-capitalize my-2 btn-light help-title'}
                            variant={'light'}
                            id="givenAnnualHelpTitle"
                            onClick={() => setShowAnnualAlert(!showAnnualAlert)}
                          >
                            <i className="feather icon-alert-circle"></i>
                            有休とは？
                          </Button>
                          <Alert show={showAnnualAlert} variant="success" className="text-start">
                            <p>
                              有休とは：
                              <br />
                              有給休暇のことであり、法律で定められている休暇です。
                              <br />
                              「消化義務チェック」や「年次有給休暇管理簿」などで計算されている休暇はこの休暇となります。
                              <br />
                              付与しなければならない休日数は法律で決まっており、その日数を超えての休日付与はできません。
                              <br />
                              法定日数を超える場合、特休として入力をしてください。詳しくは「
                              <Alert.Link href="#">有休について</Alert.Link>
                              」をご覧ください。
                            </p>
                          </Alert>
                        </div>
                        <div id="givenSpecialHelp" style={{ display: 'none' }}>
                          <Button
                            className={'text-capitalize my-2 btn-light help-title'}
                            variant={'light'}
                            id="givenSpecialHelpTitle"
                            onClick={() => setShowSpecialAlert(!showSpecialAlert)}
                          >
                            <i className="feather icon-alert-circle"></i>
                            有休とは？
                          </Button>
                          <Alert show={showSpecialAlert} variant="success" className="text-start">
                            <p>
                              有休とは：
                              <br />
                              有給休暇のことであり、法律で定められている休暇です。
                              <br />
                              「消化義務チェック」や「年次有給休暇管理簿」などで計算されている休暇はこの休暇となります。
                              <br />
                              付与しなければならない休日数は法律で決まっており、その日数を超えての休日付与はできません。
                              <br />
                              法定日数を超える場合、特休として入力をしてください。詳しくは「
                              <Alert.Link href="#">有休について</Alert.Link>
                              」をご覧ください。
                            </p>
                          </Alert>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  <div id="specialItemForm">
                    <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                      <Form.Label className="col-sm-3">部署名</Form.Label>
                      <div className="col-sm-9">
                        <Form.Select aria-label="Default select example">
                          <option></option>
                        </Form.Select>
                        <div className="text-end m-t-1 me-1">
                          <Link target="_blank">種別追加</Link>
                        </div>
                      </div>
                    </Form.Group>
                  </div>
                  <hr />
                  <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                    <Form.Label className="col-sm-3 required">付与日</Form.Label>
                    <div className="col-sm-9">
                      <DatePicker oneTap style={{ width: '100%' }} locale={jaJp} />
                    </div>
                  </Form.Group>
                  <hr />
                  <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                    <Form.Label className="col-sm-3 required">有効期限</Form.Label>
                    <div className="col-sm-9">
                      <Form.Control type="number" placeholder="" />
                    </div>
                  </Form.Group>
                  <hr />
                  <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                    <Form.Label className="col-sm-3 required">付与日数</Form.Label>
                    <div className="col-sm-9">
                      <Form.Control type="number" placeholder="" />
                    </div>
                  </Form.Group>
                  <hr />
                  <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                    <Form.Label className="col-sm-3 required">理由/備考</Form.Label>
                    <div className="col-sm-9">
                      <Form.Control as="textarea" rows={3} />
                    </div>
                  </Form.Group>
                  <hr />
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="used" title="休暇一斉消化をする">
              <Card>
                <Card.Body>
                  <Row>
                    <Col sm={3}>
                      <h5>休暇付与の詳細</h5>
                    </Col>
                    <Col sm={6}>
                      <div className="d-flex">
                        <Form.Check type={'radio'} id={'radio1'} name="group1" className="m-r-10" label={'有休'} />
                        <Form.Check type={'radio'} id={'radio2'} name="group1" className="m-r-10" label={'特休'} />
                      </div>
                    </Col>
                    <Col sm={3}>
                      <div className="text-end">
                        <div id="givenAnnualHelp">
                          <Button
                            className={'text-capitalize my-2 btn-light help-title'}
                            variant={'light'}
                            id="givenAnnualHelpTitle"
                            onClick={() => setShowAnnualAlert(!showAnnualAlert)}
                          >
                            <i className="feather icon-alert-circle"></i>
                            有休とは？
                          </Button>
                          <Alert show={showAnnualAlert} variant="success" className="text-start">
                            <p>
                              有休とは：
                              <br />
                              有給休暇のことであり、法律で定められている休暇です。
                              <br />
                              「消化義務チェック」や「年次有給休暇管理簿」などで計算されている休暇はこの休暇となります。
                              <br />
                              付与しなければならない休日数は法律で決まっており、その日数を超えての休日付与はできません。
                              <br />
                              法定日数を超える場合、特休として入力をしてください。詳しくは「
                              <Alert.Link href="#">有休について</Alert.Link>
                              」をご覧ください。
                            </p>
                          </Alert>
                        </div>
                        <div id="givenSpecialHelp" style={{ display: 'none' }}>
                          <Button
                            className={'text-capitalize my-2 btn-light help-title'}
                            variant={'light'}
                            id="givenSpecialHelpTitle"
                            onClick={() => setShowSpecialAlert(!showSpecialAlert)}
                          >
                            <i className="feather icon-alert-circle"></i>
                            有休とは？
                          </Button>
                          <Alert show={showSpecialAlert} variant="success" className="text-start">
                            <p>
                              有休とは：
                              <br />
                              有給休暇のことであり、法律で定められている休暇です。
                              <br />
                              「消化義務チェック」や「年次有給休暇管理簿」などで計算されている休暇はこの休暇となります。
                              <br />
                              付与しなければならない休日数は法律で決まっており、その日数を超えての休日付与はできません。
                              <br />
                              法定日数を超える場合、特休として入力をしてください。詳しくは「
                              <Alert.Link href="#">有休について</Alert.Link>
                              」をご覧ください。
                            </p>
                          </Alert>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  <div id="specialItemForm">
                    <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                      <Form.Label className="col-sm-3">部署名</Form.Label>
                      <div className="col-sm-9">
                        <Form.Select aria-label="Default select example">
                          <option></option>
                        </Form.Select>
                        <div className="text-end m-t-1 me-1">
                          <Link target="_blank">種別追加</Link>
                        </div>
                      </div>
                    </Form.Group>
                  </div>
                  <hr />
                  <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                    <Form.Label className="col-sm-3 required">取得日</Form.Label>
                    <div className="col-sm-9">
                      <Row>
                        <Col sm={12} md={5}>
                          <DatePicker oneTap style={{ width: '100%' }} locale={jaJp} />
                        </Col>
                        <Col sm={12} md={2}>
                          <div className="text-center d-flex" style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            ~
                          </div>
                        </Col>
                        <Col sm={12} md={5}>
                          <DatePicker oneTap style={{ width: '100%' }} locale={jaJp} />
                        </Col>
                      </Row>
                    </div>
                  </Form.Group>
                  <hr />
                  <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                    <Form.Label className="col-sm-3 required">休暇種類</Form.Label>
                    <div className="col-sm-9">
                      <Form.Select aria-label="Default select example">
                        <option></option>
                      </Form.Select>
                    </div>
                  </Form.Group>
                  <hr />
                  <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                    <Form.Label className="col-sm-3 required">理由/備考</Form.Label>
                    <div className="col-sm-9">
                      <Form.Control as="textarea" rows={3} />
                    </div>
                  </Form.Group>
                  <hr />
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Body>
              <Row>
                <Col sm={12} md={6}>
                  <h5 className="required">対象者</h5>
                </Col>
              </Row>
              <hr />
              <div id="specialItemForm">
                <Form.Group className="mb-3 form-item row" controlId="exampleForm.ControlInput1">
                  <Form.Label className="col-sm-3">付与種別</Form.Label>
                  <div className="col-sm-9">
                    <Form.Select aria-label="Default select example">
                      <option>定期付与（6ヶ月）</option>
                      <option>定期付与（1年6ヶ月）</option>
                      <option>定期付与（2年6ヶ月）</option>
                      <option>定期付与（3年6ヶ月）</option>
                      <option>定期付与（4年6ヶ月）</option>
                      <option>定期付与（5年6ヶ月）</option>
                      <option>定期付与（6年6ヶ月以降）</option>
                    </Form.Select>
                  </div>
                </Form.Group>
              </div>
              <hr />
              <Row>
                <Col sm={12}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Check type={'checkbox'} id={'checkbox'} name="group1" className="m-r-10" label={'在職中の全従業員'} />
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={6} md={4} xl={3}>
                  <Form.Group className="user-check-item" controlId="exampleForm.ControlInput1">
                    <Form.Check type={'checkbox'} id={'checkbox'} name="group1" className="m-r-10" label={'出水 亜須加'} />
                    <div className="joining-date-style">入社日:2023/11/01</div>
                  </Form.Group>
                </Col>
                <Col sm={6} md={4} xl={3}>
                  <Form.Group className="user-check-item" controlId="exampleForm.ControlInput1">
                    <Form.Check type={'checkbox'} id={'checkbox'} name="group1" className="m-r-10" label={'辻本 尚子'} />
                    <div className="joining-date-style">入社日:2023/11/01</div>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="m-t-20">
                <div className="text-center">
                  <Button variant={'success'} className="text-capitalize">
                    <i className="feather icon-check"></i>
                    一斉付与を実行
                  </Button>
                  <Button variant={'warning'} className="text-capitalize d-none">
                    <i className="feather icon-check"></i>
                    一斉付与を実行
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

export default AllocateDigestAll;
