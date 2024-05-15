import React, { useContext } from 'react';
import { ListGroup, Dropdown, Card, Badge } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';

import NavLeft from './NavLeft';
import NavRight from './NavRight';
import { ConfigContext } from '../../../contexts/ConfigContext';
import * as actionType from '../../../store/actions';

import avatar1 from '../../../assets/images/user/avatar-2.jpg';
// const notiData = [
//   {
//     name: 'Joseph William',
//     image: avatar1,
//     details: 'Purchase New Theme and make payment',
//     activity: '30 min'
//   },
//   {
//     name: 'Sara Soudein',
//     image: avatar1,
//     details: 'currently login',
//     activity: '30 min'
//   },
//   {
//     name: 'Suzen',
//     image: avatar1,
//     details: 'Purchase New Theme and make payment',
//     activity: 'yesterday'
//   }
// ];

const NavBar = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu, headerFixedLayout, layout } = configContext.state;
  const { dispatch } = configContext;

  let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg'];
  if (headerFixedLayout && layout === 'vertical') {
    headerClass = [...headerClass, 'headerpos-fixed'];
  }

  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  const navToggleHandler = () => {
    dispatch({ type: actionType.COLLAPSE_MENU });
  };

  let collapseClass = ['collapse navbar-collapse show'];

  let navBar = (
    <React.Fragment>
      <div className="m-header">
        <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={navToggleHandler}>
          <span />
        </Link>
        <span className="m-header-title">株式会社向陽プランニング</span>
        <Badge bg={'secondary'} className={'rounded-pill'}>
          フリープラン
        </Badge>
        <Dropdown align="start">
          <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
            <i className="feather icon-bell icon" />
          </Dropdown.Toggle>
          <Dropdown.Menu align="end" className="notification notification-scroll">
            <div className="noti-head">
              <h6 className="d-inline-block m-b-0">通知</h6>
              <div className="float-end">
                <Link to="#" className="me-2">
                  既読にする
                </Link>
                <Link to="#">すべてクリア</Link>
              </div>
            </div>
            <PerfectScrollbar>
              <ListGroup as="ul" bsPrefix=" " variant="flush" className="noti-body">
                {/* <ListGroup.Item as="li" bsPrefix=" " className="n-title">
                  <p className="m-b-0">NEW</p>
                </ListGroup.Item> */}
                <ListGroup.Item as="li" bsPrefix=" " className="notification">
                  <Card
                    className="d-flex align-items-center shadow-none mb-0 p-0"
                    style={{ flexDirection: 'row', backgroundColor: 'unset' }}
                  >
                    <img className="img-radius" src={avatar1} alt="Generic placeholder" />
                    <Card.Body className="p-0">
                      <p>
                        <strong>藤村</strong>
                        <span className="n-time text-muted">
                          <i className="icon feather icon-clock me-2" />
                          30 分
                        </span>
                      </p>
                      <p>新規チケット追加</p>
                    </Card.Body>
                  </Card>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" " className="notification">
                  <Card
                    className="d-flex align-items-center shadow-none mb-0 p-0"
                    style={{ flexDirection: 'row', backgroundColor: 'unset' }}
                  >
                    <img className="img-radius" src={avatar1} alt="Generic placeholder" />
                    <Card.Body className="p-0">
                      <p>
                        <strong>藤村</strong>
                        <span className="n-time text-muted">
                          <i className="icon feather icon-clock me-2" />
                          30 分
                        </span>
                      </p>
                      <p>新規チケット追加</p>
                    </Card.Body>
                  </Card>
                </ListGroup.Item>
                {/* <ListGroup.Item as="li" bsPrefix=" " className="n-title">
                  <p className="m-b-0">EARLIER</p>
                </ListGroup.Item>
                {notiData.map((data, index) => {
                  return (
                    <ListGroup.Item key={index} as="li" bsPrefix=" " className="notification">
                      <Card
                        className="d-flex align-items-center shadow-none mb-0 p-0"
                        style={{ flexDirection: 'row', backgroundColor: 'unset' }}
                      >
                        <img className="img-radius" src={data.image} alt="Generic placeholder" />
                        <Card.Body className="p-0">
                          <p>
                            <strong>{data.name}</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock me-2" />
                              {data.activity}
                            </span>
                          </p>
                          <p>{data.details}</p>
                        </Card.Body>
                      </Card>
                    </ListGroup.Item>
                  );
                })} */}
              </ListGroup>
            </PerfectScrollbar>
            {/* <div className="noti-footer">
              <Link to="#">show all</Link>
            </div> */}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown align="start" className="drp-user">
          <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
            <i className="icon feather icon-settings" />
            <span>keiri@kouyou-p.co.jp</span>
          </Dropdown.Toggle>
          <Dropdown.Menu align="end" className="profile-notification">
            <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
              <ListGroup.Item as="li" bsPrefix=" ">
                <Link to="#" className="dropdown-item">
                  <i className="feather icon-user" /> マイページ
                </Link>
              </ListGroup.Item>
              <ListGroup.Item as="li" bsPrefix=" ">
                <Link to="https://yukyu-note.com/" className="dropdown-item">
                  <i className="feather icon-globe" /> WEBサイト
                </Link>
              </ListGroup.Item>
              <ListGroup.Item as="li" bsPrefix=" ">
                <Link to="#" className="dropdown-item">
                  <i className="feather icon-log-out" /> ログアウト
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div style={{ justifyContent: 'space-between' }} className={collapseClass.join(' ')}>
        <NavLeft />
        <NavRight />
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <header className={headerClass.join(' ')}>{navBar}</header>
    </React.Fragment>
  );
};

export default NavBar;
