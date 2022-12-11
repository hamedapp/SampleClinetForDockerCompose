import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationResult } from 'fluent-ts-validator';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/api/customer.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    postalCode: new FormControl(''),
    city: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
  });

  customer: Customer = {};
  validationService: ValidationService;

  submitted = false;
  ErrorList: string[] = [];

  constructor(private customerService: CustomerService, validationService: ValidationService) {
    this.validationService = validationService;
  }

  ngOnInit(): void {
  }

  saveCustomer(): void {

    let customer: Customer = {
      firstName: this.profileForm.controls['firstName'].value,
      lastName: this.profileForm.controls['lastName'].value,
      city: this.profileForm.controls['city'].value,
      email: this.profileForm.controls['email'].value,
      mobile: this.profileForm.controls['mobile'].value,
      postalCode: this.profileForm.controls['postalCode'].value,
    };

    var validationResult = this.validationService.validateCustomerSync(customer);

    var isValid = validationResult.isValid();

    this.ErrorList = [];

    if (isValid) {
      this.customerService.create(customer)
        .subscribe({
          next: (res) => {
            this.profileForm.reset()
          },
          error: (e) =>{
            this.ErrorList.push(e.message)
            console.error(e)
          } 
        });
    }
    else {
      validationResult.getFailures().forEach(x => {
        this.ErrorList.push(x.message ?? '')
      })

    }

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

  ngOnDestroy() {

  }
}


