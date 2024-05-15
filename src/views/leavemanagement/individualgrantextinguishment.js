import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import { Row, Col, Card, Button, Form, Badge, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const flag = true;

const IndividualGrantExtinguishment = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    var options = {
      chart: {
        type: 'area'
      },
      stroke: {
        curve: 'stepline',
      },
      series: [
        {
          name: 'sales',
          data: [{
            x: 2023,
            y: 7,
          },
          {
            x: 2024,
            y: 7,
          },
          {
            x: 2024,
            y: 6,
          },
          {
            x: 2024,
            y: 5,
          },
          {
            x: 2024,
            y: 6,
          },
          {
            x: 2024,
            y: 6,
          }]
        },
        {
            name: 'sales',
            data: [{
              x: 2023,
              y: 0,
            },
            {
              x: 2023,
              y: 0,
            },
            {
              x: 2023,
              y: 0,
            },
            {
              x: 2024,
              y: 7,
            },
            {
              x: 2024,
              y: 7,
            },
            {
              x: 2024,
              y: 6,
            }]
          }
      ],
      xaxis: {
        type: 'year',
        categories: [2023, 2024]
      },
      yaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      }
    };
    var chart = new ApexCharts(document.querySelector('#chart'), options);
    chart.render();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col lg={4} xl={4}>
          <Row className="mb-2">
            <Col className="gap-2 mt-2 pe-1 col-6">
              <Button href="#" variant={'outline-dark'} className="text-truncate m-0 w-100">
                <i className="feather icon-chevron-left position-relative pe-1" style={{ top: '4px', float: 'left' }}></i>
                辻本 尚子
              </Button>
            </Col>
            <Col className="gap-2 mt-2 ps-1 col-6">
              <Button href="#" variant={'outline-primary'} className="text-truncate m-0 w-100">
                <i className="feather icon-chevron-right position-relative" style={{ top: '4px', float: 'right', marginLeft: '12px', marginRight: '0px' }}></i>
                辻本 尚子
              </Button>
            </Col>
          </Row>
          <Card>
            <Card.Body>
              <Form.Select>
                <option>部署名</option>
                <option>部署名</option>
                <option>部署名</option>
              </Form.Select>
              <Row className="mt-2">
                <Col sm={12} className="d-flex justify-content-end">
                  <Form.Check type={'checkbox'} id={'checkbox'} name="group1" className="m-r-10" label={'退職者を表示する'} />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={12}>
                  <Form.Control type="input" placeholder="氏名 / 社員番号" />
                </Col>
              </Row>
              <div className="mt-2">
                <div className="user-list">
                  <Link to="#">
                    <div className="user-list-row select-user-row active">
                      <div className="person-name">辻本 尚子</div>
                    </div>
                  </Link>
                  <Link to="#">
                    <div className="user-list-row select-user-row">
                      <div className="person-name">出水 亜須加</div>
                    </div>
                  </Link>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8} xl={8}>
          <Card>
            <Card.Body className="border-bottom">
              <Row className="d-flex align-items-center">
                <Col md={'auto'}>
                  <i className="feather icon-user f-40 text-green-300"></i>
                </Col>
                <Col>
                  <Row className="d-flex align-items-center">
                    <Col sm={12}>
                      <span></span>
                      <span className="float-right text-muted ms-2">社員番号：-</span>
                    </Col>
                  </Row>
                  <div className="d-flex flex-wrap f-w-300 align-items-end">
                    <Link to="#">
                      <div className="d-flex">
                        <div className="user-detail-name">出水 亜須加</div>
                        <i className="feather icon-info mt-2 ms-2"></i>
                      </div>
                    </Link>
                  </div>
                  <div className="user-detail-kana"></div>
                  <span className="d-block">
                    <Badge bg={'primary'}>在職中</Badge>
                  </span>
                </Col>
              </Row>
            </Card.Body>
            <Card.Body>
              <Row className="d-flex align-items-center">
                <Col sm={12} className="py-1">
                  <span>勤務形態: パート(週4日)</span>
                  <span className="float-right text-muted"></span>
                </Col>
                <Col sm={12} className="py-1">
                  <span>入社日: 2022/09/01</span>
                  <span className="float-right text-muted"></span>
                </Col>
                <Col sm={12} className="py-1 d-flex flex-wrap">
                  <div className="text-nowrap me-4">
                    <span>残り有休: 14日</span>
                    <span className="float-right text-danger pl-3"></span>
                  </div>
                  <div>
                    <span>
                      <Link to={'#'}>
                        <i className="feather icon-bar-chart"></i>
                        &nbsp;有休残日数グラフ
                      </Link>
                    </span>
                  </div>
                </Col>
                <Col sm={12} className="py-1">
                  <span>残り特休: 0日</span>
                  <span className="float-right text-danger ps-3"></span>
                </Col>
                <Col sm={12} className="py-1">
                  <span>有休付与予定日: 2025/03/01</span>
                </Col>
                <Col sm={12} className="py-1">
                  <span>有休消滅予定日: 2025/02/28 に 6日が消滅予定です。</span>
                </Col>
                <Col sm={12} className="py-1">
                  <span>有休取得率: 12 %</span>
                </Col>
                <Col sm={12} className="py-1">
                  <span>時間単位の有休取得合計(今回分): 0 時間 ※半日(4時間)も含まれています</span>
                </Col>
              </Row>
            </Card.Body>
            <hr />
            <Card.Body className="operation-button-row">
              <Button href="#" variant={'success'}>
                休暇付与
              </Button>
              <Button href="#" variant={'warning'}>
                休暇消化
              </Button>
              <Button href="#" variant={'outline-danger'}>
                欠勤登録
              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <span>休暇・欠勤履歴</span>
              <div className="history-media-menu">
                <Button variant={'outline-dark'} size={'sm'}>
                  CSV
                </Button>
                <Button variant={'outline-danger'} size={'sm'}>
                  PDF
                </Button>
              </div>
              <div className="history-mobile-menu">
                <Link to="#" className="text-muted" id="mobile-collapse" onClick={() => setOpen(!open)}>
                  <i className="feather icon-menu"></i>
                </Link>
              </div>
              <Collapse in={open} className="mt-2">
                <Card>
                  <Card.Body>
                    <div className="border-bottom p-2 media-menu-content">
                      <Link to={'#'} className="text-muted">
                        PDF出力
                      </Link>
                    </div>
                    <div className="p-2 text-muted media-menu-content">
                      <Link to={'#'} className="text-muted">
                        CSV出力
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Collapse>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-end">
                <Form.Check type={'checkbox'} id={'checkbox1'} name="group1" className="m-r-10" label={'有休'} />
                <Form.Check type={'checkbox'} id={'checkbox2'} name="group1" className="m-r-10" label={'特休'} />
                <Form.Check type={'checkbox'} id={'checkbox3'} name="group1" className="m-r-10" label={'欠勤'} />
              </div>
              <div>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>種類</Th>
                      <Th>日付/曜日</Th>
                      <Th>日数</Th>
                      <Th>理由/備考</Th>
                      <Th>操作</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>
                        <Badge pill bg={'warning'}>
                          消化
                        </Badge>
                      </Td>
                      <Td>2024/04/04 (木)</Td>
                      <Td>1日</Td>
                      <Td>
                        有効期限:2026/02/28
                        <br />
                        【パート週4】
                        <br />
                        自動付与による付与です。
                      </Td>
                      <Td>
                        <div>
                          <Button href="/department/123" variant={'warning'} className="text-capitalize" size="sm">
                            編集
                          </Button>
                        </div>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </div>
              <div className="mt-2"></div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <h5>有休残日数グラフ</h5>
            </Card.Header>
            <Card.Body>
              {flag ? (
                <div id="chart"></div>
              ) : (
                <h6 className="p-10" style={{ color: '#888' }}>
                  対象のデータがありません
                </h6>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default IndividualGrantExtinguishment;
