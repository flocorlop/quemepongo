import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from './profiles.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profiles',
  templateUrl: 'profiles.page.html',
  styleUrls: ['profiles.page.scss'],
})
export class ProfilePage implements OnInit {

  profiles: [];
  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.profileService.getProfiles()
      .subscribe(data => {
        this.profiles = data;
      });

  }
  addNewProfile() {
    this.router.navigate(['/new-profile']);
  }
}
