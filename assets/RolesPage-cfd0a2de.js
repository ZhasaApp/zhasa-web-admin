import{d as b,C as v,a as M,_ as I,r as n,o as p,c as y,w as m,b as g,e as B,f as l,g as C,T as w,H as _,h as A,i as T,j as U,F as N}from"./index-2fa72a25.js";const S=b({components:{CustomButton:v,CustomModal:M},props:{modalTitle:{type:String,default:"Добавить менеджера"},modalActive:{type:Boolean,default:!1},toggleModal:{type:Function,required:!0},branches:Array,brands:Array,selectedUserFullName:String},data(){return{selectedUserId:this.selectedUserFullName,selectedBranchId:"",selectedBrandsIds:[],isAllDataEntered:!1}},setup(){return{handleChange:s=>{console.log(`selected ${s}`)},filterOption:(s,r)=>r.label.toLowerCase().indexOf(s.toLowerCase())>=0}},methods:{handleBranchChange(e){this.selectedBranchId=e,this.selectedBranchId.length>0&&this.selectedBrandsIds.length>0?this.isAllDataEntered=!0:this.isAllDataEntered=!1},handleBrandsChange(e){this.selectedBrandsIds=e,this.selectedBranchId.length>0&&this.selectedBrandsIds.length>0?this.isAllDataEntered=!0:this.isAllDataEntered=!1},onCreateButtonClick(){this.$emit("addManager",{selectedUserId:this.selectedUserId,selectedBranchId:this.selectedBranchId,selectedBrandsIds:this.selectedBrandsIds})}}});const V={class:"modal-content"};function k(e,t,s,r,d,u){const a=n("a-select"),i=n("CustomButton"),h=n("CustomModal");return p(),y(h,{onClose:B(e.toggleModal,["prevent"]),modalActive:e.modalActive,"modal-title":e.modalTitle},{default:m(()=>{var c,f;return[g("div",V,[g("form",{onSubmit:t[3]||(t[3]=B((...o)=>e.onCreateButtonClick&&e.onCreateButtonClick(...o),["prevent"]))},[l(a,{modelValue:e.selectedUserId,"onUpdate:modelValue":t[0]||(t[0]=o=>e.selectedUserId=o),defaultValue:{key:"3",label:e.selectedUserFullName},"show-search":"",placeholder:"Напишите или выберите пользователя",style:{width:"100%"},"filter-option":e.filterOption},null,8,["modelValue","defaultValue","filter-option"]),l(a,{modelValue:e.selectedBranchId,"onUpdate:modelValue":t[1]||(t[1]=o=>e.selectedBranchId=o),"show-search":"",placeholder:"Выберите филиал",style:{width:"100%",margin:"24px auto"},options:(c=e.branches)==null?void 0:c.map(o=>({label:o.description.toString(),value:o.id.toString()})),"filter-option":e.filterOption,onChange:e.handleBranchChange},null,8,["modelValue","options","filter-option","onChange"]),l(a,{modelValue:e.selectedBrandsIds,"onUpdate:modelValue":t[2]||(t[2]=o=>e.selectedBrandsIds=o),mode:"multiple","show-search":"",placeholder:"Выберите бренд",class:"selector-with_multiple-select",options:(f=e.brands)==null?void 0:f.map(o=>({label:o.title.toString(),value:o.id.toString()})),"filter-option":e.filterOption,onChange:e.handleBrandsChange,showArrow:"true"},null,8,["modelValue","options","filter-option","onChange"]),l(i,{type:"submit","additional-styles":{marginBottom:"24px",opacity:`${e.isAllDataEntered?"1":"0.5"}`},disabled:!e.isAllDataEntered},{default:m(()=>[C(" Добавить ")]),_:1},8,["additional-styles","disabled"]),l(i,{onClick:e.toggleModal,type:"button","additional-styles":{color:"#333",border:"1px solid #999",opacity:"0.5",background:"#FFF"}},{default:m(()=>[C(" Закрыть ")]),_:1},8,["onClick"])],32)])]}),_:1},8,["onClose","modalActive","modal-title"])}const D=I(S,[["render",k]]),E=b({name:"RolesPage",components:{AddManagerRoleModal:D,TableData:w,HeaderBar:_},data(){return{branches:[],brands:[],userId:localStorage.getItem("createdUserId")||"",userName:localStorage.getItem("createdUserName"),userSurname:localStorage.getItem("createdUserLastName"),modalActive:!1,errorMessage:"",showAlert:!1}},mounted(){const e={Authorization:A};fetch("http://185.182.219.90/admin/branches",{headers:e}).then(t=>t.json()).then(t=>this.branches=t==null?void 0:t.result).catch(t=>console.log(t)),fetch("http://185.182.219.90/admin/brands",{headers:e}).then(t=>t.json()).then(t=>this.brands=t==null?void 0:t.result).catch(t=>console.log(t))},methods:{modalToggler(){this.modalActive=!this.modalActive},onAddRole(e){const t={method:"POST",headers:{Authorization:A,"Content-Type":"application/json"},body:JSON.stringify({user_id:parseInt(this.userId),branch_id:parseInt(e.selectedBranchId),brands:Array.from(e.selectedBrandsIds).map(s=>parseInt(s))})};fetch("http://185.182.219.90/admin/manager",t).then(async s=>{var u;const d=((u=s.headers.get("content-type"))==null?void 0:u.includes("application/json"))&&await s.json();if(!s.ok){const a=d&&d.message||s.status;return this.errorMessage=a.message,Promise.reject(a)}console.log(d),localStorage.setItem("ff","dd"),this.modalToggler(),setTimeout(()=>{this.showAlert=!0,setTimeout(()=>{this.showAlert=!1},2e3)},200)}).catch(s=>{console.error("There was an error!",s)})}}});const F={class:"content-body"};function $(e,t,s,r,d,u){const a=n("HeaderBar"),i=n("TableData"),h=n("AddManagerRoleModal"),c=n("a-alert");return p(),T(N,null,[g("div",F,[l(a,{onClick:e.modalToggler},null,8,["onClick"]),l(i),l(h,{modalActive:e.modalActive,toggleModal:e.modalToggler,onAddManager:e.onAddRole,branches:e.branches,brands:e.brands,selectedUserFullName:e.userSurname+" "+e.userName},null,8,["modalActive","toggleModal","onAddManager","branches","brands","selectedUserFullName"])]),e.showAlert?(p(),y(c,{key:0,message:"Роль менеджера добавлена",type:"success","show-icon":"",class:"success-alert"})):U("",!0)],64)}const R=I(E,[["render",$],["__scopeId","data-v-d59b2545"]]);export{R as default};
