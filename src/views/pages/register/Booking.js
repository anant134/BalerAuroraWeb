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
import FeesComputation from './FeesComputation'
import TravelInfo from './TravelInfo'
import GuestInfo from './GuestInfo'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { userContext } from '../../userContext'
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

const Booking = () => {
    return(<>
        <div className="wrapper">
            <div className="inner">
                  <div id="wizard">
                        <h4>Choose Date</h4>
                        <section>
                                <div className="form-row">
                                    <div className="form-holder">
                                        <input type="text" className="form-control datepicker-here pl-85" data-language='en' data-date-format="dd - m - yyyy" id="dp1"></input>
                                        <span className="lnr lnr-chevron-down"></span>
                                        <span className="placeholder">Check in :</span>
                                    </div>
                                    <div className="form-holder">
                                        <input type="text" className="form-control datepicker-here pl-96" data-language='en'  data-date-format="dd - m - yyyy" id="dp2"></input>
                                        <span className="lnr lnr-chevron-down"></span>
                                        <span className="placeholder">Check out :</span>
                                    </div>
                                </div>
                        </section>
                  </div>
            </div>
        </div>
    </>)
}
export default Booking;