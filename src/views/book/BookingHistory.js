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
  CImg
} from '@coreui/react'

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Select from 'react-select';
import CIcon from '@coreui/icons-react';
import dataservice from '../service/dataservice';
import {  toast } from 'react-toastify';
import { InputDecimal } from "../commoncomponents/inputdecimal";
import DatePicker from "react-datepicker";


import uuid from 'react-uuid';

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
var url="https://maubantourism.smartpay.ph/tourbookingphp/tempdata/";
//var url="https://tourism-test.smartpay.ph/tourbookingphp/tempdata/";
const BookingHistory = () => {
  const columns = [
    {
      name: 'From Date',
      selector: 'fromdate',
      sortable: true,
    },
    {
      name: 'To Date',
      selector: 'todate',
      sortable: true,
    },
    {
      name: 'Pax',
      selector: 'pax',
      sortable: true,
    },
    // {
    //   name: 'Day Count',
    //   selector: 'numberofdays',
    //   sortable: true,
    // },
    // {
    //   name: 'Vehicle Count',
    //   selector: 'numberofvehicle',
    //   sortable: true,
    // },
    {
      name: 'Charge',
      selector: 'totalcharge',
      sortable: true,
    },
    {
      name: 'Transcation Id',
      selector: 'paymentreferencenumber',
      sortable: true,
    },
    {
      name: 'Qr Code',
     
      sortable: true,
      cell: d =>  <CImg
                    src={url+d.qrcode}
                    height="50"
                    alt="qrcode"
                  />,
    },
    {
      name: 'Action',
      selector: 'action',
      ignoreRowClick: true,
      cell: row =>  <>
      <div style={{display:row.editable=="0"?"none":""}}><CIcon name="cil-pencil" onClick={e => editdata(row, e)} className="mfe-2 custcusrsor" /></div> 
      <div> <CIcon  name="cil-magnifying-glass" onClick={e => viewbooking(row, e)} className="mfe-2 custcusrsor" /></div>
      </>
                    
     
    },
  ];
  const data = [];
  let loginuser = localStorage.getItem('userinfo') == "" || undefined ? "" : JSON.parse(localStorage.getItem('userinfo'));
  const [startDate, setStartDate] = useState(new Date());
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [bookingeditmodalpopup, setBookingEditModalPopUp] = useState(false);
  const [bookingviewmodalpopup, setBookingViewModalPopUp] = useState(false);
  const [disabledbtn, setDisabledBtn] = useState(false);

  const [citizenship, setCitizenship] = useState([]);
  const [Province, setProvince] = useState([]);
  const [Municipality, setMunicipality] = useState([]);
  const [country, setCountry] = useState([]);
  const [RawProvince, setRawProvince] = useState([]);
  const [RawMunicipality, setRawMunicipality] = useState([]);
  const [Gender, setGender] = useState([]);

  const[bookingdata,setBookingdata]=useState({
    columns,
    data
  });
  


  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }
  const [state, setState] = useState({
    description: "",
    id:"",
    isactive:true,
    touristinfo:[],
  });
  
  const editdata=(row, e) =>{
     
    console.log(row);
    setState(prevState => ({
      ...prevState,
      todate: new Date(row.todate),
      fromdate: new Date(row.fromdate),
      totalcharge: row.totalcharge,
      id:row.id,
      qrcode:row.qrcode,
      touristinfo:[]
    }));
    gettouristbyregistrationid(row.id,'e');
   
  }
 const viewbooking=(row, e)=>{
  console.log(row);
  setState(prevState => ({
    ...prevState,
    todate: new Date(row.todate),
    fromdate: new Date(row.fromdate),
    totalcharge: row.totalcharge,
    id:row.id,
    qrcode:row.qrcode,
    touristinfo:[]
  }));
  gettouristbyregistrationid(row.id,'v');
 
 }
  
  const tableData = {
    columns,
    data,
  };

  const handleChange = (e) => {
   
    const { id, value } = e.target;
    console.log(id);
     
  //  if (e.target.type === 'checkbox' ) {
  //    setState({...state, [id]: (e.target.checked==true?e.target.checked:false)});
  //  } else {
  //    setState({...state, [id]: value });
  //  }
  // const newdata = state["touristinfo"].map((item) => {
  //   if (item.uuid === id) {
  //     const updatedItem = {
  //       ...item,
  //       firstname:value
  //     };

  //     return updatedItem;
  //   }

  //   return item;
  // });
    var prop=e.target.name;
    for (let index = 0; index < state["touristinfo"].length; index++) {
      const element = state["touristinfo"][index];
      if(element.uuid==id){
        element[prop]=value;
         
    //    element.value=
      }
   
    }


  setState({...state, ["touristinfo"]: state["touristinfo"] });
 // setBookingdata({ ...bookingdata, ["data"]: newdata });
 }

 const onUpdateItem = i => {

  const newdata = bookingdata["data"].map((item) => {
    if (item.id === i) {
      const updatedItem = {
        ...item,
        description:state.description,
        isactive: state.isactive==true?"1":"0",
      };

      return updatedItem;
    }

    return item;
  });

  setBookingdata({ ...bookingdata, ["data"]: newdata });
  resetvalues();
  setBookingEditModalPopUp(!bookingeditmodalpopup);
  notify(1,`Data save successfully.`);
};


 const savedata = () => {
  //vaildation
   
  
  var saved={loggedinid:loginuser.id,registratoinid:state.id, touristdata:state.touristinfo};
  console.log(saved);
  dataservice("booking", {
    requestfor: 'updatetourist',
    data: saved
  })
  .then(function (data) {
    
    if (data.resultkey == 1) {
      setBookingEditModalPopUp(!bookingeditmodalpopup);
      notify(1,`Data save successfully.`);
    } else {
      console.log("error");
    }

  })
  .catch(function (error) {
    console.log(error);
  })
 
 };

 useEffect(()=>{
   
    getregistrationdata();
    getCitizenship();
    getCountry();
    getProvince();
    getMunicipalities();
    getGender();
    resetvalues();
  
},[])
const getGender = () => {
  let countdata = [];
  let country = ["Male", "Female", "Other"]
  for (let index = 0; index < 3; index++) {
    countdata.push({
      value: index,
      label: country[index]
    })

  }
  setGender(countdata);
}
const onChangeFromDate=e=>{
 
  setState(prevState => ({
    ...prevState,
   
    fromdate: e,
    todate: e
   
  }));
 
}
const onChangeToDate=e=>{
  console.log(e);
  setState(prevState => ({
    ...prevState,
   
    todate: e
   
  }));
}


