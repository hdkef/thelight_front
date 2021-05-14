import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterInfoComponent } from './writer-info.component';

describe('WriterInfoComponent', () => {
  let component: WriterInfoComponent;
  let fixture: ComponentFixture<WriterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriterInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
