import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutusComponent } from './FrontComponents/aboutus/aboutus.component';
import { FormComponent } from './form/form.component';
import { BoardAdminComponent } from './boards/board-admin/board-admin.component';
import { HomeComponent } from './home/home.component';
import { HeroComponent } from './FrontComponents/hero/hero.component';
import { ProfileComponent } from './FrontComponents/profile/profile.component';
import { BoardCandidatComponent } from './boards/board-candidat/board-candidat.component';
import { DynamicformComponent } from './dynamicform/dynamicform.component';
import { TestComponent } from './test/test.component';
import { OffresDisponibleComponent } from './offres-disponible/offres-disponible.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { AddUniversityComponent } from './CreateForms/add-university/add-university.component';
import { SidePageAdminComponent } from './FrontComponents/side-page-admin/side-page-admin.component';
import { AddFormComponent } from './CreateForms/add-form/add-form.component';
import { FormfieldsComponent } from './CreateForms/formfields/formfields.component';
import { RegisterComponent } from './register/register.component';
import { FormFieldManagerComponent } from './form-field-manager/form-field-manager.component';
import { FormListComponent } from './form-list/form-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'form', component: FormComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'admin', component:BoardAdminComponent},
  {path:'home', component:HomeComponent},
  {path:'hero',component:HeroComponent},
  {path:'user', component:BoardCandidatComponent},
  {path: 'dynamicform/:formId', component:DynamicformComponent},
  {path:'test', component:TestComponent},
  {path: 'offres', component:OffresDisponibleComponent},
  { path: 'form-details/:formName', component: FormDetailsComponent }, 
  {path: 'addUni', component: AddUniversityComponent},
  {path : 'sideadmin', component:SidePageAdminComponent},
  {path: 'addForm', component:AddFormComponent},
  {path :'addFormField', component: FormfieldsComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'form-field-manager', component: FormFieldManagerComponent },
  { path: 'form-list', component: FormListComponent },



  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
