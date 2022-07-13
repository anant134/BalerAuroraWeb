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
  CBadge,
  CContainer,
  CSelect,
  CCardFooter
} from '@coreui/react'

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Select from 'react-select';
import CIcon from '@coreui/icons-react';
import dataservice from '../../service/dataservice';
import { toast } from 'react-toastify';
import { InputDecimal } from "../../commoncomponents/inputdecimal";
import DatePicker from 'react-date-picker';
import { discounticon } from 'src/assets/icons/discounticon';
import moment from 'moment';
import uuid from 'react-uuid';

const notify = (type, message, systemerror) => {
  switch (type) {
    case 1:
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER
      });
      break;
    case 2:
      var dtlmsg;
      if (systemerror !== undefined) {
        dtlmsg = <div>Please contact to administrator!<br></br>{message}</div>;
      } else {
        dtlmsg = <div>{message}</div>;
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
const Register = () => {
/* #region variable */  
  const [numberofguests, setNumberOfGuestData] = useState([]);
  const [selectednumberguest, setSelectedNumberGuest] = useState([]);

  const [boatcapacity, setBoatCapacity] = useState([]);
  const [selectedboatcapacity, setSelectedBoatCapacity] = useState([]);
  const [packagecapacity, setPackageCapacity] = useState([]);
  const [selectedpackagecapacity, setSelectedPackageCapacity] = useState([]);

  const [preferredhotels, setPreferredHotels] = useState([]);
  const [selectedpreferredhotels, setSelectedPreferredHotels] = useState([]);

  const [citizenship, setCitizenship] = useState([]);
  const [selectedCitizenship, setSelectedCitizenship] = useState([]);

  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);

  const [Gender, setGender] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);

  const [Province, setProvince] = useState([]);
  const [RawProvince, setRawProvince] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);

  const [Municipality, setMunicipality] = useState([]);
  const [RawMunicipality, setRawMunicipality] = useState([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState([]);

  const [boatdata, setBoatdata] = useState([]);
  const [packagedata, setPackagedata] = useState([]);
  const [perusercost, setperusercost] = useState(0);

  const [vehiclefee, setVehicleFee] = useState(0);
  const [showpay, setshowpay] = useState("none");
  const [showguest, setshowguest] = useState("");
  const [guestactivepostion, setguestactivepostion] = useState(0);
  const [guestarr, setguestarr] = useState(0);
  const [isguestinfo, setisguestinfo] = useState(false);
  const [maubancitizen, setismaubancitizen] = useState(false);
  const [selectedvehicle, setSelectedvehicle] = useState([]);
  const [vehicles, setVehiclesData] = useState([]);
  const [vehicleqty, setvehicleqty] = useState([]);
  const [vehicledata, setvehicledata] = useState([]);
  const [vehicleobject, setvehicleobject] = useState([]);
  const [fees, setFeesData] = useState([]);

  const [selecteddob, setDOB] = useState(new Date());
  const [discountamount, setDiscount] = useState(0);
  const [selectedguest, setselectedguest] = useState({
    Firstname: "",
    Middlename: "",
    Lastname: "",
    dob: moment(new Date()).format("YYYY-MM-DD"),
    Citizenship: 0,
    CountryofOrigin: 0,
    Province: 0,
    Municipality: 0,
    Gender: 0,
    Address: "",
    Mobilenumber: "",
    emailid: "",
    ismaubancitizen: 0,
    discount: 0,
    maubandiscount: 0,
    maubanfine: ""

  })

  const [selectedfromdate, setselectedfromdate] = useState(new Date());
  const [selectedtodate, setselectedtodate] = useState(new Date());
  const [vehiclearray, setvehiclearray] = useState([]);
  const [file, setFile] = React.useState("");

  const columns = [
    {
      name: 'Vehicle',
      selector: 'typeofvehicle',
      sortable: true,
    },
    // {
    //   name: 'Number',
    //   selector: '',
    //   sortable: true,
    // },
    {
      name: 'Qty',
      selector: 'qty',
      sortable: true,

    },
    {
      name: 'Action',
      selector: 'action',
      ignoreRowClick: true,
      cell: row => <CIcon name="cil-trash" onClick={e => deletedata(row, e)} className="mfe-2 custcusrsor" />

    },
  ];
  const data = [];
  const sgdata = [];
  const print = false;

  const [vgridata, setvgriddata] = useState({
    columns,
    data,
    print,
    export: false,
    filter: false

  });
  const [savevehiclegriddata, setvehiclegriddata] = useState({ sgdata });
  var Background=process.env.PUBLIC_URL+"/backgoundiamg.png";

/* #endregion variable */ 

/* #region service call */
   
 
 const getPackage = () => {
  dataservice("package", { requestfor: 'getpackage', data: { flag: 'a' } })
    .then(function (data) {
      if (data.resultkey == 1) {
        var result = data.resultvalue;
        var countdata = [];
        for (let index = 0; index < result.length; index++) {
          // 
          var d = result[index];

          if (d.isactive == "1") {
            var packdetail = d.description 
            countdata.push({
              id: d.id,
              label: packdetail,
              checked: false,
              price: d.price
            });
            if (countdata.length == 1) {
              //   
              //setSelectedPackageCapacity(d.id);

            }

          }

        }

        ;
        setPackagedata({ ...packagedata, result });
        setPackageCapacity(countdata);

      } else {
        //  notify(2,"No data found");
      }

    })
    .catch(function (edata) {
      notify(2, edata.toString(), 1);
    });

}

const getpreferredhotels = () => {
  // let countdata = [];
  // for (let index = 1; index < 4; index++) {
  //   countdata.push({
  //     value: index,
  //     label: `Hotel ` + index.toString()
  //   })

  // }
  dataservice("hotel", { requestfor: 'gethotel', data: { flag: 'a' } })
    .then(function (data) {
      if (data.resultkey == 1) {
        var result = data.resultvalue;
        let countdata = [];
        //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
        for (let index = 0; index < result.length; index++) {
          //   
          let item = result[index];
          countdata.push({ value: item.id, label: item.description })
          if (countdata.length === 1) {
            // setSelectedvehicle(item.id);
          }
        }
        setPreferredHotels(countdata);
      } else {
        //  notify(2,"No data found");
      }
    })
    .catch(function (edata) {
      notify(2, edata.toString(), 1);
    });

}
const getCitizenship = () => {
  // let ccountdata = [];
  // let citizen = ["Indian", "Filipino", "American"]
  // for (let i = 0; i < 3; i++) {
  //   ccountdata.push({
  //     value: i,
  //     label: citizen[i]
  //   })

  // }
  dataservice("citizenship", { requestfor: 'getcitizenship', data: { flag: 'a' } })
    .then(function (data) {
      if (data.resultkey == 1) {
        var result = data.resultvalue;
        let countdata = [];
        //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
        for (let index = 0; index < result.length; index++) {
          //   
          let item = result[index];
          countdata.push({ value: item.id, label: item.description })
          if (countdata.length === 1) {
            setSelectedCitizenship(item.id);
          }
        }
        setCitizenship(countdata);
      } else {
        //  notify(2,"No data found");
      }
    })
    .catch(function (edata) {
      notify(2, edata.toString(), 1);
    });

}
const getCountry = () => {
 
  dataservice("country", { requestfor: 'getcountry', data: { flag: 'a' } })
    .then(function (data) {
      if (data.resultkey == 1) {
        var result = data.resultvalue;
        let countdata = [];
        //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
        for (let index = 0; index < result.length; index++) {
          //   
          let item = result[index];
          countdata.push({ value: item.id, label: item.description })
          if (countdata.length === 1) {
           // setSelectedCountry(item.id);
          }
        }
        setCountry(countdata);
      } else {
        //  notify(2,"No data found");
      }
    })
    .catch(function (edata) {
      notify(2, edata.toString(), 1);
    });

}
const getGender = () => {
  let countdata = [];
  let country = ["Male", "Female", "Other"]
  for (let index = 0; index < 3; index++) {
    countdata.push({
      value: index,
      label: country[index]
    })

  }
  setGender(countdata);
}

const getProvince = () => {
    dataservice("province", { requestfor: 'getprovince', data: { flag: 'a' } })
    .then(function (data) {
      if (data.resultkey == 1) {
        var result = data.resultvalue;
        let countdata = [];
        //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
        for (let index = 0; index < result.length; index++) {
          //   
        //   ;
          let item = result[index];
          countdata.push({ value: item.id, label: item.description })
          if (countdata.length === 1) {
            setSelectedProvince(item.id);

          }
        }
        setRawProvince(result);
        //setProvince(countdata);
      } else {
        //  notify(2,"No data found");
      }
    })
    .catch(function (edata) {
      notify(2, edata.toString(), 1);
    });

}

const getMunicipalities = () => {
  // let countdata = [];
  // let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
  // for (let index = 0; index < 5; index++) {
  //   countdata.push({
  //     value: index,
  //     label: country[index]
  //   })

  // }

  dataservice("municipality", { requestfor: 'getmunicipality', data: { flag: 'a' } })
    .then(function (data) {
      if (data.resultkey == 1) {
        var result = data.resultvalue;
        let countdata = [];
        //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
        for (let index = 0; index < result.length; index++) {
          //   
          let item = result[index];
          countdata.push({ value: item.id, label: item.description })
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


}
/* #endregion service call */

/* #region events */ 
  const handleChangeOptionCS = e => {
     ;
    guestarr[guestactivepostion]["Citizenship"] = e.value;

    setselectedguest({ ...selectedguest, ["Citizenship"]: e.value });
  }

  const getnumberofguest = () => {
    let countdata = [];
    for (let index = 1; index <= parseInt(25); index++) {
      countdata.push({
        value: index,
        label: index.toString()
      })

    }
    setNumberOfGuestData(countdata);
    setSelectedNumberGuest(1);

    var guestarrdata = [];
    guestarrdata.push({
      Firstname: "",
      Middlename: "",
      Lastname: "",
      dob: new Date(),
      Citizenship: 0,
      CountryofOrigin: 0,
      Province: 0,
      Municipality: 0,
      Gender: 0,
      Address: "",
      Mobilenumber: "",
      emailid: "",
      ismaubancitizen: 0,
      discount: 0,
      maubandiscount: 0,
      maubanfine: ""
    })
    setguestarr(guestarrdata)


  }

  const handleChangeOptionBC = e => {
     

    var bc = boatcapacity.find(obj => obj.value === e.value);
    setSelectedBoatCapacity(bc);
    let bcapacityitem = boatdata.result.find(obj => obj.id === e.value);




  }

  const handleChangeOptionPack = e => {
    setSelectedPackageCapacity(e.value);

  }
  const handleChangeOptionNOG = e => {
    var guestarrdata = [];

    for (let index = 0; index < e.value; index++) {
      guestarrdata.push({
        Firstname: "",
        Middlename: "",
        Lastname: "",
        dob: new Date(),
        Citizenship: selectedCitizenship,
        CountryofOrigin: selectedCountry,
        Province: selectedProvince,
        Municipality: selectedMunicipality,
        Gender: 0,
        Address: "",
        Mobilenumber: "",
        emailid: "",
        ismaubancitizen: 0,
        discount: 0,
        maubandiscount: 0,
        maubanfine: "",
        touristuid: uuid()

      })

    }

    setguestarr(guestarrdata);
    setSelectedNumberGuest(e.value);

  }
  const handleChangeOptionPH = e => {
    let ph =
      preferredhotels.find(obj => obj.value === e.value);
    setSelectedPreferredHotels(ph);
  }

  const updatevehiclefee = () => {
    var vehiclecost = 0;
    for (let index = 0; index < vehicles["data"].length; index++) {
      const element = vehicles["data"][index];
      if (element.values != 0) {
        vehiclecost = vehiclecost + (element.amount * element.values);

      }

    }

    setVehicleFee(vehiclecost);

  }


  const handlepackagechanges = e => {
    
     const { id, value } = e.target;
      ;
    const newdata = packagecapacity.map((item) => {
      if (item.id.toString() === id) {
        const updatedItem = {
          ...item,
          checked: value=="false"?true:false

        };

        return updatedItem;
      }

      return item;
    });
    setPackageCapacity(newdata);
    //  setVehiclesData({ ...vehicles, ["data"]: newdata });

  }



  const getvehicles = () => {
    // 
    dataservice("vehicle", { requestfor: 'getvehicle', data: { flag: 'a' } })
      .then(function (data) {
        if (data.resultkey == 1) {
          var result = data.resultvalue;
          let countdata = [];
          //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
          for (let index = 0; index < result.length; index++) {
            //   
            let item = result[index];
            countdata.push({ value: item.id, label: item.typeofvehicle })
            if (countdata.length === 1) {
              // setSelectedvehicle(item.id);
            }
          }
          setVehiclesData(countdata);
          setvehiclearray(result);
          console.log(countdata);
        } else {
          //  notify(2,"No data found");
        }
      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });



  }

  const getboatdata = () => {
    dataservice("boat", { requestfor: 'getboat', data: { flag: 'a' } })
      .then(function (data) {
        if (data.resultkey == 1) {
          var result = data.resultvalue;
          var countdata = [];
          for (let index = 0; index < result.length; index++) {
            //  
            var d = result[index];
            d["perusercost"] = parseFloat(d.price) / parseFloat(d.capacity);
            if (d.isactive == "1") {
              var capdetail = d.description + `  (capacity-` + d.capacity + `)`
              countdata.push({
                value: d.id,
                label: capdetail
              });
              if (countdata.length == 1) {
                //   
                // setSelectedBoatCapacity(d.id);

              }

            }

          }

          ;
          setBoatdata({ ...boatdata, result });
          setBoatCapacity(countdata);

        } else {
          //  notify(2,"No data found");
        }

      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });



  }
  const getfees = () => {
    dataservice("fees", { requestfor: 'getfees', data: { flag: 'a' } })
      .then(function (data) {
        if (data.resultkey == 1) {
          //   
          var result = data.resultvalue;
          ;
          if (result.length > 0) {
            result.push({
              description: "Parking Fee",
              id: "-1",
              isactive: "1",
              price: "0.00"
            });
            result.push({
              description: "Age Discount",
              id: "-2",
              isactive: "1",
              price: "0.00"
            });
            result.push({
              description: "Mauban Citizen Discount",
              id: "-3",
              isactive: "1",
              price: "0.00"
            });
            result.push({
              description: "Package Fee",
              id: "-4",
              isactive: "1",
              price: "0.00"
            });
          }


          setFeesData({ ...fees, data: result });
        } else {
          //  notify(2,"No data found");
        }

      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });



  }


  const proceedtoguest = () => {


    setshowpay("");
    setshowguest("none");


  }
/* #endregion events */ 

/* #region useeffect */
  useEffect(() => {
    getvehicles();
    getnumberofguest();
    getfees();
    getpreferredhotels();
    getCitizenship();
    getCountry();
    getGender();
    getProvince();
    getMunicipalities();
    getboatdata();
    getPackage();

  }, []);
  useEffect(() => {
    if (selectedboatcapacity.value != "") {
      if (fees.data) {
        for (let index = 0; index < fees.data.length; index++) {
          const element = fees.data[index];
          if (element.id == "2") {
            element.price = 0;
          } else if (element.id == "3") {
            element.price = 0;
          }
        }
        setFeesData({ ...fees, data: fees.data });

      }
      // 

    }
    // setFeesData({ ...fees, data: fees.data });
  }, [selectedboatcapacity.value]);
  useEffect(() => {
    if (selectedCountry != "") {
      //set province
      setSelectedProvince(0);
    guestarr[guestactivepostion]["Province"] = 0;

    setselectedguest({ ...selectedguest, ["Province"]: 0 });

      var filterprovince= RawProvince.filter(x=>x.countryid==selectedCountry);
      if(filterprovince.length>0){
        let countdata=[];
        
        for (let index = 0; index < filterprovince.length; index++) {
          const element = filterprovince[index];
          countdata.push({ value: element.id, label: element.description })
          
        }
        
        setProvince(countdata);
        
      }
    }
  },[selectedCountry])
  useEffect(() => {
    if (selectedProvince != "") {
      //set province
       ;
      var filtemunicipality= RawMunicipality.filter(x=>x.provinceid==selectedProvince);
      if(filtemunicipality.length>0){
        let countdata=[];
        
        for (let index = 0; index < filtemunicipality.length; index++) {
          const element = filtemunicipality[index];
          countdata.push({ value: element.id, label: element.description })
          
        }
        setMunicipality(countdata);
      }
    }
  },[selectedProvince])
  
  useEffect(() => {
    if (guestactivepostion != "") {
      
      setselectedguest(guestarr[guestactivepostion]);
      //console.log(guestarr);
    }
  }, [guestactivepostion]);

 
/* #endregion useeffect */
 
 /* #region action */
 
const deletedata = (row, e) => {
}
 const setaction = () => {
  if (isguestinfo == true) {
    Savedata();
    //
  } else {
    setguestactivepostion(0);
    setselectedguest(guestarr[0])
    setisguestinfo(true)
  }
}

const backaction = () => {
  setisguestinfo(false);
}
 const handleChangevehicleqty = e => {
  //   
  setvehicleqty(e.target.value);
}

const handleChange = e => {
  // 
   ;
  const { id, value } = e.target;


  if (e.target.type === 'file' ) {
    guestarr[guestactivepostion][id] = e.target.files[0];
    setselectedguest({ ...selectedguest, [id]: e.target.files[0] });
  }else{
      //setguestarr({...guestarr, [id]: value });
    guestarr[guestactivepostion][id] = value;


    //setVehiclesData({ ...guestarr, guestarr });
    setselectedguest({ ...selectedguest, [id]: value });
  }



  // setVehiclesData({ ...vehicles, ["data"]: newdata });
}
const handleChangeOptionCountry = e => {

  setSelectedCountry(e.value);
  guestarr[guestactivepostion]["CountryofOrigin"] = e.value;
  setselectedguest({ ...selectedguest, ["CountryofOrigin"]: e.value });
  //bind province base on country
  

}
const handleChangeOptionProvince = e => {
  setSelectedProvince(e.value);

  guestarr[guestactivepostion]["Province"] = e.value;

  setselectedguest({ ...selectedguest, ["Province"]: e.value });

}
const handleChangeOptionMunicipality = e => {
  setSelectedMunicipality(e.value);

  guestarr[guestactivepostion]["Municipality"] = e.value;

  setselectedguest({ ...selectedguest, ["Municipality"]: e.value });
}
const handleChangeOptionGender = e => {

  guestarr[guestactivepostion]["Gender"] = e.value;

  setselectedguest({ ...selectedguest, ["Gender"]: e.value });
}
const handleChangeCheckbox = e => {
   
  if (e.target.type === 'checkbox') {
    if (e.target.checked == true) {
      guestarr[guestactivepostion]["ismaubancitizen"] = 1;

      setselectedguest({ ...selectedguest, ["ismaubancitizen"]: 1 });

    }
    else {
      guestarr[guestactivepostion]["ismaubancitizen"] = 0;

      setselectedguest({ ...selectedguest, ["ismaubancitizen"]: 0 });

     
    }
  }

}
const handleChangeVehicle = e => {
  let svo = vehicles.find(obj => obj.value === e.value);
  setvehicleobject(svo);
  setSelectedvehicle(e.value);
}

const handleChangeUpload = e => {
   ;
  // setFile(e.target.files[0]);
  // guestarr[guestactivepostion]["maubanfile"] = e.target.files[0];

  // setselectedguest({ ...selectedguest, ["maubanfile"]: e.target.files[0] });
}

const onChangeDateOfBirth = e => {
   
  var dob = e;

  //var ndob = moment(e).format("YYYY-MM-DD");
  //setDOB(ndob);
  var today = new Date();
  var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
  var userfee = {};
  var discountfig = 0;
  let boatfee = 0;
  var boatcap = boatcapacity;
  var boatd = boatdata.result;
  if (boatcap) {

    var belement = boatcap.find(obj => obj.value === selectedboatcapacity.value);

    if (belement) {
      var bamtelement = boatd.find(obj => obj.id === selectedboatcapacity.value);
      boatfee = parseFloat((parseFloat(bamtelement.price) / (parseFloat(bamtelement.capacity))));
    }
  }
  let dfee = boatfee;
  if (fees.data) {
    userfee = fees.data.filter(x => x.id == 2)[0];
    if (age >= 60) {

      discountfig = dfee - calculateSale(dfee, 20);
    } else if (age <= 7) {
      discountfig = dfee - calculateSale(dfee, 20);
    }

    setDiscount(discountfig);

    guestarr[guestactivepostion]["discount"] = discountfig;

    setselectedguest({ ...selectedguest, ["discount"]: discountfig });

  }
  // 
  guestarr[guestactivepostion]["dob"] = moment(dob).format("YYYY-MM-DD");

  setselectedguest({ ...selectedguest, ["dob"]: moment(dob).format("YYYY-MM-DD") });
  setDOB(dob);
  //setse(moment(e).format("YYYY-MM-DD"));
}

const setselectguest = (selectval) => {

  setguestactivepostion(selectval);
  //   
  setselectedguest(guestarr[selectval]);
  
  setDOB(new Date((guestarr[guestactivepostion]["dob"])));
  

}

const addvehicle = () => {
   
  let vdata = [];
  let sg = [];
  var a = vehiclearray.find(obj => obj.id == selectedvehicle);
  vdata.id = selectedvehicle;
  vdata.amount = a.amount;
  vdata.qty = vehicleqty;
  vdata.typeofvehicle = a.typeofvehicle;
  sg.id = selectedvehicle;
  sg.amount = a.amount;
  sg.qty = vehicleqty;
  sg.typeofvehicle = a.typeofvehicle;
  let upvddateflag = false;
  let upvgriddateflag = false;
  // console.log(savevehiclegriddata);
  setvehiclegriddata({ ...savevehiclegriddata, ["sgdata"]: [...savevehiclegriddata.sgdata, sg] });
  if (vgridata.data) {
    for (let k = 0; k < vgridata.data.length; k++) {
      if (vgridata.data[k].id == vdata.id) {
        vgridata.data[k].qty = parseInt(vgridata.data[k].qty) + parseInt(vdata.qty);

        // setvehicledata(vehicledata);
        setvgriddata({ columns, ["data"]: vgridata.data });
        upvgriddateflag = true;
        break;
      }
    }
  }
  //vdata.typeofvehicle = setvehicledata.filter(obj => obj.id == selectedvehicle);

  if (upvgriddateflag == false) {

    setvgriddata({ ...vgridata, ["data"]: [...vgridata.data, vdata] });
  }

  setvehicledata(...vehicledata, vdata);
  let vo = [];
  setvehicleobject(vo);

  setvehicleqty(vo);
}
const Savedata = () => {
  notify(1, `Data save successfully.`);
  let val = Math.floor(1000 + Math.random() * 9000);

  let Difference_In_Time = selectedtodate - selectedfromdate;


  var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
  var totalvehicleingrid = 0;
  if (vgridata.data) {
    for (let i = 0; i < vgridata.data.length; i++) {
      totalvehicleingrid = totalvehicleingrid + vgridata.data[i].qty;
    }
  }
 
  var _guestinfotosave=[];
  for (let index = 0; index < guestarr.length; index++) {
    const element = guestarr[index];
    _guestinfotosave.push(element);
    
  }
 ;
return ;

  var submitdata = {

    fromdate: moment(selectedfromdate).format("YYYY-MM-DD"),
    todate: moment(selectedtodate).format("YYYY-MM-DD"),
    numberofdays: Difference_In_Days,
    totalcharge: document.getElementById('Ltotal').textContent,
    pax: guestarr.length,
    boatcapcity: selectedboatcapacity.value,
    preferredhotels: selectedpreferredhotels.value,
    paymentid: val,
    selectedvehicleinfo: [],
    touristinfo: guestarr,
    chargesinfo: [],
    numberofvehicle: totalvehicleingrid,
    touristvehicles: savevehiclegriddata.sgdata,
    packagedata: packagecapacity

  }


  dataservice("registration", {
    requestfor: 'registration',

    data: submitdata
  })
    .then(function (data) {
       
      if (data.resultkey == 1) {

        var result = data.resultvalue;

        setisguestinfo(false);
        reset();
      } else {
        console.log("error");
      }
    })
    .catch(function (error) {
      console.log(error);
    })

}

const reset = () => {
  var guestarrdata = [];
  guestarrdata.push({
    Firstname: "",
    Middlename: "",
    Lastname: "",
    dob: new Date(),
    Citizenship: 0,
    CountryofOrigin: 0,
    Province: 0,
    Municipality: 0,
    Gender: 0,
    Address: "",
    Mobilenumber: "",
    emailid: "",
    ismaubancitizen: 0,
    discount: 0,
    maubandiscount: 0,
    maubanfine: "",
    maubanorginalfilename:""
  })
  var emptyguestno = [];
  emptyguestno.push({ value: null, label: null });
  setguestarr(guestarrdata);
  setSelectedBoatCapacity([]);
  var countdata = [];
  countdata.push({
    value: "",
    label: ""
  });

  setNumberOfGuestData(countdata);
  setSelectedNumberGuest("");
  setSelectedPreferredHotels(countdata);


  let vo = [];
  setvehicleobject(vo);

  setvehicleqty(vo);

  const newdata = packagecapacity.map((item) => {

    const updatedItem = {
      ...item,
      checked: false

    };

    return updatedItem;


    return item;
  });
  setPackageCapacity(newdata);

  setvgriddata({
    columns,
    data,
    print,
    export: false,
    filter: false

  });

  setselectedfromdate(new Date());
  setselectedtodate(new Date());
}

const calculateSale = (listPrice, discount) => {
  listPrice = parseFloat(listPrice);
  discount = parseFloat(discount);
  return (listPrice - ((listPrice * discount) / 100)).toFixed(2); // Sale price
}
/* #endregion action */


  
  
  return (
    <div className="c-app c-default-layout flex-row align-items-center bg" style={{  background: `url(${Background})`,backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center',
    backgroundSize: 'cover'}}  >
      <CContainer>
        <CRow className="justify-content-center" >
          <CCol md="9" lg="7" xl="12">
            < CCard className="mx-3">
              <CCardBody className="p-2">

                <CCol md="12">
                  <CForm>
                    <CRow >
                      <CCol style={{ display: isguestinfo == true ? "" : "none" }} xs="8">
                        <h5>Guests</h5>

                        <CCardBody>
                          <CRow>
                            <CCol md="3">
                              
                              {(() => {
                                const rows = [];
                                if (guestarr != undefined) {
                                  ;
                                  for (let i = 0; i < guestarr.length; i++) {
                                    rows.push(<>
                                      <CButton block onClick={() => setselectguest(i)} variant={i == guestactivepostion ? "" : "outline"} color="success">Guest {i + 1} </CButton>

                                    </>);
                                  }
                                  return rows;
                                }

                              })()}


                            </CCol>
                            <CCol md="9" >
                              <CRow>
                                <CCol xs="4">
                                  <CFormGroup >
                                    <CLabel htmlFor="ccnumber">First name</CLabel>
                                    <CInput onChange={handleChange} value={selectedguest.Firstname} type="text" id="Firstname" placeholder="First Name" />
                                  </CFormGroup>

                                </CCol>
                                <CCol xs="4">
                                  <CFormGroup >
                                    <CLabel htmlFor="ccnumber">Middle name</CLabel>
                                    <CInput onChange={handleChange} type="text" value={selectedguest.Middlename} id="Middlename" placeholder="Middle Name" />
                                  </CFormGroup>

                                </CCol>
                                <CCol xs="4">
                                  <CFormGroup >
                                    <CLabel htmlFor="ccnumber">Last name</CLabel>
                                    <CInput onChange={handleChange} type="text" value={selectedguest.Lastname} id="Lastname" placeholder="Last name" />
                                  </CFormGroup>

                                </CCol>
                                <CCol xs="4">
                                  <CFormGroup >
                                    <CLabel htmlFor="ccnumber">Date Of Birth</CLabel>
                                    <DatePicker

                                      value={selecteddob}
                                      onChange={onChangeDateOfBirth}

                                    />
                                  </CFormGroup>

                                </CCol>
                                <CCol xs="4">
                                  <CFormGroup >
                                    <CLabel htmlFor="ccnumber">Citizenship</CLabel>
                                    <Select
                                      id="Citizenship"
                                      className="dropdown"
                                      placeholder="Select"
                                      value={citizenship.find(obj => obj.value === selectedguest.Citizenship)} // set selected values
                                      options={citizenship} // set list of the data
                                      onChange={handleChangeOptionCS} // assign onChange function
                                    />
                                  </CFormGroup>

                                </CCol>
                                <CCol xs="4">
                                  <CFormGroup >
                                    <CLabel htmlFor="ccnumber">Country Of orgin</CLabel>
                                    <Select
                                      id="CountryofOrigin"
                                      className="dropdown"
                                      placeholder="Select"
                                      value={country.find(obj => obj.value === selectedguest.CountryofOrigin)} // set selected values
                                      options={country} // set list of the data
                                      onChange={handleChangeOptionCountry} // assign onChange function
                                    />
                                  </CFormGroup>

                                </CCol>
                                <CCol xs="4">
                                  <CFormGroup >
                                    <CLabel htmlFor="ccnumber">Province</CLabel>
                                    <Select
                                      className="dropdown"
                                      placeholder="Select"
                                      value={Province.find(obj => obj.value === selectedguest.Province)} // set selected values
                                      options={Province} // set list of the data
                                      onChange={handleChangeOptionProvince} // assign onChange function
                                    />
                                  </CFormGroup>

                                </CCol>
                                <CCol xs="4">
                                  <CFormGroup >
                                    <CLabel htmlFor="ccnumber">Municipality</CLabel>
                                    <Select
                                      className="dropdown"
                                      placeholder="Select"
                                      value={Municipality.find(obj => obj.value === selectedguest.Municipality)} // set selected values
                                      options={Municipality} // set list of the data
                                      onChange={handleChangeOptionMunicipality} // assign onChange function
                                    />
                                  </CFormGroup>

                                </CCol>
                                <CCol xs="4">
                                  <CFormGroup >
                                    <CLabel htmlFor="ccnumber">Gender</CLabel>
                                    <Select
                                      className="dropdown"
                                      placeholder="Select"
                                      value={Gender.find(obj => obj.value === selectedguest.Gender)} // set selected values
                                      options={Gender} // set list of the data
                                      onChange={handleChangeOptionGender} // assign onChange function
                                    />
                                  </CFormGroup>

                                </CCol>
                                <CCol xs="12">
                                  <CFormGroup >
                                    <CLabel htmlFor="ccnumber">Address</CLabel>
                                    <CInput onChange={handleChange} value={selectedguest.Address} type="text" id="Address" placeholder="Address" />
                                  </CFormGroup>

                                </CCol>
                                <CCol xs="6">
                                  <CFormGroup >
                                    <CLabel htmlFor="ccnumber">Mobile Number </CLabel>
                                    <CInput onChange={handleChange} value={selectedguest.Mobilenumber} type="text" id="Mobilenumber" placeholder="Mobile " />
                                  </CFormGroup>

                                </CCol>
                                {/* Address: "",
        Mobilenumber: "",
        emailid: " */}
                                <CCol xs="6">
                                  <CFormGroup >
                                    <CLabel htmlFor="ccnumber">E-mail Address</CLabel>
                                    <CInput onChange={handleChange} value={selectedguest.emailid} type="text" id="emailid" placeholder="Email" />
                                  </CFormGroup>

                                </CCol>

                                <CCol xs="4">
                                  <CFormGroup>
                                    <CLabel htmlFor="ccnumber">Mauban Citizen</CLabel>
                                    <CInput style={{ width: "20%" }} onChange={handleChangeCheckbox} type="checkbox" checked={selectedguest.ismaubancitizen == 0 ? false : true} value={selectedguest.ismaubancitizen == 0 ? false : true} id="maubancitizen" />
                                  </CFormGroup>
                                  {/* 
                                  <CFormGroup variant="custom-checkbox" inline>
                                    <CLabel variant="custom-checkbox" htmlFor="ismaubancitizen">Mauban Citizen</CLabel>
                                    <CInputCheckbox custom id="ismaubancitizen" name="inline-checkbox2" value={selectedguest.ismaubancitizen} checked={selectedguest.ismaubancitizen} onChange={handleChangeCheckbox} />

                                  </CFormGroup> */}

                                </CCol>

                                

                                <CCol xs="8" style={{display:selectedguest.ismaubancitizen == 0 ? "none" : ""}}>
                                  <CFormGroup>
                                    <CLabel htmlFor="ccnumber">Filename:</CLabel>
                                    
                                   
                                    <CInput onChange={handleChange} style={{color:"transparent"}}   id="maubanfile" type="file" />

                                    {(() => {
                                  const rows = [];
                                   ;
                                  if (selectedguest.maubanfile != undefined) {

                                    rows.push(<>
                                      <CCol xs="12" style={{color:"green"}}>
                                         {selectedguest.maubanfile.name}
                                      </CCol>
                                    </>);
                                    

                                    return rows;
                                  }

                                })()}
                                  </CFormGroup>


                                </CCol>
                              </CRow>
                             

                            </CCol>

                          </CRow>




                        </CCardBody>
                      </CCol>
                      <CCol style={{ display: isguestinfo == true ? "none" : "" }} xs="8">
                        <h5>Travel</h5>

                        <CCardBody>

                          <CRow>
                            <CCol xs="4">
                              <CLabel htmlFor="ccnumber">Number of Guests</CLabel>
                              <CFormGroup>
                                <Select
                                  className="dropdown"
                                  placeholder="Select"
                                  value={numberofguests.find(obj => obj.value === selectednumberguest)} // set selected values
                                  options={numberofguests} // set list of the data
                                  onChange={handleChangeOptionNOG} // assign onChange function
                                />

                              </CFormGroup>
                            </CCol>

                            <CCol xs="4">
                              <CLabel htmlFor="name">Start Date</CLabel>
                              <CFormGroup>

                                <DatePicker
                                  value={selectedfromdate}
                                  onChange={setselectedfromdate}

                                />
                              </CFormGroup>
                            </CCol>
                            <CCol xs="4">
                              <CLabel htmlFor="ccnumber">End Date</CLabel>
                              <CFormGroup>

                                <DatePicker
                                  value={selectedtodate}
                                  onChange={setselectedtodate}
                                />
                              </CFormGroup>
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol xs="6">
                              <CLabel htmlFor="name">Select Package</CLabel>
                            </CCol>
                          </CRow>
                          <CRow>

                            {(() => {
                              const rows = [];
                              if (packagecapacity.length > 0) {
                                for (let i = 0; i < packagecapacity.length; i++) {
                                  var _veh = packagecapacity[i];
                                 var cls=_veh.checked==true?"btn btn-block btn-success active":"btn btn-block btn-outline-primary"
                                  //_veh.checked = false;
                                  rows.push(<> <CCol key={i} index={i} xs="4">
                                    
                                    <button className={cls} id={_veh.id} value={_veh.checked} onClick={handlepackagechanges} type="button">{_veh.label}{_veh.checked} </button>
                                   
                                    {/* <CFormGroup key={`form_` + i}>
                                      <CLabel key={`lbl_` + i} htmlFor="ccnumber">{_veh.label}</CLabel>
                                      <CInput style={{ width: "10%" }} key={`inp_` + i} onChange={handlepackagechanges} type="checkbox" id={_veh.id} checked={_veh.checked} price={_veh.price} />
                                    </CFormGroup> */}


                                  </CCol></>);
                                }
                                return rows;
                              }

                            })()}
                          </CRow>
                          <CRow>

                          </CRow>

                          <CRow>

                            <CCol xs="6">
                              <CLabel htmlFor="ccnumber">Boat Capacity</CLabel>
                              <CFormGroup>
                                <Select
                                  className="dropdown"
                                  placeholder="Select Boat Capacity"
                                  value={selectedboatcapacity} // set selected values
                                  options={boatcapacity} // set list of the data
                                  onChange={handleChangeOptionBC} // assign onChange function
                                />
                              </CFormGroup>
                            </CCol>


                            <CCol xs="6">
                              <CLabel htmlFor="ccnumber">Preferred Hotel</CLabel>
                              <CFormGroup>
                                <Select
                                  className="dropdown"
                                  placeholder="Select"
                                  value={selectedpreferredhotels} // set selected values
                                  options={preferredhotels} // set list of the data
                                  onChange={handleChangeOptionPH} // assign onChange function
                                />
                              </CFormGroup>
                            </CCol>
                          </CRow>
                          {/*  <CRow>
                            
                          
                            <CCol xs="6">
                              <CLabel htmlFor="ccnumber">Package</CLabel>
                              <CFormGroup>
                                <Select
                                  className="dropdown"
                                  placeholder="Select Package"
                                  value={packagecapacity.find(obj => obj.value === selectedpackagecapacity)} // set selected values
                                  options={packagecapacity} // set list of the data
                                  onChange={handleChangeOptionPack} // assign onChange function
                                />
                              </CFormGroup>
                            </CCol> 

                          </CRow> */}

                          <CRow>
                            <CCol xs="6">
                              <CLabel htmlFor="ccnumber"> Vehicle</CLabel>
                              <CFormGroup>
                                <Select
                                  className="dropdown"
                                  placeholder="Select Vehicle"
                                  value={vehicleobject} // set selected values
                                  options={vehicles} // set list of the data
                                  onChange={handleChangeVehicle} // assign onChange function
                                />

                              </CFormGroup>
                            </CCol>
                           
                            <CCol xs="4">
                              <CFormGroup >
                                <CLabel htmlFor="ccnumber">Vehicle Qty</CLabel>
                                <CInput type="text" id="vehicleqty" value={vehicleqty} onChange={handleChangevehicleqty} placeholder="Qty" />
                              </CFormGroup>

                            </CCol>
                            <CCol xs="2">
                              <br />
                              <CFormGroup >
                                <CButton className="btnaddvechicle" color="primary" onClick={() => addvehicle()}  >Add</CButton>
                              </CFormGroup>
                            </CCol>




                          </CRow>
                          <CRow>
                            <CCol xs="12">
                              <DataTableExtensions
                                {...vgridata}
                              >


                                <DataTable
                                  noHeader
                                  defaultSortField="id"
                                  defaultSortAsc={false}
                                  // pagination
                                  highlightOnHover


                                />
                              </DataTableExtensions>
                            </CCol>
                          </CRow>
                        </CCardBody>
                      </CCol>

                      <CCol xs="4" >
                        <h5>Computation of Fees</h5>
                        {/* <p className="text-muted">Book Now</p> */}
                        {(() => {

                          const rows = [];
                          var totalvalue = 0;
                          var boatfees = 0;
                          var _vehtempdata = vgridata.data;
                          var _vehparkingcost = 0;
                          var _discountvalue = 0;
                          var _mdiscount = 0;
                          var _mfeesprice = 0;
                          var _packagefee = 0;
                          if (fees.data) {
                            var _mdata = fees.data.find(obj => obj.id === "1");

                            _mfeesprice = parseFloat(_mdata.price);
                          }
                          if (packagecapacity) {
                            for (let n = 0; n < packagecapacity.length; n++) {
                              if (packagecapacity[n]["checked"] == true)
                                _packagefee = _packagefee + parseFloat(packagecapacity[n]["price"]);
                            }
                          }

                          if (guestarr != undefined) {

                            for (let m = 0; m < guestarr.length; m++) {
                              _discountvalue = _discountvalue + (parseFloat(guestarr[m]["discount"]));
                              if (guestarr[m]["ismaubancitizen"] == 1) {
                                _mdiscount = _mdiscount + _mfeesprice;
                              }


                            }
                          }
                          if (_vehtempdata !== undefined) {
                            var _veh = _vehtempdata;
                            if (_veh.length > 0) {
                              for (let index = 0; index < _veh.length; index++) {
                                const element = _veh[index];
                                _vehparkingcost = _vehparkingcost + parseFloat((parseFloat(element.qty) * parseFloat(element.amount)));

                              }
                            }
                          }
                           
                          var boatcap = boatcapacity;
                          var boatd = boatdata.result;
                          if (boatcap) {

                            var belement = boatcap.find(obj => obj.value === selectedboatcapacity.value);

                            if (belement) {
                              var bamtelement = boatd.find(obj => obj.id === selectedboatcapacity.value);
                              boatfees = parseFloat((parseFloat(bamtelement.twowayprice)));
                            }
                          }

                          ;
                          if (fees.data) {
                            // 
                            for (let i = 0; i < fees.data.length; i++) {
                              var _fees = fees.data[i];
                              if(_fees.isactive=="1"){
                                totalvalue = totalvalue + (_fees.price * selectednumberguest);
                                if (_fees.id == "-1" || _fees.id == "-2" || _fees.id == "-3" || _fees.id == "-4") {
                                  //parking
                                  if (_fees.id == "-1") {
                                    rows.push(<>
                                      <CRow>
                                        <CCol xs="10">
                                          <CLabel htmlFor="ccnumber">{_fees.description}</CLabel>
                                        </CCol>
                                        <CCol xs="2">
                                          <CLabel htmlFor="ccnumber">{(_vehparkingcost).toFixed(2)}</CLabel>
                                        </CCol>
                                      </CRow>
                                    </>);
                                  } else if (_fees.id == "-2") {
                                    //discount
                                    rows.push(<>
                                      <CRow>
                                        <CCol xs="10">
                                          <CLabel htmlFor="ccnumber">{_fees.description}</CLabel>
                                        </CCol>
                                        <CCol xs="2">
                                          <CLabel htmlFor="ccnumber">{(_discountvalue).toFixed(2)}</CLabel>
                                        </CCol>
                                      </CRow>
                                    </>);
                                  } else
                                    if (_fees.id == "-3") {
                                      rows.push(<>
                                        <CRow>
                                          <CCol xs="10">
                                            <CLabel htmlFor="ccnumber">{_fees.description}</CLabel>
                                          </CCol>
  
                                          <CCol xs="2">
                                            <CLabel htmlFor="ccnumber">{(_mdiscount).toFixed(2)}</CLabel>
                                          </CCol>
                                        </CRow>
                                      </>);
  
  
                                    }
                                    else
                                      if (_fees.id == "-4") {
                                        rows.push(<>
                                          <CRow>
                                            <CCol xs="10">
                                              <CLabel htmlFor="ccnumber">{_fees.description}</CLabel>
                                            </CCol>
  
                                            <CCol xs="2">
                                              <CLabel htmlFor="ccnumber">{(_packagefee).toFixed(2)}</CLabel>
                                            </CCol>
                                          </CRow>
                                        </>);
  
  
                                      }
                                } else {
                                  if (_fees.id == "3") {
                                    rows.push(<>
                                      <CRow>
                                        <CCol xs="10">
                                          <CLabel htmlFor="ccnumber">{_fees.description}</CLabel>
                                        </CCol>
  
                                        <CCol xs="2">
                                          <CLabel htmlFor="ccnumber">{(_fees.price * selectednumberguest).toFixed(2)}</CLabel>
                                        </CCol>
                                      </CRow>
                                    </>);
  
                                  }
                                  else if (_fees.id == "2") {
                                    rows.push(<>
                                      <CRow>
                                        <CCol xs="10">
                                          <CLabel htmlFor="ccnumber">{_fees.description}</CLabel>
                                        </CCol>
  
                                        <CCol xs="2">
                                          <CLabel htmlFor="ccnumber">{(boatfees).toFixed(2)}</CLabel>
                                        </CCol>
                                      </CRow>
                                    </>);
  
                                  }
                                  else {
                                    rows.push(<>
                                      <CRow>
                                        <CCol xs="6">
                                          <CLabel htmlFor="ccnumber">{_fees.description}</CLabel>
                                        </CCol>
                                        <CCol xs="4">
                                          <CLabel htmlFor="ccnumber">{_fees.price} x {selectednumberguest}</CLabel>
                                        </CCol>
                                        <CCol xs="2">
                                          <CLabel htmlFor="ccnumber">{(_fees.price * selectednumberguest).toFixed(2)}</CLabel>
                                        </CCol>
                                      </CRow>
                                    </>);
  
                                  }
                                } 
                              }
                             

                            }

                            if (rows.length > 0) {

                              rows.push(<>
                                <hr></hr>
                                <CRow>
                                  <CCol xs="10" style={{ textAlign: "right" }}>
                                    <CLabel htmlFor="ccnumber">Total</CLabel>
                                  </CCol>

                                  <CCol xs="2">
                                    <CLabel id="Ltotal" htmlFor="ccnumber">{(totalvalue + boatfees + _vehparkingcost - _discountvalue - _mdiscount + _packagefee).toFixed(2)}</CLabel>
                                  </CCol>
                                </CRow>
                              </>)
                            }
                            return rows;
                          }

                        })()}







                      </CCol>
                    </CRow>

                  </CForm>

                </CCol>





              </CCardBody>
              <CCardFooter>
                <CRow>
                  <CCol xs="6">
                    <CButton block onClick={() => backaction()} variant="outline" style={{ display: isguestinfo == true ? "" : "none" }} color="primary">Back   </CButton>
                  </CCol>
                  <CCol xs="6">

                    <CButton block onClick={() => setaction()} variant="" color="primary">{isguestinfo == true ? `Proceed to Pay` : `Proceed to Guest`} </CButton>
                  </CCol>



                </CRow>

              </CCardFooter>

            </CCard>

          </CCol>


         

        </CRow>

      </CContainer>
    </div>
  )
}

export default Register
