import React from 'react';
import { Link } from 'react-router-dom';
import googlePlayImg from '../../../../assets/images/google-play-badge.png';
import appStoreImg from '../../../../assets/images/app_store_badge.png';

const FooterTop = () => {
  return (
    <React.Fragment>
      <div className="text-end">
        <Link href="#" target="_blank" className="m-r-20">
          <img src={googlePlayImg} className="footer-image" alt="Google Play" />
        </Link>
        <Link href="#" target="_blank">
          <img src={appStoreImg} className="footer-image" alt="App Store" />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default FooterTop;
