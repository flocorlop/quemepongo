import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutfitAddPage } from './outfit-add.page';

const routes: Routes = [
  {
    path: '',
    component: OutfitAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutfitAddPageRoutingModule {}
