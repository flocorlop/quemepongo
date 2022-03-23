import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectImagePage } from './select-image.page';

const routes: Routes = [
  {
    path: '',
    component: SelectImagePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectImageRoutingModule {}
