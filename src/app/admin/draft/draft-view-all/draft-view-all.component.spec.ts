import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftViewAllComponent } from './draft-view-all.component';

describe('DraftViewAllComponent', () => {
  let component: DraftViewAllComponent;
  let fixture: ComponentFixture<DraftViewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftViewAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
