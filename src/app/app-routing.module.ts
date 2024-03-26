import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';
import { TabsGuard } from './guards/tabs.guard';
import { UserDataResolver } from './resolvers/userData.resolver';
import { SplashGuard } from './guards/splash.guard';
//import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
     //redirectTo: 'auth-screen',
    redirectTo: 'splash',
    pathMatch: 'full',
   // canActivate: [TabsGuard],
   
     
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [TabsGuard],
    resolve: {
      userData: UserDataResolver
    },
  },
  {
    path: 'wallets/deposit',
    loadChildren: () => import('./pages/tabs/wallets/deposits/deposits.module').then( m => m.DepositsPageModule)
  },
  {
    path: 'tabs/wallets',
    loadChildren: () => import('./pages/tabs/wallets/wallets.module').then( m => m.WalletsPageModule)
  },
  {
    path: 'tabs/receive',
    loadChildren: () => import('./pages/tabs/receives/receives.module').then( m => m.ReceivesPageModule)
  },
  {
    path: 'tabs/profiles',
    loadChildren: () => import('./pages/tabs/profiles/profiles.module').then( m => m.ProfilesPageModule)
  },
  {
    path: 'profiles/accounts',
    loadChildren: () => import('./pages/tabs/profiles/accounts/accounts.module').then( m => m.AccountsPageModule)
  },
  {
    path: 'accounts/verification',
    loadChildren: () => import('./pages/tabs/profiles/accounts/verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'accounts/email',
    loadChildren: () => import('./pages/tabs/profiles/accounts/email/email.module').then( m => m.EmailPageModule)
  },
  {
    path: 'verification/scan',
    loadChildren: () => import('./pages/tabs/profiles/accounts/verification/scan/scan.module').then( m => m.ScanPageModule)
  },
  {
    path: 'verification/selfie',
    loadChildren: () => import('./pages/tabs/profiles/accounts/verification/selfie/selfie.module').then( m => m.SelfiePageModule)
  },
  {
    path: 'profiles/help',
    loadChildren: () => import('./pages/tabs/profiles/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'profiles/settings',
    loadChildren: () => import('./pages/tabs/profiles/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'profiles/security',
    loadChildren: () => import('./pages/tabs/profiles/security/security.module').then( m => m.SecurityPageModule)
  },
  {
    path: 'security/password-change',
    loadChildren: () => import('./pages/tabs/profiles/security/password-change/password-change.module').then( m => m.PasswordChangePageModule)
  },
  {
    path: 'settings/notification',
    loadChildren: () => import('./pages/tabs/profiles/settings/notfications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'settings/devices',
    loadChildren: () => import('./pages/tabs/profiles/settings/devices/devices.module').then( m => m.DevicesPageModule)
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // },

  {
    path: 'forgotpassword',
    loadChildren: () => import('./pages/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'receive/receivesub',
    loadChildren: () => import('./pages/tabs/receives/receivesub/receivesub.module').then( m => m.ReceivesubPageModule)
  },

  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'auth-screen',
    loadChildren: () => import('./pages/auth-screen/auth-screen.module').then( m => m.AuthScreenPageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'selfie',
    loadChildren: () => import('./pages/selfie/selfie.module').then( m => m.SelfiePageModule)
  },
  // {
  //   path: 'sub-accounts',
  //   loadChildren: () => import('./pages/tabs/profiles/sub-accounts/sub-accounts.module').then( m => m.SubAccountsPageModule)
  // },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'register/verify',
    loadChildren: () => import('./pages/register/verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'register/veri',
    loadChildren: () => import('./pages/register/verify/verify.module').then( m => m.VerifyPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./pages/otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'pin',
    loadChildren: () => import('./pages/pin/pin.module').then( m => m.PinPageModule)
  },
  {
    path: 'wallet/withdrawal',
    loadChildren: () => import('./pages/wallet/withdrawal/withdrawal.module').then( m => m.WithdrawalPageModule)
  },
  {
    path: 'send',
    loadChildren: () => import('./pages/send/send.module').then( m => m.SendPageModule)
  },
  {
    path: 'bat',
    loadChildren: () => import('./pages/bat/bat.module').then( m => m.BatPageModule)
  },
  {
    path: 'withdrawal',
    loadChildren: () => import('./pages/withdrawal/withdrawal.module').then( m => m.WithdrawalPageModule)
  },
  {
    path: 'deposit',
    loadChildren: () => import('./pages/deposit/deposit.module').then( m => m.DepositPageModule)
  },
  {
    path: 'deposit-status-modal',
    loadChildren: () => import('./deposit-status-modal/deposit-status-modal.module').then( m => m.DepositStatusModalPageModule)
  },
  {
    path: 'transaction-pin',
    loadChildren: () => import('./pages/transaction-pin/transaction-pin.module').then( m => m.TransactionPinPageModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./pages/transactions/transactions.module').then( m => m.TransactionsPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule),
    
  },
  {
    path: 'mt',
    loadChildren: () => import('./pages/tabs/mtransfer/mtransfer.module').then( m => m.MtransferPageModule)
  },
  
  {
    path: 'vtu',
    loadChildren: () => import('./pages/vtu/vtu.module').then( m => m.VtuPageModule)
  },
  {
    path: 'example',
    loadChildren: () => import('./pages/example/example.module').then( m => m.ExamplePageModule)
  },
  {
    path: 'pin',
    loadChildren: () => import('./pin/pin.module').then( m => m.PinPageModule)
  },
  {
    path: 'subaccount',
    loadChildren: () => import('./pages/subaccount/subaccount.module').then( m => m.SubaccountPageModule)
  },
  {
    path: 'change-pin',
    loadChildren: () => import('./pages/tabs/profiles/security/change-pin/change-pin.module').then( m => m.ChangePinPageModule)
  },
  {
    path: 'register2',
    loadChildren: () => import('./pages/register2/register2.module').then( m => m.RegisterPage2Module)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
