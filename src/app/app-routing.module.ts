import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { SubmitCaseFormComponent } from './cases/submit-case-form/submit-case-form.component';
import { AdminComponent } from './admin/admin/admin.component';

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
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {


}
