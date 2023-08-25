import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navigation/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubmitCaseFormComponent } from './cases/submit-case-form/submit-case-form.component';
import { AdminComponent } from './admin/admin/admin.component';
import { FilterCasesPipe } from './filter-cases.pipe';
import { DialogStudentsComponent } from './admin/dialog-students/dialog-students.component';
import { DialogSpecialtyComponent } from './admin/dialog-specialty/dialog-specialty.component';

//Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DetailsComponent } from './cases/details/details.component';
import { FiterUsersPipe } from './fiter-users.pipe';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MyCasesComponent } from './my-cases/my-cases.component';
import { ChartCasesComponent } from './admin/chart-cases/chart-cases.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ChartCasesSpecComponent } from './admin/chart-cases-spec/chart-cases-spec.component';
import { ChartUsersComponent } from './admin/chart-users/chart-users.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    HomeComponent,
    NavbarComponent,
    SubmitCaseFormComponent,
    AdminComponent,
    FilterCasesPipe,
    FilterCasesPipe,
    DetailsComponent,
    FiterUsersPipe,
    DialogStudentsComponent,
    DialogSpecialtyComponent,
    MyCasesComponent,
    ChartCasesComponent,
    ChartCasesSpecComponent,
    ChartUsersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,

    //Angular Material Modules
    MatButtonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatBadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


