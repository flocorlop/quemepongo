import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OutfitsService } from "../outfits.service";
import { Outfit } from "../outfit.model";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-outfit-detail",
  templateUrl: "./outfit-detail.page.html",
  styleUrls: ["./outfit-detail.page.scss"]
})
export class OutfitDetailPage implements OnInit {
  outfit;

  constructor(
    private activatedRoute: ActivatedRoute,
    private outfitsService: OutfitsService,
    private router: Router,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("outfitId")) {
        // redirect
        this.router.navigate(['/outfits']);
      }
      const idO = paramMap.get("outfitId");
      this.outfit = this.outfitsService.getOutfit(idO)
        .subscribe(data => {
          this.outfit = data;
        });
    });


  }

  async deleteOutfit() {
    const alertElment = await this.alertCtrl.create({
      header: "Are you Sure, You want to delete this outfit?",
      message: "Be carefull.",
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Delete",
          handler: () => {
            //this.outfitsService.deleteOutfit(this.outfit.id);
            this.router.navigateByUrl("/outfits");
          }
        }
      ]
    });
    await alertElment.present();
  }
}
