import { expect } from '@playwright/test';
import { customTestNoNav } from '../utils/test-base';





customTestNoNav("Succesfull Login Validation", async ({ poManager, testAccount}) => {

    const loginPage = poManager.getLoginPage();

    await loginPage.goTo();
    await loginPage.loginApp(testAccount.username, testAccount.password);
    await loginPage.expectToastMsg("Login Successfully");
})

customTestNoNav("Wrong Password Validation", async ({ poManager, testAccount }) => {

    
    const loginPage = poManager.getLoginPage();

    await loginPage.goTo();
    await loginPage.loginApp(testAccount.username, "wrongpass1234");
    await loginPage.expectToastMsg(" Incorrect email or password. ");

})

customTestNoNav("Blank Spaces Validation", async ({ poManager }) => {

    const loginPage = poManager.getLoginPage();

    await loginPage.goTo();
    await loginPage.loginApp("", "");
    expect(await loginPage.getEmailError()).toContain("*Email is required");
    expect(await loginPage.getPasswordError()).toContain("*Password is required");

})

customTestNoNav("Invalid Email Validation", async ({ poManager }) => {

    const loginPage = poManager.getLoginPage();

    await loginPage.goTo();
    await loginPage.loginApp("Invalid", "randompass");
    expect(await loginPage.getEmailError()).toContain("*Enter Valid Email");

})

customTestNoNav("Register Link Validation", async({poManager, page})=>{

    const loginPage = poManager.getLoginPage();

    await loginPage.goTo();
    await loginPage.goToRegisterPage();
    expect (await page.url()).toContain("https://rahulshettyacademy.com/client/#/auth/register");

})

customTestNoNav("Forgot Password LinkValidation", async({poManager, page})=>{

    
const loginPage = poManager.getLoginPage();
    
    await loginPage.goTo();
    await loginPage.goToNewPasswordPage();
    expect (page.url()).toContain("https://rahulshettyacademy.com/client/#/auth/password-new");


})






