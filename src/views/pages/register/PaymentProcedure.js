import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CModal,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CForm,
  CInputGroupPrepend,
  CInputGroupText,
  CInputGroup,
  CInput,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CModalFooter,
  CBadge,
  CContainer,
  CSelect,
  CCardFooter
} from '@coreui/react'

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Select from 'react-select';
import CIcon from '@coreui/icons-react';
import dataservice from '../../service/dataservice';
import { toast } from 'react-toastify';
import { InputDecimal } from "../../commoncomponents/inputdecimal";
import DatePicker from 'react-date-picker';
import { discounticon } from 'src/assets/icons/discounticon';
import moment from 'moment';
import uuid from 'react-uuid';
import FeesComputation from '../register/FeesComputation'
import TravelInfo from '../register/TravelInfo'
import GuestInfo from '../register/GuestInfo'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { userContext } from '../../../views/userContext'
import '../../../scss/bootstrap.css';
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

const PaymentProcedure = () => {
  const history=useHistory();
    var Background=process.env.PUBLIC_URL+"/bgnew.jpg";
    const [contextdata, setcontextdata] = useState();
    const [PaymentProcedure, setPaymentProcedure] = useState("");

  

useEffect(()=>{
    getpagedata();
},[])

  const getpagedata=()=>{
    dataservice("staticpage",{ requestfor: 'getstaticpages' ,data:{}})
    .then(function(data) {
      if(data.resultkey==1){
        var result=data.resultvalue;
        if(result.length>0){
            var _filter=result.filter(x=>x.id==3);
            var pagedata="";
            if(_filter.length>0){
                pagedata=_filter[0].pagedata;
            }
            setPaymentProcedure(pagedata);
          
          
          
        }
         
        // setSeteditorval({ ...editorvalue, result });
        // setSetedit({ ...edit, ["value"]: result});
        //setFeesdata({ ...feedata, ["data"]: result });
      }else{
      //  notify(2,"No data found");
      }
          
      })
      .catch(function(edata){
          notify(2,edata.toString(),1);
      });
  
  } 

    return (<>
     

     <div className="c-app c-default-layout flex-row align-items-center bg" style={{  background: `url(${Background})`,backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center',
    backgroundSize: 'cover'}}  >
         <CContainer  >
          
            <Card  >
                <Card.Body>
                    <div className="row">
                     
                    <CCol md="12">
                        <>
                        <div dangerouslySetInnerHTML={{ __html: PaymentProcedure }}></div>
                        </>   
                    </CCol>
                    
                       
                    </div>
                       
                </Card.Body>
              
                
            </Card>
         </CContainer>
      
    </div>
    </>)
}
export default PaymentProcedure;