const gettouristbyregistrationid=(registerid,popupfor)=>{
    
  dataservice("tour",{ requestfor: 'gettouristbyregid' ,data:{reg:registerid}})
  .then(function(data) {
    if(data.resultkey==1){
      var result=data.resultvalue;

      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        element.uuid=uuid();
      }




      setState(prevState => ({
        ...prevState,
        touristinfo:result
      }));
      if(popupfor=="e"){
        setBookingEditModalPopUp(!bookingeditmodalpopup);
      }else{
        setBookingViewModalPopUp(!bookingviewmodalpopup);
      }
     
       //setBookingdata({ ...bookingdata, ["data"]: result });
      
    }else{
    //  notify(2,"No data found");
    }
        
    })
    .catch(function(edata){
        notify(2,edata.toString(),1);
    });



}


const getregistrationdata=()=>{
    
  dataservice("booking",{ requestfor: 'getbooking' ,data:{}})
  .then(function(data) {
    if(data.resultkey==1){
      var result=data.resultvalue;
       setBookingdata({ ...bookingdata, ["data"]: result });
    }else{
    //  notify(2,"No data found");
    }
        
    })
    .catch(function(edata){
        notify(2,edata.toString(),1);
    });



}

 const openpopup=()=>{
  resetvalues();
 // setCountryModalPopUp(!countrymodalpopup);
 }

 const resetvalues=()=>{
  setState(prevState => ({
    ...prevState,
    description: "",
    price:0,
    id:"",
    isactive:true,
  }));
 }


 const getCitizenship = () => {
  dataservice("citizenship", { requestfor: 'getcitizenship', data: { flag: 'a' } })
    .then(function (data) {
      if (data.resultkey == 1) {
        var result = data.resultvalue;
        let countdata = [];
        //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
      
        for (let index = 0; index < result.length; index++) {
          //   
          let item = result[index];
          countdata.push({ value: item.id, label: item.description })
          
        }
      
        setCitizenship(countdata);
      } else {
        //  notify(2,"No data found");
      }
    })
    .catch(function (edata) {
      notify(2, edata.toString(), 1);
    });

}

