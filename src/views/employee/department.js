import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Button, Card, Col, Row } from 'react-bootstrap';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Department = () => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={12} md={12}>
          <Button href="/department/create" variant={'primary'} className="text-capitalize">
            <i className="feather icon-plus-circle" />
            新規追加
          </Button>
        </Col>
      </Row>
      <Row className="m-t-10">
        <Col sm={12} md={12}>
          <Card>
            <Card.Body>
              <Table>
                <Thead>
                  <Tr>
                    <Th>名前</Th>
                    <Th>優先度</Th>
                    <Th>部署人数</Th>
                    <Th>操作</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>部署名321</Td>
                    <Td>1</Td>
                    <Td>0</Td>
                    <Td>
                      <div>
                        <Button variant={'success'} className="text-capitalize" size="sm">
                          表示
                        </Button>
                        <Button variant={'warning'} className="text-capitalize" size="sm">
                          編集
                        </Button>
                      </div>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>部署名321</Td>
                    <Td>1</Td>
                    <Td>0</Td>
                    <Td>
                      <div>
                        <Button variant={'success'} className="text-capitalize" size="sm">
                          表示
                        </Button>
                        <Button variant={'warning'} className="text-capitalize" size="sm">
                          編集
                        </Button>
                      </div>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Department;
