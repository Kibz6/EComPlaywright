import { POManager } from "../pageobjects/POManager";
import { customTest } from "../utils/test-base";
import { expect } from "@playwright/test";








customTest("Empty Cart Validation", async ({ poManager }) => {


    const cartPage = poManager.getCartPage();

    await poManager.getProductCataloguePage().goToCart()
    await cartPage.expectToastMsg(" No Product in Your Cart ")
    expect(await cartPage.getEmptyCartMsg()).toContain("No Products in Your Cart !");
})

customTest("Continue Shopping Validation", async ({ poManager, page }) => {

    const cartPage = poManager.getCartPage();

    await poManager.getProductCataloguePage().goToCart();
    await cartPage.continueShopping();
    expect(page.url()).toBe("https://rahulshettyacademy.com/client/#/dashboard/dash");
})

customTest("Remove Item From Cart Validation", async ({ poManager, testData,}) => {

    const productCatalogue = poManager.getProductCataloguePage();
    const cartPage = poManager.getCartPage();

    await productCatalogue.addAllProductsToCart();
    await productCatalogue.goToCart();
    await cartPage.removeItem(testData.product);
    expect(await cartPage.getProductNames()).not.toContain(testData.product);
})

customTest("Cart SubTotal Validation", async ({ poManager }) => {

    const productCatalogue = poManager.getProductCataloguePage();
    const cartPage = poManager.getCartPage();

    await productCatalogue.addAllProductsToCart();
    await productCatalogue.goToCart();
    const sum = await cartPage.getCartItemsSum();
    const sub = await cartPage.getCartSubTotal();
    expect(sub).toEqual(sum)
})

customTest("Cart Subtotal Deduction", async ({ poManager, testData }) => {

    customTest.fail();

    const productCatalogue = poManager.getProductCataloguePage();
    const cartPage = poManager.getCartPage();

    await productCatalogue.addAllProductsToCart();
    await productCatalogue.goToCart();
    await cartPage.removeItem(testData.product);
    const sum = await cartPage.getCartItemsSum();
    const sub = await cartPage.getCartSubTotal();
    expect(sub).toEqual(sum);

    //Test should fail cause removing an item from the cart is actually adding instead of subtracting from the subtotal    
})

customTest("Cart Session Validation", async ({ poManager, testData, testAccount, page }) => {

    customTest.fail();

    const productCatalogue = poManager.getProductCataloguePage();
    const cartPage = poManager.getCartPage();
    const loginPage = poManager.getLoginPage();

    await productCatalogue.addProductToCart(testData.product);
    await productCatalogue.goToCart();
    const before = await cartPage.getProductNames();
    await cartPage.signOut();
    await loginPage.loginApp(testAccount.username, testAccount.password);
    await productCatalogue.goToCart();
    const after = await cartPage.getProductNames();
    expect(after).toEqual(before);

    //Test should fail cause the cart session doesn't get saved after sign out.

})

customTest("Cart Page Refresh Validation", async({apiUtils, userId, poManager,testData,token, page})=>{


    const productCatalogue = poManager.getProductCataloguePage();
    const cartPage = poManager.getCartPage();
    

    await apiUtils.addProductToCartApi(userId,testData.productId,token);
    await productCatalogue.goToCart();
    const before = await cartPage.getProductNames();
    await page.reload();
    const after = await cartPage.getProductNames();
    expect(after).toEqual(before);

})

customTest("Checkout Button Validation", async({apiUtils, userId, poManager, testData, token, page})=>{

    const cartPage = poManager.getCartPage();
    const productCatalogue = poManager.getProductCataloguePage();

    await apiUtils.addProductToCartApi(userId,testData.productId,token);
    await productCatalogue.goToCart();
    await cartPage.clickCheckout();
    expect (page.url()).toContain("https://rahulshettyacademy.com/client/#/dashboard/order")
})

customTest("Product Code Validation", async ({apiUtils, userId, poManager, testData, token, page})=>
{
    const productCatalogue = poManager.getProductCataloguePage();
    const cartPage = poManager.getCartPage();

    await apiUtils.addProductToCartApi(userId,testData.productId,token);
    await productCatalogue.goToCart();
    const code = await cartPage.getProductCode();
    await cartPage.goToCheckout();
    expect (page.url()).toContain(code);
})



