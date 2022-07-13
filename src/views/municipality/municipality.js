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
import dataservice from '../service/dataservice';
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
const Municipality = () => {
  const columns = [
    {
        name: 'Country',
        selector: 'country',
        sortable: true,
    },
    {
      name: 'Province',
      selector: 'province',
      sortable: true,
    }, {
        name: 'Municipality',
        selector: 'description',
        sortable: true,
      },
    // {
    //   name: 'Genres',
    //   selector: 'genres',
    //   sortable: true,
    //   cell: d => <span>{d.genres.join(', ')}</span>,
    // },
    // <CBadge color={getBadge(item.status)}>
    //                     {item.status}
    //                   </CBadge>
    //<span>{d.isactive=="1"?"True":"False"}</span>
    {
      name: 'Status',
      selector: 'isactive',
      sortable: true,
      cell: d => <CBadge color={d.isactive=="1"?"success":"danger"}>
                          {d.isactive=="1"?"Active":"In Active"}
                         </CBadge>,
    },
    {
      name: 'Action',
      selector: 'action',
      ignoreRowClick: true,
      cell: row =>  <CIcon  name="cil-pencil" onClick={e => editdata(row, e)} className="mfe-2 custcusrsor" />
     
    },
  ];
  const data = [];
  let loginuser = localStorage.getItem('userinfo') == "" || undefined ? "" : JSON.parse(localStorage.getItem('userinfo'));

  const userrawdata=[];
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [municipalitymodalpopup, setMunicipalityModalPopUp] = useState(false);
  const [disabledbtn, setDisabledBtn] = useState(false);
  const[municipalitydata,setMunicipalitydata]=useState({
    columns,
    data
  });
  const[countrydata,setCountrydata]=useState([]);
  const[selectedcountryvalue,setSelectedCountryValue]=useState([]);

  const[provincedata,setProvincedata]=useState([]);
  const[selectedprovincevalue,setSelectedProvinceValue]=useState([]);
  const[isprovincedisabled,setProvincedisabled]=useState("t");
 



  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }
  const [state, setState] = useState({
    description: "",
    id:"",
    isactive:true,
  });
  
  const editdata=(row, e) =>{
     
    console.log(row);
    setState(prevState => ({
      ...prevState,
      description: row.description,
      id:row.id,
      isactive:row.isactive,
    }));
     
    setSelectedCountryValue(parseInt(row.countryid));
    setSelectedProvinceValue(parseInt(row.provinceid));
    setMunicipalityModalPopUp(!municipalitymodalpopup);
  }
  
  const tableData = {
    columns,
    data,
  };

  const handleChange = (e) => {
    const { id, value } = e.target
  
   if (e.target.type === 'checkbox' ) {
     setState({...state, [id]: (e.target.checked==true?e.target.checked:false)});
   } else {
     setState({...state, [id]: value });
   }
 }

 const onUpdateItem = i => {
//  setMunicipalitydata({ ...municipalitydata, ["data"]: [...municipalitydata.data,newuser ] });

  let countryname=countrydata.filter(x=>x.value==selectedcountryvalue);
  var provincename=provincedata.filter(x=>x.value==selectedprovincevalue);

  const newdata = municipalitydata["data"].map((item) => {
    if (item.id === i) {
      const updatedItem = {
        ...item,
        description :state.description,
        isactive: state.isactive,
        countryid:selectedcountryvalue,
        country:countryname.length>0?countryname[0].label:"",
        provinceid:selectedprovincevalue,
        province:provincename.length>0?provincename[0].label:""

      };

      return updatedItem;
    }

    return item;
  });

  setMunicipalitydata({ ...municipalitydata, ["data"]: newdata });
  resetvalues();
  setMunicipalityModalPopUp(!municipalitymodalpopup);
  notify(1,`Data save successfully.`);
};

 const savedata = () => {
  //vaildation
  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
     
  if(state.description.length==0){
    notify(2,"Please enter description !");
  }else if(selectedcountryvalue==0){
    notify(2,"Please select country !");
  }else if(selectedprovincevalue==0){
    notify(2,"Please select province !");
  }else{
     
    dataservice("municipality",{ requestfor: 'municipality' ,
    data:{flag:state.id==""?"i":'u',description:state.description,countryid:selectedcountryvalue,provinceid:selectedprovincevalue,
    loggedinid:loginuser.id,isactive:state.isactive,id:state.id}})
    .then(function(data) {
       ;
      if(data.resultkey==1){
        if(state.id!=""){
          
          onUpdateItem(state.id);

        }else{
            var result=data.resultvalue;
            var countryname=countrydata.filter(x=>x.value==selectedcountryvalue);
            var provincename=provincedata.filter(x=>x.value==selectedprovincevalue);

            var newuser={
              "id" : result.rowid,
              "description" : state.description,
              "isactive":"1",
              "countryid":selectedcountryvalue,
              "country":countryname.length>0?countryname[0].label:"",
              "provinceid":selectedprovincevalue,
              "province":provincename.length>0?provincename[0].label:""
            };


            setMunicipalitydata({ ...municipalitydata, ["data"]: [...municipalitydata.data,newuser ] });
            resetvalues();
            notify(1,`Data save successfully.`);
        }
       
      
      }else{

      }
    })
    .catch(function(error){
       
    })
  }
 
 };

 useEffect(()=>{
  getmunicipalitydata();
  getprovincedata();
  getcountrydata();
  resetvalues();
},[])

