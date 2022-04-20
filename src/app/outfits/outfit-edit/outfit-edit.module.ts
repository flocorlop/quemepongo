import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { OutfitEditPage } from './outfit-edit.page';

import { OutfitEditRoutingModule } from './outfit-edit-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutfitEditRoutingModule
  ],
  declarations: [OutfitEditPage]
})
export class OutfitEditPageModule { }
