import { Component } from "@angular/core"
import { Link } from "models/links.model"
import { MovieService } from "services/movie.service"

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  entities: Link[] = [

    {
      name: "Films",
      href: 'movies',
      icon: 'film'
    },
    {
      name: "Places",
      href: 'places',
      icon: 'location-dot'
    },
  ]
  pages: Link[] = [
    {
      name: "Accueil",
      href: '',
      icon: 'house'
    },
    {
      name: "A props",
      href: 'about',
      icon: 'about'
    },

  ]

  constructor(private movieService: MovieService) {

    this.getData()
  }

  getData() {

  }



}
