import {
  AfterContentChecked,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
} from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import {
  LoadingController,
  Platform,
  AnimationController,
  ToastController,
  ModalController,
} from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { PreferencesService } from "src/app/services/storage.service";
import { ToastService } from "src/app/services/toast.service";
import { IonicModule, IonicSlides } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { NotificationModalComponent } from 'src/app/notification-modal/notification-modal.component';
import { HttpClient } from "@angular/common/http";
import { finalize } from "rxjs/operators";
import { filter } from 'rxjs/operators';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { CommonModule, DatePipe } from "@angular/common";
import { Preferences } from "@capacitor/preferences";
import { FcmService } from "src/app/services/fcm/fcm.service";

const IMAGE_DIR = "stored-images";

export interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  swiperModules = [IonicSlides];
  isAccountBalanceVisible: boolean = true;
  greeting: string;
  accounts: any[] = [];
  features: any[] = [];
  transactions: any[] = [];
  transactionx: any[] = [];
  displayUserData: any;
  type = true;
  userData: any;
  userImage: any;
  getBalance: any;
  showBalance = false;
  // isDarkMode =  localStorage.getItem('darkMode');
  isDarkMode = true;
  selectedTransaction: any;
  isModalOpen = false;
  isModalOpeN = false;
  getBalancex: any[] = [];
  formattedPrice: any;
  unread: boolean;
  notifications: any[] = [];
  unreadNotifications: Set<string> = new Set<string>();
  images: LocalFile[] = [];
  public names = [
    "Burt Bear",
    "Charlie Cheetah",
    "Donald Duck",
    "Eva Eagle",
    "Ellie Elephant",
    "Gino Giraffe",
    "Isabella Iguana",
    "Karl Kitten",
    "Lionel Lion",
    "Molly Mouse",
    "Paul Puppy",
    "Rachel Rabbit",
    "Ted Turtle",
  ];
  public items = [];
  constructor(
    private authService: AuthService,
    public router: Router,
    private toastController: ToastController,
    private str: PreferencesService,
    private storage: PreferencesService,
    private toastService: ToastService,
    private datePipe: DatePipe,
    private animationCtrl: AnimationController,
    private alertController: AlertController,
    private platform: Platform,
    private http: HttpClient,
    private fcm: FcmService,
    private modalController: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    // this.platform
    //   .ready()
    //   .then(() => {
    //     this.str.getToken().subscribe((token) => {
    //       if (token) {
    //         this.sendTokenToServer(token);
    //       }
    //     });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    
       this.platform.ready().then(() => {
      this.fcm.initPush();
       
      
       
    }).catch(e =>{
      console.log(e)
    });

    const now = new Date();
    const currentHour = Number(this.datePipe.transform(now, "HH"));

    if (currentHour < 12) {
      this.greeting = "Good morning! \u{1F600}"; // Add smiley face emoji
    } else if (currentHour <= 16) {
      this.greeting = "Good afternoon! \u{1F44B}"; // Add waving hand emoji
    } else {
      this.greeting = "Good evening! \u{1F319}"; // Add crescent moon emoji
    }

    setTimeout(() => {
      this.getTransactions();
      this.fetchBalance();
      this.fetchUserData();
      this.getImage();
      this.checkAppMode();
    }, 1000);

    // run the loop every 45 seconds
    setInterval(() => {
      this.fetchUserData();
      this.checkAppMode();
    }, 450000);

    setInterval(() => {
      this.fetchBalance();
      this.getTransactions();
      this.checkAppMode();
    }, 70000);
  }

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.addItems(3, true);
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  chooseRandomName() {
return this.names[Math.floor(Math.random() * this.names.length)];
  }

  addItems(count, unread = false) {
    for (let i = 0; i < count; i++) {
      this.items.unshift({
        name: this.chooseRandomName(),
        unread: unread,
      });
    }
  }


  receive() {
    this.router.navigateByUrl("/tabs/receive");
  }

  fetchNotification() {
    this.authService.getNotification().subscribe((res: any) => {
      //this.displayUserData = res;

      if (
        res.message === "Signature verification failed" &&
        this.router.url !== "/auth-screen"
      ) {
        localStorage.removeItem("userData");
        localStorage.removeItem("res");
        localStorage.removeItem("accessT");
        this.toastController.create();
        this.presentToast("Session Expired.....Logging out", "danger");
        this.router.navigateByUrl("/auth-screen");
      } else {
        console.log(res);

    //     const notificationsData = res;
    //     //this.notifications = res.map(notification => ({ ...notification, unread: true }));

    //      // Mark notifications as unread if they are in the unread set
    //      notificationsData.forEach(notification => {
    //       notification.unread = this.unreadNotifications.has(notification.id);
    //       if (!notification.unread) {
    //         // If the notification is read, set a timestamp for when it was read
    //         notification.readTime = new Date().toLocaleString();
    //       }
    //     });

    // this.notifications = notificationsData;
        //console.log(res)
        this.notifications = res.map(notification => {
          const unread = !this.unreadNotifications.has(notification.id); // Check if notification is unread
          if (!unread && !notification.readTime) { // Check if notification is read for the first time
            notification.readTime = new Date().toLocaleString(); // Set read time
          }
          return { ...notification, unread };
        });
      }
    });
  }


  async notifyPr(notificationText: string, title: string) {
      const imgSrc = 'assets/svgs/default.svg';
  
      const modal = await this.modalController.create({
        component: NotificationModalComponent,
        componentProps: {
          header: title,
          message: notificationText,
          imgSrc: imgSrc
        },
        cssClass: 'transaction-modal'
      });
  
    await modal.present();
  }


  async initializeUnreadNotifications() {
    const result = await this.storage.getStoragex("unreadNotifications");
    if (result.value) {
      this.unreadNotifications = new Set<string>(JSON.parse(result.value));
    }
  }

 
  async markAsRead(item: any) {
  item.unread = false;
  this.unreadNotifications.delete(item.id);
  await this.storage.setNotify("unreadNotifications", JSON.stringify(Array.from(this.unreadNotifications)));
}


  send() {
    this.router.navigateByUrl("/deposit");
  }

  visibility() {
    this.isAccountBalanceVisible = !this.isAccountBalanceVisible;
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "bottom",
      color: color,
    });
    toast.present();
  }

  formatPrice(getBalance: number): string {
    return getBalance.toLocaleString();
  }

  formatAmount(transactionx: any) {
    return transactionx.amount.toLocaleString();
  }

  fetchBalance() {
    this.authService.getAccountBalance().subscribe((res: any) => {
      //this.displayUserData = res;

      if (
        res.message === "Signature verification failed" &&
        this.router.url !== "/auth-screen"
      ) {
        localStorage.removeItem("userData");
        localStorage.removeItem("res");
        localStorage.removeItem("accessT");
        this.toastController.create();
        this.presentToast("Session Expired.....Logging out", "danger");
        this.router.navigateByUrl("/auth-screen");
      } else {
        this.getBalance = res;
        //console.log(res)
        this.formattedPrice = this.formatPrice(this.getBalance);
        localStorage.setItem("balance", JSON.stringify(this.formattedPrice));
      }
    });
  }
  fetchUserData() {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
  }

  getImage() {
    this.authService.getUserImage().subscribe((res: any) => {
      if (
        res.message === "Signature verification failed" &&
        this.router.url !== "/auth-screen"
      ) {
        localStorage.removeItem("userData");
        localStorage.removeItem("res");
        localStorage.removeItem("accessT");
        this.toastController.create();
        this.presentToast("Session Expired.....Logging out", "danger");
        this.router.navigateByUrl("/auth-screen");
      } else {
        this.userImage = res.image;

        // Store the response in local storage
        localStorage.setItem("userImage", JSON.stringify(res.image));
      }
    });
  }

  getTransactions() {
    this.authService.getTransactions().subscribe((res: any) => {
      if (
        res.message === "Signature verification failed" &&
        this.router.url !== "/auth-screen"
      ) {
        localStorage.removeItem("userData");
        localStorage.removeItem("res");
        localStorage.removeItem("accessT");
        this.toastController.create();
        this.presentToast("Session Expired.....Logging out", "danger");
        this.router.navigateByUrl("/auth-screen");
      } else {
        // const mergedArray = [...res.inapp, ...res.vtu, ...res.deposit, ...res.withdrawal];
        // console.log(mergedArray);

        this.transactionx = res;
      }

      console.log(this.transactionx);
    });
  }

  // Helper function to format amount with commas
  formatAmountWithCommas(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  async checkAppMode() {
    const checkIsDarkMode = await Preferences.get({ key: "darkModeActivated" });
    console.log(checkIsDarkMode);
    checkIsDarkMode?.value == "true"
      ? (this.isDarkMode = true)
      : (this.isDarkMode = false);
    document.body.classList.toggle("dark", this.isDarkMode);
  }

  toggleBalance() {
    this.showBalance = !this.showBalance;
  }

  changeType() {
    this.showBalance = !this.showBalance;
  }

  // async dismissAllModals() {
  //   const modals = await this.modalController.getModals();
  //   modals.forEach(async modal => {
  //     await modal.dismiss();
  //   });
  // }
  

  ngOnInit() {
    
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.modalController.dismiss();
      this.isModalOpeN = false;
      this.isModalOpen = false;
    });
    this.initializeUnreadNotifications();


    //this.addItems(5);
    this.fetchNotification();
    this.checkAppMode();

    this.authService.userData$.subscribe((res: any) => {
      this.displayUserData = res;
    });
  }

  featureClick1() {
    this.router.navigateByUrl("/send");
  }

  featureClick2() {
    this.router.navigateByUrl("/tabs/receive");
  }

  setOpen(transaction: any) {
    this.selectedTransaction = transaction;
    this.isModalOpen = true;

    // Send response to the frontend
    // console.log('Transaction selected:', transaction);
  }

  setOpenN(isOpen: boolean) {
    if (this.router.url !== "/tabs/home") {
      this.isModalOpeN = false;
    } else {
      this.isModalOpeN = isOpen;
    }
  }

  async closeModal() {
    const modal = await this.modalController.getTop();
    await modal.dismiss();
    this.isModalOpen = false; // Set isModalOpen to false when modal is dismissed
  }

  
  closeModalN() {
    this.isModalOpeN = false;
  }

  ////////////////////Animation was done here//////////////////////////

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector("ion-backdrop")!)
      .fromTo("opacity", "0", "var(--backdrop-opacity)");

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector(".modal-wrapper")!)
      .keyframes([
        { offset: 0, opacity: "0", transform: "scale(0)" },
        { offset: 1, opacity: "1.0", transform: "scale(1)" },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing("ease-out")
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction("reverse");
  };

  ////////////////////Animation ends here//////////////////////////
}
