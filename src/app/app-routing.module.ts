import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersListComponent as CustomerListComponent } from './components/customers-list/customers-list.component';
//import { CustomerDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';

const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerListComponent },
  
  { path: 'add', component: AddCustomerComponent },{ path: 'add/:id', component: AddCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
