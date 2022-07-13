import React, { useState, useEffect, useContext } from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple';
import ChartBarSimple from '../charts/ChartBarSimple';
import dataservice from "../service/dataservice";

const WidgetsDropdown = () => {
  // render
  const [GAmonth, setGAmonth] = useState(2);
  const [GAmonthstr, setGAmonthstr] = useState("Feb");
  const [Cmonthstr, setCmonthstr] = useState("Feb");
  const [Cmonth, setCmonth] = useState(2);

  const [GARawData, setGARawData] = useState([]);
  const [GAData, setGAData] = useState([]);
  const [GALabel, setGALabel] = useState([]);

  const [CRawData, setCRawData] = useState([]);
  const [CData, setCData] = useState([]);
  const [CLabel, setCLabel] = useState([]);


  const [BRawData, setBRawData] = useState([]);
  const [BData, setBData] = useState([]);
  const [BLabel, setBLabel] = useState([]);

  const [Months, setMonths] = useState([{ name: "Jan", id: 1 }, { name: "Feb", id: 2 }, { name: "Mar", id: 3 }, { name: "Apr", id: 4 }, { name: "May", id: 5 }, { name: "Jun", id: 6 },
  { name: "Jul", id: 7 }, { name: "Aug", id: 8 }, { name: "Sep", id: 9 }, { name: "Oct", id: 10 }, { name: "Nov", id: 11 }, { name: "Dec", id: 12 }]);

  const getGuestArrived = (isFetchCurrentMonth, Month) => {
    dataservice("dashboardstats", {
      requestfor: 'getGuestArrived',
      data: { isCurrentMonth: isFetchCurrentMonth, month: Month }
    })
      .then(function (data) {
        //debugger;
        if (data.resultkey == 1) {
          var _GARawdata = [];
          var _GAData = [];
          var _GAlabels = [];
          if (data.resultvalue.length > 0) {
            for (let index = 0; index < data.resultvalue.length; index++) {
              const element = data.resultvalue[index];
              _GARawdata.push({ cnt: parseFloat(element.count), mnt: element.mnt, dt: element.dt });
              if (parseFloat(element.mnt) == GAmonth) {
                _GAData.push(parseFloat(element.count));
                _GAlabels.push(element.dt);
              }
            }
          }
          setGARawData(_GARawdata)
          setGAData(_GAData);
          setGALabel(_GAlabels);

        }
      })
  }

  const getCollection = () => {
    dataservice("dashboardstats", { requestfor: 'getCollection', data: { month: Cmonth } })
      .then(function (data) {
        if (data.resultkey == 1) {
          var _CRawdata = [];
          var _CData = [];
          var _Clabels = [];
          if (data.resultvalue.length > 0) {
            for (let index = 0; index < data.resultvalue.length; index++) {
              const element = data.resultvalue[index];
              _CRawdata.push({ cnt: parseFloat(element.count), mnt: element.mnt, dt: element.dt });
              if (parseFloat(element.mnt) == GAmonth) {
                _CData.push(parseFloat(element.count));
                _Clabels.push(element.dt);
              }
            }
          }
          debugger;
          setCRawData(_CRawdata)
          setCData(_CData);
          setCLabel(_Clabels);
        }
      })
  }



  const handleClick = (id, opt) => {
    var monthstr = "";
    switch (id) {
      case 1:
        monthstr = "Jan";
        break;
      case 2:
        monthstr = "Feb";
        break;
      case 3:
        monthstr = "Mar";
        break;
      case 4:
        monthstr = "Apr";
        break;
      case 5:
        monthstr = "May";
        break;
      case 6:
        monthstr = "Jun";
        break;
      case 7:
        monthstr = "Jul";
        break;
      case 8:
        monthstr = "Aug";
        break;
      case 9:
        monthstr = "Sep";
        break;
      case 10:
        monthstr = "Oct";
        break;
      case 11:
        monthstr = "Nov";
        break;
      case 12:
        monthstr = "Dec";
        break;

      default:
        break;
    }
    switch (opt) {
      case "GA":

        debugger;
        var _GAData = [];
        var _GAlabels = [];
        var newGAData = GARawData.filter(x => parseFloat(x.mnt) == id);
        for (let index = 0; index < newGAData.length; index++) {
          const element = newGAData[index];
          _GAData.push(parseFloat(element.cnt));
          _GAlabels.push(element.dt);
        }
        setGAData(_GAData);
        setGALabel(_GAlabels);

        setGAmonth(id);
        setGAmonthstr(monthstr);


        break;
      case "C":
        debugger;
        var _CData = [];
        var _Clabels = [];
        var newCData = CRawData.filter(x => parseFloat(x.mnt) == id);
        for (let index = 0; index < newCData.length; index++) {
          const element = newCData[index];
          _CData.push(parseFloat(element.cnt));
          _Clabels.push(element.dt);
        }
        setCData(_CData);
        setCLabel(_Clabels);

        setCmonth(id);
        setCmonthstr(monthstr);
        break;
      default:
        break;
    }

  }
  useEffect(() => {
    getGuestArrived(true, 1);
    // getCollection();
  }, [])
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={GAmonthstr}
          text="Guest Arrived"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: '70px' }}
              dataPoints={GAData}
              pointHoverBackgroundColor="primary"
              label="Count"
              labels={GALabel}
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              {/* <CIcon name="cil-settings" /> */}
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">

              <CDropdownItem onClick={() => handleClick(1, "GA")}>Jan</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(2, "GA")}>Feb</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(3, "GA")}>Mar</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(4, "GA")}>Apr</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(5, "GA")}>May</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(6, "GA")}>Jun</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(7, "GA")}>Jul</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(8, "GA")}>Aug</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(9, "GA")}>Sep</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(10, "GA")}>Oct</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(11, "GA")}>Nov</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(12, "GA")}>Dec</CDropdownItem>

            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={Cmonthstr}
          text="Collection"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              dataPoints={CData}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 } } }}
              label="Collection"
              labels={CLabel}
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              {/* <CIcon name="cil-settings" /> */}
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem onClick={() => handleClick(1, "C")}>Jan</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(2, "C")}>Feb</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(3, "C")}>Mar</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(4, "C")}>Apr</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(5, "C")}>May</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(6, "C")}>Jun</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(7, "C")}>Jul</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(8, "C")}>Aug</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(9, "C")}>Sep</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(10, "C")}>Oct</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(11, "C")}>Nov</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(12, "C")}>Dec</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>



      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header=""
          text="Bracelet Stats"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              dataPoints={[{
                label: 'Buy',
                backgroundColor: 'rgb(250, 152, 152)',
                data: [39, 80, 40, 35, 40, 20, 45]
              }, {
                label: 'Rent',
                backgroundColor: 'rgb(0,216,255,0.9)',
                data: [39, 80, 40, 35, 40, 20, 45]
              }]}
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              {/* <CIcon name="cil-settings" /> */}
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem onClick={() => handleClick(1, "B")}>Jan</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(2, "B")}>Feb</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(3, "B")}>Mar</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(4, "B")}>Apr</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(5, "B")}>May</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(6, "B")}>Jun</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(7, "B")}>Jul</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(8, "B")}>Aug</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(9, "B")}>Sep</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(10, "B")}>Oct</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(11, "B")}>Nov</CDropdownItem>
              <CDropdownItem onClick={() => handleClick(12, "B")}>Dec</CDropdownItem>

            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header=""
          text="Sr.Citizen Stats"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{ height: '70px' }}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 } } }}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              {/* <CIcon name="cil-settings" /> */}
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Jan</CDropdownItem>
              <CDropdownItem>Feb</CDropdownItem>
              <CDropdownItem>Mar</CDropdownItem>
              <CDropdownItem>Apr</CDropdownItem>
              <CDropdownItem>May</CDropdownItem>
              <CDropdownItem>Jun</CDropdownItem>
              <CDropdownItem>Jul</CDropdownItem>
              <CDropdownItem>Aug</CDropdownItem>
              <CDropdownItem>Sep</CDropdownItem>
              <CDropdownItem>Oct</CDropdownItem>
              <CDropdownItem>Nov</CDropdownItem>
              <CDropdownItem>Dec</CDropdownItem>

            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
