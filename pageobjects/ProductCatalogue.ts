import {test, expect, Locator, Page} from "@playwright/test"
import { AbstractComponents } from "../components/AbstractComponents";

export class ProductCatalogue extends AbstractComponents{

    page: Page;
    searchBar : Locator;
    products : Locator;
    addToCart: Locator;
    cartNumber: Locator;
    brand: Locator;

constructor(page:Page){

    super(page)
    this.page = page;
    this.searchBar = page.locator("div[class='py-2 border-bottom ml-3'] input[placeholder='search']");
    this.products = page.locator(".mb-3");
    this.addToCart = page.locator(".btn.w-10.rounded")
    this.cartNumber = page.locator("//button//label");
    this.brand = page.locator("//div//h3")

}


async searchProduct(productName:string)
{
    await Promise.all([
        this.page.waitForResponse(resp=>
            resp.url().includes("get-all-products") && resp.status() === 200
        ),
        this.searchBar.fill(productName),
        this.searchBar.press('Enter'),
        
    ]);}



getProduct(productName:string)
{
    return this.products.filter({hasText:productName})
}


async getProductName(productName:string)
{
    return await this.getProduct(productName).locator("//h5").textContent();
}

async addProductToCart(productName:string)
{
    const prod = this.getProduct(productName);

    await prod.locator(this.addToCart).waitFor({state:"visible"})
    await prod.locator(this.addToCart).click({force: true})
    await this.waitForSpinner()
    
    
}

async getCartNumber()
{
   const text = await this.cartNumber.textContent();
   return parseInt(text!) || 0;
}

async addAllProductsToCart(){

    const count = await this.products.count();
    for(let i = 0; i < count; i++)
    {
        await this.waitForSpinner();
        await this.products.nth(i).locator(this.addToCart).click({force:true})
        await expect.poll(()=> this.getCartNumber(), {timeout:20000,intervals:[500,1000,2000]}).toBeGreaterThan(i);
        
    }
    await this.waitForDomLoad();
    return count;
}
      
async getBrandName()
{
   return await this.brand.textContent();
}

async viewProduct(productName:string)
{
    await this.getProduct(productName).locator(".btn.w-40.rounded").click();
}

}