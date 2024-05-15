import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button, Alert, Form } from 'react-bootstrap';

import * as Yup from 'yup';
import { Formik } from 'formik';

const FirebaseLogin = ({ className, ...rest }) => {
  return (
    <React.Fragment>
      <Formik
        initialValues={{
          email: 'info@codedthemes.com',
          password: '123456',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
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
                <Button href="/dashboard" className="btn-block mb-4" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary">
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
