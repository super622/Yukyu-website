import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button, Alert, Form } from 'react-bootstrap';

import * as Yup from 'yup';
import { Formik } from 'formik';

const loginAction = (email, password) => {
  console.log(email, password);
};

const FirebaseLogin = ({ className, ...rest }) => {
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
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
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
                  disabled={isSubmitting}
                  size="large"
                  type="submit"
                  variant="primary"
                  onClick={() => {
                    loginAction(values.email, values.password);
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

FirebaseLogin.propTypes = {
  className: PropTypes.string
};

export default FirebaseLogin;
