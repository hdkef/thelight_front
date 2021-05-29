import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftItemComponent } from './draft-item.component';

describe('DraftItemComponent', () => {
  let component: DraftItemComponent;
  let fixture: ComponentFixture<DraftItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
