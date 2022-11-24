import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  customer: Customer = {
  };

  submitted = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  saveCustomer(): void {
    var data: Customer = {
      firstName: this.customer.firstName,
      lastName: this.customer.lastName,
      city: "City",
      email: "Email@sd.dd",
      mobile: "989013039975",
      postalCode: "12324"
    };

    this.customerService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.customer.firstName = "";
          this.customer.lastName = "",

          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newCustomer(): void {
    this.submitted = false;
    this.customer = {
      firstName: "",
      lastName: "",
      city: "City",
      email: "Email@sd.dd",
      mobile: "989013039975",
      postalCode: "12324"
    };
  }

}
