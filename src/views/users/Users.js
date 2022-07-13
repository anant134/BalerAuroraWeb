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
import usersData from './UsersData'
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
const Users = () => {
  const columns = [
    {
      name: 'User Name',
      selector: 'username',
      sortable: true,
    },
    {
      name: 'Email ID',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Role Name',
      selector: 'rolename',
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
  // const data = [
  //   {
  //     id:1,
  //     username:  <CBadge color="success"  >isactive</CBadge>,
  //     year: '1988',
  //     genres: [
  //       'Comedy',
  //       'Fantasy',
  //     ],
  //     director: 'Tim Burton',
     
  //   },
  //   {
  //     id: 2,
  //     title: 'The Cotton Club',
  //     year: '1984',
  //     runtime: '127',
  //     genres: [
  //       'Crime',
  //       'Drama',
  //       'Music',
  //     ],
  //     director: 'Francis Ford Coppola',
      
  //   }, {
  //     id: 3,
  //     title: 'The Cotton Club',
  //     year: '1986',
  //     runtime: '127',
  //     genres: [
  //       'Crime',
  //       'Drama',
  //       'Music',
  //     ],
  //     director: 'Francis Ford Coppola',
      
  //   }];
  let loginuser = localStorage.getItem('userinfo') == "" || undefined ? "" : JSON.parse(localStorage.getItem('userinfo'));

  const userrawdata=[];
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [usermodalpopup, setUserModalPopUp] = useState(false);
  const [disabledbtn, setDisabledBtn] = useState(false);
  const[userdata,setUserdata]=useState({
    columns,
    data
  });
  const[roledata,setRoledata]=useState([]);
  const[selectedrolevalue,setSelectedRoleValue]=useState([]);



  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
    id:"",
    isactive:true,
  });
  
  const editdata=(row, e) =>{
     
    console.log(row);
    setState(prevState => ({
      ...prevState,
      email: row.email,
      username: row.username,
      password: "******",
      id:row.id,
      isactive:row.isactive,
    }));
     
    setSelectedRoleValue(parseInt(row.roleid));
    setUserModalPopUp(!usermodalpopup);
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
//  setUserdata({ ...userdata, ["data"]: [...userdata.data,newuser ] });

  let rolename=roledata.filter(x=>x.value==selectedrolevalue);
  
  const newdata = userdata["data"].map((item) => {
    if (item.id === i) {
      const updatedItem = {
        ...item,
        username:state.username,
        isactive: state.isactive,
        email:state.email,
        roleid:selectedrolevalue,
        rolename:rolename.length>0?rolename[0].label:""
      };

      return updatedItem;
    }

    return item;
  });

  setUserdata({ ...userdata, ["data"]: newdata });
  resetvalues();
  setUserModalPopUp(!usermodalpopup);
  notify(1,`Data save successfully.`);
};


 const savedata = () => {
  //vaildation
  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
     
  if(state.email.length==0){
    notify(2,"Please enter email id !");
  }else if(!pattern.test(state.email)){
    notify(2,"Invaild email id !");
  }else if(state.password.length==0){
    notify(2,"Please enter password !");
  }else if(state.username.length==0){
    notify(2,"Please enter username !");
  }else if(selectedrolevalue==0){
    notify(2,"Please select role !");
  }else{
     
    dataservice("user",{ requestfor: 'user' ,
    data:{flag:state.id==""?"i":'u',username:state.username,password:state.password,email:state.email,
    loggedinid:loginuser.id,roleid:selectedrolevalue,isactive:state.isactive,id:state.id}})
    .then(function(data) {
      if(data.resultkey==1){
        if(state.id!=""){
          
          onUpdateItem(state.id);

        }else{
            var result=data.resultvalue;
            var rolename=roledata.filter(x=>x.value==selectedrolevalue);

            var newuser={
              "id" : result.rowid,
              "username" : state.username,
              "isactive":"1",
              "email":state.email,
              "roleid":selectedrolevalue,
              "rolename":rolename.length>0?rolename[0].label:""
            };


            setUserdata({ ...userdata, ["data"]: [...userdata.data,newuser ] });
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
   
  getuserdata();
  getroledata();
  resetvalues();
  
},[])



const getuserdata=()=>{
  dataservice("user",{ requestfor: 'getuser' ,data:{flag:'a'}})
  .then(function(data) {
    if(data.resultkey==1){
      var result=data.resultvalue;
       ;
      setUserdata({ ...userdata, ["data"]: result });

      //setUserdata({ ...userdata, ["data"]: [...userdata.data, result[0]] });
      
    }else{
      //notify(2,"Invaild username/password");
    }
        
    })
    .catch(function(edata){
        notify(2,edata.toString(),1);
        //console.log(' movies:', edata);
    });



}

const getroledata=()=>{
  dataservice("role",{ requestfor: 'getrole' ,data:{flag:'actv'}})
  .then(function(data) {
    if(data.resultkey==1){
      var result=data.resultvalue;
     
      if(result.length>0){
        let seelectroledata=[{
          value: 0,
          label: "Select Role"
        }];
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          if(element.isactive){
            seelectroledata.push({
              value: parseInt(element.id),
              label: element.rolename
            })
          }
          
        }
        setRoledata(seelectroledata);
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
  setUserModalPopUp(!usermodalpopup);
 }

 const resetvalues=()=>{
  setSelectedRoleValue(0);
  setState(prevState => ({
    ...prevState,
    email: "",
    username: "",
    password: "",
    id:"",
    isactive:true,
  }));
  


 }



 const handleChangeOption = e => {
  setSelectedRoleValue(e.value);
}
 


  return (
    <>
   <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol xl={6}>
                Users
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
          <CModal show={usermodalpopup} onClose={() => setUserModalPopUp(!usermodalpopup)} size="lg">
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
                          <CInput onChange={handleChange} type="text" value={state.email} id="email" placeholder="Enter Email ID" />
                        </CInputGroup>
                      </CCol>
                   
                      <CCol xs="6" >
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" style={{ color: "red" }} /><sup style={{ color: "red" }}>*</sup>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput onChange={handleChange} id="password"  value={state.password}  type="password" placeholder="Enter Password" />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                       <CCol xs="6">
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" style={{ color: "red" }} /><sup style={{ color: "red" }}>*</sup>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput onChange={handleChange} id="username" value={state.username} type="text" placeholder="Enter UserName" />
                        </CInputGroup>

                      </CCol>
                      <CCol xs="6">
                      <CFormGroup row>
                          <CCol xs="12" >
                          <Select
                              className="dropdown"
                              placeholder="Select Role"
                              value={roledata.find(obj => obj.value === selectedrolevalue)} // set selected values
                              options={roledata} // set list of the data
                              onChange={handleChangeOption} // assign onChange function
                            />
                          </CCol>
                      </CFormGroup>
                       
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
                <CButton color="secondary" onClick={() => setUserModalPopUp(!usermodalpopup)}>Cancel</CButton>
              </CModalFooter>
            </CModal>

          <DataTableExtensions
      {...userdata}
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

export default Users
