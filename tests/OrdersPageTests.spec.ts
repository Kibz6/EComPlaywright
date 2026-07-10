import { customTest } from "../utils/test-base";
import { expect } from "@playwright/test";


customTest("Back to Shop Button Validation", async({poManager, page})=>{

    await poManager.getProductCataloguePage().goToOrders()
    await poManager.getOrdersPage().clickBackToShop();
    expect (page.url()).toBe("https://rahulshettyacademy.com/client/#/dashboard/dash")
})

customTest("Back to Cart Button Validation", async({poManager, page})=>{

    await poManager.getProductCataloguePage().goToOrders()
    await poManager.getOrdersPage().clickBackToCart();
    expect (page.url()).toBe("https://rahulshettyacademy.com/client/#/dashboard/cart")
})

customTest("View Item Validation", async({apiUtils, testData, token, poManager, page})=>{

    const orderId = await apiUtils.createOrder(testData.orderPayload, token)
    await poManager.getProductCataloguePage().goToOrders()
    await poManager.getOrdersPage().viewOrder(orderId)
    expect (page.url()).toContain(orderId)
})

customTest("Delete Item Validation", async({apiUtils, testData, token, poManager, page})=>{

    const ordersPage = poManager.getOrdersPage();

    const orderId = await apiUtils.createOrder(testData.orderPayload, token)
    await poManager.getProductCataloguePage().goToOrders()
    await ordersPage.deleteItem(orderId)
    expect (await ordersPage.getOrders()).not.toContain(orderId)

})