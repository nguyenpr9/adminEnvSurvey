(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22d728"],{f811:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("page-title",{attrs:{heading:e.heading,subheading:e.subheading,icon:e.icon}}),a("h1"),e.error?a("p",{staticClass:"text-center error"},[e._v(e._s(e.error))]):e._e(),[a("v-card",[a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"Title"},model:{value:e.title,callback:function(t){e.title=t},expression:"title"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"Description"},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-menu",{ref:"menu1",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,s=t.attrs;return[a("v-text-field",e._g(e._b({attrs:{label:"StartDate","persistent-hint":"",readonly:"","append-icon":"mdi-calendar"},model:{value:e.startDate,callback:function(t){e.startDate=t},expression:"startDate"}},"v-text-field",s,!1),n))]}}]),model:{value:e.menu1,callback:function(t){e.menu1=t},expression:"menu1"}},[a("v-date-picker",{attrs:{locale:"vi-vn","no-title":""},on:{input:function(t){e.menu1=!1}},model:{value:e.startDate,callback:function(t){e.startDate=t},expression:"startDate"}})],1)],1),a("v-col",{attrs:{cols:"12"}},[a("v-menu",{ref:"menu2",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,s=t.attrs;return[a("v-text-field",e._g(e._b({attrs:{label:"EndDate","persistent-hint":"",readonly:"","append-icon":"mdi-calendar"},model:{value:e.endDate,callback:function(t){e.endDate=t},expression:"endDate"}},"v-text-field",s,!1),n))]}}]),model:{value:e.menu2,callback:function(t){e.menu2=t},expression:"menu2"}},[a("v-date-picker",{attrs:{locale:"vi-vn","no-title":""},on:{input:function(t){e.menu2=!1}},model:{value:e.endDate,callback:function(t){e.endDate=t},expression:"endDate"}})],1)],1)],1),a("div",{staticClass:"ml-4"},[e._l(e.surveyQs,(function(t,n){return a("v-row",{key:n},[a("v-col",{attrs:{cols:"12"}},[a("span",{staticClass:"font-weight-bold"},[e._v(" Quest "+e._s(n)+": ")]),a("v-btn",{attrs:{color:"primary",small:""},on:{click:function(t){return e.removeSurveyQs(n)}}},[e._v(" Remove ")])],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"Number"},model:{value:t.number,callback:function(a){e.$set(t,"number",e._n(a))},expression:"question.number"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"Question"},model:{value:t.question,callback:function(a){e.$set(t,"question",a)},expression:"question.question"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-select",{attrs:{items:t.options.map((function(e){return e.value})),"item-text":"title","item-value":"value",label:"Answer"},model:{value:t.answer,callback:function(a){e.$set(t,"answer",e._n(a))},expression:"question.answer"}})],1),e._l(t.options,(function(t,s){return a("div",{key:s,staticClass:"ml-8"},[a("v-col",{attrs:{cols:"12"}},[a("span",{staticClass:"font-weight-bold"},[e._v(" Option "+e._s(s)+": ")]),a("v-btn",{attrs:{color:"primary",small:""},on:{click:function(t){return e.removeSurveyQsOp({index:n,index1:s})}}},[e._v(" Remove ")])],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{value:t.title,label:"Title"},on:{input:function(t){return e.updateSurveyQsOp({title:"title",value:t,qIndex:n,oIndex:s})}}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{value:t.value,label:"Value"},on:{input:function(t){return e.updateSurveyQsOp({title:"value",value:Number(t),qIndex:n,oIndex:s})}}})],1)],1)})),a("v-card-actions",[a("v-btn",{attrs:{color:"primary",small:""},on:{click:function(t){return e.addSurveyQsOp(n)}}},[e._v(" Add option ")])],1)],2)})),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary",small:""},on:{click:e.addSurveyQs}},[e._v(" Add question ")])],1)],2)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:"",to:"/survey"}},[e._v(" Back ")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.update}},[e._v(" Save ")])],1)],1)]],2)},s=[],r=a("5530"),o=a("c1df"),i=a.n(o),l=a("1a01"),c=a("2f62"),u=a("500f"),d=a("9fb0"),v=a("4360"),p=a("64e6");v["a"].state.survey||v["a"].registerModule("survey",p["c"]);var m=Object(c["a"])("survey"),f=m.mapActions,b=m.mapState,x=Object(c["a"])("survey/surveyQs"),y=x.mapMutations,k={name:"PageCreatePost",data:function(){return{menu1:!1,menu2:!1,startDateTmp:"",endDateTmp:"",editedIndex:-1,heading:"Create Faq",subheading:"Create Faq is show happy",icon:"pe-7s-notebook icon-gradient bg-mixed-hopes"}},created:function(){this.one(this.$route.params.id)},components:{PageTitle:l["a"]},methods:Object(r["a"])(Object(r["a"])(Object(r["a"])({},y({addSurveyQs:d["b"],addSurveyQsOp:d["a"],removeSurveyQs:d["e"],removeSurveyQsOp:d["d"],updateSurveyQsOp:"updateOptions"})),f({update:u["e"],one:u["d"]})),{},{formatDate:function(e){return e?i()(e).format("DD/MM/YYYY"):""}}),computed:Object(r["a"])(Object(r["a"])(Object(r["a"])({},b(["error","success"])),Object(p["a"])(["survey.title","survey.description","survey.startDate","survey.endDate","survey.questions"])),Object(p["b"])({surveyQs:"rows"})),watch:{startDateTmp:function(e){this.startDate=this.formatDate(e)},endDateTmp:function(e){this.endDate=this.formatDate(e)}}},h=k,D=a("2877"),_=a("6544"),w=a.n(_),O=a("8336"),S=a("b0af"),g=a("99d9"),Q=a("62ad"),C=a("a523"),V=a("2e4b"),q=a("e449"),j=a("0fd9"),T=a("b974"),A=a("2fa4"),I=a("8654"),M=Object(D["a"])(h,n,s,!1,null,"757b12f2",null);t["default"]=M.exports;w()(M,{VBtn:O["a"],VCard:S["a"],VCardActions:g["a"],VCardText:g["b"],VCol:Q["a"],VContainer:C["a"],VDatePicker:V["a"],VMenu:q["a"],VRow:j["a"],VSelect:T["a"],VSpacer:A["a"],VTextField:I["a"]})}}]);
//# sourceMappingURL=chunk-2d22d728.1cd61d0c.js.map