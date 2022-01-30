import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutfitsPageRoutingModule } from './outfits-routing.module';

import { OutfitsPage } from './outfits.page';
import { OutfitItemComponent } from './outfit-item/outfit-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutfitsPageRoutingModule
  ],
  declarations: [OutfitsPage, OutfitItemComponent]
})
export class OutfitsPageModule {}
