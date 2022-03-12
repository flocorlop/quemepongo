import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import {Profile} from './profile.model'; 
@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {

  dataProfile: [];
  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getDataProfile()
      .subscribe(data => {
        this.dataProfile = data;
      });
      
  }

}
