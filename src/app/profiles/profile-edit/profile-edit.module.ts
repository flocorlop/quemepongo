import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProfileEditPage } from './profile-edit.page';

import { ProfileEditRoutingModule } from './profile-edit-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileEditRoutingModule
  ],
  declarations: [ProfileEditPage]
})
export class ProfileEditPageModule { }