const getmunicipalitydata=()=>{
    dataservice("municipality",{ requestfor: 'getmunicipality' ,data:{flag:'a'}})
    .then(function(data) {
      if(data.resultkey==1){
        var result=data.resultvalue;
         ;
        setMunicipalitydata({ ...municipalitydata, ["data"]: result });
  
        //setMunicipalitydata({ ...municipalitydata, ["data"]: [...municipalitydata.data, result[0]] });
        
      }else{
        //notify(2,"Invaild username/password");
      }
          
      })
      .catch(function(edata){
          notify(2,edata.toString(),1);
          //console.log(' movies:', edata);
      });



}

const getprovincedata=()=>{
      ;
    dataservice("province",{ requestfor: 'getprovince' ,data:{flag:'actv'}})
    .then(function(data) {
          ;
      if(data.resultkey==1){
        var result=data.resultvalue;
       
        if(result.length>0){
          let seelectprovincedata=[{
            value: 0,
            label: "Select Province"
          }];
          for (let index = 0; index < result.length; index++) {
            const element = result[index];
            if(element.isactive){
                seelectprovincedata.push({
                value: parseInt(element.id),
                label: element.description
              })
            }
            
          }
          setProvincedata(seelectprovincedata);
          console.log(seelectprovincedata);
        }
     
         
        
      }else{
        //notify(2,"Invaild username/password");
      }
          
      })
      .catch(function(edata){
          notify(2,edata.toString(),1);
          //console.log(' movies:', edata);
      });
  



}

const getprovincedatabyid=()=>{
      ;
    dataservice("province",{ requestfor: 'getprovince' ,data:{flag:'bycountryid',countryid:selectedcountryvalue}})
    .then(function(data) {
          ;
      if(data.resultkey==1){
        var result=data.resultvalue;
       
        if(result.length>0){
            setProvincedisabled("f");
          let seelectprovincedata=[{
            value: 0,
            label: "Select Province"
          }];
          for (let index = 0; index < result.length; index++) {
            const element = result[index];
            if(element.isactive){
                seelectprovincedata.push({
                value: parseInt(element.id),
                label: element.description
              })
            }
            
          }
          setProvincedata(seelectprovincedata);
          console.log(seelectprovincedata);
        }
     
         
        
      }else{
        //notify(2,"Invaild username/password");
      }
          
      })
      .catch(function(edata){
          notify(2,edata.toString(),1);
          //console.log(' movies:', edata);
      });
  



}

const getcountrydata=()=>{
  dataservice("country",{ requestfor: 'getcountry' ,data:{flag:'actv'}})
  .then(function(data) {
        ;
    if(data.resultkey==1){
      var result=data.resultvalue;
     
      if(result.length>0){
        let seelectroledata=[{
          value: 0,
          label: "Select Country"
        }];
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          if(element.isactive){
            seelectroledata.push({
              value: parseInt(element.id),
              label: element.description
            })
          }
          
        }
        setCountrydata(seelectroledata);
        console.log(seelectroledata);
      }
   
       
      
    }else{
      //notify(2,"Invaild username/password");
    }
        
    })
    .catch(function(edata){
        notify(2,edata.toString(),1);
        //console.log(' movies:', edata);
    });



}

 const openpopup=()=>{
  resetvalues();
  setMunicipalityModalPopUp(!municipalitymodalpopup);
 }

 const resetvalues=()=>{
  setSelectedCountryValue(0);
  setSelectedProvinceValue(0);
  setProvincedisabled("t");
  setState(prevState => ({
    ...prevState,
    description: "",
    id:"",
    isactive:true,
  }));
  


 }

 const handleChangeOption = e => {
   
  setSelectedCountryValue(e.value);
}
const handleChangeOptionProvince=e=>{

    setSelectedProvinceValue(e.value);
}
 
