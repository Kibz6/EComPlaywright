import { customTest } from "../utils/test-base";
import { expect } from "@playwright/test";


customTest("Product Name Validation", async({poManager, testData})=>{

    await poManager.getProductCataloguePage().viewProduct(testData.product)
    expect (await poManager.getProductPage().getProductName(testData.product)).toBe(testData.product)

})

customTest("Add To Cart Validation", async({poManager, testData})=>{

    const productPage = poManager.getProductPage()

    await poManager.getProductCataloguePage().goToProductPage(testData.productId)
    await productPage.addToCart(testData.product);
    await productPage.expectToastMsg("Product Added To Cart")
    await productPage.goToCart();
    expect (await poManager.getCartPage().getProductNames()).toContain(testData.product)
    
})

customTest("Continue Shopping Validation", async({poManager, testData, page})=>{

    const productPage = poManager.getProductPage()

    await poManager.getProductCataloguePage().goToProductPage(testData.productId)
    await poManager.getProductPage().continueShopping();
    expect (page.url()).toBe("https://rahulshettyacademy.com/client/#/dashboard/dash")
    
})