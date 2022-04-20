import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutfitEditPage } from './outfit-edit.page';

const routes: Routes = [
  {
    path: '',
    component: OutfitEditPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutfitEditRoutingModule { }
