(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[79],{1098:function(e,t,a){"use strict";a.r(t);var c=a(165),i=a(20),n=a(653),r=a(1),s=a(648),l=(a(660),a(661),a(649)),j=a(654),u=a(164),o=(a(658),a(763)),b=a(4),d=function(e,t,a){switch(e){case 1:u.b.success(t,{position:u.b.POSITION.TOP_CENTER});break;case 2:var c;c=void 0!==a?Object(b.jsxs)("div",{children:["Please contact to administrator!",Object(b.jsx)("br",{}),t]}):Object(b.jsx)("div",{children:t}),u.b.error(Object(b.jsxs)("div",{children:[Object(b.jsx)(l.a,{name:"cil-warning"})," Error",c]}),{position:u.b.POSITION.TOP_CENTER})}};t.default=function(){var e=Object(r.useState)([]),t=Object(n.a)(e,2),a=t[0],l=t[1],u=Object(r.useState)({value:""}),O=Object(n.a)(u,2),h=O[0],f=O[1],g=Object(r.useState)(window.location.host),x=Object(n.a)(g,2),v=x[0];x[1];return Object(r.useEffect)((function(){Object(j.a)("staticpage",{requestfor:"getstaticpages",data:{}}).then((function(e){if(1==e.resultkey){var t=e.resultvalue;if(t.length>0){var n=t.filter((function(e){return 6==e.id})),r="";n.length>0&&(r=n[0].pagedata),l(Object(i.a)(Object(i.a)({},a),{},{pagedata:r})),f(Object(i.a)(Object(i.a)({},h),{},Object(c.a)({},"value",r)))}}})).catch((function(e){d(2,e.toString(),1)}))}),[]),Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(s.ub,{children:Object(b.jsx)(s.u,{xl:12,children:Object(b.jsxs)(s.j,{children:[Object(b.jsxs)(s.n,{children:[Object(b.jsxs)(s.ub,{children:[Object(b.jsxs)(s.u,{xl:6,children:["FAQs",Object(b.jsx)("small",{className:"text-muted",children:" Master"})]}),Object(b.jsx)(s.u,{xl:6,style:{textAlign:"end"},children:Object(b.jsx)(s.f,{onClick:function(){return function(){if(""==h.value)d(2,"Please enter disclaimer !");else{var e=localStorage.getItem("userinfo");if(null!==e){var t=JSON.parse(e);Object(j.a)("staticpage",{requestfor:"addeditpage",data:{pageid:6,pagevalue:h.value.toString().replace(/[']/g,"**"),loginid:t.id}}).then((function(e){1==e.resultkey?d(1,"Data save successfully."):d(2,"Contact to administrator.")})).catch((function(e){}))}}}()},className:"mr-1",color:"primary",children:"Save"})})]}),Object(b.jsx)(s.ub,{children:Object(b.jsx)(s.u,{xl:6,children:Object(b.jsxs)("a",{href:"/#/faq",target:"blank",children:[v,"/#/faq"]})})})]}),Object(b.jsx)(s.k,{children:Object(b.jsx)(o.a,{value:h.value,initialValue:"",init:{selector:"textarea",menubar:!1,height:500,width:"100%",plugins:"lists",toolbar:"undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist |code"},onEditorChange:function(e){f(Object(i.a)(Object(i.a)({},h),{},Object(c.a)({},"value",e))),l(Object(i.a)(Object(i.a)({},a),{},{e:e}))}})})]})})})})}}}]);
//# sourceMappingURL=79.5b1ba752.chunk.js.map