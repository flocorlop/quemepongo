import { Component, OnInit } from "@angular/core";
import { OutfitsService } from "./outfits.service";
import { Outfit } from "./outfit.model";
import { Router } from '@angular/router';
@Component({
  selector: "app-outfits",
  templateUrl: "./outfits.page.html",
  styleUrls: ["./outfits.page.scss"]
})
export class OutfitsPage implements OnInit {
  outfits: Outfit[];

  constructor(private outfitsService: OutfitsService, private router: Router) {}

  ngOnInit() {
    this.outfits = this.outfitsService.getOutfits();
  }

  ionViewWillEnter() {
    this.outfits = this.outfitsService.getOutfits();
  }

  addNewOutfit() {
    this.router.navigate(['/new-outfit']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToProfile(){
    this.router.navigate(['/profile']);
  }
}
