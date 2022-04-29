import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilesPageRoutingModule } from './profiles-routing.module';

import { ProfilePage } from './profiles.page';
import { ProfileItemComponent } from './profile-item/profile-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilesPageRoutingModule
  ],
  declarations: [ProfilePage, ProfileItemComponent]
})
export class ProfilesPageModule { }
