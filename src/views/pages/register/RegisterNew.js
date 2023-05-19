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
import TravelInfo from '../register/NewTravelInfoBA'
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

const RegisterNew = () => {
  const history = useHistory();
  var Background = process.env.PUBLIC_URL + "/bgnew.jpg";
  const [contextdata, setcontextdata] = useState();
  const [isguestinfo, setisguestinfo] = useState(false);
  const [registrationmodalpopup, setRegistrationModalPopUp] = useState(false)
  const [travelinfo, setTravelinfo] = useState({
    numberofguest: 0,
    startdate: new Date(),
    enddate: new Date(),
    arrivetime: "",
    guestinfo: [],
    hotel: [],
    hotelbookingref: "",
    fees: [{ feefor: "ETAF", discountable: true, amount: 0, sequencenumber: 1, id: 1, rentprice: 0 },
    { feefor: "Computer", discountable: true, amount: 0, sequencenumber: 2, id: 2, rentprice: 0 },
    { feefor: "Bracelet", discountable: true, amount: 0, sequencenumber: 3, id: 3, rentprice: 0 },
    { feefor: "Discount", discountable: true, amount: 0, sequencenumber: 4, id: 4, rentprice: 0 },
    { feefor: "Total", discountable: false, amount: 0, sequencenumber: 5, id: 5, rentprice: 0 }
    ],
    isguest: isguestinfo,
    isBulkUpload: false,
    destination: [],
    tourtype: 1,
    finaldiscount: 0
  });
  const [feesdata, setFeesData] = useState([]);
  const [show, toggleShow] = useState();
  const [disclaimer, setDisclaimer] = useState("");
  const [destination, setDestination] = useState([]);
  const clickevent = e => {

  }

  const setaction = () => {
    if (isguestinfo == true) {
      // Savedata();
      //
    } else {
      // setguestactivepostion(0);
      // setselectedguest(guestarr[0])
      setisguestinfo(true)
    }
  }
  const backaction = () => {
    setisguestinfo(false);
  }
  const getfees = () => {
    dataservice("fees", { requestfor: 'getfees', data: { flag: 'a' } })
      .then(function (data) {

        if (data.resultkey == 1) {
          //   
          var result = data.resultvalue

          setFeesData({ ...feesdata, data: result });
        } else {
          //  notify(2,"No data found");
        }

      })
      .catch(function (edata) {

        notify(2, edata.toString(), 1);
      });



  }


  useEffect(() => {
    //getfees();

    getpagedata();
  }, [])
  const editbook = () => {
    window.location.href = window.location.pathname + "#/editbooking";
  }
  const getpagedata = () => {
    dataservice("staticpage", { requestfor: 'getstaticpages', data: {} })
      .then(function (data) {
        if (data.resultkey == 1) {
          var result = data.resultvalue;
          if (result.length > 0) {
            var _filter = result.filter(x => x.id == 1);
            var pagedata = "";
            if (_filter.length > 0) {
              pagedata = _filter[0].pagedata;
            }
            setDisclaimer(pagedata);
            if (pagedata != "") {
              setRegistrationModalPopUp(true);
            }
          }
        } else {
          //  notify(2,"No data found");
        }
      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });

  }

  const [gacc, setgacc] = useState(travelinfo);
  return (<>


    <div className="c-app c-default-layout flex-row align-items-center bg" style={{
      background: `url(${Background})`, backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
      backgroundSize: 'cover'
    }}  >
      <CContainer  >

        <Card style={{ background: "transparent", border: "none" }} >
          <userContext.Provider value={{ gacc, setgacc }}>
            <Card.Body>
              <div className="row">
                <div className="col-12" style={{ display: isguestinfo == true ? "none" : "" }}>
                  <TravelInfo data={gacc} destinationdata={destination}></TravelInfo>
                </div>
              </div>

            </Card.Body>

          </userContext.Provider>

        </Card>
      </CContainer>


    </div >
  </>)
}
export default RegisterNew;
