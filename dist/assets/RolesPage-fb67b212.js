import{T as p,C as w}from"./constants-a62344da.js";import{a as D,C as k,T as _,H as $,u as V}from"./useAllUsersWithRoles-26026cc0.js";import{k as f,n as E,d as M,_ as T,r as i,o as m,c as C,w as g,b as B,e as y,i as u,j as I,l as U,m as S,g as v,h as F,F as N}from"./index-99c4c287.js";function R(){const e=f([]),t=f(!0),a={Authorization:p};return E(async()=>{var o;try{const l=await D.get("http://185.182.219.90/admin/users/no-roles",{headers:a});e.value=(o=l.data)==null?void 0:o.result}catch{alert("Ошибка")}finally{t.value=!1}}),{users:e,isLoading:t}}const O=M({components:{CustomButton:w,CustomModal:k},props:{modalTitle:{type:String,default:"Добавить менеджера"},modalActive:{type:Boolean,default:!1},toggleModal:{type:Function,required:!0},branches:Array,brands:Array,selectedUserFullName:String},data(){return{selectedUserId:"",selectedBranchId:"",selectedBrandsIds:[],isAllDataEntered:!1}},setup(){const e=o=>{console.log(`selected ${o}`)},t=(o,l)=>l.label.toLowerCase().indexOf(o.toLowerCase())>=0,{users:a,isLoading:d}=R();return{handleChange:e,filterOption:t,users:a,isLoading:d}},methods:{handleUserChange(e){this.selectedUserId=e,console.log("value",e),this.selectedBranchId.length>0&&this.selectedBrandsIds.length>0?this.isAllDataEntered=!0:this.isAllDataEntered=!1},handleBranchChange(e){this.selectedBranchId=e,this.selectedBranchId.length>0&&this.selectedBrandsIds.length>0?this.isAllDataEntered=!0:this.isAllDataEntered=!1},handleBrandsChange(e){this.selectedBrandsIds=e,this.selectedBranchId.length>0&&this.selectedBrandsIds.length>0?this.isAllDataEntered=!0:this.isAllDataEntered=!1},onCreateButtonClick(){this.$emit("addManager",{selectedUserId:this.selectedUserId,selectedBranchId:this.selectedBranchId,selectedBrandsIds:this.selectedBrandsIds})}}});const j={class:"modal-content"};function z(e,t,a,d,o,l){const r=i("a-select"),c=i("CustomButton"),h=i("CustomModal");return m(),C(h,{onClose:y(e.toggleModal,["prevent"]),modalActive:e.modalActive,"modal-title":e.modalTitle},{default:g(()=>{var n,b,A;return[B("div",j,[B("form",{onSubmit:t[3]||(t[3]=y((...s)=>e.onCreateButtonClick&&e.onCreateButtonClick(...s),["prevent"]))},[u(r,{modelValue:e.selectedUserId,"onUpdate:modelValue":t[0]||(t[0]=s=>e.selectedUserId=s),options:(n=e.users)==null?void 0:n.map(s=>({label:`${s.FirstName} ${s.LastName}`,value:s.Id})),"show-search":"",placeholder:"Напишите или выберите пользователя",style:{width:"100%"},"filter-option":e.filterOption,onChange:e.handleUserChange},null,8,["modelValue","options","filter-option","onChange"]),u(r,{modelValue:e.selectedBranchId,"onUpdate:modelValue":t[1]||(t[1]=s=>e.selectedBranchId=s),"show-search":"",placeholder:"Выберите филиал",style:{width:"100%",margin:"24px auto"},options:(b=e.branches)==null?void 0:b.map(s=>({label:s.description.toString(),value:s.id.toString()})),"filter-option":e.filterOption,onChange:e.handleBranchChange},null,8,["modelValue","options","filter-option","onChange"]),u(r,{modelValue:e.selectedBrandsIds,"onUpdate:modelValue":t[2]||(t[2]=s=>e.selectedBrandsIds=s),mode:"multiple","show-search":"",placeholder:"Выберите бренд",class:"selector-with_multiple-select",options:(A=e.brands)==null?void 0:A.map(s=>({label:s.title.toString(),value:s.id.toString()})),"filter-option":e.filterOption,onChange:e.handleBrandsChange,showArrow:"true"},null,8,["modelValue","options","filter-option","onChange"]),u(c,{type:"submit","additional-styles":{marginBottom:"24px",opacity:`${e.isAllDataEntered?"1":"0.5"}`},disabled:!e.isAllDataEntered},{default:g(()=>[I(" Добавить ")]),_:1},8,["additional-styles","disabled"]),u(c,{onClick:e.toggleModal,type:"button","additional-styles":{color:"#333",border:"1px solid #999",opacity:"0.5",background:"#FFF"}},{default:g(()=>[I(" Закрыть ")]),_:1},8,["onClick"])],32)])]}),_:1},8,["onClose","modalActive","modal-title"])}const L=T(O,[["render",z]]),P=M({name:"RolesPage",components:{AddManagerRoleModal:L,TableData:_,HeaderBar:$},data(){return{branches:[],brands:[],modalActive:!1,errorMessage:"",showAlert:!1}},mounted(){const e={Authorization:p};fetch("http://185.182.219.90/admin/branches",{headers:e}).then(t=>t.json()).then(t=>this.branches=t==null?void 0:t.result).catch(t=>console.log(t)),fetch("http://185.182.219.90/admin/brands",{headers:e}).then(t=>t.json()).then(t=>this.brands=t==null?void 0:t.result).catch(t=>console.log(t))},setup(){const e=f(""),{users:t,isLoading:a,fetching:d,totalCount:o,size:l}=V(),r=U(()=>!t.value||a.value?[]:t.value.map(n=>({id:n.id,fullName:`${n.first_name} ${n.last_name}`,branchTitle:n.branch_title,brands:n.brands}))),c=[{key:"id",label:"ID"},{key:"fullName",label:"ФИО"},{key:"branchTitle",label:"Филиал"},{key:"brands",label:"Бренд"}],h=n=>{e.value=n};return S(e,n=>{d(1,n)}),{usersTableData:r,tableColumns:c,isLoading:a,totalCount:o,size:l,fetching:d,handleSearch:h,searchValue:e}},methods:{modalToggler(){this.modalActive=!this.modalActive},onAddRole(e){const t={method:"POST",headers:{Authorization:p,"Content-Type":"application/json"},body:JSON.stringify({user_id:parseInt(e.selectedUserId),branch_id:parseInt(e.selectedBranchId),brands:Array.from(e.selectedBrandsIds).map(a=>parseInt(a))})};fetch("http://185.182.219.90/admin/manager",t).then(async a=>{var l;const o=((l=a.headers.get("content-type"))==null?void 0:l.includes("application/json"))&&await a.json();if(!a.ok){const r=o&&o.message||a.status;return this.errorMessage=r.message,Promise.reject(r)}console.log(o),this.modalToggler(),setTimeout(()=>{this.showAlert=!0,setTimeout(()=>{this.showAlert=!1},2e3)},200)}).catch(a=>{console.error("There was an error!",a)})}}});const H={class:"content-body"},J={key:1};function q(e,t,a,d,o,l){const r=i("HeaderBar"),c=i("TableData"),h=i("AddManagerRoleModal"),n=i("a-alert");return m(),v(N,null,[B("div",H,[u(r,{onModalToggler:e.modalToggler,handleSearch:e.handleSearch},null,8,["onModalToggler","handleSearch"]),e.isLoading?(m(),v("span",J,"Загрузка ...")):(m(),C(c,{key:0,tableData:e.usersTableData,columns:e.tableColumns,onHandlePageChange:e.fetching,totalCount:e.totalCount,size:e.size,searchValue:e.searchValue},null,8,["tableData","columns","onHandlePageChange","totalCount","size","searchValue"])),u(h,{modalActive:e.modalActive,toggleModal:e.modalToggler,onAddManager:e.onAddRole,branches:e.branches,brands:e.brands},null,8,["modalActive","toggleModal","onAddManager","branches","brands"])]),e.showAlert?(m(),C(n,{key:0,message:"Роль менеджера добавлена",type:"success","show-icon":"",class:"success-alert"})):F("",!0)],64)}const Q=T(P,[["render",q],["__scopeId","data-v-1a8d9e8e"]]);export{Q as default};
