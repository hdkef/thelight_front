import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmArticleListComponent } from './adm-article-list.component';

describe('AdmArticleListComponent', () => {
  let component: AdmArticleListComponent;
  let fixture: ComponentFixture<AdmArticleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmArticleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
