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

import { Editor } from '@tinymce/tinymce-react';

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
const RefundProcedureMst = () => {
    const [editorvalue, setSeteditorval] = useState([]);
    const [edit, setSetedit] = useState({
        value: ""
    });
    const [redirecturl,setRedirectUrl]=useState(window.location.host);
  const handleEditorChange = (e) => {
    
    setSetedit({ ...edit, ["value"]: e});
    setSeteditorval({ ...editorvalue, e });
  }

  const getpagedata=()=>{
    dataservice("staticpage",{ requestfor: 'getstaticpages' ,data:{}})
    .then(function(data) {
      if(data.resultkey==1){
        var result=data.resultvalue;
        if(result.length>0){
            var _filter=result.filter(x=>x.id==4);
            var pagedata="";
            if(_filter.length>0){
                pagedata=_filter[0].pagedata;
            }
            setSeteditorval({ ...editorvalue, pagedata });
            setSetedit({ ...edit, ["value"]: pagedata});
        }
         
        // setSeteditorval({ ...editorvalue, result });
        // setSetedit({ ...edit, ["value"]: result});
        //setFeesdata({ ...feedata, ["data"]: result });
      }else{
      //  notify(2,"No data found");
      }
          
      })
      .catch(function(edata){
          notify(2,edata.toString(),1);
      });
  
  } 
 const savedata = () => {
    //vaildation
    if(edit.value==""){
        notify(2,"Please enter disclaimer !");
    }else{
        var login=localStorage.getItem("userinfo");
        if(login!==null){
            var _loginjson=JSON.parse(login);
       
            dataservice("staticpage",{ requestfor: 'addeditpage' ,
            data:{pageid:4,pagevalue:
            edit.value.toString().replace(/[']/g, '**'),loginid:_loginjson.id}})
            .then(function(data) {
            ;
            if(data.resultkey==1){
                
                    notify(1,`Data save successfully.`);
                
            
            
            }else{
                notify(2,`Contact to administrator.`);
            }
            })
            .catch(function(error){
            
            });
        }
    }
    

 }

useEffect(()=>{
   
    getpagedata();
   
  
},[])


  return (
    <>
   <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol xl={6}>
              Refund Procedure
                <small className="text-muted"> Master</small>
              </CCol>
              <CCol xl={6} style={{textAlign:"end"}}>
                  <CButton
                    onClick={() => savedata()}
                    className="mr-1"
                    color="primary"
                
                  >
                    Save
                
                  </CButton>
            
                </CCol>
            </CRow>
            <CRow>
              <CCol xl={6}>
                   <a href="/#/refundprocedure" target="blank">{redirecturl}/#/refundprocedure</a> 
              </CCol>
            </CRow> 
           
         
          </CCardHeader>
          <CCardBody>
                        <Editor 
                          value={edit.value}
                          initialValue=""
                          init={{
                            selector: "textarea",
                            //images_upload_url: 'upload.php',
                            // images_upload_handler: function (blobInfo, success, failure) {
                            //   var xhr, formData;
                          
                            //   xhr = new XMLHttpRequest();
                            //   xhr.withCredentials = false;
                            //   xhr.open('POST', 'https://investors.bbsmidwest.com/investorportalphp/upload.php');
                          
                            //   xhr.onload = function() {
                            //     var json;
                          
                            //     if (xhr.status != 200) {
                            //       failure('HTTP Error: ' + xhr.status);
                            //       return;
                            //     }
                            //     json = JSON.parse(xhr.responseText);
                          
                            //     // if (!json || typeof json.location != 'string') {
                            //     //   failure('Invalid JSON: ' + xhr.responseText);
                            //     //   return;
                            //     // }
                            //     var url="https://investors.bbsmidwest.com/investorportalphp/uploads/"+json.resultvalue.newfilename[0];
                            //     success(url);
                            //   };
                          
                            //   formData = new FormData();
                            //   formData.append('files', blobInfo.blob(), blobInfo.filename());
                          
                            //   xhr.send(formData);
                            // },
                            // /* we override default upload handler to simulate successful upload*/
                            // images_upload_handler: function (blobInfo, success, failure) {
                            //   console.log(blobInfo);
                            //   setTimeout(function () {
                            //      
                            //     /* no matter what you upload, we will turn it into TinyMCE logo :)*/
                            //     success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
                            //   }, 2000);
                            // },
                            menubar: false,
                             height: 500,
                             width: '100%',
                             plugins: "lists",
    toolbar: 'undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist |code'
                            // menubar: true,
                            // image_advtab: true,
                            // plugins: '',
                            // toolbar:
                            //   'undo redo | formatselect | bold italic backcolor | \
                            //       alignleft aligncenter alignright alignjustify | \
                            //       bullist numlist outdent indent | removeformat | help'
                          }}
                          onEditorChange={handleEditorChange}
                        />
        
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
      </>
    
  )
}

export default RefundProcedureMst
