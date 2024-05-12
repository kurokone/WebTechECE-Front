import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "app-routing.module"
import { AppComponent } from "app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { MatListModule } from "@angular/material/list"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { HttpClientModule } from "@angular/common/http"
import { HomeComponent } from "components/home/home.component"
import { NavbarComponent } from "components/navbar/navbar.component"
import { SigninComponent } from "components/signin/signin.component"
import { SignupComponent } from "components/signup/signup.component"
import { FooterComponent } from "components/footer/footer.component"
import { AdminComponent } from "pages/admin/admin.component"
import { PaginationComponent } from "components/pagination/pagination.component"
import { ColumnPipe } from "pipes/column.pipe"
import { AddEditFormComponent } from "components/add-edit-form/add-edit-form.component"
import { DisplayValuePipe } from "pipes/display-value.pipe"
import { ConfirmModalComponent } from "components/confirm-modal/confirm-modal.component"
import { GetLinkPipe } from "pipes/get-link.pipe"
import { EntityListComponent } from "components/entity-list/entity-list.component"
import { ReviewBoxComponent } from "components/review-box/review-box.component"
import { ReviewListComponent } from "components/review-list/review-list.component"
import { ViewModalComponent } from "components/view-modal/view-modal.component"
import { EntityItemComponent } from "components/entity-item/entity-item.component"
import { ViewReviewModalComponent } from "components/view-review-modal/view-review-modal.component"
import { LoaderComponent } from "components/loader/loader.component"
import { DisplayEntityComponent } from "components/display-entity/display-entity.component"
import { ReviewItemComponent } from "components/review-item/review-item.component"
import { AppNotificationComponent } from "components/app-notification/app-notification.component"
import { AddReviewComponent } from "components/add-review/add-review.component"
import { ReviewStatsComponent } from "components/review-stats/review-stats.component"


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    FooterComponent,
    AdminComponent,
    PaginationComponent,
    AddEditFormComponent,
    ConfirmModalComponent,
    EntityListComponent,
    ReviewBoxComponent,
    ReviewListComponent,
    ViewModalComponent,
    EntityItemComponent,
    ViewReviewModalComponent,
    LoaderComponent,
    DisplayEntityComponent,
    ReviewItemComponent,
    AppNotificationComponent,
    AddReviewComponent,
    ReviewStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ColumnPipe,
    DisplayValuePipe,
    GetLinkPipe

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
