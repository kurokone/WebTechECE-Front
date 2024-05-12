import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { EntityItemComponent } from "components/entity-item/entity-item.component"
import { EntityListComponent } from "components/entity-list/entity-list.component"
import { ErrorPageComponent } from "components/error-page/error-page.component"
import { HomeComponent } from "components/home/home.component"
import { AboutComponent } from "pages/about/about.component"
import { AdminComponent } from "pages/admin/admin.component"
import { ContactComponent } from "pages/contact/contact.component"

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "entity/:model", component: EntityListComponent },
  { path: "entity/:model/:id", component: EntityItemComponent },
  { path: "about", component: AboutComponent },
  { path: "admin", component: AdminComponent },
  { path: "admin/:entityName", component: AdminComponent },
  { path: "admin/:entityName/:entityId", component: AdminComponent },
  { path: "contact", component: ContactComponent },
  { path: "error-page", component: ErrorPageComponent },
  { path: "**", component: ErrorPageComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
