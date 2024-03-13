import { Component, NO_ERRORS_SCHEMA, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AnimationController, IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { ImageService } from "src/app/services/image.service";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { NinService } from "src/app/services/nin.service";
@Component({
  selector: "app-verification",
  templateUrl: "./verification.page.html",
  styleUrls: ["./verification.page.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [NO_ERRORS_SCHEMA],
  animations: [
    trigger("hourglassSpin", [
      state("inactive", style({ transform: "rotate(0deg)" })),
      state("active", style({ transform: "rotate(360deg)" })),
      transition("inactive <=> active", animate("1s ease-in-out")),
    ]),
  ],
})
export class VerificationPage implements OnInit {
  uploadSuccess = false;
  scanSuccess = false;
  imgValidation: any;
  ninValidation: any;
  constructor(
    public router: Router,
    private igs: ImageService,
    private ngs: NinService,
    private animationController: AnimationController
  ) {
    this.selfieStatus();
    this.ninStatus();
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
  }

  selfie() {
    if (this.uploadSuccess || this.imgValidation > 0) {
      return false; // Prevent the default action of the event
    } else {
      this.router.navigateByUrl("/verification/selfie");
      return true;
    }
  }

  scan() {
    if (this.scanSuccess || this.ninValidation > 0) {
      return false; // Prevent the default action of the event
    } else {
      this.router.navigateByUrl("/verification/scan");
      return true;
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
