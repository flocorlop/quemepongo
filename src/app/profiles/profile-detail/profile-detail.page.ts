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
        // redirect
        this.router.navigate(['/profiles']);
      }
      const u = paramMap.get("username");
      this.profile = this.profileService.getProfile(u)
        .subscribe(data => {
          this.profile = data;
        });

    });
  }

  async deleteProfile() {
    const alertElment = await this.alertCtrl.create({
      header: "Are you Sure, You want to delete this profile?",
      message: "Be carefull.",
      buttons: [
        {
          text: "Cancel",
          cssClass: 'success',
        },
        {
          text: "Delete",
          cssClass: 'danger',
          handler: () => {
            this.profileService.deleteProfile(this.profile.id);
            this.router.navigate(['/profiles'])
              .then(() => {
                window.location.reload();
              });
          }
        }
      ]
    });
    await alertElment.present();
  }

  editProfile() {
    this.router.navigate(["/profiles/edit", this.profile.id]);
  }
}
