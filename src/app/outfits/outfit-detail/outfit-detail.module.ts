import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutfitDetailPageRoutingModule } from './outfit-detail-routing.module';

import { OutfitDetailPage } from './outfit-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutfitDetailPageRoutingModule
  ],
  declarations: [OutfitDetailPage]
})
export class OutfitDetailPageModule {}
