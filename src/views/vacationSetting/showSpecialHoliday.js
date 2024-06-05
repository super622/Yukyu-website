import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Table, Tbody, Tr, Td } from 'react-super-responsive-table';
import { yukAPI, auth_token, goRedirect } from '../../utils/api';
import Swal from 'sweetalert2';

const ShowSpecialHoliday = () => {
  let params = useParams();
  const [name, setName] = useState('');
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState(1);
  const [notification, setNotification] = useState(0);
  const [expireDate, setExpireDate] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await yukAPI('show_speicalholidaysettings', { id: params.id }, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          setName(res.data.data.name);
          setPriority(res.data.data.priority);
          setStatus(res.data.data.status);
          setNotification(res.data.data.notice_excess_consumption);
          let year = res.data.data.expire_year;
          let month = res.data.data.expire_month;
          let day = res.data.data.expire_day;
          if (year === 0 && month === 0 && day === 0) {
            setExpireDate('設定なし');
          } else {
            setExpireDate(year + '年' + month + 'ヶ月' + day + '日');
          }
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  const removeData = async () => {
    await yukAPI('remove_speicalholidaysettings', { id: params.id }, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          goRedirect('/special_items');
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  const Alert = () => {
    Swal.fire({
      title: '本当に削除しますか?',
      text: '',
      icon: 'error',
      showCancelButton: true,
      cancelButtonColor: '#e8e8e8',
      confirmButtonColor: '#f44236',
      iconColor: '#f44236',
      confirmButtonText: '削除する',
      cancelButtonText: 'キャンセル',
      reverseButtons: true
    }).then(function (result) {
      if (result.isConfirmed) {
        removeData();
      }
    });
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={3}>
          <Button href="/special_items" variant={'light'}>
            <i className="feather icon-chevron-left"></i>
            一覧に戻る
          </Button>
        </Col>
      </Row>
      <Row className="m-t-20">
        <Col md={8} className="center-card">
          <Card>
            <Card.Body>
              <Row>
                <Col sm={12}>
                  <Table className="table-bordered mb-3">
                    <Tbody>
                      <Tr>
                        <Td>名前</Td>
                        <Td>{name}</Td>
                      </Tr>
                      <Tr>
                        <Td>優先度</Td>
                        <Td>{priority}</Td>
                      </Tr>
                      <Tr>
                        <Td>ステータス</Td>
                        <Td>
                          <h5>{status ? <Badge bg={'success'}>有効</Badge> : <Badge bg={'danger'}>無効</Badge>}</h5>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>消化超過のお知らせ</Td>
                        <Td>
                          <h5>{notification ? <Badge bg={'warning'}>表示しない</Badge> : <Badge bg={'success'}>表示する</Badge>}</h5>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>有効期限</Td>
                        <Td>{expireDate}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <div className="text-end">
                    <Button href={`/special_item/edit/${params.id}`} variant={'warning'} className="text-capitalize">
                      編集
                    </Button>
                    <Button variant={'danger'} className="text-capitalize mr-0" onClick={() => Alert()}>
                      削除
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
          <Button href="/special_items" variant={'light'}>
            <i className="feather icon-chevron-left"></i>
            一覧に戻る
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ShowSpecialHoliday;
