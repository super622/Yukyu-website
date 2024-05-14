import React from 'react';
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <React.Fragment>
      <div className="navbar-brand header-logo">
        <Link to="#" className="b-brand">
          <div className="b-bg">
            <i className="feather icon-check-square" />
          </div>
          <span className="b-title">有休ノート</span>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NavLogo;
