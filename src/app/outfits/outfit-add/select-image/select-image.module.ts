import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SelectImagePage } from './select-image.page';

import { SelectImageRoutingModule } from './select-image-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectImageRoutingModule
  ],
  declarations: [SelectImagePage]
})
export class SelectImagePageModule {}
