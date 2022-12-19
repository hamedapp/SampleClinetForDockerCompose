import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/api/customer.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit, OnDestroy, AfterViewInit {

  customers: Customer[] = [];
  columns = [
    { columnDef: 'firstName', header: 'Fisrt Name' },
    { columnDef: 'lastName', header: 'Last Name' },
    { columnDef: 'city', header: 'City' },
  ]

  currentTutorial: Customer = {};
  title = '';
  customerServiceSub: Subscription = new Subscription;
  isDataLoaded: boolean = false;

  private router: Router;

  constructor(private customerService: CustomerService, r: Router) {
    this.router = r;
  }
  ngAfterViewInit(): void {
    // this.retrieveCustomers();
    // console.log(this.customers)
  }

  ngOnDestroy(): void {
    this.customerServiceSub.unsubscribe;
  }

  ngOnInit(): void {
    this.retrieveCustomers();
  }

  retrieveCustomers(): void {
    this.customerServiceSub = this.customerService.getAll()
      .subscribe({
        next: (data) => {
          this.customers = data;
          this.isDataLoaded = true;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveCustomers();
  }

  remove(id: number): void {
    this.customerServiceSub = this.customerService.delete(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
  add() {
    this.router.navigate(['/add']);
  }

  update(id: number) {
    this.router.navigate(['/add'], { queryParams: { id: id } });
  }

  onTableAction(event: any) {
    if (event.name == "delete") {
      this.remove(event.value.id);
      this.refreshList();
    }
    if (event.name == "edit") {
      this.update(event.value.id);
    }
  }
}
