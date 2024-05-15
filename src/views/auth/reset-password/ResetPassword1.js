import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

const ResetPassword1 = () => {
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
            <Row className="align-items-center text-center">
              <Col>
                <Card.Body className="card-body">
                  <div className="mb-4">
                    <i className="feather icon-mail auth-icon" />
                  </div>
                  <h3 className="mb-3 f-w-400">パスワード再発行</h3>
                  <div className="input-group mb-4">
                    <input type="email" className="form-control" placeholder="メールアドレス" />
                  </div>
                  <Button href="#" variant={'primary'} className="mb-4">パスワード再発行</Button>
                  <div className="text-center">
                    <p className="mb-2 text-c-blue">
                      <Link to={'/auth/signin-1'}>ログイン</Link>
                    </p>
                    <p className="mb-2 text-c-blue">
                      <Link to={'/auth/signup-1'}>アカウント作成</Link>
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

export default ResetPassword1;
