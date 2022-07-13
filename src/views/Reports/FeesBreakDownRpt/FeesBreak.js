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
  CBadge
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
  { label: "Reference Number", key: "paymentreferencenumber" },
  { label: "Guest ", key: "pax" },
  { label: "Bracelet Buy", key: "buybracelet" },
  { label: "Bracelet Rented", key: "rentbracelet" },
  { label: "Processing Fee", key: "processingfee" },
  { label: "Boat Charge", key: "boatcharge" },
  { label: "Discount", key: "Discount" },
  { label: "Bracelet Fee", key: "BraceletFee" },
  { label: "ETAF", key: "ETAF" },
  { label: "Parking Charges", key: "prkchrg" },
  { label: "Vehicle Parking", key: "typeofvehicle" },
  { label: "Number of Vehicle", key: "countveh" },
  { label: "Boat Name", key: "boatname" },
  { label: "Boat Fee", key: "BoatFee" },
  { label: "Traveling Start Date", key: "fromdate" },
  { label: "Payment Date", key: "paymentdate" },
  { label: "Channel fee", key: "channel_fee" }

];
const FeeBreakDownRpt = () => {
  const [csvdata, setCSVData] = useState([]);
  var currentdateminuonemmonth = new Date();
  var currentdateminuonemmonth = currentdateminuonemmonth.setMonth(currentdateminuonemmonth.getMonth() - 1);
  const [selectedfromdate, setFromdate] = useState([new Date()]);
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
  const search = () => {
    gettransactiondata();
  }
  const gettransactiondata = () => {
    var fromdata =
      selectedfromdate[0] == undefined ? selectedfromdate : selectedfromdate[0];
    var todate =
      selectedtodate[0] == undefined ? selectedtodate : selectedtodate[0];
    dataservice("report", {
      requestfor: 'feebreakdown', data: {
        flag: 'a', fromdate: moment(fromdata).format("YYYY-MM-DD"), todate: moment(todate).format("YYYY-MM-DD")
      }
    })
      .then(function (data) {
        if (data.resultkey == 1) {
          var result = data.resultvalue;
          console.log(result);
          setTransactionLog({ ...TransactionLogdata, ["data"]: result });

          let datasd = [];
          for (let index = 0; index < result.length; index++) {
            const element = result[index];
            datasd.push(
              {

                BoatFee: element.BoatFee,
                Discount: element.discount,
                BraceletFee: element.BraceletFee,
                ETAF: element.ETAF,
                boatcharge: element.boatcharge,
                boatname: element.boatname,
                countveh: element.countveh,
                fromdate: element.fromdate,
                numberofdays: element.numberofdays,
                pax: element.pax,
                buybracelet: element.buybracelet,
                rentbracelet: element.rentbracelet,
                paymentreferencenumber: element.paymentreferencenumber,
                prkchrg: element.prkchrg,
                processingfee: element.processingfee,
                todate: element.todate,
                totalcharge: element.totalcharge,
                typeofvehicle: element.typeofvehicle,
                paymentdate: element.paymentdate,
                channel_fee: element.channel_fee
              }
            );

          }
          setCSVData(datasd);
        } else {
          //  notify(2,"No data found");
        }

      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });



  }
  useEffect(() => {

    gettransactiondata();


  }, [])

  const columns = [
    {
      name: 'Reference Number',
      selector: 'paymentreferencenumber',
      sortable: true,
    },
    {
      name: 'Guest ',
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
      name: 'Processing Fee',
      selector: 'processingfee',
      sortable: true,
    },
    {
      name: 'Bracelet Fee',
      selector: 'BraceletFee',
      sortable: true,
    },
    {
      name: 'Boat Charge',
      selector: 'boatcharge',
      sortable: true,
    },
    {
      name: 'ETAF',
      selector: 'ETAF',
      sortable: true,
    },
    {
      name: 'Parking Charges',
      selector: 'prkchrg',
      sortable: true,
    },
    {
      name: 'Vehicle',
      selector: 'typeofvehicle',
      sortable: true,
    },
    {
      name: 'Number of Vehicle',
      selector: 'countveh',
      sortable: true,
    },
    {
      name: 'Boat Name',
      selector: 'boatname',
      sortable: true,
    },
    {
      name: 'Boat Fee',
      selector: 'BoatFee',
      sortable: true,
    },
    {
      name: 'Discount',
      selector: 'discount',
      sortable: true,
    },
    {
      name: 'Traveling Start Date',
      selector: 'fromdate',
      sortable: true,
    },
    {
      name: 'Traveling End Date',
      selector: 'todate',
      sortable: true,
    },
    {
      name: 'Payment Date',
      selector: 'paymentdate',
      sortable: true,
    },
    {
      name: 'Channel Fee',
      selector: 'channel_fee',
      sortable: true,
    },

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
                  Fees Break Down
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
              <CSVLink className="mr-1 btn btn-primary" style={{ float: "right" }} data={csvdata} headers={headerss} filename={"FeeBreakDown.csv"}>
                Download csv
              </CSVLink>
              <DataTableExtensions
                {...TransactionLogdata}
              >


                <DataTable
                  noHeader
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
export default FeeBreakDownRpt