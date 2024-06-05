import React, { useState } from 'react';
import { Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import AuthLogin from './AuthLogin';

const Signin1 = () => {
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('success');

  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <Alert variant={msgType} show={msg} onClose={() => setMsg('')} dismissible>
          <span>{`${msg}`}</span>
        </Alert>
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless">
            <Card.Body>
              <div className="mb-4 text-center">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <h5 className="text-center">ログイン</h5>
              <AuthLogin setMsg={setMsg} setMsgType={setMsgType} />
              <div className=" text-center">
                <p className="mb-2 text-c-blue">
                  <Link to={'/auth/signup-1'}>アカウント作成</Link>
                </p>
                <p className="mb-2 text-c-blue">
                  <Link to={'/auth/reset-password-1'}>パスワードをお忘れですか？</Link>
                </p>
                <p className="mb-2 text-c-blue">
                  <Link to={'#'}>認証メールが届いていませんか？</Link>
                </p>
                <p className="mb-2 text-c-blue">
                  <Link to={'#'}>アカウントが凍結中ですか？</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin1;
