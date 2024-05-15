import React from 'react';
import { Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import CalendarContainer from './CalendarContainer';

const flag = true;

const DashDefault = () => {
  return (
    <React.Fragment>
      <Row>
        <Col lg={3} xl={4}>
          <Card>
            <Card.Body>
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="feather icon-users f-30 text-c-purple" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">2</h3>
                  <span className="d-block text-uppercase">従業員</span>
                </div>
              </div>
              <div className="m-b-20 m-t-20">従業員を登録できます。</div>
              <div className="text-end">
                <Button href="/employee" variant={'outline-primary'} style={{ color: 'inherit' }} className="text-capitalize">
                  一覧
                </Button>
                <Button href="/employee/create" variant={'primary'} className="text-capitalize">
                  追加
                </Button>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="feather icon-home f-30 text-c-blue" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">0</h3>
                  <span className="d-block text-uppercase">部署数</span>
                </div>
              </div>
              <div className="m-b-20 m-t-20">部署を登録しておくと従業員を管理しやすくなります。</div>
              <div className="text-end">
                <Button href="/department" variant={'outline-primary'} style={{ color: 'inherit' }} className="text-capitalize">
                  一覧
                </Button>
                <Button href="/department/create" variant={'primary'} className="text-capitalize">
                  追加
                </Button>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="feather icon-layers f-30 text-c-green" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">6 %</h3>
                  <span className="d-block text-uppercase">全体有休取得率（平均）</span>
                </div>
              </div>
              <div className="m-b-20 m-t-20">
                従業員の有休を手動で管理することができます。
                <br />
                システムが実施する付与や消化で足りている場合は操作不要です。
              </div>
              <div className="text-end">
                <Button href="/treat_single" variant={'primary'} className="text-capitalize">
                  有休付与・消化
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9} xl={8}>
          <Card>
            <Card.Body>
              <h5>休暇取得カレンダー</h5>
              <CalendarContainer />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} xxl={12}>
          <Card>
            <Card.Header>
              <h5>部署別有休取得率（平均）</h5>
            </Card.Header>
            <Card.Body>
              {flag ? (
                <Table>
                  <Thead>
                    <Tr>
                      <Th>部署名</Th>
                      <Th>人数</Th>
                      <Th>有休取得率（平均）</Th>
                      <Th>操作</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>部署名</Td>
                      <Td>0</Td>
                      <Td>-- %</Td>
                      <Td>
                        <Link to="/employee">従業員を表示</Link>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              ) : (
                <div className="m-b-20">部署を登録すると部署毎の有休取得率を表示できるようになります。</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} xxl={8}>
          <Card>
            <Card.Header>
              <h5>現在の設定</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6} xxl={6} className="border-end m-b-30">
                  <h6>有休取得ルール</h6>
                  <Row className="m-b-2">
                    <Col className="col-4">取得順序</Col>
                    <Col className="col-8">: 付与日の古い有休から消化</Col>
                  </Row>
                  <Row className="m-b-2">
                    <Col className="col-4">最小取得単位</Col>
                    <Col className="col-8">: 1時間</Col>
                  </Row>
                  <Row className="m-b-2">
                    <Col className="col-4">所定労働時間</Col>
                    <Col className="col-8">: 8時間</Col>
                  </Row>
                  <Row className="m-b-2">
                    <Col className="col-4">有効期限</Col>
                    <Col className="col-8">: 2年 0ヶ月</Col>
                  </Row>
                </Col>
                <Col md={6} xxl={6} className=" m-b-30">
                  <h6>年次有給休暇</h6>
                  <Row className="m-b-2">
                    <Col className="col-4">自動付与</Col>
                    <Col className="col-8">
                      :
                      <Badge bg={'success'} className={'mx-2'}>
                        有効
                      </Badge>
                    </Col>
                  </Row>
                  <Row className="m-b-2">
                    <Col className="col-4">付与実施日</Col>
                    <Col className="col-8">: 入社日から算出した日</Col>
                  </Row>
                </Col>
              </Row>
              <div className="text-end">
                <Button href="/settings" variant={'primary'} className="text-capitalize">
                  有休設定
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={12} xxl={4}>
          <Alert variant="info">
            <Alert.Heading>ご意見をお聞かせください</Alert.Heading>
            <p>
              「こんな機能が欲しい」「この機能が使いにくい」などお気づきの点はございませんか。
              <br />
              ご利用者様のご意見を参考にして、有休ノートがもっと便利になるように改善を進めて参ります。
            </p>
            <hr />
            <p className="mb-0">
              ご意見は
              <Link to="https://yukyu-note.com/contact"> お問合わせ </Link>
              からお送り頂けます。
            </p>
          </Alert>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
