import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ReviewService } from 'services/review.service';

@Component({
  selector: 'review-list',
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss'
})
export class ReviewListComponent implements OnInit{

  @Input() type?: any;
  @Input() entity?: any;
  @Output() closeModal = new EventEmitter<any>();
  @ViewChild('reviewModal') reviewModal?: ElementRef;
  modal?: any
  reviewData: any

  constructor(private reviewService: ReviewService){}


  ngOnInit(): void {
    this.showModal()
    if (this.type && this.entity) {
      this.reviewService.getReviewByEntity(this.type, this.entity.id).subscribe(
        (reviewData) => {
          this.reviewData = reviewData
        }
      )
    }
  }

  showModal(): void {
    this.modal = new (window as any).bootstrap.Modal(document.getElementById('reviewModal'), {backdrop: 'static'});
    this.modal.show(); // Afficher le modal
  }

  onCancel(): void {
    this.closeModal.emit(null);
    this.modal.hide();
  }
}
