"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6253],{6253:(U,b,r)=>{r.r(b),r.d(b,{WithdrawalPage:()=>Z});var u=r(5861),t=r(95),s=r(8606),B=r(4716),e=r(6689),k=r(1725),O=r(1517),P=r(7911);let F=(()=>{class c{constructor(n,a,o,i,l,d,g,M){this.router=n,this.modalController=a,this.loadingCtl=o,this.toastController=i,this.animationCtrl=l,this.authService=d,this.toastService=g,this.alertController=M,this.enterAnimation=_=>{const f=_.shadowRoot,p=this.animationCtrl.create().addElement(f.querySelector("ion-backdrop")).fromTo("opacity","0","var(--backdrop-opacity)"),C=this.animationCtrl.create().addElement(f.querySelector(".modal-wrapper")).keyframes([{offset:0,opacity:"0",transform:"scale(0)"},{offset:1,opacity:"1.0",transform:"scale(1)"}]);return this.animationCtrl.create().addElement(_).easing("ease-out").duration(500).addAnimation([p,C])},this.leaveAnimation=_=>this.enterAnimation(_).direction("reverse")}ngOnInit(){}yes(){this.modalController.dismiss(),this.router.navigateByUrl("/register/veri")}Close(){this.modalController.dismiss()}presentToast(n,a){var o=this;return(0,u.Z)(function*(){(yield o.toastController.create({message:n,duration:2e3,position:"bottom",color:a})).present()})()}presentLoading(n,a){var o=this;return(0,u.Z)(function*(){yield(yield o.loadingCtl.create({message:n,spinner:a})).present()})()}presentWithdrawalAlert(n,a,o,i){var l=this;return(0,u.Z)(function*(){let d;switch(n){case"successful":d=`You have successfully sent ${a} to ${l.accountName}.`;break;case"insuficient funds":d=`Your request to withdraw ${a}  could not be completed due to insufficient funds in your account.`;break;case"failed":d="Please enter an amount greater than \u20a650.";break;default:d="An unknown error occurred!! ${<br>} Please try again later"}yield(yield l.alertController.create({header:o||"Transaction Status",subHeader:i,buttons:[{text:"Go Back",cssClass:"purple-button",handler:()=>{"failed"!==n&&l.router.navigateByUrl("/tabs")}}],backdropDismiss:!1,cssClass:"deposit-alert",animated:!0,mode:"ios",message:d})).present()})()}confirmWithdrawal(){var n=this;return(0,u.Z)(function*(){const a={amount:n.amount,bank_code:n.bankCode,bank_name:n.bankName,payfor:n.description,account:n.accountNumber,accountName:n.accountName};n.presentLoading("Processing Withdrawal...","circular"),n.authService.withdraw(a).pipe((0,B.x)(()=>{n.loadingCtl.dismiss()})).subscribe(o=>{console.log(o.message),"Signature verification failed"===o.message&&"/auth-screen"!==n.router.url?(n.toastController.create(),n.presentToast("Session Expired.....Logging out","danger"),n.router.navigateByUrl("/auth-screen")):(console.log("Processing Request",o),console.log("here"),"insuficient funds"===o.message?(console.log("Hello mate"+o.message),n.toastController.create(),n.presentToast(o.message+", Please fund your account and try again","danger"),n.presentWithdrawalAlert(o.message,` \u20a6${a.amount}`,"Incomplete Transaction"),n.loadingCtl.dismiss()):"the amount is too small "===o.message?(n.toastController.create(),n.presentToast(o.message,"danger"),n.presentWithdrawalAlert("failed",` \u20a6${a.amount}`,"Transaction Failed"),console.log("Cameth hereAmount"),n.loadingCtl.dismiss()):"Transaction successful"===o.message?(n.toastController.create(),n.presentToast(o.message,"success"),n.presentWithdrawalAlert("successful",` \u20a6${a.amount}`,"Transaction Successful"),console.log("Cameth here"),n.loadingCtl.dismiss()):(n.toastController.create(),n.presentToast(o.message,"danger"),n.router.navigateByUrl("/tabs"),n.loadingCtl.dismiss()),console.log("I reach here"),n.loadingCtl.dismiss())},o=>{"/withdrawal"===n.router.url&&(console.error("Could not complete your request try again!",o),n.toastService.showToast("Could not complete your request try again!"))}),n.loadingCtl.dismiss()})()}static#e=this.\u0275fac=function(a){return new(a||c)(e.Y36(k.F0),e.Y36(s.IN),e.Y36(s.HT),e.Y36(s.yF),e.Y36(s.vB),e.Y36(O.e),e.Y36(P.k),e.Y36(s.Br))};static#n=this.\u0275cmp=e.Xpm({type:c,selectors:[["app-cwithdraw-modal"]],inputs:{accountName:"accountName",accountNumber:"accountNumber",amount:"amount",description:"description",bankName:"bankName",bankCode:"bankCode",formData:"formData",showGoBackButton:"showGoBackButton"},decls:38,vars:5,consts:[[1,"container"],[1,"table-container"],[1,"sm-velux-logo"],["src","assets/images/sm-velux-logo.png","alt","VeluxPay logo"],[1,"button-container"],["color","success","expand","block",3,"click"],["color","danger","expand","block",3,"click"]],template:function(a,o){1&a&&(e.TgZ(0,"div",0)(1,"h3"),e._uU(2,"Review Withdrawal"),e.qZA(),e.TgZ(3,"div",1)(4,"table")(5,"tbody")(6,"tr")(7,"td"),e._uU(8,"Bank Name"),e.qZA(),e.TgZ(9,"td"),e._uU(10),e.qZA()(),e.TgZ(11,"tr")(12,"td"),e._uU(13,"Account Number"),e.qZA(),e.TgZ(14,"td"),e._uU(15),e.qZA()(),e.TgZ(16,"tr")(17,"td"),e._uU(18,"Account Name"),e.qZA(),e.TgZ(19,"td"),e._uU(20),e.qZA()(),e.TgZ(21,"tr")(22,"td"),e._uU(23,"Amount"),e.qZA(),e.TgZ(24,"td"),e._uU(25),e.qZA()(),e.TgZ(26,"tr")(27,"td"),e._uU(28,"Description"),e.qZA(),e.TgZ(29,"td"),e._uU(30),e.qZA()()()()(),e.TgZ(31,"div",2),e._UZ(32,"img",3),e.qZA(),e.TgZ(33,"div",4)(34,"button",5),e.NdJ("click",function(){return o.confirmWithdrawal()}),e._uU(35,"Confirm Withdrawal"),e.qZA(),e.TgZ(36,"button",6),e.NdJ("click",function(){return o.Close()}),e._uU(37,"Cancel"),e.qZA()()()),2&a&&(e.xp6(10),e.Oqu(o.bankName),e.xp6(5),e.Oqu(o.accountNumber),e.xp6(5),e.Oqu(o.accountName),e.xp6(5),e.Oqu(o.amount),e.xp6(5),e.Oqu(o.description))},styles:['ion-modal[_ngcontent-%COMP%]{--height: 50%;--border-radius: 16px;--box-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--width: fit-content;--min-width: 90%}ion-content[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}ion-modal[_ngcontent-%COMP%]::part(backdrop){background:rgb(209,213,219);opacity:1}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background:white;--color: black}table[_ngcontent-%COMP%]{width:100%;table-layout:fixed}th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{padding-bottom:10px;border:1px solid transparent}td[_ngcontent-%COMP%]:first-child{text-align:left;font-size:15px}td[_ngcontent-%COMP%]:last-child{text-align:right;font-size:15px;color:var(--ion-color-base)}.transaction-modal[_ngcontent-%COMP%]{--background: transparent;--width: 90%;--height: auto;--border-radius: 10px;--padding: 0;--box-shadow: 0 0 10px rgba(0, 0, 0, .5)}.transaction-modal[_ngcontent-%COMP%]   ion-content[_ngcontent-%COMP%]{--height: 50%;--border-radius: 16px;--box-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--width: fit-content;--min-width: 90%;--background: white}.transaction-modal[_ngcontent-%COMP%]   ion-header[_ngcontent-%COMP%]{--background: #f8f8f8;--border-top-left-radius: 10px;--border-top-right-radius: 10px;--box-shadow: none}.container[_ngcontent-%COMP%]   .message-container[_ngcontent-%COMP%]{margin-top:20px;text-align:center}.container[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]{position:absolute;top:10px;left:10px;font-size:24px;cursor:pointer;color:#000;z-index:9999}.container[_ngcontent-%COMP%]   .status-image[_ngcontent-%COMP%]{width:80%;height:auto;margin-bottom:10px}.transaction-modal[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]{margin-bottom:20px}.transaction-modal[_ngcontent-%COMP%]{margin-top:25%;display:flex;justify-content:center;align-items:center;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:100%;height:100%;background-color:#00000080;z-index:9999}.ion-padding[_ngcontent-%COMP%]{margin-top:25%;max-width:400px;text-align:center;background-color:#fff;padding:20px;border-radius:10px;box-shadow:0 2px 4px #0000001a}.sub-header[_ngcontent-%COMP%]{font-size:18px;margin-bottom:10px}.message-container[_ngcontent-%COMP%]{margin-top:90%;margin-bottom:15px}.message[_ngcontent-%COMP%]{font-size:16px;line-height:1.5;font-weight:800;text-align:center;color:#f8f8f8}.container[_ngcontent-%COMP%]{background-color:#000;width:90%;margin-top:50%;height:55vh;margin-left:5%;margin-right:5%;border-radius:10px;display:flex;flex-direction:column;justify-content:center;align-items:center}.container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:20px;color:#f8f8f8;font-weight:bolder;margin-bottom:8%}.container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-weight:700;padding-inline:1.2rem;padding-block:.8rem;border-radius:.6rem;background:#7E219E;margin-bottom:10px;color:#fff}.container[_ngcontent-%COMP%]:before{content:"";position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000031;z-index:-999999}']})}return c})();var h=r(6814),A=r(9140);function x(c,m){1&c&&(e.TgZ(0,"h2",20),e._uU(1,"When Will I get my funds?"),e.qZA(),e.TgZ(2,"h3",21),e._uU(3," Withdrawals will reach your bank account within a few minutes. Some Withdrawals may take 1-2 days, depending on delays at our banking partners. "),e.qZA())}const N=function(c){return{color:c}};function y(c,m){if(1&c&&e._UZ(0,"ion-input",22),2&c){const n=e.oxw();e.s9C("value",n.accountName),e.Q6J("ngStyle",e.VKq(2,N,"Invalid Account number or bank"===n.accountName?"red":""))}}function w(c,m){if(1&c){const n=e.EpF();e.ynx(0),e.TgZ(1,"ion-item",26),e.NdJ("click",function(){const i=e.CHM(n).$implicit,l=e.oxw(3);return e.KtG(l.onBankSelect(i))}),e.TgZ(2,"ion-label")(3,"h2"),e._uU(4),e.qZA()()(),e.BQk()}if(2&c){const n=m.$implicit;e.xp6(4),e.Oqu(null==n?null:n.name)}}function T(c,m){if(1&c&&(e.TgZ(0,"ion-list"),e.YNc(1,w,5,1,"ng-container",25),e.qZA()),2&c){const n=e.oxw(2);e.xp6(1),e.Q6J("ngForOf",n.filteredBanks)}}function v(c,m){if(1&c){const n=e.EpF();e.TgZ(0,"ion-content")(1,"ion-searchbar",23),e.NdJ("ngModelChange",function(o){e.CHM(n);const i=e.oxw();return e.KtG(i.searchTerm=o)})("ionInput",function(){e.CHM(n);const o=e.oxw();return e.KtG(o.filterBank())}),e.qZA(),e.YNc(2,T,2,1,"ion-list",24),e.qZA()}if(2&c){const n=e.oxw();e.xp6(1),e.Q6J("ngModel",n.searchTerm),e.xp6(1),e.Q6J("ngIf",(null==n.banks?null:n.banks.length)>=1)}}const S=function(){return[0,1]},I=function(){return[0,.25,.5,.75]};let Z=(()=>{class c{constructor(n,a,o,i,l,d,g,M,_,f,p,C,E){this.loadingCtrl=n,this.loadingController=a,this.loadingCtl=o,this.formBuilder=i,this.router=l,this.modalCtrl=d,this.modalController=g,this.toastCtrl=M,this.toastController=_,this.storage=f,this.authService=p,this.toastService=C,this.alertController=E,this.currentDate=new Date,this.bankx=[],this.otpTime=60,this.otpDisabled=!1,this.resendTime=30,this.resendDisabled=!1,this.isLoading=!1,this.type=!0,this.verified=!1,this.showSpinner=!1,this.showOtpForm=!1,this.callCount=0,this.banks=[{code:"120001",name:"9 Payment Service Bank",has_acc_no:!1,ussd:"990"},{code:"090270",name:"AB Microfinance bank",has_acc_no:!1,ussd:""},{code:"070010",name:"ABBEY MORTGAGE BANK",has_acc_no:!1,ussd:"332"},{code:"090260",name:"Above Only Microfinance bank",has_acc_no:!1,ussd:""},{code:"090197",name:"ABU Microfinance bank",has_acc_no:!1,ussd:"755"},{code:"090424",name:"Abucoop Microfinance Bank",has_acc_no:!1,ussd:""},{code:"000014",name:"Access Bank",has_acc_no:!0,ussd:"901"},{code:"000005",name:"Access Bank (Diamond)",has_acc_no:!0,ussd:"901"},{code:"100013",name:"AccessMobile",has_acc_no:!1,ussd:"901"},{code:"090134",name:"ACCION MFB",has_acc_no:!1,ussd:"572"},{code:"090160",name:"Addosser MFBB",has_acc_no:!1,ussd:""},{code:"090268",name:"Adeyemi College Staff Microfinance bank",has_acc_no:!1,ussd:""},{code:"100028",name:"AG MORTGAGE BANK PLC",has_acc_no:!1,ussd:""},{code:"090133",name:"AL-BARKAH MFB",has_acc_no:!1,ussd:""},{code:"090259",name:"Alekun Microfinance bank",has_acc_no:!1,ussd:""},{code:"090277",name:"Alhayat MFB",has_acc_no:!1,ussd:""},{code:"090131",name:"ALLWORKERS MFB",has_acc_no:!1,ussd:""},{code:"090169",name:"Alphakapital MFB",has_acc_no:!1,ussd:""},{code:"090180",name:"Amju MFB",has_acc_no:!1,ussd:""},{code:"090116",name:"AMML MFB",has_acc_no:!1,ussd:""},{code:"090143",name:"APEKS Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090282",name:"Arise MFB",has_acc_no:!1,ussd:""},{code:"090001",name:"ASOSavings",has_acc_no:!1,ussd:""},{code:"090426",name:"ASSURED MFB",has_acc_no:!1,ussd:""},{code:"090172",name:"Astrapolis MFB",has_acc_no:!1,ussd:""},{code:"090264",name:"Auchi Microfinance bank",has_acc_no:!1,ussd:""},{code:"090188",name:"Baines Credit MFB",has_acc_no:!1,ussd:""},{code:"090425",name:"Banex MFB",has_acc_no:!1,ussd:""},{code:"090127",name:"BC Kash MFB",has_acc_no:!1,ussd:""},{code:"090431",name:"BLUEWHALES MFB",has_acc_no:!1,ussd:""},{code:"090117",name:"Boctrust Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090319",name:"BONGHE MFB",has_acc_no:!1,ussd:""},{code:"090176",name:"Bosak MFB",has_acc_no:!1,ussd:""},{code:"090148",name:"Bowen MFB",has_acc_no:!1,ussd:""},{code:"070015",name:"Brent Mortgage Bank",has_acc_no:!1,ussd:""},{code:"090293",name:"Brethren MFB",has_acc_no:!1,ussd:""},{code:"090363",name:"Bridgeway MFB",has_acc_no:!1,ussd:""},{code:"090445",name:"CAPSTONE MFB",has_acc_no:!1,ussd:""},{code:"100005",name:"Cellulant",has_acc_no:!1,ussd:""},{code:"090154",name:"CEMCS MFB",has_acc_no:!1,ussd:""},{code:"090397",name:"Chanelle MFB",has_acc_no:!1,ussd:""},{code:"090470",name:"Changan RTS MFB",has_acc_no:!1,ussd:""},{code:"090440",name:"CHERISH MFB",has_acc_no:!1,ussd:""},{code:"090416",name:"CHIBUEZE MFB",has_acc_no:!1,ussd:""},{code:"090141",name:"Chikum Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090144",name:"CIT Microfinance Bank",has_acc_no:!1,ussd:""},{code:"000009",name:"Citi Bank",has_acc_no:!1,ussd:""},{code:"090380",name:"Conpro MFB",has_acc_no:!1,ussd:""},{code:"090130",name:"CONSUMER  MFB",has_acc_no:!1,ussd:""},{code:"100032",name:"Contec Global",has_acc_no:!1,ussd:""},{code:"070021",name:"COOP Mortgage Bank",has_acc_no:!1,ussd:""},{code:"060001",name:"Coronation",has_acc_no:!1,ussd:""},{code:"070006",name:"Covenant MFB",has_acc_no:!1,ussd:""},{code:"090159",name:"Credit Afrique MFB",has_acc_no:!1,ussd:""},{code:"090429",name:"CROSS RIVER MFB",has_acc_no:!1,ussd:""},{code:"090414",name:"CRUTECH MFB",has_acc_no:!1,ussd:""},{code:"090167",name:"Daylight Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090156",name:"e-BARCs MFB",has_acc_no:!1,ussd:""},{code:"100021",name:"Eartholeum",has_acc_no:!1,ussd:""},{code:"000010",name:"ECOBANK",has_acc_no:!0,ussd:"326"},{code:"100008",name:"Ecobank Xpress Account",has_acc_no:!1,ussd:"326"},{code:"090097",name:"Ekondo MFB",has_acc_no:!1,ussd:""},{code:"090273",name:"Emeralds MFB",has_acc_no:!1,ussd:""},{code:"090114",name:"EmpireTrust Microfinance bank",has_acc_no:!1,ussd:""},{code:"000019",name:"Enterprise Bank",has_acc_no:!1,ussd:""},{code:"090189",name:"Esan MFB",has_acc_no:!1,ussd:""},{code:"090166",name:"Eso-E Microfinance Bank",has_acc_no:!1,ussd:""},{code:"100006",name:"eTranzact",has_acc_no:!1,ussd:""},{code:"090330",name:"Fame MFB",has_acc_no:!1,ussd:""},{code:"090179",name:"FAST MFB",has_acc_no:!1,ussd:""},{code:"090107",name:"FBN Morgages Limited",has_acc_no:!1,ussd:""},{code:"100014",name:"FBNMobile",has_acc_no:!1,ussd:""},{code:"060002",name:"FBNQuest MERCHANT BANK",has_acc_no:!1,ussd:""},{code:"000003",name:"FCMB",has_acc_no:!0,ussd:"329"},{code:"100031",name:"FCMB Easy Account",has_acc_no:!1,ussd:""},{code:"100001",name:"FET",has_acc_no:!1,ussd:""},{code:"090153",name:"FFS Microfinance Bank",has_acc_no:!1,ussd:""},{code:"000007",name:"Fidelity Bank",has_acc_no:!0,ussd:"770"},{code:"100019",name:"Fidelity Mobile",has_acc_no:!1,ussd:""},{code:"090126",name:"FidFund MFB",has_acc_no:!1,ussd:""},{code:"090111",name:"FinaTrust Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090281",name:"Finex MFB",has_acc_no:!1,ussd:""},{code:"000016",name:"First Bank",has_acc_no:!0,ussd:"894"},{code:"070014",name:"First Generation Mortgage Bank",has_acc_no:!1,ussd:""},{code:"090163",name:"First Multiple MFB",has_acc_no:!1,ussd:""},{code:"090164",name:"First Royal Microfinance Bank",has_acc_no:!1,ussd:""},{code:"070002",name:"Fortis Microfinance Bank",has_acc_no:!1,ussd:""},{code:"100016",name:"FortisMobile",has_acc_no:!1,ussd:""},{code:"400001",name:"FSDH",has_acc_no:!1,ussd:""},{code:"090145",name:"Full range MFB",has_acc_no:!1,ussd:""},{code:"090438",name:"FUTMINNA MFB",has_acc_no:!1,ussd:""},{code:"090158",name:"FUTO MFB",has_acc_no:!1,ussd:""},{code:"090168",name:"Gashua Microfinance Bank",has_acc_no:!1,ussd:""},{code:"070009",name:"GATEWAY MORTGAGE BANK",has_acc_no:!1,ussd:""},{code:"090411",name:"GIGINYA MFB",has_acc_no:!1,ussd:""},{code:"090441",name:"GIWA MICROFINANCE BANK",has_acc_no:!1,ussd:""},{code:"000027",name:"GLOBUS Bank",has_acc_no:!1,ussd:""},{code:"090278",name:"Glory MFB",has_acc_no:!1,ussd:""},{code:"100022",name:"GoMoney",has_acc_no:!1,ussd:""},{code:"090122",name:"GOWANS MFB",has_acc_no:!1,ussd:""},{code:"090178",name:"GreenBank MFB",has_acc_no:!1,ussd:""},{code:"090269",name:"Greenville Microfinance bank",has_acc_no:!1,ussd:""},{code:"060004",name:"GREENWICH Merchant Bank",has_acc_no:!1,ussd:""},{code:"090195",name:"Grooming Microfinance bank",has_acc_no:!1,ussd:""},{code:"000013",name:"GTBank",has_acc_no:!0,ussd:"737"},{code:"100009",name:"GTMobile",has_acc_no:!1,ussd:""},{code:"090147",name:"Hackman Microfinance Bank",has_acc_no:!1,ussd:""},{code:"070017",name:"Haggai Mortgage Bank",has_acc_no:!1,ussd:""},{code:"090121",name:"HASAL MFB",has_acc_no:!1,ussd:""},{code:"100017",name:"Hedonmark",has_acc_no:!1,ussd:""},{code:"000020",name:"Heritage",has_acc_no:!0,ussd:"322"},{code:"090418",name:"HIGHLAND MFB",has_acc_no:!1,ussd:""},{code:"120002",name:"Hope PSB",has_acc_no:!1,ussd:""},{code:"090118",name:"IBILE Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090279",name:"Ikire MFB",has_acc_no:!1,ussd:""},{code:"090350",name:"ILORIN MFB",has_acc_no:!1,ussd:""},{code:"090258",name:"Imo Microfinance bank",has_acc_no:!1,ussd:""},{code:"100024",name:"Imperial Homes Mortgage Bank",has_acc_no:!1,ussd:""},{code:"090157",name:"Infinity MFB",has_acc_no:!1,ussd:""},{code:"070016",name:"Infinity trust  Mortgage Bank",has_acc_no:!1,ussd:""},{code:"100029",name:"Innovectives Kesh",has_acc_no:!1,ussd:""},{code:"090434",name:"Insight MFB",has_acc_no:!1,ussd:""},{code:"100027",name:"Intellifin",has_acc_no:!1,ussd:""},{code:"090149",name:"IRL Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090421",name:"Izon Microfinance Bank",has_acc_no:!1,ussd:""},{code:"000006",name:"JAIZ Bank",has_acc_no:!1,ussd:""},{code:"090003",name:"JubileeLife",has_acc_no:!1,ussd:""},{code:"090191",name:"KCMB MFB",has_acc_no:!1,ussd:""},{code:"100015",name:"Kegow",has_acc_no:!1,ussd:""},{code:"000002",name:"Keystone Bank",has_acc_no:!0,ussd:"7111"},{code:"090267",name:"Kuda Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090450",name:"KWASU MFB",has_acc_no:!1,ussd:""},{code:"090155",name:"La Fayette Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090422",name:"LANDGOLD MFB",has_acc_no:!1,ussd:""},{code:"090177",name:"Lapo MFB",has_acc_no:!1,ussd:""},{code:"090271",name:"Lavender Microfinance bank",has_acc_no:!1,ussd:""},{code:"070012",name:"LBIC Mortgage Bank",has_acc_no:!1,ussd:""},{code:"090420",name:"LETSHEGO MFB",has_acc_no:!1,ussd:""},{code:"090435",name:"LINKS MFB",has_acc_no:!1,ussd:""},{code:"000029",name:"LOTUS BANK",has_acc_no:!1,ussd:""},{code:"090265",name:"Lovonus Microfinance bank",has_acc_no:!1,ussd:""},{code:"090171",name:"Mainstreet MFB",has_acc_no:!1,ussd:""},{code:"090174",name:"Malachy MFB",has_acc_no:!1,ussd:""},{code:"090423",name:"MAUTECH MFB",has_acc_no:!1,ussd:""},{code:"090280",name:"Megapraise Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090432",name:"Memphis MFB",has_acc_no:!1,ussd:""},{code:"090275",name:"Meridian MFB",has_acc_no:!1,ussd:""},{code:"090136",name:"Microcred Microfinance Bank",has_acc_no:!1,ussd:""},{code:"100011",name:"Mkudi",has_acc_no:!1,ussd:""},{code:"100020",name:"MoneyBox",has_acc_no:!1,ussd:""},{code:"090129",name:"MONEYTRUST MFB",has_acc_no:!1,ussd:""},{code:"090190",name:"Mutual Benefits MFB",has_acc_no:!1,ussd:""},{code:"090151",name:"Mutual Trust Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090152",name:"Nargata MFB",has_acc_no:!1,ussd:""},{code:"090263",name:"Navy Microfinance bank",has_acc_no:!1,ussd:""},{code:"090128",name:"Ndiorah MFB",has_acc_no:!1,ussd:""},{code:"090108",name:"New Prudential Bank",has_acc_no:!1,ussd:""},{code:"090205",name:"Newdawn Microfinance bank",has_acc_no:!1,ussd:""},{code:"090459",name:"NICE MFB",has_acc_no:!1,ussd:""},{code:"090194",name:"NIRSAL National microfinance bank",has_acc_no:!1,ussd:""},{code:"060003",name:"NOVA MB",has_acc_no:!1,ussd:""},{code:"070001",name:"NPF MicroFinance Bank",has_acc_no:!1,ussd:""},{code:"090437",name:"OakLand MFB",has_acc_no:!1,ussd:""},{code:"090119",name:"OHAFIA MFB",has_acc_no:!1,ussd:""},{code:"090161",name:"Okpoga MFB",has_acc_no:!1,ussd:""},{code:"090272",name:"Olabisi Onabanjo university Microfinance bank",has_acc_no:!1,ussd:""},{code:"070007",name:"Omoluabi Mortgage Bank Plc",has_acc_no:!1,ussd:""},{code:"100026",name:"ONE FINANCE",has_acc_no:!1,ussd:""},{code:"090460",name:"ORITABASORUN MFB",has_acc_no:!1,ussd:""},{code:"090456",name:"OSPOLY MFB",has_acc_no:!1,ussd:""},{code:"100002",name:"Paga",has_acc_no:!1,ussd:""},{code:"070008",name:"PAGE FINANCIALS",has_acc_no:!1,ussd:""},{code:"100033",name:"PalmPay",has_acc_no:!1,ussd:""},{code:"000030",name:"Parallex",has_acc_no:!1,ussd:""},{code:"090390",name:"PARKWAY MFB",has_acc_no:!1,ussd:""},{code:"100003",name:"Parkway-ReadyCash",has_acc_no:!1,ussd:""},{code:"090004",name:"Parralex",has_acc_no:!1,ussd:""},{code:"110001",name:"PayAttitude Online",has_acc_no:!1,ussd:""},{code:"100004",name:"Paycom",has_acc_no:!1,ussd:""},{code:"090402",name:"PEACE MFB",has_acc_no:!1,ussd:""},{code:"090137",name:"Pecan Trust Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090196",name:"Pennywise Microfinance bank",has_acc_no:!1,ussd:""},{code:"090135",name:"Personal Trust Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090165",name:"Petra Microfinance Bank",has_acc_no:!1,ussd:""},{code:"070013",name:"PLATINUM MORTGAGE BANK",has_acc_no:!1,ussd:""},{code:"000008",name:"POLARIS BANK",has_acc_no:!0,ussd:"833"},{code:"090274",name:"Prestige Microfinance bank",has_acc_no:!1,ussd:""},{code:"000023",name:"Providus Bank",has_acc_no:!0,ussd:""},{code:"090261",name:"QuickFund Microfinance bank",has_acc_no:!1,ussd:""},{code:"090170",name:"Rahama MFB",has_acc_no:!1,ussd:""},{code:"000024",name:"Rand Merchant Bank",has_acc_no:!1,ussd:""},{code:"070011",name:"Refuge Mortgage Bank",has_acc_no:!1,ussd:""},{code:"090125",name:"REGENT MFB",has_acc_no:!1,ussd:""},{code:"090173",name:"Reliance MFB",has_acc_no:!1,ussd:""},{code:"090198",name:"Renmoney Microfinance bank",has_acc_no:!1,ussd:""},{code:"090132",name:"RICHWAY MFB",has_acc_no:!1,ussd:""},{code:"090433",name:"RIGO MFB",has_acc_no:!1,ussd:""},{code:"090405",name:"Rolez Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090138",name:"Royal Exchange Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090175",name:"Rubies MFB",has_acc_no:!1,ussd:""},{code:"090286",name:"Safe Haven MFB",has_acc_no:!1,ussd:""},{code:"090485",name:"SAFEGATE MFB",has_acc_no:!1,ussd:""},{code:"090006",name:"SafeTrust",has_acc_no:!1,ussd:""},{code:"090140",name:"Sagamu Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090112",name:"Seed Capital Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090325",name:"Sparkle",has_acc_no:!1,ussd:""},{code:"090436",name:"Spectrum MFB",has_acc_no:!1,ussd:""},{code:"100007",name:"Stanbic IBTC @ease Wallet",has_acc_no:!1,ussd:"909"},{code:"000012",name:"StanbicIBTC Bank",has_acc_no:!0,ussd:""},{code:"000021",name:"StandardChartered",has_acc_no:!0,ussd:"977"},{code:"090162",name:"Stanford MFB",has_acc_no:!1,ussd:""},{code:"070022",name:"STB Mortgage Bank",has_acc_no:!1,ussd:""},{code:"090262",name:"Stellas Microfinance bank",has_acc_no:!1,ussd:""},{code:"000001",name:"Sterling Bank",has_acc_no:!0,ussd:"822"},{code:"090340",name:"STOCKCORP MFB",has_acc_no:!1,ussd:""},{code:"090302",name:"SUNBEAM MFB",has_acc_no:!1,ussd:""},{code:"000022",name:"SUNTRUST BANK",has_acc_no:!1,ussd:""},{code:"090446",name:"SUPPORT MFB",has_acc_no:!1,ussd:""},{code:"100023",name:"TagPay",has_acc_no:!1,ussd:""},{code:"000026",name:"Taj Bank",has_acc_no:!1,ussd:""},{code:"090115",name:"TCF",has_acc_no:!1,ussd:""},{code:"100010",name:"TeasyMobile",has_acc_no:!1,ussd:""},{code:"000025",name:"Titan Trust Bank",has_acc_no:!0,ussd:"922"},{code:"090146",name:"Trident Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090005",name:"Trustbond",has_acc_no:!1,ussd:""},{code:"000004",name:"UBA",has_acc_no:!0,ussd:"919"},{code:"090461",name:"UNIBADAN MFB",has_acc_no:!1,ussd:""},{code:"090266",name:"Uniben Microfinance bank",has_acc_no:!1,ussd:""},{code:"090193",name:"Unical MFB",has_acc_no:!1,ussd:""},{code:"090341",name:"UNIILORIN MFB",has_acc_no:!1,ussd:""},{code:"000018",name:"Union Bank",has_acc_no:!0,ussd:"826"},{code:"000011",name:"Unity Bank",has_acc_no:!0,ussd:"7799"},{code:"090123",name:"Verite Microfinance Bank",has_acc_no:!1,ussd:""},{code:"999999",name:"VFD MICROFINANCE BANK",has_acc_no:!1,ussd:"5037"},{code:"090150",name:"Virtue MFB",has_acc_no:!1,ussd:""},{code:"090139",name:"Visa Microfinance Bank",has_acc_no:!1,ussd:""},{code:"100012",name:"VTNetworks",has_acc_no:!1,ussd:""},{code:"000017",name:"Wema Bank",has_acc_no:!0,ussd:"945"},{code:"090120",name:"WETLAND MFB",has_acc_no:!1,ussd:""},{code:"090124",name:"XSLNCE Microfinance Bank",has_acc_no:!1,ussd:""},{code:"090142",name:"Yes MFB",has_acc_no:!1,ussd:""},{code:"000015",name:"Zenith Bank",has_acc_no:!0,ussd:"966"},{code:"100018",name:"ZenithMobile",has_acc_no:!1,ussd:""},{code:"100025",name:"Zinternet - KongaPay",has_acc_no:!1,ussd:""}],this.accountName=[],this.filteredBanks=[],this.searchTerm="",this.validationMessage="",this.postData={amount:"",tagname:"",phone:"",password:"",email:"",confirmPassword:""},this.initForm()}onBankSelect(n){this.selectedBank=n,console.log(n.name),console.log(n.code),this.form.patchValue({bankName:n.name}),this.bankCode=n.code,console.log(this.form.get("bankName").value),console.log(this.bankCode),this.modalController.dismiss()}filterBanks(){Array.isArray(this.banks)&&(this.filteredBanks=this.banks.filter(n=>n.name.toLowerCase().includes(this.searchTerm.toLowerCase())))}filterBank(){console.log(this.filteredBanks),Array.isArray(this.banks)&&(this.filteredBanks=this.banks.filter(n=>n.name.toLowerCase().includes(this.searchTerm.toLowerCase())))}ngOnInit(){const n=localStorage.getItem("userData");n&&(this.userData=JSON.parse(n));const a=localStorage.getItem("balance");this.aBalance=JSON.parse(a),console.log(JSON.parse(a)),this.filteredBanks=this.banks,this.selectedBank=null}getAccountName(){const n={bank_code:this.bankCode,account:this.form.get("accountNumber").value};this.authService.getName(n).pipe((0,B.x)(()=>{this.loadingCtrl.dismiss()})).subscribe(a=>{JSON.stringify(a),console.log(JSON.stringify(a)+"Hello mate"),console.log("Searching bank name"),console.log(JSON.stringify(a.accountName)+"Hello matey"),"Signature verification failed"===a.message&&"/auth-screen"!==this.router.url?(localStorage.removeItem("userData"),localStorage.removeItem("res"),localStorage.removeItem("accessT"),this.loadingCtl.dismiss(),this.toastController.create(),this.presentToast("Session Expired.....Logging out","danger"),this.router.navigateByUrl("/auth-screen")):a.accountName?(console.log(a),this.accountName=a.accountName,this.loadingCtl.dismiss(),this.toastController.create(),this.presentToast("Account Found","success"),this.validationMessage=a):(this.accountName="Invalid Account number or bank",this.toastController.create(),this.presentToast("Account not found","danger"),this.validationMessage="Account not Found",this.loadingCtl.dismiss()),this.loadingCtl.dismiss()})}presentLoading(n,a){var o=this;return(0,u.Z)(function*(){yield(yield o.loadingCtl.create({message:n,spinner:a})).present()})()}customCounterFormatterE(n,a){return a-n+" characters remaining"}customCounterFormatterD(n,a){return a-n+" characters remaining"}onNumberChange(n){console.log("Hi"+n),console.log(n.target.value);const a=n.target.value;10===a.length&&(console.log("User entered a 10-digit number:",a),console.log("Divine",this.form.get("bankName").value),console.log("Divinex",this.bankCode),"/withdrawal"===this.router.url&&(this.presentLoading("Searching for Account...","crescent"),setTimeout(()=>{this.getAccountName()},1e3),setTimeout(()=>{this.loadingCtl.dismiss()},1e4)))}initForm(){this.form=new t.cw({bankName:new t.NI(null,{validators:[t.kI.required]}),email:new t.NI(null,{validators:[t.kI.required]}),accountName:new t.NI(null,{validators:[t.kI.required]}),accountNumber:new t.NI(null,{validators:[t.kI.required,t.kI.minLength(10),t.kI.maxLength(10)]}),amountx:new t.NI(null,{validators:[t.kI.required,t.kI.minLength(3)]})})}isFormValid(){return Object.values(this.form.value).every(n=>!!n)}showDate(){this.currentDate.toLocaleString()}changeType(){this.type=!this.type}showLoader(n){return this.isLoading||(this.isLoading=!0),this.loadingCtrl.create({message:n,spinner:"bubbles"}).then(a=>{a.present().then(()=>{this.isLoading||a.dismiss().then(()=>{console.log("abort presenting")})})}).catch(a=>{this.isLoading=!1,console.log(a)})}hideLoader(){return this.isLoading&&(this.isLoading=!1),this.loadingCtrl.dismiss().then(()=>console.log("dismissed")).catch(n=>console.log(n))}presentToast(n,a){var o=this;return(0,u.Z)(function*(){(yield o.toastController.create({message:n,duration:2e3,position:"bottom",color:a})).present()})()}submitForm(){var n=this;return(0,u.Z)(function*(){n.charge=50,console.log(n.amounted),n.amounted=parseFloat(n.form.get("amountx").value),n.charge=parseFloat("50");const o={amount:n.amounted+n.charge-n.charge,bank_code:n.bankCode,bank_name:n.form.get("bankName").value,payfor:`/${n.userData?.loginData.full_name}/${n.form.get("email").value}`,account:n.form.get("accountNumber").value,accountName:n.accountName};yield n.emailPr(o)})()}emailPr(n){var a=this;return(0,u.Z)(function*(){yield(yield a.modalController.create({component:F,componentProps:{accountName:n.accountName,accountNumber:n.account,amount:n.amount,description:n.payfor,bankName:n.bank_name,bankCode:n.bank_code},cssClass:"transaction-modal"})).present()})()}static#e=this.\u0275fac=function(a){return new(a||c)(e.Y36(s.HT),e.Y36(s.HT),e.Y36(s.HT),e.Y36(t.qu),e.Y36(k.F0),e.Y36(s.IN),e.Y36(s.IN),e.Y36(s.yF),e.Y36(s.yF),e.Y36(A.yW),e.Y36(O.e),e.Y36(P.k),e.Y36(s.Br))};static#n=this.\u0275cmp=e.Xpm({type:c,selectors:[["app-withdrawal"]],standalone:!0,features:[e.jDz],decls:42,vars:14,consts:[[1,"ion-no-margin"],["defaultHref","/tabs/home","mode","ios"],[1,"ion-text-center",2,"color","#7e219e"],["size","small","color","warning","name","help","id","open-modalq","expand","block",1,"scan",2,"float","right"],["trigger","open-modalq",1,"ion-modal",3,"initialBreakpoint","breakpoints"],["lines","full"],[3,"formGroup"],[1,"ion-margin-vertical"],["lines","none","id","open-bankL"],["label","Bank Name:","label-placement","stacked","minlength","3","errorText","*Bank Name is required.","formControlName","bankName","type","text"],["lines","none"],["label","Account Number:","label-placement","floating","minlength","10","maxlength","10","errorText","* Account Number is required and must be valid.","formControlName","accountNumber","type","text",3,"ionInput"],["label","Account Name:","label-placement","floating","formControlName","accountName","errorText","* Account Name is required and must be valid.","type","text","readonly","","name","accountName",3,"value","ngStyle",4,"ngIf"],["label","Amount*","label-placement","floating","minlength","3","errorText","* Amount is required and must be greater than or equal to \u20a6100.","formControlName","amountx","type","number",3,"counterFormatter"],["label","Description:","errorText","* Payment Description is required and must be a valid email address.","formControlName","email","labelPlacement","floating","fill","outline","placeholder","Enter payment description"],["trigger","open-bankL",1,"search-bar",3,"initialBreakpoint","breakpoints"],["modal1",""],[3,"message","duration","showBackdrop","translucent","spinner"],["color","secondary","disabled","",1,"ion-padding","tf"],["type","submit","size","large","expand","block","shape","round","color","warning",1,"ion-margin-horizontal",3,"click"],[1,"blockx"],[1,"blocky","ion-padding"],["label","Account Name:","label-placement","floating","formControlName","accountName","errorText","* Account Name is required and must be valid.","type","text","readonly","","name","accountName",3,"value","ngStyle"],["placeholder","Search Banks",3,"ngModel","ngModelChange","ionInput"],[4,"ngIf"],[4,"ngFor","ngForOf"],[3,"click"]],template:function(a,o){1&a&&(e.TgZ(0,"ion-content")(1,"ion-card",0)(2,"ion-card-header")(3,"ion-buttons"),e._UZ(4,"ion-back-button",1),e.qZA(),e.TgZ(5,"ion-card-title")(6,"h3",2),e._uU(7," Withdrawal Form "),e._UZ(8,"ion-icon",3),e.qZA()()(),e.TgZ(9,"ion-card-content")(10,"ion-modal",4),e.YNc(11,x,4,0,"ng-template"),e.qZA(),e.TgZ(12,"ion-list",5)(13,"form",6)(14,"div",7)(15,"ion-item",8),e._UZ(16,"ion-input",9),e.qZA()(),e.TgZ(17,"div",7)(18,"ion-item",10)(19,"ion-input",11),e.NdJ("ionInput",function(l){return o.onNumberChange(l)}),e.qZA()()(),e.TgZ(20,"div",7)(21,"ion-item",10),e.YNc(22,y,1,4,"ion-input",12),e.qZA()(),e.TgZ(23,"div",7)(24,"ion-item",10),e._UZ(25,"ion-input",13),e.qZA()(),e.TgZ(26,"div",7)(27,"ion-item",10),e._UZ(28,"ion-textarea",14),e.qZA()()(),e.TgZ(29,"ion-modal",15,16),e.YNc(31,v,3,2,"ng-template"),e.qZA(),e._UZ(32,"ion-loading",17),e.TgZ(33,"div")(34,"ion-button",18)(35,"ion-text"),e._uU(36,"This transaction has a fee of 50 NGN "),e.qZA()()(),e.TgZ(37,"ion-button",19),e.NdJ("click",function(){return o.submitForm()}),e.TgZ(38,"ion-text"),e._uU(39,"Review withdrawal"),e.qZA()(),e._UZ(40,"br")(41,"br"),e.qZA()()()()),2&a&&(e.xp6(10),e.Q6J("initialBreakpoint",1)("breakpoints",e.DdM(12,S)),e.xp6(3),e.Q6J("formGroup",o.form),e.xp6(9),e.Q6J("ngIf",o.accountName),e.xp6(3),e.Q6J("counterFormatter",o.customCounterFormatterE),e.xp6(4),e.Q6J("initialBreakpoint",.25)("breakpoints",e.DdM(13,I)),e.xp6(3),e.Q6J("message","Please wait...")("duration",1e4)("showBackdrop",!0)("translucent",!0)("spinner","crescent"))},dependencies:[h.ez,h.sg,h.O5,h.PC,t.u5,t._Y,t.JJ,t.JL,t.wO,t.nD,t.On,t.UX,t.sg,t.u,s.Pc,s.YG,s.Sm,s.PM,s.FN,s.Zi,s.Dq,s.W2,s.gu,s.pK,s.Ie,s.Q$,s.q_,s.wh,s.VI,s.yW,s.g2,s.ki,s.as,s.j9,s.oU],styles:["ion-card[_ngcontent-%COMP%]{box-shadow:none!important;padding-top:3vh}ion-card[_ngcontent-%COMP%]   .tit[_ngcontent-%COMP%]{font-style:normal;font-weight:500;font-size:20px}ion-card[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]{font-size:.9rem}ion-card[_ngcontent-%COMP%]   ion-textarea[_ngcontent-%COMP%]{font-size:.97rem}ion-card[_ngcontent-%COMP%]   .balx[_ngcontent-%COMP%]{margin-top:5%}ion-card[_ngcontent-%COMP%]   ion-item.invalid[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]{--border-color: var(--ion-color-danger)}ion-card[_ngcontent-%COMP%]   .search-bar[_ngcontent-%COMP%]{position:fixed;top:0;left:0;right:0;z-index:9999}ion-card[_ngcontent-%COMP%]   ion-item.valid[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]{--border-color: var(--ion-color-success)}ion-card[_ngcontent-%COMP%]   .validation-message[_ngcontent-%COMP%]{font-size:.8rem;color:var(--ion-color-danger);margin-top:.2rem}ion-card[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{text-align:center;position:center;font-family:Irish Grover;font-style:normal;font-weight:700;font-size:24px;color:#9f27ca}ion-card[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   .scan[_ngcontent-%COMP%]{justify-content:flex-end;margin-left:75%;position:absolute;right:0}ion-card[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{text-align:center;font-family:Irish Grover;font-style:normal;font-weight:700;font-size:24px;margin-left:-30px;justify-content:center;color:#9f27ca}ion-card[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%]{font-family:Inter;font-style:normal;font-weight:600;font-size:15px;line-height:18px}ion-card[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background: transparent}ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%], ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.8rem;font-weight:700;letter-spacing:.8px}ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]{background:transparent;display:block}ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-fab-button[_ngcontent-%COMP%]{margin-right:2.5vh}ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]{border-radius:20px 20px 0 0}ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-list-header[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{font-weight:700;font-size:1.8em}ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%], ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%]{font-size:.9em}ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%]{font-size:.75em!important}ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{margin-top:1.5vh;margin-bottom:3px}ion-card[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   #otp[_ngcontent-%COMP%]{margin-top:3vh;margin-bottom:5px}ion-card[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%]{border:none;outline:none;appearance:none}ion-footer[_ngcontent-%COMP%]{height:88%}ion-footer[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]{height:100%;border-radius:20px 20px 0 0}ion-footer[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-list-header[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{font-weight:700;font-size:1.8em}ion-footer[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{font-size:.9em;overflow:visible}ion-footer[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]{font-size:1.5em;display:inline-block;width:8vh;height:8vh;border-radius:5px}ion-footer[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   .marginLeft[_ngcontent-%COMP%]{margin-left:3vh}.blockx[_ngcontent-%COMP%]{width:100%;height:2px;display:flex;margin-left:5%;margin-top:20%;align-items:center;color:#9f27ca}.blocky[_ngcontent-%COMP%]{margin-bottom:35%;width:100%;color:#9f27ca;height:5px;align-items:center;font-size:18px}.block[_ngcontent-%COMP%]{margin-left:5%;align-items:center;text-align:justify}.ion-modal[_ngcontent-%COMP%]{--height: auto;color:#000}"]})}return c})()}}]);