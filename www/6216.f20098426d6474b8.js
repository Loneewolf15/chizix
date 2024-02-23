"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6216],{6216:(y,_,g)=>{g.r(_),g.d(_,{DepositPage:()=>v});var m=g(5861),l=g(95),i=g(8606),p=g(6662),u=g(6814),t=g(6689),P=g(1725),h=g(9140),C=g(1517),O=g(7911);function M(d,w){if(1&d){const n=t.EpF();t.TgZ(0,"div")(1,"form",6)(2,"div",7)(3,"ion-item",8)(4,"ion-input",9),t.NdJ("ionInput",function(){t.CHM(n);const o=t.oxw();return t.KtG(o.checkAmount())}),t.qZA()()()(),t._UZ(5,"ion-loading",10),t.TgZ(6,"div",11),t._UZ(7,"br")(8,"br"),t.TgZ(9,"ion-button",12),t.NdJ("click",function(){t.CHM(n);const o=t.oxw();return t.KtG(o.deposit())}),t.TgZ(10,"ion-text"),t._uU(11,"Deposit now"),t.qZA()(),t._UZ(12,"br"),t.qZA()()}if(2&d){const n=t.oxw();t.xp6(1),t.Q6J("formGroup",n.form),t.xp6(3),t.Q6J("counterFormatter",n.customCounterFormatterE),t.xp6(1),t.Q6J("message","Please wait...")("duration",1e4)("showBackdrop",!0)("translucent",!0)("spinner","crescent"),t.xp6(4),t.Q6J("disabled",n.form.invalid)}}let v=(()=>{class d{constructor(n,e,o,c,r,a,s,f,x,b,D){this.loadingCtrl=n,this.formBuilder=e,this.router=o,this.loadingCtl=c,this.modalCtrl=r,this.alertController=a,this.toastCtrl=s,this.storage=f,this.authService=x,this.toastService=b,this.toastController=D,this.otpTime=60,this.otpDisabled=!1,this.resendTime=30,this.resendDisabled=!1,this.isLoading=!1,this.type=!0,this.verified=!1,this.showSpinner=!1,this.showOtpForm=!1,this.transactionRef="",this.depositData={amount:"",tagname:"",phone:"",password:"",email:"",confirmPassword:""},this.initForm()}ngOnInit(){const n=localStorage.getItem("userData");n&&(this.userData=JSON.parse(n))}initForm(){this.form=new l.cw({amountx:new l.NI(null,{validators:[l.kI.required,l.kI.min(100)]})})}changeType(){this.type=!this.type}validateData(){return this.depositData.email&&this.depositData.amount&&this.depositData.email.length>0&&this.depositData.amount.length>0}presentDepositAlert(n,e,o,c){var r=this;return(0,m.Z)(function*(){let a,s;switch(n){case"transaction successful":a=`Your deposit of \u20a6${e} into your Velux wallet was ${n}`,s="assets/imgs/success.png";break;case"User exited the flow":a=`Your deposit of \u20a6${e} failed. Please try again later.`,s="assets/imgs/failed.png";break;case"failed":a="Sorry!! <br> We could not complete your request at this time, Please try again sooner.",s="assets/imgs/less.png";break;default:a="An unknown error occurred!!<br>Please try again later",s="assets/imgs/less.png"}r.header=o||"Deposit Status",r.status=n||"Unknown",r.amount=e||"50",r.message=a,yield(yield r.modalCtrl.create({component:p.d,componentProps:{header:r.header,status:r.status,amount:r.amount,message:r.message,imgSrc:s,subHeader:c},cssClass:"transaction-modal"})).present()})()}customCounterFormatterE(n,e){return e-n+" characters remaining"}checkAmount(){const n=this.form.get("amountx");n.setErrors(n&&n.value<100?{invalidAmount:!0}:null)}showLoader(n){return!!this.isLoading||(this.isLoading=!0,this.loadingCtrl.create({message:n}).then(e=>{e.present(),e.onDidDismiss().then(o=>{this.isLoading=!1})}))}hideLoader(){return this.isLoading&&(this.isLoading=!1),this.loadingCtrl.dismiss().then(()=>console.log("dismissed")).catch(n=>console.log(n))}generateTransactionRef(){let e="";for(let o=0;o<22;o++)e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random()));return e}presentToast(n,e){var o=this;return(0,m.Z)(function*(){(yield o.toastCtrl.create({message:n,color:e,duration:1e3,position:"bottom"})).present()})()}presentLoading(n,e){var o=this;return(0,m.Z)(function*(){yield(yield o.loadingCtl.create({message:n,spinner:e})).present()})()}deposit(){var n=this;return(0,m.Z)(function*(){const e=yield n.loadingCtrl.create({message:"Processing..."});if(yield e.present(),n.form.valid){n.amounted=n.form.get("amountx").value,n.feex=.02*n.amounted,n.feex>=2050&&(n.feex=2050),console.log(n.amounted),n.amounted=parseFloat(n.amounted),n.feex=parseFloat(n.feex);const o=parseFloat(n.amounted)+parseFloat(n.feex);n.amounted=o,n.vpay=.013*o,n.vpay>=2e3&&(n.vpay=2e3),console.log(o+"Divine"),n.transactionRef="Velux-"+n.generateTransactionRef(),console.log(n.transactionRef);const c={amount:n.amounted,email:n.userData?.loginData.email,currency:"NGN",domain:"live",key:"0277f435-be59-48c5-bee9-6ed59375e2d5",transactionref:n.transactionRef,customer_logo:"https://www.vpay.africa/static/media/vpayLogo.91e11322.svg",customer_service_channel:"+2347044235654, info@veluxpay.com",txn_charge:.5,txn_charge_type:"flat",onSuccess:r=>{console.log("Hello World!",r.message),console.log(c);const a={amount:c.amount-parseFloat(n.feex),transactionref:c.transactionref};console.log(a),n.authService.depoxit(a).subscribe(s=>{console.log("this",s),"transaction successful"===s.message?n.presentDepositAlert(s.message,c.amount-parseFloat(n.feex),"Deposit Successful"):alert(s.mesage)},s=>{console.error("Registration failed!",s)})},onExit:(r=(0,m.Z)(function*(a){console.log("Hello World!",a.message),console.log(c);const s={amount:c.amount-parseFloat(n.feex),transactionref:c.transactionref};console.log(s),"User exited the flow"===a.message&&a.message?n.presentDepositAlert(a.message,c.amount-parseFloat(n.feex),"Incomplete Request"):alert(a.mesage)}),function(s){return r.apply(this,arguments)})};if(window.VPayDropin){const{open:r}=VPayDropin.create(c);r()}}var r;yield e.dismiss()})()}static#n=this.\u0275fac=function(e){return new(e||d)(t.Y36(i.HT),t.Y36(l.qu),t.Y36(P.F0),t.Y36(i.HT),t.Y36(i.IN),t.Y36(i.Br),t.Y36(i.yF),t.Y36(h.yW),t.Y36(C.e),t.Y36(O.k),t.Y36(i.yF))};static#t=this.\u0275cmp=t.Xpm({type:d,selectors:[["app-deposit"]],standalone:!0,features:[t.jDz],decls:10,vars:1,consts:[[1,"ion-no-margin"],["defaultHref","/tabs/home","mode","md"],["color","medium","mode","ios",1,"tit"],[1,"tit"],["lines","full"],[4,"ngIf"],[1,"form-container",3,"formGroup"],[1,"ion-margin-vertical"],["lines","none"],["label","Amount*","label-placement","floating","minlength","3","errorText","* Amount is required and must be greater than or equal to \u20a6100.","formControlName","amountx","type","number",3,"counterFormatter","ionInput"],[3,"message","duration","showBackdrop","translucent","spinner"],[1,"purrr"],["type","submit","size","medium","expand","block","shape","round","color","warning",1,"ion-margin",3,"disabled","click"]],template:function(e,o){1&e&&(t.TgZ(0,"ion-card",0)(1,"ion-card-header")(2,"ion-buttons"),t._UZ(3,"ion-back-button",1),t.TgZ(4,"ion-card-title",2)(5,"h3",3),t._uU(6,"Deposit"),t.qZA()()()(),t.TgZ(7,"ion-card-content")(8,"ion-list",4),t.YNc(9,M,13,8,"div",5),t.qZA()()()),2&e&&(t.xp6(9),t.Q6J("ngIf",!o.showOtpForm))},dependencies:[u.ez,u.O5,l.u5,l._Y,l.JJ,l.JL,l.wO,l.UX,l.sg,l.u,i.Pc,i.YG,i.Sm,i.PM,i.FN,i.Zi,i.Dq,i.pK,i.Ie,i.q_,i.wh,i.yW,i.as,i.oU],styles:["ion-card[_ngcontent-%COMP%]{box-shadow:none!important;padding-top:3vh;padding-bottom:150%}ion-card[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]{font-size:1rem}ion-card[_ngcontent-%COMP%]   ion-item.invalid[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]{--border-color: var(--ion-color-danger)}ion-card[_ngcontent-%COMP%]   ion-item.valid[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]{--border-color: var(--ion-color-success)}ion-card[_ngcontent-%COMP%]   .validation-message[_ngcontent-%COMP%]{font-size:.8rem;color:var(--ion-color-danger);margin-top:.2rem}ion-card[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{text-align:center;position:center;font-family:Irish Grover;font-style:normal;font-weight:700;font-size:24px;color:#9f27ca}ion-card[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   .tit[_ngcontent-%COMP%]{text-align:center;font-family:Irish Grover;font-style:normal;font-weight:700;font-size:24px;margin-left:300px;justify-content:center;align-content:center;color:#9f27ca}ion-card[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{text-align:center;padding-left:5%;font-family:Irish Grover;font-style:normal;font-weight:700;font-size:24px;margin-left:-30px;justify-content:center;color:#9f27ca}ion-card[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%]{font-family:Inter;font-style:normal;font-weight:600;font-size:15px;line-height:18px}ion-card[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background: transparent}ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%], ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.8rem;font-weight:700;letter-spacing:.8px}ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]{background:transparent;display:block}ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-fab-button[_ngcontent-%COMP%]{margin-right:2.5vh}ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]{border-radius:20px 20px 0 0}ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-list-header[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{font-weight:700;font-size:1.8em}ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%], ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%]{font-size:.9em}ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%]{font-size:.75em!important}ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{margin-top:1.5vh;margin-bottom:3px}ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   #otp[_ngcontent-%COMP%]{margin-top:3vh;margin-bottom:5px}ion-card[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{border:none;outline:none;appearance:none}ion-footer[_ngcontent-%COMP%]{height:88%}ion-footer[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]{height:100%;border-radius:20px 20px 0 0}ion-footer[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-list-header[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{font-weight:700;font-size:1.8em}ion-footer[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{font-size:.9em;overflow:visible}ion-footer[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]{font-size:1.5em;display:inline-block;width:8vh;height:8vh;border-radius:5px}ion-footer[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   .marginLeft[_ngcontent-%COMP%]{margin-left:3vh}.form-container[_ngcontent-%COMP%]{background-color:#000}.form-input-field[_ngcontent-%COMP%]{text-align:center;position:relative;border:1px solid rgba(69,69,69,.5);border-radius:1rem}.form-input-field[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{position:absolute;top:10%;left:38%;transform:translateY(-50%);transition:transform .2s,font-size .2s;color:#fff6}.form-input-field[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]{margin-top:3rem;padding:2rem}.form-input-field[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]:active{transform:translateY(-100%) scale(.8)}"]})}return d})()}}]);