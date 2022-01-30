import { Component, OnInit, Input } from '@angular/core';
import { Outfit } from '../outfit.model';

@Component({
  selector: 'app-outfit-item',
  templateUrl: './outfit-item.component.html',
  styleUrls: ['./outfit-item.component.scss'],
})
export class OutfitItemComponent implements OnInit {

  @Input() outfitItem: Outfit;

  constructor() { }

  ngOnInit() {}

}
