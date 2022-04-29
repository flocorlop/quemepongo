import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../profiles.model';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.scss'],
})
export class ProfileItemComponent implements OnInit {

  @Input() profileItem: Profile;

  constructor() { }

  ngOnInit() { }

}
