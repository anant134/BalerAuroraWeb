(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[38],{1063:function(e,t,c){"use strict";c.r(t);var r=c(665),i=c(165),a=c(20),n=c(653),s=c(1),o=c(22),l=c(648),u=c(660),p=c.n(u),d=c(661),j=c.n(d),b=c(649),h=c(654),O=c(164),m=c(658),x=c(4),f=function(e,t,c){switch(e){case 1:O.b.success(t,{position:O.b.POSITION.TOP_CENTER});break;case 2:var r;r=void 0!==c?Object(x.jsxs)("div",{children:["Please contact to administrator!",Object(x.jsx)("br",{}),t]}):Object(x.jsx)("div",{children:t}),O.b.error(Object(x.jsxs)("div",{children:[Object(x.jsx)(b.a,{name:"cil-warning"})," Error",r]}),{position:O.b.POSITION.TOP_CENTER})}};t.default=function(){var e=[{name:"Description",selector:"description",sortable:!0},{name:"Price",selector:"price",sortable:!0},{name:"Rent Price",selector:"rentprice",sortable:!0},{name:"Status",selector:"isactive",sortable:!0,cell:function(e){return Object(x.jsx)(l.b,{color:"1"==e.isactive?"success":"danger",children:"1"==e.isactive?"Active":"In Active"})}},{name:"Action",selector:"action",ignoreRowClick:!0,cell:function(e){return Object(x.jsx)(b.a,{name:"cil-pencil",onClick:function(t){return J(e,t)},className:"mfe-2 custcusrsor"})}}],t=[],c=""==localStorage.getItem("userinfo")?"":JSON.parse(localStorage.getItem("userinfo")),u=(Object(o.g)(),Object(o.h)().search.match(/page=([0-9]+)/,"")),d=Number(u&&u[1]?u[1]:1),O=Object(s.useState)(d),g=Object(n.a)(O,2),v=(g[0],g[1],Object(s.useState)(!1)),y=Object(n.a)(v,2),k=y[0],w=y[1],S=Object(s.useState)(!1),C=Object(n.a)(S,2),N=C[0],F=(C[1],Object(s.useState)({columns:e,data:t})),T=Object(n.a)(F,2),I=T[0],P=T[1],A=Object(s.useState)({description:"",price:0,id:"",rentprice:0,isactive:!0}),E=Object(n.a)(A,2),z=E[0],R=E[1],J=function(e,t){console.log(e),R((function(t){return Object(a.a)(Object(a.a)({},t),{},{description:e.description,price:e.price,id:e.id,rentprice:e.rentprice,isactive:e.isactive})})),w(!k)},D=function(e){var t=e.target,c=t.id,r=t.value;"checkbox"===e.target.type?R(Object(a.a)(Object(a.a)({},z),{},Object(i.a)({},c,1==e.target.checked&&e.target.checked))):R(Object(a.a)(Object(a.a)({},z),{},Object(i.a)({},c,r)))},M=function(){new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);0==z.description.length?f(2,"Please enter description !"):0==z.price.length?f(2,"Please enter price !"):Object(h.a)("fees",{requestfor:"fees",data:{flag:""==z.id?"i":"u",description:z.description,price:z.price,rentprice:z.rentprice,loggedinid:c.id,isactive:z.isactive,id:z.id}}).then((function(e){if(1==e.resultkey)if(""!=z.id)!function(e){var t=I.data.map((function(t){return t.id===e?Object(a.a)(Object(a.a)({},t),{},{description:z.description,isactive:1==z.isactive?"1":"0",price:parseFloat(z.price).toFixed(2),rentprice:parseFloat(z.rentprice).toFixed(2)}):t}));P(Object(a.a)(Object(a.a)({},I),{},Object(i.a)({},"data",t))),_(),w(!k),f(1,"Data save successfully.")}(z.id);else{var t={id:e.resultvalue.rowid,description:z.description,isactive:"1",price:parseFloat(z.price).toFixed(2),rentprice:parseFloat(z.rentprice).toFixed(2)};P(Object(a.a)(Object(a.a)({},I),{},Object(i.a)({},"data",[].concat(Object(r.a)(I.data),[t])))),_(),f(1,"Data save successfully.")}})).catch((function(e){}))};Object(s.useEffect)((function(){W(),_()}),[]);var W=function(){Object(h.a)("fees",{requestfor:"getfees",data:{flag:"a"}}).then((function(e){if(1==e.resultkey){var t=e.resultvalue;P(Object(a.a)(Object(a.a)({},I),{},Object(i.a)({},"data",t)))}})).catch((function(e){f(2,e.toString(),1)}))},_=function(){R((function(e){return Object(a.a)(Object(a.a)({},e),{},{description:"",price:0,id:"",isactive:!0,rentprice:0})}))};return Object(x.jsx)(x.Fragment,{children:Object(x.jsx)(l.ub,{children:Object(x.jsx)(l.u,{xl:12,children:Object(x.jsxs)(l.j,{children:[Object(x.jsx)(l.n,{children:Object(x.jsxs)(l.ub,{children:[Object(x.jsxs)(l.u,{xl:6,children:["Fees",Object(x.jsx)("small",{className:"text-muted",children:" Master"})]}),Object(x.jsx)(l.u,{xl:6,style:{textAlign:"end"},children:Object(x.jsx)(l.f,{onClick:function(){return _(),void w(!k)},className:"mr-1",color:"primary",children:"Add New"})})]})}),Object(x.jsxs)(l.k,{children:[Object(x.jsxs)(l.eb,{show:k,onClose:function(){return w(!k)},size:"lg",children:[Object(x.jsx)(l.hb,{closeButton:!0,children:Object(x.jsx)(l.ib,{children:"User "})}),Object(x.jsx)(l.fb,{children:Object(x.jsx)(l.u,{md:"12",children:Object(x.jsxs)(l.J,{children:[Object(x.jsxs)(l.ub,{children:[Object(x.jsx)(l.u,{xs:"6",className:"text-right",children:Object(x.jsxs)(l.T,{className:"mb-3",children:[Object(x.jsx)(l.V,{children:Object(x.jsxs)(l.W,{children:[Object(x.jsx)(b.a,{name:"cil-envelope-letter",style:{color:"red"}}),Object(x.jsx)("sup",{style:{color:"red"},children:"*"})]})}),Object(x.jsx)(l.Q,{onChange:D,type:"text",value:z.description,id:"description",placeholder:"Enter description"})]})}),Object(x.jsx)(l.u,{xs:"6",children:Object(x.jsxs)(l.T,{className:"mb-4",children:[Object(x.jsx)(l.V,{children:Object(x.jsxs)(l.W,{children:[Object(x.jsx)(b.a,{name:"cil-lock-locked",style:{color:"red"}}),"price",Object(x.jsx)("sup",{style:{color:"red"},children:"*"})]})}),Object(x.jsx)(m.a,{onChange:D,type:"text",value:z.price,id:"price",placeholder:"Enter price"})]})})]}),Object(x.jsxs)(l.ub,{children:[Object(x.jsx)(l.u,{xs:"6",children:Object(x.jsxs)(l.T,{className:"mb-4",children:[Object(x.jsx)(l.V,{children:Object(x.jsxs)(l.W,{children:[Object(x.jsx)(b.a,{name:"cil-lock-locked",style:{color:"red"}}),"rent price",Object(x.jsx)("sup",{style:{color:"red"},children:"*"})]})}),Object(x.jsx)(m.a,{onChange:D,type:"text",value:z.rentprice,id:"rentprice",placeholder:"Enter rent price"})]})}),Object(x.jsx)(l.u,{xs:"6",children:Object(x.jsx)(l.K,{row:!0,children:Object(x.jsx)(l.u,{md:"9",style:{display:""==z.id?"none":""},children:Object(x.jsxs)(l.K,{variant:"custom-checkbox",inline:!0,children:[Object(x.jsx)(l.R,{custom:!0,id:"isactive",name:"inline-checkbox2",value:0!=z.isactive,checked:0!=z.isactive,onChange:D}),Object(x.jsx)(l.ab,{variant:"custom-checkbox",htmlFor:"isactive",children:"Active"})]})})})})]})]})})}),Object(x.jsxs)(l.gb,{children:[Object(x.jsx)(l.f,{color:"primary",disabled:N,onClick:function(){return M()},children:"Save"})," ",Object(x.jsx)(l.f,{color:"secondary",onClick:function(){return w(!k)},children:"Cancel"})]})]}),Object(x.jsx)(j.a,Object(a.a)(Object(a.a)({},I),{},{children:Object(x.jsx)(p.a,{noHeader:!0,defaultSortField:"id",defaultSortAsc:!1,pagination:!0,highlightOnHover:!0})}))]})]})})})})}},654:function(e,t,c){"use strict";var r=c(676),i=c.n(r),a=c(677),n=(c(659),function(){var e=Object(a.a)(i.a.mark((function e(t,c){var r,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)},n="https://maubantourism.smartpay.ph/tourbookingphp/"+t+".php",e.next=4,fetch(n,r).then(function(){var e=Object(a.a)(i.a.mark((function e(t){var c,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:if(c=e.sent,t.ok){e.next=8;break}return r=c&&c.message||t.status,e.abrupt("return",Promise.reject(r));case 8:return e.abrupt("return",c);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return Promise.reject(e)}));case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}());t.a=n},658:function(e,t,c){"use strict";c.d(t,"a",(function(){return p}));var r=c(20),i=c(168),a=c(169),n=c(171),s=c(170),o=c(1),l=c.n(o),u=c(4),p=function(e){Object(n.a)(c,e);var t=Object(s.a)(c);function c(e){var r;return Object(i.a)(this,c),(r=t.call(this,e)).change=function(e){r.start=e.target.selectionStart;var t=e.target.value;t=(t=t.replace(/([^0-9.]+)/,"")).replace(/^(0|\.)/,"");var c=/(\d{0,7})[^.]*((?:\.\d{0,2})?)/g.exec(t),i=c[1]+c[2];e.target.value=i,r.setState({input:i}),t.length>0&&(e.target.value=Number(i).toFixed(2),e.target.setSelectionRange(r.start,r.start),r.setState({input:Number(i).toFixed(2)}))},r.state={input:"",readonly:!1},r.start=0,r}return Object(a.a)(c,[{key:"render",value:function(){return Object(u.jsx)(u.Fragment,{children:Object(u.jsx)("input",Object(r.a)({type:"text",onBlur:this.blur,onChange:this.change,value:this.state.input,className:"form-control",readOnly:this.state.readonly},this.props))})}}]),c}(l.a.Component)},659:function(e,t,c){"use strict";var r,i;c(682);r="https://maubantourism.smartpay.ph",i="dev"==c(663).mode?{fileuploadurl:"/tourbookingphp/upload.php",guesttemplate:r+"/tourbookingphp/guesttemplate.xlsx",baseurl:r+"/tourbookingphp/"}:{fileuploadurl:"/tourbookingphp/upload.php",guesttemplate:"/tourbookingphp/guesttemplate.xlsx",baseurl:"/tourbookingphp/"},t.a=i},663:function(e){e.exports=JSON.parse('{"name":"@coreui/coreui-free-react-admin-template","version":"3.1.1","description":"Mauban","mode":"pro","author":{"name":"Mauban","url":"https://coreui.io","github":"https://github.com/coreui","twitter":"https://twitter.com/core_ui"},"contributors":[{"name":"CoreUI Team","url":"https://github.com/orgs/coreui/people"}],"homepage":".","copyright":"Copyright 2017-2020 creativeLabs \u0141ukasz Holeczek","license":"MIT","private":true,"repository":{"type":"git","url":"git@github.com:coreui/coreui-free-react-admin-template.git"},"dependencies":{"@coreui/chartjs":"^2.0.0","@coreui/coreui":"^3.4.0","@coreui/icons":"^2.0.0-rc.0","@coreui/icons-react":"^1.0.2","@coreui/react":"^3.3.4","@coreui/react-chartjs":"^1.0.1","@coreui/utils":"^1.3.1","@tinymce/tinymce-react":"^3.12.0","bootstrap":"^4.5.3","classnames":"^2.2.6","core-js":"^3.8.0","env-cmd":"^10.1.0","enzyme":"^3.11.0","enzyme-adapter-react-16":"^1.15.5","moment":"^2.29.1","node-sass":"^4.14.1","prop-types":"^15.7.2","react":"^16.14.0","react-app-polyfill":"^2.0.0","react-bootstrap":"^1.4.3","react-csv":"^2.0.3","react-data-table-component":"^6.11.6","react-data-table-component-extensions":"^1.5.0","react-date-picker":"^8.0.5","react-datepicker":"^3.6.0","react-dom":"^16.14.0","react-redux":"^7.2.2","react-router-dom":"^5.2.0","react-select":"^3.1.1","react-select-checked":"^0.1.12","react-time-picker":"^4.1.1","react-toastify":"^6.1.0","react-uuid":"^1.0.2","read-package-json":"^3.0.1","redux":"4.0.5","styled-components":"^5.2.1","xlsx":"^0.17.0"},"devDependencies":{"auto-changelog":"~2.2.1","react-scripts":"~4.0.1"},"scripts":{"start":"react-scripts start","build":"react-scripts build","test":"react-scripts test","test:cov":"npm test -- --coverage --watchAll=false","test:debug":"react-scripts --inspect-brk test --runInBand","eject":"react-scripts eject","changelog":"auto-changelog --starting-version 3.0.0 --commit-limit false --hide-credit"},"bugs":{"url":"https://github.com/coreui/coreui-free-react-admin-template/issues"},"eslintConfig":{"extends":"react-app"},"browserslist":[">0.2%","not dead","not ie <= 10","not op_mini all"],"jest":{"collectCoverageFrom":["src/**/*.{js,jsx}","!**/*index.js","!src/serviceWorker.js","!src/polyfill.js"]},"engines":{"node":">=10","npm":">=6"}}')},665:function(e,t,c){"use strict";c.d(t,"a",(function(){return a}));var r=c(672);var i=c(671);function a(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(i.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}}]);
//# sourceMappingURL=38.515caab4.chunk.js.map