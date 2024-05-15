import React from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Table, Tbody } from 'react-super-responsive-table';
import Swal from 'sweetalert2';

const ShowApproveLeaveRequest = () => {
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
          <Button href="/used_day_requests" variant={'light'}>
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
                      <tr>
                        <td>名前</td>
                        <td>出水 亜須加</td>
                      </tr>
                      <tr>
                        <td>部署</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>取得希望日</td>
                        <td>	2024/04/02 (火)から、2024/04/19 (金)まで</td>
                      </tr>
                      <tr>
                        <td>休暇種類</td>
                        <td>
                          <Badge bg={'warning'} className="text-capitalize">
                            有休
                          </Badge>
                          &nbsp;/ 全休
                        </td>
                      </tr>
                      <tr>
                        <td>ステータス</td>
                        <td>
                        <Badge bg={'success'} className="text-capitalize">
                          承認済み
                        </Badge>
                        </td>
                      </tr>
                      <tr>
                        <td>理由/備考</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>申請提出日時</td>
                        <td>2024/04/02 15:33</td>
                      </tr>
                    </Tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <div className="text-end">
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
          <Button href="/used_day_requests" variant={'light'}>
            <i className="feather icon-chevron-left"></i>
            一覧に戻る
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ShowApproveLeaveRequest;
