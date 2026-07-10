import {Page, Locator, expect} from "@playwright/test"


export class AbstractComponents{

    page : Page;
    toastMsg: Locator;
    orders: Locator;
    cart: Locator
    spinner: Locator;
    signOutBtn: Locator;




    constructor(page:Page){

        this.page = page;
        this.toastMsg = page.locator("//div[@aria-label]");
        this.orders = page.locator("//button[@routerlink='/dashboard/myorders']");
        this.cart = page.locator("//li//button[@routerlink='/dashboard/cart']");
        this.spinner = page.locator(".ngx-spinner-overlay")
        this.signOutBtn = page.locator(".fa-sign-out")


    }


    async expectToastMsg(message:string)
    {
        await expect(this.toastMsg).toContainText(message,{timeout:1000})
    }

    async waitForSpinner()
    {
        try {
        await this.spinner.waitFor({state:"visible", timeout: 2000})
        await this.spinner.waitFor({state:"hidden", timeout: 10000})
        } catch {
            //spinner didnt appear
        }
    }


    async waitForDomLoad()
    {
        await this.page.waitForLoadState("domcontentloaded");
    }

    async clickOrders()
    {
        await this.orders.click({force: true})
        await this.waitForDomLoad();
    }

    async clickCart()
    {
        await this.cart.click({force: true})
        await this.waitForDomLoad();
    }


    async signOut()
    {
        await this.signOutBtn.dispatchEvent("click")
    }

    async goToOrders()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders")
        await this.waitForDomLoad();
    }

    async goToCart()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/dashboard/cart")
        await this.waitForDomLoad();
    }

    async goToConfirmationPage(orderId:string)
    {
        await this.page.goto(`https://rahulshettyacademy.com/client/#/dashboard/thanks?prop=%5B"${orderId}"%5D`)
        await this.waitForDomLoad();
    }

    async goToOrderDetails(orderId:string)
    {
        await this.page.goto(`https://rahulshettyacademy.com/client/#/dashboard/order-details/${orderId}`)
        await this.waitForDomLoad();
    }

    async goToProductPage(productId:string)
    {
        await this.page.goto(`https://rahulshettyacademy.com/client/#/dashboard/product-details/${productId}`)
        await this.waitForDomLoad();
    }


}
  
