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
import { InputDecimal } from "../commoncomponents/inputdecimal";
import DatePicker from 'react-date-picker';

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
const Discount = () => {
  const columns = [
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
    },
    {
      name: 'Discount type',
      selector: 'discounttype',
      sortable: true,
    },
    {
        name: 'Value',
        selector: 'value',
        sortable: true,
      },
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

  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [discountmodalpopup, setDiscountModalPopUp] = useState(false);
  const [disabledbtn, setDisabledBtn] = useState(false);
  const[discount,setDiscountDropdowndata]=useState([]);
  const[discounttype,setDiscountTypeData]=useState([]);
  const[selecteddiscountvalue,setSelectedDiscountValue]=useState([]);
  const[selecteddiscounttypevalue,setSelectedDiscountTypeValue]=useState([]);
  const[discountdata,setDiscountsdata]=useState({
    columns,
    data
  });
  const [startdatevalue, onChangeStartDate] = useState(new Date());
  let enddatavalue=new Date()
  enddatavalue.setDate(enddatavalue.getDate() + 30);
  const [enddatevalue, onChangeEndDate] = useState(enddatavalue);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }
  const [state, setState] = useState({
    description: "",
    discountvalue:0,
    id:"",
    isactive:true,
  });
  
  const editdata=(row, e) =>{
     
    console.log(row);
    setState(prevState => ({
      ...prevState,
      description: row.description,
      discountvalue: row.value,
      id:row.id,
      isactive:row.isactive,
    }));
    setDiscountModalPopUp(!discountmodalpopup);
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

  const newdata = discountdata["data"].map((item) => {
    if (item.id === i) {
      const updatedItem = {
        ...item,
        description:state.description,
        isactive: state.isactive==true?"1":"0",
        discountvalue:parseFloat(state.discountvalue).toFixed(2) 
      };

      return updatedItem;
    }

    return item;
  });

  setDiscountsdata({ ...discountdata, ["data"]: newdata });
  resetvalues();
  setDiscountModalPopUp(!discountmodalpopup);
  notify(1,`Data save successfully.`);
};


 const savedata = () => {
  //vaildation
  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  state.description="Seinor Discount";  
  if(state.description.length==0){
    notify(2,"Please enter description !");
  }else if(state.discountvalue.length==0){
    notify(2,"Please enter discountvalue !");
  }else{
     
    dataservice("discount",{ requestfor: 'discounts' ,
    data:{flag:state.id==""?"i":'u',description:state.description,value:state.discountvalue,
    loggedinid:loginuser.id,isactive:state.isactive,id:state.id}})
    .then(function(data) {
       ;
      if(data.resultkey==1){
        if(state.id!=""){
          
          onUpdateItem(state.id);

        }else{
            var result=data.resultvalue;
         
            var newuser={
              "id" : result.rowid,
              "description" : state.description,
              "isactive":"1",
              "discountvalue":parseFloat(state.discountvalue).toFixed(2) 
             
            };


            setDiscountsdata({ ...discountdata, ["data"]: [...discountdata.data,newuser ] });
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
   
    getdiscountdata();
    getdiscount();
    getdiscounttype();
    resetvalues();
  
},[])

const getdiscounttype=()=>{
    setDiscountTypeData([
        { 
            value: 0,
            label: "Select Discount Type"
        },
        {
            value: 1,
            label: "Percentage"
        },
        {
            value: 2,
            label: "Amount"
        }
    ]);
}
const getdiscount=()=>{
    dataservice("discount",{ requestfor: 'getdiscounttype' ,data:{flag:'actv'}})
    .then(function(data) {
      if(data.resultkey==1){
         ;
        var result=data.resultvalue;
        let seelectdiscounttypedata=[{
            value: 0,
            label: "Select Discount"
          }];
          for (let index = 0; index < result.length; index++) {
            const element = result[index];
            if(element.isactive){
                seelectdiscounttypedata.push({
                value: parseInt(element.id),
                label: element.description
              })
            }
          }
          setDiscountDropdowndata(seelectdiscounttypedata);
          console.log(seelectdiscounttypedata);
       
      }else{
      //  notify(2,"No data found");
      }
          
      })
      .catch(function(edata){
          notify(2,edata.toString(),1);
      });
  
  
  
  }

const getdiscountdata=()=>{
  dataservice("discount",{ requestfor: 'getdiscounts' ,data:{flag:'a'}})
  .then(function(data) {
       ;
    if(data.resultkey==1){
      var result=data.resultvalue;
       ;
      setDiscountsdata({ ...discountdata, ["data"]: result });
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
  setDiscountModalPopUp(!discountmodalpopup);
 }

 const resetvalues=()=>{
  setState(prevState => ({
    ...prevState,
    description: "",
    discountvalue:0,
    id:"",
    isactive:true,
  }));
 }



 const handleChangeOption = e => {
  setSelectedDiscountValue(e.value);
}
 
const handleChangeOptionType =e=>{
    setSelectedDiscountTypeValue(e.value)
}


  return (
    <>
   <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol xl={6}>
                Discount
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
          <CModal show={discountmodalpopup} onClose={() => setDiscountModalPopUp(!discountmodalpopup)} size="lg">
              <CModalHeader closeButton>
              <CModalTitle>Discount </CModalTitle>
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
                                placeholder="Select Discount "
                                value={discount.find(obj => obj.value === selecteddiscountvalue)} // set selected values
                                options={discount} // set list of the data
                                onChange={handleChangeOption} // assign onChange function
                                />
                            </CCol>
                        </CFormGroup>
                        
                        </CCol>
                       
                      <CCol xs="6" >
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" style={{ color: "red" }} /><sup style={{ color: "red" }}>*</sup>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <InputDecimal  onChange={handleChange} type="text"  value={state.discountvalue} id="discountvalue" placeholder="Enter discountvalue" />
   
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                       <CCol xs="6">
                        <CFormGroup row>
                            <CCol xs="12" >
                            <Select
                                className="dropdown"
                                placeholder="Select Discount type"
                                value={discounttype.find(obj => obj.value === selecteddiscounttypevalue)} // set selected values
                                options={discounttype} // set list of the data
                                onChange={handleChangeOptionType} // assign onChange function
                                />
                            </CCol>
                        </CFormGroup>
                        
                        </CCol>
                       <CCol xs="6">
                            <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                Start Date<sup style={{ color: "red" }}>*</sup>
                                </CInputGroupText>
                            </CInputGroupPrepend>
                                    <DatePicker
                                            onChange={onChangeStartDate}
                                            value={startdatevalue}
                                            minDate={new Date()}
                                            maxDate={enddatevalue}
                                        />
                            </CInputGroup>
                          
                        
                        </CCol>
                       
                       
                    </CRow>
                    <CRow>
                    <CCol xs="6">
                            <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                Start Date<sup style={{ color: "red" }}>*</sup>
                                </CInputGroupText>
                            </CInputGroupPrepend>
                                    <DatePicker
                                            onChange={onChangeEndDate}
                                            value={enddatevalue}
                                            minDate={startdatevalue}
                                            maxDate={new Date("12-31-2090")}
                                        />
                            </CInputGroup>
                          
                        
                        </CCol>
                       
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
                <CButton color="secondary" onClick={() => setDiscountModalPopUp(!discountmodalpopup)}>Cancel</CButton>
              </CModalFooter>
            </CModal>

          <DataTableExtensions
      {...discountdata}
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

export default Discount
