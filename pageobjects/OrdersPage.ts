import {test, expect, Locator, Page} from "@playwright/test"

export class OrdersPage{

    page: Page;
    orderId: Locator;
    products: Locator;
    backToShop: Locator;
    backToCart: Locator;

constructor(page:Page){

    this.page = page;
    this.products = page.locator("//tbody//tr")
    this.orderId = page.locator("(//tbody/tr/th)");
    this.backToShop = page.getByText('Go Back to Shop', { exact: true })
    this.backToCart = page.getByText('Go Back to Cart', { exact: true })

}


async getOrders()
{
    return await this.orderId.allTextContents();
}

async getOrderId()
{
    const row =  this.products.filter({hasText:"ZARA COAT 3"}).first()
    return await row.locator("th").textContent();
}

async clickBackToShop()
{
    await this.backToShop.waitFor({state:"visible"})
    await this.backToShop.click();
}
async clickBackToCart()
{
    await this.backToCart.waitFor({state:"visible"})
    await this.backToCart.click();
}

async viewOrder(orderId:string)
{
    const item =  this.products.filter({hasText:orderId}).first()
    await item.locator("//td/button[@class='btn btn-primary']").click()
}

async deleteItem(orderId:string)
{
    const item =  this.products.filter({hasText:orderId}).first()
    await item.locator("//td/button[@class='btn btn-danger']").click()
    await expect(item).toBeHidden();

}








}