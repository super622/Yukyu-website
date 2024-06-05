import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Card, Badge } from 'react-bootstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { yukAPI, auth_token } from '../../utils/api';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const flag = true;
const SpecialHolidaySetting = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await yukAPI('speicalholidaysettings_list', {}, 'post', auth_token)
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
          <p>
            設定をしなくても特休（特別休暇）機能は利用できますが、このページから特休を登録しておけば管理がより簡単になります。
            <br />
            特休付与・消化、従業員の申請時に選択できるようになりますので、「誕生日休暇」や「リフレッシュ休暇」など運用している特休を登録しましょう。
          </p>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12}>
          <Button href="/special_items/create" variant={'primary'} className="text-capitalize">
            新規作成
          </Button>
        </Col>
      </Row>
      <Row className="m-t-10">
        <Col sm={12} md={12}>
          <Card>
            <Card.Body>
              {flag ? (
                <Table>
                  <Thead>
                    <Tr>
                      <Th>優先度</Th>
                      <Th>特休名</Th>
                      <Th>ステータス</Th>
                      <Th>消化超過のお知らせ</Th>
                      <Th>有効期限</Th>
                      <Th>操作</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((item, idx) => (
                      <Tr key={idx}>
                        <Td>{idx + 1}</Td>
                        <Td>{item.name}</Td>
                        <Td>{item.status ? <Badge bg={'success'}>有効</Badge> : <Badge bg={'danger'}>無効</Badge>}</Td>
                        <Td>
                          {item.notice_excess_consumption ? (
                            <Badge bg={'warning'}>表示しない</Badge>
                          ) : (
                            <Badge bg={'success'}>表示する</Badge>
                          )}
                        </Td>
                        <Td>
                          {item.expire_year === 0 && item.expire_month === 0 && item.expire_day === 0
                            ? '設定なし'
                            : `${item.expire_year}年${item.expire_month}ヶ月${item.expire_day}日`}
                        </Td>
                        <Td>
                          <Button href={`/special_items/${item.id}`} variant="success" className="text-capitalize">
                            詳細
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <h6 className="p-10" style={{ color: '#888' }}>
                  対象のデータがありません
                </h6>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SpecialHolidaySetting;
