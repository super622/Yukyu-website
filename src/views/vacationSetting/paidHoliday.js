import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import { yukAPI, auth_token } from '../../utils/api';

const Department = () => {
  const [data, setData] = useState({
    acquisition_order_label: '',
    minimum_acquisition_unit_label: '',
    scheduled_working_hours_label: '',
    date_of_expiry_year: '',
    date_of_expiry_month: '',
    automatic_grant: '',
    grant_implementation_date: 0,
    grant_implementation_date_label: '',
    base_date_month: '',
    base_date_day: ''
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await yukAPI('show_paidholidaysettings', {}, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          setData(res.data.data);
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
        <Col sm={12} md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">有休取得ルール</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <h5>取得順序</h5>
                </Col>
                <Col sm={9}>{data.acquisition_order_label}</Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3}>
                  <h5>最小取得単位</h5>
                </Col>
                <Col sm={9}>{data.minimum_acquisition_unit_label}</Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3}>
                  <h5>所定労働時間</h5>
                </Col>
                <Col sm={9}>{data.scheduled_working_hours_label}</Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3}>
                  <h5>有効期限の初期設定</h5>
                </Col>
                <Col sm={9}>
                  <p>
                    {data.date_of_expiry_year}年 {data.date_of_expiry_month}ヶ月
                  </p>
                  <p>有休の付与日から消滅するまでの期間になります。 有休を手動で付与する場合は、付与時にこの値を上書きできます。</p>
                </Col>
              </Row>
              <hr />
              <Row>
                <div className="text-center">
                  <Button href="/settings/rule_edit" variant={'outline-primary'} className="text-capitalize">
                    変更
                  </Button>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">有休付与設定</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <h5>自動付与</h5>
                </Col>
                <Col sm={9}>
                  <h5>{data.automatic_grant ? <Badge bg={'success'}>有効</Badge> : <Badge bg={'danger'}>無効</Badge>}</h5>
                  <p>
                    自動付与を有効にしている場合、
                    有休付与予定日を迎えた従業員（勤務形態が「パート（不定期）」を除く）に対しシステムが自動で有休を付与します。
                  </p>
                  <p>
                    有休(法定の年次有給休暇)付与日までに原則となる有休日数が付与されていない場合、自動的に該当日数が従業員に付与されます。
                    一部を前倒しで個別に付与していた場合、足りない日数が従業員に付与されます。
                  </p>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3}>
                  <h5>付与実施日</h5>
                </Col>
                <Col sm={9}>
                  <h5>
                    <span className="feather icon-calendar">{data.grant_implementation_date_label}</span>
                  </h5>
                  <p>従業員の入社日から算出して付与するので公平感のある付与方式です。</p>
                  {data.grant_implementation_date ? (
                    <p>
                      基準日:{data.base_date_month}月{data.base_date_day}日
                    </p>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
              <hr />
              <Row>
                <div className="text-center">
                  <Button href="/settings/annual_edit" variant={'outline-primary'} className="text-capitalize">
                    変更
                  </Button>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Department;
