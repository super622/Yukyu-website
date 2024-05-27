import React from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SettingNoticeCategory = () => {
  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card>
            <Card.Body>
              <div className="mb-5">
                <h5 className="mt-4 mb-4 pb-3 border-bottom">管理している従業員の休暇に関する通知</h5>
                <div className="col-md-12">
                  <Form.Check type={'checkbox'} id={'checkbox1'} name="group1" className="m-r-10" label={'消滅する有休の30日前通知'} />
                </div>
                <div className="col-md-12">
                  <Form.Check
                    type={'checkbox'}
                    id={'checkbox2'}
                    name="group1"
                    className="m-r-10"
                    label={'従業員に自動付与が行われたとき'}
                  />
                </div>
                <div className="col-md-12">
                  <Form.Check
                    type={'checkbox'}
                    id={'checkbox3'}
                    name="group1"
                    className="m-r-10"
                    label={'従業員への自動付与が失敗したとき'}
                  />
                </div>
                <div className="col-md-12">
                  <Form.Check
                    type={'checkbox'}
                    id={'checkbox4'}
                    name="group1"
                    className="m-r-10"
                    label={'手動で有休登録が必要な従業員が有休取得日を迎えたとき'}
                  />
                </div>
                <div className="col-md-12">
                  <Form.Check type={'checkbox'} id={'checkbox5'} name="group1" className="m-r-10" label={'休暇の申請が届いたとき'} />
                </div>
                <div className="col-md-12">
                  <Form.Check
                    type={'checkbox'}
                    id={'checkbox6'}
                    name="group1"
                    className="m-r-10"
                    label={'時季指定義務の通知 ( 7日前と30日前 ) '}
                  />
                </div>
                <div className="col-md-12">
                  <small className="d-block pb-3 mt-4">
                    特定の部署に所属する従業員に関するメールのみ受信したい場合は、「<Link to={'#'}>管理者</Link>」
                    ページにおいて管理者向けの通知を設定してください。
                  </small>
                </div>
              </div>
              <div className="mb-5">
                <h5 className="mt-4 mb-4 pb-3 border-bottom">その他の通知</h5>
                <div className="col-12">
                  <Form.Check
                    type={'checkbox'}
                    id={'checkbox'}
                    name="group1"
                    className="m-r-10"
                    label={'重要なお知らせ'}
                    disabled
                    onSelect={true}
                  />
                </div>
              </div>
              <hr />
              <div className="text-center mt-5">
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

export default SettingNoticeCategory;
