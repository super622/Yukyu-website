import React from 'react';
import { Button, Col, Row, Card, Badge } from 'react-bootstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const flag = true;
const SpecialHolidaySetting = () => {
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
                    <Tr>
                      <Td>0</Td>
                      <Td>Hol</Td>
                      <Td>
                        <Badge bg="success">有効</Badge>
                      </Td>
                      <Td>
                        <Badge bg="warning">表示しない</Badge>
                      </Td>
                      <Td>設定なし</Td>
                      <Td>
                        <Button href="/special_items/123" variant="success" className="text-capitalize">
                          詳細
                        </Button>
                      </Td>
                    </Tr>
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
