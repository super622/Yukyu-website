import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const newDate = new Date();
const curYear = newDate.getFullYear();

const FooterBottom = () => {
  return (
    <React.Fragment>
      <div className="footer-bottom">
        <Row>
          <Col sm={6}>
            <Link href="#" target="_blank" className="m-r-30">
              利用規約
            </Link>
            <Link href="#" target="_blank">
              プライバシーポリシー
            </Link>
          </Col>
          <Col sm={6} className="text-end">
            <Link href="#" target="_blank">
              有休ノート
            </Link>
            <span>© {curYear}</span>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default FooterBottom;
