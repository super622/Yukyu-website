import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { yukAPI, auth_token } from '../../utils/api';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Department = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await yukAPI('department_list', {}, 'post', auth_token)
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
              {data.length > 0 ? (
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
                    {data.map((item) => (
                      <Tr key={item.id}>
                        <Td>{item.name}</Td>
                        <Td>{item.priority}</Td>
                        <Td>{item.number}</Td>
                        <Td>
                          <div>
                            <Button href={`/department/${item.id}`} variant={'success'} className="text-capitalize" size="sm">
                              表示
                            </Button>
                            <Button href={`/department/edit/${item.id}`} variant={'warning'} className="text-capitalize" size="sm">
                              編集
                            </Button>
                          </div>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <div className="m-b-20">対象のデータがありません</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Department;
