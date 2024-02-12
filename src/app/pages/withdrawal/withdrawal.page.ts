import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';

//import { OtpComponent } from './otp/otp.component';
import { LoadingController } from '@ionic/angular';
import { interval, Subscription } from 'rxjs';
import { async } from '@angular/core/testing';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.page.html',
  styleUrls: ['./withdrawal.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})


export class WithdrawalPage implements OnInit {

  currentDate: Date = new Date();
  
  bankx: any[] = [];

  otpSubscription: Subscription;
  otpTime: any = 60; // seconds
  otpDisabled: boolean = false;
resendSubscription: Subscription;
resendTime: number = 30; // seconds
resendDisabled: boolean = false;
  form: FormGroup;
  isLoading = false;
  type = true;
  verified = false;
  verifiedNumber: any;
  verifiedEmail: boolean;
  showSpinner = false;
  otpForm: FormGroup;
  showOtpForm = false;
  callCount = 0;

  banks: any[] = [
  {"code":"120001","name":"9 Payment Service Bank","has_acc_no":false,"ussd":"990"},{"code":"090270","name":"AB Microfinance bank","has_acc_no":false,"ussd":""},{"code":"070010","name":"ABBEY MORTGAGE BANK","has_acc_no":false,"ussd":"332"},{"code":"090260","name":"Above Only Microfinance bank","has_acc_no":false,"ussd":""},{"code":"090197","name":"ABU Microfinance bank","has_acc_no":false,"ussd":"755"},{"code":"090424","name":"Abucoop Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"000014","name":"Access Bank","has_acc_no":true,"ussd":"901"},{"code":"000005","name":"Access Bank (Diamond)","has_acc_no":true,"ussd":"901"},{"code":"100013","name":"AccessMobile","has_acc_no":false,"ussd":"901"},{"code":"090134","name":"ACCION MFB","has_acc_no":false,"ussd":"572"},{"code":"090160","name":"Addosser MFBB","has_acc_no":false,"ussd":""},{"code":"090268","name":"Adeyemi College Staff Microfinance bank","has_acc_no":false,"ussd":""},{"code":"100028","name":"AG MORTGAGE BANK PLC","has_acc_no":false,"ussd":""},{"code":"090133","name":"AL-BARKAH MFB","has_acc_no":false,"ussd":""},{"code":"090259","name":"Alekun Microfinance bank","has_acc_no":false,"ussd":""},{"code":"090277","name":"Alhayat MFB","has_acc_no":false,"ussd":""},{"code":"090131","name":"ALLWORKERS MFB","has_acc_no":false,"ussd":""},{"code":"090169","name":"Alphakapital MFB","has_acc_no":false,"ussd":""},{"code":"090180","name":"Amju MFB","has_acc_no":false,"ussd":""},{"code":"090116","name":"AMML MFB","has_acc_no":false,"ussd":""},{"code":"090143","name":"APEKS Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090282","name":"Arise MFB","has_acc_no":false,"ussd":""},{"code":"090001","name":"ASOSavings","has_acc_no":false,"ussd":""},{"code":"090426","name":"ASSURED MFB","has_acc_no":false,"ussd":""},{"code":"090172","name":"Astrapolis MFB","has_acc_no":false,"ussd":""},{"code":"090264","name":"Auchi Microfinance bank","has_acc_no":false,"ussd":""},{"code":"090188","name":"Baines Credit MFB","has_acc_no":false,"ussd":""},{"code":"090425","name":"Banex MFB","has_acc_no":false,"ussd":""},{"code":"090127","name":"BC Kash MFB","has_acc_no":false,"ussd":""},{"code":"090431","name":"BLUEWHALES MFB","has_acc_no":false,"ussd":""},{"code":"090117","name":"Boctrust Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090319","name":"BONGHE MFB","has_acc_no":false,"ussd":""},{"code":"090176","name":"Bosak MFB","has_acc_no":false,"ussd":""},{"code":"090148","name":"Bowen MFB","has_acc_no":false,"ussd":""},{"code":"070015","name":"Brent Mortgage Bank","has_acc_no":false,"ussd":""},{"code":"090293","name":"Brethren MFB","has_acc_no":false,"ussd":""},{"code":"090363","name":"Bridgeway MFB","has_acc_no":false,"ussd":""},{"code":"090445","name":"CAPSTONE MFB","has_acc_no":false,"ussd":""},{"code":"100005","name":"Cellulant","has_acc_no":false,"ussd":""},{"code":"090154","name":"CEMCS MFB","has_acc_no":false,"ussd":""},{"code":"090397","name":"Chanelle MFB","has_acc_no":false,"ussd":""},{"code":"090470","name":"Changan RTS MFB","has_acc_no":false,"ussd":""},{"code":"090440","name":"CHERISH MFB","has_acc_no":false,"ussd":""},{"code":"090416","name":"CHIBUEZE MFB","has_acc_no":false,"ussd":""},{"code":"090141","name":"Chikum Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090144","name":"CIT Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"000009","name":"Citi Bank","has_acc_no":false,"ussd":""},{"code":"090380","name":"Conpro MFB","has_acc_no":false,"ussd":""},{"code":"090130","name":"CONSUMER  MFB","has_acc_no":false,"ussd":""},{"code":"100032","name":"Contec Global","has_acc_no":false,"ussd":""},{"code":"070021","name":"COOP Mortgage Bank","has_acc_no":false,"ussd":""},{"code":"060001","name":"Coronation","has_acc_no":false,"ussd":""},{"code":"070006","name":"Covenant MFB","has_acc_no":false,"ussd":""},{"code":"090159","name":"Credit Afrique MFB","has_acc_no":false,"ussd":""},{"code":"090429","name":"CROSS RIVER MFB","has_acc_no":false,"ussd":""},{"code":"090414","name":"CRUTECH MFB","has_acc_no":false,"ussd":""},{"code":"090167","name":"Daylight Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090156","name":"e-BARCs MFB","has_acc_no":false,"ussd":""},{"code":"100021","name":"Eartholeum","has_acc_no":false,"ussd":""},{"code":"000010","name":"ECOBANK","has_acc_no":true,"ussd":"326"},{"code":"100008","name":"Ecobank Xpress Account","has_acc_no":false,"ussd":"326"},{"code":"090097","name":"Ekondo MFB","has_acc_no":false,"ussd":""},{"code":"090273","name":"Emeralds MFB","has_acc_no":false,"ussd":""},{"code":"090114","name":"EmpireTrust Microfinance bank","has_acc_no":false,"ussd":""},{"code":"000019","name":"Enterprise Bank","has_acc_no":false,"ussd":""},{"code":"090189","name":"Esan MFB","has_acc_no":false,"ussd":""},{"code":"090166","name":"Eso-E Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"100006","name":"eTranzact","has_acc_no":false,"ussd":""},{"code":"090330","name":"Fame MFB","has_acc_no":false,"ussd":""},{"code":"090179","name":"FAST MFB","has_acc_no":false,"ussd":""},{"code":"090107","name":"FBN Morgages Limited","has_acc_no":false,"ussd":""},{"code":"100014","name":"FBNMobile","has_acc_no":false,"ussd":""},{"code":"060002","name":"FBNQuest MERCHANT BANK","has_acc_no":false,"ussd":""},{"code":"000003","name":"FCMB","has_acc_no":true,"ussd":"329"},{"code":"100031","name":"FCMB Easy Account","has_acc_no":false,"ussd":""},{"code":"100001","name":"FET","has_acc_no":false,"ussd":""},{"code":"090153","name":"FFS Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"000007","name":"Fidelity Bank","has_acc_no":true,"ussd":"770"},{"code":"100019","name":"Fidelity Mobile","has_acc_no":false,"ussd":""},{"code":"090126","name":"FidFund MFB","has_acc_no":false,"ussd":""},{"code":"090111","name":"FinaTrust Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090281","name":"Finex MFB","has_acc_no":false,"ussd":""},{"code":"000016","name":"First Bank","has_acc_no":true,"ussd":"894"},{"code":"070014","name":"First Generation Mortgage Bank","has_acc_no":false,"ussd":""},{"code":"090163","name":"First Multiple MFB","has_acc_no":false,"ussd":""},{"code":"090164","name":"First Royal Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"070002","name":"Fortis Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"100016","name":"FortisMobile","has_acc_no":false,"ussd":""},{"code":"400001","name":"FSDH","has_acc_no":false,"ussd":""},{"code":"090145","name":"Full range MFB","has_acc_no":false,"ussd":""},{"code":"090438","name":"FUTMINNA MFB","has_acc_no":false,"ussd":""},{"code":"090158","name":"FUTO MFB","has_acc_no":false,"ussd":""},{"code":"090168","name":"Gashua Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"070009","name":"GATEWAY MORTGAGE BANK","has_acc_no":false,"ussd":""},{"code":"090411","name":"GIGINYA MFB","has_acc_no":false,"ussd":""},{"code":"090441","name":"GIWA MICROFINANCE BANK","has_acc_no":false,"ussd":""},{"code":"000027","name":"GLOBUS Bank","has_acc_no":false,"ussd":""},{"code":"090278","name":"Glory MFB","has_acc_no":false,"ussd":""},{"code":"100022","name":"GoMoney","has_acc_no":false,"ussd":""},{"code":"090122","name":"GOWANS MFB","has_acc_no":false,"ussd":""},{"code":"090178","name":"GreenBank MFB","has_acc_no":false,"ussd":""},{"code":"090269","name":"Greenville Microfinance bank","has_acc_no":false,"ussd":""},{"code":"060004","name":"GREENWICH Merchant Bank","has_acc_no":false,"ussd":""},{"code":"090195","name":"Grooming Microfinance bank","has_acc_no":false,"ussd":""},{"code":"000013","name":"GTBank","has_acc_no":true,"ussd":"737"},{"code":"100009","name":"GTMobile","has_acc_no":false,"ussd":""},{"code":"090147","name":"Hackman Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"070017","name":"Haggai Mortgage Bank","has_acc_no":false,"ussd":""},{"code":"090121","name":"HASAL MFB","has_acc_no":false,"ussd":""},{"code":"100017","name":"Hedonmark","has_acc_no":false,"ussd":""},{"code":"000020","name":"Heritage","has_acc_no":true,"ussd":"322"},{"code":"090418","name":"HIGHLAND MFB","has_acc_no":false,"ussd":""},{"code":"120002","name":"Hope PSB","has_acc_no":false,"ussd":""},{"code":"090118","name":"IBILE Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090279","name":"Ikire MFB","has_acc_no":false,"ussd":""},{"code":"090350","name":"ILORIN MFB","has_acc_no":false,"ussd":""},{"code":"090258","name":"Imo Microfinance bank","has_acc_no":false,"ussd":""},{"code":"100024","name":"Imperial Homes Mortgage Bank","has_acc_no":false,"ussd":""},{"code":"090157","name":"Infinity MFB","has_acc_no":false,"ussd":""},{"code":"070016","name":"Infinity trust  Mortgage Bank","has_acc_no":false,"ussd":""},{"code":"100029","name":"Innovectives Kesh","has_acc_no":false,"ussd":""},{"code":"090434","name":"Insight MFB","has_acc_no":false,"ussd":""},{"code":"100027","name":"Intellifin","has_acc_no":false,"ussd":""},{"code":"090149","name":"IRL Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090421","name":"Izon Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"000006","name":"JAIZ Bank","has_acc_no":false,"ussd":""},{"code":"090003","name":"JubileeLife","has_acc_no":false,"ussd":""},{"code":"090191","name":"KCMB MFB","has_acc_no":false,"ussd":""},{"code":"100015","name":"Kegow","has_acc_no":false,"ussd":""},{"code":"000002","name":"Keystone Bank","has_acc_no":true,"ussd":"7111"},{"code":"090267","name":"Kuda Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090450","name":"KWASU MFB","has_acc_no":false,"ussd":""},{"code":"090155","name":"La Fayette Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090422","name":"LANDGOLD MFB","has_acc_no":false,"ussd":""},{"code":"090177","name":"Lapo MFB","has_acc_no":false,"ussd":""},{"code":"090271","name":"Lavender Microfinance bank","has_acc_no":false,"ussd":""},{"code":"070012","name":"LBIC Mortgage Bank","has_acc_no":false,"ussd":""},{"code":"090420","name":"LETSHEGO MFB","has_acc_no":false,"ussd":""},{"code":"090435","name":"LINKS MFB","has_acc_no":false,"ussd":""},{"code":"000029","name":"LOTUS BANK","has_acc_no":false,"ussd":""},{"code":"090265","name":"Lovonus Microfinance bank","has_acc_no":false,"ussd":""},{"code":"090171","name":"Mainstreet MFB","has_acc_no":false,"ussd":""},{"code":"090174","name":"Malachy MFB","has_acc_no":false,"ussd":""},{"code":"090423","name":"MAUTECH MFB","has_acc_no":false,"ussd":""},{"code":"090280","name":"Megapraise Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090432","name":"Memphis MFB","has_acc_no":false,"ussd":""},{"code":"090275","name":"Meridian MFB","has_acc_no":false,"ussd":""},{"code":"090136","name":"Microcred Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"100011","name":"Mkudi","has_acc_no":false,"ussd":""},{"code":"100020","name":"MoneyBox","has_acc_no":false,"ussd":""},{"code":"090129","name":"MONEYTRUST MFB","has_acc_no":false,"ussd":""},{"code":"090190","name":"Mutual Benefits MFB","has_acc_no":false,"ussd":""},{"code":"090151","name":"Mutual Trust Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090152","name":"Nargata MFB","has_acc_no":false,"ussd":""},{"code":"090263","name":"Navy Microfinance bank","has_acc_no":false,"ussd":""},{"code":"090128","name":"Ndiorah MFB","has_acc_no":false,"ussd":""},{"code":"090108","name":"New Prudential Bank","has_acc_no":false,"ussd":""},{"code":"090205","name":"Newdawn Microfinance bank","has_acc_no":false,"ussd":""},{"code":"090459","name":"NICE MFB","has_acc_no":false,"ussd":""},{"code":"090194","name":"NIRSAL National microfinance bank","has_acc_no":false,"ussd":""},{"code":"060003","name":"NOVA MB","has_acc_no":false,"ussd":""},{"code":"070001","name":"NPF MicroFinance Bank","has_acc_no":false,"ussd":""},{"code":"090437","name":"OakLand MFB","has_acc_no":false,"ussd":""},{"code":"090119","name":"OHAFIA MFB","has_acc_no":false,"ussd":""},{"code":"090161","name":"Okpoga MFB","has_acc_no":false,"ussd":""},{"code":"090272","name":"Olabisi Onabanjo university Microfinance bank","has_acc_no":false,"ussd":""},{"code":"070007","name":"Omoluabi Mortgage Bank Plc","has_acc_no":false,"ussd":""},{"code":"100026","name":"ONE FINANCE","has_acc_no":false,"ussd":""},{"code":"090460","name":"ORITABASORUN MFB","has_acc_no":false,"ussd":""},{"code":"090456","name":"OSPOLY MFB","has_acc_no":false,"ussd":""},{"code":"100002","name":"Paga","has_acc_no":false,"ussd":""},{"code":"070008","name":"PAGE FINANCIALS","has_acc_no":false,"ussd":""},{"code":"100033","name":"PalmPay","has_acc_no":false,"ussd":""},{"code":"000030","name":"Parallex","has_acc_no":false,"ussd":""},{"code":"090390","name":"PARKWAY MFB","has_acc_no":false,"ussd":""},{"code":"100003","name":"Parkway-ReadyCash","has_acc_no":false,"ussd":""},{"code":"090004","name":"Parralex","has_acc_no":false,"ussd":""},{"code":"110001","name":"PayAttitude Online","has_acc_no":false,"ussd":""},{"code":"100004","name":"Paycom","has_acc_no":false,"ussd":""},{"code":"090402","name":"PEACE MFB","has_acc_no":false,"ussd":""},{"code":"090137","name":"Pecan Trust Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090196","name":"Pennywise Microfinance bank","has_acc_no":false,"ussd":""},{"code":"090135","name":"Personal Trust Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090165","name":"Petra Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"070013","name":"PLATINUM MORTGAGE BANK","has_acc_no":false,"ussd":""},{"code":"000008","name":"POLARIS BANK","has_acc_no":true,"ussd":"833"},{"code":"090274","name":"Prestige Microfinance bank","has_acc_no":false,"ussd":""},{"code":"000023","name":"Providus Bank","has_acc_no":true,"ussd":""},{"code":"090261","name":"QuickFund Microfinance bank","has_acc_no":false,"ussd":""},{"code":"090170","name":"Rahama MFB","has_acc_no":false,"ussd":""},{"code":"000024","name":"Rand Merchant Bank","has_acc_no":false,"ussd":""},{"code":"070011","name":"Refuge Mortgage Bank","has_acc_no":false,"ussd":""},{"code":"090125","name":"REGENT MFB","has_acc_no":false,"ussd":""},{"code":"090173","name":"Reliance MFB","has_acc_no":false,"ussd":""},{"code":"090198","name":"Renmoney Microfinance bank","has_acc_no":false,"ussd":""},{"code":"090132","name":"RICHWAY MFB","has_acc_no":false,"ussd":""},{"code":"090433","name":"RIGO MFB","has_acc_no":false,"ussd":""},{"code":"090405","name":"Rolez Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090138","name":"Royal Exchange Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090175","name":"Rubies MFB","has_acc_no":false,"ussd":""},{"code":"090286","name":"Safe Haven MFB","has_acc_no":false,"ussd":""},{"code":"090485","name":"SAFEGATE MFB","has_acc_no":false,"ussd":""},{"code":"090006","name":"SafeTrust","has_acc_no":false,"ussd":""},{"code":"090140","name":"Sagamu Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090112","name":"Seed Capital Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090325","name":"Sparkle","has_acc_no":false,"ussd":""},{"code":"090436","name":"Spectrum MFB","has_acc_no":false,"ussd":""},{"code":"100007","name":"Stanbic IBTC @ease Wallet","has_acc_no":false,"ussd":"909"},{"code":"000012","name":"StanbicIBTC Bank","has_acc_no":true,"ussd":""},{"code":"000021","name":"StandardChartered","has_acc_no":true,"ussd":"977"},{"code":"090162","name":"Stanford MFB","has_acc_no":false,"ussd":""},{"code":"070022","name":"STB Mortgage Bank","has_acc_no":false,"ussd":""},{"code":"090262","name":"Stellas Microfinance bank","has_acc_no":false,"ussd":""},{"code":"000001","name":"Sterling Bank","has_acc_no":true,"ussd":"822"},{"code":"090340","name":"STOCKCORP MFB","has_acc_no":false,"ussd":""},{"code":"090302","name":"SUNBEAM MFB","has_acc_no":false,"ussd":""},{"code":"000022","name":"SUNTRUST BANK","has_acc_no":false,"ussd":""},{"code":"090446","name":"SUPPORT MFB","has_acc_no":false,"ussd":""},{"code":"100023","name":"TagPay","has_acc_no":false,"ussd":""},{"code":"000026","name":"Taj Bank","has_acc_no":false,"ussd":""},{"code":"090115","name":"TCF","has_acc_no":false,"ussd":""},{"code":"100010","name":"TeasyMobile","has_acc_no":false,"ussd":""},{"code":"000025","name":"Titan Trust Bank","has_acc_no":true,"ussd":"922"},{"code":"090146","name":"Trident Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090005","name":"Trustbond","has_acc_no":false,"ussd":""},{"code":"000004","name":"UBA","has_acc_no":true,"ussd":"919"},{"code":"090461","name":"UNIBADAN MFB","has_acc_no":false,"ussd":""},{"code":"090266","name":"Uniben Microfinance bank","has_acc_no":false,"ussd":""},{"code":"090193","name":"Unical MFB","has_acc_no":false,"ussd":""},{"code":"090341","name":"UNIILORIN MFB","has_acc_no":false,"ussd":""},{"code":"000018","name":"Union Bank","has_acc_no":true,"ussd":"826"},{"code":"000011","name":"Unity Bank","has_acc_no":true,"ussd":"7799"},{"code":"090123","name":"Verite Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"999999","name":"VFD MICROFINANCE BANK","has_acc_no":false,"ussd":"5037"},{"code":"090150","name":"Virtue MFB","has_acc_no":false,"ussd":""},{"code":"090139","name":"Visa Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"100012","name":"VTNetworks","has_acc_no":false,"ussd":""},{"code":"000017","name":"Wema Bank","has_acc_no":true,"ussd":"945"},{"code":"090120","name":"WETLAND MFB","has_acc_no":false,"ussd":""},{"code":"090124","name":"XSLNCE Microfinance Bank","has_acc_no":false,"ussd":""},{"code":"090142","name":"Yes MFB","has_acc_no":false,"ussd":""},{"code":"000015","name":"Zenith Bank","has_acc_no":true,"ussd":"966"},{"code":"100018","name":"ZenithMobile","has_acc_no":false,"ussd":""},{"code":"100025","name":"Zinternet - KongaPay","has_acc_no":false,"ussd":""}
  ];

  bankName: number;
  accountName : any = []
  filteredBanks: any[] = []; 
  searchTerm: any = ''; // initialize searchTerm variable
  selectedBank: any;
  validationMessage: any = '';
charge: number;
amounted: number;
aBalance: any;
userData: any;

  public postData = {
    amount: '',
    tagname: '',
    phone: '',
    password: '',
    email: '',
    confirmPassword: '',
  
  }

  constructor(
    //  private registrationService: RegistrationService, 
    private loadingCtrl: LoadingController,
    private loadingController: LoadingController,
    private loadingCtl: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalCtrl: ModalController,
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private toastController: ToastController,
    private storage: PreferencesService,
    private authService: AuthService,
    private toastService: ToastService,
    private alertController : AlertController,
  ) {
   
    this.initForm();
 // 60,000 milliseconds = 60 seconds
  }

//   onBankSelect(bank: any) {
//   this.selectedBank = bank;
//   console.log(bank.name);
//   console.log("userSelected" + bank.name + bank.code)
//   this.modalController.dismiss();
// }

onBankSelect(bank: any) {
  this.selectedBank = bank;
  console.log(bank.name);
  console.log(bank.code);
  this.form.patchValue({
    bankName: bank.name,
    bankCode: bank.code,
  });
   console.log(this.form.get('bankName').value);
   console.log(this.form.get('bankCode').value)
   this.modalController.dismiss();
}

filterBanks() {
  if (!Array.isArray(this.banks)) {
    return; // handle error condition
  }
  this.filteredBanks = this.banks.filter((bank) =>
    bank.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}


  filterBank() {
    console.log(this.filteredBanks)
    if (!Array.isArray(this.banks)) {
      return; // handle error condition
    }
    this.filteredBanks = this.banks.filter(bank => bank.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  
  
  }

  ngOnInit() {
   // this.validationMessage = "Account name is invalid";

   const userDataString = localStorage.getItem('userData');
   if (userDataString) {
     this.userData = JSON.parse(userDataString);
   }

   const balance = localStorage.getItem('balance');
   this.aBalance = JSON.parse(balance)
console.log(JSON.parse(balance));
    this.filteredBanks = this.banks;
      this.selectedBank = null;
      // rest of the code
    
    
    // while (this.callCount < 3) {
    //   this.divine();
    //   this.callCount++;
    //   if (this.callCount === 3) {
    //     localStorage.setItem('myData', JSON.stringify(this.banks));
    //     console.log('Data saved to local storage.');
    //   }
    // }
// this.bankList();
// this.getAccountName();

  }
// divine(){
//   setInterval(() => {
//     console.log("running again.....yaay");
//     this.bankList();
    

//   }, 60000);
// }
  
  // while (this.callCount < 3) {
  //   this.myFunction();
  //   this.callCount++;
  // }
  

  // bankList(){
  //   this.authService.getBanks().subscribe((data: any) => {
  //     console.log(data);
  //     console.log(JSON.stringify(data));
  //     console.log('I am here now')
  //     //this.banks = data;

      // if(data.message === "Signature verification failed"){
      //   this.toastController.create()
      //   this.presentToast('Session Expired.....Logging out', 'warning');
      //   this.router.navigateByUrl('/auth-screen');
      // }
  //     else {
  //       console.log('I am here nowx')
  //       this.banks = data.banks;
  //       //this.banks = JSON.parse(data.banks);
  //     }
  //   });
  // }
 
  getAccountName(){
    const formData = {
     // bank_code: this.selectedBank.code,
      bank_code: this.form.get('bankCode').value,
      account: this.form.get('accountNumber').value,
    };

    this.authService.getName(formData)
    .pipe(
      finalize(() => {
      this.loadingCtrl.dismiss();
      })
  ).subscribe((data: any) => {
      const datax = JSON.stringify(data) 
      console.log(JSON.stringify(data) + 'Hello mate');
      console.log('Searching bank name')
      console.log(JSON.stringify(data.accountName) + 'Hello matey');
       if(data.message === "Signature verification failed" && this.router.url !== '/auth-screen'){
        localStorage.removeItem('userData');
        localStorage.removeItem('res');
        localStorage.removeItem('accessT');
        this.loadingCtl.dismiss();
        this.toastController.create()
        this.presentToast('Session Expired.....Logging out', 'danger');
        this.router.navigateByUrl('/auth-screen');
      }
      else if(!data.accountName){
        this.accountName = 'Invalid Account number or bank';
        this.toastController.create()
        this.presentToast('Account not found', 'danger');
        this.validationMessage = 'Account not Found'
         this.loadingCtl.dismiss();
      }
      else{
      console.log(data)
      //console.log(data.data)
          this.accountName = data.accountName;
      this.loadingCtl.dismiss();
      this.toastController.create()
      this.presentToast('Account Found', 'success');
      this.validationMessage = data;
      
    
      }
      this.loadingCtl.dismiss();
    });
    

  }

  async presentLoading( message: string, spinnerx: any){
    const loading = await this.loadingCtl.create({
      message: message,
      spinner: spinnerx
    });
    await loading.present();
  }

  customCounterFormatterE(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  

  customCounterFormatterD(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  onNumberChange(event) {
    console.log('Hi' + event)
console.log(event.target.value)
const num = event.target.value
    if (num.length === 10) {
      console.log('User entered a 10-digit number:', num);
      console.log('Divine',this.form.get('bankName').value);
      console.log('Divinex',this.form.get('bankCode').value)
      // Enable button, update UI, or perform other actions
      ///call loader here

if(this.router.url === '/withdrawal'){

   
    this.presentLoading('Searching for Account...', 'crescent');
    setTimeout(() => {
      this.getAccountName();
    
    }, 1000);
    setTimeout(() => {
      
      this.loadingCtl.dismiss();
    }, 10000);
//     this.presentLoading('Searching for Account...', 'crescent');
// this.getAccountName().subscribe((value) => {
//   this.loadingCtl.dismiss();
//   // do something with the value
// });

}
    
      
    }
  }


  initForm() {
    this.form = new FormGroup({
      

      bankName: new FormControl(null, {validators: [Validators.required]}),
      bankCode: new FormControl(null, {validators: [Validators.required]}),
      // tagname: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required]}),
      accountName: new FormControl(null, {validators: [Validators.required]}),
      accountNumber: new FormControl(null, {validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]}),
      amountx: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]})
    });

   
    

    
  }

  showDate(){
    const currentDateTimeString = this.currentDate.toLocaleString();

  }




  




  changeType() {
    this.type = !this.type;
  }

  


  



  

  showLoader(msg) {
    if(!this.isLoading) this.isLoading = true;
    return this.loadingCtrl.create({
      message: msg,
      spinner: 'bubbles'
    }).then(res => {
      res.present().then(() => {
        if(!this.isLoading) {
          res.dismiss().then(() => {
            console.log('abort presenting');
          });
        }
      })
    })
    .catch(e => {
      this.isLoading = false;
      console.log(e);
    })
  }

  hideLoader() {
    if(this.isLoading) this.isLoading = false;
    return this.loadingCtrl.dismiss()
    .then(() => console.log('dismissed'))
    .catch(e => console.log(e));
  }


 


async presentToast(message: string, color: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000,
    position: 'bottom',
    color: color
  });
  toast.present();
}

async presentWithdrawalAlert(status: string,  amount: any, title?: string, subtitle?: string) {
  let message: string;
  switch (status) {
    case 'successful':
      message = `You have successfully sent ${amount} to ${this.form.get('accountName').value}.`;
      break;
    case 'insuficient funds':
      message = `Your request to withdraw ${amount}  could not be completed due to insufficient funds in your account.`;
      break;
    case 'failed':
      message = `Please enter an amount greater than ₦50.`;
      break;
    default:
      message = 'An unknown error occurred!! ${<br>} Please try again later';
      break;
  }

  const alert = await this.alertController.create({
    header: title || 'Transaction Status',
    subHeader: subtitle,
    buttons: [{
      text: 'Go Back',
      cssClass: 'purple-button',
      handler: () => {
        if (status !== 'failed') {
          this.router.navigateByUrl('/tabs');
        }
      }
    }],
    backdropDismiss: false,
    cssClass: 'deposit-alert',
    animated: true,
    mode: 'ios',
    // inputs: [
    //   {
    //     type: 'image',
    //     src: status === 'successful' ? 'assets/imgs/received.png' : 'assets/imgs/sent.png',
    //     // type: 'ion-icon',
    //     // name: 'alert-circle-outline',
    //     cssClass: 'no-border'
    //   },
    // ], 
    message: message,
  });

  await alert.present();
}

async presentAlertx() {
  const alert = await this.alertController.create({
    header: 'Confirm Withdrawal',
    message: `
      <table>
        <tr>
          <td>Withdrawal Amount:</td>
          <td>₦${parseFloat(this.form.get('amountx').value) + parseFloat('50')}</td>
        </tr>
        <tr>
          <td>Account Number:</td>
          <td>${this.form.get('accountNumber').value}</td>
        </tr>
        <tr>
        <td>Account Name:</td>
        <td>${this.form.get('accountName').value}</td>
      </tr>
        <tr>
          <td>Withdrawal Date:</td>
          <td>${this.currentDate }</td>
        </tr>
      </table>
    `,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Withdrawal canceled');
        }
      }, 
      {
        text: 'Confirm',
         handler: async () => {
          console.log('Withdrawal confirmed');
          // Call API to place withdrawal here
           const loading = await this.loadingController.create({
    message: 'Please wait...',
  });
  await loading.present();
  
  // perform form submission here
  this.charge = 50
   
  //this.amounted += this.feex;
  console.log(this.amounted)
  this.amounted = parseFloat(this.form.get('amountx').value);
  this.charge = parseFloat('50');
  const totalAmount = this.amounted + this.charge
// this.amounted = totalAmount
  if (this.form.valid) {
    
    const formData = {
      amount: totalAmount - this.charge,
      bank_code: this.form.get('bankCode').value,
      bank_name: this.form.get('bankName').value,
      payfor: `/${this.userData?.loginData.full_name}/${this.form.get('email').value}`,
      account: this.form.get('accountNumber').value,
      accountName: this.form.get('accountName').value,
     // descripton: this.form.get('descripton').value,
      
    };
////callLoader here
this.presentLoading('Processing Withdrawal...', 'circular')

    this.authService.withdraw(formData)
    .pipe(
      finalize(() => {
        this.loadingCtl.dismiss();
      })
  ).subscribe(
      (response: any) => {
        console.log(response.message);
          if(response.message === "Signature verification failed" && this.router.url !== '/auth-screen'){
            this.toastController.create()
            this.presentToast('Session Expired.....Logging out', 'danger');
            this.router.navigateByUrl('/auth-screen');
          }
        else{
        console.log('Processing Request', response);

       console.log('here');
       if(response.message === 'insuficient funds'){
         console.log('Hello mate'+ response.message)
         this.toastController.create()
         this.presentToast(response.message + ', Please fund your account and try again', 'danger');
        // this.router.navigateByUrl('/tabs')
        this.presentWithdrawalAlert(response.message, ` ₦${formData.amount}`, 'Incomplete Transaction');
         this.loadingCtrl.dismiss();
       } else if(response.message === 'the amount is too small '){
         
         this.toastController.create()
         this.presentToast(response.message, 'danger');
         this.presentWithdrawalAlert('failed', ` ₦${formData.amount}`, 'Transaction Failed');
         console.log('Cameth hereAmount');
         
       //  this.router.navigateByUrl('/tabs')
         this.loadingCtrl.dismiss();
       }
       
       else if(response.message === "Transaction successful"){

         this.toastController.create()
         this.presentToast(response.message, 'success');
         this.presentWithdrawalAlert('successful', ` ₦${formData.amount}`, 'Transaction Successful');
         console.log('Cameth here');
         
       //  this.router.navigateByUrl('/tabs')
         this.loadingCtrl.dismiss();
       } else{
         this.toastController.create()
         this.presentToast(response.message, 'danger');
         this.router.navigateByUrl('/tabs')
         this.loadingCtrl.dismiss();
       }
       console.log('I reach here')
      // this.router.navigateByUrl('/auth-screen')
       this.loadingCtrl.dismiss();
     
    // console.log(JSON.parse(data))
       }
      },
      (error) => {
        if(this.router.url === '/withdrawal'){
             console.error('Could not complete your request try again!', error);
      //  this.showOtpForm = true;
        this.toastService.showToast('Could not complete your request try again!')
        }
     
      }
    );
    this.loadingCtl.dismiss();
        }
        await loading.dismiss();
        this.loadingCtl.dismiss();
      }
     
    }
    ]
  });

  await alert.present();
}






 async submit() {
  this.presentAlertx();


  const loading = await this.loadingController.create({
    message: 'Please wait...',
  });
  await loading.present();
  // perform form submission here

  if (this.form.valid) {
    const formData = {
      amount: this.form.get('amountx').value,
      accountName: this.form.get('accountName').value,
         // descripton: this.form.get('descripton').value,
      bank_code: this.form.get('bankCode').value,
      bank_name: this.form.get('bankName').value,
      payfor: `/${this.userData?.loginData.full_name}/${this.form.get('email').value}`,
      account: this.form.get('accountNumber').value,    
    };


    if(1 === 1){
           
       console.log('Form:', formData);

      } else{
console.log('error')
      }
    
    console.log(formData);

    console.log('I got Here')
  }
  
  await loading.dismiss();

  
}















}