useEffect(()=>{
    if(selectedcountryvalue!=""){
        if(selectedcountryvalue==0){
            setProvincedisabled("t");
            let seelectprovincedata=[{
                value: 0,
                label: "Select Province"
            }];
            setProvincedata(seelectprovincedata);
            setSelectedProvinceValue(0);
         
        }else{
            getprovincedatabyid();
        }

    }else{
        setProvincedisabled("t");
        let seelectprovincedata=[{
            value: 0,
            label: "Select Province"
        }];
        setProvincedata(seelectprovincedata);
        setSelectedProvinceValue(0);

    }
    
},[selectedcountryvalue])


  return (
    <>
   <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol xl={6}>
                Municipality 
                <small className="text-muted"> Master</small>
              </CCol>
                <CCol xl={6} style={{textAlign:"end"}}>
                <CButton
                    onClick={() => openpopup('n',{})}
                    className="mr-1"
                    color="primary"
                
                  >
                    Add New
                
                  </CButton>
            
              </CCol>
            </CRow>
            
           
         
          </CCardHeader>
          <CCardBody>
          <CModal show={municipalitymodalpopup} onClose={() => setMunicipalityModalPopUp(!municipalitymodalpopup)} size="lg">
              <CModalHeader closeButton>
              <CModalTitle>Municipality </CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol md="12">
                  <CForm>
                    <CRow >
                    <CCol xs="6">
                      <CFormGroup row>
                          <CCol xs="12" >
                          <Select
                              className="dropdown"
                              placeholder="Select Role"
                              value={countrydata.find(obj => obj.value === selectedcountryvalue)} // set selected values
                              options={countrydata} // set list of the data
                              onChange={handleChangeOption} // assign onChange function
                            />
                          </CCol>
                      </CFormGroup>
                       
                      </CCol>
                      <CCol xs="6">
                      <CFormGroup row>
                          <CCol xs="12" >
                              
                          <Select
                              isDisabled={isprovincedisabled=="t"?true:false}
                              className="dropdown"
                              placeholder="Select Provice"
                              value={provincedata.find(obj => obj.value === selectedprovincevalue)} // set selected values
                              options={provincedata} // set list of the data
                              onChange={handleChangeOptionProvince} // assign onChange function
                            />
                          </CCol>
                      </CFormGroup>
                       
                      </CCol>
                 
                    
                    </CRow>
                    <CRow>
                    <CCol xs="6" className="text-right">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-envelope-letter" style={{ color: "red" }} /><sup style={{ color: "red" }}> * </sup>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput onChange={handleChange} type="text" value={state.description} id="description" placeholder="Enter Municipality" />
                        </CInputGroup>
                      </CCol>
                   
                    </CRow>
                    <CRow>
                    <CCol xs="6">
                        <CFormGroup row>
                         
                          <CCol md="9"  style={{display:state.id==""?"none":""}}>
                           
                            <CFormGroup variant="custom-checkbox" inline>
                              <CInputCheckbox custom id="isactive" name="inline-checkbox2" value={state.isactive==0?false:true} checked={state.isactive==0?false:true}   onChange={handleChange}/>
                      <CLabel variant="custom-checkbox" htmlFor="isactive">Active</CLabel>
                            </CFormGroup>
                            {/* <CFormGroup variant="custom-checkbox" inline>
                              <CInputCheckbox custom id="investoruser" name="inline-checkbox3" checked={state.investoruser} value={state.investoruser} onChange={handleChange} />
                              <CLabel variant="custom-checkbox" htmlFor="investoruser">Investor User</CLabel>
                            </CFormGroup> */}
                          </CCol>
                        </CFormGroup>
                      </CCol>
                    
                    </CRow>
                  </CForm>

                </CCol>

              </CModalBody>
              <CModalFooter>
                <CButton color="primary" disabled={disabledbtn}  onClick={() => savedata()}>Save</CButton>{' '}
                <CButton color="secondary" onClick={() => setMunicipalityModalPopUp(!municipalitymodalpopup)}>Cancel</CButton>
              </CModalFooter>
            </CModal>

          <DataTableExtensions
      {...municipalitydata}
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

export default Municipality
