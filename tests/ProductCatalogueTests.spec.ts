import { expect } from "@playwright/test";
import { customTest } from "../utils/test-base";






customTest("Search Bar Validation", async ({ poManager, testData }) => {


    const productCatalogue = poManager.getProductCataloguePage();

    await productCatalogue.searchProduct(testData.product);
    const prod = await productCatalogue.getProductName(testData.product);
    expect(prod).toBe(testData.product);
})

customTest("Orders Button Validation", async ({ poManager, page }) => {

    await poManager.getProductCataloguePage().clickOrders();
    expect(page.url()).toBe("https://rahulshettyacademy.com/client/#/dashboard/myorders")
})

customTest("Cart Button Validation", async ({ poManager, page }) => {

    await poManager.getProductCataloguePage().goToCart();
    expect(page.url()).toBe("https://rahulshettyacademy.com/client/#/dashboard/cart");

})

customTest("Add to Cart Validation", async ({poManager,testData}) => {

const productCatalogue = poManager.getProductCataloguePage();
const cartPage = poManager.getCartPage();
await productCatalogue.addProductToCart(testData.product);
await productCatalogue.expectToastMsg(" Product Added To Cart ");
await productCatalogue.goToCart();
expect (await cartPage.getProductNames()).toContain(testData.product);
})


customTest("Cart Number Validation", async({poManager})=>{

    const productCatalogue = poManager.getProductCataloguePage();

    const prodN = await productCatalogue.addAllProductsToCart();
    const cartN = await productCatalogue.getCartNumber();
    expect (prodN).toEqual(cartN)
})

customTest("Brand Name Validation", async({poManager})=>{

    const name = await poManager.getProductCataloguePage().getBrandName();
    expect (name).toBe("Automation")
})

