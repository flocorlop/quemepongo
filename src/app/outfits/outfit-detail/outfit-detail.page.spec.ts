import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OutfitDetailPage } from './outfit-detail.page';

describe('OutfitDetailPage', () => {
  let component: OutfitDetailPage;
  let fixture: ComponentFixture<OutfitDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutfitDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutfitDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
