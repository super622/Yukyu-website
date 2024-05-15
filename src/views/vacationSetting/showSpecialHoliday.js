import React from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Table, Tbody, Tr, Td } from 'react-super-responsive-table';
import Swal from 'sweetalert2';

const ShowSpecialHoliday = () => {
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
                        <Td>部署名321</Td>
                      </Tr>
                      <Tr>
                        <Td>優先度</Td>
                        <Td>5</Td>
                      </Tr>
                      <Tr>
                        <Td>ステータス</Td>
                        <Td>
                          <h5>
                            <Badge bg={'success'}>有効</Badge>
                          </h5>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>消化超過のお知らせ</Td>
                        <Td>
                          <h5>
                            <Badge bg={'warning'}>表示しない</Badge>
                          </h5>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>有効期限</Td>
                        <Td></Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <div className="text-end">
                    <Button href="/special_item/edit/123" variant={'warning'} className="text-capitalize">
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
