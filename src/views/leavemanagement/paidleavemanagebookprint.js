import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { yukAPI, auth_token } from '../../utils/api';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Paidleavemanagebookprint = () => {
  let params = useParams();
  const [curData, setCurData] = useState([]);

  useEffect(() => {
    getEmployeeInfo();
    document.getElementsByTagName('footer')[0].style.display = 'none';
    document.getElementsByTagName('header')[0].style.display = 'none';
    document.getElementsByTagName('nav')[0].style.display = 'none';
    let link2 = document.createElement('link');
    link2.innerHTML =
      '<style> @media print{*,::after,::before{text-shadow:none!important;box-shadow:none!important}title {display: none}a:not(.btn){text-decoration:none}abbr[title]::after{content:" ("attr(title) ")"}pre{white-space:pre-wrap!important}blockquote,pre{border:1px solid #adb5bd;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}@page{size:a3}body{min-width:992px!important}.container{min-width:992px!important}.page-header,.pc-sidebar,.pc-mob-header,.pc-header,.pct-customizer,.modal,.navbar{display:none}.pc-container{top:0;}.invoice-contact{padding-top:0;}@page,.card-body,.card-header,body,.pcoded-content{padding:0;margin:0}.badge{border:1px solid #000}.table{border-collapse:collapse!important}.table td,.table th{background-color:#fff!important}.table-bordered td,.table-bordered th{border:1px solid #dee2e6!important}.table-dark{color:inherit}.table-dark tbody+tbody,.table-dark td,.table-dark th,.table-dark thead th{border-color:#dee2e6}.table .thead-dark th{color:inherit;border-color:#dee2e6}.pcoded-main-container {margin-left: 0 !important;} .center-card {width: 100%; margin: 0;}}</style>';
    document.getElementsByTagName('head')[0].appendChild(link2);
  }, []);

  const getEmployeeInfo = async () => {
    await yukAPI('show_employee', { id: params.id }, 'post', auth_token)
      .then((res) => {
        if (res.data.status === 'success') {
          setCurData(res.data.data);
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log('Login request error => ', e);
      });
  };

  const print = () => {
    window.print();
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={8} className="center-card">
          <Card>
            <Card.Header>
              <h5>年次有給休暇管理簿</h5>
              <div className="history-media-menu">
                <Button variant={'outline-dark'} size={'sm'} onClick={print}>
                  このページを印刷
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <div>
                <Table className="table-bordered table-striped">
                  <Thead>
                    <Tr>
                      <Th>氏名</Th>
                      <Th>社員番号</Th>
                      <Th>所属部署</Th>
                      <Th>入社日</Th>
                      <Th>勤務形態</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>{curData.name}</Td>
                      <Td>{curData.employee_number}</Td>
                      <Td>{curData.department_label}</Td>
                      <Td>{moment(curData.hire_date).format('YYYY/MM/DD')}</Td>
                      <Td>{curData.working_type_label}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </div>
              <div className="management-item">
                <h5 className="m-t-50">■ 2024/05/01 付与日数: 10日, 期限: 2026/04/30, 残日数:2日</h5>
                <Table className="table-bordered table-striped">
                  <Thead>
                    <Tr>
                      <Th>NO</Th>
                      <Th>取得日</Th>
                      <Th>曜日</Th>
                      <Th>残日数</Th>
                      <Th>取得内容</Th>
                      <Th>理由/備考</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>1</Td>
                      <Td>2024/05/01</Td>
                      <Td>水</Td>
                      <Td>9日</Td>
                      <Td>全休</Td>
                      <Td>システムによる自動消化です。</Td>
                    </Tr>
                    <Tr>
                      <Td>2</Td>
                      <Td>2024/05/02</Td>
                      <Td>木</Td>
                      <Td>8日</Td>
                      <Td>全休</Td>
                      <Td>システムによる自動消化です。</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </div>
              <div className="management-item">
                <h5 className="m-t-50">
                  ■ 2024/05/24 付与日数: 5日, 期限: 2026/05/29, 残日数:5日
                  <Badge pill bg={'primary'}>
                    基準日
                  </Badge>
                </h5>
                ※ 有休の使用日はありません。
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Paidleavemanagebookprint;
