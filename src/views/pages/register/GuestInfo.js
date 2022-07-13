import React, { useState, useEffect,useContext } from 'react'
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
import { userContext } from 'src/views/userContext';

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
const GuestInfo = () => {
  const {gacc, setgacc}=useContext(userContext);
  const [localtravelinfodata, setLocalTravelInfoData] = useState([]);
  const [selectedguest, setSelectedGuest] = useState([{Firstname:"",Middlename:"",Lastname:"",DOB:new Date(),Citizenship:"",
  CountryofOrigin:"",Province:{},Municipality:{},Gender:"",Address:"",Mobilenumber:"",
  emailid:"",ismaubancitizen:false,filedata:""}]);
  
  const [guestactivepostion, setGuestActivePostion] = useState(0);
  const [selecteddob, setSelectedDOB] = useState();
  const [selectedCS, setSelectedCS] = useState();
  const [citizenship, setCitizenship] = useState([]);  
  const [selectedCOO, setSelectedCOO] = useState();
  const [country, setCountry] = useState([]);  
  const [Gender, setGender] = useState([]);
  
  const [Province, setProvince] = useState([]);
  const [RawProvince, setRawProvince] = useState([]);

  const [Municipality, setMunicipality] = useState([]);
  const [RawMunicipality, setRawMunicipality] = useState([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState([]);

  const setselectguest=e=>{
    setGuestActivePostion(e);
  }
  useEffect(()=>{
    setLocalTravelInfoData(gacc);
    getCitizenship();
    getCountry();
    getGender();
    getProvince();
    getMunicipalities();
    ddd();
  },[])
  
  useEffect(()=>{
    if(gacc.fees!=undefined){
     
      alert('set gcc --guest');
      setLocalTravelInfoData(gacc);
    
    }
   
  },[gacc]);
  useEffect(()=>{  
    
     
    alert('set local');
    // if(localtravelinfodata!=undefined){
    //   if(localtravelinfodata.guestinfo!=undefined){
    //     if(localtravelinfodata.guestinfo.length>0){
    //       var guestinfo=localtravelinfodata.guestinfo[guestactivepostion];
    //        
    //       setSelectedGuest(guestinfo);
    //       if(guestinfo.DOB!=undefined){
    //         setSelectedDOB(guestinfo.DOB);
    //        }
    //        if(guestinfo.Citizenship!=""){
    //         setSelectedCS(guestinfo.Citizenship);
    //        }else{
    //         setSelectedCS("1");
    //        }
    //        if(guestinfo.CountryofOrigin!=""){
    //         setSelectedCS(guestinfo.CountryofOrigin);
    //        }else{
    //         setSelectedCS(country[0].value);
    //        }
    //        if(guestinfo.Gender!=""){
    //         setSelectedCS(guestinfo.Gender);
    //        }else{
    //         setSelectedCS(Gender[0].value);
    //        }
    //     }
        
    //   }
    // }
  },[localtravelinfodata?.guestinfo]);

  const ddd=()=>{
    setSelectedCS("1");
  }

  useEffect(()=>{
     
    alert(selectedCS);

  },[selectedCS])
  useEffect(()=>{
     
    if(localtravelinfodata!=undefined){
      if(localtravelinfodata.guestinfo!=undefined){
        var guestinfo=localtravelinfodata.guestinfo[guestactivepostion];
        
       setSelectedGuest(guestinfo);
       if(guestinfo.DOB!=undefined){
        setSelectedDOB(guestinfo.DOB);
       }
       if(guestinfo.Citizenship!=""){
        setSelectedCS(guestinfo.Citizenship);
       }else{
        setSelectedCS(citizenship[0].value);
       }
       if(guestinfo.CountryofOrigin!=""){
        setSelectedCS(guestinfo.CountryofOrigin);
       }else{
        setSelectedCS(country[0].value);
       }
       if(guestinfo.Gender!=""){
        setSelectedCS(guestinfo.Gender);
       }else{
        setSelectedCS(Gender[0].value);
       }
      
       
      // 
    }
  }
  },[guestactivepostion]);
  
 
  const handleChange=e=>{
     console.log(e);
     
     const { id, value } = e.target;

     var guestinfo=localtravelinfodata.guestinfo[guestactivepostion];
      
     if (e.target.type === 'file' ) {
       //guestarr[guestactivepostion][id] = e.target.files[0];
       setSelectedGuest({ ...selectedguest, [id]: e.target.files[0] });
     

     }else{
         //setguestarr({...guestarr, [id]: value });
      // guestarr[guestactivepostion][id] = value;
   
   
       //setVehiclesData({ ...guestarr, guestarr });
       setSelectedGuest({ ...selectedguest, [id]: value });
       guestinfo[id]=value;
     }
  }
  const onChangeDateOfBirth=e=>{
    var dob = e;

    //var ndob = moment(e).format("YYYY-MM-DD");
    //setDOB(ndob);
    var today = new Date();
    var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));

    var guestinfo=localtravelinfodata.guestinfo[guestactivepostion];
    guestinfo["DOB"]=dob;
    setSelectedDOB(dob);
   
  }
  const handleChangeCS=e=>{
    
    var guestinfo=localtravelinfodata.guestinfo[guestactivepostion];
    guestinfo["Citizenship"]= e.value;
    setSelectedCS( e.value);
    //bind province base on country
   
  }
  const handleChangeCOO=e=>{
    var guestinfo=localtravelinfodata.guestinfo[guestactivepostion];
    guestinfo["CountryofOrigin"]= e.value;
    setSelectedCOO( e.value);
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
        countdata.push({ value: "-1", label: "Select Country" })
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

const getProvince = () => {
    dataservice("province", { requestfor: 'getprovince', data: { flag: 'a' } })
    .then(function (data) {
      if (data.resultkey == 1) {
        var result = data.resultvalue;
        let countdata = [];
        //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
        for (let index = 0; index < result.length; index++) {
          //   
        //   ;
          let item = result[index];
          countdata.push({ value: item.id, label: item.description })
        
        }
        setRawProvince(result);
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
        let countdata = [];
        //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
        for (let index = 0; index < result.length; index++) {
          //   
          let item = result[index];
          countdata.push({ value: item.id, label: item.description })
          if (countdata.length === 1) {
            setSelectedMunicipality(item.id);
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

const handleChangeOptionProvince = e => {
  // setSelectedProvince(e.value);

  // guestarr[guestactivepostion]["Province"] = e.value;

  // setselectedguest({ ...selectedguest, ["Province"]: e.value });

}
const handleChangeOptionMunicipality = e => {
  // setSelectedMunicipality(e.value);

  // guestarr[guestactivepostion]["Municipality"] = e.value;

  // setselectedguest({ ...selectedguest, ["Municipality"]: e.value });
}
const handleChangeOptionGender = e => {

  // guestarr[guestactivepostion]["Gender"] = e.value;

  // setselectedguest({ ...selectedguest, ["Gender"]: e.value });
}


  return (<>
    
    
    <h5>Guest</h5>
    <CRow>
       <CCol xs="8">

       <CCardBody>
                          <CRow>
                          <CCol md="3">
                          {localtravelinfodata.guestinfo &&
                               localtravelinfodata.guestinfo.map((guestinfo, index) => {
                                 return( <CButton block  onClick={() => setselectguest(index)} variant={index == guestactivepostion ? "" : "outline"} color="success">Guest {index + 1} </CButton>)
                               })}
                        
                             


                            </CCol>
                                 <CCol md="9">
                                     <CRow>
                                      <CCol xs="4">
                                        <CFormGroup >
                                          <CLabel htmlFor="ccnumber">First name</CLabel>
                                          <CInput onChange={handleChange} value={selectedguest.Firstname} type="text" id="Firstname" placeholder="First Name" />
                                        </CFormGroup>
      
                                      </CCol>
                                      <CCol xs="4">
                                      <CFormGroup >
                                        <CLabel htmlFor="ccnumber">Last name</CLabel>
                                        <CInput onChange={handleChange} type="text" value={selectedguest.Lastname} id="Lastname" placeholder="Last name" />
                                      </CFormGroup>

                                    </CCol>
                                      <CCol xs="4">
                                      <CFormGroup >
                                        <CLabel htmlFor="ccnumber">Date Of Birth</CLabel>
                                        <DatePicker

                                          value={selecteddob}
                                          onChange={onChangeDateOfBirth}

                                        />
                                      </CFormGroup>

                                    </CCol>
                                    <CCol xs="4">
                                        <CFormGroup >
                                          <CLabel htmlFor="ccnumber">Citizenship</CLabel>
                                          <Select
                                            className="dropdown"
                                            placeholder="Select Citizenship"
                                            value={citizenship.find(obj => obj.value === selectedCS)} // set selected values
                                            options={citizenship} // set list of the data
                                            onChange={handleChangeCS} // assign onChange function
                                          />
                                        </CFormGroup>

                                      </CCol>
                                      <CCol xs="4">
                                        <CFormGroup >
                                          <CLabel htmlFor="ccnumber">Country Of orgin</CLabel>
                                          <Select
                                            id="CountryofOrigin"
                                            className="dropdown"
                                            placeholder="Select"
                                            value={country.find(obj => obj.value === selectedCOO)} // set selected values
                                            options={country} // set list of the data
                                            onChange={handleChangeCOO} // assign onChange function
                                          />
                                        </CFormGroup>

                                      </CCol> 
                                      <CCol xs="4">
                                        <CFormGroup >
                                          <CLabel htmlFor="ccnumber">Province</CLabel>
                                          <Select
                                            className="dropdown"
                                            placeholder="Select"
                                            value={Province.find(obj => obj.value === selectedguest.Province)} // set selected values
                                            options={Province} // set list of the data
                                            onChange={handleChangeOptionProvince} // assign onChange function
                                          />
                                        </CFormGroup>

                                      </CCol>
                                  


                                    </CRow>
                                 </CCol>
                          
                          </CRow>
       </CCardBody>

       </CCol>
       <CCol xs="4">
         
       <h5>Computation of Fees</h5>
                  {localtravelinfodata.fees &&
                      localtravelinfodata.fees.map((feedata, index) => {
                        
                        if(feedata.feefor.toLowerCase()=="environment"||feedata.feefor.toLowerCase()=="bracelet"){
                          return(<>
                            <CRow>
                              <CCol xs="6">
                                <CLabel htmlFor="ccnumber">{feedata.feefor}</CLabel>
                              </CCol>
                              <CCol xs="4">
                                <CLabel htmlFor="ccnumber">{(localtravelinfodata.numberofguest)} X {(feedata.amount)}</CLabel>
                              </CCol>

                              <CCol xs="2">
                                <CLabel htmlFor="ccnumber">{((localtravelinfodata.numberofguest)*(feedata.amount)).toFixed(2)}</CLabel>
                              </CCol>
                            </CRow>
                          </>)
                        }else{
                          return(<>
                            <CRow>
                              <CCol xs="10">
                                <CLabel htmlFor="ccnumber">{feedata.feefor}</CLabel>
                              </CCol>

                              <CCol xs="2">
                                <CLabel htmlFor="ccnumber">{(feedata.amount).toFixed(2)}</CLabel>
                              </CCol>
                            </CRow>
                          </>)
                        
                        }
                      
                      })}
       </CCol>
    </CRow>
    </>
  )

}


export default GuestInfo;