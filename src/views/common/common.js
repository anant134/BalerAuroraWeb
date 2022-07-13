var readJson = require('read-package-json')
var data = require('../../../package.json')
var _host = "";
_host = "https://maubantourism.smartpay.ph";
let commondata;
if (data.mode == "dev") {
  commondata = {
    fileuploadurl: "/tourbookingphp/upload.php",
    guesttemplate: _host + "/tourbookingphp/guesttemplate.xlsx",
    //  filepath:_host+"/tourbooking/uploads/",
    baseurl: _host + "/tourbookingphp/",
  }
} else {

  commondata = {
    fileuploadurl: "/tourbookingphp/upload.php",
    guesttemplate: "/tourbookingphp/guesttemplate.xlsx",
    //  filepath:_host+"/tourbooking/uploads/",
    baseurl: "/tourbookingphp/",
  }
}

// _host=window.location.host;
//  const commondata = {
//      fileuploadurl:_host+"/tourbookingphp/upload.php",
//     //  filepath:_host+"/tourbooking/uploads/",
//      baseurl: _host+"/tourbookingphp/", 
//  }
//live
// const commondata = {
//     fileuploadurl:"/tourbookingphp/upload.php",
//    //  filepath:_host+"/tourbooking/uploads/",
//     baseurl: "/tourbookingphp/", 
// }
//staging
// const commondata = {
//     fileuploadurl:"/tourbookingphp/upload.php",
//    //  filepath:_host+"/tourbooking/uploads/",
//     baseurl: _host+"/tourbookingphp/", 
// }


//  const commondata = {
//          fileuploadurl:"/investorportalphp/upload.php",
//          filepath:"/investorportalphp/uploads/",
//          baseurl: "/investorportalphp/api.php", 
//      }







export default commondata
