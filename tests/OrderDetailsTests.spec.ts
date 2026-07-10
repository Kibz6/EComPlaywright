import test from "node:test";
import { customTest } from "../utils/test-base";
import { expect } from "@playwright/test";


customTest("Order Details Validation", async({apiUtils, testData, token, poManager, testAccount})=>{

    const orderDetailsPage = poManager.getOrderDetailsPage()

    const orderId = await apiUtils.createOrder(testData.orderPayload, token)
    await poManager.getProductCataloguePage().goToOrderDetails(orderId)
    const billingAddress = await orderDetailsPage.getBillingAddress()
    const deliveryAddress = await orderDetailsPage.getDeliveryAddress();
    const productInfo = await orderDetailsPage.getProductInfo()
    expect (await orderDetailsPage.getOrderId()).toBe(orderId)
    expect (billingAddress).toContain(testAccount.username)
    expect (billingAddress).toContain(testData.country)
    expect (deliveryAddress).toContain(testAccount.username)
    expect (deliveryAddress).toContain(testData.country)
    expect (productInfo).toContain(testData.product)
    expect (productInfo).toContain("11500")
})

customTest("View Orders Button Validation", async({apiUtils, testData, token, poManager, page})=>{


    const orderId = await apiUtils.createOrder(testData.orderPayload, token)
    await poManager.getProductCataloguePage().goToOrderDetails(orderId)
    await poManager.getOrderDetailsPage().clickViewOrders();
    expect (page.url()).toBe("https://rahulshettyacademy.com/client/#/dashboard/myorders")
})