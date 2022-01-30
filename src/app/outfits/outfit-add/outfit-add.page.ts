import { Component, OnInit } from '@angular/core';
import { OutfitsService } from '../outfits.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outfit-add',
  templateUrl: './outfit-add.page.html',
  styleUrls: ['./outfit-add.page.scss'],
})
export class OutfitAddPage implements OnInit {

  constructor(private outfitsService: OutfitsService, private router: Router) { }

  ngOnInit() {
  }

  saveNewOutfit(title: HTMLInputElement, imageURL: HTMLInputElement) {
    this.outfitsService.addOutfit(title.value, imageURL.value);
    this.router.navigate(['/outfits']);
  }

}
