import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Review } from 'models/review.model';
import { ReviewService } from 'services/review.service';

@Component({
  selector: 'view-review-modal',
  templateUrl: './view-review-modal.component.html',
  styleUrl: './view-review-modal.component.scss'
})
export class ViewReviewModalComponent implements OnInit {

  @Output() closeModal = new EventEmitter<any>();
  @ViewChild('viewReviewModal') viewReviewModal?: ElementRef;
  @Input() id?: any
  review?: Review
  modelEntities?: any


  modal: any

  constructor(private reviewService: ReviewService) { }


  ngOnInit(): void {
    this.showModal()
    if(this.id){
      this.reviewService.getEntityById(this.id).subscribe(
        (review) =>{
          this.review = review
          this.modelEntities = Object.keys(review)
        }
      )
    }
  }


  showModal(): void {
    this.modal = new (window as any).bootstrap.Modal(document.getElementById('viewReviewModal'), {backdrop: 'static'});
    this.modal.show();
  }


  onCancel(){
    this.closeModal.emit(null);
    this.modal.hide();
  }
}
