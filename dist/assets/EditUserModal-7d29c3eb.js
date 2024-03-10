import{C as F,b as T,U as D,R as $}from"./maska-039a90ca.js";import{d as j,r as n,w as L,_ as q,a as I,u as P,o as O,h as w,f as M,q as E,b as m,j as S,v as A,i as U,c as z,e as k,F as G,g as R}from"./index-b7abf668.js";const H=j({components:{CustomButton:F,CustomModal:T},props:{modalTitle:{type:String,default:"Редактировать пользователя"},editModalActive:{type:Boolean,default:!1},editToggleModal:{type:Function,required:!0},errorMessage:String,brands:Array,branches:Array,user:Object,defaultOption:{type:Object,required:!0}},setup(e){const t=n(""),v=n(""),f=n(""),d=n(""),u=n(null),o=n([]),p=n(!1),b=$,i=n((e==null?void 0:e.brands)??[]),g=n((e==null?void 0:e.branches)??[]);L(()=>e.user,a=>{var c;i.value=(e==null?void 0:e.brands)??[],g.value=(e==null?void 0:e.branches)??[],t.value=a.first_name,v.value=a.last_name,f.value=a.phone,d.value=a.role;const r=(c=g.value.find(h=>h.title==a.branch_title))==null?void 0:c.id;u.value=r;const l=[];for(let h=0;h<a.brands.length;h++)for(let V=0;V<i.value.length;V++)if(a.brands[h]==i.value[V].title){l.push(i.value[V].id);break}o.value=l,s()});const B=(a,r)=>r.label.toLowerCase().indexOf(a.toLowerCase())>=0,N=a=>{d.value=a,e.defaultOption.role=a,s()},C=a=>{u.value=a,s()},y=a=>{o.value=a,s()},s=()=>{console.log("firstName",t.value),console.log("lastName",v.value),console.log("telephoneNumber",f.value),console.log("selectedRole",d.value),console.log("selectedBranchId",u.value),console.log("selectedBrandsIds",o.value),t.value.length>0&&v.value.length>0&&f.value.length==16&&d.value.length>0&&(d.value=="owner"||u.value&&o.value.length>0)?p.value=!0:p.value=!1};return{firstName:t,lastName:v,telephoneNumber:f,selectedRole:d,selectedBranchId:u,selectedBrandsIds:o,filterOption:B,onRoleSelected:N,onBranchSelected:C,onBrandSelected:y,validate:s,isAllDataEntered:p,roleOptions:b}},directives:{maska:D},data(){return{maskedValue:"",bindedObject:{masked:"",unmasked:"",completed:!1},newUser:this.$props.user}},methods:{onSaveButtonClick(e){console.log("firstName=",this.firstName),console.log("lastName=",this.lastName),console.log("telephoneNumber=",this.telephoneNumber),console.log("role=",this.selectedRole),console.log("brand_ids=",this.selectedBrandsIds),console.log("branch_id=",this.selectedBranchId),this.$emit("editUser",{firstName:this.firstName,lastName:this.lastName,telephoneNumber:this.telephoneNumber,role:this.selectedRole,brand_ids:this.selectedBrandsIds,branch_id:this.selectedBranchId,id:e})}}});const J={class:"modal-content"},K={class:"button-box"};function Q(e,t,v,f,d,u){const o=I("a-select"),p=I("a-alert"),b=I("CustomButton"),i=I("CustomModal"),g=P("maska");return O(),w(i,{onClose:E(e.editToggleModal,["prevent"]),modalActive:e.editModalActive,"modal-title":e.modalTitle},{default:M(()=>{var B,N,C,y,s,a,r;return[m("div",J,[m("form",{onSubmit:t[12]||(t[12]=E(l=>{var c;return e.onSaveButtonClick(((c=e.user)==null?void 0:c.id)??0)},["prevent"]))},[S(m("input",{placeholder:"Имя",type:"text","onUpdate:modelValue":t[0]||(t[0]=l=>e.firstName=l),onInput:t[1]||(t[1]=(...l)=>e.validate&&e.validate(...l)),class:"inputFirstName"},null,544),[[A,e.firstName]]),S(m("input",{placeholder:"Фамилия",type:"text","onUpdate:modelValue":t[2]||(t[2]=l=>e.lastName=l),onInput:t[3]||(t[3]=(...l)=>e.validate&&e.validate(...l)),class:"inputLastName"},null,544),[[A,e.lastName]]),S(m("input",{placeholder:"+7 ___ ___ __ __","data-maska":"+7 ### ### ## ##","onUpdate:modelValue":t[4]||(t[4]=l=>e.telephoneNumber=l),onInput:t[5]||(t[5]=(...l)=>e.validate&&e.validate(...l)),class:"inputTelephone"},null,544),[[g],[A,e.telephoneNumber]]),(((N=(B=e.defaultOption)==null?void 0:B.role)==null?void 0:N.length)??0)>0?(O(),w(o,{key:0,modelValue:e.selectedRole,"onUpdate:modelValue":t[6]||(t[6]=l=>e.selectedRole=l),defaultValue:e.defaultOption.role,placeholder:"Выберите роль",style:{width:"100%"},options:e.roleOptions.map(l=>({label:l.text,value:l.value})),onChange:t[7]||(t[7]=l=>e.onRoleSelected(l))},null,8,["modelValue","defaultValue","options"])):U("",!0),(((y=(C=e.defaultOption)==null?void 0:C.role)==null?void 0:y.length)??0)&&e.defaultOption.role!="owner"?(O(),z(G,{key:1},[k(o,{modelValue:e.selectedBranchId,"onUpdate:modelValue":t[8]||(t[8]=l=>e.selectedBranchId=l),defaultValue:e.defaultOption.branchId,"show-search":"",placeholder:"Выберите филиал",style:{width:"100%",margin:"24px auto"},options:(s=e.branches)==null?void 0:s.map(l=>({label:l.title.toString(),value:l.id})),"filter-option":e.filterOption,onChange:t[9]||(t[9]=l=>e.onBranchSelected(l))},null,8,["modelValue","defaultValue","options","filter-option"]),k(o,{modelValue:e.selectedBrandsIds,"onUpdate:modelValue":t[10]||(t[10]=l=>e.selectedBrandsIds=l),mode:"multiple",defaultValue:e.defaultOption.brandIds,"show-search":"",placeholder:"Выберите бренд",class:"selector-with_multiple-select",options:(a=e.brands)==null?void 0:a.map(l=>({label:l.title.toString(),value:l.id})),"filter-option":e.filterOption,onChange:t[11]||(t[11]=l=>e.onBrandSelected(l)),showArrow:""},null,8,["modelValue","defaultValue","options","filter-option"])],64)):U("",!0),(((r=e.errorMessage)==null?void 0:r.length)??0)>0?(O(),w(p,{key:2,type:"error",style:{"margin-top":"16px"},message:e.errorMessage,"show-icon":""},null,8,["message"])):U("",!0),m("div",K,[k(b,{onClick:e.editToggleModal,type:"button","additional-styles":{color:"#333",border:"1px solid #999",opacity:"0.5",background:"#FFF"}},{default:M(()=>[R(" Закрыть ")]),_:1},8,["onClick"]),k(b,{type:"submit","additional-styles":{opacity:`${e.isAllDataEntered?"1":"0.5"}`},disabled:!e.isAllDataEntered},{default:M(()=>[R(" Сохранить ")]),_:1},8,["additional-styles","disabled"])])],32)])]}),_:1},8,["onClose","modalActive","modal-title"])}const Y=q(H,[["render",Q],["__scopeId","data-v-6dfcd1df"]]);export{Y as E};
