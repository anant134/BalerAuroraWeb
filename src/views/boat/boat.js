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
const Boat = () => {
  const columns = [
    {
      name: 'Owner Name',
      selector: 'ownername',
      sortable: true,
    },
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
    },
    {
      name: 'Capacity',
      selector: 'capacity',
      sortable: true,
    },
    {
      name: 'One-way Amt',
      selector: 'price',
      sortable: true,
    },
    {
      name: 'Two-way Amt',
      selector: 'twowayprice',
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
  const [boatmodalpopup, setBoatModalPopUp] = useState(false);
  const [disabledbtn, setDisabledBtn] = useState(false);
  const[boatdata,setBoatdata]=useState({
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
    capacity:0,
    price:0,
    twowayprice:0,
    ownername:""

  });
  
  const editdata=(row, e) =>{
     
    console.log(row);
    setState(prevState => ({
      ...prevState,
      description: row.description,
      id:row.id,
      isactive:row.isactive,
      capacity:row.capacity,
      price:row.price,
      twowayprice:row.twowayprice,
      ownername:row.ownername
    }));
    setBoatModalPopUp(!boatmodalpopup);
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
 const handleChangewithcap = (e) => {
  const { id, value } = e.target
  
  if (e.target.type === 'checkbox' ) {
    setState({...state, [id]: (e.target.checked==true?e.target.checked:false)});
  } else {
    setState({...state, [id]: value.toUpperCase() });
  }
}
 const onUpdateItem = i => {

  const newdata = boatdata["data"].map((item) => {
    if (item.id === i) {
      const updatedItem = {
        ...item,
        description:state.description,
        isactive: state.isactive==true?"1":"0",
        capacity:state.capacity,
        price:state.price,
        twowayprice:state.twowayprice,
        ownername:state.ownername
      };

      return updatedItem;
    }

    return item;
  });

  setBoatdata({ ...boatdata, ["data"]: newdata });
  resetvalues();
  setBoatModalPopUp(!boatmodalpopup);
  notify(1,`Data save successfully.`);
};


 const savedata = () => {
  //vaildation
  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
     
  if(state.description.length==0){
    notify(2,"Please enter description !");
  }else if(state.price.length==0||state.price==0){
    notify(2,"Please enter one way amount !");
  }else if(state.twowayprice.length==0||state.twowayprice==0){
    notify(2,"Please enter two way amount !");
  }else if(state.ownername.length==0){
    notify(2,"Please enter owner name !");
  }else{
   var senddata={flag:state.id==""?"i":'u',description:state.description,capacity:state.capacity,price:state.price,ownername:state.ownername,twowayprice:state.twowayprice,
    loggedinid:loginuser.id,isactive:state.isactive,id:state.id};
     
    dataservice("boat",{ requestfor: 'boat' ,
    data:senddata})
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
              "isactive":1,
              "capacity": state.capacity,
              "price": state.price,
              "twowayprice":state.twowayprice,
              "ownername":state.ownername
             
            };


            setBoatdata({ ...boatdata, ["data"]: [...boatdata.data,newuser ] });
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
   
    getboatdata();
    resetvalues();
  
},[])



const getboatdata=()=>{
  dataservice("boat",{ requestfor: 'getboat' ,data:{flag:'a'}})
  .then(function(data) {
    if(data.resultkey==1){
      var result=data.resultvalue;
        ;
      setBoatdata({ ...boatdata, ["data"]: result });
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
  setBoatModalPopUp(!boatmodalpopup);
 }

 const resetvalues=()=>{
  setState(prevState => ({
    ...prevState,
    description: "",
    price:0,
    capacity:0,
    id:"",
    isactive:true,
    ownername:""
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
                Boat
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
          <CModal show={boatmodalpopup} onClose={() => setBoatModalPopUp(!boatmodalpopup)} size="lg">
              <CModalHeader closeButton>
              <CModalTitle>Boat </CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol md="12">
                  <CForm>
                    <CRow > <CCol xs="6" className="text-right">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                             Owner name<sup style={{ color: "red" }}>*</sup>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput onChange={handleChangewithcap} type="text" value={state.ownername} id="ownername" placeholder="Enter owner name" />
                        </CInputGroup>
                      </CCol>
                 
                      <CCol xs="6" className="text-right">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              Boat name<sup style={{ color: "red" }}>*</sup>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput onChange={handleChangewithcap} type="text" value={state.description} id="description" placeholder="Enter boat name" />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                    <CCol xs="6" >
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            capacity<sup style={{ color: "red" }}>*</sup>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <InputDecimal  onChange={handleChange} type="text"  value={state.capacity} id="capacity" placeholder="Enter capacity" />
   
                        </CInputGroup>
                      </CCol>
                      <CCol xs="6" >
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                             One-way amount<sup style={{ color: "red" }}>*</sup>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <InputDecimal  onChange={handleChange} type="text"  value={state.price} id="price" placeholder="Enter one-way amount" />
   
                        </CInputGroup>
                      </CCol>
                  
                    </CRow>
                   <CRow>
                      <CCol xs="6" >
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                             two-way amount<sup style={{ color: "red" }}>*</sup>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <InputDecimal  onChange={handleChange} type="text"  value={state.twowayprice} id="twowayprice" placeholder="Enter two way amount" />
   
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
                <CButton color="secondary" onClick={() => setBoatModalPopUp(!boatmodalpopup)}>Cancel</CButton>
              </CModalFooter>
            </CModal>

          <DataTableExtensions
      {...boatdata}
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

export default Boat
