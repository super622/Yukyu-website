import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ConfigContext } from '../../../../contexts/ConfigContext';
import * as actionType from '../../../../store/actions';
import useWindowSize from '../../../../hooks/useWindowSize';

const NavLeft = () => {
  const windowSize = useWindowSize();
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const { dispatch } = configContext;

  let navItemClass = ['nav-item'];
  if (windowSize.width <= 575) {
    navItemClass = [...navItemClass, 'd-none'];
  }

  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto">
        <ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')}>
          <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}>
            <span />
          </Link>
        </ListGroup.Item>
        <ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')}>
          <span>株式会社向陽プランニング</span>
        </ListGroup.Item>
        <ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')}>
          {/* <Badge bg={"secondary"} className={"rounded-pill"}>
            フリープラン
          </Badge> */}
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default NavLeft;
