import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {
  
  
  
  var login=localStorage.getItem("userinfo");
  if(login!==null){
 
   // window.location.href=window.location.pathname+  "#/dashboard";
  }else{
    window.location.href=window.location.pathname+  "#/registernew";
  }
   
  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
