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
  CBadge, CImg
} from '@coreui/react'

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Select from 'react-select';
import CIcon from '@coreui/icons-react';
import dataservice from '../../service/dataservice';
import { toast } from 'react-toastify';
import { CSVLink } from "react-csv";
import DatePicker from "react-date-picker";
import moment from "moment";



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
const headerss = [
  { label: "Transaction id", key: "paymentreferencenumber" },
  { label: "Primary Contact Name", key: "primaryguest" },
  { label: "Primary Contact Email", key: "email" },
  { label: "Mobile Number", key: "mobilenumber" },
  { label: "Guest List", key: "other" },
  { label: "Hotel", key: "hotel" },
  { label: "From Date", key: "fromdate" },
  { label: "TO Date", key: "todate" },
  { label: "Number Of Tourist", key: "pax" },
  { label: "Bracelet Buy", key: "buybracelet" },
  { label: "Bracelet Rented", key: "rentbracelet" },
  { label: "Time", key: "slotid" },
  { label: "Vehicle Parking", key: "vehicle" }

];

const TransactionLog = () => {
  var processing = process.env.PUBLIC_URL + "/processing.gif";
  const [csvdata, setCSVData] = useState([]);
  const [selectedfromdate, setFromdate] = useState([new Date()]);
  const [isprocessing, setIsProcessing] = useState(false);

  const setselectedfromdate = (e) => {
    setFromdate(e);
    //setTodate(e);

  };

  const [selectedtodate, setTodate] = useState([new Date()]);
  const setselectedtodate = (e) => {
    setTodate(e);
    var todata = e;
    var fromdata =
      selectedfromdate[0] == undefined ? selectedfromdate : selectedfromdate[0];

  };


  var url = "https://maubantourism.smartpay.ph/tourbookingphp/tempdata/";
  //var url="https://tourism-test.smartpay.ph/tourbookingphp/tempdata/";
  const gettransactiondata = () => {
    setIsProcessing(true);
    var fromdata =
      selectedfromdate[0] == undefined ? selectedfromdate : selectedfromdate[0];
    var todate =
      selectedtodate[0] == undefined ? selectedtodate : selectedtodate[0];
    dataservice("report", {
      requestfor: 'transactionlog_new', data: {
        flag: 'a',
        fromdate: moment(fromdata).format("YYYY-MM-DD"), todate: moment(todate).format("YYYY-MM-DD")
      }
    })
      .then(function (data) {
        setIsProcessing(false);
        if (data.resultkey == 1) {
          var result = data.resultvalue;

          setTransactionLog({ ...TransactionLogdata, ["data"]: result });
          if (result.length > 0) {
            let datasd = [];
            for (let index = 0; index < result.length; index++) {
              const element = result[index];
              datasd.push(
                {
                  paymentreferencenumber: element.paymentreferencenumber,
                  primaryguest: element.primaryguest,
                  email: element.email,
                  mobilenumber: element.mobilenumber,
                  other: element.other,
                  hotel: element.hotel,
                  fromdate: element.fromdate,
                  todate: element.todate,
                  pax: element.pax,
                  buybracelet: element.buybracelet,
                  rentbracelet: element.rentbracelet,
                  slotid: element.slotid,
                  vehicle: element.vehicle
                }
              );

            }
            setCSVData(datasd);
          }

        } else {
          //  notify(2,"No data found");
        }

      })
      .catch(function (edata) {
        setIsProcessing(false);
        notify(2, edata.toString(), 1);
      });



  }
  useEffect(() => {

    gettransactiondata();


  }, [])

  const search = () => {
    gettransactiondata();
  }





  const columns = [
    {
      name: 'Transaction id',
      selector: 'paymentreferencenumber',
      sortable: true,
    },
    {
      name: 'Primary Contact Name',
      selector: 'primaryguest',
      sortable: true,
    },
    {
      name: 'Primary Contact Email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Mobile Number',
      selector: 'mobilenumber',
      sortable: true,
    },
    {
      name: 'Guest List',
      selector: 'other',
      sortable: true,
    },
    {
      name: 'Hotel',
      selector: 'hotel',
      sortable: true,
    },
    {
      name: 'From Date',
      selector: 'fromdate',
      sortable: true,
    },
    {
      name: 'TO Date',
      selector: 'todate',
      sortable: true,
    },
    {
      name: 'Number Of Tourist',
      selector: 'pax',
      sortable: true,
    },
    {
      name: 'Bracelet Buy',
      selector: 'buybracelet',
      sortable: true,
    },
    {
      name: 'Bracelet Rent',
      selector: 'rentbracelet',
      sortable: true,
    },
    {
      name: 'Time ',
      selector: 'slotid',
      sortable: true,
    },
    {
      name: 'vehicle',
      selector: 'vehicle',
      sortable: true,
    },

    {
      name: 'qrcode',
      selector: 'qrcode',
      sortable: true,
      cell: d => <img width='50' height='50' src={url + d.qrcode} alt="slide 1" />,


    }
    //,
    // {
    //   name: 'Status',
    //   selector: 'isactive',
    //   sortable: true,
    //   cell: d => <CBadge color={d.isactive=="1"?"success":"danger"}>
    //                       {d.isactive=="1"?"Active":"In Active"}
    //                      </CBadge>,
    // }

  ];
  const data = [];
  const [TransactionLogdata, setTransactionLog] = useState({
    columns,
    data
  });
  return (
    <>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xl={6}>
                  <CImg
                    src={processing}
                    height="50"
                    width="50"
                    style={{ display: isprocessing == true ? "" : "none" }}
                    alt="qrcode"
                  />  Transaction Log
                  <small className="text-muted"> Report</small>
                </CCol>

              </CRow>



            </CCardHeader>
            <CCardBody>
              <div className='row'>
                <div className="col-lg-4 col-md-12 mb-4">
                  <label for="country">
                    From Date
                  </label>
                  <DatePicker
                    className="form-control"
                    value={selectedfromdate}
                    onChange={setselectedfromdate}
                  />
                </div>
                <div className="col-lg-4 col-md-12 mb-4">
                  <label for="country">
                    To Date
                  </label>
                  <DatePicker
                    className="form-control"
                    value={selectedtodate}
                    onChange={setselectedtodate}
                  />
                </div>
                <div className="col-lg-4 col-md-12 mb-4">
                  <label for="country">
                    Search
                  </label>
                  <CButton block onClick={() => search()} color="primary">
                    Search
                  </CButton>
                </div>
              </div>
              <CSVLink className="mr-1 btn btn-primary" style={{ float: "right" }} data={csvdata} headers={headerss} filename={"Transactionlog.csv"}>
                Download csv
              </CSVLink>

              <DataTableExtensions
                {...TransactionLogdata}

              >


                <DataTable
                  defaultSortField="id"
                  defaultSortAsc={false}
                  pagination
                  highlightOnHover

                />
              </DataTableExtensions>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>

  )
}
export default TransactionLog