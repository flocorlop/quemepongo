import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutfitDetailPage } from './outfit-detail.page';

const routes: Routes = [
  {
    path: '',
    component: OutfitDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutfitDetailPageRoutingModule {}
