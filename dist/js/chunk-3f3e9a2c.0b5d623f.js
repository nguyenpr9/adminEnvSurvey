(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f3e9a2c"],{"169a":function(e,t,n){"use strict";n("7db0"),n("caad"),n("45fc"),n("a9e3"),n("2532"),n("498a");var i=n("5530"),a=n("2909"),s=n("ade3"),o=(n("368e"),n("480e")),r=n("4ad4"),c=n("b848"),l=n("75eb"),u=(n("3c93"),n("a9ad")),d=n("7560"),h=n("f2e7"),f=n("58df"),v=Object(f["a"])(u["a"],d["a"],h["a"]).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim:function(){var e=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",e)},classes:function(){return Object(i["a"])({"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive},this.themeClasses)},computedOpacity:function(){return Number(this.isActive?this.opacity:0)},styles:function(){return{zIndex:this.zIndex}}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-overlay__content"},this.$slots.default)}},render:function(e){var t=[this.__scrim];return this.isActive&&t.push(this.genContent()),e("div",{staticClass:"v-overlay",class:this.classes,style:this.styles},t)}}),m=v,g=n("80d2"),p=n("a026"),y=p["default"].extend().extend({name:"overlayable",props:{hideOverlay:Boolean,overlayColor:String,overlayOpacity:[Number,String]},data:function(){return{animationFrame:0,overlay:null}},watch:{hideOverlay:function(e){this.isActive&&(e?this.removeOverlay():this.genOverlay())}},beforeDestroy:function(){this.removeOverlay()},methods:{createOverlay:function(){var e=new m({propsData:{absolute:this.absolute,value:!1,color:this.overlayColor,opacity:this.overlayOpacity}});e.$mount();var t=this.absolute?this.$el.parentNode:document.querySelector("[data-app]");t&&t.insertBefore(e.$el,t.firstChild),this.overlay=e},genOverlay:function(){var e=this;if(this.hideScroll(),!this.hideOverlay)return this.overlay||this.createOverlay(),this.animationFrame=requestAnimationFrame((function(){e.overlay&&(void 0!==e.activeZIndex?e.overlay.zIndex=String(e.activeZIndex-1):e.$el&&(e.overlay.zIndex=Object(g["u"])(e.$el)),e.overlay.value=!0)})),!0},removeOverlay:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.overlay&&(Object(g["a"])(this.overlay.$el,"transitionend",(function(){e.overlay&&e.overlay.$el&&e.overlay.$el.parentNode&&!e.overlay.value&&(e.overlay.$el.parentNode.removeChild(e.overlay.$el),e.overlay.$destroy(),e.overlay=null)})),cancelAnimationFrame(this.animationFrame),this.overlay.value=!1),t&&this.showScroll()},scrollListener:function(e){if("keydown"===e.type){if(["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName)||e.target.isContentEditable)return;var t=[g["x"].up,g["x"].pageup],n=[g["x"].down,g["x"].pagedown];if(t.includes(e.keyCode))e.deltaY=-1;else{if(!n.includes(e.keyCode))return;e.deltaY=1}}(e.target===this.overlay||"keydown"!==e.type&&e.target===document.body||this.checkPath(e))&&e.preventDefault()},hasScrollbar:function(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;var t=window.getComputedStyle(e);return["auto","scroll"].includes(t.overflowY)&&e.scrollHeight>e.clientHeight},shouldScroll:function(e,t){return 0===e.scrollTop&&t<0||e.scrollTop+e.clientHeight===e.scrollHeight&&t>0},isInside:function(e,t){return e===t||null!==e&&e!==document.body&&this.isInside(e.parentNode,t)},checkPath:function(e){var t=e.path||this.composedPath(e),n=e.deltaY;if("keydown"===e.type&&t[0]===document.body){var i=this.$refs.dialog,a=window.getSelection().anchorNode;return!(i&&this.hasScrollbar(i)&&this.isInside(a,i))||this.shouldScroll(i,n)}for(var s=0;s<t.length;s++){var o=t[s];if(o===document)return!0;if(o===document.documentElement)return!0;if(o===this.$refs.content)return!0;if(this.hasScrollbar(o))return this.shouldScroll(o,n)}return!0},composedPath:function(e){if(e.composedPath)return e.composedPath();var t=[],n=e.target;while(n){if(t.push(n),"HTML"===n.tagName)return t.push(document),t.push(window),t;n=n.parentElement}return t},hideScroll:function(){this.$vuetify.breakpoint.smAndDown?document.documentElement.classList.add("overflow-y-hidden"):(Object(g["b"])(window,"wheel",this.scrollListener,{passive:!1}),window.addEventListener("keydown",this.scrollListener))},showScroll:function(){document.documentElement.classList.remove("overflow-y-hidden"),window.removeEventListener("wheel",this.scrollListener),window.removeEventListener("keydown",this.scrollListener)}}}),b=n("e4d3"),w=n("21be"),x=n("a293"),O=n("d9bd"),k=Object(f["a"])(r["a"],c["a"],l["a"],y,b["a"],w["a"],h["a"]);t["a"]=k.extend({name:"v-dialog",directives:{ClickOutside:x["a"]},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data:function(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200,previousActiveElement:null}},computed:{classes:function(){var e;return e={},Object(s["a"])(e,"v-dialog ".concat(this.contentClass).trim(),!0),Object(s["a"])(e,"v-dialog--active",this.isActive),Object(s["a"])(e,"v-dialog--persistent",this.persistent),Object(s["a"])(e,"v-dialog--fullscreen",this.fullscreen),Object(s["a"])(e,"v-dialog--scrollable",this.scrollable),Object(s["a"])(e,"v-dialog--animated",this.animate),e},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(e){var t;e?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null==(t=this.previousActiveElement)||t.focus())},fullscreen:function(e){this.isActive&&(e?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created:function(){this.$attrs.hasOwnProperty("full-width")&&Object(O["e"])("full-width",this)},beforeMount:function(){var e=this;this.$nextTick((function(){e.isBooted=e.isActive,e.isActive&&e.show()}))},beforeDestroy:function(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick:function(){var e=this;this.animate=!1,this.$nextTick((function(){e.animate=!0,window.clearTimeout(e.animateTimeout),e.animateTimeout=window.setTimeout((function(){return e.animate=!1}),150)}))},closeConditional:function(e){var t=e.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(t)||this.overlay&&t&&!this.overlay.$el.contains(t))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):y.options.methods.hideScroll.call(this)},show:function(){var e=this;!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((function(){e.$nextTick((function(){e.previousActiveElement=document.activeElement,e.$refs.content.focus(),e.bind()}))}))},bind:function(){window.addEventListener("focusin",this.onFocusin)},unbind:function(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside:function(e){this.$emit("click:outside",e),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown:function(e){if(e.keyCode===g["x"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var t=this.getActivator();this.$nextTick((function(){return t&&t.focus()}))}this.$emit("keydown",e)},onFocusin:function(e){if(e&&this.retainFocus){var t=e.target;if(t&&![document,this.$refs.content].includes(t)&&!this.$refs.content.contains(t)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((function(e){return e.contains(t)}))){var n=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),i=Object(a["a"])(n).find((function(e){return!e.hasAttribute("disabled")}));i&&i.focus()}}},genContent:function(){var e=this;return this.showLazyContent((function(){return[e.$createElement(o["a"],{props:{root:!0,light:e.light,dark:e.dark}},[e.$createElement("div",{class:e.contentClasses,attrs:Object(i["a"])({role:"document",tabindex:e.isActive?0:void 0},e.getScopeIdAttrs()),on:{keydown:e.onKeydown},style:{zIndex:e.activeZIndex},ref:"content"},[e.genTransition()])])]}))},genTransition:function(){var e=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[e]):e},genInnerContent:function(){var e={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(e.style=Object(i["a"])(Object(i["a"])({},e.style),{},{maxWidth:"none"===this.maxWidth?void 0:Object(g["g"])(this.maxWidth),width:"auto"===this.width?void 0:Object(g["g"])(this.width)})),this.$createElement("div",e,this.getContentSlot())}},render:function(e){return e("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach},attrs:{role:"dialog"}},[this.genActivator(),this.genContent()])}})},"368e":function(e,t,n){},"3c93":function(e,t,n){},"999c":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",[n("page-title",{attrs:{heading:e.heading,subheading:e.subheading,icon:e.icon}}),n("v-card-title",[n("v-text-field",{attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),n("v-spacer"),n("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:"",to:{name:"CreateFaq"}}},[n("v-icon",[e._v("mdi-plus")]),e._v(" New Item ")],1)],1),n("v-data-table",{staticClass:"elevation-1",attrs:{"must-sort":"",search:e.search,headers:e.headers,items:e.items,loading:e.loading,page:e.page,"items-per-page":e.itemsPerPage,"hide-default-footer":"","no-data-text":"Không có dữ liệu","no-results-text":"Không có kết quả"},on:{"update:page":function(t){e.page=t},pagination:function(t){e.itemsLength=t.itemsLength}},scopedSlots:e._u([{key:"item.status",fn:function(e){var t=e.item;return[n("toggle-button",{attrs:{id:"changed-font",speed:480,readonly:"",sync:!0,value:1===t.status}})]}},{key:"item.actions",fn:function(t){var i=t.item;return[n("v-icon",{attrs:{small:""},on:{click:function(t){return e.deleteItem(i)}}},[e._v(" mdi-delete ")]),n("v-btn",{attrs:{small:"",icon:"",to:{name:"UpdateFaq",params:{id:i.id}}}},[n("v-icon",{attrs:{small:""}},[e._v(" mdi-pencil ")])],1)]}}])}),n("div",{staticClass:"div-center"},[n("b-pagination",{staticClass:"div-center",attrs:{"total-rows":e.itemsLength,"per-page":e.itemsPerPage},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}})],1),n("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}},[n("v-card",[n("v-card-title",{staticClass:"headline"},[e._v("Are you sure you want to delete this item?")]),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeDelete}},[e._v("Cancel")]),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.deleteItemConfirm}},[e._v("OK")]),n("v-spacer")],1)],1)],1)],1)},a=[],s=(n("96cf"),n("1da1")),o=n("5530"),r=n("f206"),c=n("2f62"),l=n("1a01"),u=n("4360"),d=n("c158"),h=n("500f"),f=Object(c["a"])("faq"),v=f.mapActions;u["a"].state.faq||u["a"].registerModule("faq",d["a"]);var m={name:"Faq",components:{PageTitle:l["a"],ToggleButton:r["ToggleButton"]},data:function(){return{dialogDelete:!1,heading:"Faq",subheading:"manager faq",icon:"pe-7s-notebook icon-gradient bg-mixed-hopes",loading:!0,search:null,page:1,pageCount:0,itemsLength:this.$store.state.faq.data.length,itemsPerPage:10,headers:[{value:"id",text:"Id"},{value:"question",text:"Question"},{value:"answer",text:"Answer"},{value:"status",text:"Status"},{value:"actions",text:"Action",sortable:!1}]}},computed:{formTitle:function(){return-1===this.editedIndex?"New Faq":"Edit Faq"},items:{get:function(){return this.$store.state.faq.data},set:function(e){this.value=e}}},mounted:function(){this.fetchData()},created:function(){},methods:Object(o["a"])(Object(o["a"])({},v({delete:h["c"],all:h["a"]})),{},{fetchData:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.all();case 3:e.loading=!1;case 4:case"end":return t.stop()}}),t)})))()},updateStatusItem:function(e,t){this.$store.dispatch("user/changeStatusFaqs",{status:t,id:e})},deleteItem:function(e){this.editedIndex=e.id,this.dialogDelete=!0},deleteItemConfirm:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.delete(e.editedIndex);case 2:return t.next=4,e.all();case 4:e.closeDelete();case 5:case"end":return t.stop()}}),t)})))()},closeDelete:function(){var e=this;this.dialogDelete=!1,this.$nextTick((function(){e.editedIndex=-1}))}}),watch:{dialogDelete:function(e){e||this.closeDelete()}}},g=m,p=n("2877"),y=n("6544"),b=n.n(y),w=n("8336"),x=n("b0af"),O=n("99d9"),k=n("8fea"),C=n("169a"),A=n("132d"),S=n("2fa4"),$=n("8654"),j=Object(p["a"])(g,i,a,!1,null,null,null);t["default"]=j.exports;b()(j,{VBtn:w["a"],VCard:x["a"],VCardActions:O["a"],VCardTitle:O["c"],VDataTable:k["a"],VDialog:C["a"],VIcon:A["a"],VSpacer:S["a"],VTextField:$["a"]})},c158:function(e,t,n){"use strict";n.d(t,"b",(function(){return x})),n.d(t,"a",(function(){return k}));var i=n("ade3"),a=(n("96cf"),n("1da1")),s=(n("dca8"),n("d4ec")),o=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.question,i=void 0===n?"":n,a=t.answer,o=void 0===a?"":a;Object(s["a"])(this,e),this.question=i,this.answer=o,this.status=1};function r(e){return Object.freeze(new o(e.faq))}var c,l,u=n("5935"),d=n("9fb0"),h=n("500f"),f=n("4012"),v=n("a18c"),m=f["a"].get("faq"),g=function(){return{error:!1,success:!1,faq:new o,data:[],flag:!1,isBusy:!0}},p=(c={},Object(i["a"])(c,h["a"],(function(e){return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,n("setIsBusy",!0),t.next=4,m.getAll();case 4:i=t.sent,i.status?n("fetchData",i.data):n(d["c"],i.message),n("setIsBusy",!1);case 7:case"end":return t.stop()}}),t)})))()})),Object(i["a"])(c,h["d"],(function(e,t){return Object(a["a"])(regeneratorRuntime.mark((function n(){var i,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=e.commit,i("setIsBusy",!0),n.next=4,m.getOne(t);case 4:a=n.sent,a.status?i("SETFAQ",a.data):i(d["c"],a.message),i("setIsBusy",!1);case 7:case"end":return n.stop()}}),n)})))()})),Object(i["a"])(c,h["b"],(function(e){return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,i,a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,i=e.state,a=r({faq:i.faq}),t.next=4,m.create(a);case 4:if(s=t.sent,!s.status){t.next=10;break}return t.next=8,v["a"].push("/faq");case 8:t.next=11;break;case 10:n(d["c"],s.message);case 11:case"end":return t.stop()}}),t)})))()})),Object(i["a"])(c,h["e"],(function(e){return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,i,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,i=e.state,t.next=3,m.update(i.faq);case 3:if(a=t.sent,!a.status){t.next=9;break}return t.next=7,v["a"].push("/faq");case 7:t.next=10;break;case 9:n(d["c"],a.message);case 10:case"end":return t.stop()}}),t)})))()})),Object(i["a"])(c,h["c"],(function(e,t){return Object(a["a"])(regeneratorRuntime.mark((function n(){var i,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=e.commit,n.next=3,m.delete(t);case 3:a=n.sent,a.status?i(d["f"],a.message):i(d["c"],a.message);case 5:case"end":return n.stop()}}),n)})))()})),c),y=(l={updateField:u["c"],updateFaq:function(e,t){e.data[t.index][t.item]=t.value?1:0},fetchData:function(e,t){e.data=t},SETFAQ:function(e,t){e.faq=t},setIsBusy:function(e,t){e.isBusy=t},RESETFAQ:function(e){e.faq=new o}},Object(i["a"])(l,d["c"],(function(e,t){e.error=t,e.success=!1})),Object(i["a"])(l,d["f"],(function(e){e.error=!1,e.success=!0})),l),b={getField:u["b"]},w=Object(u["a"])({getterType:"faq/getField",mutationType:"faq/updateField"}),x=w.mapFields,O=Object(u["a"])({getterType:"faq/getField",mutationType:"faq/updateField"}),k=(O.mapMultiRowFields,{namespaced:!0,actions:p,mutations:y,getters:b,state:g})}}]);
//# sourceMappingURL=chunk-3f3e9a2c.0b5d623f.js.map