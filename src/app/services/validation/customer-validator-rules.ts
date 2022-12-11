import { AbstractValidator } from "fluent-ts-validator/dist/AbstractValidator";
import { Customer } from "src/app/models/customer.model";

export class CustomerValidator extends AbstractValidator<Customer> {
    constructor() {
        super();

        this.validateIfString(cu => cu.firstName)
            .isAlphanumeric().hasLengthBetween(3, 20)
            .withFailureMessage("first name must be 3 to 20 char.");

        this.validateIfString(cu => cu.lastName)
            .isAlphanumeric().hasLengthBetween(3, 20)
            .withFailureMessage("last name must be 3 to 20 char.");

        this.validateIfString(cu => cu.email)
            .isEmail()
            .withFailureMessage("email is not valid.");

        this.validateIfString(cu => cu.mobile)
            .isMobilePhoneNo("en-US")
            .withFailureMessage("phone number is not valid.");

        this.validateIfString(cu => cu.postalCode)
            .isPostalCode("US")
            .withFailureMessage("postal code is required in valid format.");

        this.validateIfString(cu => cu.city)
            .withFailureMessage("city name is required.");
    }
}