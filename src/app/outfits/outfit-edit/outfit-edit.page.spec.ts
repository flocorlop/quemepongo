import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OutfitEditPage } from './outfit-edit.page';

describe('OutfitEditPage', () => {
  let component: OutfitEditPage;
  let fixture: ComponentFixture<OutfitEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OutfitEditPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutfitEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