const getCountry = () => {
 
  dataservice("country", { requestfor: 'getcountry', data: { flag: 'a' } })
    .then(function (data) {
      if (data.resultkey == 1) {
        var result = data.resultvalue;
        let countdata = [];
        //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
       // countdata.push({ value: "-1", label: "Select Country" })
        for (let index = 0; index < result.length; index++) {
          //   
          let item = result[index];
          countdata.push({ value: item.id, label: item.description })
         
        }
        setCountry(countdata);
      } else {
        //  notify(2,"No data found");
      }
    })
    .catch(function (edata) {
      notify(2, edata.toString(), 1);
    });

}

const getProvince = () => {
  dataservice("province", { requestfor: 'getprovince', data: { flag: 'a' } })
  .then(function (data) {
    if (data.resultkey == 1) {
      var result = data.resultvalue;
     
      setRawProvince(result);
    
      var Provincedata=getdropdownarr(result);
      setProvince(Provincedata);
      //setProvince(countdata);
    } else {
      //  notify(2,"No data found");
    }
  })
  .catch(function (edata) {
    notify(2, edata.toString(), 1);
  });

}

const getMunicipalities = () => {

dataservice("municipality", { requestfor: 'getmunicipality', data: { flag: 'a' } })
  .then(function (data) {
    if (data.resultkey == 1) {
      var result = data.resultvalue;
      var Municipalitydata=getdropdownarr(result);
      setMunicipality(Municipalitydata);
      let countdata = [];
      //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
      for (let index = 0; index < result.length; index++) {
        //   
        let item = result[index];
        countdata.push({ value: item.id, label: item.description })
        if (countdata.length === 1) {
         // setSelectedMunicipality(item.id);
        }
      }
     // setMunicipality(countdata);
      setRawMunicipality(result);
    } else {
      //  notify(2,"No data found");
    }
  })
  .catch(function (edata) {
    notify(2, edata.toString(), 1);
  });


}
const getdropdownarr=(result)=>{
  let countdata = [];
  //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
  for (let index = 0; index < result.length; index++) {
    let item = result[index];
    countdata.push({ value: item.id, label: item.description })
  
  }
  return countdata;
}
//tourist
const handleChangeOptionGender= index => e =>{
 
 
  state["touristinfo"][index]["gender"]=e.value;
  setState({...state, ["touristinfo"]: state["touristinfo"] });
  
}
const onChangeTouristDate= index => e =>{
   
  var cusdate=e.getFullYear()+"-"+(e.getMonth() + 1)+"-"+e.getDate();
  state["touristinfo"][index]["dob"]=cusdate;
  setState({...state, ["touristinfo"]: state["touristinfo"] });
}
const handleChangeOptionCountry= index => e =>{
  
 
  state["touristinfo"][index]["nationalityid"]=e.value;
  setState({...state, ["touristinfo"]: state["touristinfo"] });
  
}
const handleChangeOptionProvince= index => e =>{
   
  
   state["touristinfo"][index]["provinceid"]=e.value;
   setState({...state, ["touristinfo"]: state["touristinfo"] });
   
 }
 
