import { SignInComponent } from './pages/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { ViewAllAccountsComponent } from './pages/dashboard/accounts/view/view-all-accounts/view-all-accounts.component';
import { ViewAllShipmentsComponent } from './pages/dashboard/shipments/view/view-all-shipments/view-all-shipments.component';
import { ViewShipmentDetailsComponent } from './pages/dashboard/detailled-shipment/view/view-shipment-details/view-shipment-details.component';
import { adminGuard } from './shared/gaurds/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'order-details', component: OrderDetailsComponent },
  { path: 'accounts', component: ViewAllAccountsComponent, canActivate: [adminGuard] },
  { path: 'shipments', component: ViewAllShipmentsComponent, canActivate: [adminGuard] },
  { path: 'shipment-details', component: ViewShipmentDetailsComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
