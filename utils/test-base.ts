import { test as baseTest, request, Page } from "@playwright/test";
import accounts from "./accounts.json";
import { ApiUtils,OrderPayload } from "./ApiUtils";
import { POManager } from "../pageobjects/POManager";

interface Account {
    username: string;
    password: string;
}

interface TestData {
    product: string;
    productId: string;
    country: string;
    creditCard: string;
    productOrderId: string;
    orderPayload: OrderPayload;
}

export const customTest = baseTest.extend<{
    testAccount: Account;
    testData: TestData;
    authData: { token: string; userId: string };
    token: string;
    userId: string;
    apiUtils: ApiUtils;
    poManager: POManager;
    
}>({
    testAccount: async ({}, use, workerInfo) => {
        const index = workerInfo.parallelIndex % accounts.length;
        const account: Account = accounts[index];
        await use(account);
    },

    testData: async ({}, use) => {
        const data: TestData = require("./testData.json");
        await use(data);
    },

    authData: async ({ testAccount }, use) => {
        const apiContext = await request.newContext();
        const apiUtils = new ApiUtils(apiContext, {
            userEmail: testAccount.username,
            userPassword: testAccount.password
        });
        const { token, userId } = await apiUtils.getToken();
        await use({ token, userId });
        await apiContext.dispose();
    },

     token: async ({ authData }, use) => {
        await use(authData.token);
    },

     userId: async ({authData}, use ) => {
        await use(authData.userId)
     },

    apiUtils: async ({ testAccount }, use) => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, {
        userEmail: testAccount.username,
        userPassword: testAccount.password
    });
    await use(apiUtils);
    await apiContext.dispose();
    },

    poManager: async ({page}, use)=>{

        const poManager = new POManager(page);
        await use(poManager);
    },

    page: async ({ page, token }, use) => {
        await page.addInitScript((value) => {
            window.localStorage.setItem("token", value);
        }, token);
        await page.goto("https://rahulshettyacademy.com/client");
        await page.waitForLoadState("domcontentloaded");
        await use(page);
    },





});


export const customTestNoNav = baseTest.extend<{
    testAccount: Account;
    testData: TestData;
    authData: { token: string; userId: string };
    token: string;
    userId: string;
    apiUtils: ApiUtils;
    poManager: POManager;
    page: Page;
}>({
    testAccount: async ({}, use, workerInfo) => {
        const index = workerInfo.parallelIndex % accounts.length;
        const account: Account = accounts[index];
        await use(account);
    },

    testData: async ({}, use) => {
        const data: TestData = require("./testData.json");
        await use(data);
    },

     authData: async ({ testAccount }, use) => {
        const apiContext = await request.newContext();
        const apiUtils = new ApiUtils(apiContext, {
            userEmail: testAccount.username,
            userPassword: testAccount.password
        });
        const { token, userId } = await apiUtils.getToken();
        await use({ token, userId });
        await apiContext.dispose();
    },

    token: async ({ authData }, use) => {
        await use(authData.token);
    },

    userId: async ({authData}, use ) => {
        await use(authData.userId)
     },

    apiUtils: async ({ testAccount }, use) => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, {
        userEmail: testAccount.username,
        userPassword: testAccount.password
    });
    await use(apiUtils);
    await apiContext.dispose();
    },

    poManager: async ({page}, use)=>{

        const poManager = new POManager(page);
        await use(poManager);
    },
});