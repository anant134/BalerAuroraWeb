(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[49],{1085:function(e,t,c){"use strict";c.r(t);var r=c(665),n=c(165),a=c(20),i=c(653),s=c(1),o=c(22),u=c(648),l=c(660),d=c.n(l),b=c(661),j=c.n(b),p=c(662),h=c(649),O=c(654),f=c(164),m=c(4),v=function(e,t,c){switch(e){case 1:f.b.success(t,{position:f.b.POSITION.TOP_CENTER});break;case 2:var r;r=void 0!==c?Object(m.jsxs)("div",{children:["Please contact to administrator!",Object(m.jsx)("br",{}),t]}):Object(m.jsx)("div",{children:t}),f.b.error(Object(m.jsxs)("div",{children:[Object(m.jsx)(h.a,{name:"cil-warning"})," Error",r]}),{position:f.b.POSITION.TOP_CENTER})}};t.default=function(){var e=[{name:"Country",selector:"country",sortable:!0},{name:"Province",selector:"description",sortable:!0},{name:"Status",selector:"isactive",sortable:!0,cell:function(e){return Object(m.jsx)(u.b,{color:"1"==e.isactive?"success":"danger",children:"1"==e.isactive?"Active":"In Active"})}},{name:"Action",selector:"action",ignoreRowClick:!0,cell:function(e){return Object(m.jsx)(h.a,{name:"cil-pencil",onClick:function(t){return W(e,t)},className:"mfe-2 custcusrsor"})}}],t=[],c=""==localStorage.getItem("userinfo")?"":JSON.parse(localStorage.getItem("userinfo")),l=(Object(o.g)(),Object(o.h)().search.match(/page=([0-9]+)/,"")),b=Number(l&&l[1]?l[1]:1),f=Object(s.useState)(b),x=Object(i.a)(f,2),g=(x[0],x[1],Object(s.useState)(!1)),y=Object(i.a)(g,2),k=y[0],w=y[1],S=Object(s.useState)(!1),C=Object(i.a)(S,2),N=C[0],I=(C[1],Object(s.useState)({columns:e,data:t})),P=Object(i.a)(I,2),T=P[0],A=P[1],E=Object(s.useState)([]),z=Object(i.a)(E,2),J=z[0],R=z[1],F=Object(s.useState)([]),M=Object(i.a)(F,2),_=M[0],q=M[1],D=Object(s.useState)({description:"",id:"",isactive:!0}),H=Object(i.a)(D,2),K=H[0],B=H[1],W=function(e,t){console.log(e),B((function(t){return Object(a.a)(Object(a.a)({},t),{},{description:e.description,id:e.id,isactive:e.isactive})})),q(parseInt(e.countryid)),w(!k)},$=function(e){var t=e.target,c=t.id,r=t.value;"checkbox"===e.target.type?B(Object(a.a)(Object(a.a)({},K),{},Object(n.a)({},c,1==e.target.checked&&e.target.checked))):B(Object(a.a)(Object(a.a)({},K),{},Object(n.a)({},c,r)))},L=function(){new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);0==K.description.length?v(2,"Please enter description !"):0==_?v(2,"Please select country !"):Object(O.a)("province",{requestfor:"province",data:{flag:""==K.id?"i":"u",description:K.description,countryid:_,loggedinid:c.id,isactive:K.isactive,id:K.id}}).then((function(e){if(1==e.resultkey)if(""!=K.id)!function(e){var t=J.filter((function(e){return e.value==_})),c=T.data.map((function(c){return c.id===e?Object(a.a)(Object(a.a)({},c),{},{description:K.description,isactive:K.isactive,countryid:_,country:t.length>0?t[0].label:""}):c}));A(Object(a.a)(Object(a.a)({},T),{},Object(n.a)({},"data",c))),V(),w(!k),v(1,"Data save successfully.")}(K.id);else{var t=e.resultvalue,c=J.filter((function(e){return e.value==_})),i={id:t.rowid,description:K.description,isactive:"1",countryid:_,country:c.length>0?c[0].label:""};A(Object(a.a)(Object(a.a)({},T),{},Object(n.a)({},"data",[].concat(Object(r.a)(T.data),[i])))),V(),v(1,"Data save successfully.")}})).catch((function(e){}))};Object(s.useEffect)((function(){Q(),U(),V()}),[]);var Q=function(){Object(O.a)("province",{requestfor:"getprovince",data:{flag:"a"}}).then((function(e){if(1==e.resultkey){var t=e.resultvalue;A(Object(a.a)(Object(a.a)({},T),{},Object(n.a)({},"data",t)))}})).catch((function(e){v(2,e.toString(),1)}))},U=function(){Object(O.a)("country",{requestfor:"getcountry",data:{flag:"actv"}}).then((function(e){if(1==e.resultkey){var t=e.resultvalue;if(t.length>0){for(var c=[{value:0,label:"Select Country"}],r=0;r<t.length;r++){var n=t[r];n.isactive&&c.push({value:parseInt(n.id),label:n.description})}R(c),console.log(c)}}})).catch((function(e){v(2,e.toString(),1)}))},V=function(){q(0),B((function(e){return Object(a.a)(Object(a.a)({},e),{},{description:"",id:"",isactive:!0})}))};return Object(m.jsx)(m.Fragment,{children:Object(m.jsx)(u.ub,{children:Object(m.jsx)(u.u,{xl:12,children:Object(m.jsxs)(u.j,{children:[Object(m.jsx)(u.n,{children:Object(m.jsxs)(u.ub,{children:[Object(m.jsxs)(u.u,{xl:6,children:["Province",Object(m.jsx)("small",{className:"text-muted",children:" Master"})]}),Object(m.jsx)(u.u,{xl:6,style:{textAlign:"end"},children:Object(m.jsx)(u.f,{onClick:function(){return V(),void w(!k)},className:"mr-1",color:"primary",children:"Add New"})})]})}),Object(m.jsxs)(u.k,{children:[Object(m.jsxs)(u.eb,{show:k,onClose:function(){return w(!k)},size:"lg",children:[Object(m.jsx)(u.hb,{closeButton:!0,children:Object(m.jsx)(u.ib,{children:"Province "})}),Object(m.jsx)(u.fb,{children:Object(m.jsx)(u.u,{md:"12",children:Object(m.jsxs)(u.J,{children:[Object(m.jsxs)(u.ub,{children:[Object(m.jsx)(u.u,{xs:"6",children:Object(m.jsx)(u.K,{row:!0,children:Object(m.jsx)(u.u,{xs:"12",children:Object(m.jsx)(p.a,{className:"dropdown",placeholder:"Select Role",value:J.find((function(e){return e.value===_})),options:J,onChange:function(e){q(e.value)}})})})}),Object(m.jsx)(u.u,{xs:"6",className:"text-right",children:Object(m.jsxs)(u.T,{className:"mb-3",children:[Object(m.jsx)(u.V,{children:Object(m.jsxs)(u.W,{children:[Object(m.jsx)(h.a,{name:"cil-envelope-letter",style:{color:"red"}}),Object(m.jsx)("sup",{style:{color:"red"},children:"*"})]})}),Object(m.jsx)(u.Q,{onChange:$,type:"text",value:K.description,id:"description",placeholder:"Enter Province"})]})})]}),Object(m.jsx)(u.ub,{children:Object(m.jsx)(u.u,{xs:"6",children:Object(m.jsx)(u.K,{row:!0,children:Object(m.jsx)(u.u,{md:"9",style:{display:""==K.id?"none":""},children:Object(m.jsxs)(u.K,{variant:"custom-checkbox",inline:!0,children:[Object(m.jsx)(u.R,{custom:!0,id:"isactive",name:"inline-checkbox2",value:0!=K.isactive,checked:0!=K.isactive,onChange:$}),Object(m.jsx)(u.ab,{variant:"custom-checkbox",htmlFor:"isactive",children:"Active"})]})})})})})]})})}),Object(m.jsxs)(u.gb,{children:[Object(m.jsx)(u.f,{color:"primary",disabled:N,onClick:function(){return L()},children:"Save"})," ",Object(m.jsx)(u.f,{color:"secondary",onClick:function(){return w(!k)},children:"Cancel"})]})]}),Object(m.jsx)(j.a,Object(a.a)(Object(a.a)({},T),{},{children:Object(m.jsx)(d.a,{noHeader:!0,defaultSortField:"id",defaultSortAsc:!1,pagination:!0,highlightOnHover:!0})}))]})]})})})})}},654:function(e,t,c){"use strict";var r=c(676),n=c.n(r),a=c(677),i=(c(659),function(){var e=Object(a.a)(n.a.mark((function e(t,c){var r,i;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)},i="https://maubantourism.smartpay.ph/tourbookingphp/"+t+".php",e.next=4,fetch(i,r).then(function(){var e=Object(a.a)(n.a.mark((function e(t){var c,r;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:if(c=e.sent,t.ok){e.next=8;break}return r=c&&c.message||t.status,e.abrupt("return",Promise.reject(r));case 8:return e.abrupt("return",c);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return Promise.reject(e)}));case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}());t.a=i},659:function(e,t,c){"use strict";var r,n;c(682);r="https://maubantourism.smartpay.ph",n="dev"==c(663).mode?{fileuploadurl:"/tourbookingphp/upload.php",guesttemplate:r+"/tourbookingphp/guesttemplate.xlsx",baseurl:r+"/tourbookingphp/"}:{fileuploadurl:"/tourbookingphp/upload.php",guesttemplate:"/tourbookingphp/guesttemplate.xlsx",baseurl:"/tourbookingphp/"},t.a=n},663:function(e){e.exports=JSON.parse('{"name":"@coreui/coreui-free-react-admin-template","version":"3.1.1","description":"Mauban","mode":"pro","author":{"name":"Mauban","url":"https://coreui.io","github":"https://github.com/coreui","twitter":"https://twitter.com/core_ui"},"contributors":[{"name":"CoreUI Team","url":"https://github.com/orgs/coreui/people"}],"homepage":".","copyright":"Copyright 2017-2020 creativeLabs \u0141ukasz Holeczek","license":"MIT","private":true,"repository":{"type":"git","url":"git@github.com:coreui/coreui-free-react-admin-template.git"},"dependencies":{"@coreui/chartjs":"^2.0.0","@coreui/coreui":"^3.4.0","@coreui/icons":"^2.0.0-rc.0","@coreui/icons-react":"^1.0.2","@coreui/react":"^3.3.4","@coreui/react-chartjs":"^1.0.1","@coreui/utils":"^1.3.1","@tinymce/tinymce-react":"^3.12.0","bootstrap":"^4.5.3","classnames":"^2.2.6","core-js":"^3.8.0","env-cmd":"^10.1.0","enzyme":"^3.11.0","enzyme-adapter-react-16":"^1.15.5","moment":"^2.29.1","node-sass":"^4.14.1","prop-types":"^15.7.2","react":"^16.14.0","react-app-polyfill":"^2.0.0","react-bootstrap":"^1.4.3","react-csv":"^2.0.3","react-data-table-component":"^6.11.6","react-data-table-component-extensions":"^1.5.0","react-date-picker":"^8.0.5","react-datepicker":"^3.6.0","react-dom":"^16.14.0","react-redux":"^7.2.2","react-router-dom":"^5.2.0","react-select":"^3.1.1","react-select-checked":"^0.1.12","react-time-picker":"^4.1.1","react-toastify":"^6.1.0","react-uuid":"^1.0.2","read-package-json":"^3.0.1","redux":"4.0.5","styled-components":"^5.2.1","xlsx":"^0.17.0"},"devDependencies":{"auto-changelog":"~2.2.1","react-scripts":"~4.0.1"},"scripts":{"start":"react-scripts start","build":"react-scripts build","test":"react-scripts test","test:cov":"npm test -- --coverage --watchAll=false","test:debug":"react-scripts --inspect-brk test --runInBand","eject":"react-scripts eject","changelog":"auto-changelog --starting-version 3.0.0 --commit-limit false --hide-credit"},"bugs":{"url":"https://github.com/coreui/coreui-free-react-admin-template/issues"},"eslintConfig":{"extends":"react-app"},"browserslist":[">0.2%","not dead","not ie <= 10","not op_mini all"],"jest":{"collectCoverageFrom":["src/**/*.{js,jsx}","!**/*index.js","!src/serviceWorker.js","!src/polyfill.js"]},"engines":{"node":">=10","npm":">=6"}}')},665:function(e,t,c){"use strict";c.d(t,"a",(function(){return a}));var r=c(672);var n=c(671);function a(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(n.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}}]);
//# sourceMappingURL=49.136d5c5b.chunk.js.map