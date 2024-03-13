import { Component, NO_ERRORS_SCHEMA, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  LOGIN_KEY,
  PreferencesService,
} from "src/app/services/storage.service";
import { AuthService } from "src/app/services/auth.service";
import { AuthConstants } from "src/app/config/auth-constants";

import { ToastService } from "src/app/services/toast.service";
import {
  AlertController,
  IonicModule,
  LoadingController,
  Platform,
  ToastController,
} from "@ionic/angular";
import { finalize } from "rxjs/operators";
import { CommonModule } from "@angular/common";
import { Preferences } from "@capacitor/preferences";

import { BiometryType, NativeBiometric } from "capacitor-native-biometric";
import { Capacitor } from "@capacitor/core";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  emailForm: FormGroup;
  form1: FormGroup;
  type = true;
  showForgotPassForm = false;
  isLoading: Boolean;
  server = "www.api.veluxpay.com";

  public postData = {
    email: "",
    password: "",
  };
  public sendData = {
    email: "",
  };

  darkMode = false;
  bioS = false;
  public sendData2 = {
    otp: "",
    password: "",
    cpassword: "",
  };
  //toastCtrl: any;

  constructor(
    private router: Router,
    private storage: PreferencesService,
    private preferences: PreferencesService,
    private authService: AuthService,
    private toastService: ToastService,
    private toastCtrl: ToastController,
    private platform: Platform,
    private alertController: AlertController,
    private loadingCtl: LoadingController // private fingerPrint: FingerprintAIO
  ) {
    this.initForm();
    this.showB();
  }

  ngOnInit() {
    this.checkAppMode();
    this.showB;
  }

  async showB() {
    // const sBio =  await Preferences.get({key: 'login-card'});
    // console.log(sBio)
    //     sBio?.value == 'true' ? (this.bioS = true) : (this.bioS = false)

    //const bioS = sBio === 'true';
    const isBiometricEnabled = await Preferences.get({ key: "isBiometric" });
    if (isBiometricEnabled && isBiometricEnabled.value === "true") {
      this.bioS = true;
    } else {
      this.bioS = false;
    }
  }

  async checkAppMode() {
    const checkIsDarkMode = await Preferences.get({ key: "darkModeActivated" });
    console.log(checkIsDarkMode);
    checkIsDarkMode?.value == "true"
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle("dark", this.darkMode);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle("dark", this.darkMode);
    if (this.darkMode) {
      Preferences.set({ key: "darkModeActivated", value: "true" });
    } else {
      Preferences.set({ key: "darkModeActivated", value: "false" });
    }
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      }),
    });

    this.emailForm = new FormGroup({
      emailx: new FormControl(null, { validators: [Validators.required] }),
    });

    this.form1 = new FormGroup({
      otp: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(6),
        ],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      cpassword: new FormControl(null, {
        validators: [Validators.required, this.matchingPasswords.bind(this)],
      }),
    });
  }

  matchingPasswords(control: any) {
    if (this.form1) {
      if (control.value !== this.form1.controls["password"].value) {
        return { mismatchedPasswords: true };
      }
    }

    return null;
  }

  changeType() {
    this.type = !this.type;
  }
  logIn() {
    if (this.router.url === "/auth-screen") {
      this.loginfunc();

      setTimeout(() => {
        this.loadingCtl.dismiss();
        this.isLoading = false;
      }, 10000);
      this.isLoading = false;
    }
  }
  validateData() {
    let email = this.postData.email;
    let password = this.postData.password;

    return (
      this.postData.email &&
      this.postData.password &&
      email.length > 0 &&
      password.length > 0
    );
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  customCounterFormatterE(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  validateDatax() {
    let email = this.sendData.email;

    return this.sendData.email && email.length > 0;
  }

  validateDatay() {
    let otp = this.sendData2.otp;
    let pass = this.sendData2.password;
    let c_p = this.sendData2.cpassword;

    return (
      this.sendData2.otp &&
      this.sendData2.password &&
      this.sendData2.cpassword &&
      otp.length > 0 &&
      pass.length > 0 &&
      c_p.length > 0
    );
  }

  async presentLoading(message: string, spinnerx: any) {
    const loading = await this.loadingCtl.create({
      message: message,
      spinner: spinnerx,
    });
    await loading.present();
  }

  register() {
    this.router.navigateByUrl("/register");
  }

  async showToastx(infoMessage: string) {
    const toasty = await this.toastCtrl.create({
      message: infoMessage,
      duration: 2000,
      color: "success",
    });
    toasty.present();
  }

  async presentAlertx(message?: string) {
    const alert = await this.alertController.create({
      header: "Network Error",
      message: message || "Coming Soon...",
      buttons: [
        {
          text: "CLOSE",
          cssClass: "alert-button-confirm",
        },
      ],
      cssClass: "custom-alert",
      animated: true,
    });
    await alert.present();
  }

  loginfunc() {
    if (this.validateData() && !this.form.valid) {
      this.form.markAllAsTouched();
      return (
        this.postData.email &&
        this.postData.password &&
        this.postData.email.length > 0 &&
        this.postData.password.length > 0
      );
    }

    this.presentLoading("Loggin in...", "bubbles");
    console.log(this.form.value);
    this.authService
      .loginfunc(this.form.value)
      .pipe(
        finalize(() => {
          this.loadingCtl.dismiss();
        })
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.status === "true") {
            //  this.setCredential()
            this.preferences.store(AuthConstants.AUTH, res.data);
            console.log(this.postData);
            console.log("Forms Value", this.form.value);
            this.saveCredentials(this.form.value);
            this.router.navigateByUrl("/tabs", { replaceUrl: true });
            console.log(res);
            console.log(res.access_token);
            localStorage.setItem("accessT", JSON.stringify(res.access_token));
            localStorage.setItem("userData", JSON.stringify(res.data));
            this.showToastx(res.message);
          } else {
            this.toastService.showToast(res.message);
            let msg =
              "Check your internet connection || Network connection failed";
            if (res.message == "invalid user login detail") {
              msg = "Email Id could not be found";
            } else if (res.message == "Invalid password") {
              msg = "Please enter correct password";
            }
            this.showAlert(msg);
          }
        },
        (err: any) => {
          this.isLoading = false;
          this.loadingCtl.dismiss();
          console.log(err);
          this.toastService.showToast(
            "Check your internet connection || Network connection failed"
          );
          this.presentAlertx(
            "Failed to establish connection, please check your network connectivity!"
          );
          this.loadingCtl.dismiss();
        }
      );
    this.loadingCtl.dismiss();
    return true;
  }

  async saveCredentials(data: { email: string; password: string }) {
    try {
      const result = await NativeBiometric.isAvailable();
      if (!result.isAvailable) return;
      //tSave user's credentials
      await NativeBiometric.setCredentials({
        username: data.email,
        password: data.password,
        server: this.server,
      });

      await Preferences.set({
        key: "isBiometric",
        value: "true",
      });

      //this.openToast('Login Successful');
      this.showToastx("Login Successful");
    } catch (e) {
      console.log(e);
    }
  }

  async performBiometricVerification() {
    try {
      const result = await NativeBiometric.isAvailable({ useFallback: true });
      if (!result.isAvailable) return;

      let biometryType;
      if (result.biometryType) {
        biometryType = result.biometryType;
      } else {
        // Determine the biometry type based on platform
        biometryType =
          Capacitor.getPlatform() === "android"
            ? BiometryType.FINGERPRINT
            : BiometryType.TOUCH_ID; // Default to TOUCH_ID for iOS
      }

      // // Handle MULTIPLE biometry type
      // if (biometryType.includes(BiometryType.MULTIPLE)) {
      //   // Check if the device supports FINGERPRINT authentication
      //   if (biometryType.includes(BiometryType.FINGERPRINT)) {
      //     biometryType = BiometryType.FINGERPRINT; // Set default to FINGERPRINT
      //   } else {
      //     // If FINGERPRINT is not supported, fallback to the first available biometric type
      //     biometryType = biometryType[0];
      //   }
      // }

      const authenticationPrompt = this.getAuthenticationPrompt(biometryType);

      const verified = await NativeBiometric.verifyIdentity({
        reason: "Authentication",
        title: "Log in",
        ...authenticationPrompt,
        useFallback: true,
        maxAttempts: 3,
      })
        .then(() => true)
        .catch((error) => {
          console.log(error);
          return false; // Biometric authentication failed
        });

      if (!verified) {
        // Handle scenario where biometric authentication fails
        const errorMessage = this.getErrorMessage(biometryType);
        this.presentAlertx(errorMessage);
        return;
      }

      this.getCredentials();
    } catch (e) {
      console.log(e);
    }
  }

  getAuthenticationPrompt(
    biometryType: BiometryType
  ): { subtitle: string; description: string } {
    switch (biometryType) {
      case BiometryType.TOUCH_ID:
        return {
          subtitle: "Touch ID",
          description: "Authorise your account using your Touch ID",
        };
      case BiometryType.FACE_ID:
        return {
          subtitle: "Face ID",
          description: "Authorise your account using your Face ID",
        };
      case BiometryType.FINGERPRINT:
        return {
          subtitle: "Fingerprint",
          description: "Authorise your account using your Fingerprint",
        };
      case BiometryType.FACE_AUTHENTICATION:
        return {
          subtitle: "Face Authentication",
          description: "Authorise your account using Face Authentication",
        };
      case BiometryType.IRIS_AUTHENTICATION:
        return {
          subtitle: "Iris Authentication",
          description: "Authorise your account using Iris Authentication",
        };
      // case BiometryType.MULTIPLE:
      //   return {
      //     subtitle: "Biometric",
      //     description: "Authorise your account using biometric authentication",
      //   };
      default:
        return {
          subtitle: "Biometric",
          description: "Authorise your account using biometric authentication",
        };
    }
  }

  getErrorMessage(biometryType: BiometryType): string {
    switch (biometryType) {
      case BiometryType.TOUCH_ID:
        return "Touch ID authentication failed or not set up. Please try again or use another authentication method.";
      case BiometryType.FACE_ID:
        return "Face ID authentication failed or not set up. Please try again or use another authentication method.";
      case BiometryType.FINGERPRINT:
        return "Fingerprint authentication failed or not set up. Please try again or use another authentication method.";
      case BiometryType.FACE_AUTHENTICATION:
        return "Face Authentication failed or not set up. Please try again or use another authentication method.";
      case BiometryType.IRIS_AUTHENTICATION:
        return "Iris Authentication failed or not set up. Please try again or use another authentication method.";
      case BiometryType.MULTIPLE:
        return "Biometric authentication failed. Please try again or use another authentication method.";
      default:
        return "Biometric authentication failed. Please try again or use another authentication method.";
    }
  }

  async getCredentials() {
    try {
      const credentials = await NativeBiometric.getCredentials({
        server: this.server,
      });
      console.log(credentials);
      // this.showToastx(
      //   `Authorised! Credentials: ${credentials.username}, ${credentials.password}`
      // );
      const loginData = {
        email: credentials.username,
        password: credentials.password,
      };
      this.presentLoading("Loggin in...", "bubbles");
      console.log(this.form.value);
      this.authService
        .loginfunc(loginData)
        .pipe(
          finalize(() => {
            this.loadingCtl.dismiss();
          })
        )
        .subscribe(
          (res: any) => {
            if (res.status === "true") {
              //  this.setCredential()
              this.preferences.store(AuthConstants.AUTH, res.data);
              console.log(this.postData);
              console.log("Forms Value", this.form.value);
              this.saveCredentials(this.form.value);
              this.router.navigateByUrl("/tabs", { replaceUrl: true });
              console.log(res);
              console.log(res.access_token);
              localStorage.setItem("accessT", JSON.stringify(res.access_token));
              localStorage.setItem("userData", JSON.stringify(res.data));
              this.showToastx(res.message);
            } else {
              this.toastService.showToast(res.message);
              let msg =
                "Check your internet connection || Network connection failed";
              if (res.message == "invalid user login detail") {
                msg = "Email Id could not be found";
              } else if (res.message == "invalid password") {
                msg = "Please enter correct password";
              }
              this.showAlert(msg);
            }
          },
          (err: any) => {
            this.isLoading = false;
            this.loadingCtl.dismiss();
            console.log(err);
            this.toastService.showToast(
              "Check your internet connection || Network connection failed"
            );
            this.presentAlertx(
              "Failed to establish connection, please check your network connectivity!"
            );
          }
        );
      this.loadingCtl.dismiss();
    } catch (e) {
      console.log(e);
    }
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      header: "Authentication Failed",
      message,
      buttons: ["OK"],
    });

    await alert.present();
  }

  resetP() {
    if (this.validateDatax() && !this.emailForm.valid) {
      this.emailForm.markAllAsTouched();
      return this.sendData.email && this.sendData.email.length > 0;
    }

    this.presentLoading("Processing...", "dots");
    this.authService
      .forgotP(this.sendData)
      .pipe(
        finalize(() => {
          this.loadingCtl.dismiss();
        })
      )
      .subscribe(
        (res: any) => {
          console.log(res);

          if ((res.message = "email sent")) {
            console.log("I got" + res);
            this.showForgotPassForm = true;
          }
        },
        (err: any) => {
          console.log(err);
          this.toastService.showToast(
            "Check your internet connection || Network connection failed"
          );
          this.presentAlertx(
            "Failed to establish connection, please check your network connectivity!"
          );
        }
      );
    return true;
  }

  resetPx() {
    if (this.validateDatay() && !this.form.valid) {
      this.form.markAllAsTouched();
      return (
        this.sendData2.otp &&
        this.sendData2.password &&
        this.sendData2.cpassword &&
        this.sendData2.otp.length > 0 &&
        this.sendData2.password.length > 0 &&
        this.sendData2.cpassword.length > 0
      );
    }

    this.presentLoading("Processing...", "dots");
    this.authService
      .forgotPx(this.form1.value)
      .pipe(
        finalize(() => {
          this.loadingCtl.dismiss();
        })
      )
      .subscribe(
        (res: any) => {
          console.log(res);

          if ((res.message = "password reset successful")) {
            console.log("I got" + res);
            this.showForgotPassForm = false;
            //this.modal.dismiss()
          }
          return true;
        },
        (err: any) => {
          console.log(err);
          this.toastService.showToast(
            "Check your internet connection || Network connection failed"
          );
          this.presentAlertx(
            "Failed to establish connection, please check your network connectivity!"
          );
        }
      );
    return true;
  }
}
