"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5373],{5373:(f,g,r)=>{r.r(g),r.d(g,{LockPage:()=>m});var l=r(5861),s=r(6814),_=r(95),i=r(8606),n=r(6689),u=r(1725);function d(a,P){if(1&a&&n._UZ(0,"img",23),2&a){const e=n.oxw();n.Q6J("src","https://api.veluxpay.com/"+e.userImage,n.LSH)}}function p(a,P){1&a&&n._UZ(0,"img",24)}let m=(()=>{class a{constructor(e,o){this.router=e,this.loadingCtl=o,this.pin=""}ngOnInit(){}getImage(){const e=localStorage.getItem("userImage");e&&(this.userImage=JSON.parse(e))}setFocus(){for(let o=1;o<=6;o++){const t=document.getElementById("pin"+o);t&&(t.style.background=o<=this.pin.length?"var(--ion-color-dark)":"var(--ion-color-base)")}const e=document.querySelector(".numberBox");e&&(e.style.background="var(--ion-color-base)")}presentLoading(e,o){var t=this;return(0,l.Z)(function*(){yield(yield t.loadingCtl.create({message:e,spinner:o})).present()})()}sett(e){this.pin+=e,this.setFocus(),6==this.pin.length&&this.presentLoading("Validating...","crescent")}back1(){this.pin=this.pin.slice(0,-1),this.setFocus()}static#n=this.\u0275fac=function(o){return new(o||a)(n.Y36(u.F0),n.Y36(i.HT))};static#t=this.\u0275cmp=n.Xpm({type:a,selectors:[["app-lock"]],standalone:!0,features:[n.jDz],decls:55,vars:8,consts:[[1,"container"],[1,"avatar-large"],["alt","",3,"src",4,"ngIf"],["src","assets/images/avatar.png","alt","Dummy Image",4,"ngIf"],[1,"numberBox"],["id","pin1",1,"ion-text-center","ion-padding"],["type","password","id","pin1","readonly","","autocomplete","off",1,"ion-text-center","ion-padding",3,"value"],["id","pin2",1,"ion-text-center","ion-padding"],["type","password","id","pin2","readonly","","autocomplete","off",1,"ion-text-center","ion-padding",3,"value"],["id","pin3",1,"ion-text-center","ion-padding"],["type","password","id","pin3","readonly","","autocomplete","off",1,"ion-text-center","ion-padding",3,"value"],["id","pin4",1,"ion-text-center","ion-padding"],["type","password","id","pin4","readonly","","autocomplete","off",1,"ion-text-center","ion-padding",3,"value"],["id","pin5",1,"ion-text-center","ion-padding"],["type","password","id","pin5","readonly","","autocomplete","off",1,"ion-text-center","ion-padding",3,"value"],["id","pin6",1,"ion-text-center","ion-padding"],["type","password","id","pin6","readonly","","autocomplete","off",1,"ion-text-center","ion-padding",3,"value"],[1,"pinL"],[1,"buttons"],["size","4"],["fill","clear",1,"pinB",3,"click"],["fill","clear",1,"button",3,"click"],["color","light","name","backspace"],["alt","",3,"src"],["src","assets/images/avatar.png","alt","Dummy Image"]],template:function(o,t){1&o&&(n.TgZ(0,"ion-content")(1,"div",0)(2,"ion-avatar",1),n.YNc(3,d,1,1,"img",2),n.YNc(4,p,1,0,"img",3),n.qZA(),n.TgZ(5,"div",4)(6,"div",5),n._UZ(7,"ion-input",6),n.qZA(),n.TgZ(8,"div",7),n._UZ(9,"ion-input",8),n.qZA(),n.TgZ(10,"div",9),n._UZ(11,"ion-input",10),n.qZA(),n.TgZ(12,"div",11),n._UZ(13,"ion-input",12),n.qZA(),n.TgZ(14,"div",13),n._UZ(15,"ion-input",14),n.qZA(),n.TgZ(16,"div",15),n._UZ(17,"ion-input",16),n.qZA()(),n.TgZ(18,"ion-list",17)(19,"ion-grid",18)(20,"ion-row")(21,"ion-col",19)(22,"ion-button",20),n.NdJ("click",function(){return t.sett("1")}),n._uU(23,"1"),n.qZA()(),n.TgZ(24,"ion-col",19)(25,"ion-button",20),n.NdJ("click",function(){return t.sett("2")}),n._uU(26,"2"),n.qZA()(),n.TgZ(27,"ion-col",19)(28,"ion-button",20),n.NdJ("click",function(){return t.sett("3")}),n._uU(29,"3"),n.qZA()(),n.TgZ(30,"ion-col",19)(31,"ion-button",20),n.NdJ("click",function(){return t.sett("4")}),n._uU(32,"4"),n.qZA()(),n.TgZ(33,"ion-col",19)(34,"ion-button",20),n.NdJ("click",function(){return t.sett("5")}),n._uU(35,"5"),n.qZA()(),n.TgZ(36,"ion-col",19)(37,"ion-button",20),n.NdJ("click",function(){return t.sett("6")}),n._uU(38,"6"),n.qZA()(),n.TgZ(39,"ion-col",19)(40,"ion-button",20),n.NdJ("click",function(){return t.sett("7")}),n._uU(41,"7"),n.qZA()(),n.TgZ(42,"ion-col",19)(43,"ion-button",20),n.NdJ("click",function(){return t.sett("8")}),n._uU(44,"8"),n.qZA()(),n.TgZ(45,"ion-col",19)(46,"ion-button",20),n.NdJ("click",function(){return t.sett("9")}),n._uU(47,"9"),n.qZA()(),n._UZ(48,"ion-col",19),n.TgZ(49,"ion-col",19)(50,"ion-button",20),n.NdJ("click",function(){return t.sett("0")}),n._uU(51,"0"),n.qZA()(),n.TgZ(52,"ion-col",19)(53,"ion-button",21),n.NdJ("click",function(){return t.back1()}),n._UZ(54,"ion-icon",22),n.qZA()()()()()()()),2&o&&(n.xp6(3),n.Q6J("ngIf",t.userImage),n.xp6(1),n.Q6J("ngIf",!t.userImage),n.xp6(3),n.s9C("value",t.pin.substring(0,1)),n.xp6(2),n.s9C("value",t.pin.substring(1,2)),n.xp6(2),n.s9C("value",t.pin.substring(2,3)),n.xp6(2),n.s9C("value",t.pin.substring(3,4)),n.xp6(2),n.s9C("value",t.pin.substring(3,4)),n.xp6(2),n.s9C("value",t.pin.substring(3,4)))},dependencies:[s.ez,s.O5,_.u5,i.Pc,i.BJ,i.YG,i.wI,i.W2,i.jY,i.gu,i.pK,i.q_,i.Nd,i.j9],styles:["ion-content[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{background-color:inherit;border:none;background:transparent}ion-content[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]{background:transparent;background-color:inherit;color:var(--ion-color-base);border:none;font-size:40px;width:100%;font-weight:700}ion-content[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{margin-top:2rem}ion-content[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   ion-avatar[_ngcontent-%COMP%]{border-radius:50%;border:1px solid var(--ion-color-tertiary);height:4.5rem;width:4.5rem}ion-content[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]{background:transparent}ion-content[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{--padding-bottom: 2%;--padding-start: 0;--padding-end: 0}ion-content[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-toggle[_ngcontent-%COMP%]{margin-right:-.6rem}ion-content[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]{bottom:0}ion-content[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   .pinB[_ngcontent-%COMP%]{width:35%;border:none;box-shadow:none;color:var(--ion-color-base);outline:none;box-shadow:none #fff;padding:4px 0 0 4px;font-weight:200}ion-content[_ngcontent-%COMP%]   .avatar-large[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}ion-content[_ngcontent-%COMP%]   .rounded-input[_ngcontent-%COMP%]{border-radius:560px;background-color:#fff}ion-content[_ngcontent-%COMP%]   .input-row[_ngcontent-%COMP%]{background-color:inherit;display:flex;justify-content:space-between;align-items:center}ion-content[_ngcontent-%COMP%]   .numberBox[_ngcontent-%COMP%]{display:flex;flex-wrap:nowrap;align-items:center;justify-content:center}ion-content[_ngcontent-%COMP%]   .numberBox[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:30px;height:30px;border-radius:105%;background-color:#f0f0f0;margin:20px;align-self:center}ion-content[_ngcontent-%COMP%]   .numberBox[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]{margin-bottom:5px;color:var(--ion-color-base);font-size:20px;font-weight:500!important;align-items:center;justify-content:center;text-align:center}ion-content[_ngcontent-%COMP%]   .numberBox[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}ion-content[_ngcontent-%COMP%]   .numberBox[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:50px}ion-content[_ngcontent-%COMP%]   .numberBox[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{position:absolute}"]})}return a})()}}]);