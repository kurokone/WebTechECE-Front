import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'services/movie.service';
import { PlaceService } from 'services/place.service';
import { UserService } from 'services/user.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  entityName: string = "";
  entityId?: string;
  entityData: any[] = [];
  entityAllData: any[] = [];
  modelEntities: any[] = [];
  tableHeader: string[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  selectedColumns: { [key: string]: string[] } = {};
  addData: boolean = false;
  updateData: boolean = false;
  deleteData: boolean = false;
  viewData: boolean = false;
  isLoading: boolean = true;
  searchTerm: string = '';
  currentData?: any
  // showColumnSelection: boolean = false;

  constructor(private route: ActivatedRoute,
    private movieService: MovieService,
    private placeService: PlaceService,
    private router: Router,
    private userService: UserService,
  ) { }

  async ngOnInit(): Promise<void> {
    let total = localStorage.getItem('total')

    this.route.queryParams.subscribe(async (params) => {
      this.currentPage = params['page'] ? +params['page'] : 1;
      this.itemsPerPage = params['total'] ? +params['total'] : total ? parseInt(total) : 5;
    });
    // Obtenir les paramètres de l'URL
    this.route.params.subscribe(async params => {
      this.isLoading = false
      this.entityName = params['entityName'] || 'movies';
      this.entityId = params['entityId'];
      // Charger les données de l'entité à partir de l'api'
      await this.getData()
      this.isLoading = false
    });
  }
  async getData() {
    // Charger les données de l'entité à partir de la base de données locale
    let service: any

    if (this.entityName === 'movies') {
      service = this.movieService
    } else if (this.entityName === 'places') {
      service = this.placeService
    } else if (this.entityName === 'users') {
      service = this.userService
    }

    service.getAllEntities().subscribe(
      (datas: any[]) => {

        this.entityAllData = datas
        this.entityData = datas
        this.modelEntities = Object.keys(this.entityData[0]);
        this.getPagedEntityData()

        if (this.entityData?.length) {
          // Charger les colonnes sélectionnées à partir du localStorage ou afficher les 2 premières colonnes par défaut
          const storedColumnsString = localStorage.getItem(this.entityName!);
          const storedColumns = storedColumnsString ? JSON.parse(storedColumnsString) : Object.keys(this.entityData[0]).slice(0, 2);
          this.selectedColumns[this.entityName!] = storedColumns;
          console.log({ storedColumns });

          this.updateTableHeader();
        }


      },
      (error: any) => {
        console.error("Une erreur s'est produite lors de la récupération des données :", error);

      }
    );
  }

  updateTableHeader(): void {
    this.tableHeader = this.selectedColumns[this.entityName!];
    localStorage.setItem(this.entityName!, JSON.stringify(this.tableHeader));
  }

  showColumnSelectionCard(event: any, column: any): void {
    const { checked } = event.target;


    if (checked) {
      if (!this.tableHeader?.includes(column)) {
        const index = this.modelEntities.indexOf(column);
        if (index !== -1) {
          this.tableHeader?.splice(index, 0, column);
        }
      }
    } else {
      const index = this.tableHeader?.indexOf(column);
      if (index !== -1) {
        this.tableHeader?.splice(index, 1);
        this.selectedColumns[this.entityName!] = this.tableHeader;
      }
    }
    this.updateTableHeader();
  }


  toggleColumn(column: string): void {
    const index = this.selectedColumns[this.entityName!].indexOf(column);
    if (index === -1) {
      // Ajouter la colonne si elle n'est pas déjà sélectionnée
      this.selectedColumns[this.entityName!].push(column);
    } else {
      // Retirer la colonne si elle est déjà sélectionnée
      this.selectedColumns[this.entityName!].splice(index, 1);
    }
    // Mettre à jour les colonnes sélectionnées dans le localStorage

    this.updateTableHeader();
  }

  isChecked(column: any) {
    return this.tableHeader.includes(column)
  }


  getPagedEntityData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.entityData = this.entityAllData?.slice(startIndex, endIndex) || [];
  }

  onPageChange(page: number): void {
    this.router.navigate([], { relativeTo: this.route, queryParams: { page: page } });
  }

  viewItem(item: any): void {
    // Implémentez ici la logique pour afficher les détails de l'élément
    this.addData = false
    this.updateData = false
    this.deleteData = false
    this.viewData = true
    this.currentData = item
    console.log("Vue de l'élément : ", item);
  }

  addItem(): void {
    this.addData = true
    this.updateData = false
    this.deleteData = false
    this.currentData = undefined
  }
  editItem(item: any): void {
    this.addData = false
    this.updateData = true
    this.deleteData = false
    this.currentData = item
    console.log("Modification de l'élément : ", item);
  }

  deleteItem(item: any): void {
    // Implémentez ici la logique pour supprimer l'élément
    this.addData = false
    this.updateData = false
    this.currentData = item
    this.deleteData = true
    console.log("Suppression de l'élément : ", item);
  }

  async closeModal(data: any) {
    console.log('closeModal : ', data);
    if (data) {
      if (data.type === 'DELETE') {
        this.entityData = this.entityData.filter((entity) => entity.id !== data.id)
      }
      else if (data.type === 'ADD') {
        this.entityData.unshift(data.entity)
      }
      else if (data.type === 'UPDATE') {
        this.entityData = this.entityData.map((d) => {
          if (d.id == data.entity.id) {
            return data.entity
          }
          return d
        })
      }
    }


    this.addData = false
    this.updateData = false
    this.deleteData = false
    this.currentData = undefined
    this.viewData = false
  }

  filterEntities() {
    this.entityData = this.entityAllData.filter(entity => {
      if (entity?.title) {
        return entity?.title?.toLowerCase().includes(this.searchTerm.toLowerCase())
      }
      if (entity?.firstName) {
        return entity?.firstName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          entity?.lastName?.toLowerCase().includes(this.searchTerm.toLowerCase())
      }
    })
  }

}
