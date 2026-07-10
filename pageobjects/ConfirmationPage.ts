import {test, expect, Locator, Page} from "@playwright/test"

export class ConfirmationPage{

    page: Page;
    productName: Locator;
    orderHistory: Locator;

constructor(page:Page){

    this.page = page;
    this.productName = page.locator('td.line-item.product-info-column.m-3').locator('div').nth(0)
    this.orderHistory = page.getByText(" Orders History Page ")

}


async getProductName()
{
    return await this.productName.textContent();
}

async clickOrderHistory()
{
    await this.orderHistory.click();
}







}