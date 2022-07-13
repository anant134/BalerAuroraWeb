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
  CCollapse,
  CSelect,
  CCardFooter,
  CImg
} from '@coreui/react'

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Select from 'react-select';
import CIcon from '@coreui/icons-react';
import dataservice from '../../service/dataservice';
import { toast } from 'react-toastify';
import { InputDecimal } from "../../commoncomponents/inputdecimal";
import DatePicker from "react-datepicker";
import { discounticon } from 'src/assets/icons/discounticon';
import moment from 'moment';
import uuid from 'react-uuid';
import FeesComputation from '../register/FeesComputation'
import TravelInfo from '../register/TravelInfo'
import GuestInfo from '../register/GuestInfo'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { userContext } from '../../../views/userContext'
import '../../../scss/bootstrap.css';
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
        case 3:
          
          toast.info(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
          });
        break;
  
      default:
        break;
    }
  }
  var processing=process.env.PUBLIC_URL+"/processing.gif";
const EditBooking = () => {
  const history=useHistory();
    var Background=process.env.PUBLIC_URL+"/bgnew.jpg";
    const [contextdata, setcontextdata] = useState();
    const [state, setState] = useState({refenecenum:"",emailid:""});
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [accordion, setAccordion] = useState(0);
    const [ispricerise, setIsPriceRise] = useState("");
    const [totaldue, setTotalDue] = useState(0);
    const [totalrefund, setTotalRefund] = useState(0);
    
   
    const getMonth=(month)=>{
        var returnmonth="";
        switch (month) {
            case 1:
                returnmonth= "Jan";
                break;
            case 2:
                returnmonth= "Feb";
                break;
            case 3:
                returnmonth= "Mar";
                break;
            case 4:
                returnmonth= "Apr";
                break;
            case 5:
                returnmonth= "May";
                break;
            case 6:
                returnmonth= "Jun";
                break;
                case 7:
                returnmonth= "Jul";
                break;
                case 8:
                returnmonth= "Aug";
                break;
                case 9:
                returnmonth= "Sep";
                break;
                case 10:
                returnmonth= "Oct";
                break;
                case 11:
                returnmonth= "Nov";
                break;
                case 12:
                returnmonth= "Dec";
                break;





        
            default:
                break;
        }
        return returnmonth;
    }

//#region Number of Guest  */
    const [numberofguests, setNumberOfGuestData] = useState([]);
    const [selectednumberguest, setSelectedNumberGuest] = useState("");
    const [isboatselectionopen, setIsBoatSeletionOpen] = useState(true);
    const [isbookingfetch, setIsBookingFetch] = useState(false);
    const getnumberofguest = () => {
        let countdata = [];
        for (let index = 1; index <= parseInt(25); index++) {
          countdata.push({
            value: index,
            label: index.toString()
          })
      
        }
        setNumberOfGuestData(countdata);
      }

    const handleChangeOptionNOG = e => {
        setSelectedNumberGuest(e.value);
        
      };
      
     //#endregion Number of Guest */ 

//#region Gender  */
      const [Gender, setGender] = useState([]);
      const getGender = () => {
        let countdata = [];
        let genderval = ["Male", "Female", "Other"]
        for (let index = 0; index < 3; index++) {
          countdata.push({
            value: index,
            label: genderval[index]
          })
      
        }
        setGender(countdata);
      }
       //#endregion Gender */ 

//#region Slot  */
    const [timeslot, setTimeSlot] = useState([]);
    const [selectedtimeslot, setSelectedTimeSlot] = useState("");
    
    const getslotdata = () => {
    
    dataservice("slots", { requestfor: 'getslots', data: { flag: 'a' } })
        .then(function (data) {
        if (data.resultkey == 1) {
            var tempdata=data.resultvalue;
            
        var countdata=[];
            for (let index = 0; index < tempdata.length; index++) {
            
            countdata.push({
                value: tempdata[index].id,
                label: tempdata[index].description
            })
            
            
            
            }
        
            setTimeSlot(countdata);

            
            //document.write( dt );
    
        // setSelectedBoatData(countdata);

        } else {
            //  notify(2,"No data found");
        }

        })
        .catch(function (edata) {
        notify(2, edata.toString(), 1);
        });



    }
    
    const handleChangeOptionTS = e => {
    
        setSelectedTimeSlot(e.value);
        
    };
    //#endregion Slot */ 

//#region Boat  */
    const [boatdata, setBoatdata] = useState([]);
    const [selectedboatdata, setSelectedBoatData] = useState([]);
    
    const getboatdata = () => {
        dataservice("boat", { requestfor: 'getboatcapacity', data: { flag: 'a' } })
          .then(function (data) {
            if (data.resultkey == 1) {
              var tempdata=data.resultvalue;
             
      
              var result = [];
               
              var countdata = [];
              for (let index = 0; index < tempdata.length; index++) {
                 let element = tempdata[index];
                 element.uuid=uuid();
                   var obj1={};
                   obj1={ value: element.uuid,
                    capacity:element.capacity,
                     label:`  (capacity-` + element.capacity + `)`,price:element.twowayprice};
                   countdata.push(obj1)
               }
              // setBoatdataarr(tempdata);
            //    if(countdata.length>0){
            //     setIsBoatSeletionOpen(false);
                
            //   }else{
               
            //     setIsBoatSeletionOpen(true);
            //   }
              setBoatdata(countdata);
              
              
            } else {
                notify(2,"No data found");
            }
      
          })
          .catch(function (edata) {
            notify(2, edata.toString(), 1);
          });
      
      
      
      }
    const handleChangeOptionBC=e=>{
       
        setSelectedBoatData(Array.isArray(e) ? e.map(x => x.value) : []);
      
        
      }
    //#endregion Boat  */

//#region common
     const [booking, setBooking] = useState({
      fromdate:new Date(),
      todate:new Date(),
      pax:0,
      totalcharge:0,
      hotelid:[],
      boatid:[],
      slotid:null,
      ishotelprovideboat:0,
      vehicle:[],
      touristdata:[]

  });

  const [prevBooking, setPrevBooking] = useState({
    fromdate:new Date(),
    todate:new Date(),
    pax:0,
    totalcharge:0,
    hotelid:[],
    boatid:[],
    slotid:null,
    ishotelprovideboat:0,
    vehicle:[],
    touristdata:[],
    totaldue:0,
    totalrefund:0,

});
 
  
  const searchbooking=()=>{
      setIsShowActionBtn(false);
      if(state.refenecenum==""){
        notify(2,"Enter booking refenece number");
      }else if(state.emailid==""){
        notify(2,"Enter email id");
      }else{
          dataservice("booking",{ requestfor: 'getbookingforedit' ,data:{refrencenumber:state.refenecenum,emailid:state.emailid}})
          .then(function(data) {
          if(data.resultkey==1){
            
              var result=data.resultvalue;
              if(result.length>0){
                setIsShowActionBtn(true);
                 
                  var _bookinginfo=result[0];
                  if(_bookinginfo.isnoshowrefund=="1"){
                    notify(3,"Refund under process please wait patiently !");
                    return;
                  }else{
                     console.log(result[0]);
                  setIsBookingFetch(true);    
                  setIsBoatSeletionOpen(_bookinginfo.ishotelprovideboat=="0"?false:true);
                  var pck=JSON.parse(_bookinginfo.package);
                  var boat=_bookinginfo.boatid!=""?JSON.parse(_bookinginfo.boatid):[];
                  var hotel=_bookinginfo.hotelid!=""?JSON.parse(_bookinginfo.hotelid):[];
                  var boatids=[];
                  if(boat.length>0){
                      for (let index = 0; index < boat.length; index++) {
                          const element = boat[index];
                          var isboat=boatdata.filter(x=>x.capacity==element.capacity);
                          if(isboat.length>0){
                              isboat[0].value= element.uuid;
                              boatids.push(element.uuid);
                          }
                      }
                  }
                  setBoatdata(boatdata);
                  
                 
                  var _toursitdata=_bookinginfo.tourist;
                  for (let td = 0; td < _toursitdata.length; td++) {
                    let eletd = _toursitdata[td];
                    eletd.isassigned=eletd.isassigned=="0"?false:true;
                    eletd.isbraceletavailable=eletd.isbraceletavailable=="0"?false:true;
                    eletd.isbraceletreturned=eletd.isbraceletreturned=="0"?false:true; 
                    eletd.ismaubancitizen=eletd.ismaubancitizen=="0"?false:true; 
                    eletd.isprimary=eletd.isprimary=="0"?false:true;
                    eletd.isrentbracelet=eletd.isrentbracelet=="0"?false:true; 
                    eletd.isreturningguest=eletd.isreturningguest=="0"?false:true;
                    eletd.islandhopping=eletd.islandhopping=="0"?false:true; 
                    eletd.isreturningguestvaildate=eletd.isreturningguest=="0"?false:true;;
                    eletd.deleted=false;
                    eletd.uuid=uuid();
                    eletd.hotelid=JSON.parse(eletd.hotelid);
                  } 
                  
                  var _vehicledata=[];
                  for (let vh = 0; vh < vehicledata.length; vh++) {
                    const element = vehicledata[vh];
                    var vehdata= (_bookinginfo.vehicle=="" || _bookinginfo.vehicle==undefined || _bookinginfo.vehicle==null)?[]:JSON.parse(_bookinginfo.vehicle);
                    if(vehdata.length>0){
                      var vehfilter= vehdata.filter(x=>x.id==element.id);
                      if(vehfilter.length>0){
                        element.qty=vehfilter[0].qty;
                      }
                    }
                    _vehicledata.push(element);
                    
                  }
                  
                  setBooking({
                      currentdate:new Date(_bookinginfo.currentdate),
                      fromdate:new Date(_bookinginfo.fromdate),
                      todate:new Date(_bookinginfo.todate),
                      pax:_bookinginfo.pax,
                      totalcharge:((parseFloat(_bookinginfo.totalcharge)-parseFloat(_bookinginfo.refundamt))+parseFloat(_bookinginfo.partialpayment))  ,
                      hotelid:(_bookinginfo.hotelid!=""?JSON.parse(_bookinginfo.hotelid):[]),
                      boatid:(_bookinginfo.boatid!=""?JSON.parse(_bookinginfo.boatid):[]),
                      slotid:_bookinginfo.slotid,
                      ishotelprovideboat:_bookinginfo.ishotelprovideboat=="0"?false:true,
                      vehicle:_vehicledata,
                      bookingrefencenum:_bookinginfo.hotelbookingref,
                      parkingnotreq:_bookinginfo.parkingnotreq=="0"?false:true,
                      touristdata:_toursitdata,
                      totaldue:0,
                      totalrefund:0,
                      package:(_bookinginfo.package!=""?JSON.parse(_bookinginfo.package):[]),
                      bookingid:_bookinginfo.id
                  });
                  var _prevehicledata=JSON.parse(JSON.stringify(_vehicledata));
                  var _pretoursitdata =JSON.parse(JSON.stringify(_toursitdata));
                  setPrevBooking({
                    currentdate:new Date(_bookinginfo.currentdate),
                    fromdate:new Date(_bookinginfo.fromdate),
                    todate:new Date(_bookinginfo.todate),
                    pax:_bookinginfo.pax,
                    totalcharge:((parseFloat(_bookinginfo.totalcharge)-parseFloat(_bookinginfo.refundamt))+parseFloat(_bookinginfo.partialpayment))  ,
                    hotelid:(_bookinginfo.hotelid!=""?JSON.parse(_bookinginfo.hotelid):[]),
                    boatid:(_bookinginfo.boatid!=""?JSON.parse(_bookinginfo.boatid):[]),
                    slotid:_bookinginfo.slotid,
                    ishotelprovideboat:_bookinginfo.ishotelprovideboat=="0"?false:true,
                    vehicle:_prevehicledata,
                    bookingrefencenum:_bookinginfo.hotelbookingref,
                    parkingnotreq:_bookinginfo.parkingnotreq=="0"?false:true,
                    touristdata:_pretoursitdata,
                    totaldue:0,
                    totalrefund:0,
                    package:(_bookinginfo.package!=""?JSON.parse(_bookinginfo.package):[]),
                    bookingid:_bookinginfo.id
                  });
                  // SetBookingCalValues({currentBookingvalues:{},preBookingvalues:{}});
                  setFromDate(new Date(_bookinginfo.fromdate));
                  setToDate(new Date(_bookinginfo.todate));
                  setSelectedNumberGuest(parseFloat(_bookinginfo.pax));
                  setSelectedTimeSlot(_bookinginfo.slotid);
                  setSelectedPackage(pck[0].id);
                  setSelectedBoatData(boatids);
                  setSelectedPreferredHotels(hotel[0]);
                  }
                 
                  
                  
                  
                  



                 //(booking.todate);
              
              }else{
                notify(2,"booking number does not exist");
              }
                
              // setSeteditorval({ ...editorvalue, result });
              // setSetedit({ ...edit, ["value"]: result});
              //setFeesdata({ ...feedata, ["data"]: result });
          }else{
            notify(2,"booking number does not exist");
          }
              
          })
          .catch(function(edata){
              notify(2,edata.toString(),1);
          });
      }


      
  }
  const handleEBChange = (e) => {
      const { id, value } = e.target

      if (e.target.type === 'checkbox' ) {
          setBooking({...booking, [id]: (e.target.checked==true?e.target.checked:false)});
          switch (id) {
            case "parkingnotreq":
              
              for (let index = 0; index < booking.vehicle.length; index++) {
                const element = booking.vehicle[index];
                element.qty=0;
              } 

              if(e.target.checked){
                setBooking(prevState => ({
                  ...prevState,
                  vehicle: booking.vehicle
                }));
              }
              

              break;
          
            default:
              break;
          }


      }else{
          setBooking({...booking,[id]:value});
      }


      
  }
  const handleChange = (e) => {
      const { id, value } = e.target
    
     if (e.target.type === 'checkbox' ) {
       setState({...state, [id]: (e.target.checked==true?e.target.checked:false)});
     } else {
       setState({...state, [id]: value });
     }
  }
  const [feesdata, setFeesData] = useState([]);  
  const getfees = () => {
    dataservice("fees", { requestfor: 'getfees', data: { flag: 'a' } })
      .then(function (data) {
       
        if (data.resultkey == 1) {
          //   
          var result = data.resultvalue
           
          setFeesData({ ...feesdata, data: result });
        } else {
          //  notify(2,"No data found");
        }

      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });



  }
   useEffect(()=>{
      getnumberofguest();
      getslotdata();
      getpreferredhotels();
      getPackage();
      getboatdata();
      getvehicles();
      getGender();
      getCitizenship();
      getCountry();
      getProvince();
      getMunicipalities();
      getfees();
   },[]);

   
   useEffect(()=>{
    // if(selectedboatdata.length>0){
       ReCal();
     //}
   },[selectedboatdata]);   
   useEffect(()=>{
    
    if(booking!==undefined && booking.touristdata.length>0){
        var pax=booking.touristdata.filter(x=>x.deleted==false).length;
        setSelectedNumberGuest(parseFloat(pax));
         ReCal();
    }

   },[booking]);
   const ReCal=()=>{
     //#region old cal
    //   if(booking.touristdata!==undefined && booking.touristdata.length>0){
    //   const diffTime = Math.abs(booking.todate - booking.fromdate);
    //   // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;
    //    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //    if(diffDays==0 || diffDays==1){
    //      diffDays=1;
    //    } 
    //    var environmentdata=feesdata.data.filter(x=>x.id==1);
    //    var braceletdata=feesdata.data.filter(x=>x.id==4);
    //    var islandhoppingdata=feesdata.data.filter(x=>x.id==9);
    //    var ETAFamt=0;
    //    var Braceletmt=0;
    //    var IslandHoppingAmt=0;
    //    var parking=0;
    //    var Boatamt=0;
    //    var exemptionamt=0;
    //    var discountamt=0;
    //    if(!booking.ishotelprovideboat){
    //      if(selectedboatdata.length>0){
    //       for (let bt = 0; bt < selectedboatdata.length; bt++) {
    //         let eleboat = selectedboatdata[bt];
    //         let filterboat=boatdata.filter(x=>x.value==eleboat);
    //         if(filterboat.length>0){
    //           Boatamt=+ parseFloat(filterboat[0].price);
    //         }
            
    //       }
    //      }
        
    //    }
       
    //    if(!booking.parkingnotreq){
    //     for (let vh = 0; vh < booking.vehicle.length; vh++) {
    //       parking+=((parseFloat(booking.vehicle[vh].qty)*(parseFloat(booking.vehicle[vh].amount) ))*(diffDays)); 
    //      }
    //    }
       
    //    for (let index = 0; index < booking.touristdata.length; index++) {
    //      const eletourist = booking.touristdata[index];
    //      if(!eletourist.deleted)
    //      {
          
    //       Braceletmt+=eletourist.isrentbracelet==true?(parseFloat(braceletdata.length>0?braceletdata[0].rentprice:0)):(eletourist.isbraceletavailable==true?0:parseFloat(braceletdata[0].price));
    //       IslandHoppingAmt+=eletourist.islandhopping==true?(parseFloat(islandhoppingdata.length>0?islandhoppingdata[0].price:0)):0;
    //      if(!eletourist.ismaubancitizen){
    //         ETAFamt+=parseFloat(environmentdata[0].price);
    //      }else{
    //         exemptionamt+=parseFloat(environmentdata[0].price);
    //      }
    //     }
    //    }
    //    var totalchr=(ETAFamt+Braceletmt+Boatamt+parking+IslandHoppingAmt)-(exemptionamt+discountamt);
    //    var _diffval=(totalchr-booking.totalcharge);
    //   var totaldue=(_diffval>0)==true?(_diffval):0;
    //   var totalrefund=(_diffval<0)==true?(_diffval * (-1)):0;
    //   setTotalDue(totaldue);
    //   setTotalRefund(totalrefund);










      
    //  }
     //#endregion
   
     if(booking.touristdata!==undefined && booking.touristdata.length>0){
       //pricing fees
       var environmentdata=feesdata.data.filter(x=>x.id==1);
       var braceletdata=feesdata.data.filter(x=>x.id==4);
       var islandhoppingdata=feesdata.data.filter(x=>x.id==9);
       //#region previous Charges 
       const prediffTime = Math.abs(prevBooking.todate - prevBooking.fromdate);
       let prediffDays = Math.ceil(prediffTime / (1000 * 60 * 60 * 24));
       if(prediffDays==0 || prediffDays==1){
         prediffDays=1;
       }
      
       //guest filter 
       var _prevaildguest=prevBooking.touristdata.filter(x=>x.deleted==false);
       var _premaubaninguest=_prevaildguest.filter(x=>x.ismaubancitizen==true);
       var _prenonmaubaninguest=_prevaildguest.filter(x=>x.ismaubancitizen==false);
       var _preislandhoppingguest=_prevaildguest.filter(x=>x.islandhopping==true).length;
       //bracelet filter
       var _prerentbraceletcount=_prenonmaubaninguest.filter(x=>x.isrentbracelet==true).length;
       var _preownbraceletcount=_prenonmaubaninguest.filter(x=>x.isrentbracelet==false).length;

       var preBraceletmt=(_prerentbraceletcount>0?
                           (parseFloat(_prerentbraceletcount) * parseFloat(braceletdata.length>0?braceletdata[0].rentprice:0)):0)
                           +(_preownbraceletcount>0?
                           ((_preownbraceletcount) * (braceletdata.length>0?braceletdata[0].price:0)):0);

       //environment charges
       var preETAFamt=( _prenonmaubaninguest.length>0?
                   (parseFloat(_prenonmaubaninguest.length) * parseFloat(environmentdata.length>0?parseFloat(environmentdata[0].price):0)):0);
       
       //island hopping charges
       var preIslandHoppingAmt=(_preislandhoppingguest>0?
                   (parseFloat(_preislandhoppingguest) * (islandhoppingdata.length>0?islandhoppingdata[0].price:0)):0);
      
       //boat charges
       
       var preBoatamt=0;
       if(!prevBooking.ishotelprovideboat){
          for (let bt = 0; bt < prevBooking.boatid.length; bt++) {
            let eleboat = prevBooking.boatid[bt];
            let filterboat=boatdata.filter(x=>x.value==eleboat.uuid);
            if(filterboat.length>0){
             preBoatamt+= parseFloat(filterboat[0].price);
            }
            
          }
         
       }
        //parking charges
       
       var preparking=0;
       if(!prevBooking.parkingnotreq){
         for (let vh = 0; vh < prevBooking.vehicle.length; vh++) {
           preparking+=((parseFloat(prevBooking.vehicle[vh].qty)*(parseFloat(prevBooking.vehicle[vh].amount) ))*(prediffDays)); 
          }
        }
       //exemptiona charges for Maubanin
       var preexemptionamt=0;
       //senior citizen discount for Maubanin
       var prediscountamt=0;

       var preTotalAmt=(preETAFamt+preBraceletmt+preBoatamt+preparking+preIslandHoppingAmt)-(preexemptionamt+prediscountamt);
       //#endregion previous Charges
       
       //#region Current Charges
         // number of day guest stay
         const diffTime = Math.abs(booking.todate - booking.fromdate);
         let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
         if(diffDays==0 || diffDays==1){
           diffDays=1;
         } 

        
         //guest filter 
         var _vaildguest=booking.touristdata.filter(x=>x.deleted==false);
         var _maubaninguest=_vaildguest.filter(x=>x.ismaubancitizen==true);
         var _nonmaubaninguest=_vaildguest.filter(x=>x.ismaubancitizen==false);
         var _islandhoppingguest=_vaildguest.filter(x=>x.islandhopping==true).length;
           ;
         //bracelet filter
         var _rentbraceletcount=_nonmaubaninguest.filter(x=>x.isrentbracelet==true).length;
         var _ownbraceletcount=_nonmaubaninguest.filter(x=>x.isrentbracelet==false).length;

         var Braceletmt=(_rentbraceletcount>0?
                             (parseFloat(_rentbraceletcount) * parseFloat(braceletdata.length>0?braceletdata[0].rentprice:0)):0)
                             +(_ownbraceletcount>0?
                             ((_ownbraceletcount) * (braceletdata.length>0?braceletdata[0].price:0)):0);

         //environment charges
         var ETAFamt=( _nonmaubaninguest.length>0?
                     (parseFloat(_nonmaubaninguest.length) * parseFloat(environmentdata.length>0?parseFloat(environmentdata[0].price):0)):0);
         
         //island hopping charges
         var IslandHoppingAmt=(_islandhoppingguest>0?
                     (parseFloat(_islandhoppingguest) * (islandhoppingdata.length>0?islandhoppingdata[0].price:0)):0);
        
         //boat charges
         var Boatamt=0;
         if(!booking.ishotelprovideboat){
           if(selectedboatdata.length>0){
            for (let bt = 0; bt < selectedboatdata.length; bt++) {
              let eleboat = selectedboatdata[bt];
              let filterboat=boatdata.filter(x=>x.value==eleboat);
              if(filterboat.length>0){
                Boatamt+= parseFloat(filterboat[0].price);
              }
              
            }
           }
         }
          //parking charges
         var parking=0;
         if(!booking.parkingnotreq){
           for (let vh = 0; vh < booking.vehicle.length; vh++) {
             parking+=((parseFloat(booking.vehicle[vh].qty)*(parseFloat(booking.vehicle[vh].amount) ))*(diffDays)); 
            }
          }
         //exemptiona charges for Maubanin
         var exemptionamt=0;
         //senior citizen discount for Maubanin
         var discountamt=0;
         var TotalAmt=(ETAFamt+Braceletmt+Boatamt+parking+IslandHoppingAmt)-(exemptionamt+discountamt);
       //#endregion Current Charges
        
       SetBookingCalValues({preBookingvalues:{
        ETAF:preETAFamt,
        Bracelet:preBraceletmt,
        Boat:preBoatamt,
        Package:preparking,
        IslandHopping:preIslandHoppingAmt,
        Parking:preparking,
        Discount: prediscountamt,
        Exemption:preexemptionamt,
        Total:preTotalAmt,
        TotalAmountDue:0,
        TotalRefund:0,
  
    },currentBookingvalues:{
      ETAF:ETAFamt,
      Bracelet:Braceletmt,
      Boat:Boatamt,
      Package:parking,
      IslandHopping:IslandHoppingAmt,
      Parking:parking,
      Discount: discountamt,
      Exemption:exemptionamt,
      Total:TotalAmt,
      TotalAmountDue:((TotalAmt-preTotalAmt)>0?((TotalAmt-preTotalAmt)):0),
      TotalRefund:((TotalAmt-preTotalAmt)<=0?((TotalAmt-preTotalAmt) * (-1)):0),
  }});
      


    }


   
  }

   const handleChangeHPB=e=>{
      if(e.target.checked){
          //booking.ishotelprovideboat=true;
          setBooking({...booking, ["ishotelprovideboat"]: true});
          setSelectedBoatData([]);
        }else{
         // booking.ishotelprovideboat=false;
          setBooking({...booking, ["ishotelprovideboat"]: false});

        }
    }

  const getdropdownarr=(result)=>{
      let countdata = [];
      //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
      for (let index = 0; index < result.length; index++) {
        let item = result[index];
        countdata.push({ value: item.id, label: item.description })
      
      }
      return countdata;
    }
//#endregion 
    
//#region hotel */
      const [preferredhotels, setPreferredHotels] = useState([]);
      const [selectedpreferredhotels, setSelectedPreferredHotels] = useState([]);
      const [hotelbookingref, setHotelBookingRef] = useState([]);

      const handleChangeOptionPH=e=>{
        var Ph = preferredhotels.filter(obj => obj.value === e.value);
        setSelectedPreferredHotels(Ph);
      // setLocalTravelInfoData({...localtravelinfodata, ["hotel"]:Ph});
      }

const getpreferredhotels = () => {
 
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
//#endregion hotel  */

//#region Package  */
const [packagedata, setPackagedata] = useState([]);
const [packageddl, setPackageddl] = useState([]);
const [selectedPackage, setSelectedPackage] = useState("");

const getPackage = () => {
  dataservice("package", { requestfor: 'getpackage', data: { flag: 'a' } })
    .then(function (data) {
      if (data.resultkey == 1) {
        var result = data.resultvalue;
        var countdata = [];
        var pckddl = [];
        for (let index = 0; index < result.length; index++) {
          // 
          var d = result[index];
          pckddl.push({
            value: d.id,
            label: d.description
          })
          if (d.isactive == "1") {
            if(d.id==1){
               
              var packdetail = d.description 
              countdata.push({
                id: d.id,
                label: packdetail,
                checked: true,
                price: d.price
              });
            }else{
              var packdetail = d.description 
              countdata.push({
                id: d.id,
                label: packdetail,
                checked: false,
                price: d.price
              });
            }
            
          }

        }
        setPackagedata(countdata);
        
        setPackageddl(pckddl);
        
      } else {
      
      }

    })
    .catch(function (edata) {
      notify(2, edata.toString(), 1);
    });

}
//#endregion Package  */

//#region vehicle */
const [vehicledata, setVehicledata] = useState([]);
const handleChangevehicleqty = index => e => {
       console.log('index: ' + index);
       console.log('property name: '+ e.target.value);
       let newArr = [...booking.vehicle]; // copying the old datas array
       newArr[index].qty = isNaN(parseFloat(e.target.value))==false? parseFloat(e.target.value):0; // replace e.target.value with whatever you want to change it to
        //setBooking(...booking,["vehicle"],newArr);

        setBooking(prevState => ({
          ...prevState,
          vehicle: newArr
        }));


        // ??
    //   recaltotal();
}




const getvehicles = () => {
    // 
    dataservice("vehicle", { requestfor: 'getvehicle', data: { flag: 'a' } })
      .then(function (data) {
        if (data.resultkey == 1) {
          var result = data.resultvalue;
          for (let index = 0; index < result.length; index++) {
              let element = result[index];
              element.qty=0;
          }
          setVehicledata(result);
        } else {
          //  notify(2,"No data found");
        }
      })
      .catch(function (edata) {
        notify(2, edata.toString(), 1);
      });
  
  
  
  }
//#endregion vehicle     
const test=()=>{
    
}
//#region editbooking tourist  */
 const [edittouristpopup, setEditTouristpopup] = useState("");
 const [edittourist, setEditTourist] = useState([]);
 const [returnguestmsg, setReturnGuestMsg] = useState("");
 const [selectedtouristdob, setSelectedTouristDOB] = useState(new Date);
 const [selectedtouristgender, setSelectedTouristGender] = useState();
 const [deletetouristpopup, setDeletetouristpopup] = useState(false);
 
 const [isconfirmbooking, setIsConfirmBooking] = useState(false);
 const [isShowActionBtn, setIsShowActionBtn] = useState(false);
 
 const handleEBTChange = (e) => {
   const { id, value } = e.target

   if (e.target.type === 'checkbox' ) {
     setEditTourist({...edittourist, [id]: (e.target.checked==true?e.target.checked:false)});
     if(e.target.checked){
      switch (id) {
        case "isreturningguest":
           
          edittourist.isreturningguestvaildate=false;
          edittourist.emailid="";
          edittourist.Address="";
          edittourist.Mobilenumber="";
          setReturnGuestMsg("Please vaildate guest!");
          break;
      
        default:
          break;
      }
     }else{
      switch (id) {
        case "isreturningguest":
           
          edittourist.isreturningguestvaildate=false;
          edittourist.emailid="";
          edittourist.Address="";
          edittourist.Mobilenumber="";
          setReturnGuestMsg("");
          break;
      
        default:
          break;
      }
     }
     
   }else{
     setEditTourist({...edittourist,[id]:value});
   }


   
}

const handleChangeEBTGender=e=>{
  edittourist.gender=e.value;
 
  setSelectedTouristGender(e.value);
}

const editdata=(row, e) =>{
  

  var fromdate=new Date(moment(new Date(booking.fromdate)).format("DD MMM YYYY"));
  var curdate=new Date(moment(new Date(booking.currentdate)).format("DD MMM YYYY"));
  if(curdate>fromdate){
    notify(2, "Can't edit past date travel itinerary !. ");
    return;
  }

  
  if(row==-1){
    e={
      actualimagename: "",
      address1: "",
      citizenid: "1",
      deleted: false,
      dob: moment(new Date()).format("YYYY-MM-DD"),
      emailid: "",
      firstname: "",
      gender: "",
      hotelid: [],
      isassigned: false,
      isbraceletavailable: false,
      isbraceletreturned: false,
      ismaubancitizen: false,
      isprimary: false,
      isrentbracelet: false,
      isreturningguest: false,
      isreturningguestvaildate: false,
      isalreadyvaildatereturningguest:false,
      lastname: "",
      mobilenumber: "",
      municipalityid: "1968",
      nationalityid: "2",
      provinceid: "81",
      qrcode: null,
      rfid: null,
      touristid: "",
      uploadimage: "",
      uuid:uuid(),
    }

  }
  

  
  setEditTouristpopup(!edittouristpopup);
  setEditTourist(e);
  setSelectedTouristDOB(new Date(e.dob));
  setSelectedTouristGender(parseFloat(e.gender));
  setSelectedTouristCS(e.citizenid);
  setSelectedEBTCOO(e.nationalityid);
  var municipalitydata=  RawMunicipality.filter(x=>x.provinceid==e.provinceid);
  var _ddpmunicipalitydata=getdropdownarr(municipalitydata);
  setMunicipality(_ddpmunicipalitydata);
  setSelectedEBTProvince(e.provinceid);
  setSelectedMunicipality(e.municipalityid);
}

const opendeletetouristpopup =(row, e) =>{
  var fromdate=new Date(moment(new Date(booking.fromdate)).format("DD MMM YYYY"));
  var curdate=new Date(moment(new Date(booking.currentdate)).format("DD MMM YYYY"));
  if(curdate>fromdate){
    notify(2, "Can't edit past date travel itinerary !. ");
    return;
  }
  setEditTourist(e);
  setDeletetouristpopup(!deletetouristpopup);
}
const deletetourist= ()=>{
   
  const newdata = booking["touristdata"].map((item) => {
    if (item.uuid ===edittourist.uuid) {
      const updatedItem = {
        ...item,
        actualimagename: edittourist.actualimagename,
        address1: edittourist.address1,
        citizenid:  edittourist.citizenid,
        dob: edittourist.dob,
        emailid: edittourist.emailid,
        firstname: edittourist.firstname,
        gender: edittourist.gender,
        hotelid: edittourist.hotelid,
        isassigned: edittourist.isassigned,
        isbraceletavailable: edittourist.isbraceletavailable,
        isbraceletreturned: edittourist.isbraceletreturned,
        ismaubancitizen:  edittourist.ismaubancitizen,
        isprimary: edittourist.isprimary,
        isrentbracelet:  edittourist.isrentbracelet,
        isreturningguest:  edittourist.isreturningguest,
        isreturningguestvaildate: edittourist.isreturningguestvaildate,
        lastname: edittourist.lastname,
        mobilenumber: edittourist.mobilenumber,
        municipalityid: edittourist.municipalityid,
        nationalityid: edittourist.nationalityid,
        provinceid: edittourist.provinceid,
        qrcode: edittourist.qrcode,
        rfid: edittourist.rfid,
        touristid: edittourist.touristid,
        uploadimage:edittourist.uploadimage,
        deleted:true
      };

      return updatedItem;
    }

    return item;
  });
   
  setBooking({...booking, ["touristdata"]: newdata});
  setDeletetouristpopup(!deletetouristpopup);
}
 //#endregion editbooking tourist  */

//#region Citizen
const [citizenship, setCitizenship] = useState([]);
const [selectedTouristCS,setSelectedTouristCS] = useState([]);
const getCitizenship = () => {
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
 
const handleChangeEBTCS=e=>{
  setSelectedTouristCS(e.value);
}

//#endregion Citizen

//#region Country Of orgin

const [country, setCountry] = useState([]);
const [selectedEBTCOO, setSelectedEBTCOO] = useState([]);
const getCountry = () => {
 
  dataservice("country", { requestfor: 'getcountry', data: { flag: 'a' } })
    .then(function (data) {
      if (data.resultkey == 1) {
        var result = data.resultvalue;
        let countdata = [];
        //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
       // countdata.push({ value: "-1", label: "Select Country" })
        for (let index = 0; index < result.length; index++) {
          //   
          let item = result[index];
          countdata.push({ value: item.id, label: item.description })
         
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
const handleChangeEBTCOO = e=> {
  setSelectedEBTCOO(e.value);
}

//#endregion

//#region Province

const [Province, setProvince] = useState([]);
const [RawProvince, setRawProvince] = useState([]);
const [selectedEBTProvince, setSelectedEBTProvince] = useState([]);
const getProvince = () => {
  dataservice("province", { requestfor: 'getprovince', data: { flag: 'a' } })
  .then(function (data) {
    if (data.resultkey == 1) {
      var result = data.resultvalue;
     
      setRawProvince(result);
      var provincedata=getdropdownarr(result);
      setProvince(provincedata);
    } else {
      //  notify(2,"No data found");
    }
  })
  .catch(function (edata) {
    notify(2, edata.toString(), 1);
  });

}

const handleChangeEBTProvince = e=> {
  
  setSelectedEBTProvince(e.value);
  var municipalitydata=  RawMunicipality.filter(x=>x.provinceid==e.value);
  var _ddpmunicipalitydata=getdropdownarr(municipalitydata);
  setSelectedMunicipality(_ddpmunicipalitydata[0].value);
  setMunicipality(_ddpmunicipalitydata);

  
}

//#endregion
//#region Municipality
const [Municipality, setMunicipality] = useState([]);
const [RawMunicipality, setRawMunicipality] = useState([]);
const [selectedMunicipality, setSelectedMunicipality] = useState([]);
const getMunicipalities = () => {

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
  const handleChangeEBTMunicipality = e=> {
    setSelectedMunicipality(e.value);
  }
  
  
//#endregion





const [isprocessing,setIsProcessing]=useState(false);
const [isvaildatereturnprocessing,setIsVaildatereturnProcessing]=useState(false);
const [bookingcalvalues,SetBookingCalValues]=useState([]);
const vaildateguest=()=>{
  setIsVaildatereturnProcessing(true);
 
  if(edittourist.firstname==""){
    notify(2,"Please enter first name!");
    return;

  }else if(edittourist.lastname==""){
    notify(2,"Please enter last name!");
    return;
  }else{
    dataservice("returnguest", { requestfor: 'vaildatereturnguest', data: { 
      firstname:edittourist.firstname,
      lastname:edittourist.lastname,
      dob:moment(edittourist.selectedtouristdob).format("YYYY-MM-DD"),
      gender:selectedtouristgender,
    } })
      .then(function (data) {
       
        setIsVaildatereturnProcessing(false);
         
        if (data.resultkey == 1) {
          var result=data.resultvalue[0];
          if(result.lastvisited==0){
             
          edittourist.isreturningguestvaildate=true;
          edittourist.emailid=result.emailid;
          edittourist.address1=result.address1;
          edittourist.mobilenumber=result.mobilenumber;
           
          setSelectedTouristCS(result.citizenid);
          setSelectedEBTCOO(result.nationalityid);
        
          //localtravelinfodata["guestinfo"][guestactivepostion].Municipality=result.ismaubancitizen;
          
          // guestarr.isguestvaildated=true;
          // guestarr.emailid=result.emailid;
          // guestarr.Address=result.address1;
          // guestarr.Mobilenumber=result.mobilenumber;
          
         // guestarr.Municipality=result.municipalityid;
//           address1: "asdasd"
// citizenid: "1"
// emailid: "anant@gmail.com"
// ismaubancitizen: "0"
// mobilenumber: "99999999"
// municipalityid: "1"
// nationalityid: "2"
// provinceid: "10"
          setReturnGuestMsg("");
        //  recaltotal();
          }
          
        } else {
         // localtravelinfodata["guestinfo"][guestactivepostion].isguestvaildated=false;
         edittourist.isreturningguestvaildate=false; 
         setReturnGuestMsg("Sorry guest info doesn't exist.");
        }
      })
      .catch(function (edata) {
        setIsVaildatereturnProcessing(false);
        notify(2, edata.toString(), 1);
      });
  }
  
}

const updatetourist=()=>{
var _guestexist=booking.touristdata.filter(x=>x.uuid==edittourist.uuid);
if(_guestexist.length>0){
  const newdata = booking["touristdata"].map((item) => {
    if (item.touristid ===edittourist.touristid) {
      const updatedItem = {
        ...item,
        actualimagename: edittourist.actualimagename,
        address1: edittourist.address1,
        citizenid:  selectedTouristCS,
        dob: edittourist.dob,
        emailid: edittourist.emailid,
        firstname: edittourist.firstname,
        gender: selectedtouristgender,
        hotelid: edittourist.hotelid,
        isassigned: edittourist.isassigned,
        isbraceletavailable: edittourist.isbraceletavailable,
        isbraceletreturned: edittourist.isbraceletreturned,
        ismaubancitizen:  edittourist.ismaubancitizen,
        isprimary: edittourist.isprimary,
        isrentbracelet:  edittourist.isrentbracelet,
        isreturningguest:  edittourist.isreturningguest,
        isreturningguestvaildate: edittourist.isreturningguestvaildate,
        lastname: edittourist.lastname,
        mobilenumber: edittourist.mobilenumber,
        municipalityid: selectedMunicipality,
        nationalityid: selectedEBTCOO,
        provinceid: selectedEBTProvince,
        qrcode: edittourist.qrcode,
        rfid: edittourist.rfid,
        touristid: edittourist.touristid,
        uploadimage:edittourist.uploadimage
      };

      return updatedItem;
    }

    return item;
  });
  
  setBooking({...booking, ["touristdata"]: newdata});
}else{
  setBooking(prevState => ({
    ...prevState,
    touristdata: [...booking.touristdata,edittourist]
  }));
}

  
  setEditTouristpopup(!edittouristpopup);



}
const Savedata=()=>{

  if(totaldue>=0 && totalrefund==0){
  //payment
  const diffTime = Math.abs(new Date(booking.todate) - new Date(booking.fromdate));
   // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if(diffDays==0 || diffDays==1){
        diffDays=1;
      }
      var boatinfo=[];
      var Boatamt=0;
      if(!booking.ishotelprovideboat){
        if(selectedboatdata.length>0){
         for (let bt = 0; bt < selectedboatdata.length; bt++) {
           let eleboat = selectedboatdata[bt];
           let filterboat=boatdata.filter(x=>x.value==eleboat);
           if(filterboat.length>0){
             Boatamt=+ parseFloat(filterboat[0].price);
             boatinfo.push(filterboat[0]);
           }
           
         }
        }
       
      }
      let val = Math.floor(1000 + Math.random() * 9000);
      var submitdata = {
        fromdate: moment(booking.fromdate).format("YYYY-MM-DD"),
        todate: moment(booking.todate).format("YYYY-MM-DD"),
        numberofdays: diffDays,
        totalcharge: booking.totalcharge,
        pax: booking.touristdata.filter(x=>x.deleted==false).length,
        boatcapcity: boatinfo,
        preferredhotels:preferredhotels.filter(x=>x.value==selectedpreferredhotels.value ) ,
        paymentid: val,
        selectedvehicleinfo: [],
        touristinfo: booking.touristdata.filter(x=>x.deleted==false),
        chargesinfo: [],
        numberofvehicle: booking.vehicle.filter(x=>x.qty>0).length,
        touristvehicles:booking.vehicle.filter(x=>x.qty>0) ,
        packagedata:booking.package,
        slotid:selectedtimeslot,
        ishotelprovideboat:booking.ishotelprovideboat==true?"1":"0",
        slotdetail:timeslot.filter(x=>x.value==selectedtimeslot),
        parkingnotreq: booking.parkingnotreq==true?"1":"0",
        hotelbookingref:booking.bookingrefencenum,
        packageinfo:{},
        totalpaydue:totaldue,
        paymentreferencenumber:"",
        editrefnum:"",
        bookingid:booking.bookingid,
        hotelid:preferredhotels.filter(x=>x.value==selectedpreferredhotels.value ),
        boatid:boatinfo
        
      }
    if(totaldue>0){
      
      dataservice("booking", {
        requestfor: 'checkavailability',
        data: {"fromdate": moment(new Date(booking.fromdate)).format("YYYY-MM-DD"),"touristcount":booking.touristdata.length}
      })
      .then(function (checkdata) {
        if (checkdata.resultkey == 1) {
          if(checkdata.resultvalue[0].isSlotAvialble>0){
            dataservice("booking", {
              requestfor: 'updatenewbooking',
              data: submitdata
            })
            .then(function (data) {
              
              if (data.resultkey == 1) {
             
                var result = data.resultvalue;
                var responseurl= JSON.parse(data.resultvalue.url).results.data.url;
                if(responseurl!="" && responseurl!==undefined){
                  window.location.href=responseurl;
                }else{
                  notify(2,"No response from payment gateway try again!");
                  setIsProcessing(false);
                }
                
              } else {
                notify(2,"error!");
                setIsProcessing(false);
              }
            })
            .catch(function (error) {
              notify(2,"error!"+error);
              setIsProcessing(false);
            });
          }else{
            notify(2,"no slot available for this date!");
            setIsProcessing(false);
          }
          
        } else {
          notify(2,"error !"+ JSON.stringify(checkdata.resultvalue));
          setIsProcessing(false);
        }
      })
      .catch(function (error) {
        notify(2,"error !"+ error);
        setIsProcessing(false);
       // console.log(error);
      });
    }else{
      dataservice("booking", {
        requestfor: 'checkavailability',
        data: {"fromdate": moment(new Date(booking.fromdate)).format("YYYY-MM-DD"),"touristcount":booking.touristdata.length}
      })
      .then(function (checkdata) {
        if (checkdata.resultkey == 1) {
          if(checkdata.resultvalue[0].isSlotAvialble>0){
            dataservice("booking", {
              requestfor: 'updatenewbooking',
              data: submitdata
            })
            .then(function (data) {
              
              if (data.resultkey == 1) {
                notify(1,"Booking updated successfully!");
                
                setTimeout(function(){ 
                  window.location.reload()
                  
                 }, 3000);
              } else {
                notify(2,"error!");
                setIsProcessing(false);
              }
            })
            .catch(function (error) {
              notify(2,"error!"+error);
              setIsProcessing(false);
            });
          }else{
            notify(2,"no slot available for this date!");
            setIsProcessing(false);
          }
          
        } else {
          notify(2,"error !"+ JSON.stringify(checkdata.resultvalue));
          setIsProcessing(false);
        }
      })
      .catch(function (error) {
        notify(2,"error !"+ error);
        setIsProcessing(false);
       // console.log(error);
      });
    }



  }else{
//refund or cancel
  if(booking.touristdata!==undefined && booking.touristdata.length>0){
  const diffTime = Math.abs(booking.todate - booking.fromdate);
  // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;
   let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
   if(diffDays==0 || diffDays==1){
     diffDays=1;
   } 
   var environmentdata=feesdata.data.filter(x=>x.id==1);
   var braceletdata=feesdata.data.filter(x=>x.id==4);
   var ETAFamt=0;
   var Braceletmt=0;
   var parking=0;
   var Boatamt=0;
   var boatinfo=[];
   var exemptionamt=0;
   var discountamt=0;
   if(!booking.ishotelprovideboat){
     if(selectedboatdata.length>0){
      for (let bt = 0; bt < selectedboatdata.length; bt++) {
        let eleboat = selectedboatdata[bt];
        let filterboat=boatdata.filter(x=>x.value==eleboat);
        if(filterboat.length>0){
          Boatamt=+ parseFloat(filterboat[0].price);
          boatinfo.push(filterboat[0]);
        }
        
      }
     }
    
   }
   
   if(!booking.parkingnotreq){
    for (let vh = 0; vh < booking.vehicle.length; vh++) {
      parking+=((parseFloat(booking.vehicle[vh].qty)*(parseFloat(booking.vehicle[vh].amount) ))*(diffDays)); 
     }
   }
   
   for (let index = 0; index < booking.touristdata.length; index++) {
     const eletourist = booking.touristdata[index];
     if(!eletourist.deleted)
     {
       Braceletmt+=eletourist.isrentbracelet==true?(parseFloat(braceletdata[0].rentprice)):(eletourist.isbraceletavailable==true?0:parseFloat(braceletdata[0].price));
     
     if(!eletourist.ismaubancitizen){
        ETAFamt+=parseFloat(environmentdata[0].price);
     }else{
        exemptionamt+=parseFloat(environmentdata[0].price);
     }
    }
   }
   var _booking =JSON.stringify(booking);
   var _bookingobj=JSON.parse(_booking);
   _bookingobj.touristdata=_bookingobj.touristdata.filter(x=>x.deleted==true);
   _bookingobj.vehicle=_bookingobj.vehicle.filter(x=>x.qty>0);
   
   var refundvalues={
    Refundamt:isRefundNoShow==1?booking.totalcharge:totalrefund,
    Totalamt:isRefundNoShow==1?0:(booking.totalcharge-totalrefund),
    ETAF:ETAFamt,
    Bracelet:Braceletmt,
    Package:booking.package,
    Boat:boatinfo,
    NOG:selectednumberguest,
    Parking:parking,
    Discount:discountamt,
    Exemption:exemptionamt,
    Bookinginfo:_bookingobj,
    Vehicle:booking.vehicle.filter(x=>x.qty>0),
    Guestinfo:booking.touristdata.filter(x=>x.deleted==false)
   }
   var submitdata = {
    refunddata:refundvalues,
    bookingid:booking.bookingid,
    totalcharge: booking.totalcharge,
    parkingnotreq: booking.parkingnotreq==true?"1":"0",
    hotelbookingref:booking.bookingrefencenum,
    ishotelprovideboat:booking.ishotelprovideboat==true?"1":"0",
    isnoshowrefund:isRefundNoShow,
    fromdate: moment(booking.fromdate).format("YYYY-MM-DD"),
    todate: moment(booking.todate).format("YYYY-MM-DD"),
    slotid:selectedtimeslot,
    boatid:boatinfo,
    hotelid: preferredhotels.filter(x=>x.value==selectedpreferredhotels.value ) ,
    numberofdays: diffDays,
    pax: booking.touristdata.filter(x=>x.deleted==false).length,
    touristinfo: booking.touristdata.filter(x=>x.deleted==false),
    numberofvehicle: booking.vehicle.filter(x=>x.qty>0).length,
    
    }
    dataservice("booking", {
      requestfor: 'checkavailability',
      data: {"fromdate": moment(new Date(booking.fromdate)).format("YYYY-MM-DD"),"touristcount":booking.touristdata.length}
    })
    .then(function (checkdata) {
      
      if (checkdata.resultkey == 1) {
        if(checkdata.resultvalue[0].isSlotAvialble>0){
          dataservice("booking", {
            requestfor: 'refundpayment',
            data: submitdata
          })
          .then(function (data) {
            
            if (data.resultkey == 1) {
               
              var result = data.resultvalue;
              notify(1,"Application for refund is submited successsfully.  We will connect you soon.");
              window.location.reload();
              // you have PHP 370 for refund ,please wait for a call from one of our representative. 
              // var responseurl= JSON.parse(data.resultvalue.url).results.data.url;
              // if(responseurl!="" && responseurl!==undefined){
              //   window.location.href=responseurl;
              // }else{
              //   notify(2,"No response from payment gateway try again!");
              //   setIsProcessing(false);
              // }
              
            } else {
              notify(2,"error!");
              setIsProcessing(false);
            }
          })
          .catch(function (error) {
            notify(2,"error!"+error);
            setIsProcessing(false);
          });
        }else{
          notify(2,"no slot available for this date!");
          setIsProcessing(false);
        }
        
      } else {
        notify(2,"error !"+ JSON.stringify(checkdata.resultvalue));
        setIsProcessing(false);
      }
    })
    .catch(function (error) {
      notify(2,"error !"+ error);
      setIsProcessing(false);
     // console.log(error);
    });



  }





  }
  
}

const [isRefundNoShow, setIsRefundNoShow] = useState(0);
const refundpaymentinfo=(data)=>{
  if(booking.touristdata.length>0){
    setIsRefundNoShow(data);
    setIsConfirmBooking(!isconfirmbooking);
  }else{
    notify(2, "No booking data to update,Please search again!");
    return;
  }
}

const refundpayment=()=>{
  const diffTime = Math.abs(booking.todate - booking.fromdate);
      // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;
       let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
       if(diffDays==0 || diffDays==1){
         diffDays=1;
       } 
       var boatinfo=[];
       for (let index = 0; index < selectedboatdata.length; index++) {
         const element = selectedboatdata[index];
         var _filterboat=boatdata.filter(x=>x)
       }
}

const getTimeSlot=(data)=>{
  
  if(selectedtimeslot==""){
    return ""
  }else{
    return timeslot.filter(x=>x.value==selectedtimeslot)[0].label; 
  }
  
}

const getBoats=()=>{
  var boatlables="";
  for (let index = 0; index < selectedboatdata.length; index++) {
    const element = selectedboatdata[index];
    var filterboat =boatdata.filter(x=>x.value==element);
    if(filterboat.length>0){
      boatlables+=filterboat[0].label+",";
    }
  }
  if(boatlables!=""){
    boatlables=boatlables.substring(0,boatlables.length-1);
  }
  return boatlables;
}
const getHideShowUpdate=()=>{
  var result="none";
  var fromdate=new Date(moment(new Date(booking.fromdate)).format("DD MMM YYYY"));
  var curdate=new Date(moment(new Date(booking.currentdate)).format("DD MMM YYYY"));
  if(curdate<fromdate){
    if(totaldue>0){
      result="";
    }
    
  }
  return result;
}
const getHideShowNoShow=()=>{
  var result="none";
  var fromdate=new Date(moment(new Date(booking.fromdate)).format("DD MMM YYYY"));
  var curdate=new Date(moment(new Date(booking.currentdate)).format("DD MMM YYYY"));
  if(curdate>fromdate){
    result="";
  }
  return result;
}

const cleardata=()=>{
  window.location.reload();
}


    return (<>
     

     <div className="c-app c-default-layout flex-row align-items-center bg" style={{  background: `url(${Background})`,backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center',
    backgroundSize: 'cover'}}  >
         <CContainer  >
          
            <Card style={{minHeight:"300px"}} >
                <Card.Body>
                    <div className="row">
                     
                    <CCol md="12">
                        <>
                       
                        <CForm>
                           {/* <div>{new Date(booking.currentdate).toLocaleDateString()} {new Date(booking.fromdate).toLocaleDateString()}</div> */}
                            <CRow >
                             
                            <CCol xs="3" className="text-right">
                                <CInputGroup className="mb-3">
                                <CInputGroupPrepend>
                                    <CInputGroupText>
                                    Refrence #<sup style={{ color: "red" }}>*</sup>
                                    </CInputGroupText>
                                </CInputGroupPrepend>
                                <CInput  type="text" onChange={handleChange} type="text" value={state.refenecenum} id="refenecenum" placeholder="Enter Refrence Number" />
                                </CInputGroup>
                            </CCol>
                            <CCol xs="4">
                                <CInputGroup className="mb-3">
                                <CInputGroupPrepend>
                                    <CInputGroupText>
                                    Primary Email<sup style={{ color: "red" }}>*</sup>
                                    </CInputGroupText>
                                </CInputGroupPrepend>
                                <CInput  type="text" onChange={handleChange} type="email" value={state.emailid} id="emailid"  placeholder="Enter Email ID" />
                                </CInputGroup>
                            </CCol>
                            <CCol xs="5">
                                <div className="row">
                                    <div className="col-12">
                                    <CButton color="primary"  onClick={() => {searchbooking()}}>Search </CButton> &nbsp;&nbsp;
                                    <CButton color="primary" hidden={booking.touristdata.length>0?false:true} disabled={(new Date(moment(new Date(booking.currentdate)).format("DD MMM YYYY")))>new Date(moment(new Date(booking.fromdate)).format("DD MMM YYYY"))}
                                       onClick={() => {refundpaymentinfo()}}>Update</CButton>&nbsp;&nbsp;
                                  
                                  <CButton color="primary" hidden={booking.touristdata.length>0?false:true} onClick={() => {cleardata()}}>Cancel</CButton> 
                                  
                                    </div>
                                    
                                  {/*  <div className="col-8" >
                                    
                                 <CButton color="primary" style={{display:(totalrefund>0)==true?"":"none"}}  onClick={() => {refundpaymentinfo(0)}}>Refund</CButton>&nbsp;&nbsp; 
                                 <CButton color="primary"  style={{display:getHideShowNoShow()}}   onClick={() => {refundpaymentinfo(1)}}>No Show</CButton> &nbsp;&nbsp;
                                    </div>*/}
                                </div>
                                
                                
                            </CCol>
                            
                            </CRow>
                   
                        </CForm>
                        <div  style={{display:isbookingfetch==false?"none":""}}>
                       
                        <div id="accordion"> 
                            <CCard className="mb-0">
                                <CCardHeader id="headingOne">
                                {(() => {
                                  const rows = [];
                                 // if(bookingcalvalues.currentBookingvalues.Boat!==undefined){
                                    if(bookingcalvalues.currentBookingvalues!==undefined){
                                        ;
                                      console.log(bookingcalvalues.currentBookingvalues);
                                   



                                    rows.push(<> 
                                            <div className="row">
                                              <div className="col-sm-3"> 
                                                  <h4>Total : PHP {bookingcalvalues.currentBookingvalues.Total}</h4>
                                              </div>
                                              <div className="col-sm-5">
                                                  <h4><CIcon name={(bookingcalvalues.currentBookingvalues.TotalAmountDue>0?"cil-arrow-top":"")} 
                                                  className="mfe-2" 
                                                  style={ booking.totaldue>0?{color:"green"}:{}} />Total Amount Due : PHP {bookingcalvalues.currentBookingvalues.TotalAmountDue} </h4>
                                              </div>
                                              <div className="col-sm-4">
                                                  <h4>Total Refund : PHP {bookingcalvalues.currentBookingvalues.TotalRefund} </h4>
                                              </div>
                                          </div> 
                                        </>);
                                      
                                      return rows;
                                    }
                                 // }
                     

                                })()}
                                    
                                {/* */}
                                <CButton 
                                    block 
                                    color="link" 
                                    className="text-left m-0 p-0" 
                                    onClick={() => setAccordion(accordion === 0 ? null : 0)}
                                >
                                    <h5 className="m-0 p-0">Booking Info</h5>
                                </CButton>
                                </CCardHeader>
                                <CCollapse show={accordion === 0}>
                                <CCardBody>
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label >From Date </label>
                                            <DatePicker dateFormat="dd-MMM-yyyy"  minDate={new Date()} className="form-control"  selected={new Date(booking.fromdate)}  onChange={(date)=>{
                                                 // if(date>booking.todate){
                                                   // setBooking({...booking, ["fromDate"]:date,["todate"]:date });
                                                    setBooking(prevState => ({
                                                      ...prevState,
                                                      fromdate: date,
                                                      todate:date
                                                    }));
                                                    console.log(booking);
                                                  // }else{
                                                  //   setBooking({...booking, ["fromDate"]:date });
                                                  // }
                                                  
                                                   
                                            }} />
                                    
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label >TO Date </label>
                                            <DatePicker dateFormat="dd-MMM-yyyy"  minDate={new Date(booking.fromdate)} className="form-control" selected={new Date(booking.todate)} onChange={(date) =>{
                                                                          //  setToDate(date);
                                                                          setBooking({...booking, ["todate"]:date });
                                                                            
                                            } } />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label >Number Of Guests </label>
                                            <Select
                                            isDisabled={true}
                                            className="dropdown"
                                            placeholder="Select"
                                            value={numberofguests.find(obj => obj.value === selectednumberguest)} // set selected values
                                            options={numberofguests} // set list of the data
                                            onChange={handleChangeOptionNOG} // assign onChange function
                                            />
                                        </div>
                                        <div className="form-group col-md-3">
                                                 <label >Time of Arrival in Mauban</label>
                                                <Select
                                                className="dropdown"
                                                placeholder="Select"
                                                value={timeslot.find(obj => obj.value === selectedtimeslot)} // set selected values
                                                options={timeslot} // set list of the data
                                                onChange={handleChangeOptionTS} // assign onChange function
                                                />
                                        </div>
                                        
                                    </div>
                                    <div className="form-row">
                                            <div className="form-group col-md-3">
                                                    <label >Boat Capacity </label>
                                                    <Select
                                                        isMulti
                                                        isDisabled={booking.ishotelprovideboat}
                                                        className="dropdown"
                                                        placeholder="Select Boat Capacity"
                                                        value={boatdata.filter(obj => 
                                                        selectedboatdata.includes(obj.value)
                                                        
                                                        

                                                        )

                                                        } 
                                                        // set selected values
                                                        options={boatdata} // set list of the data
                                                         onChange={handleChangeOptionBC} // assign onChange function
                                                        />
                                            </div>
                                            <div className="form-group col-md-3">
                                                    <label >Select Package*</label>
                                                    <Select
                                                        className="dropdown"
                                                        placeholder="Select"
                                                        isDisabled={true}
                                                        value={packageddl.find(obj => obj.value === selectedPackage)} // set selected values
                                                        options={packageddl} // set list of the data
                                                        />
                                            </div>
                                         
                                            
                                    </div>
                            
                                    <div className="form-row">
                                            <div className="form-group col-md-3">
                                                <label  >Is Boat Provided by Resort?</label>
                                                <CInput style={{ width: "20%" ,fontSize:"0rem" }}   type="checkbox" value={booking.ishotelprovideboat} onChange={handleChangeHPB}
                                                id="ismaubancitizen" />
                                            </div>
                                            <div className="form-group col-md-3">
                                                 <label  >Accommodation<span style={{color:"red"}}><sup>*</sup></span></label>
                                                        <Select
                                                    className="dropdown"
                                                    placeholder="Select Resort"
                                                    value={selectedpreferredhotels} // set selected values
                                                    options={preferredhotels} // set list of the data
                                                    onChange={handleChangeOptionPH} // assign onChange function
                                                    />
                                            </div>
                                            <div className="form-group col-md-3">
                                                    <label for="guests"> Booking Reference#<span style={{color:"red"}}><sup>*</sup></span></label>
                                                    <CInput onChange={handleEBChange} value={booking.bookingrefencenum} type="text" id="bookingrefencenum" placeholder=" Booking Reference Number" />

                                            </div>
                                    </div>
                                  
                            
                            </CCardBody>
                                </CCollapse>
                            </CCard>
                            <CCard className="mb-0">
                                <CCardHeader id="headingTwo">
                                <CButton 
                                    block 
                                    color="link" 
                                    className="text-left m-0 p-0" 
                                    onClick={() => setAccordion(accordion === 1 ? null : 1)}
                                >
                                    <h5 className="m-0 p-0">Vehicle</h5>
                                </CButton>
                                </CCardHeader>
                                <CCollapse show={accordion === 1}>
                                <CCardBody>
                                
                                <div className="row">
                                    <div className="col-lg-6 col-md-12 mb-4">
                                        <label for="guests">Parking not Required{booking.parkingnotreq}</label>
                                        <CInput style={{ width: "20%",fontSize:"0rem" }}  onChange={handleEBChange} type="checkbox" checked={booking.parkingnotreq } value={booking.parkingnotreq} id="parkingnotreq" />
                                                
                                    </div>
                                    <table className="table">
                       <thead>
                         <th>vehicle</th>
                         <th>Qty</th>
                         <th>Total Charge</th>
                       </thead>
                       <tbody>
                    {(() => {
                      const rows = [];
                      if(booking.vehicle!==undefined){
                        if (booking.vehicle.length > 0) {
                          for (let i = 0; i < booking.vehicle.length; i++) {
                            var _veh = booking.vehicle[i];
                            //_veh.checked = false;
                            
                            rows.push(<> 
                              
                              <tr>
                                     <td>{_veh.typeofvehicle}</td>
                                     <td>
                                     <InputDecimal type="text" readOnly={booking.parkingnotreq}   id="vehicleqty" value={_veh.qty} id={_veh.id} onChange={handleChangevehicleqty(i)} placeholder="Qty" />
                                     </td>
                                     <td>{(_veh.qty)*(parseFloat(_veh.amount))}</td>
                                
  
                                     </tr> </>);
                          }
                          return rows;
                        }
                      }
                     

                      })()}
                       </tbody>
                     </table>
                           
                                </div>
                  <div className="row">
                    </div>
                                </CCardBody>
                                </CCollapse>
                            </CCard>
                            <CCard className="mb-0">
                                <CCardHeader id="headingThree">
                                <CButton 
                                    block 
                                    color="link" 
                                    className="text-left m-0 p-0" 
                                    onClick={() => setAccordion(accordion === 2 ? null : 2)}
                                >
                                    <h5 className="m-0 p-0">Guest Info</h5>
                                </CButton>
                                
                                      
                                </CCardHeader>
                                <CCollapse show={accordion === 2}>
                                <CCardBody>
                                <CButton color="primary" disabled={(new Date(moment(new Date(booking.currentdate)).format("DD MMM YYYY")))>new Date(moment(new Date(booking.fromdate)).format("DD MMM YYYY"))} onClick={e => editdata(-1, {})}>Add</CButton> <br></br>
                                <table className="table">
                       <thead>
                         <th>Firstname</th>
                         <th>Lastname</th>
                         <th>Gender</th>
                         <th>DOB</th>
                         <th>Maubanin</th>
                         <th  style={{textAlign:"center"}}>Action</th>
                       </thead>
                       <tbody>
                    {(() => {
                      const rows = [];
                      if (booking.touristdata!=undefined && booking.touristdata.length > 0) {
                          
                        for (let i = 0; i < booking.touristdata.length; i++) {
                          
                          var _tourist = booking.touristdata[i];
                          if(_tourist.deleted==false){
                            var gender=Gender.filter(x=>x.value==_tourist.gender)[0].label;
                            var dob=new Date(_tourist.dob);
                            var displaydob=dob.getDate()+" "+ getMonth(dob.getMonth()+1)+" "+dob.getFullYear();
                            var ismaubancitizen=_tourist.ismaubancitizen==true?"Yes":"No";
                            var isprimaryguest=_tourist.isprimary;
                                
  
                            //_veh.checked = false;
                              
                            rows.push(<> 
                              
                              <tr>
                                      <td>{_tourist.firstname }</td>
                                      <td>{_tourist.lastname }</td>
                                      <td>{gender }</td>
                                      <td>{displaydob }</td>
                                      <td>{ismaubancitizen }</td>
                                      <td style={{textAlign:"end"}}><CButton color="primary" disabled={(new Date(moment(new Date(booking.currentdate)).format("DD MMM YYYY")))>new Date(moment(new Date(booking.fromdate)).format("DD MMM YYYY"))}  onClick={e => editdata(i, booking.touristdata[i])}>Edit</CButton> &nbsp;&nbsp;
                                      <CButton color="primary" hidden={isprimaryguest} onClick={() => {opendeletetouristpopup(i, booking.touristdata[i])}}>Delete</CButton></td>
                                     {/*<td>
                                     <InputDecimal type="text" readOnly={booking.parkingnotreq}   id="vehicleqty" value={_veh.qty} id={_veh.id} onChange={handleChangevehicleqty(i)} placeholder="Qty" />
                                     </td>
                                     <td>{(_veh.qty==""?0:_veh.qty)*(parseFloat(_veh.amount))}</td> */}
                                
  
                                     </tr> </>);
                          }
                         
                        }
                        return rows;
                      }

                      })()}
                       </tbody>
                     </table>
                      
                                </CCardBody>
                                </CCollapse>
                            </CCard>
                            <CCard className="mb-0">
                              <CCardHeader id="headingFour">
                                <CButton 
                                    block 
                                    color="link" 
                                    className="text-left m-0 p-0" 
                                    onClick={() => setAccordion(accordion === 3 ? null : 3)}
                                >
                                    <h5 className="m-0 p-0">Payment Detail </h5>
                                </CButton>
                              </CCardHeader>
                              <CCollapse show={accordion === 3}>
                              <CCardBody>
                              <div className="row">
                                <div className="col-md-6">
                                {(() => {
                                  const rows = [];
                                  if(booking.touristdata!==undefined){
                                    if (booking.touristdata.length > 0) {
                                      
                                      //pricing fees
                                      var environmentdata=feesdata.data.filter(x=>x.id==1);
                                      var braceletdata=feesdata.data.filter(x=>x.id==4);
                                      var islandhoppingdata=feesdata.data.filter(x=>x.id==9);
                                      //#region previous Charges 
                                      const prediffTime = Math.abs(prevBooking.todate - prevBooking.fromdate);
                                      let prediffDays = Math.ceil(prediffTime / (1000 * 60 * 60 * 24));
                                      if(prediffDays==0 || prediffDays==1){
                                        prediffDays=1;
                                      }
                                    
                                      //guest filter 
                                      var _prevaildguest=prevBooking.touristdata.filter(x=>x.deleted==false);
                                      var _premaubaninguest=_prevaildguest.filter(x=>x.ismaubancitizen==true);
                                      var _prenonmaubaninguest=_prevaildguest.filter(x=>x.ismaubancitizen==false);
                                      var _preislandhoppingguest=_prevaildguest.filter(x=>x.islandhopping==true).length;
                                      //bracelet filter
                                      var _prerentbraceletcount=_prenonmaubaninguest.filter(x=>x.isrentbracelet==true).length;
                                      var _preownbraceletcount=_prenonmaubaninguest.filter(x=>x.isrentbracelet==false).length;

                                      var preBraceletmt=(_prerentbraceletcount>0?
                                                          (parseFloat(_prerentbraceletcount) * parseFloat(braceletdata.length>0?braceletdata[0].rentprice:0)):0)
                                                          +(_preownbraceletcount>0?
                                                          ((_preownbraceletcount) * (braceletdata.length>0?braceletdata[0].price:0)):0);

                                      //environment charges
                                      var preETAFamt=( _prenonmaubaninguest.length>0?
                                                  (parseFloat(_prenonmaubaninguest.length) * parseFloat(environmentdata.length>0?parseFloat(environmentdata[0].price):0)):0);
                                      
                                      //island hopping charges
                                      var preIslandHoppingAmt=(_preislandhoppingguest>0?
                                                  (parseFloat(_preislandhoppingguest) * (islandhoppingdata.length>0?islandhoppingdata[0].price:0)):0);
                                    
                                      //boat charges
                                      
                                      var preBoatamt=0;
                                      if(!prevBooking.ishotelprovideboat){
                                        for (let bt = 0; bt < prevBooking.boatid.length; bt++) {
                                          let eleboat = prevBooking.boatid[bt];
                                          let filterboat=boatdata.filter(x=>x.value==eleboat.uuid);
                                          if(filterboat.length>0){
                                            preBoatamt+= parseFloat(filterboat[0].price);
                                          }
                                          
                                        }
                                        
                                      }
                                      //parking charges
                                      
                                      var preparking=0;
                                      if(!prevBooking.parkingnotreq){
                                        for (let vh = 0; vh < prevBooking.vehicle.length; vh++) {
                                          preparking+=((parseFloat(prevBooking.vehicle[vh].qty)*(parseFloat(prevBooking.vehicle[vh].amount) ))*(prediffDays)); 
                                        }
                                      }
                                      //exemptiona charges for Maubanin
                                      var preexemptionamt=0;
                                      //senior citizen discount for Maubanin
                                      var prediscountamt=0;

                                      var preTotalAmt=(preETAFamt+preBraceletmt+preBoatamt+preparking+preIslandHoppingAmt)-(preexemptionamt+prediscountamt);
                                      //#endregion previous Charges
                                      
                                      //#region Current Charges
                                        // number of day guest stay
                                        const diffTime = Math.abs(booking.todate - booking.fromdate);
                                        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                        if(diffDays==0 || diffDays==1){
                                          diffDays=1;
                                        } 

                                      
                                        //guest filter 
                                        var _vaildguest=booking.touristdata.filter(x=>x.deleted==false);
                                        var _maubaninguest=_vaildguest.filter(x=>x.ismaubancitizen==true);
                                        var _nonmaubaninguest=_vaildguest.filter(x=>x.ismaubancitizen==false);
                                        var _islandhoppingguest=_vaildguest.filter(x=>x.islandhopping==true).length;
                                          ;
                                        //bracelet filter
                                        var _rentbraceletcount=_nonmaubaninguest.filter(x=>x.isrentbracelet==true).length;
                                        var _ownbraceletcount=_nonmaubaninguest.filter(x=>x.isrentbracelet==false).length;

                                        var Braceletmt=(_rentbraceletcount>0?
                                                            (parseFloat(_rentbraceletcount) * parseFloat(braceletdata.length>0?braceletdata[0].rentprice:0)):0)
                                                            +(_ownbraceletcount>0?
                                                            ((_ownbraceletcount) * (braceletdata.length>0?braceletdata[0].price:0)):0);

                                        //environment charges
                                        var ETAFamt=( _nonmaubaninguest.length>0?
                                                    (parseFloat(_nonmaubaninguest.length) * parseFloat(environmentdata.length>0?parseFloat(environmentdata[0].price):0)):0);
                                        
                                        //island hopping charges
                                        var IslandHoppingAmt=(_islandhoppingguest>0?
                                                    (parseFloat(_islandhoppingguest) * (islandhoppingdata.length>0?islandhoppingdata[0].price:0)):0);
                                      
                                        //boat charges
                                        var Boatamt=0;
                                        if(!booking.ishotelprovideboat){
                                          if(selectedboatdata.length>0){
                                          for (let bt = 0; bt < selectedboatdata.length; bt++) {
                                            let eleboat = selectedboatdata[bt];
                                            let filterboat=boatdata.filter(x=>x.value==eleboat);
                                            if(filterboat.length>0){
                                              Boatamt+= parseFloat(filterboat[0].price);
                                            }
                                            
                                          }
                                          }
                                        }
                                        //parking charges
                                        var parking=0;
                                        if(!booking.parkingnotreq){
                                          for (let vh = 0; vh < booking.vehicle.length; vh++) {
                                            parking+=((parseFloat(booking.vehicle[vh].qty)*(parseFloat(booking.vehicle[vh].amount) ))*(diffDays)); 
                                          }
                                        }
                                        //exemptiona charges for Maubanin
                                        var exemptionamt=0;
                                        //senior citizen discount for Maubanin
                                        var discountamt=0;
                                        var TotalAmt=(ETAFamt+Braceletmt+Boatamt+parking+IslandHoppingAmt)-(exemptionamt+discountamt);
                                        // setBooking(prevState => ({
                                        //   ...prevState,
                                        //   totalcharge: TotalAmt,
                                        //   totaldue:((TotalAmt-preTotalAmt)>0?((TotalAmt-preTotalAmt)):0),
                                        //   totalrefund:((TotalAmt-preTotalAmt)<=0?((TotalAmt-preTotalAmt) * (-1)):0)
                                        // }));
                                        //#endregion Current Charges
                                    
                                        




                                    rows.push(<> 
                                              <table className="table">
                                              <thead>
                                                    <tr>
                                                      <td>Charges For </td>
                                                      <td>Current Charges </td>
                                                      <td className="prevchrgs">Previous Charges </td>
                                                    </tr>
                                                
                                              </thead>
                                                    <tbody>
                                                    <tr>
                                                      <td>ETAF </td>
                                                      <td>PHP {ETAFamt.toFixed(2)} </td>
                                                      <td className="prevchrgs">PHP {preETAFamt.toFixed(2)} </td>
                                                    </tr>
                                                    <tr>
                                                      <td>Bracelet </td>
                                                      <td>PHP {Braceletmt.toFixed(2)} </td>
                                                      <td className="prevchrgs">PHP {preBraceletmt.toFixed(2)} </td>
                                                    </tr>
                                                    <tr>
                                                      <td>Boat </td>
                                                      <td>PHP {Boatamt.toFixed(2)} </td>
                                                      <td className="prevchrgs">PHP {preBoatamt.toFixed(2)} </td>
                                                    </tr>
                                                    <tr>
                                                      <td>Package </td>
                                                      <td>PHP 0.00 </td>
                                                      <td className="prevchrgs">PHP 0.00 </td>
                                                    </tr>
                                                    <tr>
                                                      <td>Island Hopping </td>
                                                      <td>PHP {IslandHoppingAmt.toFixed(2)} </td>
                                                      <td className="prevchrgs">PHP {preIslandHoppingAmt.toFixed(2)} </td>
                                                    </tr>
                                                    <tr>
                                                      <td>Parking </td>
                                                      <td>PHP {parking.toFixed(2)} </td>
                                                      <td className="prevchrgs">PHP {preparking.toFixed(2)} </td>
                                                    </tr>
                                                    <tr>
                                                      <td>Discount </td>
                                                      <td>PHP {discountamt.toFixed(2)} </td>
                                                      <td className="prevchrgs">PHP {prediscountamt.toFixed(2)} </td>
                                                    </tr>
                                                    <tr>
                                                      <td>Exemption </td>
                                                      <td>PHP {exemptionamt.toFixed(2)} </td>
                                                      <td className="prevchrgs">PHP {preexemptionamt.toFixed(2)} </td>
                                                    </tr>
                                                    <tr>
                                                      <td><b>Total</b> </td>
                                                      <td><b>PHP {TotalAmt.toFixed(2)}</b> </td>
                                                      <td className="prevchrgs"><b>PHP {preTotalAmt.toFixed(2)}</b> </td>
                                                    </tr>
                                                    <tr>
                                                      <td><b>Total Amount Due</b> </td>
                                                      <td><b>PHP {((TotalAmt-preTotalAmt)>0?((TotalAmt-preTotalAmt)):0).toFixed(2)}</b> </td>
                                                      <td className="prevchrgs"><b>PHP {prevBooking.totaldue.toFixed(2)}</b> </td>
                                                    </tr>
                                                    <tr>
                                                      <td><b>Total Refund</b> </td>
                                                      <td><b>PHP {((TotalAmt-preTotalAmt)<=0?((TotalAmt-preTotalAmt) * (-1)):0).toFixed(2)}</b> </td>
                                                      <td className="prevchrgs"><b>PHP {prevBooking.totalrefund.toFixed(2)}</b> </td>
                                                    </tr>
                                                    </tbody>
                                                  </table>
                                            
                                        </>);
                                      
                                      return rows;
                                    }
                                  }
                     

                                })()}
                                    

                                </div>
                               
                               
                              </div>
                              
                              
                            </CCardBody>
                   
                              </CCollapse>
                            </CCard>
                           
                           
                            </div>
                        
                        </div>
                        </>   
                    </CCol>
                    
                       
                    </div>
                       
                </Card.Body>
              
                
            </Card>
        
        
            <CModal show={edittouristpopup} closeOnBackdrop={true} backdrop={true} onClose={() => setEditTouristpopup(!edittouristpopup)} size="lgx">
                <CModalHeader >
                    <CModalTitle>
                      Edit Booking 
                      
                    </CModalTitle>
                   
                    
                </CModalHeader>
                <CModalBody>
                  <div className="row">
                  <div className="col-md-4">
                              <label for="guests" style={{fontWeight:"bold"}} >Returning Guest?</label>
                              <CInput style={{ width: "20%",fontSize:"0rem" }}
                               onChange={handleEBTChange} type="checkbox" 
                               checked={edittourist.isreturningguest }
                               value={edittourist.isreturningguest} id="isreturningguest" />
                      </div>
                  </div>
                 <span style={{color:"red",display:edittourist.isreturningguest==true?"":"none"}} >Note : Please Fill-in your Firstname, Lastname, gender and birthday to Validate! </span>
                  {/* <div className="row">
                        <div className="col-md-4" >
                          <label for="guests" 
                          style={{fontWeight:"bold",color:(edittourist.isreturningguestvaildate==true?"green":((edittourist.isreturningguestvaildate==false && edittourist.returnguestmsg!="")?"red":"black"))}} 
                          >{returnguestmsg} </label>
                            
                        </div>
                  </div>
                  <div className="row"  >
                     
                     
                                  
                  </div> */}
                  <div className="clearfixmargin"></div>
                  <div className="row">
                        <div className="col-md-4">
                              <label for="guests" style={{fontWeight:"bold"}}>First name<span style={{color:"red"}}>*</span></label>
                              <CInput onChange={handleEBTChange} value={edittourist.firstname} 
                                type="text" id="firstname" placeholder="First Name" />
                           
                        </div>
                        <div className="col-md-4">
                              <label for="guests" style={{fontWeight:"bold"}}>Last name<span style={{color:"red"}}>*</span></label>
                              <CInput onChange={handleEBTChange} type="text" value={edittourist.lastname} 
                              id="lastname" placeholder="Last name" />
                            
                        </div>
                        <div className="col-md-4">
                          
                            <label for="guests" style={{fontWeight:"bold"}}>Date Of Birth<span style={{color:"red"}}>*</span></label><br></br>
                            <DatePicker dateFormat="dd-MMM-yyyy"  
                            
                            className="form-control" 
                            selected={selectedtouristdob} onChange={(date) =>{
                                                                            setSelectedTouristDOB(date);
                                            } } />
                                 
                        </div>
                  </div>
                  <div className="clearfixmargin"></div>
                  <div className="row">
                    <div className="col-md-4">
                        <label for="guests"  style={{fontWeight:"bold"}}>Gender<span style={{color:"red"}}>*</span></label>
                                  <Select
                                    className="dropdown"
                                    placeholder="Select"
                                    value={Gender.find(obj => obj.value === selectedtouristgender)} // set selected values
                                    options={Gender} // set list of the data
                                    onChange={handleChangeEBTGender} // assign onChange function
                                  />
                        </div>
                    
                    <div className="col-md-4"  style={{display:edittourist.isreturningguest==true?"":"none"}} >
                      <label for="guests">Vaildate Return Guest</label><br></br>
                      <CButton color="primary" onClick={() =>vaildateguest()} >Go</CButton>
                      </div>
                    
                 </div>
                  <div className="clearfixmargin"></div>
                  <div className="row">
                    <div className="col-md-4">
                              <label for="guests"  style={{fontWeight:"bold"}}>Citizenship {edittourist.isreturningguestvaildate}</label>
                              <Select
                              className="dropdown"
                              isDisabled={edittourist.isreturningguest==true?!edittourist.isreturningguestvaildate:false}
                              placeholder="Select Citizenship"
                              value={citizenship.find(obj => obj.value === selectedTouristCS)} // set selected values
                              options={citizenship} // set list of the data
                              onChange={handleChangeEBTCS} // assign onChange function
                              />
                      </div>
                    <div className="col-md-4">
                          <label for="guests"  style={{fontWeight:"bold"}}>Country Of orgin</label>
                                    <Select
                                    id="CountryofOrigin"
                                    className="dropdown"
                                    isDisabled={edittourist.isreturningguest==true?!edittourist.isreturningguestvaildate:false}
                                    placeholder="Select"
                                    value={country.find(obj => obj.value === selectedEBTCOO)} // set selected values
                                    options={country} // set list of the data
                                    onChange={handleChangeEBTCOO} // assign onChange function
                                    />

                      </div>
                    <div className="col-md-4">
                          <label for="guests" style={{fontWeight:"bold"}}>Province</label>
                                  <Select
                                  className="dropdown"
                                  placeholder="Select"
                                  isDisabled={edittourist.isreturningguest==true?!edittourist.isreturningguestvaildate:false}
                                  value={Province.find(obj => obj.value === selectedEBTProvince)} // set selected values
                                  options={Province} // set list of the data
                                  onChange={handleChangeEBTProvince} // assign onChange function
                                  />
                     </div>
                  </div>
                  <div className="clearfixmargin"></div>
                  <div className="row">
                   
                     <div className="col-md-4">
                          <label for="guests">Municipality</label>
                                    <Select
                                            className="dropdown"
                                            placeholder="Select"
                                            isDisabled={edittourist.isreturningguest==true?!edittourist.isreturningguestvaildate:false}
                                            value={Municipality.find(obj => obj.value === selectedMunicipality)} // set selected values
                                            options={Municipality} // set list of the data
                                            onChange={handleChangeEBTMunicipality} // assign onChange function
                                          />

                     </div>
                     <div className="col-md-4">
                     <label for="guests">Address</label>
                            <CInput onChange={handleEBTChange} disabled={edittourist.isreturningguest==true?!edittourist.isreturningguestvaildate:false} value={edittourist.address1} type="text" id="address1" placeholder="Address" />
                        

                     </div>
                     <div className="col-md-4">
                             <label for="guests">Mobile Number</label>
                             <CInput onChange={handleEBTChange} disabled={edittourist.isreturningguest==true?!edittourist.isreturningguestvaildate:false} value={edittourist.mobilenumber} type="text" id="mobilenumber" placeholder="Mobile " />
                   
                    </div>
                  </div>
                  <div className="clearfixmargin"></div>
                  <div className="row">
                    
                    <div className="col-md-4">
                            <label for="guests">E-mail Address</label>
                              <CInput onChange={handleEBTChange} disabled={edittourist.isreturningguest==true?!edittourist.isreturningguestvaildate:false} value={edittourist.emailid} type="text" id="emailid" placeholder="Email" />
                   
                    </div>

                  </div>
                  <div className="clearfixmargin"></div>
                  <div className="row">
                      
                      <div className="col-md-4">
                              <label for="guests" style={{fontWeight:"bold"}}>Rent Bracelet</label>
                              <CInput style={{ width: "20%",fontSize:"0rem" }} 
                              onChange={handleEBTChange} type="checkbox" 
                              disabled={edittourist.isreturningguest==true?!edittourist.isreturningguestvaildate:false}
                              checked={edittourist.isrentbracelet } 
                              value={edittourist.isrentbracelet} id="isrentbracelet" />
                      </div>
                      <div className="col-md-4" style={{fontWeight:"bold",display:edittourist.isreturningguestvaildate==true?"":"none"}}>
                              <label for="guests" style={{fontSize:"14px"}}>Do you have Bracelet</label>
                              <CInput style={{ width: "20%",fontSize:"0rem" }} 
                              onChange={handleEBTChange} type="checkbox" 
                              disabled={edittourist.isreturningguest==true?edittourist.isreturningguestvaildate:false}
                              checked={edittourist.braceletavailable } 
                              value={edittourist.braceletavailable} id="braceletavailable" />
                      </div>
                      
                  </div>
                  
               
                </CModalBody>
          
                <CModalFooter>
                  <CButton color="primary"   onClick={() => updatetourist()}>Save</CButton>{' '}
                  <CButton color="secondary" onClick={() => setEditTouristpopup(!edittouristpopup)}>Cancel</CButton>
                </CModalFooter>
            </CModal>
            <CModal show={deletetouristpopup} closeOnBackdrop={true} backdrop={true} onClose={() => setDeletetouristpopup(!deletetouristpopup)} size="sm">
                <CModalHeader>Deleteing Toursist </CModalHeader>
                <CModalBody>
                  Are you sure want to delete " {edittourist.firstname} {edittourist.lastname} " tourist? 
                </CModalBody>
                <CModalFooter>
                  <CButton color="primary"   onClick={() => deletetourist()}>Delete</CButton>{' '}
                  <CButton color="secondary" onClick={() => setDeletetouristpopup(!deletetouristpopup)}>Cancel</CButton>
                </CModalFooter>
            </CModal>
            
            <CModal show={isconfirmbooking} onClose={() => setIsConfirmBooking(!isconfirmbooking)}   size="lg">
              <CModalHeader closeButton>
              <CModalTitle>Booking    <small className="text-muted"> Detail</small> </CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol md="12">
                  <CForm>
                    <CRow>
                      <CCol xs="3" >
                        <CLabel >From Date</CLabel><br></br>
                        <CLabel ><b>{moment(new Date(booking.fromdate)).format("DD MMM YYYY")}</b></CLabel>
                      </CCol>
                      <CCol xs="3" >
                        <CLabel >To Date</CLabel><br></br>
                        <CLabel ><b>{moment(new Date(booking.todate)).format("DD MMM YYYY")}</b></CLabel>
                      </CCol>
                      <CCol xs="3" >
                        <CLabel >Time</CLabel><br></br>
                        <CLabel ><b>{booking.touristdata.length>0? getTimeSlot():0}</b></CLabel>
                      </CCol>
                      <CCol xs="3" >
                        <CLabel >Boat Capacity</CLabel><br></br>
                        <CLabel ><b>{booking.touristdata.length>0? getBoats():0}</b></CLabel>
                      </CCol>
                    
                    </CRow>
                    <br></br>
                    <CRow>
                      <CCol xs="3" >
                        <CLabel >Package</CLabel><br></br>
                        <CLabel ><b>{booking.touristdata.length>0? booking.package[0].label:0}</b></CLabel>
                      </CCol>
                      <CCol xs="3" >
                        <CLabel >Boat Provided by Resort</CLabel><br></br>
                        <CLabel ><b>{booking.ishotelprovideboat==true?"Yes":"No"}</b></CLabel>
                      
                      </CCol>
                      <CCol xs="3" >
                        <CLabel >Accommodation</CLabel><br></br>
                        <CLabel ><b>{booking.hotelid.length>0? booking.hotelid[0].label:0}</b></CLabel>
                      
                      </CCol>
                      <CCol xs="3" >
                        <CLabel >Number Of Guest</CLabel><br></br>
                        <CLabel ><b>{selectednumberguest}</b></CLabel>
                      
                      </CCol>
                    </CRow>
                    <br></br>
                    <CRow>
                   
                   
                      
                      <CCol xs="3" >
                        <CLabel >Previous Charge</CLabel><br></br>
                        <CLabel ><b>PHP {parseFloat( booking.totalcharge).toFixed(2)}</b></CLabel>
                      
                      </CCol>
                      <CCol xs="3" >
                        <CLabel >New Charge</CLabel><br></br>
                        <CLabel ><b>PHP {parseFloat( totaldue>0? (booking.totalcharge+totaldue):0).toFixed(2)}</b></CLabel>
                      
                      </CCol>
                      <CCol xs="3" >
                        <CLabel >{isRefundNoShow==1?"No Show Refund": (totaldue>0?"Total Amount Due":((totalrefund>0)?"Total Refund":"Total Amount Due"))}</CLabel><br></br>
                        <CLabel ><b>PHP {isRefundNoShow==1?parseFloat(booking.totalcharge) :parseFloat( totaldue>0?totaldue:((totalrefund>0)?totalrefund:0)).toFixed(2)}</b></CLabel>
                      
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
                    style={{display:isprocessing==true?"":"none"}}
                    alt="qrcode"
                  />
                  <CButton color="primary " style={{float: "right" ,display:isprocessing==true?"none":""}} onClick={() => Savedata()} >{totaldue>0?"Proceed to Pay":"Apply For Refund"}</CButton>
                  {/* <CButton color="secondary" onClose={() => setIsConfirmBooking(!isconfirmbooking)} >Make Changes</CButton> */}
                  <CButton color="primary " style={{float: "right"}}  onClick={() =>setIsConfirmBooking(!isconfirmbooking)}>Make Changes</CButton>
        
              </CModalFooter>
             
            </CModal>

   
         </CContainer>
      
    </div>
    </>)
}
export default EditBooking;
