import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router";
import { ReviewService } from "services/review.service";


@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  popularAllReviews: any[] = [];
  popularReviews: any[] = [];
  readMore: boolean = false
  isLoading: boolean = true
  currentReviewId?: string
  currentPage: number = 1
  itemsPerPage: number = 6

  stats: boolean = false

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.loadPopularReviews();
    this.route.queryParams.subscribe(async (params) => {
      let total = localStorage.getItem('total')
      this.currentPage = params['page'] ? +params['page'] : 1;
      this.itemsPerPage = params['total'] ? +params['total'] : total ? parseInt(total) : 6;
      this.getPagedEntityData()
    });
  }

  async loadPopularReviews() {
    this.reviewService.getAllEntities().subscribe(
      (reviews) => {
        this.popularAllReviews = reviews
        this.getPagedEntityData()
        this.isLoading = false
      },
      (error) => {
        this.isLoading = false
        console.error(error);
      }
    );

  }

  getPagedEntityData(){
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.popularReviews =  this.popularAllReviews?.slice(startIndex, endIndex) || [];
  }

  setFilterValue(value: number){
    if(value === 6){
      this.popularReviews = this.popularAllReviews
      return
    }
    this.popularReviews = this.popularAllReviews.filter(d => d.rating === value)
    console.log(this.popularReviews);

  }
  setFilterType(type: string){
    if(type === "all"){
      this.popularReviews = this.popularAllReviews
      return
    }
    this.popularReviews = this.popularAllReviews.filter(d => d.entityType === type)

  }

  setReadMore(id: string){
    this.readMore = true
    this.currentReviewId = id
  }

  closeModal(){
    this.readMore = false
    this.currentReviewId = undefined
  }

  setStats(){
    this.stats = ! this.stats
  }

}
