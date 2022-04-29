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
    this.predictionColor = "light";
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("profileId")) {
        // redirect
        this.router.navigate(['/profiles']);
      }
      // const idO = paramMap.get("outfitId");
      // this.outfit = this.outfitsService.getProfile(idO)
      //   .subscribe(data => {
      //     this.outfit = data;
      //     if (this.outfit.percentage >= 0 && this.outfit.percentage < 25) {
      //       this.predictionColor = "025";
      //     }
      //     else if (this.outfit.percentage >= 25 && this.outfit.percentage < 50) {
      //       this.predictionColor = "2550";
      //     }
      //     else if (this.outfit.percentage >= 50 && this.outfit.percentage < 75) {
      //       this.predictionColor = "5075";
      //     }
      //     else if (this.outfit.percentage >= 75 && this.outfit.percentage <= 100) {
      //       this.predictionColor = "75100";
      //     }
      //   });

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
