import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,CCardFooter,
  CRow,CProgress, CFooter
  
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
const Boatstatus = () => {
    const[boatdata,setBoatdata]=useState({});
      
   
const getboatdata=()=>{
    dataservice("boat",{ requestfor: 'getboat' ,data:{flag:'a'}})
    .then(function(data) {
      if(data.resultkey==1){
        var result=data.resultvalue;
          ;
        setBoatdata({ ...boatdata, result });
      }else{
      //  notify(2,"No data found");
      }
          
      })
      .catch(function(edata){
          notify(2,edata.toString(),1);
      });
  
  
  
  }

  useEffect(()=>{
   
    getboatdata();
    
  
},[])
  return (
    <>
    <CRow>
    <CCol >
         <CCard >
            <CCardBody>
                <CCol xs="12">
                        Fliter            
                </CCol>
            </CCardBody>
            
        </CCard>
    </CCol>
       
        
    </CRow>
     <CRow>
     {(() => {
                              const rows = [];
                              if (boatdata.result) {
                                for (let i = 0; i < boatdata.result.length; i++) {
                                  var _boat = boatdata.result[i];
                                  //_veh.checked = false;
                                  if(_boat.isactive=="1"){
                                    rows.push(<>  <CCol xs="12" sm="6" lg="3">
                                    <CCard>
                                        <CCardHeader>
                                           Name: {_boat.description}<br></br>
                                          <sup> Owner: {_boat.ownername}</sup>
                                        </CCardHeader>
                                        <CCardBody>
                                            <p>Capacit:{_boat.capacity}</p>
                                            <p>Current Port:A</p>
                                                 <CProgress color="success" animated size="xs" className="my-3" value={10}/>      
                                        </CCardBody>
                                        <CFooter style={{background:"transparent"}}>
                                        EST TIme:
                                                
                                           
                                        </CFooter>
                                       
                                    </CCard>
                              
                                    </CCol></>);
                                  }
                                 
                                }
                                return rows;
                              }

                            })()}
    
       
     </CRow>
    </>
    
  )
}

export default Boatstatus
