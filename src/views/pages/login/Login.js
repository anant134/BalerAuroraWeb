import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import dataservice from '../../service/dataservice';
import { toast } from 'react-toastify';



const notify = (type, message, systemerror) => {
  switch (type) {
    case 1:
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER
      });
      break;
    case 2:
      var dtlmsg;
      if (systemerror !== undefined) {
        dtlmsg = <div>Please contact to administrator!<br></br>{message}</div>;
      } else {
        dtlmsg = <div>{message}</div>;
      }

      toast.error(<div>
        <CIcon name="cil-warning" /> Error

        {dtlmsg}

      </div>, {
        position: toast.POSITION.TOP_CENTER
      });
      break;

    default:
      break;
  }
}

var Background = process.env.PUBLIC_URL + "/background.png";
const Login = () => {
  let history = useHistory();
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }
  const Menu = (_userid) => {
    dataservice("user", { requestfor: 'getmenu', data: { id: _userid } })
      .then(function (data) {
        if (data.resultkey == 1) {
          var result = data.resultvalue;
          localStorage.setItem('menu', JSON.stringify(result));
          history.push('/dashboard');
        }
      });
  }

  const Signin = () => {

    //validation
    if (state.username.length && state.password.length) {
      dataservice("user", { requestfor: 'userauth', data: { flag: 'auth', password: state.password, username: state.username } })
        .then(function (data) {
          if (data.resultkey == 1) {
            var result = data.resultvalue[0];
            notify(1, `Welcome ${result.username}!`);
            localStorage.setItem('userinfo', JSON.stringify(result));

            Menu(result.id);
            history.push('/dashboard');

          } else {
            notify(2, "Invaild username/password");
          }

        }).catch(function (edata) {
          notify(2, edata.toString(), 1);
          //console.log(' movies:', edata);
        });
    } else {
      if (state.username.length == 0) {
        notify(2, "Please enter email id/username !");
      } else if (state.password.length == 0) {
        notify(2, "Please enter password !");
      }
    }




  }


  return (
    <>
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput onChange={handleChange} type="text" id="username" placeholder="Enter Username/Email ID" />
                        {/* <CInput type="text" placeholder="Username" autoComplete="username" /> */}
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput onChange={handleChange} id="password" type="password" placeholder="Enter Password" />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary" onClick={Signin} className="px-4">Login</CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">Forgot password?</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white py-5 d-md-down-none" style={{
                  width: '44%',
                  background: `url(${Background})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'top center',
                  backgroundSize: 'cover'

                }}>
                  <CCardBody className="text-center">

                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>

    </>
  )
}

export default Login
