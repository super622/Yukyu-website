import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Row, Col, Button, Alert, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { yukAPI, goRedirect } from '../../../utils/api';

const AuthLogin = ({ setMsg, setMsgType }) => {
  const [isSubmited, setIsSubmited] = useState(false);

  const loginAction = async (email, password, setMsg, setMsgType) => {
    setIsSubmited(true);
    await yukAPI('login', { email: email, password: password }, 'post', '', 2000)
      .then((res) => {
        if (res.data.status === 'success') {
          setMsg(res.data.msg);
          setMsgType('success');
          goRedirect('/dashboard');
        } else {
          setMsg(res.data.msg);
          setMsgType('danger');
          setIsSubmited(false);
        }
      })
      .catch((e) => {
        setMsg('サーバーエラー');
        setMsgType('danger');
        setIsSubmited(false);
        console.log('Login request error => ', e);
      });
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('有効なメールアドレスが必要です。').max(255).required('メールアドレスは必須です。'),
          password: Yup.string().max(255).required('パスワードは必須です。')
        })}
      >
        {/* {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => ( */}
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                className="form-control"
                label="Email Address / Username"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                placeholder="メールアドレス"
                value={values.email}
              />
              {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                label="Password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                placeholder="パスワード"
                value={values.password}
              />
              {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
            </div>

            {errors.submit && (
              <Col sm={12}>
                <Alert variant="danger">{errors.submit}</Alert>
              </Col>
            )}

            <Form.Group className="form-group d-flex justify-content-center">
              <Form.Check type={'checkbox'} id={'checkbox'} name="group1" label={'ログイン状態を保持する'} />
            </Form.Group>

            <Row>
              <Col mt={2} className="text-center">
                <Button
                  className="btn-block mb-4"
                  color="primary"
                  disabled={isSubmited}
                  size="large"
                  type="submit"
                  variant="primary"
                  onClick={() => {
                    loginAction(values.email, values.password, setMsg, setMsgType);
                  }}
                >
                  ログイン
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

AuthLogin.propTypes = {
  setMsg: PropTypes.func,
  setMsgType: PropTypes.func
};

export default AuthLogin;
