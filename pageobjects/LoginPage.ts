import { Locator, Page } from "@playwright/test"
import { AbstractComponents } from "../components/AbstractComponents"

export class LoginPage extends AbstractComponents {

    username: Locator;
    password: Locator;
    loginBtn: Locator;
    emailError: Locator;
    passwordError: Locator;
    register: Locator;
    forgotPassword: Locator;



    constructor(page: Page) {
        super(page);
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginBtn = page.locator(".login-btn");
        this.emailError = page.locator("//div[@class='form-group']/div");
        this.passwordError = page.locator("//div[@class='form-group mb-4']/div");
        this.register = page.locator(".login-wrapper-footer-text");
        this.forgotPassword = page.getByText("Forgot password?");

    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login")
        this.waitForDomLoad();
    }

    async loginApp(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    async getEmailError() {
        return await this.emailError.textContent();
    }

    async getPasswordError() {
        return await this.passwordError.textContent();
    }

    async goToRegisterPage() {
        await this.register.click({force:true});
    }

    async goToNewPasswordPage(){
        await this.forgotPassword.click({force:true});
    }





}