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
const Role = () => {
  const columns = [
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
  const[rawroledata,setRawRoleData]=useState({
    columns,
    data
  });
  
  const[rolename,setRoleName]=useState("");
  const[roledata,setRoledata]=useState([]);
  const[menudata,setMenudata]=useState([]);
  const[selectedrolevalue,setSelectedRoleValue]=useState([]);
  const[roledetail,setRoleDetail]=useState([]);


  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }
  const [state, setState] = useState({
    rolename: "",
    appmenu: "",
    menu: "",
    id:"",
    isactive:true,
  });
  
  const editdata=(row, e) =>{
     
    
    dataservice("role",{ requestfor: 'getmenubyroleid' ,data:{id:row.id}})
  .then(function(data) {
    if(data.resultkey==1){
      var result=data.resultvalue;
      if(result.length>0){
        //setRoleDetail(result[0]);

var appmenudata =result[0].appmenu==null?[]:JSON.parse(result[0].appmenu);
var menuitemdata =result[0].menuitem==null?[]:JSON.parse(result[0].menuitem);
        
 ;
        setTimeout(() => {
            setState(prevState => ({
                ...prevState,
                rolename: row.rolename,
                appmenu: appmenudata,
                menu: menuitemdata,
                id:row.id,
                isactive:result[0].isactive=="1"?true:false,
              }));
              setUserModalPopUp(!usermodalpopup);
        }, 1000);
        
   
      }else{
          setTimeout(() => {
                setState(prevState => ({
                    ...prevState,
                    rolename: "",
                    appmenu: [],
                    menu: [],
                    id:"",
                    isactive:true,
                }));
              setUserModalPopUp(!usermodalpopup);
          }, 1000);
        
        
        
      }
     
    }else{
        setState(prevState => ({
            ...prevState,
            rolename: "",
            appmenu: [],
            menu: [],
            id:"",
            isactive:true,
          }));
    }
        
    })
    .catch(function(edata){
         
        setState(prevState => ({
            ...prevState,
            rolename: "",
            appmenu: [],
            menu: [],
            id:"",
            isactive:true,
          }));
        notify(2,edata.toString(),1);
        
    });


   // setUserModalPopUp(!usermodalpopup);
  }

   
 
  
  const tableData = {
    columns,
    data,
  };
  const handleChange1=(row, e) =>{
    
    if (e.target.type === 'checkbox' ) {
        var chkstat=(e.target.checked==true?e.target.checked:false);
        const newdata = menudata.map((item) => {
            if (item.id === row.id) {
              const updatedItem = {
                ...item,
                allow: chkstat
              };
        
              return updatedItem;
            }
        
            return item;
          });
     //   console.log(newdata);
        setMenudata(newdata);

        if(chkstat){
            state.appmenu.push({
                id: row.menuuuid,
             desc: row.menuname});
        }else{
            if(state.appmenu.length>0){
                for (let index = 0; index < state.appmenu.length; index++) {
                    const element = state.appmenu[index];
                    if(element.id==row.id){
                        state.appmenu.slice(0,index);
                        break;
                    }
                    
                }
            }
        }



        // setState({...state, ["rolename"]: value });

    }
  }
  const handleChange = (e) => {
  
    const { id, value } = e.target
    if (e.target.type === 'checkbox' ) {
        setState({...state, ["isactive"]: (e.target.checked==true?e.target.checked:false) });
    }else{
        setState({...state, ["rolename"]: value });
    }
  
    
  
   
 }

 const onUpdateItem = i => {
//  setUserdata({ ...userdata, ["data"]: [...userdata.data,newuser ] });

  //setRoledata
  
};


 const savedata = () => {

    if(state.rolename.length==0){
        notify(2,"Please role name !");
      }

    var _filtermenu=menudata.filter(x=>x.allow==true);

    var _appmenu=[];
    var _menuitem=[];
    if(_filtermenu.length>0){
        for (let index = 0; index < _filtermenu.length; index++) {
            var element = _filtermenu[index];
            if(element.menufor=="0"){
                //web menu
                _menuitem.push({
                    "id":element.menuuuid , 
                    "desc": element.menuname
                })
            }else{
                _appmenu.push({
                    "id":element.menuuuid , 
                    "desc": element.menuname
                })
            }

        }
        
    }


    var data={flag:state.id==""?"i":'u',isactive:1,roleid:state.id,rolename:state.rolename,appmenu:_appmenu,menuitem:_menuitem,
    loggedinid:loginuser.id,}
    dataservice("role",{ requestfor: 'role' ,
        data:{flag:state.id==""?"i":'u',isactive:state.isactive==true?1:0,roleid:state.id,rolename:state.rolename,appmenu:_appmenu,menuitem:_menuitem,
        loggedinid:loginuser.id,}})
        .then(function(data) {
          if(data.resultkey==1){
            
            if(state.id!=""){
          
                const newdata = rawroledata.data.map((item) => {
                     ;
                    if (item.id === state.id) {
                      const updatedItem = {
                        ...item,
                        isactive: state.isactive==true?"1":"0",
                        rolename: state.rolename
                      };
                
                      return updatedItem;
                    }
                
                    return item;
                  });
                  console.log(newdata);
                  setRawRoleData({ ...rawroledata, ["data"]: newdata });
                  resetvalues();
                  setUserModalPopUp(!usermodalpopup);
                  notify(1,`Data updated successfully.`);
      
              }else{
                
                var result=data.resultvalue[0];
         
                var newdata={
                  "id" : result.rowid,
                  isactive: state.isactive==true?"1":"0",
                  rolename: state.rolename
                 
                };
    
                setRawRoleData({ ...rawroledata, ["data"]: newdata });
                resetvalues();
                setUserModalPopUp(!usermodalpopup);
                notify(1,`Data save successfully.`); 
              }
          }else{
    
          }
        })
        .catch(function(error){
             ;
        });




    
  //vaildation
//   var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
     
//   if(state.email.length==0){
//     notify(2,"Please enter email id !");
//   }else if(!pattern.test(state.email)){
//     notify(2,"Invaild email id !");
//   }else if(state.password.length==0){
//     notify(2,"Please enter password !");
//   }else if(state.username.length==0){
//     notify(2,"Please enter username !");
//   }else if(selectedrolevalue==0){
//     notify(2,"Please select role !");
//   }else{
     
//     dataservice("user",{ requestfor: 'user' ,
//     data:{flag:state.id==""?"i":'u',username:state.username,password:state.password,email:state.email,
//     loggedinid:loginuser.id,roleid:selectedrolevalue,isactive:state.isactive,id:state.id}})
//     .then(function(data) {
//       if(data.resultkey==1){
//         if(state.id!=""){
          
//           onUpdateItem(state.id);

//         }else{
//             var result=data.resultvalue;
//             var rolename=roledata.filter(x=>x.value==selectedrolevalue);

//             var newuser={
//               "id" : result.rowid,
//               "username" : state.username,
//               "isactive":"1",
//               "email":state.email,
//               "roleid":selectedrolevalue,
//               "rolename":rolename.length>0?rolename[0].label:""
//             };


//             setUserdata({ ...userdata, ["data"]: [...userdata.data,newuser ] });
//             resetvalues();
//             notify(1,`Data save successfully.`);
//         }
       
      
//       }else{

//       }
//     })
//     .catch(function(error){
       
//     })
//   }
 
 };

 useEffect(()=>{
   
  getroledata();
  resetvalues();
  getroledetail();
},[])
useEffect(()=>{
        for (let index = 0; index < menudata.length; index++) {
            let element = menudata[index];
            element.allow=false;
        }
    if(state.rolename!=""){
        
         ;
        for (let index = 0; index < state.appmenu.length; index++) {
            let elementapp = state.appmenu[index];
            var _menu= menudata.filter(x=>x.menuuuid==elementapp.id);
            if(_menu.length>0){
                _menu[0].allow=true;
            }
        }
        for (let index = 0; index < state.menu.length; index++) {
            let elementmenu = state.menu[index];
            var _menu= menudata.filter(x=>x.menuuuid==elementmenu.id);
            if(_menu.length>0){
                _menu[0].allow=true;
            }
        }
    } 
    
},[state])


const getroledetail=()=>{
    dataservice("role",{ requestfor: 'getmenudetail' ,data:{}})
    .then(function(data) {
      if(data.resultkey==1){
           
        var result=data.resultvalue;
        if(result.length>0){

            for (let mind = 0; mind < result.length; mind++) {
                let menuelement = result[mind];
                menuelement.allow=false;
            }

            setMenudata(result);
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
const getroledata=()=>{
  dataservice("role",{ requestfor: 'getrole' ,data:{flag:'a'}})
  .then(function(data) {
    if(data.resultkey==1){
      var result=data.resultvalue;
      if(result.length>0){

        var _result=result.filter(x=>x.id!="0");
        
        setRawRoleData({ ...rawroledata, ["data"]: _result });
        let seelectroledata=[{
          value: 0,
          label: "Select Role"
        }];
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
        //  console.log(element);
          if(element.isactive){
            seelectroledata.push({
              value: parseInt(element.id),
              label: element.rolename
            })
          }
        }
        
        setRoledata(seelectroledata);
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
    rolename: "",
    appmenu: [],
    menu: [],
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
                Role
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
              <CModalTitle>Role </CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol md="12">
                  <CForm>  
                        <CRow >
                            <CCol xs="6" className="text-right">
                                <CInputGroup className="mb-3">
                                <CInputGroupPrepend>
                                    <CInputGroupText>
                                    <CIcon name="cil-settings" style={{ color: "red" }} /><sup style={{ color: "red" }}>*</sup>
                                    </CInputGroupText>
                                </CInputGroupPrepend>
                                <CInput onChange={handleChange} type="text" value={state.rolename} id="rolename" placeholder="Enter role name" />
                                </CInputGroup>
                            </CCol> 
                            <CCol xs="4">
                                <CFormGroup row>
                                    <CCol md="9">
                                        <CFormGroup variant="custom-checkbox" inline>
                                            <CInputCheckbox custom id="isactive" name="inline-checkbox2" 
                                            value={state.isactive} checked={state.isactive}   
                                            onChange={handleChange}/>
                                            <CLabel variant="custom-checkbox" htmlFor="isactive">
                                                Active
                                           </CLabel>
                                         
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                      <h3>Web Setting</h3><br></br>
                        <CRow>
                       
                            {(() => {
                                  const rows = [];
                                   //if(state.menu.length>0){
                                    if (menudata.length>0) {
                                        var web=menudata.filter(x=>x.menufor==0);
                                        var webmenus;
                                       
                                       
                                        for (let mindex = 0; mindex < web.length; mindex++) {
                                           const melement = web[mindex];
                                        //    if(state.menu.length>0){
                                        //        webmenus=state.menu;
                                        //        melement.allow=webmenus.filter(x=>x.id==melement.menuuuid).length>0?true:false;
                                          
                                        //    }
                                            rows.push(<>
                                               <CCol xs="4">
                                                    <CFormGroup row>
                                                        <CCol md="9">
                                                            <CFormGroup variant="custom-checkbox" inline>
                                                                <CInputCheckbox custom id= {melement.menuname} name="inline-checkbox2" value={melement.allow} checked={melement.allow}   
                                                                onChange={e => handleChange1(melement, e)}/>
                                                                <CLabel variant="custom-checkbox" htmlFor= {melement.menuname}>
                                                                    {melement.menuname}
                                                               </CLabel>
                                                             
                                                            </CFormGroup>
                                                        </CCol>
                                                    </CFormGroup>
                                                </CCol>
                                            </>); 
                                        }
                                     
                                       
   
                                       return rows;
                                     }
                                  // }
                                  

                                })()}

                        </CRow>
                      <h3>Mobile Setting</h3><br></br>
                        <CRow>
                            {(() => {
                                  const rows = [];
                                 // if(state.appmenu.length>0){
                                    if (menudata.length>0) {
                                        var appmenus;
                                         
                                       
                                        var mobile=menudata.filter(x=>x.menufor==1);
                                         for (let mindex = 0; mindex < mobile.length; mindex++) {
                                             const melement = mobile[mindex];
                                            //  if(state.appmenu.length>0){
                                            //     appmenus=state.appmenu;
                                            //     melement.allow=appmenus.filter(x=>x.id==melement.menuuuid).length>0?true:false;
                                           
                                            // }
                                            
                                             rows.push(<>
                                                <CCol xs="4">
                                                     <CFormGroup row>
                                                         <CCol md="9">
                                                             <CFormGroup variant="custom-checkbox" inline>
                                                                 <CInputCheckbox custom id={melement.menuname} name="inline-checkbox2"
                                                                  value={melement.allow} checked={melement.allow}   
                                                                  onChange={e => handleChange1(melement, e)}/>
                                                                 <CLabel variant="custom-checkbox" htmlFor={melement.menuname}>
                                                                     {melement.menuname}
                                                                </CLabel>
                                                              
                                                             </CFormGroup>
                                                         </CCol>
                                                     </CFormGroup>
                                                 </CCol>
                                             </>); 
                                         }
                                      
                                        
    
                                        return rows;
                                      }
                                 // }
                                  

                                })()}

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
             {...rawroledata}
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

export default Role
