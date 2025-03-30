import { SignInComponent } from './pages/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },
  { path: 'home', component: HomeComponent },
  { path: 'order-details', component: OrderDetailsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
