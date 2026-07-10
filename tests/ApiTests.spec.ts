import { expect } from "@playwright/test"
import { customTest, customTestNoNav } from "../utils/test-base"



customTestNoNav("Login via API", async ({ page, token }) => {
    await page.addInitScript((value) => {
        window.localStorage.setItem("token", value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");
    expect(page.url()).toContain("https://rahulshettyacademy.com/client/#/dashboard/dash");

});

customTest("Create Order Via API", async ({ poManager, token, apiUtils, testData }) => {

    const ordersPage = poManager.getOrdersPage();

    const orderId = await apiUtils.createOrder(testData.orderPayload, token);
    await poManager.getLoginPage().goToOrders();
    expect(await ordersPage.getOrderId()).toContain(orderId);
})

customTest("Add To Cart Via API", async ({poManager, apiUtils,userId,testData,token }) => {

    const cartPage = poManager.getCartPage()
    
    await apiUtils.addProductToCartApi(userId,testData.productId,token);
    await poManager.getProductCataloguePage().goToCart()
    expect (await cartPage.getProductNames()).toContain(testData.product)
    


})



