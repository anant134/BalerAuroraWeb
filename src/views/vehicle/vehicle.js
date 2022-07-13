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
const Vehicle = () => {
  const columns = [
    {
      name: 'Type of vehicle',
      selector: 'typeofvehicle',
      sortable: true,
    },
    {
      name: 'Amount',
      selector: 'amount',
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
  const [vehiclemodalpopup, setVehicleModalPopUp] = useState(false);
  const [disabledbtn, setDisabledBtn] = useState(false);
  const[vehicledata,setVehiclesdata]=useState({
    columns,
    data
  });
  


  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }
  const [state, setState] = useState({
    typeofvehicle: "",
    amount:0,
    id:"",
    isactive:true,
  });
  
  const editdata=(row, e) =>{
     
    console.log(row);
    setState(prevState => ({
      ...prevState,
      typeofvehicle: row.typeofvehicle,
      amount: row.amount,
      id:row.id,
      isactive:row.isactive,
    }));
    setVehicleModalPopUp(!vehiclemodalpopup);
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

  const newdata = vehicledata["data"].map((item) => {
    if (item.id === i) {
      const updatedItem = {
        ...item,
        typeofvehicle:state.typeofvehicle,
        isactive: state.isactive==true?"1":"0",
        amount:parseFloat(state.amount).toFixed(2) 
      };

      return updatedItem;
    }

    return item;
  });

  setVehiclesdata({ ...vehicledata, ["data"]: newdata });
  resetvalues();
  setVehicleModalPopUp(!vehiclemodalpopup);
  notify(1,`Data save successfully.`);
};


 const savedata = () => {
  //vaildation
  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
     
  if(state.typeofvehicle.length==0){
    notify(2,"Please enter typeofvehicle !");
  }else if(state.amount.length==0){
    notify(2,"Please enter amount !");
  }else{
     
    dataservice("vehicle",{ requestfor: 'vehicle' ,
    data:{flag:state.id==""?"i":'u',typeofvehicle:state.typeofvehicle,amount:state.amount,
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
              "typeofvehicle" : state.typeofvehicle,
              "isactive":"1",
              "amount":parseFloat(state.amount).toFixed(2) 
             
            };


            setVehiclesdata({ ...vehicledata, ["data"]: [...vehicledata.data,newuser ] });
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
   
    getvehiclesdata();
    resetvalues();
  
},[])



const getvehiclesdata=()=>{
  dataservice("vehicle",{ requestfor: 'getvehicle' ,data:{flag:'a'}})
  .then(function(data) {
    if(data.resultkey==1){
      var result=data.resultvalue;
       ;
      setVehiclesdata({ ...vehicledata, ["data"]: result });
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
  setVehicleModalPopUp(!vehiclemodalpopup);
 }

 const resetvalues=()=>{
  setState(prevState => ({
    ...prevState,
    typeofvehicle: "",
    amount:0,
    id:"",
    isactive:true,
  }));
 }



//  const handleChangeOption = e => {
//   setSelectedRoleValue(e.value);
// }
 


  return (
    <>
   <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol xl={6}>
                Vehicle
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
          <CModal show={vehiclemodalpopup} onClose={() => setVehicleModalPopUp(!vehiclemodalpopup)} size="lg">
              <CModalHeader closeButton>
              <CModalTitle>User </CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol md="12">
                  <CForm>
                    <CRow >
                      <CCol xs="6" className="text-right">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-envelope-letter" style={{ color: "red" }} /><sup style={{ color: "red" }}>*</sup>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput onChange={handleChange} type="text" value={state.typeofvehicle} id="typeofvehicle" placeholder="Enter type of vehicle" />
                        </CInputGroup>
                      </CCol>
                   
                      <CCol xs="6" >
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" style={{ color: "red" }} /><sup style={{ color: "red" }}>*</sup>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <InputDecimal  onChange={handleChange} type="text"  value={state.amount} id="amount" placeholder="Enter amount" />
   
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
                <CButton color="secondary" onClick={() => setVehicleModalPopUp(!vehiclemodalpopup)}>Cancel</CButton>
              </CModalFooter>
            </CModal>

          <DataTableExtensions
      {...vehicledata}
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

export default Vehicle
