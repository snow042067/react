import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Card,
  CardContent
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useEffect, useState } from 'react';

const SettingsView = () => {
  const [list, setList] = useState();
  const [isInDetail, setIsInDetail] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState();
  // let isInDetail = false;
  let dateGap = {
    startDate: '2016-01-02',
    endDate: '2018-12-25'
  };

  const changeHandler = (e) => {
    dateGap = {
      ...dateGap,
      [e.target.name]: e.target.value
    };
  };

  const updateDetailPage = (OrderId) => {
    fetch('http://localhost/php/updateDetailPage.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ OrderId })
    })
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setIsInDetail(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchOrder = () => {
    fetch('http://localhost/php/searchOrder.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dateGap)
    })
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setIsInDetail(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchDetail = (e) => {
    let { value } = e.currentTarget.value;
    value = e.currentTarget.value;
    fetch('http://localhost/php/searchDetail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ OrderId: value })
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentOrderId(value);
        setList(data);
        setIsInDetail(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteOrder = (e) => {
    fetch('http://localhost/php/deleteOrder.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ OrderId: e.currentTarget.value })
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);// eslint-disable-line no-alert
        searchOrder();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteDetail = (e) => {
    fetch('http://localhost/php/deleteDetail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ seq: e.currentTarget.value })
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);// eslint-disable-line no-alert
        updateDetailPage(currentOrderId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    searchOrder();
  }, []);

  let tableHead = (<></>);
  let tableContent = (<></>);

  if (list) {
    if (isInDetail) {
      if (list.detailList) {
        tableHead = (
          <TableRow>
            <TableCell>產品代號</TableCell>
            <TableCell>數量</TableCell>
            <TableCell>折扣</TableCell>
            <TableCell />
          </TableRow>
        );
        tableContent = (list.detailList.map((detail) => (
          <TableRow key={detail.seq}>
            <TableCell>{detail.ProdId}</TableCell>
            <TableCell>{detail.Qty}</TableCell>
            <TableCell>{detail.Discount}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="secondary"
                value={detail.seq}
                orderid={detail.OrderId}
                onClick={deleteDetail}
              >
                刪除
              </Button>
            </TableCell>
          </TableRow>
        ))
        );
      }
    }
  }

  if (list) {
    if (!isInDetail) {
      if (list.orderList) {
        tableHead = (
          <TableRow>
            <TableCell>訂單編號</TableCell>
            <TableCell>員工編號</TableCell>
            <TableCell>顧客編號</TableCell>
            <TableCell>訂單日期</TableCell>
            <TableCell>備註</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        );
        tableContent = (list.orderList.map((order) => (
          <TableRow key={order.OrderId}>
            <TableCell>{order.OrderId}</TableCell>
            <TableCell>{order.EmpId}</TableCell>
            <TableCell>{order.CustId}</TableCell>
            <TableCell>{order.OrderDate}</TableCell>
            <TableCell>{order.Descript}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                value={order.OrderId}
                onClick={searchDetail}
              >
                詳細
              </Button>
            </TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="secondary"
                value={order.OrderId}
                onClick={deleteOrder}
              >
                刪除
              </Button>
            </TableCell>
          </TableRow>
        ))
        );
      }
    }
  }

  let upperBar = (<></>);
  if (isInDetail) {
    upperBar = (
      <Card>
        <CardContent>
          <Button
            variant="contained"
            onClick={searchOrder}
          >
            返回
          </Button>
        </CardContent>
      </Card>
    );
  } else {
    upperBar = (
      <Box>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item>
                <TextField
                  name="startDate"
                  label="Start Date"
                  type="date"
                  defaultValue="2016-01-02"
                  onChange={changeHandler}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  name="endDate"
                  label="End Date"
                  type="date"
                  defaultValue="2018-12-25"
                  onChange={changeHandler}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={searchOrder}
                >
                  搜尋
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    );
  }
  return (
    <>
      <Helmet>
        <title>Order | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          {upperBar}
          <Box sx={{ pt: 3 }}>
            <Card>
              <CardContent>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      {tableHead}
                    </TableHead>
                    <TableBody>
                      {tableContent}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SettingsView;
