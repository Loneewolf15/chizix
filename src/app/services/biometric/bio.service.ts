import { Injectable } from "@angular/core";
import { BiometryType, NativeBiometric } from "capacitor-native-biometric";
import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import { AlertController, ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class BioService {
  private checkPinFunction: (pin: any) => void; // Modify to accept a pin parameter
  server: string = "pin.api.veluxpay.com";
  UserData: any;
  bioSe: boolean;
  pin: any;
  constructor(
    private toastCtrl: ToastController,
    private alertController: AlertController
  ) {}

  async showB() {
    const isBiometricEnabled = await Preferences.get({ key: "isBiometricP" });
    if (isBiometricEnabled && isBiometricEnabled.value === "true") {
      this.bioSe = true;
    } else {
      this.bioSe = false;
    }
  }

  /**
   * Fetches the PIN from local storage.
   */
  async fetchPin() {
    try {
      const userDataString = localStorage.getItem("userData");
      if (userDataString) {
        this.UserData = JSON.parse(userDataString);
      }
      console.log("User Data Fetched successfully", this.UserData);
      this.fetchInfo();
    } catch (error) {
      console.error("Error fetching PIN:", error);
    }
  }

  /**
   * Fetches user info and saves credentials using biometric authentication.
   */
  async fetchInfo() {
    try {
      const email = this.UserData?.loginData?.email;
      const password = this.UserData?.loginData?.resetotp;

      if (email && password) {
        await this.saveCredentials({ email, password });
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  /**
   * Saves user credentials using biometric authentication.
   */
  async saveCredentials(data: { email: string; password: string }) {
    try {
      const result = await NativeBiometric.isAvailable();
      if (!result.isAvailable) return;

      await NativeBiometric.setCredentials({
        username: data.email,
        password: data.password,
        server: this.server,
      });

      await Preferences.set({
        key: "isBiometricP",
        value: "true",
      });

      this.showToast("Login Successful");
    } catch (e) {
      console.error("Error saving credentials:", e);
    }
  }

  /**
   * Initiates transfer with biometric verification.
   */
  async initiateTransfer() {
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

      // Handle MULTIPLE biometry type
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
        this.presentAlert(errorMessage);
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
          description: "Complete your transaction using your Touch ID",
        };
      case BiometryType.FACE_ID:
        return {
          subtitle: "Face ID",
          description: "Authorise your transaction using your Face ID",
        };
      case BiometryType.FINGERPRINT:
        return {
          subtitle: "Fingerprint",
          description: "Authorise your transaction using your Fingerprint",
        };
      case BiometryType.FACE_AUTHENTICATION:
        return {
          subtitle: "Face Authentication",
          description: "Authorise your transaction using Face Authentication",
        };
      case BiometryType.IRIS_AUTHENTICATION:
        return {
          subtitle: "Iris Authentication",
          description: "Authorise your transaction using Iris Authentication",
        };
      // case BiometryType.MULTIPLE:
      //   return {
      //     subtitle: "Biometric",
      //     description:
      //       "Authorise your transaction using biometric authentication",
      //   };
      default:
        return {
          subtitle: "Biometric",
          description:
            "Authorise your transaction using biometric authentication",
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

  /**
   * Retrieves user credentials.
   */
  async getCredentials() {
    try {
      const credentials = await NativeBiometric.getCredentials({
        server: this.server,
      });
      console.log(credentials);
      // this.showToast(
      //   `Authorised! Credentials: ${credentials.username}, ${credentials.password}`
      // );
      this.pin = credentials.password;
      // Check if the checkpin function is defined
      // Check if the checkpin function is defined and call it with the pin value
      if (this.checkPinFunction) {
        this.checkPinFunction(this.pin); // Pass the password as the pin value
        this.showToast(`Authorised! Pin: ${credentials.password}`);
      }
      //  this.presentAlert(credentials.password);
    } catch (e) {
      console.error("Error fetching credentials:", e);
    }
  }
  /**
   * References  checkpin function.
   */
  setCheckPinFunction(checkPinFunction: (pin: any) => void) {
    this.checkPinFunction = checkPinFunction; // Set the checkpin function reference
  }
  /**
   * Presents a toast message.
   * @param message The message to display in the toast.
   */
  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: "success",
    });
    await toast.present();
  }

  /**
   * Presents an alert message.
   * @param message The message to display in the alert.
   */
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Authentication Error",
      message,
      buttons: ["OK"],
    });
    await alert.present();
  }
}
