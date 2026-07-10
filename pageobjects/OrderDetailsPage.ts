import {test, expect, Locator, Page} from "@playwright/test"

export class OrderDetailsPage{

    page: Page;
    orderId: Locator;
    billingAddress: Locator;
    deliveryAddress: Locator;
    productInfo: Locator;
    viewOrders: Locator;

constructor(page:Page){

    this.page = page;
    this.orderId = page.locator(".col-text.-main")
    this.billingAddress = page.locator("//div[normalize-space()='Billing Address']/following-sibling::p")
    this.deliveryAddress = page.locator("//div[normalize-space()='Delivery Address']/following-sibling::p")
    this.productInfo = page.locator(".artwork-card-info")
    this.viewOrders = page.getByText('View Orders')

}

async getOrderId()
{
    await this.orderId.waitFor({state:"visible"})
    return await this.orderId.textContent()
}

async getBillingAddress()
{
    await this.billingAddress.first().waitFor({state:"visible"})
    return ((await this.billingAddress.allTextContents()).join(" "));
}

async getDeliveryAddress()
{
    await this.deliveryAddress.first().waitFor({state:"visible"})
    return ((await this.deliveryAddress.allTextContents()).join(" "));
}

async getProductInfo()
{
    await this.productInfo.first().waitFor({state:"visible"})
    return ((await this.productInfo.allTextContents()).join(" "));
}

async clickViewOrders()
{
    await this.viewOrders.click()
}










}