import React, { useState, useEffect, useContext } from "react";
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
    CInputRadio
} from "@coreui/react";
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
import Citizenship from "src/views/citizenship/citizenship";
const NewTravelInfoBA = (traveldata) => {
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
    /*#region Variables  */

    var processing = process.env.PUBLIC_URL + "/processing.gif";
    const { gacc, setgacc } = useContext(userContext);

    const [localtravelinfodata, setLocalTravelInfoData] = useState([]);

    const [ishotelprovideboat, setIsHotelProvideBoat] = useState(false);
    const [numberofguests, setNumberOfGuestData] = useState([]);

    const [selectednumberguest, setSelectedNumberGuest] = useState("");
    const [selectedfromdate, setFromdate] = useState([new Date()]);
    const [numberofdaystravel, setNumberofDays] = useState(1);
    const [selectedtodate, setTodate] = useState([new Date()]);
    const [slotdate, setSlotdate] = useState([]);
    const [timeslot, setTimeSlot] = useState([]);
    const [selectedtimeslot, setSelectedTimeSlot] = useState("");
    const [preferredhotels, setPreferredHotels] = useState([]);
    const [selectedpreferredhotels, setSelectedPreferredHotels] = useState([]);
    const [hotelbookingref, setHotelBookingRef] = useState([]);

    const [guestarr, setGuestArr] = useState([]);
    const [returnguestmsg, setReturnGuestMsg] = useState("");
    const [feesdata, setFeesData] = useState([]);
    const [step1, setStep1] = useState(true);

    const [guestactivepostion, setActivePosition] = useState(0);
    const [selecteddob, setSelectedDOB] = useState([]);
    const [Gender, setGender] = useState([]);
    const [selectedGender, setSelectedGender] = useState([]);
    const [citizenship, setCitizenship] = useState([]);
    const [selectedCS, setSelectedCS] = useState([]);
    const [isvaildatereturnprocessing, setIsVaildatereturnProcessing] = useState(false);
    const [vaildatereturnmsg, setVaildateReturnmsg] = useState("");
    const [Province, setProvince] = useState([]);
    const [Municipality, setMunicipality] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [RawProvince, setRawProvince] = useState([]);
    const [RawMunicipality, setRawMunicipality] = useState([]);
    const [selectedMunicipality, setSelectedMunicipality] = useState([]);
    const [selectedCOO, setSelectedCOO] = useState([]);
    const [country, setCountry] = useState([]);
    const [selected, setSelected] = useState('yes');
    const [isconfirmbooking, setIsConfirmBooking] = useState(false);

    const [bookingdetail, setBookingDetail] = useState({
        fromdate: "",
        todate: "",
        timeslot: "",
        hotel: "",
        numberoofguest: 0,
        ETAF: 0,
        Bracelet: 0,
        ProcessingFee: 0,
        totalcharge: 0,
    });
    const [isprocessing, setIsProcessing] = useState(false);

    const [isopenbulkupload, setIsOpenBulkUpload] = useState(false);
    const [bulkuploadfilename, setbulkuploadfilename] = useState([]);
    const [bulkuploaddata, setBulkUploadData] = useState([]);


    const [tourtype, setTourType] = useState([]);
    const [selectedtourtype, setSelectedTourType] = useState([]);

    const [localdestinationdata, setLocalDestinationData] = useState([]);
    const [selecteddestination, setSelectedDestination] = useState([]);

    const [discoutnType, setDiscountType] = useState([]);
    const [selectedDiscoutnType, setSelectedDiscountType] = useState([]);

    /*#endregion Variables  */
    /*#region functions  */

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
    const getTourType = () => {
        let countdata = [];
        countdata.push({
            value: 1,
            label: "Day Tour",
        });
        countdata.push({
            value: 2,
            label: "Stay",
        });
        setTourType(countdata);
        setSelectedTourType(1);

    };



    const handleChangeOptionDiscoutnType = (e) => {
        debugger;

        if (localtravelinfodata["guestinfo"].length > 0) {
            localtravelinfodata["guestinfo"][guestactivepostion]["discountinfo"] = e;
        }
        if (e == null) {
            setSelectedDiscountType(null);
        } else {
            setSelectedDiscountType(e.value);
        }


    };

    const handleChangeOptionNOG = (e) => {
        setSelectedNumberGuest(e.value);
        localtravelinfodata.numberofguest = e.value;

    };
    const handleChangeOptionDestination = (e) => {
        setSelectedDestination(e);
        setLocalTravelInfoData({ ...localtravelinfodata, ["destination"]: e });

    }
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

    const Pageload = () => {
        dataservice("dashboardstats", { requestfor: "loaddashboad" })
            .then(function (data) {
                if (data.resultkey == 1) {
                    var countdata = [];
                    var tempdata = data.resultvalue;
                    var _slotdata = tempdata.slotdata;
                    var _hoteldata = tempdata.hoteldata;
                    var _feesdata = tempdata.feedata;
                    var _countrydata = tempdata.country;
                    var _citizenshipdata = tempdata.citizenship;
                    var _provincedata = tempdata.province;
                    var _municipalitydata = tempdata.municipality;
                    var _destinationdata = tempdata.destination;
                    var _discountdata = tempdata.discount;

                    setRawMunicipality(_municipalitydata);
                    countdata.push({
                        value: 0,
                        label: "Select Time",

                    });
                    for (let index = 0; index < _slotdata.length; index++) {
                        countdata.push({
                            value: _slotdata[index].id,
                            label: _slotdata[index].description,

                        });
                    }
                    setTimeSlot(countdata);
                    countdata = [];
                    countdata.push({
                        value: 0,
                        label: "Select Hotel",
                    });
                    for (let index = 0; index < _hoteldata.length; index++) {
                        countdata.push({
                            value: _hoteldata[index].id,
                            label: _hoteldata[index].description,

                        });
                    }
                    setPreferredHotels(countdata);
                    setFeesData({ ...feesdata, data: _feesdata });
                    countdata = [];
                    for (let index = 0; index < _countrydata.length; index++) {
                        let item = _countrydata[index];
                        countdata.push({ value: item.id, label: item.description });
                    }
                    setCountry(countdata);
                    countdata = [];
                    for (let index = 0; index < _citizenshipdata.length; index++) {
                        let item = _citizenshipdata[index];
                        countdata.push({ value: item.id, label: item.description });
                    }
                    setCitizenship(countdata);
                    countdata = [];
                    for (let index = 0; index < _citizenshipdata.length; index++) {
                        let item = _citizenshipdata[index];
                        countdata.push({ value: item.id, label: item.description });
                    }
                    setCitizenship(countdata);

                    countdata = [];
                    for (let index = 0; index < _provincedata.length; index++) {
                        let item = _provincedata[index];
                        countdata.push({ value: item.id, label: item.description, countryid: item.countryid });
                    }
                    setRawProvince(_provincedata);

                    setProvince(countdata);

                    setSelectedMunicipality("81");

                    countdata = [];
                    for (let index = 0; index < _destinationdata.length; index++) {
                        countdata.push({
                            value: _destinationdata[index].id,
                            label: _destinationdata[index].name,

                        });
                    }
                    setLocalDestinationData(countdata);
                    countdata = [];
                    for (let index = 0; index < _discountdata.length; index++) {
                        countdata.push({
                            value: _discountdata[index].discounttypeid,
                            label: _discountdata[index].description,
                            discountValue: _discountdata[index].value,
                            discountAction: _discountdata[index].valuetype,
                        });
                    }
                    setDiscountType(countdata);

                }
            })
            .catch(function (edata) {

                notify(2, edata.toString(), 1);
            });
    };
    const cacluate = () => {

    }
    const handleChangeOptionTS = (e) => {

        setSelectedTimeSlot(e.value);
        setLocalTravelInfoData({ ...localtravelinfodata, ["arrivetime"]: e.value });
        //setSelectedTimeSlot(Array.isArray(e) ? e.map((x) => x.value) : []);

    };
    const handleChangeOptionPH = (e) => {
        var Ph = preferredhotels.filter((obj) => obj.value === e.value);
        setSelectedPreferredHotels(Ph);
        setLocalTravelInfoData({ ...localtravelinfodata, ["hotel"]: Ph });
    };
    const handleChange = (e) => {
        console.log(e);

        const { id, value } = e.target;

        var guestinfo = localtravelinfodata.guestinfo[guestactivepostion];

        if (e.target.type === "file") {

            var fileinfo = e.target.files;
            if (fileinfo.length > 0) {
                let size = parseFloat(e.target.files[0].size / (1024 * 1024)).toFixed(2);
                if (size > 3) {
                    notify(2, "Please select file less then 3mb");
                    return false;
                } else {
                    localtravelinfodata["guestinfo"][guestactivepostion][id] =
                        e.target.files[0];

                    setGuestArr({ ...guestarr, [id]: e.target.files[0] });
                }
            }


        } else if (e.target.type === "checkbox") {
            if (id == "isreturningguest") {
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
            }

        } else {


            if (id == "hotelbookingref") {
                localtravelinfodata["hotelbookingref"] = value;
                setHotelBookingRef(value);
            } else {
                setGuestArr({ ...guestarr, [id]: value });
                guestinfo[id] = value;
            }
        }

    };
    const handleChangeRD = event => {

        var guestinfo = localtravelinfodata.guestinfo[guestactivepostion];
        const { id, value, name } = event.target;
        console.log(event.target.value);
        //setSelected(event.target.value);

        switch (name) {
            case "inline-radiosSickYesNo":
                setGuestArr({ ...guestarr, ["sick"]: value });
                guestinfo["sick"] = value;
                break;
            case "inline-radiosConfirmedcaseYesNo":
                setGuestArr({ ...guestarr, ["confirmedcase"]: value });
                guestinfo["confirmedcase"] = value;
                break;
            case "inline-radiosTestedPositiveYesNo":
                setGuestArr({ ...guestarr, ["testedpositive"]: value });
                guestinfo["testedpositive"] = value;
                break;

            default:
                break;
        }




    };
    const backtomainpage = () => {
        setStep1(true);
    }
    const nextstep = () => {
        if (validationstep()) {
            setStep1(false);
            setselectguest(0);
        }

    }
    const validationstep = () => {

        var result = true;
        var isvaildhotel = true;
        if (localtravelinfodata.tourtype != 1) {
            if (localtravelinfodata.hotel.length == 0) {
                isvaildhotel = false;
            } else {
                if (localtravelinfodata.hotel[0].value == 0) {
                    isvaildhotel = false;
                }
            }
        }

        if (localtravelinfodata.numberofguest == "") {
            notify(2, "Please select number of guest.");
            return false;
        } else if (localtravelinfodata.arrivetime == "") {
            notify(2, "Please select time of arrive.");
            return false;
        } else if (!isvaildhotel) {
            notify(2, "Please select hotel.");
            return false;
        } else if (hotelbookingref == "" && localtravelinfodata.tourtype != 1) {
            notify(2, "Please enter hotel booking refrence number.");
            return false;
        }

        return result;
    }

    const finalsave = () => {
        setIsProcessing(true);
        let val = Math.floor(1000 + Math.random() * 9000);
        var todata =
            selectedtodate[0] == undefined ? selectedtodate : selectedtodate[0];
        var fromdata =
            selectedfromdate[0] == undefined ? selectedfromdate : selectedfromdate[0];
        let Difference_In_Time = todata - fromdata;

        var Difference_In_Days = Math.floor(
            Difference_In_Time / (1000 * 3600 * 24)
        );
        var guestno = localtravelinfodata.numberofguest;
        let envAmt = (localtravelinfodata.fees.filter(x => x.id == 1).length > 0 ? localtravelinfodata.fees.filter(x => x.id == 1)[0].amount : 0) * guestno;
        let profee = (localtravelinfodata.fees.filter(x => x.id == 2).length > 0 ? localtravelinfodata.fees.filter(x => x.id == 2)[0].amount : 0) * guestno;
        let brafee = (localtravelinfodata.fees.filter(x => x.id == 3).length > 0 ? localtravelinfodata.fees.filter(x => x.id == 3)[0].amount : 0) * guestno;
        let disamt = 0;
        let totalamt = (envAmt + profee + brafee) - localtravelinfodata.finaldiscount;
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
            totalcharge: totalamt,
            pax: localtravelinfodata.numberofguest,
            preferredhotels: localtravelinfodata.hotel,
            paymentid: val,
            selectedvehicleinfo: [],
            touristinfo: localtravelinfodata.guestinfo,
            chargesinfo: [],
            slotid: selectedtimeslot,
            slotdetail: seltimeslot,
            hotelbookingref: localtravelinfodata.hotelbookingref,
            bulkUpload: false,
        };
        dataservice("registration", {
            requestfor: "registration_test_baler_aurora",
            data: submitdata,
        })
            .then(function (data) {
                if (data.resultkey == 1) {
                    var result = data.resultvalue;
                    var responseurl = JSON.parse(data.resultvalue.url);
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
    }

    const validationbeforepay = () => {
        var guestinfodetail = localtravelinfodata.guestinfo;


        var result = true;
        for (let index = 0; index < guestinfodetail.length; index++) {
            const element = guestinfodetail[index];
            var guestcoutn = "Guest " + (index + 1);
            if (element.Firstname == "") {
                notify(2, "Please enter firstname " + guestcoutn);
                return false;
            } else if (element.Lastname == "") {
                notify(2, "Please enter lastname " + guestcoutn);
                return false;
            } else if (element.Address == "") {
                notify(2, "Please enter address for " + guestcoutn);
                return false;
            } else if (element.filedata == "") {
                notify(2, "Please upload vaccination card for " + guestcoutn);
                return false;
            }
            let today = new Date();
            if (today.getFullYear() == new Date(element.DOB).getFullYear() && today.getMonth() == new Date(element.DOB).getMonth()) {
                notify(2, "Invaild date of birth for " + guestcoutn);
                return false;
            }
            if (index == 0) {
                if (element.Mobilenumber == "") {
                    notify(2, "Please enter Mobile Number for " + guestcoutn);
                    return false;
                } else if (element.emailid == "") {
                    notify(2, "Please enter email id for " + guestcoutn);
                    return false;
                }
            }

        }

        return result;
    }
    const pay = () => {

        if (validationbeforepay()) {
            if (localtravelinfodata != undefined) {
                var guestno = localtravelinfodata.numberofguest;
                let envAmt = (localtravelinfodata.fees.filter(x => x.id == 1).length > 0 ? localtravelinfodata.fees.filter(x => x.id == 1)[0].amount : 0) * guestno;
                let profee = (localtravelinfodata.fees.filter(x => x.id == 2).length > 0 ? localtravelinfodata.fees.filter(x => x.id == 2)[0].amount : 0) * guestno;
                let brafee = (localtravelinfodata.fees.filter(x => x.id == 3).length > 0 ? localtravelinfodata.fees.filter(x => x.id == 3)[0].amount : 0) * guestno;
                let disamt = 0;
                let totalamt = (envAmt + profee + brafee) - localtravelinfodata.finaldiscount;
                var timeinfo = timeslot.filter(x => x.value == localtravelinfodata.arrivetime)
                setBookingDetail({

                    fromdate: moment(
                        selectedfromdate[0] == undefined
                            ? selectedfromdate
                            : selectedfromdate[0]
                    ).format("MMM-DD-YYYY"),
                    todate: moment(
                        selectedtodate[0] == undefined ? selectedtodate : selectedtodate[0]
                    ).format("MMM-DD-YYYY"),
                    // timeslot: seltimeslot.length > 0 ? seltimeslot[0].label : "",
                    hotel:
                        localtravelinfodata.hotel.length > 0
                            ? localtravelinfodata.hotel[0].label
                            : "",
                    numberoofguest: localtravelinfodata.numberofguest,
                    ETAF: parseFloat(envAmt).toFixed(2),
                    totalcharge: totalamt,
                    Bracelet: parseFloat(brafee).toFixed(2),
                    timeslot: (timeinfo != "" || timeinfo != undefined) ? timeinfo[0].label : "",
                    ProcessingFee: parseFloat(brafee).toFixed(2),
                    fnlDiscount: localtravelinfodata.finaldiscount,
                    tourType: localtravelinfodata.tourType

                });
                setIsConfirmBooking(!isconfirmbooking);
            }
        }


    }

    const setselectguest = (position) => {
        setActivePosition(position);

        var guestinfo = localtravelinfodata.guestinfo[position];
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
            setSelectedProvince("81");
        }
        if (guestinfo["Municipality"] != "") {
            setSelectedMunicipality(guestinfo["Municipality"]);
        } else {
            //  setSelectedMunicipality([]);
            guestinfo["Municipality"] = 1968;
            setSelectedMunicipality(1968);
        }
        if (guestinfo["Gender"] != "") {
            setSelectedGender(guestinfo["Gender"]);
        } else {
            guestinfo["Gender"] = 0;
            setSelectedGender(0);
        }
    }
    const onChangeDateOfBirth = (e) => {
        var dob = e;
        var today = new Date();
        var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
        var guestinfo = localtravelinfodata.guestinfo[guestactivepostion];
        guestinfo["DOB"] = moment(dob).format("YYYY-MM-DD");
        guestinfo["age"] = age;
        setSelectedDOB(dob);

        //  recaltotal();
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
    const handleChangeOptionGender = (e) => {
        if (localtravelinfodata["guestinfo"].length > 0) {
            localtravelinfodata["guestinfo"][guestactivepostion]["Gender"] = e.value;
        }

        setSelectedGender(e.value);
    };
    const handleChangeCOO = (e) => {
        if (e.value == 2) {
            var guestinfo = localtravelinfodata.guestinfo[guestactivepostion];
            let tempprovince = RawProvince.filter(x => x.countryid == e.value);
            setProvince(tempprovince);
            if (guestinfo["Province"] != "") {
                setSelectedProvince(guestinfo["Province"].toString());
            } else {
                guestinfo["Province"] = 81;
                // setSelectedProvince(Province[0].value);
                setSelectedProvince("81");
            }
            if (guestinfo["Municipality"] != "") {
                setSelectedMunicipality(guestinfo["Municipality"].toString());
            } else {
                guestinfo["Municipality"] = 1968;
                setSelectedMunicipality("1968");
            }
        } else {

            console.log(RawProvince);
            let tempprovince = RawProvince.filter(x => x.countryid == e.value);
            setProvince(tempprovince);


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
    const handleChangeOptionTourType = (e) => {
        setSelectedTourType(e.value);
        setLocalTravelInfoData({ ...localtravelinfodata, ["tourtype"]: e.value });

    };
    const vaildateguest = () => { }
    const getdropdownarr = (result) => {
        let countdata = [];
        //let country = ["Caloocan", "Malabon", "Makati", "Manila", "Mandaluyong"]
        for (let index = 0; index < result.length; index++) {
            let item = result[index];
            countdata.push({ value: item.id, label: item.description });
        }
        return countdata;
    };
    const Savedata = () => {
        if (validationbeforepay()) {
            finalsave();
        }
    }
    const calculateSale = (listPrice, discount) => {
        ;
        listPrice = parseFloat(listPrice);
        discount = parseFloat(discount);
        return (listPrice * ((discount) / 100)).toFixed(2);
    };
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
                    // 0: "FirstName"
                    // 1: "LastName"
                    // 2: "DateOfBirth"
                    // 3: "Gender"
                    // 4: "Address"
                    // 5: "MobileNumber"
                    // 6: "EmailID"
                    // 7: "Citizen"
                    // 8: "Country"
                    // 9: "Province"
                    // 10: "Municipality"
                    // 11: "Have you been sick (cough, difficulty breathing, colds, sore throat, fever) in the past 14 days?"
                    // 12: "Have you been exposed to a confirmed case of COVID-19 in the past 14 days?"
                    // 13: "Have you been tested positive for COVID-19 using RT-PCR Test?"

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
                                    (x) => x.label.toLowerCase() == element[7].toLowerCase()
                                );
                                var _CountryofOrigin = country.filter(
                                    (x) => x.label.toLowerCase() == element[8].toLowerCase()
                                );

                                var provincearr = RawProvince.filter((x) => x.countryid == 2);
                                var provincedata = getdropdownarr(provincearr);
                                var _validateprovide = provincedata.filter(
                                    (x) => x.label.toLowerCase() == element[9].toLowerCase()
                                );
                                var _Province = RawProvince.filter(
                                    (x) =>
                                        x.description.toLowerCase() == element[9].toLowerCase()
                                );
                                var municipalityarr = RawMunicipality.filter(
                                    (x) => x.provinceid == _validateprovide[0].value
                                );
                                var municipalitydata = getdropdownarr(municipalityarr);
                                var _validmunicipality = municipalitydata.filter(
                                    (x) => x.label.toLowerCase() == element[10].toLowerCase()
                                );
                                var _Municipality = RawMunicipality.filter(
                                    (x) =>
                                        x.description.toLowerCase() == element[10].toLowerCase()
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
                                            sick: element[11].toString().toLowerCase(),
                                            confirmedcase: element[12].toString().toLowerCase(),
                                            testedpositive: element[13].toString().toLowerCase(),
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

                                        Citizen: _citizen[0].value.toString(),
                                        Citizendesc: _citizen[0].label.toString(),
                                        Country: _CountryofOrigin[0].value.toString(),
                                        Countrydesc: _CountryofOrigin[0].label.toString(),
                                        Province: _Province[0].id.toString(),
                                        Provincedesc: _Province[0].description.toString(),
                                        Municipality: _Municipality[0].id.toString(),
                                        Municipalitydesc: _Municipality[0].description.toString(),
                                        isvalidmunicipality: isvalidmunicipality,
                                        sick: element[11].toString().toLowerCase(),
                                        confirmedcase: element[12].toString().toLowerCase(),
                                        testedpositive: element[13].toString().toLowerCase(),
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
                element.Citizenship = bulkuploaddata[index].Citizen;
                element.CountryofOrigin = bulkuploaddata[index].Country;
                element.Municipality = bulkuploaddata[index].Municipality;
                element.Province = bulkuploaddata[index].Province;


                element.sick = bulkuploaddata[index].sick;
                element.confirmedcase = bulkuploaddata[index].confirmedcase;
                element.testedpositive = bulkuploaddata[index].testedpositive;

            }
        }
        setselectguest(0);

    };


    /*#endregion functions  */
    /*#region useeffect  */

    // default page load

    useEffect(() => {

        var ss = gacc;
        setLocalTravelInfoData(...localtravelinfodata, traveldata.data);
        getGender();
        getnumberofguest();
        Pageload();
        getTourType();
    }, []);

    useEffect(() => {

        if (tourtype.length > 0) {
            let ttype = tourtype.filter(x => x.value == 1);

            console.warn(ttype);
        }

    }, [tourtype])
    useEffect(() => {

        if (Array.isArray(localtravelinfodata)) {
        } else {
            var totalamount = 0;
            if (localtravelinfodata != undefined) {
                cacluate();
            }
        }
    }, [localtravelinfodata]);

    useEffect(() => {

        if (feesdata.data != undefined) {

            if (Array.isArray(localtravelinfodata)) {
            } else {

                var feesdatavalues = localtravelinfodata.fees;
                if (feesdatavalues.length > 0) {
                    for (let index = 0; index < feesdata.data.length; index++) {
                        var filterdata = feesdatavalues.filter(x => x.id == feesdata.data[index].id);
                        if (filterdata.length > 0) {
                            filterdata[0].amount = parseFloat(feesdata.data[index].price);
                            filterdata[0].rentprice = parseFloat(feesdata.data[index].rentprice);
                        }
                    }
                }

            }
        }
    }, [feesdata])

    useEffect(() => {
        if (Array.isArray(localtravelinfodata)) {

        } else {
            if (selectednumberguest != "" || selectednumberguest != undefined) {
                var guestdata = [];

                for (let index = 0; index < selectednumberguest; index++) {
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
                        sick: "no",
                        confirmedcase: "no",
                        testedpositive: "no",
                        age: 0,
                        discountproof: "",
                    };
                    if (index == 0) {
                        defaultguest.isprimary = true;
                    }
                    guestdata.push(defaultguest);
                }
                // setLocalTravelInfoData({
                //     ...localtravelinfodata,
                //     ["numberofguest"]: selectednumberguest,
                //     ["guestinfo"]: guestdata,
                // });
                setLocalTravelInfoData({
                    ...localtravelinfodata,
                    ["guestinfo"]: guestdata,

                });

            }
        }


    }, [selectednumberguest]);
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



    /*#endregion useeffect  */

    return (
        <>

            <CCardBody>

                <CRow>
                    <div className="col-md-8 mb-4" style={{ display: step1 == true ? "" : "none" }}>
                        <div className="card">
                            <form className="card-body">
                                <div >
                                    {/* Number of Guest and type tour */}
                                    <div className="row">
                                        {/*<!-Main-->*/}

                                        {/*<!--Grid column-->*/}
                                        <div className="col-lg-4 col-md-12 mb-4">
                                            <label >
                                                Number Of Guests  {selectedtourtype}
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
                                        <div className="col-lg-4 col-md-12 mb-4">
                                            <label >
                                                Tour Type
                                                <span style={{ color: "red" }}>
                                                    <sup>*</sup>
                                                </span>
                                            </label>
                                            <Select
                                                className="dropdown"
                                                value={tourtype.find(
                                                    (obj) => obj.value === selectedtourtype
                                                )}
                                                placeholder="Select"
                                                options={tourtype} // set list of the data
                                                onChange={handleChangeOptionTourType} // assign onChange function
                                            />
                                        </div>

                                    </div>
                                    {/* travel dates */}
                                    <div className="row">
                                        <div className="col-lg-4 col-md-12 mb-4">
                                            <label htmlFor="country">
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
                                        <div className="col-lg-4 col-md-12 mb-4" style={{ display: selectedtourtype == 1 ? "none" : "" }}>
                                            <label htmlFor="country">
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
                                    </div>
                                    {/* Travel destination */}
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 mb-12">
                                            <label >
                                                Destination
                                                <span style={{ color: "red" }}>
                                                    <sup>*</sup>
                                                </span>
                                            </label>
                                            <Select
                                                className="dropdown"
                                                placeholder="Select"
                                                isMulti
                                                value={localdestinationdata.find(
                                                    (obj) => obj.value === selecteddestination
                                                )} // set selected values
                                                options={localdestinationdata} // set list of the data
                                                onChange={handleChangeOptionDestination} // assign onChange function
                                            />
                                        </div>
                                    </div>
                                    <br></br>
                                    {/* Travel Time */}
                                    <div className="card">
                                        <div className="card-body">
                                            <h6> Sechdule </h6>
                                            <div className="col-lg-8 col-md-12 mb-4">
                                                <label htmlFor="guests">
                                                    Time of Arrival
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
                                    {/* Accommodation */}
                                    <div className="card" style={{ display: selectedtourtype == 1 ? "none" : "" }}>
                                        <div className="card-body">
                                            <h6>Hotel Details</h6>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 mb-6">
                                                    <label htmlFor="state">
                                                        Accommodation
                                                        <span style={{ color: "red" }}>
                                                            <sup>*</sup>
                                                        </span>
                                                    </label>
                                                    <Select
                                                        className="dropdown"
                                                        placeholder="Select Hotel"
                                                        value={selectedpreferredhotels} // set selected values
                                                        options={preferredhotels} // set list of the data
                                                        onChange={handleChangeOptionPH} // assign onChange function
                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-6 mb-6">
                                                    <label htmlFor="guests">
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
                                </div>
                                <div style={{ display: step1 == true ? "none" : "" }}>


                                </div>

                            </form>
                        </div>
                    </div>
                    <div className="col-md-8 mb-4" style={{ display: step1 == true ? "none" : "" }}>
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
                                            {/*<!--Grid column-->*/}
                                            <div className="col-lg-6 col-md-12 mb-4">
                                                <label htmlFor="guests">First name</label>
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
                                                <label htmlFor="guests">Last name</label>
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
                                                <label htmlFor="guests">Discount</label>
                                                <Select
                                                    className="dropdown"
                                                    value={discoutnType.find(
                                                        (obj) => obj.value === selectedDiscoutnType
                                                    )}
                                                    isClearable={true}
                                                    placeholder="Select"
                                                    options={discoutnType} // set list of the data
                                                    onChange={handleChangeOptionDiscoutnType} // assign onChange function
                                                />
                                            </div>
                                            <div className="col-lg-6 col-md-12 mb-4">
                                                <label htmlFor="guests">Proof</label>
                                                <input id="discountproof" style={{ color: "transparent" }} onChange={handleChange} type="file" name="myImage" accept="image/*" />
                                                {(() => {
                                                    const rows = [];

                                                    if (guestarr.discountproof != undefined) {
                                                        rows.push(
                                                            <>
                                                                <CCol xs="12" style={{ color: "green" }}>
                                                                    {guestarr.discountproof.name}
                                                                </CCol>
                                                            </>
                                                        );

                                                        return rows;
                                                    }
                                                })()}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-12 mb-4">
                                                <label htmlFor="guests">Date Of Birth</label>
                                                <DatePicker
                                                    value={selecteddob}
                                                    onChange={onChangeDateOfBirth}
                                                />
                                            </div>
                                            <div className="col-lg-6 col-md-12 mb-4">
                                                <label htmlFor="guests">Gender</label>
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

                                        <div className="row">
                                            <div className="col-lg-6 col-md-12 mb-4">
                                                <label htmlFor="guests">Citizenship</label>
                                                <Select
                                                    className="dropdown"
                                                    // isDisabled={
                                                    //     guestarr.isreturningguest == true
                                                    //         ? !guestarr.isguestvaildated
                                                    //         : false
                                                    // }
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
                                                <label htmlFor="guests">Country Of orgin</label>
                                                <Select
                                                    id="CountryofOrigin"
                                                    className="dropdown"
                                                    // isDisabled={
                                                    //     guestarr.isreturningguest == true
                                                    //         ? !guestarr.isguestvaildated
                                                    //         : false
                                                    // }
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
                                                <label htmlFor="guests">Province</label>
                                                <Select
                                                    className="dropdown"
                                                    placeholder="Select"
                                                    // isDisabled={
                                                    //     guestarr.isreturningguest == true
                                                    //         ? !guestarr.isguestvaildated
                                                    //         : false
                                                    // }
                                                    value={Province.find(
                                                        (obj) => obj.value === selectedProvince
                                                    )} // set selected values
                                                    options={Province} // set list of the data
                                                    onChange={handleChangeOptionProvince} // assign onChange function
                                                />
                                            </div>

                                            {/*<!--Grid column-->*/}
                                            <div className="col-lg-6 col-md-12 mb-4">
                                                <label htmlFor="guests">Municipality</label>
                                                <Select
                                                    className="dropdown"
                                                    placeholder="Select"
                                                    // isDisabled={
                                                    //     guestarr.isreturningguest == true
                                                    //         ? !guestarr.isguestvaildated
                                                    //         : false
                                                    // }
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
                                                <label htmlFor="guests">Address</label>
                                                <CInput
                                                    onChange={handleChange}
                                                    // disabled={
                                                    //     guestarr.isreturningguest == true
                                                    //         ? !guestarr.isguestvaildated
                                                    //         : false
                                                    // }
                                                    value={guestarr.Address}
                                                    type="text"
                                                    id="Address"
                                                    placeholder="Address"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-12 mb-4">
                                                <label htmlFor="guests">Mobile Number</label>
                                                <CInput
                                                    onChange={handleChange}
                                                    // disabled={
                                                    //     guestarr.isreturningguest == true
                                                    //         ? !guestarr.isguestvaildated
                                                    //         : false
                                                    // }
                                                    value={guestarr.Mobilenumber}
                                                    type="text"
                                                    id="Mobilenumber"
                                                    placeholder="Mobile "
                                                />
                                            </div>
                                            <div className="col-lg-6 col-md-12 mb-4">
                                                <label htmlFor="guests">E-mail Address</label>
                                                <CInput
                                                    onChange={handleChange}
                                                    // disabled={
                                                    //     guestarr.isreturningguest == true
                                                    //         ? !guestarr.isguestvaildated
                                                    //         : false
                                                    // }
                                                    value={guestarr.emailid}
                                                    type="text"
                                                    id="emailid"
                                                    placeholder="Email"
                                                />
                                            </div>
                                        </div>
                                        <strong>Health Information</strong>
                                        <CRow>
                                            <CCol md="12">
                                                <CLabel>Have you been sick (cough, difficulty breathing,
                                                    colds, sore throat, fever) in the past 14 days?</CLabel>
                                            </CCol>
                                        </CRow>
                                        <CFormGroup row>

                                            <CCol md="9">
                                                <CFormGroup variant="custom-radio" inline>
                                                    <CInputRadio custom id="sicky" checked={guestarr.sick == 'yes' ? true : false}
                                                        name="inline-radiosSickYesNo" value="yes" onChange={handleChangeRD} />
                                                    <CLabel variant="custom-checkbox" htmlFor="sicky">Yes</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="custom-radio" inline>
                                                    <CInputRadio custom id="sickn" name="inline-radiosSickYesNo" value="no" checked={guestarr.sick == 'no' ? true : false} onChange={handleChangeRD} />
                                                    <CLabel variant="custom-checkbox" htmlFor="sickn">No</CLabel>
                                                </CFormGroup>

                                            </CCol>
                                        </CFormGroup>

                                        <CRow>
                                            <CCol md="12">
                                                <CLabel>Have you been exposed to a confirmed case of
                                                    COVID-19 in the past 14 days?</CLabel>
                                            </CCol>
                                        </CRow>
                                        <CFormGroup row>

                                            <CCol md="9">
                                                <CFormGroup variant="custom-radio" inline>
                                                    <CInputRadio custom id="confirmedcasey" checked={guestarr.confirmedcase == 'yes' ? true : false}
                                                        name="inline-radiosConfirmedcaseYesNo" value="yes" onChange={handleChangeRD} />
                                                    <CLabel variant="custom-checkbox" htmlFor="confirmedcasey">Yes</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="custom-radio" inline>
                                                    <CInputRadio custom id="confirmedcasen" name="inline-radiosConfirmedcaseYesNo" value="no" checked={guestarr.confirmedcase == 'no' ? true : false} onChange={handleChangeRD} />
                                                    <CLabel variant="custom-checkbox" htmlFor="confirmedcasen">No</CLabel>
                                                </CFormGroup>

                                            </CCol>
                                        </CFormGroup>


                                        <CRow>
                                            <CCol md="12">
                                                <CLabel>Have you been tested positive for COVID-19 using
                                                    RT-PCR Test?</CLabel>
                                            </CCol>
                                        </CRow>
                                        <CFormGroup row>

                                            <CCol md="9">
                                                <CFormGroup variant="custom-radio" inline>
                                                    <CInputRadio custom id="testedpositivey" checked={guestarr.testedpositive == 'yes' ? true : false}
                                                        name="inline-radiosTestedPositiveYesNo" value="yes" onChange={handleChangeRD} />
                                                    <CLabel variant="custom-checkbox" htmlFor="testedpositivey">Yes</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="custom-radio" inline>
                                                    <CInputRadio custom id="testedpositiven" name="inline-radiosTestedPositiveYesNo" value="no" checked={guestarr.testedpositive == 'no' ? true : false} onChange={handleChangeRD} />
                                                    <CLabel variant="custom-checkbox" htmlFor="testedpositiven">No</CLabel>
                                                </CFormGroup>

                                            </CCol>
                                        </CFormGroup>


                                        <div className="row" >
                                            <div
                                                className="col-lg-8 col-md-12 mb-4"

                                            >
                                                <label htmlFor="guests">Vaccination Card :</label>
                                                <input id="filedata" style={{ color: "transparent" }} onChange={handleChange} type="file" name="myImage" accept="image/*" />
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
                                <ul className="list-group mb-3 z-depth-1">
                                    {localtravelinfodata.fees &&
                                        localtravelinfodata.fees.map((feedata, index) => {

                                            var guestno = localtravelinfodata.numberofguest;
                                            var totalamt = 0;
                                            var discountamt = 0;
                                            // var _guests = localtravelinfodata.guestinfo;

                                            let envAmt = (localtravelinfodata.fees.filter(x => x.id == 1).length > 0 ? localtravelinfodata.fees.filter(x => x.id == 1)[0].amount : 0) * guestno;
                                            let profee = (localtravelinfodata.fees.filter(x => x.id == 2).length > 0 ? localtravelinfodata.fees.filter(x => x.id == 2)[0].amount : 0) * guestno;
                                            let brafee = (localtravelinfodata.fees.filter(x => x.id == 3).length > 0 ? localtravelinfodata.fees.filter(x => x.id == 3)[0].amount : 0) * guestno;
                                            totalamt = (envAmt + profee + brafee);


                                            if (localtravelinfodata.guestinfo.length > 0) {

                                                for (let gind = 0; gind < localtravelinfodata.guestinfo.length; gind++) {
                                                    const element = localtravelinfodata.guestinfo[gind];
                                                    //if DOB current month and year then skip age vaildation
                                                    var today = new Date();
                                                    var dob = new Date(element.DOB);
                                                    var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));

                                                    // if (age > 60 || (age >= 0 && age <= 7)) {

                                                    // }


                                                    let discount = localtravelinfodata.guestinfo[gind]?.discountinfo;
                                                    if (discount?.value) {
                                                        let _envAmt = (localtravelinfodata.fees.filter(x => x.id == 1).length > 0 ? localtravelinfodata.fees.filter(x => x.id == 1)[0].amount : 0) * 1;
                                                        let _profee = (localtravelinfodata.fees.filter(x => x.id == 2).length > 0 ? localtravelinfodata.fees.filter(x => x.id == 2)[0].amount : 0) * 1;
                                                        let _brafee = (localtravelinfodata.fees.filter(x => x.id == 3).length > 0 ? localtravelinfodata.fees.filter(x => x.id == 3)[0].amount : 0) * 1;

                                                        let disamt = calculateSale((_envAmt + _profee + _brafee), discount?.discountValue);

                                                        localtravelinfodata.guestinfo[gind].isdiscountapplied = true;
                                                        localtravelinfodata.guestinfo[gind].discountamt = disamt;
                                                        discountamt = parseFloat(discountamt) + parseFloat(disamt);
                                                    }


                                                }

                                            }
                                            localtravelinfodata.finaldiscount = discountamt;
                                            totalamt = totalamt - discountamt;
                                            switch (feedata.id) {
                                                case 1:
                                                    return (
                                                        <>
                                                            <li className="list-group-item d-flex justify-content-between lh-condensed">

                                                                <div>
                                                                    <h6 className="my-0">{feedata.feefor}</h6>
                                                                    <sup
                                                                        style={{ fontSize: "10px" }}
                                                                        className="text-muted"
                                                                    >
                                                                        Environmental Tourism Fee
                                                                    </sup>
                                                                    <br></br>
                                                                    <small className="text-muted">
                                                                        {guestno} X {feedata.amount}
                                                                    </small>
                                                                </div>
                                                                <span className="text-muted">
                                                                    {(guestno * feedata.amount).toFixed(
                                                                        2
                                                                    )}
                                                                </span>
                                                            </li>
                                                        </>
                                                    );

                                                case 2:

                                                    return (
                                                        <>
                                                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                                                <div>
                                                                    <h6 className="my-0">{feedata.feefor}</h6>
                                                                    <sup
                                                                        style={{ fontSize: "10px" }}
                                                                        className="text-muted"
                                                                    >
                                                                        Processing Fee
                                                                    </sup>
                                                                    <br></br>
                                                                    <small className="text-muted">
                                                                        {guestno} X {feedata.amount}
                                                                    </small>
                                                                </div>
                                                                <span className="text-muted">
                                                                    {(guestno * feedata.amount).toFixed(
                                                                        2
                                                                    )}
                                                                </span>
                                                            </li>
                                                        </>
                                                    );
                                                case 3:
                                                    return (
                                                        <>
                                                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                                                <div>
                                                                    <h6 className="my-0">{feedata.feefor}</h6>
                                                                    <sup
                                                                        style={{ fontSize: "10px" }}
                                                                        className="text-muted"
                                                                    >
                                                                        Bracelet Fee
                                                                    </sup>
                                                                    <br></br>
                                                                    <small className="text-muted">
                                                                        {guestno} X {feedata.amount}
                                                                    </small>
                                                                </div>
                                                                <span className="text-muted">
                                                                    {(guestno * feedata.amount).toFixed(
                                                                        2
                                                                    )}
                                                                </span>

                                                            </li>
                                                        </>
                                                    );
                                                case 4:
                                                    return (
                                                        <>
                                                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                                                <div>
                                                                    <h6 className="my-0">{feedata.feefor}</h6>
                                                                </div>
                                                                <span className="text-muted">
                                                                    {(discountamt).toFixed(2)}
                                                                </span>
                                                            </li>
                                                        </>
                                                    );
                                                case 5:

                                                    return (

                                                        <>
                                                            <li className="list-group-item d-flex justify-content-between">
                                                                <strong>Total </strong>
                                                                <strong>{totalamt.toFixed(2)}</strong>
                                                            </li>
                                                        </>
                                                    );
                                                default:
                                                    break;
                                            }


                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </CRow>
                <div className="row" style={{ display: step1 == true ? "" : "none" }}>
                    <div className="col-md-6 mb-6"></div>
                    <div className="col-md-6 mb-6">
                        <CButton
                            block
                            onClick={() => nextstep()}
                            variant=""
                            color="primary"
                            style={{ backgroundColor: "white", color: "#007bff" }}
                        >
                            Next{" "}
                        </CButton>
                    </div>
                </div>
                <div className="row" style={{ display: step1 == true ? "none" : "" }}>
                    <div className="col-md-6 mb-6">
                        <CButton
                            block
                            onClick={() => backtomainpage()}
                            variant=""
                            color="primary"
                            style={{ backgroundColor: "white", color: "#007bff" }}
                        >
                            Back{" "}
                        </CButton>
                    </div>
                    <div className="col-md-6 mb-6">
                        <CButton
                            block
                            onClick={() => pay()}
                            variant=""
                            color="primary"
                            style={{ backgroundColor: "white", color: "#007bff" }}
                        >
                            Pay{" "}
                        </CButton>
                    </div>
                </div>
            </CCardBody>

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
                                <CCol xs="3" style={{ display: bookingdetail.tourType != 1 ? "" : "none" }}>
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

                                <CCol xs="3" style={{ display: bookingdetail.tourType != 1 ? "" : "none" }}>
                                    <CLabel>Accommodation</CLabel>
                                    <br></br>
                                    <CLabel>
                                        <b>{bookingdetail.hotel}</b>
                                    </CLabel>
                                </CCol>
                                <CCol xs="3" >
                                    <CLabel>Tour Type</CLabel>
                                    <br></br>
                                    <CLabel>
                                        <b>{bookingdetail.tourType == 1 ? 'Day ' : 'Stay '} Tour</b>
                                    </CLabel>
                                </CCol>
                                <CCol xs="3">
                                    <CLabel>Number Of Guest</CLabel>
                                    <br></br>
                                    <CLabel>
                                        <b>{bookingdetail.numberoofguest}</b>
                                    </CLabel>
                                </CCol>
                                <CCol xs="3" style={{ display: bookingdetail.fnlDiscount > 0 ? "" : "none" }}>
                                    <CLabel>Discoutn</CLabel>
                                    <br></br>
                                    <CLabel>
                                        <b>{bookingdetail.numberoofguest}</b>
                                    </CLabel>
                                </CCol>
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
                size="lg"
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
                                        {/* <th>Rent Bracelet</th>
                                        <th>Island Hopping</th> */}
                                        <th>Citizen</th>
                                        <th>Country</th>
                                        <th>Province</th>
                                        <th>Municipality</th>
                                        <th>Have you been sick (cough, difficulty breathing, colds, sore throat, fever) in the past 14 days?</th>
                                        <th>Have you been exposed to a confirmed case of COVID-19 in the past 14 days?</th>
                                        <th>Have you been tested positive for COVID-19 using RT-PCR Test?
                                        </th>
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
                                                            <td>{_uploadedfile.sick}</td>
                                                            <td>{_uploadedfile.confirmedcase}</td>
                                                            <td>{_uploadedfile.testedpositive}</td>

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

        </>
    );
}
export default NewTravelInfoBA;