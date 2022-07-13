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
import TimePicker from 'react-time-picker';

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
const Slots = () => {
  const columns = [
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
    },
    {
      name: 'Start Time',
      selector: 'starttime',
      sortable: true,
    },
    {
        name: 'End Time',
        selector: 'endtime',
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
  const [slotmodalpopup, setSlotModalPopUp] = useState(false);
  const [disabledbtn, setDisabledBtn] = useState(false);
  const[slotdata,setSlotsdata]=useState({
    columns,
    data
  });
  
  const [starttime, onStartChange] = useState('00:00');
  const [endtime, onEndChange] = useState('00:00');


  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }
  const [state, setState] = useState({
    description: "",
    starttime:"",
    endtime:"",
    id:"",
    isactive:true,
  });
  
  const editdata=(row, e) =>{
      ;
    console.log(row);
    setState(prevState => ({
      ...prevState,
      description: row.description,
      starttime:row.starttime,
      endtime:row.endtime,
      id:row.id,
      isactive:row.isactive,
    }));
    onStartChange(row.starttime);
    onEndChange(row.endtime);

    setSlotModalPopUp(!slotmodalpopup);
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

  const newdata = slotdata["data"].map((item) => {
    if (item.id === i) {
      const updatedItem = {
        ...item,
        description:state.description,
        isactive: state.isactive==true?"1":"0",
        starttime:starttime,
        endtime:endtime,
        
      };

      return updatedItem;
    }

    return item;
  });

  setSlotsdata({ ...slotdata, ["data"]: newdata });
  resetvalues();
  notify(1,`Data save successfully.`);
  setSlotModalPopUp(!slotmodalpopup);
};


 const savedata = () => {
  //vaildation
  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
     
  if(state.description.length==0){
    notify(2,"Please enter description !");
  }else{
      ;
    dataservice("slots",{ requestfor: 'slots' ,
    data:{flag:state.id==""?"i":'u',description:state.description,starttime:starttime,endtime:endtime,
    loggedinid:loginuser.id,isactive:state.isactive==true?"1":"0",id:state.id}})
    .then(function(data) {
       ;
      if(data.resultkey==1){
        if(state.id!=""){
          
          onUpdateItem(state.id);

        }else{
            var result=data.resultvalue[0];
         
            var newuser={
              "id" : result.rowid,
              "description" : state.description,
              "starttime" : starttime+"00",
              "endtime" : endtime+"00",
              "isactive":"1",
              "price":parseFloat(state.price).toFixed(2) 
             
            };


            setSlotsdata({ ...slotdata, ["data"]: [...slotdata.data,newuser ] });
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
   
    getslotsdata();
    resetvalues();
    test()
},[])



const getslotsdata=()=>{
  dataservice("slots",{ requestfor: 'getslots' ,data:{flag:'a'}})
  .then(function(data) {
     ;
    if(data.resultkey==1){
      var result=data.resultvalue;
       ;
      setSlotsdata({ ...slotdata, ["data"]: result });
    }else{
       ;
    //  notify(2,"No data found");
    }
        
    })
    .catch(function(edata){
       ;
        notify(2,edata.toString(),1);
    });



}
const test=()=>{
  dataservice("user",{ requestfor: 'getallregisterrfid' ,data:{flag:'a'}})
  .then(function(data) {
     ;
    if(data.resultkey==1){
      var result=data.resultvalue;
       ;
      
    }else{
       ;
    //  notify(2,"No data found");
    }
        
    })
    .catch(function(edata){
       ;
        notify(2,edata.toString(),1);
    });



}
 const openpopup=()=>{
  resetvalues();
  setSlotModalPopUp(!slotmodalpopup);
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
                Slot
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
          <CModal show={slotmodalpopup} onClose={() => setSlotModalPopUp(!slotmodalpopup)} size="lg">
              <CModalHeader closeButton>
              <CModalTitle>Slot </CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol md="12">
                  <CForm>
                    <CRow >
                      <CCol xs="12" className="text-right">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-envelope-letter" style={{ color: "red" }} /><sup style={{ color: "red" }}>*</sup>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput onChange={handleChange} type="text" value={state.description} id="description" placeholder="Enter description" />
                        </CInputGroup>
                      </CCol>
                   
                    </CRow>
                    <CRow>
                      <CCol xs="6" className="text-right">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            Start Time<sup style={{ color: "red" }}>*</sup>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                              <TimePicker
                                  onChange={onStartChange}
                                  value={starttime}
                                  format={"HH:mm:a"}
                                />
                        </CInputGroup>
                      </CCol>

                      <CCol xs="6" className="text-right">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            End Time<sup style={{ color: "red" }}>*</sup>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <TimePicker
                                  onChange={onEndChange}
                                  value={endtime}
                                  format={"HH:mm:a"}
                                />
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
                <CButton color="secondary" onClick={() => setSlotModalPopUp(!slotmodalpopup)}>Cancel</CButton>
              </CModalFooter>
            </CModal>

          <DataTableExtensions
      {...slotdata}
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

export default Slots
