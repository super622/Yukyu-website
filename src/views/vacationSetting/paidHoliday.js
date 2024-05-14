import React from 'react';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Department = () => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={12} md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">有休取得ルール</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <h5>取得順序</h5>
                </Col>
                <Col sm={9}>付与日の古い有休から消化</Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3}>
                  <p>最小取得単位</p>
                </Col>
                <Col sm={9}>1時間</Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3}>
                  <p>所定労働時間</p>
                </Col>
                <Col sm={9}>8時間</Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3}>
                  <p>有効期限の初期設定</p>
                </Col>
                <Col sm={9}>
                  <p>2年 0ヶ月</p>
                  <p>有休の付与日から消滅するまでの期間になります。 有休を手動で付与する場合は、付与時にこの値を上書きできます。</p>
                </Col>
              </Row>
              <hr />
              <Row>
                <div className="text-center">
                  <Button variant={'outline-primary'} className="text-capitalize">
                    変更
                  </Button>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">有休付与設定</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <h5>自動付与</h5>
                </Col>
                <Col sm={9}>
                  <h5>
                    <Badge bg={'success'}>有効</Badge>
                  </h5>
                  <p>
                    自動付与を有効にしている場合、
                    有休付与予定日を迎えた従業員（勤務形態が「パート（不定期）」を除く）に対しシステムが自動で有休を付与します。
                  </p>
                  <p>
                    有休(法定の年次有給休暇)付与日までに原則となる有休日数が付与されていない場合、自動的に該当日数が従業員に付与されます。
                    一部を前倒しで個別に付与していた場合、足りない日数が従業員に付与されます。
                  </p>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3}>
                  <h5>付与実施日</h5>
                </Col>
                <Col sm={9}>
                  <h5>
                    <span className="feather icon-calendar">入社日から算出した日</span>
                  </h5>
                  <p>従業員の入社日から算出して付与するので公平感のある付与方式です。</p>
                </Col>
              </Row>
              <hr />
              <Row>
                <div className="text-center">
                  <Button variant={'outline-primary'} className="text-capitalize">
                    変更
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

export default Department;
