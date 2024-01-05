import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'home',
                loadComponent: () => import('./home/home.page').then( m => m.HomePage)
            },
              {
                path: 'profiles',
                loadComponent: () => import('./profiles/profiles.page').then( m => m.ProfilesPage)
              },
              {
                path: 'wallets',
                loadComponent: () => import('./wallets/wallets.page').then( m => m.WalletsPage)
              },
              {
                path: 'mt',
                loadComponent: () => import('./mtransfer/mtransfer.page').then( m => m.MtransferPage)
              },
              {
                path: 'receive',
                loadComponent: () => import('./receives/receives.page').then( m => m.ReceivesPage)
              },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    },
];