const handleChangeOptionMunicipality= index => e =>{
   
  
   state["touristinfo"][index]["municipalityid"]=e.value;
   setState({...state, ["touristinfo"]: state["touristinfo"] });
   
 }


  return (
    <>
    
   <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol xl={6}>
                Booking 
                <small className="text-muted"> History</small>
              </CCol>
                <CCol xl={6} style={{textAlign:"end"}}>
                {/* <CButton
                    onClick={() => openpopup('n',{})}
                    className="mr-1"
                    color="primary"
                
                  >
                    Add New
                
                  </CButton> */}
            
              </CCol>
            </CRow>
            
           
         
          </CCardHeader>
          <CCardBody>
          <CModal show={bookingeditmodalpopup} onClose={() => setBookingEditModalPopUp(!bookingeditmodalpopup)} size="xl">
              <CModalHeader closeButton>
              <CModalTitle>Booking    <small className="text-muted"> Detail</small> </CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol md="12">
                  <CForm>
                  <CRow>
                      <CCol xs="3" >
                        <CLabel >From Date</CLabel>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-calendar" /> 
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <DatePicker readOnly={true} dateFormat="yyyy-MM-dd" minDate={new Date()}   className="form-control" selected={state.fromdate} onChange={date => onChangeFromDate(date)} />
                          
                        </CInputGroup>
                      </CCol>
                      <CCol xs="3" >
                        <CLabel >To Date</CLabel>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-calendar" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <DatePicker  readOnly={true} dateFormat="yyyy-MM-dd" minDate={state.fromdate} className="form-control" selected={state.todate} onChange={date => onChangeToDate(date)} />
                          

                          {/* <CInput   type="text" value={state.todate} id="vlastname" placeholder="Enter Last Name" /> */}
                        </CInputGroup>
                      </CCol>
                      <CCol xs="3">
                        <CFormGroup row>
                         
                          <CCol md="9" >
                              <CLabel  htmlFor="isactive">Charge</CLabel><br></br>
                              <CLabel  htmlFor="isactive">{state.totalcharge}</CLabel>
                          </CCol>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="3">
                        <CFormGroup row>
                         
                          <CCol md="9"  >
                              <CLabel  htmlFor="isactive">Qr Code</CLabel><br></br>
                              <CImg
                                src={url+state.qrcode}
                                height="50"
                                alt="qrcode"
                              />
                            
                          </CCol>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow >
                      <table className="table">
                        <thead>
                          <tr>
                            <th style={{ width: "10%" }}>First Name</th>
                            <th style={{ width: "10%" }}>Last Name</th>
                          
                            <th style={{ width: "10%" }}>DOB</th>
                            <th style={{ width: "15%" }}>Gender</th>
                            <th style={{ width: "15%" }}>Country</th>
                            <th style={{ width: "15%" }}>Province</th>
                            <th style={{ width: "15%" }}>Municipality</th>
                           
                          </tr>
                        </thead>
                        <tbody>
                        {(() => {
                              
                              const rows = [];
                              if (state.touristinfo.length > 0) {
                                for (let i = 0; i < state.touristinfo.length; i++) {
                                  var _touristinfo = state.touristinfo[i];
                                  var _country= (country.filter(x=>x.value==_touristinfo.nationalityid)[0]["value"]);
                                  var _province= RawProvince.filter(x=>x.id==_touristinfo.provinceid)[0]["id"];
                                  var _municipality= RawMunicipality.filter(x=>x.id==_touristinfo.municipalityid)[0]["id"];
                                  //_veh.checked = false;
                                  rows.push(<> <tr>
                            
                                    <td>
                                      
                                    <CInput onChange={handleChange}  name={"firstname"} type="text" value={state.touristinfo[i].firstname} id={state.touristinfo[i].uuid} placeholder="Enter First Name" />
                                      
                                 
                                    </td>
                                    <td>
                                    <CInput onChange={handleChange} name={"lastname"}   type="text" value={state.touristinfo[i].lastname} id={state.touristinfo[i].uuid} placeholder="Enter Last Name" />
                                     
                                   
                                      </td>
                                     
                                      <td>
                                      <DatePicker  dateFormat="yyyy-MM-dd"  
                                       className="form-control" selected={new Date(_touristinfo.dob)} onChange={ onChangeTouristDate(i)} />
                       
                                      {/* {} */}
                                      </td>
                                      <td>
                                      <Select
                                className="dropdown"
                                placeholder="Select"
                                value={Gender.find(obj => obj.value === parseFloat(_touristinfo.gender) )} // set selected values
                                options={Gender}
                                onChange={handleChangeOptionGender(i)}  // set list of the data
                                 />
                               
                                      </td>
                                      <td>
                                      <Select
                                          id="CountryofOrigin"
                                          className="dropdown"
                                          placeholder="Select"
                                          value={country.find(obj => obj.value ===_country)} // set selected values
                                          options={country} // set list of the data
                                          onChange={handleChangeOptionCountry(i)}
                                         // assign onChange function
                                          />
                                   
                                      </td>
                                      <td>
                                      <Select
                                          id="Province"
                                          className="dropdown"
                                          placeholder="Select"
                                          value={Province.find(obj => obj.value === _province.toString())} // set selected values
                                          options={Province}  // set list of the data
                                          onChange={handleChangeOptionProvince(i)}
                                         // assign onChange function
                                          />
                                    
                                      </td>
                                      <td>
                                      <Select
                                          id="Municipality"
                                          className="dropdown"
                                          placeholder="Select"
                                          value={Municipality.find(obj => obj.value === _municipality.toString())} // set selected values
                                          options={Municipality}  // set list of the data
                                          onChange={handleChangeOptionMunicipality(i)}
                                         // assign onChange function
                                          />
                                      {/* {RawMunicipality.filter(x=>x.id==_touristinfo.municipalityid)[0]["description"]} */}
                                      </td>
                                
      
      
                                  </tr></>);
                                  
                                }
                                return rows;
                              }

                      })()}
                      
                        </tbody>
                      </table>
                      {/* 
                     */}
                    </CRow>
                   
                  </CForm>

                </CCol>

              </CModalBody>
              <CModalFooter>
                <CButton color="primary" disabled={disabledbtn}  onClick={() => savedata()}>Save</CButton>{' '}
                <CButton color="secondary" onClick={() => setBookingEditModalPopUp(!bookingeditmodalpopup)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
          <CModal show={bookingviewmodalpopup} onClose={() => setBookingViewModalPopUp(!bookingviewmodalpopup)} size="xl">
              <CModalHeader closeButton>
              <CModalTitle>Booking    <small className="text-muted"> Detail</small> </CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol md="12">
                  <CForm>
                    <CRow>
                    <CCol xs="3" >
                        <CLabel >From Date</CLabel>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-calendar" /> 
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <DatePicker readOnly={true} dateFormat="yyyy-MM-dd" minDate={new Date()}   className="form-control" selected={state.fromdate} onChange={date => onChangeFromDate(date)} />
                          
                        </CInputGroup>
                      </CCol>
                      <CCol xs="3" >
                        <CLabel >To Date</CLabel>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-calendar" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <DatePicker  readOnly={true} dateFormat="yyyy-MM-dd" minDate={state.fromdate} className="form-control" selected={state.todate} onChange={date => onChangeToDate(date)} />
                          

                          {/* <CInput   type="text" value={state.todate} id="vlastname" placeholder="Enter Last Name" /> */}
                        </CInputGroup>
                      </CCol>
                     <CCol xs="3">
                        <CFormGroup row>
                         
                          <CCol md="9" >
                              <CLabel  htmlFor="isactive">Charge</CLabel><br></br>
                              <CLabel  htmlFor="isactive">{state.totalcharge}</CLabel>
                          </CCol>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="3">
                        <CFormGroup row>
                         
                          <CCol md="9"  >
                              <CLabel  htmlFor="isactive">Qr Code</CLabel><br></br>
                              <CImg
                                src={url+state.qrcode}
                                height="50"
                                alt="qrcode"
                              />
                            
                          </CCol>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow >
                      <table className="table">
                        <thead>
                          <tr>
                            <th style={{ width: "10%" }}>First Name</th>
                            <th style={{ width: "10%" }}>Last Name</th>
                            <th>Gender</th>
                            <th>DOB</th>
                            <th>Country</th>
                            <th>Province</th>
                            <th>Municipality</th>
                           
                          </tr>
                        </thead>
                        <tbody>
                        {(() => {
                              
                              const rows = [];
                              if (state.touristinfo.length > 0) {
                                for (let i = 0; i < state.touristinfo.length; i++) {
                                  var _touristinfo = state.touristinfo[i];
                                  //_veh.checked = false;
                                  rows.push(<> <tr>
                            
                                    <td>
                                    {_touristinfo.firstname}
                                    </td>
                                    <td>
                                    {_touristinfo.lastname}
                                      </td>
                                      <td>
                                      {_touristinfo.gender=="0"?"Male":(_touristinfo.gender=="1"?"Female":"Other")}
                                      </td>
                                      <td>
                                      {_touristinfo.dob}
                                      </td>
                                      <td>
                                        
                                      {country.filter(x=>x.value==_touristinfo.nationalityid)[0]["label"]}
                                      </td>
                                      <td>
                                      {RawProvince.filter(x=>x.id==_touristinfo.provinceid)[0]["description"]}
                                      </td>
                                      <td>
                                      {RawMunicipality.filter(x=>x.id==_touristinfo.municipalityid)[0]["description"]}
                                      </td>
                                
      
      
                                  </tr></>);
                                  
                                }
                                return rows;
                              }

                      })()}
                      
                        </tbody>
                      </table>
                      {/* 
                     */}
                    </CRow>
                   
                  </CForm>

                </CCol>

              </CModalBody>
              {/* <CModalFooter>
                <CButton color="primary" disabled={disabledbtn}  onClick={() => savedata()}>Save</CButton>{' '}
                <CButton color="secondary" onClick={() => setCountryModalPopUp(!countrymodalpopup)}>Cancel</CButton>
              </CModalFooter> */}
            </CModal>

          <DataTableExtensions
      {...bookingdata}
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

export default BookingHistory
