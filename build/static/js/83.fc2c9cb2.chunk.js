(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[83],{1096:function(e,t,a){"use strict";a.r(t);var c=a(165),i=a(20),n=a(653),l=a(1),r=a(648),s=(a(660),a(661),a(649)),u=a(654),j=a(164),o=(a(658),a(763)),b=a(4),d=function(e,t,a){switch(e){case 1:j.b.success(t,{position:j.b.POSITION.TOP_CENTER});break;case 2:var c;c=void 0!==a?Object(b.jsxs)("div",{children:["Please contact to administrator!",Object(b.jsx)("br",{}),t]}):Object(b.jsx)("div",{children:t}),j.b.error(Object(b.jsxs)("div",{children:[Object(b.jsx)(s.a,{name:"cil-warning"})," Error",c]}),{position:j.b.POSITION.TOP_CENTER})}};t.default=function(){var e=Object(l.useState)([]),t=Object(n.a)(e,2),a=t[0],s=t[1],j=Object(l.useState)({value:""}),O=Object(n.a)(j,2),h=O[0],f=O[1],g=Object(l.useState)(window.location.host),x=Object(n.a)(g,2),p=x[0];x[1];return Object(l.useEffect)((function(){Object(u.a)("staticpage",{requestfor:"getstaticpages",data:{}}).then((function(e){if(1==e.resultkey){var t=e.resultvalue;if(t.length>0){var n=t.filter((function(e){return 4==e.id})),l="";n.length>0&&(l=n[0].pagedata),s(Object(i.a)(Object(i.a)({},a),{},{pagedata:l})),f(Object(i.a)(Object(i.a)({},h),{},Object(c.a)({},"value",l)))}}})).catch((function(e){d(2,e.toString(),1)}))}),[]),Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(r.ub,{children:Object(b.jsx)(r.u,{xl:12,children:Object(b.jsxs)(r.j,{children:[Object(b.jsxs)(r.n,{children:[Object(b.jsxs)(r.ub,{children:[Object(b.jsxs)(r.u,{xl:6,children:["Penalty Clause",Object(b.jsx)("small",{className:"text-muted",children:" Master"})]}),Object(b.jsx)(r.u,{xl:6,style:{textAlign:"end"},children:Object(b.jsx)(r.f,{onClick:function(){return function(){if(""==h.value)d(2,"Please enter disclaimer !");else{var e=localStorage.getItem("userinfo");if(null!==e){var t=JSON.parse(e);Object(u.a)("staticpage",{requestfor:"addeditpage",data:{pageid:4,pagevalue:h.value.toString().replace(/[']/g,"**"),loginid:t.id}}).then((function(e){1==e.resultkey?d(1,"Data save successfully."):d(2,"Contact to administrator.")})).catch((function(e){}))}}}()},className:"mr-1",color:"primary",children:"Save"})})]}),Object(b.jsx)(r.ub,{children:Object(b.jsx)(r.u,{xl:6,children:Object(b.jsxs)("a",{href:"/#/penaltyclause",target:"blank",children:[p,"/#/penaltyclause"]})})})]}),Object(b.jsx)(r.k,{children:Object(b.jsx)(o.a,{value:h.value,initialValue:"",init:{selector:"textarea",menubar:!1,height:500,width:"100%",plugins:"lists",toolbar:"undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist |code"},onEditorChange:function(e){f(Object(i.a)(Object(i.a)({},h),{},Object(c.a)({},"value",e))),s(Object(i.a)(Object(i.a)({},a),{},{e:e}))}})})]})})})})}}}]);
//# sourceMappingURL=83.fc2c9cb2.chunk.js.map