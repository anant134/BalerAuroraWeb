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
const FeesComputation = (traveldata) => {
    ;
  const [localfeesinfodata, setLocalFeesInfoData] = useState([]);

  useEffect(()=>{
    setLocalFeesInfoData(...localfeesinfodata,traveldata.data);
  },[])
    return (<> 
        <CRow>
          <CCol xs="6">
            <CLabel htmlFor="ccnumber">{localfeesinfodata.numberofguest}</CLabel>
          </CCol>
          <CCol xs="4">
            <CLabel htmlFor="ccnumber">s</CLabel>
          </CCol>
          <CCol xs="2">
            <CLabel htmlFor="ccnumber">d</CLabel>
          </CCol>
        </CRow>
   
    </>);
};

export default FeesComputation;