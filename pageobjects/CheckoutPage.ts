import { test, expect, Locator, Page } from "@playwright/test"
import { AbstractComponents } from "../components/AbstractComponents";
import { count } from "node:console";

export class CheckoutPage extends AbstractComponents{

    page: Page;
    productName: Locator;
    appCoupon: Locator;
    creditCard: Locator;
    country: Locator;
    placeOrderBtn: Locator;
    countryDropdown: Locator;

    constructor(page: Page) {

        super(page);
        this.page = page;
        this.productName = page.locator(".item__title")
        this.appCoupon = page.locator(".btn.btn-primary.mt-1")
        this.creditCard = page.locator("//div[contains(text(),'Credit Card Number')]/following-sibling::input[1]")
        this.country = page.locator("//input[@placeholder='Select Country']")
        this.placeOrderBtn = page.locator(".btnn.action__submit.ng-star-inserted")
        this.countryDropdown = page.locator(".ta-item.list-group-item.ng-star-inserted")


    }


    async getProductName() {

        return (await this.productName.textContent())?.trim()
    }

    async applyCoupon(){

        await this.appCoupon.click();
    }

    async placeOrder(creditCard:string , country:string){

        await this.creditCard.clear();
        if (country?.trim()){
        await this.creditCard.fill(creditCard);
        await this.country.pressSequentially(country);
        const option = this.countryDropdown.filter({hasText:country})
        await expect(option).toBeVisible({timeout:10000})
        await option.click();
        }
        await this.placeOrderBtn.click();

    }







}