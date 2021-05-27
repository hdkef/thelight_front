import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftViewOneComponent } from './draft-view-one.component';

describe('DraftViewOneComponent', () => {
  let component: DraftViewOneComponent;
  let fixture: ComponentFixture<DraftViewOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftViewOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftViewOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
