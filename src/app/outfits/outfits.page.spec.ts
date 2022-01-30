import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OutfitsPage } from './outfits.page';

describe('OutfitsPage', () => {
  let component: OutfitsPage;
  let fixture: ComponentFixture<OutfitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutfitsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutfitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
