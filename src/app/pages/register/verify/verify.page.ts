import { CommonModule } from "@angular/common";
import { Component, NO_ERRORS_SCHEMA, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AnimationController, IonicModule } from "@ionic/angular";
import { ImageService } from "src/app/services/image.service";
import { NinService } from "src/app/services/nin.service";

import {
  LOGIN_KEY,
  PreferencesService,
} from "src/app/services/storage.service";

@Component({
  selector: "app-verify",
  templateUrl: "./verify.page.html",
  styleUrls: ["./verify.page.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class VerifyPage implements OnInit {
  allTransactions: any[] = [];
  transactions: any[] = [];
  segmentValue = "in";
  uploadSuccess = false;
  scanSuccess = false;
  imgValidation: any;
  ninValidation: any;

  constructor(
    public router: Router,
    private storage: PreferencesService,
    private animationController: AnimationController,
    private igs: ImageService,
    private ngs: NinService
  ) {
    this.selfieStatus();
    this.ninStatus();
    this.igs.uploadStatus$.subscribe((status) => {
      this.uploadSuccess = status;
    });
    this.ngs.scanStatus$.subscribe((ninstatus) => {
      this.scanSuccess = ninstatus;
    });
    this.redirectF();
  }

  goToLogin() {
    this.storage.setPreference(LOGIN_KEY, "true");
    this.router.navigateByUrl("/tabs");
  }

  selfie() {
    if (this.uploadSuccess || this.imgValidation > 0) {
      return false; // Prevent the default action of the event
    } else {
      this.router.navigateByUrl("/veri/selfie");
      return true;
    }
  }
  scan() {
    if (this.scanSuccess || this.ninValidation > 0) {
      return false; // Prevent the default action of the event
    } else {
      this.router.navigateByUrl("/veri/scan");
      return true;
    }
  }

  selfieStatus() {
    // Check if the img_validation is greater than 0
    const loginData = JSON.parse(localStorage.getItem("userData")).loginData;
    this.imgValidation = loginData.img_validation;
    console.log(this.imgValidation);
  }

  ninStatus() {
    // Check if the img_validation is greater than 0
    const loginData = JSON.parse(localStorage.getItem("userData")).loginData;
    this.ninValidation = loginData.nin_validation;
    console.log(this.ninValidation);
  }
  ngOnInit() {
    this.startAnimation();
    this.igs.uploadStatus$.subscribe((status) => {
      this.uploadSuccess = status;
    });
    this.ngs.scanStatus$.subscribe((ninstatus) => {
      this.scanSuccess = ninstatus;
    });

    this.selfieStatus();
    this.ninStatus();
    this.redirectF();
  }

  redirectF() {
    // Check if imgValidation or ninValidation is greater than 0
    if (
      (this.imgValidation > 0 && this.ninValidation > 0) ||
      (this.uploadSuccess && this.scanSuccess)
    ) {
      this.storage.setPreference(LOGIN_KEY, "true");
      // Redirect to the tabs page
      // Replace 'tabs' with the actual route to the tabs page
      console.log("Redirecting to Tabs page");
      setTimeout(() => {
        //console.log('Leaving Splash')
        this.router.navigateByUrl("/tabs");
      }, 10);
      // this.router.navigateByUrl('/tabs');
    }
  }

  async startAnimation() {
    const animation = this.animationController
      .create()
      .addElement(document.querySelector(".hourglass-icon"))
      .duration(1000) // Adjust duration as needed
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: "rotate(0deg)" },
        { offset: 0.5, transform: "rotate(180deg)" },
        { offset: 1, transform: "rotate(360deg)" },
      ]);

    await animation.play();
  }
}
