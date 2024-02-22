import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';

import { HttpService } from './http.service';
import { INTRO_KEY, PreferencesService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

//retieving userDatas
  userData$ = new BehaviorSubject<any>(''); 

  apiUrl = 'https://veluxpay.com/scans/generateQrcode';
  constructor(
    private httpService: HttpService,
    private preferences: PreferencesService,
    private router: Router,
    private http: HttpClient,
  ) { }


 

  //fetch userData from Local Storage
  getUserData(){

    this.preferences.get(AuthConstants.AUTH).then( userData => {
     console.log(userData)
     //next is  used to update user information in the global response
      this.userData$.next(userData)
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('token', JSON.stringify(userData.loginData.bearer_token));

      
    })
  }

  //storing userData in localStorage
  storeUserData(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }



//fetching userData from localStorage
  fetchUserDataFromStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      return JSON.parse(userDataString);
    } else {
      return null;
    }
  }


getQrCode() {

  return this.httpService.getr('/scans/generateQrcode');
 
}

getSubQrCode() {

  return this.httpService.getr('/scans/generatesubQrcode');
 
}


////withdrawal information fetcher
getBanks(): Observable<any>{

  return this.httpService.getr('/reports/getBankList');
}

  getName(data){
  return this.httpService.postr('/reports/getBankName', data);
}

getNotification(){
  return this.httpService.getr('/reports/getNotifications');
}


//masstransfer
mtr(data: any): Observable<any> {
  return this.httpService.postr('/reports/implementMassTransfer', data)
}

//Book a transfer

bat(data: any): Observable<any> {
  return this.httpService.postr('/reports/implementBookTransfer', data)
}
//////deposit logicx
deposit(depositData: any): Observable<any> {
  

  return this.httpService.gext('/dropin/v1/initialise.js', depositData);  
}

//////deposit logicx
depoxit(data: any): Observable<any> {
  

  return this.httpService.postr('/reports/deposite', data);  
}

///login user 
loginfunc(postData: any): Observable<any> {

  return this.httpService.post('/users/loginfunc', postData);  
}

///login user `
subloginfunc(postData: any): Observable<any> {

  return this.httpService.post('/users/subloginfunc', postData);  
}
login(postData: any): Observable<any> {

  return this.httpService.post('/loginfunc', postData);  
}
///validate user OTP key
checkotp(otp: string) {
 
  return this.httpService.post('/users/pay_activation', otp); 
}

verifyOTP(otp: any): Observable<any> {
  return this.httpService.post('/users/pay_activation', otp);
}


//forgotPassword
forgotP(otp: any): Observable<any> {
  return this.httpService.post('/users/pReset', otp);
}
//forgotPassword
forgotPx(otp: any): Observable<any> {
  return this.httpService.post('/users/resetPassNow', otp);
}


signup(postData: any): Observable<any> {

  return this.httpService.post('/users/register_Veluxite', postData);  
}

//register new veluxite user

register(data: any): Observable<any> {
  return this.httpService.post('/users/register_Veluxite', data);
}


registerF(data: any): Observable<any> {
  return this.httpService.post('/users/register_Veluxite2', data);
}


///place withdrawal
withdraw(data){
  return this.httpService.postr('/reports/implementTransfer', data);
}

////purchase airtime
airtime(data){
  return this.httpService.postr('/reports/airtimeVTU', data);
}

////purchase data
data(data){
  return this.httpService.postr('/reports/dataVTU', data);
}


///check if user pin entered is accurate and exists
checkPin(data){
  return this.httpService.postr('/users/checktransferPin', data);
}

///change user pin and store in database
changePin(data){
  return this.httpService.postr('/users/changetransferPin ', data);
}


//payVeluxUser
payVeluxite(data){
  return this.httpService.postr('/reports/payVeluxiteUser', data);
}

//add new user
public adduser(postData: any)
{
  return this.httpService.post('/users/register_Veluxite'
, postData).subscribe((res: Response) => {
 
});
}

///get all sub user account

getSubUser(): Observable<any>{

  return this.httpService.getr('/reports/getSubuser');
}


///get last four recent  receiver account

getRecent(): Observable<any>{

  return this.httpService.getr('/reports/sentUser');
}


deleteSub(data): Observable<any>{

  return this.httpService.postr('/reports/deleteSubuser', data);
}

///register veluxite sub user

createSub(){
  return this.httpService.postx('/users/registerUser');
}


///Delete veluxite user

remove(){
  return this.httpService.postx('/users/deactivateUseracc');
}

//getAccountBalance
getAccountBalance(): Observable<any>{

  return this.httpService.getr('/reports/getAccountBalance');
}

//getAccountBalance
getUrl(): Observable<any>{

  return this.httpService.getr('/reports/geturl');
}

//data logicx
mtnCorp(): Observable<any>{

  return this.httpService.getr('/reports/datamtncgCheck');
}

airtel(): Observable<any>{
  
  return this.httpService.getr('/reports/dataairtelCheck');
}
glo(): Observable<any>{
  
  return this.httpService.getr('/reports/datagloCheck');
}
etisalat(): Observable<any>{
  
  return this.httpService.getr('/reports/dataetisalatCheck');
}
mtn(): Observable<any>{
  
  return this.httpService.getr('/reports/datamtnCheck');
}

////Transactions information fetcher
getTransactions(): Observable<any>{

  return this.httpService.getr('/reports/getUserTransactions');
}
////Transactions information fetcher
getSubTransactions(): Observable<any>{

  return this.httpService.getr('/reports/getSubUserTransactions');
}


////Image fetcher
getUserImage(): Observable<any>{

  return this.httpService.getr('/reports/getUserImage');
}

////Image validator userImage
validate(formData: any): Observable<any>{

  return this.httpService.posti('/users/selfieValidate', formData);
}
////Image validator userImage
storePushToken(formData: any): Observable<any>{

  return this.httpService.posti('/users/storeFcmToken', formData);
}

///Set Profile image
profile(formData: any): Observable<any>{

  return this.httpService.posti('/users/userImage', formData);
}
////Tagname fetcher
getTagname(data: any[]): Observable<any>{

  return this.httpService.postr('/reports/getTagname', data);
}

getTagnamex(): Observable<any>{

  return this.httpService.getr('/reports/getTagname');
}

logout(){
//this.preferences.clearItem()

this.preferences.removeItem(AuthConstants.AUTH).then(res => {
  //this.router.navigateByUrl({'/auth-screen'})
  localStorage.removeItem('userData')
  this.userData$.next('');
  this.router.navigateByUrl('/auth-screen', {replaceUrl: true});
  return true;
})

}

async IntroGuard(){
  const hasSeenIntro = await this.preferences.getPreference(INTRO_KEY);
  if(hasSeenIntro && hasSeenIntro.value == 'true') {
    return true;
  } else {
    this.router.navigateByUrl('/intro', {replaceUrl: true});
    return true;
  }

}

async TabsGuard()
{
  this.preferences.get(AuthConstants.AUTH,).then(res =>{
    if(res){
     return true;
    } else{
      
      this.router.navigateByUrl('/auth-screen');
      return false;
    }
  }).catch(
    err => {
     return false
    }
  )
}}
