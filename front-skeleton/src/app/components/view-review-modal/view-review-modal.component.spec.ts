import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReviewModalComponent } from './view-review-modal.component';

describe('ViewReviewModalComponent', () => {
  let component: ViewReviewModalComponent;
  let fixture: ComponentFixture<ViewReviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewReviewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
