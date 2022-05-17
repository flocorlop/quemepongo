import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from "../profiles.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-profile-detail",
  templateUrl: "./profile-detail.page.html",
  styleUrls: ["./profile-detail.page.scss"]
})
export class ProfileDetailPage implements OnInit {
  profile;
  predictionColor;

  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("username")) {
        this.router.navigate(['/profiles']);
      }
      const u = paramMap.get("username");
      this.profile = this.profileService.getProfile(u)
        .subscribe(data => {
          this.profile = data;
        });

    });
  }

  editProfile() {
    this.router.navigate(["/profiles/edit", this.profile.id]);
  }
}
