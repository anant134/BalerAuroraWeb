import React, { useState} from 'react';
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
import {  toast } from 'react-toastify';



const notify=(type,message,systemerror)=>{
  switch (type) {
    case 1:
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER
      });
      break;
    case 2:
      var dtlmsg;
      if(systemerror!==undefined){
      dtlmsg=<div>Please contact to administrator!<br></br>{message}</div>;
      }else{
        dtlmsg=<div>{message}</div>;
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

var Background=process.env.PUBLIC_URL+"/smartpaytarp2.jpg";
const Paymentresult = () => {
  


  return (
    <>
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
        <CCol md="8">
            <CCardGroup>
              <CCard className="p-4"  style={{
                  width: '44%',
                  background: `url(${Background})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'top center',
                  backgroundSize: 'cover'
                  
                  }}>
                <CCardBody>
                </CCardBody>
              </CCard>
              <CCard className="text-white py-5 d-md-down-none" >
                <CCardBody className="text-center">
                <CForm style={{color:"black"}}>
                <p><center> Mauban Arts Culture and Tourism (M-ACT) ONLINE BOOKING & RESERVATION</center></p> <br></br>
                    <p><center>Thank you very much for your booking and reservation</center></p> <br></br>
                    <address> Kindly settle the payment within 24 hours. We will notify 
                        you through your registered e-mail once we have validated your payment.</address>
                    <address>Thank you again, for questions and clarifications you may call
                        Mauban Tourism office 
                        at (042) 788 1292 or Contact Mauban </address>
                        <p><center> Tourism on Messenger: </center></p> 
                        <p><center> <a href= "www.facebook.com/mauban.tourism">www.facebook.com/mauban.tourism</a> </center></p> 
                    
            </CForm>
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

export default Paymentresult
