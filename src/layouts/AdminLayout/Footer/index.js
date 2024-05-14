import React from 'react';
import FooterTop from './FooterTop';
import FooterBottom from './FooterBottom';

const Footer = () => {
  let mainContainer = (
    <React.Fragment>
      <FooterTop />
      <FooterBottom />
    </React.Fragment>
  );

  let headerClass = ['pcoded-footer'];

  return (
    <React.Fragment>
      <footer className={headerClass.join(' ')}>{mainContainer}</footer>
    </React.Fragment>
  );
};

export default Footer;
