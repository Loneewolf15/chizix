import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserDataResolver } from './resolvers/userData.resolver';

export const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  // },
  {
    path: '',
   //  redirectTo: 'auth-screen',
    redirectTo: 'splash',
    pathMatch: 'full',
   
   
     
  },

  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
    canMatch: [async() => await inject(AuthService).TabsGuard],
    resolve: {
      userData: UserDataResolver
    },
  },
  // {
  //   path: 'tabs',
  //   loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
  //   canMatch: [async() => await inject(AuthService).TabsGuard],
  //   resolve: {
  //     userData: UserDataResolver
  //   },
  // },
  // {
  //   path: 'wallets/deposit',
  //   loadChildren: () => import('./pages/tabs/wallets/deposits/deposits.module').then( m => m.DepositsPageModule)
  // },
  // {
  //   path: 'tabs/wallets',
  //   loadChildren: () => import('./pages/tabs/wallets/wallets.module').then( m => m.WalletsPageModule)
  // },
  // {
  //   path: 'tabs/receive',
  //   loadChildren: () => import('./pages/tabs/receives/receives.module').then( m => m.ReceivesPageModule)
  // },
  // {
  //   path: 'tabs/profiles',
  //   loadChildren: () => import('./pages/tabs/profiles/profiles.module').then( m => m.ProfilesPageModule)
  // },
  {
    path: 'profiles/accounts',
    loadComponent: () => import('./pages/tabs/profiles/accounts/accounts.page').then( m => m.AccountsPage)
  },
  // {
  //   path: 'accounts/verification',
  //   loadChildren: () => import('./pages/tabs/profiles/accounts/verification/verification.module').then( m => m.VerificationPageModule)
  // },
  // {
  //   path: 'verification/scan',
  //   loadChildren: () => import('./pages/tabs/profiles/accounts/verification/scan/scan.module').then( m => m.ScanPageModule)
  // },
  // {
  //   path: 'verification/selfie',
  //   loadChildren: () => import('./pages/tabs/profiles/accounts/verification/selfie/selfie.module').then( m => m.SelfiePageModule)
  // },
  {
    path: 'profiles/help',
    loadComponent: () => import('./pages/tabs/profiles/help/help.page').then( m => m.HelpPage)
  },
  // {
  //   path: 'profiles/settings',
  //   loadChildren: () => import('./pages/tabs/profiles/settings/settings.module').then( m => m.SettingsPageModule)
  // },
  {
    path: 'profiles/security',
    loadComponent: () => import('./pages/tabs/profiles/security/security.page').then( m => m.SecurityPage)
  },
  // {
  //   path: 'security/password-change',
  //   loadChildren: () => import('./pages/tabs/profiles/security/password-change/password-change.module').then( m => m.PasswordChangePageModule)
  // },
  // {
  //   path: 'settings/notification',
  //   loadChildren: () => import('./pages/tabs/profiles/settings/notfications/notifications.module').then( m => m.NotificationsPageModule)
  // },
  // {
  //   path: 'settings/devices',
  //   loadChildren: () => import('./pages/tabs/profiles/settings/devices/devices.module').then( m => m.DevicesPageModule)
  // },
  // {
  //   path: 'forgotpassword',
  //   loadChildren: () => import('./pages/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  // },
  // {
  //   path: 'receive/receivesub',
  //   loadChildren: () => import('./pages/tabs/receives/receivesub/receivesub.module').then( m => m.ReceivesubPageModule)
  // },
  {
    path: 'intro',
    loadComponent: () => import('./pages/intro/intro.page').then( m => m.IntroPage)
  },
  {
    path: 'auth-screen',
    loadComponent: () => import('./pages/auth-screen/auth-screen.page').then( m => m.AuthScreenPage),
    canMatch: [async() => await inject(AuthService).IntroGuard()]
  },
  // {
  //   path: 'selfie',
  //   loadChildren: () => import('./pages/selfie/selfie.module').then( m => m.SelfiePageModule)
  // },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  // {
  //   path: 'register/verify',
  //   loadChildren: () => import('./pages/register/verification/verification.module').then( m => m.VerificationPageModule)
  // },
  // {
  //   path: 'register/veri',
  //   loadChildren: () => import('./pages/register/verify/verify.module').then( m => m.VerifyPageModule)
  // },
  // {
  //   path: 'otp',
  //   loadChildren: () => import('./pages/otp/otp.module').then( m => m.OtpPageModule)
  // },
  // {
  //   path: 'pin',
  //   loadChildren: () => import('./pages/pin/pin.module').then( m => m.PinPageModule)
  // },
  // {
  //   path: 'wallet/withdrawal',
  //   loadChildren: () => import('./pages/wallet/withdrawal/withdrawal.module').then( m => m.WithdrawalPageModule)
  // },
  {
    path: 'send',
    loadComponent: () => import('./pages/send/send.page').then( m => m.SendPage)
  },
  // {
  //   path: 'bat',
  //   loadComponent: () => import('./pages/bat/bat.page').then( m => m.BatPage)
  // },
  // {
  //   path: 'withdrawal',
  //   loadChildren: () => import('./pages/withdrawal/withdrawal.module').then( m => m.WithdrawalPageModule)
  // },
  // {
  //   path: 'deposit',
  //   loadChildren: () => import('./pages/deposit/deposit.module').then( m => m.DepositPageModule)
  // },
  // {
  //   path: 'deposit-status-modal',
  //   loadChildren: () => import('./deposit-status-modal/deposit-status-modal.module').then( m => m.DepositStatusModalPageModule)
  // },
  // {
  //   path: 'transaction-pin',
  //   loadChildren: () => import('./pages/transaction-pin/transaction-pin.module').then( m => m.TransactionPinPageModule)
  // },
  {
    path: 'transactions',
    loadComponent: () => import('./pages/transactions/transactions.page').then( m => m.TransactionsPage)
  },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then( m => m.SplashPage),
    
  },
  {
    path: 'mt',
    loadChildren: () => import('./pages/tabs/mtransfer/mtransfer.page').then( m => m.MtransferPage)
  },
  
  {
    path: 'vtu',
    loadComponent: () => import('./pages/vtu/vtu.page').then( m => m.VtuPage)
  },
  {
    path: 'vtu/airtime',
    loadComponent: () => import('./pages/vtu/airtime/airtime.page').then( m => m.AirtimePage)
  },
    {
      path: 'vtu/data',
      loadComponent: () => import('./pages/vtu/data/data.page').then( m => m.DataPage)
    },
  
  // {
  //   path: 'example',
  //   loadChildren: () => import('./pages/example/example.module').then( m => m.ExamplePageModule)
  // },
  // {
  //   path: 'pin',
  //   loadChildren: () => import('./pin/pin.module').then( m => m.PinPageModule)
  // },
  // {
  //   path: 'subaccount',
  //   loadChildren: () => import('./pages/subaccount/subaccount.module').then( m => m.SubaccountPageModule)
  // },
  {
    path: 'change-pin',
    loadComponent: () => import('./pages/tabs/profiles/security/change-pin/change-pin.page').then( m => m.ChangePinPage)
  },
  // {
  //   path: 'register2',
  //   loadChildren: () => import('./pages/register2/register2.module').then( m => m.RegisterPage2Module)
  // },
];
