import React, { useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { currentUser } from 'src/components/DashboardSidebar';

const submitData = {
  EmpId: '',
  Phone: ''
};

const changeHandler = (e) => {
  const { name, value } = e.target;
  if (name === 'id') {
    submitData.EmpId = value;
  } else if (name === 'phone') {
    submitData.Phone = value;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const userData = useContext(currentUser);
  const submitHandler = () => {
    // e.preventDefault();
    fetch('https://fs.mis.kuas.edu.tw/~s1106137135/webFinalPHP/doLogin.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const user = data.user[0];
          userData.EmpId = user.EmpId;
          userData.EmpName = user.EmpName;
          userData.JobTitle = user.JobTitle;
          userData.DeptId = user.DeptId;
          userData.City = user.City;
          userData.Address = user.Address;
          userData.Phone = user.Phone;
          userData.ZipCode = user.ZipCode;
          userData.MonthSalary = user.MonthSalary;
          userData.AnnualLeave = user.AnnualLeave;
        } else {
          alert(data.msg);// eslint-disable-line no-alert
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().max(255).required('ID is required'),
              password: Yup.string().max(255).required('Phone number is required')
            })}
            onSubmit={() => {
              navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              touched
            }) => (
              <form onSubmit={submitHandler}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                </Box>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    Sign in with your ID
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Your ID"
                  margin="normal"
                  name="id"
                  onBlur={handleBlur}
                  onChange={changeHandler}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Your Phone Number"
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={changeHandler}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    onClick={submitHandler}
                    variant="contained"
                    component={RouterLink}
                    to="/app/dashboard"
                  >
                    Sign in now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
