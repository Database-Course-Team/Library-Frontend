import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GivebackComponent } from './giveback.component';

describe('GivebackComponent', () => {
  let component: GivebackComponent;
  let fixture: ComponentFixture<GivebackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GivebackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GivebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
