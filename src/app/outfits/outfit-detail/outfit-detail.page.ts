import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OutfitsService } from "../outfits.service";

@Component({
  selector: "app-outfit-detail",
  templateUrl: "./outfit-detail.page.html",
  styleUrls: ["./outfit-detail.page.scss"]
})
export class OutfitDetailPage implements OnInit {
  outfit;
  predictionColor;

  constructor(
    private activatedRoute: ActivatedRoute,
    private outfitsService: OutfitsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.predictionColor = "light";
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("outfitId")) {
        this.router.navigate(['/outfits']);
      }
      const idO = paramMap.get("outfitId");
      this.outfit = this.outfitsService.getOutfit(idO)
        .subscribe(data => {
          this.outfit = data;
          if (this.outfit.percentage >= 0 && this.outfit.percentage < 25) {
            this.predictionColor = "025";
          }
          else if (this.outfit.percentage >= 25 && this.outfit.percentage < 50) {
            this.predictionColor = "2550";
          }
          else if (this.outfit.percentage >= 50 && this.outfit.percentage < 75) {
            this.predictionColor = "5075";
          }
          else if (this.outfit.percentage >= 75 && this.outfit.percentage <= 100) {
            this.predictionColor = "75100";
          }
        });

    });
  }

  editOutfit() {
    this.router.navigate(["/outfits/edit", this.outfit.id]);
  }
}
