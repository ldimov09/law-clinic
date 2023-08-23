import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { SubmitCaseFormComponent } from './cases/submit-case-form/submit-case-form.component';
import { AdminComponent } from './admin/admin/admin.component';
import { DetailsComponent } from './cases/details/details.component';
import { MyCasesComponent } from './my-cases/my-cases.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'register',
		component: RegisterFormComponent,
	},
	{
		path: 'login',
		component: LoginFormComponent,
	},
	{
		path: 'submit-case',
		component: SubmitCaseFormComponent,
	},
	{
		path: 'admin',
		component: AdminComponent,
	},
	{
		path: 'my-cases',
		component: MyCasesComponent,
	},
	{
		path: 'details/:id',
		component: DetailsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {


}
