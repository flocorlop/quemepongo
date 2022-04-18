import { Component, OnInit } from "@angular/core";
import { OutfitsService } from "./outfits.service";
import { Router } from '@angular/router';
@Component({
  selector: "app-outfits",
  templateUrl: "./outfits.page.html",
  styleUrls: ["./outfits.page.scss"]
})
export class OutfitsPage implements OnInit {
  outfits: [];

  constructor(private outfitsService: OutfitsService, private router: Router) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.outfitsService.getOutfits()
      .subscribe(data => {
        this.outfits = data;
      });

  }

  addNewOutfit() {
    this.router.navigate(['/new-outfit']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToProfile() {
    this.router.navigate(['/profiles']);
  }
}
