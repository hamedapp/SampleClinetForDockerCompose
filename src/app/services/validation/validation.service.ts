import { Injectable } from "@angular/core";
import { ValidationResult } from 'fluent-ts-validator/dist';
import { defer, Observable, of } from "rxjs";
import { Customer } from "src/app/models/customer.model";
import { CustomerValidator } from "./customer-validator-rules";

@Injectable({
    providedIn: 'root'
  })
export class ValidationService{

    validateCustomerSync(customer: Customer): ValidationResult{
        var customerValidator = new CustomerValidator();
        return customerValidator.validate(customer);
    }

    validateCustomerObservable(customer: Customer): Observable<ValidationResult>{
        var customerValidator = new CustomerValidator();
        return of(customerValidator.validate(customer));
    }

    validateCustomerAsync(customer: Customer): Observable<ValidationResult>{
        var customerValidator = new CustomerValidator();
        var prom = customerValidator.validateAsync(customer);
        const observable = defer(() => prom);

        return observable;
    }
}

