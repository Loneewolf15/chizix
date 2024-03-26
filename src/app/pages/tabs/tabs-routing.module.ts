import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsGuard } from 'src/app/guards/tabs.guard';
import { UserDataResolver } from 'src/app/resolvers/userData.resolver';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
 
    children: [
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
        


      },  
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
       
      },
      // {
      //   path: 'card',
      //   loadChildren: () => import('./card/card.module').then( m => m.CardPageModule)
      // },
      {
        path: 'profiles',
        loadChildren: () => import('./profiles/profiles.module').then( m => m.ProfilesPageModule)
      },
      {
        path: 'wallets',
        loadChildren: () => import('./wallets/wallets.module').then( m => m.WalletsPageModule)
      },
      {
        path: 'mt',
        loadChildren: () => import('./mtransfer/mtransfer.module').then( m => m.MtransferPageModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
