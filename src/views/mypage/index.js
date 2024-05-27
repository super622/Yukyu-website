import React from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';

const Mypage = () => {
  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col xl={10}>
          <Card>
            <Card.Header>
              <h5>アカウント設定</h5>
              <span className="text-muted d-block mt-1">ログインに必要な情報です</span>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <h4>メールアドレス</h4>
                </Col>
                <Col md={6} className="mb-3 mb-md-0">
                  keiri@kouyou-p.co.jp
                </Col>
                <Col md={3}>
                  <Button href="/mypage/edit_email" variant={'outline-primary'} className="px-5">
                    変更
                  </Button>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col md={3}>
                  <h4>パスワード</h4>
                </Col>
                <Col md={6} className="mb-3 mb-md-0">
                  **********
                </Col>
                <Col md={3}>
                  <Button href="/mypage/edit_password" variant={'outline-primary'} className="px-5">
                    変更
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={10}>
          <Card>
            <Card.Header>
              <Row>
                <Col md={9}>
                  <h5>メール通知設定</h5>
                  <span className="text-muted d-block mb-3 mt-1">メール受信のON/OFFを設定できます</span>
                </Col>
                <Col md={3}>
                  <Button href="/mypage/setting_notification_category" variant={'outline-primary'} className="px-5">
                    設定する
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6} className="mb-4 border-right">
                  <h5 className="pb-1">管理している従業員の休暇に関する通知</h5>
                  <Row className="pb-1">
                    <div className="col-10">消滅する有休の30日前通知</div>
                    <div className="col-2">
                      <Badge bg={'success'}>ON</Badge>
                    </div>
                  </Row>
                  <Row className="pb-1">
                    <div className="col-10">従業員に自動付与が行われたとき</div>
                    <div className="col-2">
                      <Badge bg={'success'}>ON</Badge>
                    </div>
                  </Row>
                  <Row className="pb-1">
                    <div className="col-10">従業員への自動付与が失敗したとき</div>
                    <div className="col-2">
                      <Badge bg={'success'}>ON</Badge>
                    </div>
                  </Row>
                  <Row className="pb-1">
                    <div className="col-10">手動で有休登録が必要な従業員が有休取得日を迎えたとき</div>
                    <div className="col-2">
                      <Badge bg={'success'}>ON</Badge>
                    </div>
                  </Row>
                  <Row className="pb-1">
                    <div className="col-10">休暇の申請が届いたとき</div>
                    <div className="col-2">
                      <Badge bg={'success'}>ON</Badge>
                    </div>
                  </Row>
                  <Row className="pb-1">
                    <div className="col-10">季指定義務の通知 ( 7日前と30日前 ) </div>
                    <div className="col-2">
                      <Badge bg={'success'}>ON</Badge>
                    </div>
                  </Row>
                </Col>
                <Col md={6} className="mb-4">
                  <h5 className="pb-1">その他の通知</h5>
                  <Row className="pb-1">
                    <div className="col-10">重要なお知らせ</div>
                    <div className="col-2">
                      <Badge bg={'success'}>ON</Badge>
                    </div>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Mypage;
