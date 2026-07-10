import { POManager } from "../pageobjects/POManager";
import { customTest } from "../utils/test-base";
import { expect } from "@playwright/test";



customTest("Product Name Confirmation", async ({ apiUtils, testData, token, poManager }) => {

    const orderId = await apiUtils.createOrder(testData.orderPayload, token)
    await poManager.getProductCataloguePage().goToConfirmationPage(orderId);
    expect(await poManager.getConfirmationPage().getProductName()).toBe(testData.product)

})

customTest("Order History Buttong Validation", async ({ apiUtils, testData, token, poManager,page }) => {

    const confirmationPage = poManager.getConfirmationPage();

    const orderId = await apiUtils.createOrder(testData.orderPayload, token)
    await poManager.getProductCataloguePage().goToConfirmationPage(orderId);
    await confirmationPage.clickOrderHistory();
    expect (page.url()).toBe("https://rahulshettyacademy.com/client/#/dashboard/myorders")
})

customTest("Order Id Validation", async ({ apiUtils, testData, token, poManager,page }) => {

    const orderId = await apiUtils.createOrder(testData.orderPayload, token)
    await poManager.getProductCataloguePage().goToOrders();
    expect (await poManager.getOrdersPage().getOrderId()).toBe(orderId)
})