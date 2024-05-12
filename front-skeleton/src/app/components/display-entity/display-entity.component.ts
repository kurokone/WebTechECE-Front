import { Component, Input } from '@angular/core';
import { AuthService } from 'guard/auth.service';
import { Movie } from 'models/movie.model';
import { Place } from 'models/place.model';
import { Review } from 'models/review.model';
import { ReviewService } from 'services/review.service';

@Component({
  selector: 'display-entity',
  templateUrl: './display-entity.component.html',
  styleUrl: './display-entity.component.scss'
})
export class DisplayEntityComponent {
  @Input() entity?: any
  @Input() type?: 'place' | 'movie'
  addEditReview: boolean = false
  viewReview: boolean = false
  reviewData: any
  canAddReview: boolean = true


  constructor(private reviewService: ReviewService, private authService: AuthService) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.type && this.entity) {
      this.reviewService.getReviewByEntity(this.type, this.entity.id).subscribe(
        (reviewData) => {
          this.reviewData = reviewData

          this.setCanAddReview()
        }
      )
    }

  }

  addReview() {
    this.addEditReview = true
    this.viewReview = false
  }
  setCanAddReview(){
    const user = this.authService.getCurrentUser()
    if(user && user.email){
      this.reviewData.datas.forEach((review: Review) => {
        if(review.user.email === user.email){
          this.canAddReview = false
        }
      });

    }
  }

  displayReview() {
    this.addEditReview = false
    this.viewReview = true

  }

  closeModal(data?: any) {
    this.addEditReview = false
    this.viewReview = false
  }

}
