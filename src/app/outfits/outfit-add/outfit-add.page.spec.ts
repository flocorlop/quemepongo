import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OutfitAddPage } from './outfit-add.page';

describe('OutfitAddPage', () => {
  let component: OutfitAddPage;
  let fixture: ComponentFixture<OutfitAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutfitAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutfitAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
