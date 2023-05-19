import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  //user menu
  let navigationnew = [];
  var login = localStorage.getItem("userinfo");


  if (login !== null) {
    var _loginjson = JSON.parse(login);
    if (_loginjson.roleid == 0) {
      navigationnew = navigation;
    }
    if (localStorage.getItem("menu") != null && localStorage.getItem("menu") != undefined) {
      if (_loginjson.roleid == 0) {
        navigationnew = navigation;
      } else {
        var menu = JSON.parse(localStorage.getItem("menu"));
        if (menu.length > 0) {
          for (let index = 0; index < navigation.length; index++) {
            const element = navigation[index];
            element.isvisbale = false;
            var menuexist = menu.filter(x => x.menuuuid == element.id);
            if (menuexist.length > 0) {
              element.isvisbale = true;
            }

          }
          //set master
          let master = navigation.filter(x => x.isvisbale == true && x.menuid == 1);
          if (master.length > 0) {
            let menumaster = navigation.filter(x => x.id == "Master");
            menumaster[0].isvisbale = true;
          }
          //set report
          let report = navigation.filter(x => x.isvisbale == true && x.menuid == 2);
          if (report.length > 0) {
            let reportmaster = navigation.filter(x => x.id == "Report");
            reportmaster[0].isvisbale = true;
          }
        }

        navigationnew = navigation.filter(x => x.isvisbale == true);
      }




    }
    // window.location.href=window.location.pathname+  "#/dashboard";
  } else {
    //window.location.href = window.location.pathname + "#/registernew";
    window.location.href = window.location.pathname + "#/homepage";
  }





  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        /> */}
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigationnew}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
