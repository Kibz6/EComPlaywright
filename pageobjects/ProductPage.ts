import {test, expect, Locator, Page} from "@playwright/test"
import { AbstractComponents } from "../components/AbstractComponents";

export class ProductPage extends AbstractComponents{

    page: Page;
    product: Locator;
    productName: Locator
    addToCartBtn: Locator
    continueShoppingBtn: Locator

constructor(page:Page){

    super(page)
    this.page = page;
    this.product = page.locator(".row")
    this.productName = page.locator("//h2")
    this.addToCartBtn = page.getByRole('button', { name: 'Add to Cart' })
    this.continueShoppingBtn = page.getByRole('link', { name: 'Continue Shopping' })

}

async getProductName(productName:string)
{
    await expect(this.product.locator("//h2")).toHaveText(productName)
    return await this.productName.textContent()
}

async addToCart(productName:string)
{
    await expect(this.product.locator("//h2")).toHaveText(productName)
    await this.addToCartBtn.click()
}

async continueShopping()
{
    await this.continueShoppingBtn.waitFor({state:"visible"})
    await this.continueShoppingBtn.click()

}











}