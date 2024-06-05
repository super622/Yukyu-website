import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { Table, Tbody, Tr, Td } from 'react-super-responsive-table';
import Swal from 'sweetalert2';
import { yukAPI, auth_token, goRedirect } from '../../utils/api';

const ShowDepartment = () => {
  let params = useParams();
  const [data, setData] = useState({
    name: '',
    priority: 0,
    members: []
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await yukAPI('show_department', { id: params.id }, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          console.log(res.data.data);
          setData(res.data.data);
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
        deleteDepartment();
      }
    });
  };

  const deleteDepartment = async () => {
    await yukAPI('remove_department', { id: params.id }, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          console.log(res.data.data);
          goRedirect('/department');
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={3}>
          <Button href="/department" variant={'light'}>
            <i className="feather icon-chevron-left"></i>
            一覧に戻る
          </Button>
        </Col>
      </Row>
      <Row className="m-t-20">
        <Col md={6} className="center-card">
          <Card>
            <Card.Body>
              <Row>
                <Col sm={12}>
                  {data ? (
                    <Table className="table-bordered mb-3">
                      <Tbody>
                        <Tr>
                          <Td>名前</Td>
                          <Td>{data.name}</Td>
                        </Tr>
                        <Tr>
                          <Td>優先度</Td>
                          <Td>{data.priority}</Td>
                        </Tr>
                        <Tr>
                          <Td>従業員</Td>
                          <Td>
                            {data.members.map((item) => (
                              <div key={item.id}>
                                <Link to={`/employee/${item.id}`}>{item.name}</Link>
                              </div>
                            ))}
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <div className="text-end">
                    <Button href={`/department/edit/${params.id}`} variant={'warning'} className="text-capitalize">
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
          <Button href="/department" variant={'light'}>
            <i className="feather icon-chevron-left"></i>
            一覧に戻る
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ShowDepartment;
