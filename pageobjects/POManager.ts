import {Page} from "@playwright/test"
import { LoginPage } from "./LoginPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { ConfirmationPage } from "./ConfirmationPage";
import { NewPasswordPage } from "./NewPasswordPage";
import { OrderDetailsPage } from "./OrderDetailsPage";
import { OrdersPage } from "./OrdersPage";
import { ProductCatalogue } from "./ProductCatalogue";
import { ProductPage } from "./ProductPage";
import { RegisterPage } from "./RegisterPage";

export class POManager{

    loginPage : LoginPage;
    cartPage : CartPage;
    checkoutPage : CheckoutPage;
    confirmationPage : ConfirmationPage;
    newPasswordPage : NewPasswordPage;
    orderDetailsPage : OrderDetailsPage;
    ordersPage : OrdersPage;
    productCatalogue : ProductCatalogue;
    productPage : ProductPage;
    registerPage : RegisterPage;
    page : Page


    constructor(page:Page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.cartPage = new CartPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page);
        this.confirmationPage = new ConfirmationPage(this.page);
        this.newPasswordPage = new NewPasswordPage(this.page);
        this.orderDetailsPage = new OrderDetailsPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
        this.productCatalogue = new ProductCatalogue(this.page);
        this.productPage = new ProductPage(this.page);
        this.registerPage = new RegisterPage(this.page);


    }


    getLoginPage()
    {
        return this.loginPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getCheckoutPage()
    {
        return this.checkoutPage;
    }

    getConfirmationPage()
    {
        return this.confirmationPage;
    }

    getNewPasswordPage()
    {
        return this.newPasswordPage;
    }

    getOrderDetailsPage()
    {
        return this.orderDetailsPage;
    }

    getOrdersPage()
    {
        return this.ordersPage;
    }

    getProductCataloguePage()
    {
        return this.productCatalogue;
    }

    getProductPage()
    {
        return this.productPage;
    }

    getRegisterPage()
    {
        return this.registerPage;
    }



}