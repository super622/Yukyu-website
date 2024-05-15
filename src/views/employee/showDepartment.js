import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Table, Tbody, Tr, Td } from 'react-super-responsive-table';
import Swal from 'sweetalert2';

const ShowDepartment = () => {
  let params = useParams();
  console.log(params);

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
    }).then(function () {
      console.log('delete');
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
                  <Table className="table-bordered mb-3">
                    <Tbody>
                      <Tr>
                        <Td>名前</Td>
                        <Td>部署名321</Td>
                      </Tr>
                      <Tr>
                        <Td>優先度</Td>
                        <Td>5</Td>
                      </Tr>
                      <Tr>
                        <Td>従業員</Td>
                        <Td></Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <div className="text-end">
                    <Button href="/department/edit/123" variant={'warning'} className="text-capitalize">
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
