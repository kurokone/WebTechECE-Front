import { Component, OnInit } from "@angular/core"
import { Movie } from "models/movie.model"
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from "services/movie.service";
import { PlaceService } from "services/place.service";
import { Place } from "models/place.model";


@Component({
  selector: "entity-list",
  templateUrl: "./entity-list.component.html",
  styleUrls: ["./entity-list.component.scss"],
})
export class EntityListComponent implements OnInit {


  entityName: string = 'entities'
  entityId?: string
  entities: any[] = []
  reviews: any[] = []
  currentPage: number = 1;
  reviewsPerPage: number = 8;
  filteredEntities: Movie[] = []; // Liste filtrée d'avis
  searchTerm: string = ''; // Terme de recherche
  isLoading: boolean = true
  currentData: any
  title?: string
  currentReviews?: any[]


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private entitieService: MovieService,
    private placeService: PlaceService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      this.currentPage = params['page'] ? +params['page'] : 1;
    });
    this.route.params.subscribe(async params => {
      this.entityName = params['model'] || 'movies';
      this.entityId = params['id'];

      // Charger les données de l'entité à partir de la base de données locale

      if(this.entityName === 'movies'){
        this.entitieService.getAllEntities().subscribe(
          (movies: Movie[])=>{
            this.isLoading = false
            this.entities = movies
          }
        )
      }else if(this.entityName === 'places'){
        this.placeService.getAllEntities().subscribe(
          (places: Place[])=>{
            this.isLoading = false
            this.entities = places
          }
        )
      }




    });

  }


  previousPage() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.changePage(this.currentPage + 1);
    }
  }

  changePage(page: number) {
    this.router.navigate([], { relativeTo: this.route, queryParams: { page: page } });
  }

  getPages(): number[] {
    const totalPages = this.totalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  totalPages(): number {
    return Math.ceil(this.entities.length / this.reviewsPerPage);
  }



  getEntitiesForPage(): any[] {
    const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
    if (this.searchTerm.toLowerCase()) {
      return this.filteredEntities.slice(startIndex, startIndex + this.reviewsPerPage);
    }
    return this.entities.slice(startIndex, startIndex + this.reviewsPerPage);
  }

  filterEntities() {

    this.filteredEntities = this.entities.filter(entity =>
      entity?.title?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async displayReview(entitie: Movie){
    this.currentData = entitie
    this.title = "Avis pour le entity : "+entitie.title
    
  }


}
