import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutfitsPage } from './outfits.page';

const routes: Routes = [
  {
    path: '',
    component: OutfitsPage
  },
  {
    path: 'outfit-detail',
    loadChildren: () => import('./outfit-detail/outfit-detail.module').then( m => m.OutfitDetailPageModule)
  },
  {
    path: 'outfit-add',
    loadChildren: () => import('./outfit-add/outfit-add.module').then( m => m.OutfitAddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutfitsPageRoutingModule {}
