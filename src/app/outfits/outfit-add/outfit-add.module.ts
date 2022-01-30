import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutfitAddPageRoutingModule } from './outfit-add-routing.module';

import { OutfitAddPage } from './outfit-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutfitAddPageRoutingModule
  ],
  declarations: [OutfitAddPage]
})
export class OutfitAddPageModule {}
