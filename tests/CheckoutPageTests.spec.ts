import { customTest } from "../utils/test-base";
import { expect } from "@playwright/test";


customTest("Checkout Product Validation", async ({ apiUtils, userId, testData, token, poManager }) => {

    await apiUtils.addProductToCartApi(userId, testData.productId, token);
    await poManager.getProductCataloguePage().goToCart();
    await poManager.getCartPage().goToCheckout();
    expect(await poManager.getCheckoutPage().getProductName()).toBe(testData.product);
})

customTest("Coupon Validation", async ({ apiUtils, userId, testData, token, poManager }) => {

    const checkoutPage = poManager.getCheckoutPage()

    await apiUtils.addProductToCartApi(userId, testData.productId, token);
    await poManager.getProductCataloguePage().goToCart();
    await poManager.getCartPage().goToCheckout();
    await checkoutPage.applyCoupon();
    await poManager.getCheckoutPage().expectToastMsg("Please Enter Coupon");
})

customTest("Empty Shipping Information Validation", async ({ apiUtils, userId, testData, token, poManager }) => {

    const checkoutPage = poManager.getCheckoutPage();

    await apiUtils.addProductToCartApi(userId, testData.productId, token);
    await poManager.getProductCataloguePage().goToCart();
    await poManager.getCartPage().goToCheckout();
    await checkoutPage.placeOrder("", "");
    await checkoutPage.expectToastMsg("Please Enter Full Shipping Information")

})

customTest("Empty Credit Card Validation", async ({ apiUtils, userId, testData, token, poManager }) => {

    customTest.fail();

    const checkoutPage = poManager.getCheckoutPage();

    await apiUtils.addProductToCartApi(userId, testData.productId, token);
    await poManager.getProductCataloguePage().goToCart();
    await poManager.getCartPage().goToCheckout();
    await checkoutPage.placeOrder("", testData.country);
    await checkoutPage.expectToastMsg("Please Enter Full Shipping Information")

    //Test should fail cause you can order without putting in your credit card info

})

customTest("Place Order Validation", async ({ apiUtils, userId, testData, token, poManager }) => {

    const checkoutPage = poManager.getCheckoutPage();

    await apiUtils.addProductToCartApi(userId, testData.productId, token);
    await poManager.getProductCataloguePage().goToCart();
    await poManager.getCartPage().goToCheckout();
    await checkoutPage.placeOrder(testData.creditCard, testData.country);
    await checkoutPage.expectToastMsg("Order Placed Successfully")

})


