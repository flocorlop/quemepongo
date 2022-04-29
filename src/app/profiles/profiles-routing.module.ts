import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profiles.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'profile-detail',
    loadChildren: () => import('./profile-detail/profile-detail.module').then(m => m.ProfileDetailPageModule)
  },
  {
    path: 'profile-add',
    loadChildren: () => import('./profile-add/profile-add.module').then(m => m.ProfileAddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesPageRoutingModule { }
