import {test, expect, Locator, Page} from "@playwright/test"
import { AbstractComponents } from "../components/AbstractComponents";
export class CartPage extends AbstractComponents {

    page: Page;
    products: Locator;
    emptyCart: Locator;
    continueShoppingBtn: Locator;
    subTotal: Locator;
    checkout: Locator;
    prodCode: Locator;

constructor(page:Page){

    super(page);
    this.page = page;
    this.products = page.locator(".items");
    this.emptyCart = page.getByText("No Products in Your Cart !");
    this.continueShoppingBtn = page.locator("//button[normalize-space()='Continue Shopping']")
    this.subTotal = page.locator("//span[text()='Subtotal']/following-sibling::span");
    this.checkout = page.locator("//button[normalize-space()='Checkout']");
    this.prodCode = page.locator(".itemNumber");

}





 async getProductNames(): Promise<string[] | null> {

    await this.waitForDomLoad();
    try{
        await expect(this.products.first()).toBeVisible({timeout:10000});
        return await this.products.locator("h3").allTextContents();
    } catch {
        return null;
    }
 }




async getEmptyCartMsg(): Promise<string> {
        return (await this.emptyCart.textContent()) ?? "";
    }

async continueShopping()
{
   await this.waitForDomLoad();
   await this.continueShoppingBtn.dispatchEvent("click")
}

async removeItem(productName:string){
    
    const prod =  this.products.filter({hasText:productName});
    await prod.locator(".btn.btn-danger").click({force:true})
    await prod.waitFor({state:"hidden"});
}


async getCartItemsSum()
{
    await expect(this.products.first()).toBeVisible({timeout:10000});
    const prices = await this.products.locator(".prodTotal").allTextContents();
    const total = prices.map(p=>parseFloat(p.replace("$","").trim()))
            .reduce((a,b) => a+b,0)
    return total
}

async getCartSubTotal()
{
    const sub = await this.subTotal.textContent();
    return parseFloat(sub!.replace("$","").trim())
}

async clickCheckout()
{
    await this.checkout.waitFor({state:"visible"});
    await this.checkout.click();
}
async goToCheckout()
{
    await this.page.goto("https://rahulshettyacademy.com/client/#/dashboard/order?prop=%5B%226960eac0c941646b7a8b3e68%22%5D")
}

async getProductCode()
{
    await this.prodCode.waitFor({state:"visible"})
    return (await this.prodCode.textContent())!.replace("#","").trim();
}
}