import{C as Z,b as le,U as Ve,R as ne,l as Ne,_ as Oe,B as V,a as Ie,T as N,D as je,c as Pe}from"./maska-702f4c00.js";import{d as H,r as s,w,_ as K,a as p,u as Je,o as S,h as I,f as v,q as j,b as _,c as F,j as Q,v as oe,e as r,x as he,i as O,g as T,m as ze,t as x,p as Le,k as qe,l as ve,n as He,s as Ke,F as We}from"./index-58b4ec5e.js";import{E as Ge}from"./EditUserModal-8c8eee6b.js";const Qe=H({components:{CustomButton:Z,CustomModal:le},props:{modalTitle:{type:String,default:"Создать нового пользователя"},modalActive:{type:Boolean,default:!1},toggleModal:{type:Function,required:!0},errorMessage:String,brands:Array,branches:Array},setup(e){const t=s(""),d=s(""),u=s(""),h=s(""),g=s(),c=s([]),m=s(!1);w(()=>e.modalActive,()=>{t.value="",d.value="",u.value="",h.value="",g.value=void 0,c.value=[],m.value=!1});const B=(k,l)=>l.label.toLowerCase().indexOf(k.toLowerCase())>=0,a=k=>{h.value=k,M()},i=k=>{g.value=k,M()},U=k=>{c.value=k,M()},M=()=>{t.value.length>0&&d.value.length>0&&u.value.length==16&&h.value.length>0&&(h.value=="owner"||g.value&&c.value.length>0)?m.value=!0:m.value=!1};return{firstName:t,lastName:d,telephoneNumber:u,selectedRole:h,selectedBranchId:g,selectedBrandsIds:c,filterOption:B,onRoleSelected:a,onBranchSelected:i,onBrandSelected:U,validate:M,isAllDataEntered:m}},directives:{maska:Ve},data(){return{maskedValue:"",bindedObject:{masked:"",unmasked:"",completed:!1},roleOptions:ne}},methods:{onCreateButtonClick(){this.$emit("createUser",{firstName:this.firstName,lastName:this.lastName,telephoneNumber:this.telephoneNumber,role:this.selectedRole,brand_ids:this.selectedBrandsIds,branch_id:this.selectedBranchId})}}});const Xe={class:"modal-content"},Ye={class:"button-box"};function Ze(e,t,d,u,h,g){const c=p("a-select"),m=p("a-alert"),B=p("CustomButton"),a=p("CustomModal"),i=Je("maska");return S(),I(a,{onClose:j(e.toggleModal,["prevent"]),modalActive:e.modalActive,"modal-title":e.modalTitle},{default:v(()=>{var U,M,k;return[_("div",Xe,[(S(),F("form",{onSubmit:t[12]||(t[12]=j((...l)=>e.onCreateButtonClick&&e.onCreateButtonClick(...l),["prevent"])),key:e.modalActive.toString()},[Q(_("input",{placeholder:"Имя",type:"text","onUpdate:modelValue":t[0]||(t[0]=l=>e.firstName=l),onInput:t[1]||(t[1]=(...l)=>e.validate&&e.validate(...l)),class:"inputFirstName"},null,544),[[oe,e.firstName]]),Q(_("input",{placeholder:"Фамилия",type:"text","onUpdate:modelValue":t[2]||(t[2]=l=>e.lastName=l),onInput:t[3]||(t[3]=(...l)=>e.validate&&e.validate(...l)),class:"inputLastName"},null,544),[[oe,e.lastName]]),Q(_("input",{placeholder:"+7 ___ ___ __ __","data-maska":"+7 ### ### ## ##","onUpdate:modelValue":t[4]||(t[4]=l=>e.telephoneNumber=l),onInput:t[5]||(t[5]=(...l)=>e.validate&&e.validate(...l)),class:"inputTelephone"},null,544),[[i],[oe,e.telephoneNumber]]),r(c,{modelValue:e.selectedRole,"onUpdate:modelValue":t[6]||(t[6]=l=>e.selectedRole=l),placeholder:"Выберите роль",style:{width:"100%"},options:e.roleOptions.map(l=>({label:l.text,value:l.value})),onChange:t[7]||(t[7]=l=>e.onRoleSelected(l))},null,8,["modelValue","options"]),Q(r(c,{modelValue:e.selectedBranchId,"onUpdate:modelValue":t[8]||(t[8]=l=>e.selectedBranchId=l),"show-search":"",placeholder:"Выберите филиал",style:{width:"100%",margin:"24px auto"},options:(U=e.branches)==null?void 0:U.map(l=>({label:l.title.toString(),value:l.id.toString()})),"filter-option":e.filterOption,onChange:t[9]||(t[9]=l=>e.onBranchSelected(l))},null,8,["modelValue","options","filter-option"]),[[he,e.selectedRole=="branch_director"||e.selectedRole=="sales_manager"]]),Q(r(c,{modelValue:e.selectedBrandsIds,"onUpdate:modelValue":t[10]||(t[10]=l=>e.selectedBrandsIds=l),mode:"multiple","show-search":"",placeholder:"Выберите бренд",class:"selector-with_multiple-select",options:(M=e.brands)==null?void 0:M.map(l=>({label:l.title.toString(),value:l.id.toString()})),"filter-option":e.filterOption,onChange:t[11]||(t[11]=l=>e.onBrandSelected(l)),showArrow:""},null,8,["modelValue","options","filter-option"]),[[he,e.selectedRole=="branch_director"||e.selectedRole=="sales_manager"]]),(((k=e.errorMessage)==null?void 0:k.length)??0)>0?(S(),I(m,{key:0,type:"error",style:{"margin-top":"16px"},message:e.errorMessage,"show-icon":""},null,8,["message"])):O("",!0),_("div",Ye,[r(B,{onClick:e.toggleModal,type:"button","additional-styles":{color:"#333",border:"1px solid #999",opacity:"0.5",background:"#FFF"}},{default:v(()=>[T(" Закрыть ")]),_:1},8,["onClick"]),r(B,{type:"submit","additional-styles":{opacity:`${e.isAllDataEntered?"1":"0.5"}`},disabled:!e.isAllDataEntered},{default:v(()=>[T(" Создать ")]),_:1},8,["additional-styles","disabled"])])],32))])]}),_:1},8,["onClose","modalActive","modal-title"])}const xe=K(Qe,[["render",Ze],["__scopeId","data-v-e2ab15a9"]]),et=H({name:"ActionsBlock",props:{branches:Array,brands:Array,allSelected:Boolean,selectedUsers:Array},setup(e,{emit:t}){const d=s([]),u=s([]),h=s([]),g=s(e.allSelected);return w(d,U=>{t("updateRolesFilter",U)}),w(u,U=>{console.log("branches",e.branches),t("updateBrandsFilter",U)}),w(h,U=>{t("updateBranchesFilter",U)}),w(()=>e.allSelected,U=>{g.value=U}),{selectedRoles:d,selectedBrands:u,selectedBranches:h,allSelected:g,toggleAll:()=>{t("toggleAll")},handleEditRole:()=>{t("editRoleClicked")},handleEditBranch:()=>{t("editBranchClicked")},handleEditBrand:()=>{t("editBrandClicked")},handleDeleteUsers:()=>{t("deleteUserClicked")},roleOptions:ne}}});const tt={class:"outer_actions_block"},ot={class:"actions_first_block"},lt=_("span",{class:"deleteText"},"Удалить",-1),nt={class:"actions_inner_cards"},at={key:0,class:"innerSpan"},st={key:0,class:"innerSpan"},rt={key:0,class:"innerSpan"};function dt(e,t,d,u,h,g){var l,R;const c=p("v-checkbox"),m=p("v-icon"),B=p("v-btn"),a=p("v-list-item-content"),i=p("v-list-item"),U=p("v-list"),M=p("v-menu"),k=p("v-select");return S(),F("div",tt,[_("div",ot,[r(c,{color:"#1CB5C2",style:{"padding-left":"0"},modelValue:e.allSelected,"onUpdate:modelValue":t[0]||(t[0]=b=>e.allSelected=b),onChange:e.toggleAll},null,8,["modelValue","onChange"]),r(M,null,{activator:v(({props:b})=>{var D,W;return[r(B,ze({color:"primary"},b,{variant:(((D=e.selectedUsers)==null?void 0:D.length)??0)>0?"tonal":"text",disabled:(((W=e.selectedUsers)==null?void 0:W.length)??0)===0,style:{width:"270px","text-align":"left"}}),{default:v(()=>{var G,P,J;return[T(x((((G=e.selectedUsers)==null?void 0:G.length)??0)>0?"Выбрано пользователей "+(((P=e.selectedUsers)==null?void 0:P.length)??0)+"  ":"Выбрать все")+" ",1),(((J=e.selectedUsers)==null?void 0:J.length)??0)>0?(S(),I(m,{key:0},{default:v(()=>[T("mdi-chevron-down")]),_:1})):O("",!0)]}),_:2},1040,["variant","disabled"])]}),default:v(()=>[r(U,null,{default:v(()=>[r(i,{onClick:e.handleEditRole},{default:v(()=>[r(a,null,{default:v(()=>[T("Поменять роль")]),_:1})]),_:1},8,["onClick"]),r(i,{onClick:e.handleEditBranch},{default:v(()=>[r(a,null,{default:v(()=>[T("Поменять филиал")]),_:1})]),_:1},8,["onClick"]),r(i,{onClick:e.handleEditBrand},{default:v(()=>[r(a,null,{default:v(()=>[T("Поменять бренд")]),_:1})]),_:1},8,["onClick"]),r(i,{onClick:e.handleDeleteUsers},{default:v(()=>[r(a,null,{default:v(()=>[lt]),_:1})]),_:1},8,["onClick"])]),_:1})]),_:1})]),_("div",nt,[r(k,{modelValue:e.selectedRoles,"onUpdate:modelValue":t[1]||(t[1]=b=>e.selectedRoles=b),items:e.roleOptions,"item-title":"text","item-value":"value",multiple:"",chip:"","small-chips":"",style:{width:"144px"},placeholder:"Роли",variant:"outlined",color:"#1CB5C2","bg-color":"#00000000","placeholder-color":"red",class:"demo"},{selection:v(({index:b})=>[b===0?(S(),F("span",at,"Роли")):O("",!0)]),_:1},8,["modelValue","items"]),r(k,{modelValue:e.selectedBrands,"onUpdate:modelValue":t[2]||(t[2]=b=>e.selectedBrands=b),items:(l=e.brands)==null?void 0:l.map(b=>({text:b.title.toString(),value:b.id.toString()})),"item-title":"text","item-value":"value",multiple:"",chip:"","small-chips":"",style:{width:"144px"},placeholder:"Бренды",variant:"outlined",color:"#1CB5C2","bg-color":"#00000000","placeholder-color":"red"},{selection:v(({index:b})=>[b===0?(S(),F("span",st,"Бренд")):O("",!0)]),_:1},8,["modelValue","items"]),r(k,{modelValue:e.selectedBranches,"onUpdate:modelValue":t[3]||(t[3]=b=>e.selectedBranches=b),items:(R=e.branches)==null?void 0:R.map(b=>({text:b.title.toString(),value:b.id.toString()})),"item-title":"text","item-value":"value",multiple:"",chip:"","small-chips":"",style:{width:"144px"},placeholder:"Филиал",variant:"outlined",color:"#1CB5C2","bg-color":"#00000000","placeholder-color":"red"},{selection:v(({index:b})=>[b===0?(S(),F("span",rt,"Филиалы")):O("",!0)]),_:1},8,["modelValue","items"])])])}const ge=K(et,[["render",dt]]),ut=H({name:"HeaderBar",components:{ActionsBlock:ge,CustomButton:Z},props:{isCreate:{type:Boolean,default:!1},handleSearch:{type:Function,required:!0},branches:Array,brands:Array,allSelected:Boolean,selectedUsers:Array},data(){},setup(e,{emit:t}){const d=s(""),u=s(e.allSelected),h=Ne.debounce(l=>{e.handleSearch(l)},700),g=l=>{d.value=l,h(l)};return w(()=>e.allSelected,l=>{u.value=l}),{inputValue:d,allSelected:u,handleInput:g,handleUpdateRolesFilter:l=>{t("updateRolesFilter",l)},handleUpdateBrandsFilter:l=>{t("updateBrandsFilter",l)},handleUpdateBranchesFilter:l=>{t("updateBranchesFilter",l)},handleRoleUpdate:()=>{t("editRoleClicked")},handleBrandUpdate:()=>{t("editBrandClicked")},handleBranchUpdate:()=>{t("editBranchClicked")},toggleAll:()=>{t("toggleAll")},handleDelete:()=>{t("deleteUserClicked")}}}});const it=e=>(Le("data-v-ef2f1223"),e=e(),qe(),e),ct={class:"header_container"},pt={class:"header-body"},mt={class:"input-wrapper"},ht=it(()=>_("img",{src:Oe,class:"search-icon",alt:"Search"},null,-1));function vt(e,t,d,u,h,g){const c=p("CustomButton"),m=p("ActionsBlock");return S(),F("div",ct,[_("div",pt,[_("div",mt,[ht,Q(_("input",{type:"text",placeholder:"Поиск","onUpdate:modelValue":t[0]||(t[0]=B=>e.inputValue=B),onInput:t[1]||(t[1]=B=>e.handleInput(e.inputValue))},null,544),[[oe,e.inputValue]])]),r(c,{onClick:t[2]||(t[2]=B=>e.$emit("modalToggler"))},{default:v(()=>[T(x(e.isCreate?"Создать":"Добавить"),1)]),_:1})]),r(m,{brands:e.brands,branches:e.branches,allSelected:e.allSelected,onUpdateRolesFilter:e.handleUpdateRolesFilter,onUpdateBrandsFilter:e.handleUpdateBrandsFilter,onUpdateBranchesFilter:e.handleUpdateBranchesFilter,onEditRoleClicked:e.handleRoleUpdate,onEditBrandClicked:e.handleBrandUpdate,onEditBranchClicked:e.handleBranchUpdate,onDeleteUserClicked:e.handleDelete,onToggleAll:e.toggleAll,selectedUsers:e.selectedUsers},null,8,["brands","branches","allSelected","onUpdateRolesFilter","onUpdateBrandsFilter","onUpdateBranchesFilter","onEditRoleClicked","onEditBrandClicked","onEditBranchClicked","onDeleteUserClicked","onToggleAll","selectedUsers"])])}const gt=K(ut,[["render",vt],["__scopeId","data-v-ef2f1223"]]);function Bt(){const e=s([]),t=s(!0);let d=s(0);const u=57,h=s(12),g=()=>{const a=window.innerHeight;c()?h.value=20:h.value=Math.floor((a-310)/u)},c=()=>!!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);ve(()=>{g(),window.addEventListener("resize",g),B(1,"",[],[],[],void 0)}),He(()=>{window.removeEventListener("resize",g)});const m={Authorization:N},B=async(a,i,U,M,k,l)=>{var R,b;try{const D=U.map(z=>`&role_keys=${encodeURIComponent(z)}`).join("&"),W=M.map(z=>`&brand_ids=${encodeURIComponent(z)}`).join("&"),G=k.map(z=>`&branch_ids=${encodeURIComponent(z)}`).join("&"),P=!l||l.sortState==="none"?"":`&sort_field=${l.columnName=="fullName"?"fio":"branch"}&sort_type=${l.sortState}`;console.log("roleKeysParams=",D),console.log("sortParams=",P);const J=`${V}/users?page=${a-1}&size=${h.value}${D}${W}${G}${P}&search=${i}`;console.log("url=",J);const ee=await Ie.get(J,{headers:m});e.value=(R=ee.data)==null?void 0:R.result,d.value=(b=ee.data)==null?void 0:b.count}catch(D){console.log(D)}finally{t.value=!1}};return ve(()=>{B(1,"",[],[],[],void 0)}),{users:e,isLoading:t,totalCount:d,size:h,fetching:B}}const ft=H({components:{CustomButton:Z,CustomModal:le},props:{modalTitle:{type:String,default:"Поменять роль"},modalActive:{type:Boolean,default:!1},toggleModal:{type:Function,required:!0},errorMessage:String},setup(e,{emit:t}){const d=s(null),u=()=>{t("editRoleFromDropDown",{role:d.value})};return w(()=>e.modalActive,()=>{d.value=null}),{selectedRole:d,onEditButtonClick:u,roleOptions:ne}}});const bt={class:"modal-content"},Ct={key:0,class:"error-message"},yt={class:"buttons_block"};function Ut(e,t,d,u,h,g){const c=p("v-select"),m=p("CustomButton"),B=p("CustomModal");return S(),I(B,{onClose:j(e.toggleModal,["prevent"]),modalActive:e.modalActive,"modal-title":e.modalTitle},{default:v(()=>[_("div",bt,[_("form",{onSubmit:t[1]||(t[1]=j((...a)=>e.onEditButtonClick&&e.onEditButtonClick(...a),["prevent"]))},[r(c,{items:e.roleOptions,modelValue:e.selectedRole,"onUpdate:modelValue":t[0]||(t[0]=a=>e.selectedRole=a),"item-title":"text","item-value":"value",placeholder:"Выберите роль",variant:"outlined",style:{width:"100%","margin-bottom":"24px"}},null,8,["items","modelValue"]),e.errorMessage?(S(),F("div",Ct,x(e.errorMessage),1)):O("",!0),_("div",yt,[r(m,{onClick:e.toggleModal,type:"button","additional-styles":{color:"#333",border:"1px solid #999",opacity:"0.5",background:"#FFF"}},{default:v(()=>[T(" Закрыть ")]),_:1},8,["onClick"]),r(m,{type:"submit"},{default:v(()=>[T(" Сохранить ")]),_:1})])],32)])]),_:1},8,["onClose","modalActive","modal-title"])}const kt=K(ft,[["render",Ut],["__scopeId","data-v-93dc129b"]]),_t=H({components:{CustomButton:Z,CustomModal:le},props:{modalTitle:{type:String,default:"Поменять бренд"},modalActive:{type:Boolean,default:!1},toggleModal:{type:Function,required:!0},errorMessage:String,brands:Array},setup(e,{emit:t}){const d=s(null),u=()=>{console.log("selectedBrand.value",d.value),t("editBrandFromDropDown",{brand:d.value})};return w(()=>e.modalActive,()=>{d.value=null}),{selectedBrand:d,onEditButtonClick:u}}});const At={class:"modal-content"},St={key:0,class:"error-message"},Mt={class:"buttons_block"};function $t(e,t,d,u,h,g){const c=p("v-select"),m=p("CustomButton"),B=p("CustomModal");return S(),I(B,{onClose:j(e.toggleModal,["prevent"]),modalActive:e.modalActive,"modal-title":e.modalTitle},{default:v(()=>{var a;return[_("div",At,[_("form",{onSubmit:t[1]||(t[1]=j((...i)=>e.onEditButtonClick&&e.onEditButtonClick(...i),["prevent"]))},[r(c,{items:(a=e.brands)==null?void 0:a.map(i=>({text:i.title.toString(),value:i.id.toString()})),modelValue:e.selectedBrand,"onUpdate:modelValue":t[0]||(t[0]=i=>e.selectedBrand=i),"item-title":"text","item-value":"value",placeholder:"Выберите бренд",variant:"outlined",color:"#1CB5C2",multiple:"",style:{width:"100%","margin-bottom":"24px"}},null,8,["items","modelValue"]),e.errorMessage?(S(),F("div",St,x(e.errorMessage),1)):O("",!0),_("div",Mt,[r(m,{onClick:e.toggleModal,type:"button","additional-styles":{color:"#333",border:"1px solid #999",opacity:"0.5",background:"#FFF"}},{default:v(()=>[T(" Закрыть ")]),_:1},8,["onClick"]),r(m,{type:"submit"},{default:v(()=>[T(" Сохранить ")]),_:1})])],32)])]}),_:1},8,["onClose","modalActive","modal-title"])}const Et=K(_t,[["render",$t],["__scopeId","data-v-6f0d9ccd"]]),wt=H({components:{CustomButton:Z,CustomModal:le},props:{modalTitle:{type:String,default:"Поменять филиал"},modalActive:{type:Boolean,default:!1},toggleModal:{type:Function,required:!0},errorMessage:String,branches:Array},setup(e,{emit:t}){const d=s(null),u=()=>{t("editBranchFromDropDown",{branch:d.value})};return w(()=>e.modalActive,()=>{d.value=null}),{selectedBranch:d,onEditButtonClick:u}}});const Tt={class:"modal-content"},Dt={key:0,class:"error-message"},Ft={class:"buttons_block"};function Rt(e,t,d,u,h,g){const c=p("v-select"),m=p("CustomButton"),B=p("CustomModal");return S(),I(B,{onClose:j(e.toggleModal,["prevent"]),modalActive:e.modalActive,"modal-title":e.modalTitle},{default:v(()=>{var a;return[_("div",Tt,[_("form",{onSubmit:t[1]||(t[1]=j((...i)=>e.onEditButtonClick&&e.onEditButtonClick(...i),["prevent"]))},[r(c,{items:(a=e.branches)==null?void 0:a.map(i=>({text:i.title.toString(),value:i.id.toString()})),modelValue:e.selectedBranch,"onUpdate:modelValue":t[0]||(t[0]=i=>e.selectedBranch=i),"item-title":"text","item-value":"value",placeholder:"Выберите филиал",variant:"outlined",color:"#1CB5C2",style:{width:"100%","margin-bottom":"24px"}},null,8,["items","modelValue"]),e.errorMessage?(S(),F("div",Dt,x(e.errorMessage),1)):O("",!0),_("div",Ft,[r(m,{onClick:e.toggleModal,type:"button","additional-styles":{color:"#333",border:"1px solid #999",opacity:"0.5",background:"#FFF"}},{default:v(()=>[T(" Закрыть ")]),_:1},8,["onClick"]),r(m,{type:"submit"},{default:v(()=>[T(" Сохранить ")]),_:1})])],32)])]}),_:1},8,["onClose","modalActive","modal-title"])}const Vt=K(wt,[["render",Rt],["__scopeId","data-v-e1012e6c"]]),Nt=H({name:"AllUsersListPage",components:{EditUserModal:Ge,DeleteModal:je,ChangeBranchModal:Vt,ChangeBrandModal:Et,ActionsBlock:ge,ChangeRole:kt,CreatUserModal:xe,TableData:Pe,HeaderBar:gt},mounted(){const e={Authorization:N};fetch(`${V}/branches`,{headers:e}).then(t=>t.json()).then(t=>this.branches=t==null?void 0:t.result).catch(t=>console.log(t)),fetch(`${V}/brands`,{headers:e}).then(t=>t.json()).then(t=>this.brands=t==null?void 0:t.result).catch(t=>console.log(t))},setup(){const e=s([]),t=s([]),d=s([]),u=s(""),h=s([]),g=s([]),c=s([]),m=s(null),B=s([]),a=s([]),i=s(!1),U=s(!1),M=s(!1),k=s(!1),l=s(!1),R=s(!1),b=s(null),D=s(null);w(a,o=>{o.length===X.value.length&&X.value.length!=0?i.value=!0:i.value=!1});function W(){i.value?a.value=[]:a.value=X.value.map(o=>o.id)}const G=o=>{let y=X.value[o].id;a.value.includes(y)?a.value=a.value.filter(n=>n!==y):a.value=[...a.value,y]},P=(o,y)=>{$e(o,y.id)},J=o=>{h.value=o},ee=o=>{g.value=o},z=o=>{c.value=o},ae=()=>{U.value=!U.value},se=()=>{M.value=!M.value},re=()=>{k.value=!k.value},Be=()=>{ae()},fe=()=>{se()},be=()=>{re()},{users:te,isLoading:ce,fetching:L,totalCount:Ce,size:ye}=Bt(),X=Ke(()=>!te.value||ce.value?[]:(e.value=te.value,te.value.map(o=>({id:o.id,fullName:`${o.first_name} ${o.last_name}`,phone:`${o.phone.slice(0,2)} ${o.phone.slice(2,5)} ${o.phone.slice(5,8)}
          ${o.phone.slice(8,10)} ${o.phone.slice(10)}`,branch:`${o.role=="owner"?"-":o.branch_title??"-"}`,brand:`${o.role=="owner"?"-":o.brands.join(", ")}`,role:o.role})))),q=()=>{L(1,u.value,h.value,g.value,c.value,m.value),a.value=[]},Ue=o=>{u.value=o};w(u,o=>{L(1,o,[],[],[],m.value),a.value=[]}),w(h,o=>{L(1,u.value,o,g.value,c.value,m.value),a.value=[]}),w(g,o=>{L(1,u.value,h.value,o,c.value,m.value),a.value=[]}),w(c,o=>{L(1,u.value,h.value,g.value,o,m.value),a.value=[]});const ke=o=>{o.value=o,L(1,u.value,h.value,g.value,c.value,o.value),console.log("sortState",o)},_e=o=>{const y={method:"PUT",headers:{Authorization:N,"Content-Type":"application/json"},body:JSON.stringify({user_ids:a.value,new_role:o.role})};fetch(`${V}/change-users-role`,y).then(async n=>{var f;const C=((f=n.headers.get("content-type"))==null?void 0:f.includes("application/json"))&&await n.json();if(!n.ok){const A=C&&C.message||n.status;return Promise.reject(A)}ae(),q()}).catch(n=>{setTimeout(()=>{E.value=o.error,setTimeout(()=>{E.value=""},3e3)},200),console.error("There was an error!",n)})},Ae=()=>{B.value=[...a.value],l.value=!0},Se=o=>{B.value=[o.id],l.value=!0},pe=()=>{l.value=!1},Me=o=>{var C;const y=e.value.find(f=>f.id==o.id);b.value=y;const n=(C=t.value.find(f=>f.title==y.branch_title))==null?void 0:C.id,$=[];for(let f=0;f<y.brands.length;f++)for(let A=0;A<d.value.length;A++)if(y.brands[f]==d.value[A].title){$.push(d.value[A].id);break}D.value={role:o.role,brandIds:$,branchId:n},ie()},$e=(o,y)=>{const n={method:"PUT",headers:{Authorization:N,"Content-Type":"application/json"},body:JSON.stringify({user_ids:[y],new_role:o})};fetch(`${V}/change-users-role`,n).then(async $=>{var A;const f=((A=$.headers.get("content-type"))==null?void 0:A.includes("application/json"))&&await $.json();if(!$.ok){const Re=f&&f.message||$.status;return Promise.reject(Re)}q()}).catch($=>{E.value=$.error,console.error("There was an error!",$)})},Ee=o=>{const y={method:"PUT",headers:{Authorization:N,"Content-Type":"application/json"},body:JSON.stringify({user_ids:a.value,new_brands_ids:o.brand.map(n=>Number(n))})};fetch(`${V}/change-users-brands`,y).then(async n=>{var f;const C=((f=n.headers.get("content-type"))==null?void 0:f.includes("application/json"))&&await n.json();if(!n.ok){const A=C&&C.message||n.status;return Promise.reject(A)}se(),q()}).catch(n=>{setTimeout(()=>{E.value=o.error,setTimeout(()=>{E.value=""},3e3)},200),console.error("There was an error!",n)})},we=o=>{const y={method:"PUT",headers:{Authorization:N,"Content-Type":"application/json"},body:JSON.stringify({user_ids:a.value,new_branch_id:Number(o.branch)})};fetch(`${V}/change-users-branch`,y).then(async n=>{var f;const C=((f=n.headers.get("content-type"))==null?void 0:f.includes("application/json"))&&await n.json();if(!n.ok){const A=C&&C.message||n.status;return Promise.reject(A)}re(),q()}).catch(n=>{setTimeout(()=>{E.value=o.error,setTimeout(()=>{E.value=""},3e3)},200),console.error("There was an error!",n)})},Te=o=>{console.log("ids",o);const y={method:"DELETE",headers:{Authorization:N,"Content-Type":"application/json"},body:JSON.stringify({user_ids:o})};fetch(`${V}/users`,y).then(async n=>{var f;const C=((f=n.headers.get("content-type"))==null?void 0:f.includes("application/json"))&&await n.json();if(!n.ok){const A=C&&C.message||n.status;return Promise.reject(A)}pe(),q()}).catch(n=>{E.value=n.error,console.error("There was an error!",n)})},de=s(!1),ue=s(""),E=s(""),Y=s(""),De=o=>{const y={method:"POST",headers:{Authorization:N,"Content-Type":"application/json"},body:JSON.stringify({phone:o.telephoneNumber.replace(/\s/g,""),first_name:o.firstName,last_name:o.lastName,role:o.role,brand_ids:o.brand_ids.map(n=>Number(n)),branch_id:Number(o.branch_id)})};fetch(`${V}/user`,y).then(async n=>{var f;const C=((f=n.headers.get("content-type"))==null?void 0:f.includes("application/json"))&&await n.json();if(!n.ok){const A=C&&C.error||n;return setTimeout(()=>{E.value=C.error,setTimeout(()=>{E.value=""},3e3)},200),Promise.reject(A)}ue.value=C,me(),q(),setTimeout(()=>{Y.value="Новый пользователь успешно создан",setTimeout(()=>{Y.value=""},2e3)},200)}).catch(n=>{E.value=n.error,console.error("There was an error!",n)})},Fe=o=>{const y={method:"PUT",headers:{Authorization:N,"Content-Type":"application/json"},body:JSON.stringify({user_id:o.id,phone:o.telephoneNumber.replace(/\s/g,""),first_name:o.firstName,last_name:o.lastName,role:o.role,brand_ids:o.brand_ids.map(n=>Number(n)),branch_id:Number(o.branch_id)})};fetch(`${V}/update-user`,y).then(async n=>{var f;const C=((f=n.headers.get("content-type"))==null?void 0:f.includes("application/json"))&&await n.json();if(!n.ok){const A=C&&C.message||n.status;return console.log("HERE IT IS",A),setTimeout(()=>{E.value=C.error,setTimeout(()=>{E.value=""},3e3)},200),Promise.reject(A)}ue.value=C,ie(),q(),setTimeout(()=>{Y.value="Пользователь успешно отредактирован!",setTimeout(()=>{Y.value=""},2e3)},200)}).catch(n=>{E.value=n.error,console.error("There was an error!",n)})},me=()=>{de.value=!de.value},ie=()=>{R.value=!R.value,R.value==!1&&(D.value=null)};return{usersTableData:X,isLoading:ce,users:te,totalCount:Ce,size:ye,fetching:L,handleSearch:Ue,searchValue:u,selectedRoles:h,selectedBrands:g,selectedBranches:c,selectedUsers:a,toggleAll:W,allSelected:i,toggleSelection:G,updateSelectedRoles:J,updateSelectedBrands:ee,updateSelectedBranches:z,editRoleModalToggler:ae,editBrandModalToggler:se,editBranchModalToggler:re,editRoleClicked:Be,editBrandClicked:fe,editBranchClicked:be,editRoleAction:_e,editBrandAction:Ee,editBranchAction:we,deleteAction:Te,editRoleModalActive:U,editBrandModalActive:M,editBranchModalActive:k,deleteModalActive:l,deleteUserClicked:Ae,editModalActive:R,editToggleModal:ie,onEditUser:Fe,branches:t,brands:d,handleSortSelected:ke,roleOptions:ne,tableColumns:[{key:"id",label:"ID",width:"56px",withSort:!1},{key:"fullName",label:"ФИО",width:"216px",withSort:!0},{key:"phone",label:"Номер телефона",width:"168px",withSort:!1},{key:"branch",label:"Филиал",width:"188px",withSort:!0},{key:"brand",label:"Бренд",width:"140px",withSort:!1},{key:"role",label:"Роль",width:"198px",withSort:!1}],onRoleSelected:P,onUserDelete:Se,onUserEdit:Me,deleteItems:B,closeDeleteModal:pe,onCreateUser:De,modalActive:de,createdUserId:ue,errorMessage:E,showAlert:Y,createUserModalToggler:me,selectedEditUser:b,selectedEditUserDefaultOption:D}},watch:{}});const Ot={class:"content-body"},It={key:1};function jt(e,t,d,u,h,g){const c=p("HeaderBar"),m=p("TableData"),B=p("CreatUserModal"),a=p("EditUserModal"),i=p("ChangeRole"),U=p("ChangeBrandModal"),M=p("ChangeBranchModal"),k=p("DeleteModal"),l=p("a-alert");return S(),F(We,null,[_("div",Ot,[r(c,{onModalToggler:e.createUserModalToggler,handleSearch:e.handleSearch,isCreate:!0,brands:e.brands,branches:e.branches,allSelected:e.allSelected,selectedUsers:e.selectedUsers,onUpdateRolesFilter:e.updateSelectedRoles,onUpdateBrandsFilter:e.updateSelectedBrands,onUpdateBranchesFilter:e.updateSelectedBranches,onEditRoleClicked:e.editRoleClicked,onEditBrandClicked:e.editBrandClicked,onEditBranchClicked:e.editBranchClicked,onDeleteUserClicked:e.deleteUserClicked,onToggleAll:e.toggleAll},null,8,["onModalToggler","handleSearch","brands","branches","allSelected","selectedUsers","onUpdateRolesFilter","onUpdateBrandsFilter","onUpdateBranchesFilter","onEditRoleClicked","onEditBrandClicked","onEditBranchClicked","onDeleteUserClicked","onToggleAll"]),e.isLoading?(S(),F("span",It,"Загрузка ...")):(S(),I(m,{key:0,tableData:e.usersTableData,columns:e.tableColumns,onSortSelected:e.handleSortSelected,onHandlePageChange:e.fetching,totalCount:e.totalCount,size:e.size,searchValue:e.searchValue,onUpdateRolesFilter:e.updateSelectedRoles,onUpdateBrandsFilter:e.updateSelectedBrands,onUpdateBranchesFilter:e.updateSelectedBranches,onToggleSelection:e.toggleSelection,filterRoles:e.selectedRoles,filterBrands:e.selectedBrands,filterBranches:e.selectedBranches,selectedUsers:e.selectedUsers,onOnRoleSelected:e.onRoleSelected,onOnUserDelete:e.onUserDelete,onOnUserEdit:e.onUserEdit},null,8,["tableData","columns","onSortSelected","onHandlePageChange","totalCount","size","searchValue","onUpdateRolesFilter","onUpdateBrandsFilter","onUpdateBranchesFilter","onToggleSelection","filterRoles","filterBrands","filterBranches","selectedUsers","onOnRoleSelected","onOnUserDelete","onOnUserEdit"]))]),r(B,{modalActive:e.modalActive,toggleModal:e.createUserModalToggler,onCreateUser:e.onCreateUser,brands:e.brands,branches:e.branches,errorMessage:e.errorMessage},null,8,["modalActive","toggleModal","onCreateUser","brands","branches","errorMessage"]),r(a,{editModalActive:e.editModalActive,editToggleModal:e.editToggleModal,onEditUser:e.onEditUser,brands:e.brands,branches:e.branches,errorMessage:e.errorMessage,user:e.selectedEditUser,defaultOption:e.selectedEditUserDefaultOption},null,8,["editModalActive","editToggleModal","onEditUser","brands","branches","errorMessage","user","defaultOption"]),r(i,{modalActive:e.editRoleModalActive,toggleModal:e.editRoleModalToggler,onEditRoleFromDropDown:e.editRoleAction},null,8,["modalActive","toggleModal","onEditRoleFromDropDown"]),r(U,{modalActive:e.editBrandModalActive,toggleModal:e.editBrandModalToggler,brands:e.brands,onEditBrandFromDropDown:e.editBrandAction},null,8,["modalActive","toggleModal","brands","onEditBrandFromDropDown"]),r(M,{modalActive:e.editBranchModalActive,toggleModal:e.editBranchModalToggler,branches:e.branches,onEditBranchFromDropDown:e.editBranchAction},null,8,["modalActive","toggleModal","branches","onEditBranchFromDropDown"]),r(k,{deleteItems:e.deleteItems,modalActive:e.deleteModalActive,toggleModal:e.closeDeleteModal,onDeleteFromDropDown:e.deleteAction},null,8,["deleteItems","modalActive","toggleModal","onDeleteFromDropDown"]),e.showAlert.length>0?(S(),I(l,{key:0,message:e.showAlert,type:"success","show-icon":"",class:"success-alert"},null,8,["message"])):O("",!0)],64)}const Lt=K(Nt,[["render",jt],["__scopeId","data-v-fd25d933"]]);export{Lt as default};
