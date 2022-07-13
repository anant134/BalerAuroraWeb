import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
  CBadge,
  CContainer,
  CSelect,
  CCardFooter,
  CImg,
  CHeader,
} from "@coreui/react";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Select from "react-select";
import CIcon from "@coreui/icons-react";
import dataservice from "../../service/dataservice";
import { toast } from "react-toastify";
import { InputDecimal } from "../../commoncomponents/inputdecimal";
import DatePicker from "react-date-picker";
import { discounticon } from "src/assets/icons/discounticon";
import moment from "moment";
import uuid from "react-uuid";
import common from "../../common/common";
import { userContext } from "src/views/userContext";
import { FormFile } from "react-bootstrap";
import CheckedSelect from "react-select-checked";
import * as XLSX from "xlsx";
import { freeSet } from "@coreui/icons";
import { getIconsView } from "../../icons/brands/Brands.js";
const TravelInfo = (traveldata) => {
  var processing = process.env.PUBLIC_URL + "/processing.gif";

  /*#region notification  */
  const notify = (type, message, systemerror) => {
    switch (type) {
      case 1:
        toast.success(message, {
          position: toast.POSITION.TOP_CENTER,
        });
        break;
      case 2:
        var dtlmsg;
        if (systemerror !== undefined) {
          dtlmsg = (
            <div>
              Please contact to administrator!<br></br>
              {message}
            </div>
          );
        } else {
          dtlmsg = <div>{message}</div>;
        }

        toast.error(
          <div>
            <CIcon name="cil-warning" /> Error
            {dtlmsg}
          </div>,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        break;
      case 3:
        toast.warning(message, {
          position: toast.POSITION.TOP_CENTER,
        });
      default:
        break;
    }
  };
  /*#endregion notification  */
  const { gacc, setgacc } = useContext(userContext);
  const [localtravelinfodata, setLocalTravelInfoData] = useState([]);
  const [isguest, setIsGuest] = useState(false);
  const [isupdatevehicle, setIsUpdateVehicle] = useState(false);
  const [isboatselection, setIsBoatSeletion] = useState(true);
  const [ishotelprovideboat, setIsHotelProvideBoat] = useState(false);
  const [guestactivepostion, setActivePosition] = useState(0);
  const [filedata, setfiledata] = useState([]);
  const [selectedpreferredtimemorning, setselectedpreferredtimemorning] =
    useState(true);
  const [isvehicle, setIsVehicle] = useState(false);
  const [isboatselectionopen, setIsBoatSeletionOpen] = useState(true);
  const [isconfirmbooking, setIsConfirmBooking] = useState(false);
  const [numberofdaystravel, setNumberofDays] = useState(1);
  const [returnguestmsg, setReturnGuestMsg] = useState("");
  const [isshowboatselection, setIsShowBoatSelection] = useState(true);
  const options = [
    { label: "Chocolate", value: "chocolate", disabled: true },
    { label: "Vanilla", value: "vanilla" },
    { label: "Strawberry", value: "strawberry" },
    { label: "Caramel", value: "caramel" },
  ];

  const currentSelection = [{ label: "Caramel", value: "caramel" }];
  const [feesdata, setFeesData] = useState([]);
  const getfees = () => {
    dataservice("fees", { requestfor: "getfees", data: { flag: "a" } })
      .then(function (data) {
        if (data.resultkey == 1) {
          //
          var result = data.resultvalue;

          setFeesData({ ...feesdata, data: result });
        } else {
          //  notify(2,"No data found");
        }
      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });
  };
  /*#region number of guest  */
  const [numberofguests, setNumberOfGuestData] = useState([]);
  const [timeslot, setTimeSlot] = useState([]);
  const [rawtimeslot, setRawTimeSlot] = useState([]);
  const [selectednumberguest, setSelectedNumberGuest] = useState("");
  const [selectedtimeslot, setSelectedTimeSlot] = useState("");
  const [selectednumberguestbeforeconfirm, setSelectedNumberGuestBeforConfirm] =
    useState("");
  const getnumberofguest = () => {
    let countdata = [];
    for (let index = 1; index <= parseInt(100); index++) {
      countdata.push({
        value: index,
        label: index.toString(),
      });
    }
    setNumberOfGuestData(countdata);
  };
  const handleChangeOptionNOG = (e) => {
    if (bulkuploaddata.length > 0) {
      setSelectedNumberGuestBeforConfirm(e.value);
      setIsConfirmChange(!isconfirmchange);
    } else {
      setSelectedNumberGuest(e.value);
    }

  };
  const handleChangeOptionTS = (e) => {
    debugger;
    setSelectedTimeSlot(e.value);

    //setSelectedTimeSlot(Array.isArray(e) ? e.map((x) => x.value) : []);

  };
  /*#endregion number of guest  */
  /*#region SDate  */

  const [selectedfromdate, setFromdate] = useState([new Date()]);
  const setselectedfromdate = (e) => {
    setFromdate(e);
    setTodate(e);
    var todata = e;
    var fromdata = e;
    const diffTime = Math.abs(todata - fromdata);
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays == 0 || diffDays == 1) {
      diffDays = 1;
    }
    setNumberofDays(diffDays);
  };

  /*#endregion SDate  */

  /*#region EDate  */
  const [selectedtodate, setTodate] = useState([new Date()]);
  const setselectedtodate = (e) => {
    setTodate(e);
    var todata = e;
    var fromdata =
      selectedfromdate[0] == undefined ? selectedfromdate : selectedfromdate[0];
    const diffTime = Math.abs(todata - fromdata);
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays == 0 || diffDays == 1) {
      diffDays = 1;
    }
    setNumberofDays(diffDays);
  };

  /*#endregion EDate  */
  /*#region Boat Type  */
  const [boatTypeData, setBoatTypeData] = useState([]);

  const getBoatType = () => {
    dataservice("boattype", { requestfor: "getboattype", data: { flag: "a" } })
      .then(function (data) {
        debugger;
        if (data.resultkey == 1) {
          var result = data.resultvalue;
          var countdata = [];
          for (let index = 0; index < result.length; index++) {
            //
            var d = result[index];

            if (d.isactive == "1") {
              if (d.id == 1) {
                var packdetail = d.desc;
                countdata.push({
                  id: d.id,
                  label: packdetail,
                  checked: true,

                });
              } else {
                var packdetail = d.desc;
                countdata.push({
                  id: d.id,
                  label: packdetail,
                  checked: false,

                });
              }
            }
          }
          setBoatTypeData(countdata);

        } else {
        }
      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });
  };



  const handleboattypechanges = (e) => {
    const { id, value } = e.target;
    console.log(selectedtimeslot);

    const newdata = boatTypeData.map((item) => {
      if (item.id.toString() === id) {
        const updatedItem = {
          ...item,
          checked: true,
        };

        return updatedItem;
      } else {
        const updatedItem = {
          ...item,
          checked: false,
        };

        return updatedItem;
      }

      return item;
    });
    debugger;
    setBoatTypeData(newdata);
    setSelectedTimeSlot(null);

    setSelectedBoatData([]);

    if (id == 3) {

      var filtertimeslot = rawtimeslot.filter(x => (x.boattype == 1 || x.boattype == 0));
      setTimeSlot(filtertimeslot);



    } else {
      var filtertimeslot = rawtimeslot.filter(x => (x.boattype == id || x.boattype == 0));
      setTimeSlot(filtertimeslot);

      getboatboatavailabilitybydate();


    }
    setSelectedTimeSlot(0);

    var filterBoat = boatdataprocess.filter(x => x.boattype == id)
    setBoatdata(filterBoat);
    setseletedboatbaseonavailability();


  };
  /*#endregion Boat Type  */

  /*#region Package  */
  const [packagedata, setPackagedata] = useState([]);

  const handlepackagechanges = (e) => {
    const { id, value } = e.target;
    var _preferredhotels = rawpreferredhotels.filter(x => x.packageid == id);
    let countdata = [];
    for (let index = 0; index < _preferredhotels.length; index++) {
      let item = _preferredhotels[index];
      countdata.push({ value: item.id, label: item.description });
    }
    setPreferredHotels(countdata);

    if (id == "1") {
      setIsBoatSeletion(value == "false" ? false : true);
      getboatboatavailabilitybydate();
      setseletedboatbaseonavailability();
      setIsShowBoatSelection(true);
    } else {
      setIsShowBoatSelection(false);
    }

    const newdata = packagedata.map((item) => {
      if (item.id.toString() === id) {
        const updatedItem = {
          ...item,
          checked: true,
        };

        return updatedItem;
      } else {
        const updatedItem = {
          ...item,
          checked: false,
        };

        return updatedItem;
      }

      return item;
    });

    setPackagedata(newdata);
  };

  const setdefaultpackage = () => {
    setIsBoatSeletion(false);
    setseletedboatbaseonavailability();

  };

  const getPackage = () => {
    dataservice("package", { requestfor: "getpackage", data: { flag: "a" } })
      .then(function (data) {
        if (data.resultkey == 1) {
          var result = data.resultvalue;
          var countdata = [];
          for (let index = 0; index < result.length; index++) {
            //
            var d = result[index];

            if (d.isactive == "1") {
              if (d.id == 1) {
                var packdetail = d.description;
                countdata.push({
                  id: d.id,
                  label: packdetail,
                  checked: true,
                  price: d.price,
                  isboatreq: d.isboatreq
                });
              } else {
                var packdetail = d.description;
                countdata.push({
                  id: d.id,
                  label: packdetail,
                  checked: false,
                  price: d.price,
                  isboatreq: d.isboatreq
                });
              }
            }
          }
          setPackagedata(countdata);
          setdefaultpackage();
        } else {
        }
      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });
  };
  /*#endregion Package  */

  /*#region Boat  */
  const [boatdata, setBoatdata] = useState([]);
  const [boatdataarr, setBoatdataarr] = useState([]);
  const [boatdataprocess, setBoatDataProcess] = useState([]);
  const [selectedboatdata, setSelectedBoatData] = useState([]);
  const [boatstatusdata, setBoatstatusdata] = useState();
  const handleChangeOptionBC = (e) => {
    // var bc = boatdata.filter(obj => obj.value === e.value);
    // setSelectedBoatData(bc);
    debugger;
    setSelectedBoatData(Array.isArray(e) ? e.map((x) => x.value) : []);
    //let bcapacityitem = boatdata.result.find(obj => obj.id === e.value);
  };
  const setseletedboatbaseonavailability = () => {
    var countdata = [];
    for (let index = 0; index < boatdataarr.length; index++) {
      var d = boatdataarr[index];
      d["perusercost"] = parseFloat(d.price) / parseFloat(d.capacity);
      if (d.isactive == "1") {
        if (selectedpreferredtimemorning) {
          if (d.slotid == 1) {
            var obj = {};
            var capdetail =
              d.description + `  (capacity-` + d.capacity + `)` + ` (7:00 AM)`;
            obj = { value: d.uuid, label: capdetail };
            countdata.push(obj);
          }
        } else {
          if (d.slotid == 2) {
            var obj1 = {};
            var capdetail =
              d.description + `  (capacity-` + d.capacity + `)` + ` (12:00 PM)`;
            obj1 = { value: d.uuid, label: capdetail };
            countdata.push(obj1);
          }
        }
      }
    }
    //  setBoatdata(countdata);
  };
  const getboatboatavailabilitybydate = () => {
    var fromdata =
      selectedfromdate[0] == undefined ? selectedfromdate : selectedfromdate[0];
    dataservice("boat", {
      requestfor: "checkboatavailability",
      data: { bookingdate: moment(fromdata).format("YYYY-MM-DD") },
    })
      .then(function (data) {
        if (data.resultkey == 1) {
          var tempdata = data.resultvalue;
          setBoatstatusdata(tempdata);
        } else {
          //  notify(2,"No data found");
        }
      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });
  };
  const getboatdata = () => {
    dataservice("boat", { requestfor: "getboatcapacity", data: { flag: "a" } })
      .then(function (data) {
        if (data.resultkey == 1) {
          var tempdata = data.resultvalue;
          debugger;
          var result = [];

          var countdata = [];
          for (let index = 0; index < tempdata.length; index++) {
            let element = tempdata[index];
            element.uuid = uuid();

            var obj1 = {};
            if (element.boattype == 2) {
              obj1 = {
                value: element.uuid,
                label: `  LGU Boat`,
                price: element.twowayprice,
                boattype: element.boattype
              };
            } else {
              obj1 = {
                value: element.uuid,
                label: `  (capacity-` + element.capacity + `)`,
                price: element.twowayprice,
                boattype: element.boattype
              };
            }

            countdata.push(obj1);
          }
          setBoatdataarr(tempdata);
          setBoatDataProcess(countdata);
          var filterBoat = countdata.filter(x => x.boattype == 1)
          if (filterBoat.length > 0) {
            setIsBoatSeletionOpen(false);
          } else {
            setIsBoatSeletionOpen(true);
          }

          setBoatdata(filterBoat);

          //   result.push(obj);
          //   var obj1={
          //     uuid:uuid(),
          //     capacity: element.capacity,
          //     description: element.description,
          //     id: element.id,
          //     isactive: "1",
          //     ownername: element.ownername,
          //     price: element.price,
          //     slotid: 2,
          //     status: element.status,
          //     twowayprice:element.twowayprice

          //   }
          //   result.push(obj1);
          // }
          // setBoatdataarr(result);
          // var countdata = [];
          // for (let index = 0; index < result.length; index++) {

          //   var d = result[index];
          //   d["perusercost"] = parseFloat(d.price) / parseFloat(d.capacity);
          //   if (d.isactive == "1") {
          //     if(d.slotid==1){
          //       var obj={};
          //       var capdetail = d.description + `  (capacity-` + d.capacity + `)`+` (7:00 AM)`;
          //       obj={ value: d.uuid, label:capdetail};
          //       countdata.push(obj)
          //     }
          //     if(d.slotid==2){
          //       var obj1={};
          //       var capdetail = d.description + `  (capacity-` + d.capacity + `)`+` (12:00 PM)`;
          //       obj1={ value: d.uuid, label:capdetail};
          //       countdata.push(obj1)
          //     }

          //   }

          // }
          // if(countdata.length>0){
          //   setIsBoatSeletionOpen(false);

          // }else{

          //   setIsBoatSeletionOpen(true);
          // }
          // setBoatdata(countdata);
          // setSelectedBoatData(countdata);
        } else {
          //  notify(2,"No data found");
        }
      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });
  };

  /*#endregion Boat  */

  /*#region hotel */
  const [rawpreferredhotels, setRawPreferredHotels] = useState([]);
  const [preferredhotels, setPreferredHotels] = useState([]);
  const [selectedpreferredhotels, setSelectedPreferredHotels] = useState([]);
  const [hotelbookingref, setHotelBookingRef] = useState([]);

  const handleChangeOptionPH = (e) => {
    var Ph = preferredhotels.filter((obj) => obj.value === e.value);
    setSelectedPreferredHotels(Ph);
    setLocalTravelInfoData({ ...localtravelinfodata, ["hotel"]: Ph });
  };

  const getpreferredhotels = () => {
    dataservice("hotel", { requestfor: "gethotel", data: { flag: "a" } })
      .then(function (data) {
        if (data.resultkey == 1) {
          var result = data.resultvalue;
          setRawPreferredHotels(result);
          //  ;
          let countdata = [];
          //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
          for (let index = 0; index < result.length; index++) {
            if (result[index].packageid == "1") {
              let item = result[index];
              countdata.push({ value: item.id, label: item.description });
            }


          }
          setPreferredHotels(countdata);
        } else {
          //  notify(2,"No data found");
        }
      })
      .catch(function (edata) {
        //   ;
        notify(2, edata.toString(), 1);
      });
  };
  /*#endregion hotel  */

  /*#region vehicle */
  const [vehicleselectdata, setVehicleSelectData] = useState([]);
  const [selectedvehicle, setSelectedVehicle] = useState([]);
  const [vehicledata, setvehiclearray] = useState([]);
  const [vehiclegriddata, setVehicleGridData] = useState([]);
  const [selvehiclefordelete, setSelectevehiclefordelet] = useState();
  const [vehicleqty, setVehicleQty] = useState([]);
  const [bookingdetail, setBookingDetail] = useState({
    fromdate: "",
    todate: "",
    timeslot: "",
    package: "",
    hotel: "",
    isboatproviderbyresort: false,
    vehicle: "",
    numberoofguest: 0,
    ETAF: 0,
    Bracelet: 0,
    totalcharge: 0,
    islandhoppingamt: 0
  });

  const columns = [
    {
      name: "Vehicle",
      selector: "typeofvehicle",
      sortable: true,
    },
    {
      name: "Qty",
      selector: "qty",
      sortable: true,
    },
    {
      name: "Total Charge",
      selector: "amount",
      sortable: true,
    },
    {
      name: "Action",
      selector: "action",
      ignoreRowClick: true,
      cell: (row) => (
        <>
          <CIcon
            name="cil-pencil"
            onClick={() => {
              editdata(row);
            }}
            className="mfe-2 custcusrsor"
          />{" "}
          <CIcon
            name="cil-trash"
            onClick={() => {
              setSelectevehiclefordelet(row);
            }}
            className="mfe-2 custcusrsor"
          />{" "}
        </>
      ),
    },
  ];
  const data = [];
  const [vgridata, setvgriddata] = useState({
    columns,
    data,
  });
  const editdata = (row, e) => {
    setIsUpdateVehicle(true);
    setVehicleQty(row.qty);
    console.log(row);
    var vh = [{ label: row.typeofvehicle, value: row.id }];
    setSelectedVehicle(vh);
  };

  const handleChangeVehicle = (e) => {
    var vh = vehicleselectdata.filter((obj) => obj.value === e.value);
    setSelectedVehicle(vh);
  };
  const handleChangevehicleqty = (index) => (e) => {
    console.log("index: " + index);
    console.log("property name: " + e.target.value);
    var _convertedval = isNaN(parseFloat(e.target.value));
    let newArr = [...vehicledata]; // copying the old datas array
    newArr[index].qty =
      isNaN(parseFloat(e.target.value)) == false
        ? parseFloat(e.target.value)
        : 0; // replace e.target.value with whatever you want to change it to

    setvehiclearray(newArr); // ??

    // updatevehicleprice();
    recaltotal();
  };


  const updatevehicleprice = () => {
    var todata =
      selectedtodate[0] == undefined ? selectedtodate : selectedtodate[0];
    var fromdata =
      selectedfromdate[0] == undefined ? selectedfromdate : selectedfromdate[0];
    const diffTime = Math.abs(todata - fromdata);
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays == 0 || diffDays == 1) {
      diffDays = 1;
    }
    var tamount = 0;
    if (vehicledata.length > 0) {
      var newdata = [];
      for (let index = 0; index < vehicleselectdata.length; index++) {
        const velement = vehicledata[index];
        var data = vehicleselectdata.map((item) => {
          if (item.id === velement.id) {
            const updatedItem = {
              ...item,
              amount: parseFloat(velement.unitprice) * diffDays * velement.qty,
            };

            return updatedItem;
          }

          return item;
        });
        var filterdata = data.filter((x) => x.id == velement.id);
        if (filterdata.length > 0) {
          newdata.push(filterdata[0]);
        }
      }
      if (newdata.length > 0) {
        setvgriddata({ ...vgridata, ["data"]: newdata });
      }
    }
    if (Array.isArray(localtravelinfodata)) {
    } else {
      var totalamount = 0;
      for (let index = 0; index < localtravelinfodata.fees.length; index++) {
        const element = localtravelinfodata.fees[index];
        if (element.id == 5) {
          element.amount = tamount;
        }
      }

      setLocalTravelInfoData({
        ...localtravelinfodata,
        ["fees"]: localtravelinfodata.fees,
      });
    }
  };

  const addvehicle = () => {
    if (selectedvehicle.length > 0 && vehicleqty != "") {
      var todata =
        selectedtodate[0] == undefined ? selectedtodate : selectedtodate[0];
      var fromdata =
        selectedfromdate[0] == undefined
          ? selectedfromdate
          : selectedfromdate[0];
      const diffTime = Math.abs(todata - fromdata);
      //const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays == 0 || diffDays == 1) {
        diffDays = 1;
      }
      var _obj = vehicledata.filter((x) => x.id == selectedvehicle[0].value);
      var _objdata;
      if (_obj.length > 0) {
        if (vgridata.data.length > 0) {
          var filtervh = vgridata.data.filter((x) => x.id == _obj[0].id);
          if (isupdatevehicle) {
            var tamount = _obj[0].amount * vehicleqty * diffDays;
            _objdata = {
              typeofvehicle: _obj[0].typeofvehicle,
              qty: vehicleqty,
              id: _obj[0].id,
              unitprice: _obj[0].amount,
              amount: tamount,
            };

            const newdata = vgridata["data"].map((item) => {
              if (item.id === _obj[0].id) {
                const updatedItem = {
                  ...item,
                  amount: tamount,
                  qty: vehicleqty,
                };

                return updatedItem;
              }

              return item;
            });

            setvgriddata({ ...vgridata, ["data"]: newdata });
          } else {
            if (filtervh.length > 0) {
              notify(3, "Vehicle Already exist!");
            } else {
              var tamount = _obj[0].amount * vehicleqty * diffDays;
              _objdata = {
                typeofvehicle: _obj[0].typeofvehicle,
                qty: vehicleqty,
                id: _obj[0].id,
                unitprice: _obj[0].amount,
                amount: tamount,
              };

              setvgriddata({
                ...vgridata,
                ["data"]: [...vgridata.data, _objdata],
              });
            }
          }
        } else {
          var tamount = _obj[0].amount * vehicleqty * diffDays;
          _objdata = {
            typeofvehicle: _obj[0].typeofvehicle,
            qty: vehicleqty,
            id: _obj[0].id,
            unitprice: _obj[0].amount,
            amount: tamount,
          };

          setvgriddata({ ...vgridata, ["data"]: [...vgridata.data, _objdata] });
        }
        setVehicleQty("");
        setIsUpdateVehicle(false);
      }
    }
  };

  const getvehicles = () => {
    //
    dataservice("vehicle", { requestfor: "getvehicle", data: { flag: "a" } })
      .then(function (data) {
        if (data.resultkey == 1) {
          var result = data.resultvalue;
          let countdata = [];
          //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
          for (let index = 0; index < result.length; index++) {
            //
            let item = result[index];
            countdata.push({ value: item.id, label: item.typeofvehicle });
            if (countdata.length === 1) {
              // setSelectedvehicle(item.id);
            }
          }
          setVehicleSelectData(countdata);

          for (let index = 0; index < result.length; index++) {
            const element = result[index];
            element.qty = 0;
          }

          setvehiclearray(result);
        } else {
          //  notify(2,"No data found");
        }
      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });
  };

  /*#endregion vehicle */

  /*#region slot  */
  const [slotdate, setSlotdate] = useState([]);
  const getslotdata = () => {
    dataservice("slots", { requestfor: "getslots", data: { flag: "a" } })
      .then(function (data) {
        debugger;
        if (data.resultkey == 1) {
          var tempdata = data.resultvalue;

          var countdata = [];
          countdata.push({
            value: 0,
            label: "Select Time",
            boattype: "0",
          });
          for (let index = 0; index < tempdata.length; index++) {
            countdata.push({
              value: tempdata[index].id,
              label: tempdata[index].description,
              boattype: tempdata[index].boattype,
            });
          }
          setRawTimeSlot(countdata);

          var filtertimeslot = countdata.filter(x => (x.boattype == 1 || x.boattype == 0));


          setTimeSlot(filtertimeslot); //document.write( dt );

          var filterseltimeslot = countdata.filter(x => (x.boattype == 0));

          setSelectedTimeSlot(0);
          // setSelectedBoatData(countdata);
        } else {
          //  notify(2,"No data found");
        }
      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });
  };
  /*#endregion slot */

  /*#region useeffect  */
  useEffect(() => {
    var ss = gacc;
    getBoatType();
    getboatboatavailabilitybydate();
    getnumberofguest();
    setLocalTravelInfoData(...localtravelinfodata, traveldata.data);
    setIsGuest(traveldata.data);
    getPackage();
    getboatdata();
    getpreferredhotels();
    getvehicles();
    getCitizenship();
    getCountry();
    getProvince();
    getMunicipalities();
    getGender();

    getslotdata();
    getfees();

  }, []);

  useEffect(() => {
    if (boatstatusdata != undefined) {

    }
  }, [boatstatusdata]);
  useEffect(() => {
    setseletedboatbaseonavailability();
  }, [selectedpreferredtimemorning]);
  useEffect(() => {
    if (selectednumberguest != "") {
      var guestdata = [];
      //

      for (let index = 0; index < selectednumberguest; index++) {
        if (index == 0) {
          var defaultguest = {
            Firstname: "",
            Middlename: "",
            Lastname: "",
            DOB: new Date(),
            Citizenship: "",
            CountryofOrigin: "",
            Province: "",
            Municipality: "",
            Gender: 0,
            Address: "",
            Mobilenumber: "",
            emailid: "",
            ismaubancitizen: false,
            filedata: "",
            fileid: uuid(),
            isactive: true,
            newfilename: "",
            oldfilename: "",
            isprimary: true,
            isdiscountapplied: false,
            discountedamt: 0,
            discountinfo: [],
            isreturningguest: false,
            isguestvaildated: false,
            isrentbracelet: false,
            braceletavailable: false,
            isLandHopping: false,
          };
          guestdata.push(defaultguest);
        } else {
          var defaultguest = {
            Firstname: "",
            Middlename: "",
            Lastname: "",
            DOB: new Date(),
            Citizenship: "",
            CountryofOrigin: "",
            Province: "",
            Municipality: "",
            Gender: 0,
            Address: "",
            Mobilenumber: "",
            emailid: "",
            ismaubancitizen: false,
            filedata: "",
            fileid: uuid(),
            isactive: true,
            newfilename: "",
            oldfilename: "",
            isprimary: false,
            isdiscountapplied: false,
            discountedamt: 0,
            discountinfo: [],
            isreturningguest: false,
            isguestvaildated: false,
            isrentbracelet: false,
            braceletavailable: false,
            isLandHopping: false,
          };
          guestdata.push(defaultguest);
        }
      }
      // setLocalTravelInfoData({...localtravelinfodata, ["guestinfo"]: guestdata})
      setLocalTravelInfoData({
        ...localtravelinfodata,
        ["numberofguest"]: selectednumberguest,
        ["guestinfo"]: guestdata,
      });
      recaltotal();
    }
  }, [selectednumberguest]);
  useEffect(() => {
    if (Array.isArray(localtravelinfodata)) {
    } else {
      var totalamount = 0;
      if (localtravelinfodata != undefined) {
        recaltotal();
      }
    }
  }, [localtravelinfodata]);

  useEffect(() => {
    if (packagedata.length > 0) {
      var filterpck = packagedata.filter((x) => x.checked == true);
      setLocalTravelInfoData({
        ...localtravelinfodata,
        ["package"]: filterpck,
      });
      if (filterpck.length > 0) {
        for (let index = 0; index < localtravelinfodata.fees.length; index++) {
          var element = localtravelinfodata.fees[index];
          if (element.id == 3) {
            var amountvalue = 0;
            for (let fp = 0; fp < filterpck.length; fp++) {
              var fpelement = filterpck[fp];
              amountvalue = amountvalue + parseFloat(fpelement.price);
            }
            element.amount = amountvalue;
          }
        }
      } else {
        for (let index = 0; index < localtravelinfodata.fees.length; index++) {
          var element = localtravelinfodata.fees[index];
          if (element.id == 3) {
            element.amount = 0;
          }
        }
      }
      recaltotal();
    }
  }, [packagedata]);
  useEffect(() => {
    debugger;
    if (selectedboatdata.length > 0) {
      // var bc = boatdata.filter(obj => obj.value === selectedboatdata);
      var selectedboats = [];
      for (let index = 0; index < selectedboatdata.length; index++) {
        const element = selectedboatdata[index];
        var filterdata = boatdataarr.filter((x) => x.uuid == element);
        if (filterdata.length > 0) {
          selectedboats.push(filterdata[0]);
        }
      }
      for (let index = 0; index < localtravelinfodata.fees.length; index++) {
        var element = localtravelinfodata.fees[index];
        if (element.id == 2) {
          var amountvalue = 0;
          for (let bp = 0; bp < selectedboatdata.length; bp++) {
            var bpelement = selectedboatdata[bp];
            var filterdata = boatdataarr.filter((x) => x.uuid == bpelement);
            if (filterdata.length > 0) {
              var isLGU = selectedboats[0].boattype == "2" ? true : false;
              if (isLGU) {
                amountvalue = amountvalue + (parseFloat(filterdata[0].twowayprice) * selectednumberguest);

              } else {
                amountvalue = amountvalue + parseFloat(filterdata[0].twowayprice);

              }
            }
          }
          element.amount = amountvalue;
        }
      }

      setLocalTravelInfoData({
        ...localtravelinfodata,
        ["boatinfo"]: selectedboats,
      });
    } else {
      if (Array.isArray(localtravelinfodata)) {
      } else {
        if (localtravelinfodata.fees.length > 0) {
          for (
            let index = 0;
            index < localtravelinfodata.fees.length;
            index++
          ) {
            var element = localtravelinfodata.fees[index];
            if (element.id == 2) {
              element.amount = 0;
            }
          }
          setLocalTravelInfoData({ ...localtravelinfodata, ["boatinfo"]: [] });
        }
      }
    }

    recaltotal();
  }, [selectedboatdata]);
  useEffect(() => {
    if (boatdataarr.length > 0) {
      setseletedboatbaseonavailability();
    }
  }, [boatdataarr]);
  useEffect(() => {
    if (vgridata.data.length > 0) {
      // var bc = boatdata.filter(obj => obj.value === selectedboatdata);

      setLocalTravelInfoData({
        ...localtravelinfodata,
        ["vehicle"]: vgridata.data,
      });
      for (let index = 0; index < localtravelinfodata.fees.length; index++) {
        var element = localtravelinfodata.fees[index];
        if (element.id == 5) {
          var amountvalue = 0;
          for (let fp = 0; fp < vgridata.data.length; fp++) {
            var fpelement = vgridata.data[fp];
            amountvalue = amountvalue + parseFloat(fpelement.amount);
          }
          element.amount = amountvalue;
        }
      }
    } else {
      if (Array.isArray(localtravelinfodata)) {
      } else {
        for (let index = 0; index < localtravelinfodata.fees.length; index++) {
          var element = localtravelinfodata.fees[index];
          if (element.id == 5) {
            element.amount = 0;
          }
        }
        recaltotal();
      }
    }
  }, [vgridata?.data]);
  useEffect(() => {
    if (selvehiclefordelete != undefined) {
      if (vgridata.data.length > 0) {
        var updateddata = vgridata.data.filter(
          (x) => x.id !== selvehiclefordelete.id
        );
        setvgriddata({ ...vgridata, ["data"]: updateddata });

        for (let index = 0; index < localtravelinfodata.fees.length; index++) {
          var element = localtravelinfodata.fees[index];
          if (element.id == 5) {
            var amountvalue = 0;
            for (let fp = 0; fp < updateddata.length; fp++) {
              var fpelement = vgridata.data[fp];
              amountvalue = amountvalue + parseFloat(fpelement.amount);
            }

            element.amount = amountvalue;
          }
        }
      }
      //
      recaltotal();
      //setLocalTravelInfoData({...localtravelinfodata, ["boatinfo"]:selectedboats});
    }
  }, [selvehiclefordelete]);
  useEffect(() => {
    if (Array.isArray(localtravelinfodata)) {
    } else {
      setgacc(localtravelinfodata);
    }
  }, [localtravelinfodata]);

  useEffect(() => {
    updatevehicleprice();
  }, [selectedfromdate]);
  useEffect(() => {
    updatevehicleprice();
  }, [selectedtodate]);

  useEffect(() => {
    if (filedata.length > 0) {
    }
  }, [filedata]);

  /*#endregion useeffect */

  const backaction = () => {
    setLocalTravelInfoData({ ...localtravelinfodata, ["isguest"]: false });
    if (localtravelinfodata.package[0].id != "1") {
      setIsVehicle(!isvehicle);
    }

  };
  const backtomainaction = () => {
    ;
    setIsVehicle(!isvehicle);
  };
  const getGender = () => {
    let countdata = [];
    let country = ["Male", "Female", "Other"];
    for (let index = 0; index < 3; index++) {
      countdata.push({
        value: index,
        label: country[index],
      });
    }
    setGender(countdata);
  };

  const nextotguest = () => {
    if (validationmainscreen()) {

      setaction();
      setIsVehicle(!isvehicle);
    }
  };


  const checkvehiclerequire = () => {
    //for cagbalete check vehicle
    if (localtravelinfodata.package[0].id == "1") {
      if (isvehicle == true) {
        if (
          selectednumberguest > 1 &&
          localtravelinfodata.parkingnotreq == false
        ) {
          var selveh = vehicledata.filter((x) => x.qty != 0);
          if (selveh.length > 0) {
          } else {
            notify(2, "Please add vehicle");
            return;
          }
        }
        setActivePosition(0);

        for (
          let index = 0;
          index < localtravelinfodata["guestinfo"].length;
          index++
        ) {
          localtravelinfodata["guestinfo"][index].DOB = new Date(
            localtravelinfodata["guestinfo"][index].DOB
          );
        }

        setGuestArr(localtravelinfodata["guestinfo"][0]);
        setLocalTravelInfoData({ ...localtravelinfodata, ["isguest"]: true });
        setSelectedDOB(localtravelinfodata["guestinfo"][0].DOB);
        localtravelinfodata["guestinfo"][0]["Citizenship"] =
          citizenship[0].value;
        setSelectedCS(citizenship[0].value);
        localtravelinfodata["guestinfo"][0]["CountryofOrigin"] =
          country[0].value;
        setSelectedCOO(country[0].value);
        var provincearr = RawProvince.filter(
          (x) => x.countryid == country[0].value
        );
        localtravelinfodata["guestinfo"][0]["Gender"] = 0;
        setSelectedGender(0);
        if (provincearr.length > 0) {
          var provincedata = getdropdownarr(provincearr);
          setProvince(provincedata);
          var _defaultprovince = provincedata.filter((x) => x.value == 81);
          var _deafultmunicipality;
          var Municipalityarr = RawMunicipality.filter(
            (x) => x.provinceid == 81
          );
          if (Municipalityarr.length > 0) {
            var municipalitydata = getdropdownarr(Municipalityarr);
            setMunicipality(municipalitydata);
            _deafultmunicipality = municipalitydata.filter(
              (x) => x.value == 1968
            );
          }
          for (
            let index = 0;
            index < localtravelinfodata["guestinfo"].length;
            index++
          ) {
            localtravelinfodata["guestinfo"][index]["Province"] =
              _defaultprovince[0].value;
            localtravelinfodata["guestinfo"][index]["Municipality"] =
              _deafultmunicipality[0].value;
            setSelectedProvince(_defaultprovince[0].value);
            setSelectedMunicipality(_deafultmunicipality[0].value);
          }
        }
      }

    } else {
      setActivePosition(0);

      for (
        let index = 0;
        index < localtravelinfodata["guestinfo"].length;
        index++
      ) {
        localtravelinfodata["guestinfo"][index].DOB = new Date(
          localtravelinfodata["guestinfo"][index].DOB
        );
      }

      setGuestArr(localtravelinfodata["guestinfo"][0]);
      setLocalTravelInfoData({ ...localtravelinfodata, ["isguest"]: true });
      setSelectedDOB(localtravelinfodata["guestinfo"][0].DOB);
      localtravelinfodata["guestinfo"][0]["Citizenship"] =
        citizenship[0].value;
      setSelectedCS(citizenship[0].value);
      localtravelinfodata["guestinfo"][0]["CountryofOrigin"] =
        country[0].value;
      setSelectedCOO(country[0].value);
      var provincearr = RawProvince.filter(
        (x) => x.countryid == country[0].value
      );
      localtravelinfodata["guestinfo"][0]["Gender"] = 0;
      setSelectedGender(0);
      if (provincearr.length > 0) {
        var provincedata = getdropdownarr(provincearr);
        setProvince(provincedata);
        var _defaultprovince = provincedata.filter((x) => x.value == 81);
        var _deafultmunicipality;
        var Municipalityarr = RawMunicipality.filter(
          (x) => x.provinceid == 81
        );
        if (Municipalityarr.length > 0) {
          var municipalitydata = getdropdownarr(Municipalityarr);
          setMunicipality(municipalitydata);
          _deafultmunicipality = municipalitydata.filter(
            (x) => x.value == 1968
          );
        }
        for (
          let index = 0;
          index < localtravelinfodata["guestinfo"].length;
          index++
        ) {
          localtravelinfodata["guestinfo"][index]["Province"] =
            _defaultprovince[0].value;
          localtravelinfodata["guestinfo"][index]["Municipality"] =
            _deafultmunicipality[0].value;
          setSelectedProvince(_defaultprovince[0].value);
          setSelectedMunicipality(_deafultmunicipality[0].value);
        }
      }
    }

    setTimeout(() => {
      setselectguest(0);
    }, 1000);
  }

  const setaction = () => {
    if (validationmainscreen()) {
      if (localtravelinfodata.isguest == true) {
        var touristinfodata = localtravelinfodata["guestinfo"];

        let seltimeslot = timeslot.filter((x) => x.value == selectedtimeslot);
        let val = Math.floor(1000 + Math.random() * 9000);
        var todata =
          selectedtodate[0] == undefined ? selectedtodate : selectedtodate[0];
        var fromdata =
          selectedfromdate[0] == undefined
            ? selectedfromdate
            : selectedfromdate[0];
        let Difference_In_Time = todata - fromdata;

        var Difference_In_Days = Math.floor(
          Difference_In_Time / (1000 * 3600 * 24)
        );
        var totalvehicleingrid = 0;
        if (vgridata.data) {
          for (let i = 0; i < vgridata.data.length; i++) {
            totalvehicleingrid = totalvehicleingrid + vgridata.data[i].qty;
          }
        }

        var _guestinfotosave = [];
        for (
          let index = 0;
          index < localtravelinfodata.guestinfo.length;
          index++
        ) {
          const element = localtravelinfodata.guestinfo[index];
          _guestinfotosave.push(element);
        }
        var setvehicle = vehicledata.filter((x) => parseFloat(x.qty) > 0);
        var finalvehicle = [];
        if (setvehicle.length > 0) {
          var todata =
            selectedtodate[0] == undefined ? selectedtodate : selectedtodate[0];
          var fromdata =
            selectedfromdate[0] == undefined
              ? selectedfromdate
              : selectedfromdate[0];
          const diffTime = Math.abs(todata - fromdata);
          //  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;
          let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays == 0 || diffDays == 1) {
            diffDays = 1;
          }
          for (let index = 0; index < setvehicle.length; index++) {
            const parkele = setvehicle[index];
            var cost = parseFloat(parkele.qty) * parseFloat(parkele.amount);
            parkele.totalcost = cost * diffDays;
          }
          for (let index = 0; index < setvehicle.length; index++) {
            const finalelement = setvehicle[index];
            if (finalelement.qty > 1) {
              // let newArr = [...finalelement];
              for (let index = 0; index < finalelement.qty; index++) {
                finalelement.uuid = uuid();
                finalvehicle.push(finalelement);
              }
            } else {
              finalelement.uuid = uuid();
              finalvehicle.push(finalelement);
            }
          }
        }

        var veh = "";
        if (finalvehicle.length > 0) {
          for (let index = 0; index < finalvehicle.length; index++) {
            const element = finalvehicle[index];
            veh =
              veh + "(" + element.typeofvehicle + " - " + element.qty + " ),";
          }
        }
        if (veh.length > 0) {
          veh = veh.substring(0, veh.length - 1);
        }
        var boatcap = "";
        if (localtravelinfodata.boatinfo.length > 0) {
          for (
            let index = 0;
            index < localtravelinfodata.boatinfo.length;
            index++
          ) {
            const element = localtravelinfodata.boatinfo[index];
            boatcap = boatcap + "(Capacity- " + element.capacity + " ),";
          }
        }
        if (boatcap.length > 0) {
          boatcap = boatcap.substring(0, boatcap.length - 1);
        }
        var islandhopper = touristinfodata.filter(x => x.isLandHopping == true).length;
        setBookingDetail({
          fromdate: moment(
            selectedfromdate[0] == undefined
              ? selectedfromdate
              : selectedfromdate[0]
          ).format("MMM-DD-YYYY"),
          todate: moment(
            selectedtodate[0] == undefined ? selectedtodate : selectedtodate[0]
          ).format("MMM-DD-YYYY"),
          timeslot: seltimeslot.length > 0 ? seltimeslot[0].label : "",
          boatcapcity: boatcap,
          package: localtravelinfodata.package[0].label,
          hotel:
            localtravelinfodata.hotel.length > 0
              ? localtravelinfodata.hotel[0].label
              : "",
          isboatproviderbyresort: ishotelprovideboat,
          vehicle: veh,
          numberoofguest: localtravelinfodata.numberofguest,
          ETAF: localtravelinfodata.fees[0].amount,
          totalcharge: localtravelinfodata.fees[8].amount,
          Bracelet: localtravelinfodata.fees[1].amount,
          islandhoppingamt: (localtravelinfodata.fees[4].amount * islandhopper),
        });

        if (vaildationbeforepay()) {
          setIsConfirmBooking(!isconfirmbooking);
        }
        // Savedata();
      } else {
        checkvehiclerequire();
      }
    }
  };

  const validationmainscreen = () => {
    debugger;
    var result = true;
    if (localtravelinfodata.numberofguest == "") {
      notify(2, "Please select number of guest");
      return false;
    } else if (localtravelinfodata.package.length <= 0) {
      notify(2, "Please select package");
      return false;
    } else {
      var iscagselected = false;
      for (let index = 0; index < localtravelinfodata.package.length; index++) {
        const element = localtravelinfodata.package[index];
        if (element.id == 1) {
          iscagselected = true;
          break;
        }
      }
      if (iscagselected) {
        if (
          localtravelinfodata.boatinfo.length <= 0 &&
          ishotelprovideboat == false
        ) {
          notify(2, "Please select boat");
          return false;
        } else {
          var _cap = 0;
          for (let bi = 0; bi < localtravelinfodata.boatinfo.length; bi++) {
            const element = localtravelinfodata.boatinfo[bi];
            _cap += parseFloat(element.capacity);
          }
          if (selectednumberguest > _cap && ishotelprovideboat == false) {
            notify(
              2,
              "number of guest not match with boat capacity,Please select boat!"
            );
            return false;
          }
        }
      }

      if (selectedpreferredhotels.length <= 0) {
        notify(2, "Please select resort !");
        return false;
      }
      if (hotelbookingref == "") {
        notify(2, "Please enter hotel booking refrence number.");
        return false;
      }
      if (selectedtimeslot == "" || selectedtimeslot == null || selectedtimeslot == 0) {
        notify(2, "Please select time of arrive in mauban.");
        return false;
      }
    }
    return result;
  };

  const getdropdownarr = (result) => {
    let countdata = [];
    //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
    for (let index = 0; index < result.length; index++) {
      let item = result[index];
      countdata.push({ value: item.id, label: item.description });
    }
    return countdata;
  };
  /*#region guest detail  */
  const [guestarr, setGuestArr] = useState([]);
  const [selecteddob, setSelectedDOB] = useState([]);
  const [citizenship, setCitizenship] = useState([]);
  const [selectedCS, setSelectedCS] = useState([]);
  const [RawProvince, setRawProvince] = useState([]);
  const [RawMunicipality, setRawMunicipality] = useState([]);
  const [Province, setProvince] = useState([]);
  const [Municipality, setMunicipality] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState([]);
  const [Gender, setGender] = useState([]);
  const [country, setCountry] = useState([]);
  const [selectedCOO, setSelectedCOO] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [isprocessing, setIsProcessing] = useState(false);
  const [isvaildatereturnprocessing, setIsVaildatereturnProcessing] =
    useState(false);
  const [vaildatereturnmsg, setVaildateReturnmsg] = useState("");
  const getCitizenship = () => {
    dataservice("citizenship", {
      requestfor: "getcitizenship",
      data: { flag: "a" },
    })
      .then(function (data) {
        if (data.resultkey == 1) {
          var result = data.resultvalue;
          let countdata = [];
          //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]

          for (let index = 0; index < result.length; index++) {
            //
            let item = result[index];
            countdata.push({ value: item.id, label: item.description });
          }

          setCitizenship(countdata);
        } else {
          //  notify(2,"No data found");
        }
      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });
  };

  const getCountry = () => {
    dataservice("country", { requestfor: "getcountry", data: { flag: "a" } })
      .then(function (data) {
        if (data.resultkey == 1) {
          var result = data.resultvalue;
          let countdata = [];
          //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
          // countdata.push({ value: "-1", label: "Select Country" })
          for (let index = 0; index < result.length; index++) {
            //
            let item = result[index];
            countdata.push({ value: item.id, label: item.description });
          }
          setCountry(countdata);
        } else {
          //  notify(2,"No data found");
        }
      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });
  };

  const getProvince = () => {
    dataservice("province", { requestfor: "getprovince", data: { flag: "a" } })
      .then(function (data) {
        if (data.resultkey == 1) {
          var result = data.resultvalue;

          setRawProvince(result);
          //setProvince(countdata);
        } else {
          //  notify(2,"No data found");
        }
      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });
  };

  const getMunicipalities = () => {
    dataservice("municipality", {
      requestfor: "getmunicipality",
      data: { flag: "a" },
    })
      .then(function (data) {
        if (data.resultkey == 1) {
          var result = data.resultvalue;
          let countdata = [];
          //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
          for (let index = 0; index < result.length; index++) {
            //
            let item = result[index];
            countdata.push({ value: item.id, label: item.description });
            if (countdata.length === 1) {
              setSelectedMunicipality(item.id);
            }
          }
          // setMunicipality(countdata);
          setRawMunicipality(result);
        } else {
          //  notify(2,"No data found");
        }
      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });
  };
  const setselectguest = (position) => {
    setActivePosition(position);

    var guestinfo = localtravelinfodata.guestinfo[position];

    setSelectedGender(guestinfo["Gender"]);
    setGuestArr(guestinfo);
    if (guestinfo["DOB"] != "") {
      setSelectedDOB(new Date(guestinfo["DOB"]));
    } else {
      guestinfo["DOB"] = new Date();
      setSelectedDOB(new Date());
    }
    if (guestinfo["Citizenship"] != "") {
      setSelectedCS(guestinfo["Citizenship"]);
    } else {
      guestinfo["Citizenship"] = citizenship[0].value;
      setSelectedCS(citizenship[0].value);
    }
    if (guestinfo["CountryofOrigin"] != "") {
      setSelectedCOO(guestinfo["CountryofOrigin"]);
    } else {
      guestinfo["CountryofOrigin"] = country[0].value;
      setSelectedCOO(country[0].value);
    }

    if (guestinfo["Province"] != "") {
      setSelectedProvince(guestinfo["Province"]);
    } else {
      guestinfo["Province"] = 81;
      setSelectedProvince(81);
    }
    if (guestinfo["Municipality"] != "") {
      setSelectedMunicipality(guestinfo["Municipality"]);
    } else {
      //  setSelectedMunicipality([]);
      guestinfo["Municipality"] = 1968;
      setSelectedMunicipality(1968);
    }
  };
  const handleChangeCOO = (e) => {
    if (e.value == 2) {
      var guestinfo = localtravelinfodata.guestinfo[guestactivepostion];

      if (guestinfo["Province"] != "") {
        setSelectedProvince(guestinfo["Province"]);
      } else {
        guestinfo["Province"] = 81;
        // setSelectedProvince(Province[0].value);
        setSelectedProvince(81);
      }
      if (guestinfo["Municipality"] != "") {
        setSelectedMunicipality(guestinfo["Municipality"]);
      } else {
        guestinfo["Municipality"] = 1968;
        setSelectedMunicipality(1968);
      }
    } else {
      setSelectedMunicipality([]);
      setSelectedProvince([]);
    }
    setSelectedCOO(e.value);
    if (localtravelinfodata["guestinfo"].length > 0) {
      localtravelinfodata["guestinfo"][guestactivepostion]["CountryofOrigin"] =
        e.value;
    }
  };
  const handleChangeCS = (e) => {
    setSelectedCS(e.value);
  };
  const handleChangeOptionMunicipality = (e) => {
    setSelectedMunicipality(e.value);
    if (localtravelinfodata["guestinfo"].length > 0) {
      localtravelinfodata["guestinfo"][guestactivepostion]["Municipality"] =
        e.value;
    }
  };
  const handleChangeOptionProvince = (e) => {
    setSelectedProvince(e.value);
  };
  const handleChange = (e) => {
    console.log(e);

    const { id, value } = e.target;

    var guestinfo = localtravelinfodata.guestinfo[guestactivepostion];

    if (e.target.type === "file") {
      //guestarr[guestactivepostion][id] = e.target.files[0];
      //  setGuestArr({ ...guestarr, [id]: e.target.files[0] });
      localtravelinfodata["guestinfo"][guestactivepostion][id] =
        e.target.files[0];

      setGuestArr({ ...guestarr, [id]: e.target.files[0] });
    } else if (e.target.type === "checkbox") {
      if (id == "ismaubancitizen") {
        if (e.target.checked) {
          localtravelinfodata.fees[6].amount =
            localtravelinfodata.fees[6].amount +
            -1 * localtravelinfodata.fees[0].amount;
        } else {
          localtravelinfodata.fees[6].amount =
            localtravelinfodata.fees[6].amount -
            -1 * localtravelinfodata.fees[0].amount;
        }
      } else if (id == "isreturningguest") {
        localtravelinfodata["guestinfo"][
          guestactivepostion
        ].isguestvaildated = false;
        localtravelinfodata["guestinfo"][guestactivepostion].emailid = "";
        localtravelinfodata["guestinfo"][guestactivepostion].Address = "";
        localtravelinfodata["guestinfo"][guestactivepostion].Mobilenumber = "";
        guestarr.isguestvaildated = false;
        guestarr.emailid = "";
        guestarr.Address = "";
        guestarr.Mobilenumber = "";
        if (e.target.checked) {
          setReturnGuestMsg(
            "Please Fill-in your Firstname, Lastname, gender and birthday to Validate!"
          );
        } else {
          setReturnGuestMsg("");
        }
      } else if (id == "parkingnotreq") {
        localtravelinfodata.parkingnotreq = e.target.checked;
        if (e.target.checked) {
          localtravelinfodata.fees[4].amount = 0;
          for (let i = 0; i < vehicledata.length; i++) {
            const element = vehicledata[i];
            element.qty = 0;
          }
        }
        setLocalTravelInfoData({
          ...localtravelinfodata,
          ["parkingnotreq"]: e.target.checked,
        });
      } else if (id == "isrentbracelet") {
        if (e.target.checked) {
          localtravelinfodata["guestinfo"][
            guestactivepostion
          ].braceletavailable = false;
          guestarr.braceletavailable = false;
        }
        //else{
        //   localtravelinfodata["guestinfo"][guestactivepostion]["braceletavailable"]=false;

        // }
      } else if (id == "braceletavailable") {
        if (e.target.checked) {
          localtravelinfodata["guestinfo"][
            guestactivepostion
          ].isrentbracelet = false;
          guestarr.isrentbracelet = false;
          // }else{
        }
      } else if (id == "isLandHopping") {
        if (e.target.checked) {
          localtravelinfodata["guestinfo"][
            guestactivepostion
          ].isLandHopping = false;
          guestarr.isLandHopping = false;
        }
      }
      if (id != "parkingnotreq") {
        localtravelinfodata["guestinfo"][guestactivepostion][id] =
          e.target.checked;
        setGuestArr({ ...guestarr, [id]: e.target.checked });
      }
    } else {
      //setguestarr({...guestarr, [id]: value });
      // guestarr[guestactivepostion][id] = value;

      //setVehiclesData({ ...guestarr, guestarr });

      if (id == "hotelbookingref") {
        localtravelinfodata["hotelbookingref"] = value;
        setHotelBookingRef(value);
      } else {
        setGuestArr({ ...guestarr, [id]: value });
        guestinfo[id] = value;
      }
    }
    recaltotal();
  };

  const onChangeDateOfBirth = (e) => {
    var dob = e;

    //var ndob = moment(e).format("YYYY-MM-DD");
    //setDOB(ndob);
    var today = new Date();
    var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
    var guestinfo = localtravelinfodata.guestinfo[guestactivepostion];
    guestinfo["DOB"] = moment(dob).format("YYYY-MM-DD");
    setSelectedDOB(dob);

    recaltotal();
  };

  const recaltotal = () => {
    var totalamt = 0;
    if (Array.isArray(localtravelinfodata)) {
    } else {

      for (let t = 0; t < localtravelinfodata.fees.length; t++) {
        //    ;
        const element = localtravelinfodata.fees[t];
        let feevals = [];
        if (feesdata.data != undefined) {
          if (feesdata.data.length > 0) {
            feevals = feesdata.data.filter((x) => parseInt(x.id) == element.id);
          }
        }

        switch (element.id) {
          case 1:
            //Environment

            var numofguest = 0;
            for (
              let index = 0;
              index < localtravelinfodata.guestinfo.length;
              index++
            ) {
              if (!localtravelinfodata.guestinfo[index].isguestvaildated) {
                numofguest = numofguest + 1;
              }
            }
            var amt = element.amount;
            var selectedpck = packagedata.filter(x => x.checked == true);
            if (selectedpck.length > 0) {
              if (selectedpck[0].id != "1") {
                amt = 80;
              }
            }


            totalamt += amt * localtravelinfodata.guestinfo.length;
            break;
          case 2:
            //Boat
            totalamt += element.amount;
            break;
          case 3:
            //Package

            totalamt += element.amount;
            break;
          case 4:
            //Bracelet and islandhopping
            var purchase = 0;
            var rental = 0;
            var alreadyhave = 0;

            if (localtravelinfodata.guestinfo.length > 0) {
              purchase = localtravelinfodata.guestinfo.filter(
                (x) => x.isrentbracelet == false && x.braceletavailable == false
              ).length;
              rental = localtravelinfodata.guestinfo.filter(
                (x) => x.isrentbracelet == true
              ).length;
              alreadyhave = localtravelinfodata.guestinfo.filter(
                (x) => x.braceletavailable == true
              ).length;
            }
            var purchaseprice = 0;
            var purchaserent = 0;
            if (feevals.length > 0) {
              purchaseprice = parseFloat(feevals[0].price);
              purchaserent = parseFloat(feevals[0].rentprice);
            }

            totalamt += purchase * purchaseprice + rental * purchaserent;

            break;
          case 5:
            //Parking

            var parkingcharg = 0;
            if (vehicledata != undefined) {
              if (vehicledata.length > 0) {
                var todata =
                  selectedtodate[0] == undefined
                    ? selectedtodate
                    : selectedtodate[0];
                var fromdata =
                  selectedfromdate[0] == undefined
                    ? selectedfromdate
                    : selectedfromdate[0];
                const diffTime = Math.abs(todata - fromdata);
                let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays == 0 || diffDays == 1) {
                  diffDays = 1;
                }
                for (let index = 0; index < vehicledata.length; index++) {
                  const elementpark = vehicledata[index];
                  var cost = elementpark.qty * parseFloat(elementpark.amount);
                  parkingcharg = parkingcharg + cost * diffDays;
                }
              }
            }
            localtravelinfodata.fees[5].amount = parkingcharg;

            totalamt = totalamt + parkingcharg;
            break;
          case 6:
            //Discount

            var guestinfo = localtravelinfodata.guestinfo;
            var discountamount = 0;
            for (let index = 0; index < guestinfo.length; index++) {
              const guestinfoele = guestinfo[index];
              var today = new Date();
              var dob = new Date(guestinfoele.DOB);
              if (new Date(guestinfoele.DOB).getDate() == today.getDate() &&
                new Date(guestinfoele.DOB).getMonth() == today.getMonth() &&
                new Date(guestinfoele.DOB).getFullYear() == today.getFullYear()) {
                discountamount += 0;
              } else {
                var age = Math.floor(
                  (today - new Date(guestinfoele.DOB)) / (365.25 * 24 * 60 * 60 * 1000)
                );
                var amount;
                var baramt = guestinfoele.isrentbracelet == true ? localtravelinfodata.fees[1].rentprice : localtravelinfodata.fees[1].amount;
                if (localtravelinfodata.package[0].id == "" || localtravelinfodata.package[0].id == 1) {
                  amount = localtravelinfodata.fees[0].amount +
                    baramt;
                } else {
                  amount = 80 + baramt;
                }
                if (age > 60) {
                  discountamount += parseFloat(calculateSale(amount, 20));
                } else if (age >= 0 && age <= 7) {
                  discountamount += parseFloat(calculateSale(amount, 20));
                }
              }

            }

            totalamt = totalamt + -1 * discountamount;
            element.amount = -1 * discountamount;
            break;
          case 7:
            //Exemption
            //   if(_ismaubancitizen){

            totalamt = totalamt + element.amount;

            // }

            break;
          case 9:
            var isLandHopping = localtravelinfodata.guestinfo.filter(
              (x) => x.isLandHopping == true
            ).length;
            var islandhoppingprice = 0;
            var islandhoppingrent = 0;
            if (feevals.length > 0) {
              islandhoppingprice = parseFloat(feevals[0].price);
              islandhoppingrent = parseFloat(feevals[0].rentprice);
            }
            totalamt = totalamt + islandhoppingprice * isLandHopping;
            break;

          default:
            //total
            element.amount = totalamt;
            break;
        }
      }
    }
  };

  const getcapacityofboat = () => {
    var count = 0;
    if (localtravelinfodata.boatinfo.length > 0) {
      for (
        let index = 0;
        index < localtravelinfodata.boatinfo.length;
        index++
      ) {
        const element = localtravelinfodata.boatinfo[index];
        count += element.capacity;
      }
    }
    return count;
  };
  const updatecalculation = () => {
    for (let index = 0; index < localtravelinfodata.fees.length; index++) { }
  };

  const calculateSale = (listPrice, discount) => {
    ;
    listPrice = parseFloat(listPrice);
    discount = parseFloat(discount);
    return (listPrice * ((discount) / 100)).toFixed(2);
  };
  const handleChangeOptionGender = (e) => {
    if (localtravelinfodata["guestinfo"].length > 0) {
      localtravelinfodata["guestinfo"][guestactivepostion]["Gender"] = e.value;
    }

    setSelectedGender(e.value);
  };
  const handleChangeHPB = (e) => {
    setIsHotelProvideBoat(e.target.checked);
    setSelectedBoatData([]);
    setIsBoatSeletionOpen(e.target.checked);
  };

  const handleChangeCheckbox = (e) => {
    var guestinfo = localtravelinfodata.guestinfo;
    if (e.target.type === "checkbox") {
      guestinfo[guestactivepostion]["ismaubancitizen"] = e.target.checked;
      guestinfo["filedata"] = "";

      if (e.target.checked) {
        localtravelinfodata.fees[6].amount =
          localtravelinfodata.fees[6].amount +
          -1 * localtravelinfodata.fees[0].amount;
      } else {
        localtravelinfodata.fees[6].amount =
          localtravelinfodata.fees[6].amount -
          -1 * localtravelinfodata.fees[0].amount;
      }

      setLocalTravelInfoData({
        ...localtravelinfodata,
        ["guestinfo"]: guestinfo,
      });
    }
  };

  useEffect(() => {
    if (selectedProvince != "") {
      var Municipalityarr = RawMunicipality.filter(
        (x) => x.provinceid == selectedProvince
      );
      if (Municipalityarr.length > 0) {
        var municipalitydata = getdropdownarr(Municipalityarr);
        setMunicipality(municipalitydata);
        localtravelinfodata["guestinfo"][guestactivepostion]["Province"] =
          selectedProvince;
        if (
          localtravelinfodata["guestinfo"][guestactivepostion][
          "Municipality"
          ] == municipalitydata[0].value
        ) {
          localtravelinfodata["guestinfo"][guestactivepostion]["Municipality"] =
            municipalitydata[0].value;

          setSelectedMunicipality(municipalitydata[0].value);
        } else {
          setSelectedMunicipality(
            localtravelinfodata["guestinfo"][guestactivepostion]["Municipality"]
          );
        }
      }
    }
  }, [selectedProvince]);

  /*#endregion guest detail  */

  const vaildationbeforepay = () => {
    var result = true;

    for (let index = 0; index < localtravelinfodata.guestinfo.length; index++) {
      const element = localtravelinfodata.guestinfo[index];
      var guestcounter = index + 1;
      var today = new Date();
      var age = Math.floor(
        (today - element.DOB) / (365.25 * 24 * 60 * 60 * 1000)
      );
      if (element.Firstname == "") {
        notify(2, "Please enter first name for guest" + guestcounter);
        setIsProcessing(false);
        return false;
      } else if (element.Lastname == "") {
        notify(2, "Please enter last name for guest" + guestcounter);
        setIsProcessing(false);
        return false;
      } else if (element.Mobilenumber == "" && index == 0) {
        notify(2, "Please enter mobile number for guest" + guestcounter);
        setIsProcessing(false);
        return false;
      } else if (element.emailid == "" && index == 0) {
        notify(2, "Please enter email id for guest" + guestcounter);
        setIsProcessing(false);
        return false;
      } else if (element.Address == "") {
        notify(2, "Please enter address for guest" + guestcounter);
        setIsProcessing(false);
        return false;
      } else if (element.ismaubancitizen) {
        if (element.filedata == "") {
          notify(2, "Please upload vaild id proof for guest" + guestcounter);
          setIsProcessing(false);
          return false;
        }
      } else {
        if (element.emailid != "" && index == 0) {
          const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          if (!element.emailid || regex.test(element.emailid) === false) {
            notify(2, "Invalid Email id for guest" + guestcounter);
            setIsProcessing(false);
            return false;
          }
        }
      }
      // else if (age >= 66 || age <= 14) {
      //   notify(2, "Age comply by IATF rules (age not below 14 and  above 65 )");
      //   setIsProcessing(false);
      //   return false;
      // }
    }

    return result;
  };
  const funfileupload = () => {
    var numberoffilestoupload = localtravelinfodata.guestinfo.filter(
      (x) => x.ismaubancitizen
    );

    //setfiledata(numberoffilestoupload);
    if (numberoffilestoupload.length > 0) {
      const form_data = new FormData();
      for (let index = 0; index < numberoffilestoupload.length; index++) {
        const element = numberoffilestoupload[index];
        form_data.append("files", element.filedata);
        form_data.append("fileid", element.fileid);
      }
      const requestOptions = {
        method: "POST",
        body: form_data,
      };
      fetch(common.fileuploadurl, requestOptions).then(async (response) => {
        const data = await response.json();
        // check for error response
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        if (data.resultkey == 1) {
          var resultdata = data.resultvalue;
          //   var numberoffilestoupload=localtravelinfodata.guestinfo.filter(x=>x.ismaubancitizen);
          for (let index = 0; index < numberoffilestoupload.length; index++) {
            const element = numberoffilestoupload[index];

            if (element.fileid == resultdata.fileid[index]) {
              element.newfilename = resultdata.newfilename[index];
              element.oldfilename = resultdata.oldfilename[index];

              //       break;
            }
          }
          setfiledata(numberoffilestoupload);
          finalsave();
        }
      });
    }
  };

  const Savedata = () => {
    setIsProcessing(true);
    if (vaildationbeforepay()) {
      var numberoffilestoupload = localtravelinfodata.guestinfo.filter(
        (x) => x.ismaubancitizen
      );
      if (numberoffilestoupload.length > 0) {
        funfileupload();
        return;
      }
      finalsave();
    }
  };
  const finalsave = () => {
    let val = Math.floor(1000 + Math.random() * 9000);
    var todata =
      selectedtodate[0] == undefined ? selectedtodate : selectedtodate[0];
    var fromdata =
      selectedfromdate[0] == undefined ? selectedfromdate : selectedfromdate[0];
    let Difference_In_Time = todata - fromdata;

    var Difference_In_Days = Math.floor(
      Difference_In_Time / (1000 * 3600 * 24)
    );
    var totalvehicleingrid = 0;
    if (vgridata.data) {
      for (let i = 0; i < vgridata.data.length; i++) {
        totalvehicleingrid = totalvehicleingrid + vgridata.data[i].qty;
      }
    }

    var _guestinfotosave = [];
    for (let index = 0; index < localtravelinfodata.guestinfo.length; index++) {
      const element = localtravelinfodata.guestinfo[index];
      if (
        localtravelinfodata.guestinfo[index].Gender == undefined ||
        localtravelinfodata.guestinfo[index].Gender == null
      ) {
        localtravelinfodata.guestinfo[index].Gender = 0;
      }
      _guestinfotosave.push(element);
    }
    var setvehicle = vehicledata.filter((x) => parseFloat(x.qty) > 0);
    var finalvehicle = [];
    if (setvehicle.length > 0) {
      var todata =
        selectedtodate[0] == undefined ? selectedtodate : selectedtodate[0];
      var fromdata =
        selectedfromdate[0] == undefined
          ? selectedfromdate
          : selectedfromdate[0];
      const diffTime = Math.abs(todata - fromdata);
      // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays == 0 || diffDays == 1) {
        diffDays = 1;
      }
      for (let index = 0; index < setvehicle.length; index++) {
        const parkele = setvehicle[index];
        var cost = parseFloat(parkele.qty) * parseFloat(parkele.amount);
        parkele.totalcost = cost * diffDays;
      }
      for (let index = 0; index < setvehicle.length; index++) {
        const finalelement = setvehicle[index];
        if (finalelement.qty > 1) {
          // let newArr = [...finalelement];
          for (let index = 0; index < finalelement.qty; index++) {
            finalelement.uuid = uuid();
            finalelement.numberofnights = diffDays;
            finalvehicle.push(finalelement);
          }
        } else {
          finalelement.uuid = uuid();
          finalelement.numberofnights = diffDays;
          finalvehicle.push(finalelement);
        }
      }
    }
    let seltimeslot = timeslot.filter((x) => x.value == selectedtimeslot);
    var submitdata = {
      fromdate: moment(
        selectedfromdate[0] == undefined
          ? selectedfromdate
          : selectedfromdate[0]
      ).format("YYYY-MM-DD"),
      todate: moment(
        selectedtodate[0] == undefined ? selectedtodate : selectedtodate[0]
      ).format("YYYY-MM-DD"),
      numberofdays: Difference_In_Days,
      totalcharge: localtravelinfodata.fees[8].amount,
      pax: localtravelinfodata.numberofguest,
      boatcapcity: localtravelinfodata.boatinfo,
      preferredhotels: localtravelinfodata.hotel,
      paymentid: val,
      selectedvehicleinfo: [],
      touristinfo: localtravelinfodata.guestinfo,
      chargesinfo: [],
      numberofvehicle: localtravelinfodata.vehicle.length,
      touristvehicles: finalvehicle,
      packagedata: localtravelinfodata.package,
      slotid: selectedtimeslot,
      ishotelprovideboat: ishotelprovideboat,
      slotdetail: seltimeslot,
      parkingnotreq: localtravelinfodata.parkingnotreq,
      hotelbookingref: localtravelinfodata.hotelbookingref,
      packageinfo: {},
      bulkUpload: localtravelinfodata.isBulkUpload,
    };
    // console.log(submitdata);
    // return;
    //check availability
    dataservice("booking", {
      requestfor: "checkavailability",
      data: {
        fromdate: moment(
          selectedfromdate[0] == undefined
            ? selectedfromdate
            : selectedfromdate[0]
        ).format("YYYY-MM-DD"),
        touristcount: localtravelinfodata.guestinfo.length,
      },
    })
      .then(function (checkdata) {
        if (checkdata.resultkey == 1) {
          if (checkdata.resultvalue[0].isSlotAvialble > 0) {
            dataservice("registration", {
              requestfor: "registration",
              data: submitdata,
            })
              .then(function (data) {
                if (data.resultkey == 1) {
                  var result = data.resultvalue;
                  // {"code": 200, "status": true, "results": {"data": {"url": "https://api.smartpay.net.ph/payment?reference_number=SP00002097", "method": "GET", "reference_number": "SP00002097"}, "message": "Success."}}
                  //{"code": 402, "status": false, "results": {"data": {"customer_email": "The Customer Email Address field must contain a valid email address."}, "message": "Invalid Parameters."}}
                  var responseurl = JSON.parse(data.resultvalue.url);
                  //.url;
                  if (responseurl.status) {
                    if (responseurl.results != "" && responseurl.results !== undefined) {
                      window.location.href = responseurl.results.data.url;
                    } else {
                      var errormdg = responseurl.message + "  " + responseurl.results.toString();
                      notify(2, errormdg);
                      setIsProcessing(false);
                    }
                  }

                } else {
                  notify(2, "error!");
                  setIsProcessing(false);
                }
              })
              .catch(function (error) {
                notify(2, "error!" + error);
                setIsProcessing(false);
              });
          } else {
            notify(2, "no slot available for this date!");
            setIsProcessing(false);
          }
        } else {
          notify(2, "error !" + JSON.stringify(checkdata.resultvalue));
          setIsProcessing(false);
        }
      })
      .catch(function (error) {
        notify(2, "error !" + error);
        setIsProcessing(false);
        // console.log(error);
      });
  };
  const handleperferredtime = (e) => {
    const { id, value } = e.target;
    console.log(id);
    if (id == 1) {
      setselectedpreferredtimemorning(true);
    } else {
      setselectedpreferredtimemorning(false);
    }
    //setselectedpreferredtimemorning(data);
  };

  const vaildateguest = () => {
    setIsVaildatereturnProcessing(true);
    var selectedguest = localtravelinfodata["guestinfo"][guestactivepostion];
    if (selectedguest.Firstname == "") {
      notify(2, "Please enter first name!");
      return;
    } else if (selectedguest.Lastname == "") {
      notify(2, "Please enter last name!");
      return;
    } else {
      dataservice("returnguest", {
        requestfor: "vaildatereturnguest",
        data: {
          firstname: selectedguest.Firstname,
          lastname: selectedguest.Lastname,
          dob: moment(selectedguest.DOB).format("YYYY-MM-DD"),
          gender: selectedguest.Gender,
        },
      })
        .then(function (data) {
          setIsVaildatereturnProcessing(false);
          if (data.resultkey == 1) {
            var result = data.resultvalue[0];
            if (result.lastvisited == 0) {
              localtravelinfodata["guestinfo"][
                guestactivepostion
              ].isguestvaildated = true;
              localtravelinfodata["guestinfo"][guestactivepostion].emailid =
                result.emailid;
              localtravelinfodata["guestinfo"][guestactivepostion].Address =
                result.address1;
              localtravelinfodata["guestinfo"][
                guestactivepostion
              ].Mobilenumber = result.mobilenumber;

              var _selcitizenid = citizenship.filter(
                (x) => x.value == result.citizenid
              );
              localtravelinfodata["guestinfo"][0]["Citizenship"] =
                _selcitizenid[0].value;
              setSelectedCS(_selcitizenid[0].value);
              var _selcountry = country.filter(
                (x) => x.value == result.nationalityid
              );
              localtravelinfodata["guestinfo"][0]["CountryofOrigin"] =
                _selcountry[0].value;
              setSelectedCOO(_selcountry[0].value);

              //localtravelinfodata["guestinfo"][guestactivepostion].Municipality=result.ismaubancitizen;

              guestarr.isguestvaildated = true;
              guestarr.emailid = result.emailid;
              guestarr.Address = result.address1;
              guestarr.Mobilenumber = result.mobilenumber;

              setReturnGuestMsg("Guest validated successfully");
              setVaildateReturnmsg("");
              recaltotal();
            }
            // setVaildateReturnmsg("Sorry guest info doesn't exist."); setVaildateReturnmsg("Sorry guest info doesn't exist.");
          } else {
            localtravelinfodata["guestinfo"][
              guestactivepostion
            ].isguestvaildated = false;
            setVaildateReturnmsg("Sorry guest info doesn't exist.");
          }
        })
        .catch(function (edata) {
          setIsVaildatereturnProcessing(false);
          setVaildateReturnmsg(edata.toString());
          notify(2, edata.toString(), 1);
        });
    }
  };
  const [isconfirmchange, setIsConfirmChange] = useState(false);
  const [isopenbulkupload, setIsOpenBulkUpload] = useState(false);
  const [bulkuploaddata, setBulkUploadData] = useState([]);
  const [bulkuploadfilename, setbulkuploadfilename] = useState([]);

  const bulkupload = () => {
    setIsOpenBulkUpload(!isopenbulkupload);
  };
  const handlebulkUpload = (e) => {
    e.preventDefault();
    if (e.target.files.length > 0) {
      var files = e.target.files,
        f = files[0];
      setbulkuploadfilename(f);
      var reader = new FileReader();
      reader.onload = function (e) {
        var data = e.target.result;
        let readedData = XLSX.read(data, {
          type: "binary",
          cellText: false,
          cellDates: true,
        });
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];

        /* Convert array to json*/
        const dataParse = XLSX.utils.sheet_to_json(ws, {
          header: 1,
          raw: false,
          dateNF: "yyyy-mm-dd",
        });
        if (dataParse.length > 1) {
          var bulkupdatevalues = [];

          if (dataParse.length - 1 == selectednumberguest) {
            for (let index = 1; index < dataParse.length; index++) {
              let element = dataParse[index];
              var guestdata = {};
              if (
                element[0] !== undefined &&
                element[0] !== "" &&
                element[1] !== undefined &&
                element[1] !== "" &&
                element[2] !== undefined &&
                element[2] !== "" &&
                element[3] !== undefined &&
                element[3] !== ""
              ) {
                var _gender = Gender.filter((x) => x.label == element[3]);
                var _citizen = citizenship.filter(
                  (x) => x.label.toLowerCase() == element[9].toLowerCase()
                );
                var _CountryofOrigin = country.filter(
                  (x) => x.label.toLowerCase() == element[10].toLowerCase()
                );

                var provincearr = RawProvince.filter((x) => x.countryid == 2);
                var provincedata = getdropdownarr(provincearr);
                var _validateprovide = provincedata.filter(
                  (x) => x.label.toLowerCase() == element[11].toLowerCase()
                );
                var _Province = RawProvince.filter(
                  (x) =>
                    x.description.toLowerCase() == element[11].toLowerCase()
                );
                var municipalityarr = RawMunicipality.filter(
                  (x) => x.provinceid == _validateprovide[0].value
                );
                var municipalitydata = getdropdownarr(municipalityarr);
                var _validmunicipality = municipalitydata.filter(
                  (x) => x.label.toLowerCase() == element[12].toLowerCase()
                );
                var _Municipality = RawMunicipality.filter(
                  (x) =>
                    x.description.toLowerCase() == element[12].toLowerCase()
                );
                var isvalidmunicipality =
                  _validmunicipality.length > 0 ? true : false;
                if (index == 1) {
                  if (
                    element[5] !== undefined &&
                    element[5] !== "" &&
                    element[6] !== undefined &&
                    element[6] !== ""
                  ) {
                    guestdata = {
                      FirstName: element[0],
                      LastName: element[1],
                      DateOfBirth: moment(element[2]).format("YYYY-MM-DD"),
                      Gender: _gender[0].value,
                      Address: element[4],
                      MobileNumber: element[5],
                      EmailID: element[6],
                      RentBracelet:
                        element[7].toString().toLowerCase() == "yes"
                          ? true
                          : false,
                      IslandHopping: false,

                      // element[8].toString().toLowerCase() == "yes"
                      //   ? true
                      //   : false,
                      Citizen: _citizen[0].value.toString(),
                      Citizendesc: _citizen[0].label.toString(),
                      Country: _CountryofOrigin[0].value.toString(),
                      Countrydesc: _CountryofOrigin[0].label.toString(),
                      Province: _Province[0].id.toString(),
                      Provincedesc: _Province[0].description.toString(),
                      Municipality: _Municipality[0].id.toString(),
                      Municipalitydesc: _Municipality[0].description.toString(),
                      isvalidmunicipality: isvalidmunicipality,
                      // "Maubanin":element[13].toString().toLowerCase()=="yes"?true:false
                    };
                  } else {
                    notify(
                      2,
                      "Invaild uploaded excel,Please fill all required field for guest!"
                    );
                    return;
                  }
                } else {
                  guestdata = {
                    FirstName: element[0],
                    LastName: element[1],
                    DateOfBirth: moment(element[2]).format("YYYY-MM-DD"),
                    Gender: _gender[0].value,
                    Address: element[4],
                    MobileNumber: element[5],
                    EmailID: element[6],
                    RentBracelet:
                      element[7].toString().toLowerCase() == "yes"
                        ? true
                        : false,
                    IslandHopping: false,
                    // element[8].toString().toLowerCase() == "yes"
                    //   ? true
                    //   : false,
                    Citizen: _citizen[0].value.toString(),
                    Citizendesc: _citizen[0].label.toString(),
                    Country: _CountryofOrigin[0].value.toString(),
                    Countrydesc: _CountryofOrigin[0].label.toString(),
                    Province: _Province[0].id.toString(),
                    Provincedesc: _Province[0].description.toString(),
                    Municipality: _Municipality[0].id.toString(),
                    Municipalitydesc: _Municipality[0].description.toString(),
                    isvalidmunicipality: isvalidmunicipality,
                    //  "Maubanin":element[13].toString().toLowerCase()=="yes"?true:false
                  };
                }
              } else {
                notify(
                  2,
                  "Invaild uploaded excel,Please fill all required field for guest!"
                );
                return;
              }

              bulkupdatevalues.push(guestdata);
            }
          } else {
            notify(2, "number of guest  is not matching with uploaded guest");
          }

          setBulkUploadData(bulkupdatevalues);

        } else {
          notify(2, "No guest data ");
        }

        // setFileUploaded(dataParse);
      };
      reader.readAsBinaryString(f);
    } else {
      setBulkUploadData([]);
    }
  };

  const cancelbulkupload = () => {
    setBulkUploadData([]);
  };
  const savebulkupload = () => {
    //update number of guest
    setSelectedNumberGuest(bulkuploaddata.length);
    setIsOpenBulkUpload(!isopenbulkupload);
    var guestinfo = localtravelinfodata["guestinfo"];
    localtravelinfodata.isBulkUpload = false;
    if (bulkuploaddata.length > 0) {
      localtravelinfodata.isBulkUpload = true;
      for (let index = 0; index < guestinfo.length; index++) {
        let element = guestinfo[index];
        element.Address = bulkuploaddata[index].Address;
        element.Firstname = bulkuploaddata[index].FirstName;
        element.Lastname = bulkuploaddata[index].LastName;
        element.DOB = new Date(bulkuploaddata[index].DateOfBirth);
        element.Mobilenumber = bulkuploaddata[index].MobileNumber;
        element.emailid = bulkuploaddata[index].EmailID;
        element.Gender = bulkuploaddata[index].Gender;
        element.isLandHopping = bulkuploaddata[index].IslandHopping;
        element.isrentbracelet = bulkuploaddata[index].RentBracelet;
        //  element.ismaubancitizen=bulkuploaddata[index].Maubanin;
        element.Citizenship = bulkuploaddata[index].Citizen;
        element.CountryofOrigin = bulkuploaddata[index].Country;
        element.Municipality = bulkuploaddata[index].Municipality;
        element.Province = bulkuploaddata[index].Province;
      }
    }
    setselectguest(0);
    recaltotal();
  };
  const Changenumberofguest = () => {
    setSelectedNumberGuest(selectednumberguestbeforeconfirm);
    setBulkUploadData([]);
    setIsConfirmChange(!isconfirmchange);
  };
  return (
    <>
      <h5>{localtravelinfodata.isguest == true ? "" : ""}</h5>

      <CCardBody>
        <CRow>
          <div
            style={{
              display: localtravelinfodata.isguest == true ? "none" : "",
            }}
            className="col-md-8 mb-4"
          >
            {/* <!--Card--> */}
            <div className="card">
              {/* <!--Card content--> */}
              <form className="card-body">
                <div style={{ display: isvehicle == true ? "none" : "" }}>

                  <div className="row">
                    {/*<!-Main-->*/}

                    {/*<!--Grid column-->*/}
                    <div className="col-lg-4 col-md-12 mb-4">
                      <label for="guests">
                        Number Of Guests
                        <span style={{ color: "red" }}>
                          <sup>*</sup>
                        </span>
                      </label>
                      <Select
                        className="dropdown"
                        placeholder="Select"
                        value={numberofguests.find(
                          (obj) => obj.value === selectednumberguest
                        )} // set selected values
                        options={numberofguests} // set list of the data
                        onChange={handleChangeOptionNOG} // assign onChange function
                      />
                    </div>
                    {/*<!--Grid column-->*/}

                    {/*<!--Grid column-->*/}
                    <div className="col-lg-4 col-md-12 mb-4">
                      <label for="country">
                        Start Date
                        <span style={{ color: "red" }}>
                          <sup>*</sup>
                        </span>
                      </label>
                      <DatePicker
                        className="form-control"
                        value={selectedfromdate}
                        minDate={new Date()}
                        onChange={setselectedfromdate}
                      />
                    </div>
                    {/*<!--Grid column-->*/}

                    {/*<!--Grid column-->*/}
                    <div className="col-lg-4 col-md-12 mb-4">
                      <label for="country">
                        End Date
                        <span style={{ color: "red" }}>
                          <sup>*</sup>
                        </span>
                      </label>
                      <DatePicker
                        className="form-control"
                        value={selectedtodate}
                        minDate={new Date(selectedfromdate)}
                        onChange={setselectedtodate}
                      />
                    </div>
                    {/*<!--Grid column-->*/}
                  </div>
                  {/*<!--Grid row-->*/}
                  {/* <!--Username--> */}

                  <div className="row" style={{ display: "none" }}>
                    <div className="col-lg-6 col-md-12 mb-6">
                      Select Type of Boat
                      <span style={{ color: "red" }}>
                        <sup>*</sup>
                      </span>
                    </div>
                  </div>

                  <div className="row" style={{ display: "none" }}>
                    {(() => {
                      const rows = [];
                      if (boatTypeData.length > 0) {
                        for (let i = 0; i < boatTypeData.length; i++) {
                          var _pck = boatTypeData[i];
                          var cls =
                            _pck.checked == true
                              ? "btn btn-block btn-success active"
                              : "btn btn-block btn-outline-primary";
                          //_veh.checked = false;
                          rows.push(
                            <>
                              {" "}
                              <div key={i} className="col-md-3 mb-3">
                                <button

                                  key={i}
                                  className={cls}
                                  id={_pck.id}
                                  value={_pck.checked}
                                  onClick={handleboattypechanges}
                                  type="button"
                                >
                                  {_pck.label}{" "}
                                </button>
                              </div>
                            </>
                          );
                        }
                        return rows;
                      }
                    })()}
                  </div>


                  <div className="row">
                    <div className="col-lg-6 col-md-12 mb-6">
                      Select Package
                      <span style={{ color: "red" }}>
                        <sup>*</sup>
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    {(() => {
                      const rows = [];
                      if (packagedata.length > 0) {
                        for (let i = 0; i < packagedata.length; i++) {
                          var _pck = packagedata[i];
                          var cls =
                            _pck.checked == true
                              ? "btn btn-block btn-success active"
                              : "btn btn-block btn-outline-primary";
                          //_veh.checked = false;
                          rows.push(
                            <>
                              {" "}
                              <div key={i} className="col-md-3 mb-3">
                                <button

                                  key={i}
                                  className={cls}
                                  id={_pck.id}
                                  value={_pck.checked}
                                  onClick={handlepackagechanges}
                                  type="button"
                                >
                                  {_pck.label}{" "}
                                </button>
                              </div>
                            </>
                          );
                        }
                        return rows;
                      }
                    })()}
                  </div>
                  <div className="card">

                    <div className="card-body">
                      <h6> Sechdule </h6>
                      <div className="col-lg-8 col-md-12 mb-4">
                        <label for="guests">
                          Time of Arrival in Mauban
                          <span style={{ color: "red" }}>
                            <sup>*</sup>
                          </span>
                        </label>
                        <Select
                          className="dropdown"
                          placeholder="Select"

                          value={timeslot.find(
                            (obj) => obj.value === selectedtimeslot
                          )} // set selected values
                          options={timeslot} // set list of the data
                          onChange={handleChangeOptionTS} // assign onChange function
                        />
                      </div>
                    </div>


                  </div>
                  <div className="card" hidden={!isshowboatselection}>
                    <div className="card-body">
                      <h6> Boat selections  </h6>
                      <div className="row">
                        <div className="col-lg-6 col-md-12 mb-6">
                          <label for="country">Boat Capacity</label>
                          <Select
                            isMulti
                            isDisabled={isboatselectionopen}
                            className="dropdown"
                            placeholder="Select Boat Capacity"
                            value={boatdata.filter((obj) =>
                              selectedboatdata.includes(obj.value)
                            )}
                            // set selected values
                            options={boatdata} // set list of the data
                            onChange={handleChangeOptionBC} // assign onChange function
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 mb-6" >
                          <label for="state">Is Boat Provided by Resort?</label>
                          <CInput
                            style={{ width: "6%", fontSize: "1rem" }}
                            type="checkbox"
                            onChange={handleChangeHPB}
                            id="ismaubancitizen"
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h6>Hotel Details</h6>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 mb-6">
                          <label for="state">
                            Accommodation
                            <span style={{ color: "red" }}>
                              <sup>*</sup>
                            </span>
                          </label>
                          <Select
                            className="dropdown"
                            placeholder="Select Resort"
                            value={selectedpreferredhotels} // set selected values
                            options={preferredhotels} // set list of the data
                            onChange={handleChangeOptionPH} // assign onChange function
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 mb-6">
                          <label for="guests">
                            {" "}
                            Booking Reference#
                            <span style={{ color: "red" }}>
                              <sup>*</sup>
                            </span>
                          </label>
                          <CInput
                            onChange={handleChange}
                            value={hotelbookingref}
                            type="text"
                            id="hotelbookingref"
                            placeholder=" Booking Reference Number"
                          />
                        </div>

                      </div>

                    </div>
                  </div>

                  {/*<!--Grid row-->*/}
                  <br></br>
                </div>

                <div style={{ display: isvehicle == true ? "" : "none" }}>
                  <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4">
                      <label for="guests">
                        Parking not Required {localtravelinfodata.parkingnotreq}
                      </label>
                      <CInput
                        style={{ width: "20%", fontSize: "0rem" }}
                        onChange={handleChange}
                        type="checkbox"
                        checked={localtravelinfodata.parkingnotreq}
                        value={localtravelinfodata.parkingnotreq}
                        id="parkingnotreq"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <table className="table">
                      <thead>
                        <th>vehicle</th>
                        <th>Qty</th>
                        <th>Total Charge</th>
                      </thead>
                      <tbody>
                        {(() => {
                          const rows = [];
                          if (vehicledata.length > 0) {
                            for (let i = 0; i < vehicledata.length; i++) {
                              var _veh = vehicledata[i];
                              //_veh.checked = false;

                              rows.push(
                                <>
                                  <tr>
                                    <td>{_veh.typeofvehicle}</td>
                                    <td>
                                      <InputDecimal
                                        type="text"
                                        readOnly={
                                          localtravelinfodata.parkingnotreq
                                        }
                                        value={_veh.qty}
                                        id={_veh.id}
                                        onChange={handleChangevehicleqty(i)}
                                        placeholder="Qty"
                                      />
                                    </td>
                                    <td>
                                      {_veh.qty * parseFloat(_veh.amount)}
                                    </td>
                                  </tr>{" "}
                                </>
                              );
                            }
                            return rows;
                          }
                        })()}
                      </tbody>
                    </table>
                  </div>
                  <br></br>
                </div>
              </form>
            </div>
            {/*<!--/.Card-->*/}
          </div>
          <div
            style={{
              display: localtravelinfodata.isguest == true ? "" : "none",
            }}
            className="col-md-8 mb-4"
          >
            <div className="row">
              <div className="col-md-3 mb-4">
                <div className="card">
                  {/* <!--Card content--> */}
                  <div className="card-body">
                    <CButton block onClick={() => bulkupload()} color="primary">
                      Bulk Upload{" "}
                    </CButton>
                    {localtravelinfodata.guestinfo &&
                      localtravelinfodata.guestinfo.map((guestinfo, index) => {
                        return (
                          <CButton
                            block
                            onClick={() => setselectguest(index)}
                            variant={
                              index == guestactivepostion ? "" : "outline"
                            }
                            color="success"
                          >
                            Guest {index + 1}{" "}
                          </CButton>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="col-md-9 mb-4">
                <div className="card">
                  {/* <!--Card content--> */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-4 col-md-12 mb-4">
                        <label for="guests">Returning Guest?</label>
                        <CInput
                          style={{ width: "20%", fontSize: "0rem" }}
                          onChange={handleChange}
                          type="checkbox"
                          checked={guestarr.isreturningguest}
                          value={guestarr.isreturningguest}
                          id="isreturningguest"
                        />
                      </div>
                    </div>
                    <div
                      className="row"
                      style={{
                        display:
                          guestarr.isreturningguest == true ? "" : "none",
                      }}
                    >
                      <div className="col-lg-12 col-md-12 mb-4">
                        <label for="guests" style={{ color: "red" }}>
                          {returnguestmsg}
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      {/*<!--Grid column-->*/}
                      <div className="col-lg-6 col-md-12 mb-4">
                        <label for="guests">First name</label>
                        <CInput
                          onChange={handleChange}
                          value={guestarr.Firstname}
                          type="text"
                          id="Firstname"
                          placeholder="First Name"
                        />
                      </div>
                      {/*<!--Grid column-->*/}

                      {/*<!--Grid column-->*/}
                      <div className="col-lg-6 col-md-12 mb-4">
                        <label for="guests">Last name</label>
                        <CInput
                          onChange={handleChange}
                          type="text"
                          value={guestarr.Lastname}
                          id="Lastname"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-12 mb-4">
                        <label for="guests">Date Of Birth</label>
                        <DatePicker
                          value={selecteddob}
                          onChange={onChangeDateOfBirth}
                        />
                      </div>
                      <div className="col-lg-6 col-md-12 mb-4">
                        <label for="guests">Gender</label>
                        <Select
                          className="dropdown"
                          placeholder="Select"
                          value={Gender.find(
                            (obj) => obj.value === selectedGender
                          )} // set selected values
                          options={Gender} // set list of the data
                          onChange={handleChangeOptionGender} // assign onChange function
                        />
                      </div>
                    </div>
                    <div
                      className="row"
                      style={{
                        display:
                          guestarr.isreturningguest == true ? "" : "none",
                      }}
                    >
                      <div className="col-lg-4 col-md-12 mb-4">
                        <CButton
                          color="primary"
                          onClick={() => vaildateguest(guestarr)}
                        >
                          Validate
                        </CButton>
                      </div>
                      <div className="col-lg-8 col-md-12 mb-4">
                        <CImg
                          src={processing}
                          height="50"
                          width="50"
                          id="proceesing"
                          style={{
                            display:
                              isvaildatereturnprocessing == true ? "" : "none",
                          }}
                          alt="qrcode"
                        />
                        <label
                          for="guests"
                          style={{
                            color: "red",
                            display:
                              isvaildatereturnprocessing == true ? "none" : "",
                          }}
                        >
                          {vaildatereturnmsg}
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-12 mb-4">
                        <label for="guests">Citizenship</label>
                        <Select
                          className="dropdown"
                          isDisabled={
                            guestarr.isreturningguest == true
                              ? !guestarr.isguestvaildated
                              : false
                          }
                          placeholder="Select Citizenship"
                          value={citizenship.find(
                            (obj) => obj.value === selectedCS
                          )} // set selected values
                          options={citizenship} // set list of the data
                          onChange={handleChangeCS} // assign onChange function
                        />
                      </div>

                      {/*<!--Grid column-->*/}
                      <div className="col-lg-6 col-md-12 mb-4">
                        <label for="guests">Country Of orgin</label>
                        <Select
                          id="CountryofOrigin"
                          className="dropdown"
                          isDisabled={
                            guestarr.isreturningguest == true
                              ? !guestarr.isguestvaildated
                              : false
                          }
                          placeholder="Select"
                          value={country.find(
                            (obj) => obj.value === selectedCOO
                          )} // set selected values
                          options={country} // set list of the data
                          onChange={handleChangeCOO} // assign onChange function
                        />
                      </div>
                      {/*<!--Grid column-->*/}

                      {/*<!--Grid column-->*/}
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-12 mb-4">
                        <label for="guests">Province</label>
                        <Select
                          className="dropdown"
                          placeholder="Select"
                          isDisabled={
                            guestarr.isreturningguest == true
                              ? !guestarr.isguestvaildated
                              : false
                          }
                          value={Province.find(
                            (obj) => obj.value === selectedProvince
                          )} // set selected values
                          options={Province} // set list of the data
                          onChange={handleChangeOptionProvince} // assign onChange function
                        />
                      </div>

                      {/*<!--Grid column-->*/}
                      <div className="col-lg-6 col-md-12 mb-4">
                        <label for="guests">Municipality</label>
                        <Select
                          className="dropdown"
                          placeholder="Select"
                          isDisabled={
                            guestarr.isreturningguest == true
                              ? !guestarr.isguestvaildated
                              : false
                          }
                          value={Municipality.find(
                            (obj) => obj.value === selectedMunicipality
                          )} // set selected values
                          options={Municipality} // set list of the data
                          onChange={handleChangeOptionMunicipality} // assign onChange function
                        />
                      </div>
                      {/*<!--Grid column-->*/}

                      {/*<!--Grid column-->*/}
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 mb-4">
                        <label for="guests">Address</label>
                        <CInput
                          onChange={handleChange}
                          disabled={
                            guestarr.isreturningguest == true
                              ? !guestarr.isguestvaildated
                              : false
                          }
                          value={guestarr.Address}
                          type="text"
                          id="Address"
                          placeholder="Address"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-12 mb-4">
                        <label for="guests">Mobile Number</label>
                        <CInput
                          onChange={handleChange}
                          disabled={
                            guestarr.isreturningguest == true
                              ? !guestarr.isguestvaildated
                              : false
                          }
                          value={guestarr.Mobilenumber}
                          type="text"
                          id="Mobilenumber"
                          placeholder="Mobile "
                        />
                      </div>
                      <div className="col-lg-6 col-md-12 mb-4">
                        <label for="guests">E-mail Address</label>
                        <CInput
                          onChange={handleChange}
                          disabled={
                            guestarr.isreturningguest == true
                              ? !guestarr.isguestvaildated
                              : false
                          }
                          value={guestarr.emailid}
                          type="text"
                          id="emailid"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div className="row" style={{ display: "none" }}>
                      <div className="col-lg-1 ">
                        <input
                          style={{ fontSize: "0rem" }}
                          disabled={
                            guestarr.isreturningguest == true
                              ? !guestarr.isguestvaildated
                              : false
                          }
                          onChange={handleChange}
                          type="checkbox"
                          checked={guestarr.ismaubancitizen}
                          value={guestarr.ismaubancitizen}
                          id="ismaubancitizen"
                        ></input>
                        {/* <CInput  onChange={handleChange} type="checkbox" checked={guestarr.ismaubancitizen } value={guestarr.ismaubancitizen} id="ismaubancitizen" /> */}
                      </div>
                      <div className="col-lg-8">
                        <label for="guests">
                          Please tick the box if you are Maubanin?
                        </label>
                      </div>
                    </div>
                    <div className="row" style={{ display: "none" }}>
                      <div
                        className="col-lg-8 col-md-12 mb-4"
                        style={{
                          display:
                            guestarr.ismaubancitizen == true ? "" : "none",
                        }}
                      >
                        <label for="guests">Filename:</label>

                        <CInput
                          onChange={handleChange}
                          style={{ color: "transparent" }}
                          id="filedata"
                          type="file"
                        />
                        {(() => {
                          const rows = [];

                          if (guestarr.filedata != undefined) {
                            rows.push(
                              <>
                                <CCol xs="12" style={{ color: "green" }}>
                                  {guestarr.filedata.name}
                                </CCol>
                              </>
                            );

                            return rows;
                          }
                        })()}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-12 mb-4">
                        <label for="guests" style={{ fontSize: "14px" }}>
                          Rent Bracelet
                        </label>
                        <CInput
                          style={{ width: "20%", fontSize: "0rem" }}
                          disabled={
                            guestarr.isreturningguest == true
                              ? !guestarr.isguestvaildated
                              : false
                          }
                          onChange={handleChange}
                          type="checkbox"
                          checked={guestarr.isrentbracelet}
                          value={guestarr.isrentbracelet}
                          id="isrentbracelet"
                        />
                      </div>
                      <div
                        className="col-lg-4 col-md-12 mb-4"
                        style={{
                          display:
                            guestarr.isguestvaildated == true ? "" : "none",
                        }}
                      >
                        <label for="guests" style={{ fontSize: "14px" }}>
                          Do you have Bracelet
                        </label>
                        <CInput
                          style={{ width: "20%", fontSize: "0rem" }}
                          disabled={
                            guestarr.isreturningguest == true
                              ? !guestarr.isguestvaildated
                              : false
                          }
                          onChange={handleChange}
                          type="checkbox"
                          checked={guestarr.braceletavailable}
                          value={guestarr.braceletavailable}
                          id="braceletavailable"
                        />
                      </div>
                    </div>
                    {/* <div className="row" style={{
                      display:
                        isshowboatselection == true ? "" : "none",
                    }}> */}
                    <div className="row" style={{
                      display: "none"
                    }}>
                      <div className="col-lg-12 col-md-12 mb-4">
                        <label for="guests">
                          Do you want to add the guest for island hopping?
                        </label>
                        <CInput
                          style={{ width: "5%", fontSize: "0rem" }}
                          disabled={
                            guestarr.isreturningguest == true
                              ? !guestarr.isguestvaildated
                              : false
                          }
                          onChange={handleChange}
                          type="checkbox"
                          checked={guestarr.isLandHopping}
                          value={guestarr.isLandHopping}
                          id="isLandHopping"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <div>
                  <span style={{ color: "red" }}>
                    <sup>* Marked fields are mandatory</sup>
                  </span>{" "}
                </div>
                <div>
                  <span style={{ color: "black" }}>
                    <sup>
                      * Additional Charges will applied for island hopping
                    </sup>
                  </span>{" "}
                </div>
                <div>
                  <span style={{ color: "green" }}>
                    <sup>P=Purchase R=Rental A=Already have</sup>
                  </span>{" "}
                </div>
                <div>
                  <span style={{ color: "green" }}>
                    <sup>RE=Return Guest N=New</sup>
                  </span>{" "}
                </div>
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">Fee Calculation</span>
                </h4>
                <b>
                  {" "}
                  <sup style={{ fontSize: "10px" }} className="text-muted">
                    Traveling Date:{" "}
                    {moment(
                      selectedfromdate[0] == undefined
                        ? selectedfromdate
                        : selectedfromdate[0]
                    ).format("YYYY-MM-DD")}{" "}
                    -{" "}
                    {moment(
                      selectedtodate[0] == undefined
                        ? selectedtodate
                        : selectedtodate[0]
                    ).format("YYYY-MM-DD")}{" "}
                  </sup>
                </b>
                <br></br>{" "}
                <b>
                  {" "}
                  <sup style={{ fontSize: "10px" }} className="text-muted">
                    Number Of Days:{numberofdaystravel}
                  </sup>
                </b>
                {/* <span className="badge badge-secondary badge-pill">3</span> */}
                <ul className="list-group mb-3 z-depth-1">
                  {localtravelinfodata.fees &&
                    localtravelinfodata.fees.map((feedata, index) => {
                      var purchase = 0;
                      var alreadyhave = 0;
                      var rental = 0;
                      var islandhoppingamt = 0;
                      var etafretunrguest = 0;
                      var etafnonretunrguest = 0;
                      var feevals = [];
                      var feevalsprice = 0;
                      var packageid = localtravelinfodata.package.length > 0 ? localtravelinfodata.package[0].id : "";
                      ;
                      if (feesdata.data != undefined) {
                        if (feesdata.data.length > 0) {
                          feevals = feesdata.data.filter(
                            (x) => parseInt(x.id) == feedata.id
                          );
                          if (feevals.length > 0) {
                            feevalsprice = parseFloat(feevals[0].price);
                          }
                        }
                      }
                      if (localtravelinfodata.guestinfo.length > 0) {
                        purchase = localtravelinfodata.guestinfo.filter(
                          (x) =>
                            x.isrentbracelet == false &&
                            x.braceletavailable == false
                        ).length;
                        rental = localtravelinfodata.guestinfo.filter(
                          (x) => x.isrentbracelet == true
                        ).length;
                        alreadyhave = localtravelinfodata.guestinfo.filter(
                          (x) => x.braceletavailable == true
                        ).length;
                        islandhoppingamt = localtravelinfodata.guestinfo.filter(
                          (x) => x.isLandHopping == true
                        ).length;
                        etafnonretunrguest =
                          localtravelinfodata.guestinfo.filter(
                            (x) => x.isguestvaildated == false
                          ).length;
                        etafretunrguest = localtravelinfodata.guestinfo.filter(
                          (x) => x.isguestvaildated == true
                        ).length;
                      }

                      if (feedata.id == 8) {
                        return (
                          <>
                            <li className="list-group-item d-flex justify-content-between">
                              <strong>Total </strong>
                              <strong>{feedata.amount.toFixed(2)}</strong>
                            </li>
                          </>
                        );
                      } else if (feedata.id == 1) {
                        if (packageid == "" || packageid == "1") {
                          return (
                            <>
                              <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                  <h6 className="my-0">{feedata.feefor}</h6>
                                  <sup
                                    style={{ fontSize: "10px" }}
                                    className="text-muted"
                                  >
                                    Environmental Tourism and Administrative Fee
                                  </sup>
                                  <br></br>
                                  <small className="text-muted">
                                    RE:{etafretunrguest} X {0}
                                  </small>
                                  <br></br>
                                  <small className="text-muted">
                                    N:{etafnonretunrguest} X {feedata.amount}
                                  </small>
                                </div>
                                <span className="text-muted">
                                  {(etafnonretunrguest * feedata.amount).toFixed(
                                    2
                                  )}
                                </span>
                              </li>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                  <h6 className="my-0">{feedata.feefor}</h6>
                                  <sup
                                    style={{ fontSize: "10px" }}
                                    className="text-muted"
                                  >
                                    Environmental Tourism and Administrative Fee
                                  </sup>
                                  <br></br>
                                  <small className="text-muted">
                                    RE:{etafretunrguest} X {0}
                                  </small>
                                  <br></br>
                                  <small className="text-muted">
                                    N:{etafnonretunrguest} X 80
                                  </small>
                                </div>
                                <span className="text-muted">
                                  {(etafnonretunrguest * 80).toFixed(
                                    2
                                  )}
                                </span>
                              </li>
                            </>
                          );
                        }
                      } else if (feedata.id == 4) {
                        return (
                          <>
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                              <div>
                                <h6 className="my-0">{feedata.feefor}</h6>

                                <small className="text-muted">
                                  P : {purchase} X {feedata.amount}
                                </small>
                                <br></br>
                                <small className="text-muted">
                                  R : {rental} X {feedata.rentprice}
                                </small>
                                <br></br>
                                <small className="text-muted">
                                  A : {alreadyhave} X {0}
                                </small>
                                <br></br>
                              </div>
                              <span className="text-muted">
                                {(
                                  purchase * feedata.amount +
                                  rental * feedata.rentprice
                                ).toFixed(2)}
                              </span>
                            </li>
                          </>
                        );
                      } else if (feedata.id == 2) {
                        if (packageid == "" || packageid == "1") {
                          return (
                            <>
                              <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                  <h6 className="my-0">{feedata.feefor}</h6>
                                  <sup
                                    style={{ fontSize: "10px" }}
                                    className="text-muted"
                                  >
                                    (two way price)
                                  </sup>
                                  <br></br>
                                </div>

                                <span className="text-muted">
                                  {feedata.amount.toFixed(2)}
                                </span>
                              </li>
                            </>
                          );
                        } else {
                          return (
                            <>
                            </>
                          );
                        }

                      } else if (feedata.id == 9) {
                        if (packageid == "" || packageid == "1") {
                          return (
                            <>
                              <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                  <h6 className="my-0">{feedata.feefor}</h6>
                                </div>

                                <span className="text-muted">
                                  {(islandhoppingamt * feevalsprice).toFixed(2)}
                                </span>
                              </li>
                            </>
                          );
                        } else {
                          return (
                            <>

                            </>
                          );
                        }

                      } else if (feedata.id == 5) {
                        if (packageid == "" || packageid == "1") {
                          return (
                            <>
                              <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                  <h6 className="my-0">{feedata.feefor}</h6>
                                </div>
                                <span className="text-muted">
                                  {feedata.amount.toFixed(2)}
                                </span>
                              </li>
                            </>);
                        } else {
                          return (
                            <>

                            </>
                          );
                        }

                      }
                      else {
                        return (
                          <>
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                              <div>
                                <h6 className="my-0">{feedata.feefor}</h6>
                              </div>
                              <span className="text-muted">
                                {feedata.amount.toFixed(2)}
                              </span>
                            </li>
                          </>
                        );
                      }
                    })}
                </ul>
                {/* <!-- Cart --> */}
              </div>
            </div>
            {/* <!-- Heading --> */}
          </div>
        </CRow>
        <div className="row">
          <div className="col-md-6 mb-6">
            {(() => {
              const rows = [];
              if (isvehicle && localtravelinfodata.isguest == false) {
                rows.push(
                  <>
                    <CButton
                      block
                      onClick={() => backtomainaction()}
                      variant=""
                      color="primary"
                      style={{ backgroundColor: "white", color: "#007bff" }}
                    >
                      Back{" "}
                    </CButton>
                  </>
                );
              } else {
                rows.push(
                  <>
                    <CButton
                      block
                      onClick={() => backaction()}
                      variant=""
                      color="primary"
                      style={{
                        display:
                          localtravelinfodata.isguest == false ? "none" : "",
                        backgroundColor: "white",
                        color: "#007bff",
                      }}
                    >
                      Back{" "}
                    </CButton>
                  </>
                );
              }
              return rows;
            })()}
          </div>
          <div className="col-md-6 mb-6">
            {(() => {
              const rows = [];
              if (isvehicle) {
                rows.push(
                  <>
                    <CButton
                      block
                      onClick={() => setaction()}
                      style={{ backgroundColor: "white", color: "#007bff" }}
                      variant=""
                      color="primary"
                    >
                      {localtravelinfodata.isguest == true
                        ? `Proceed to Pay`
                        : `Next`}{" "}
                    </CButton>
                  </>
                );
              } else {
                rows.push(
                  <>
                    <CButton
                      block
                      onClick={() => nextotguest()}
                      style={{ backgroundColor: "white", color: "#007bff" }}
                      variant=""
                      color="primary"
                    >
                      {localtravelinfodata.isguest == true
                        ? `Proceed to Pay`
                        : `Next`}{" "}
                    </CButton>
                  </>
                );
              }
              return rows;
            })()}
          </div>
        </div>
      </CCardBody >

      <CModal
        show={isconfirmbooking}
        onClose={() => setIsConfirmBooking(!isconfirmbooking)}
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>
            Booking <small className="text-muted"> Detail</small>{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCol md="12">
            <CForm>
              <CRow>
                <CCol xs="3">
                  <CLabel>From Date</CLabel>
                  <br></br>
                  <CLabel>
                    <b>{bookingdetail.fromdate}</b>
                  </CLabel>
                </CCol>
                <CCol xs="3">
                  <CLabel>To Date</CLabel>
                  <br></br>
                  <CLabel>
                    <b>{bookingdetail.todate}</b>
                  </CLabel>
                </CCol>
                <CCol xs="3">
                  <CLabel>Time</CLabel>
                  <br></br>
                  <CLabel>
                    <b>{bookingdetail.timeslot}</b>
                  </CLabel>
                </CCol>
                <CCol xs="3" hidden={!isshowboatselection}>
                  <CLabel>Boat Capacity</CLabel>
                  <br></br>
                  <CLabel>
                    <b>{bookingdetail.boatcapcity}</b>
                  </CLabel>
                </CCol>
                {/* </CRow>
              
              <CRow> */}
                <CCol xs="3">
                  <CLabel>Package</CLabel>
                  <br></br>
                  <CLabel>
                    <b>{bookingdetail.package}</b>
                  </CLabel>
                </CCol>
                <CCol xs="3" hidden={!isshowboatselection}>
                  <CLabel>Boat Provided by Resort</CLabel>
                  <br></br>
                  <CLabel>
                    <b>
                      {bookingdetail.isboatproviderbyresort == true
                        ? "Yes"
                        : "No"}
                    </b>
                  </CLabel>
                </CCol>
                <CCol xs="3">
                  <CLabel>Accommodation</CLabel>
                  <br></br>
                  <CLabel>
                    <b>{bookingdetail.hotel}</b>
                  </CLabel>
                </CCol>
                <CCol xs="3" hidden={!isshowboatselection}>
                  <CLabel>Vehicle Parking</CLabel>
                  <br></br>
                  <CLabel>
                    <b>{bookingdetail.vehicle}</b>
                  </CLabel>
                </CCol>
                {/* </CRow>
              <br></br>
              <CRow> */}
                <CCol xs="3">
                  <CLabel>Number Of Guest</CLabel>
                  <br></br>
                  <CLabel>
                    <b>{bookingdetail.numberoofguest}</b>
                  </CLabel>
                </CCol>
                <CCol xs="3">
                  <CLabel>IslandHopping</CLabel>
                  <br></br>
                  <CLabel>
                    <b>PHP {parseFloat(bookingdetail.islandhoppingamt).toFixed(2)}</b>
                  </CLabel>
                </CCol>
                {/* <CCol xs="3" >
                        <CLabel >ETAF</CLabel><br></br>
                        <CLabel ><b>{bookingdetail.ETAF * bookingdetail.numberoofguest}</b></CLabel>
                      </CCol>
                      <CCol xs="3" >
                        <CLabel >Bracelet</CLabel><br></br>
                        <CLabel ><b>{bookingdetail.Bracelet * bookingdetail.numberoofguest}</b></CLabel>
                      
                      </CCol> */}
                <CCol xs="3">
                  <CLabel>Total</CLabel>
                  <br></br>
                  <CLabel>
                    <b>
                      PHP {parseFloat(bookingdetail.totalcharge).toFixed(2)}
                    </b>
                  </CLabel>
                </CCol>
              </CRow>
            </CForm>
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CImg
            src={processing}
            height="50"
            width="50"
            style={{ display: isprocessing == true ? "" : "none" }}
            alt="qrcode"
          />
          <CButton
            color="primary "
            style={{
              float: "right",
              display: isprocessing == true ? "none" : "",
            }}
            onClick={() => Savedata()}
          >
            Proceed to Pay
          </CButton>
          {/* <CButton color="secondary" onClose={() => setIsConfirmBooking(!isconfirmbooking)} >Make Changes</CButton> */}
          <CButton
            color="primary "
            style={{ float: "right" }}
            onClick={() => setIsConfirmBooking(!isconfirmbooking)}
          >
            Make Changes
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal
        show={isopenbulkupload}
        onClose={() => setIsOpenBulkUpload(!isopenbulkupload)}
        size="lgx"
      >
        <CModalHeader>
          <h4>Bulk Upload</h4>
          <br></br>
        </CModalHeader>
        <CModalBody>
          <CCol md="12">
            <span>
              Please download the excel template from below and fill out the
              guest detail and upload it.
            </span>
            <br></br>
            <span style={{ color: "red" }}>
              (Required fields FirstName,LastName,Gender,Address,Mobile
              Number,EmailID)
            </span>
          </CCol>
          <br></br>
          <CCol md="12">
            <a href={common.guesttemplate} download>
              Download Guest Template{" "}
            </a>
          </CCol>
          <br></br>
          <CCol md="12">
            <CForm>
              <CRow>
                <CCol xs="8">
                  <CLabel>Filename</CLabel>
                  <br></br>
                  <input
                    type="file"
                    onChange={handlebulkUpload}
                    style={{ color: "transparent" }}
                    name="ImportExcel"
                    title="Select File"
                    id="importData"
                    accept=".xls,.xlsx"
                  ></input>
                  {(() => {
                    const rows = [];

                    if (bulkuploadfilename != undefined) {
                      rows.push(
                        <>
                          <CCol xs="12" style={{ color: "green" }}>
                            {bulkuploadfilename.name}
                          </CCol>
                        </>
                      );

                      return rows;
                    }
                  })()}
                </CCol>
                <CCol xs="4">
                  <div
                    className="row"
                    hidden={bulkuploaddata.length > 0 ? false : true}
                  >
                    <div className="col-lg-6">
                      {" "}
                      <CButton
                        block
                        onClick={() => savebulkupload()}
                        color="primary"
                      >
                        Save{" "}
                      </CButton>
                    </div>
                    <div className="col-lg-6">
                      {" "}
                      <CButton
                        block
                        onClick={() => cancelbulkupload()}
                        color="primary"
                      >
                        Cancel{" "}
                      </CButton>
                    </div>
                  </div>
                </CCol>
              </CRow>
            </CForm>
          </CCol>
          <br></br>
          <CCol md="12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>
                      <span style={{ color: "transparent" }}>
                        aaaaaaaaaaaaa
                      </span>
                      <br></br>Date Of Birth
                    </th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Mobile Number</th>
                    <th>EmailID</th>
                    <th>Rent Bracelet</th>
                    <th>Island Hopping</th>
                    <th>Citizen</th>
                    <th>Country</th>
                    <th>Province</th>
                    <th>Municipality</th>
                    <th>Maubanin</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const rows = [];

                    if (bulkuploadfilename != undefined) {
                      for (let i = 0; i < bulkuploaddata.length; i++) {
                        var _uploadedfile = bulkuploaddata[i];

                        rows.push(
                          <>
                            <tr>
                              <td>
                                {" "}
                                {_uploadedfile.isvalidmunicipality == true ? (
                                  <CIcon
                                    name="cil-thumb-up"
                                    style={{ color: "green " }}
                                  />
                                ) : (
                                  <CIcon
                                    name="cil-thumb-down"
                                    style={{ color: "red" }}
                                  />
                                )}{" "}
                              </td>
                              <td>{_uploadedfile.FirstName}</td>
                              <td>{_uploadedfile.LastName}</td>
                              <td>{_uploadedfile.DateOfBirth}</td>
                              <td>
                                {_uploadedfile.Gender == 0
                                  ? "Male"
                                  : _uploadedfile.Gender == 1
                                    ? "Femal"
                                    : "Other"}
                              </td>
                              <td>{_uploadedfile.Address}</td>
                              <td>{_uploadedfile.MobileNumber}</td>
                              <td>{_uploadedfile.EmailID}</td>
                              <td>
                                {_uploadedfile.RentBracelet == true
                                  ? "Yes"
                                  : "No"}
                              </td>
                              <td>
                                {_uploadedfile.IslandHopping == true
                                  ? "Yes"
                                  : "No"}
                              </td>
                              <td>{_uploadedfile.Citizendesc}</td>
                              <td>{_uploadedfile.Countrydesc}</td>
                              <td>{_uploadedfile.Provincedesc}</td>
                              <td
                                style={{
                                  color:
                                    _uploadedfile.isvalidmunicipality == true
                                      ? ""
                                      : "red",
                                }}
                              >
                                {_uploadedfile.Municipalitydesc}
                              </td>
                              <td>
                                {_uploadedfile.Maubanin == true ? "Yes" : "No"}
                              </td>
                            </tr>
                          </>
                        );
                      }

                      return rows;
                    }
                  })()}
                </tbody>
              </table>
            </div>
          </CCol>
        </CModalBody>
      </CModal>
      <CModal
        show={isconfirmchange}
        onClose={() => setIsConfirmChange(!isconfirmchange)}
        size="sm"
      >
        <CModalHeader>Confirmation!</CModalHeader>
        <CModalBody>
          Are you sure you want to change number of guest?<br></br>
          (this will remove your bulk upload guest detail)
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary "
            style={{
              float: "right",
              display: isprocessing == true ? "none" : "",
            }}
            onClick={() => Changenumberofguest()}
          >
            Change
          </CButton>
          {/* <CButton color="secondary" onClose={() => setIsConfirmBooking(!isconfirmbooking)} >Make Changes</CButton> */}
          <CButton
            color="primary "
            style={{ float: "right" }}
            onClick={() => setIsConfirmChange(!isconfirmchange)}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default TravelInfo;
