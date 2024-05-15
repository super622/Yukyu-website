import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

const SignUp1 = () => {
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless">
            <Row className="align-items-center">
              <Col>
                <Card.Body className="text-center">
                  <div className="mb-4">
                    <i className="feather icon-user-plus auth-icon" />
                  </div>
                  <h3 className="mb-4">アカウント作成</h3>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="メールアドレス" />
                  </div>
                  <div className="input-group">
                    <input type="email" className="form-control" placeholder="パスワード" />
                  </div>
                  <div className="input-group mb-3">
                    <em>6文字以上で設定してください</em>
                  </div>
                  <div className="input-group mb-4">
                    <input type="password" className="form-control" placeholder="パスワード（確認）" />
                  </div>
                  <Button href="#" variant={'primary'}>アカウント作成</Button>
                  <div className="text-center mt-3">
                    <p className="mb-2 text-c-blue">
                      <Link to={'/auth/signin-1'}>ログイン</Link>
                    </p>
                    <p className="mb-2 text-c-blue">
                      <Link to={'#'}>認証メールが届いていませんか？</Link>
                    </p>
                    <p className="mb-2 text-c-blue">
                      <Link to={'#'}>アカウントが凍結中ですか？</Link>
                    </p>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp1;
