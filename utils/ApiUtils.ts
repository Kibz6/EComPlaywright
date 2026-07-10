
interface loginPayload {

    userEmail: string;
    userPassword: string;

}

export interface OrderPayload {
    orders: {
        country: string;
        productOrderedId: string;
    }[];
}

export class ApiUtils {


    apiContext: any;
    loginPayload: loginPayload;

    constructor(apiContext: any, loginPayload: loginPayload) {

        this.apiContext = apiContext;
        this.loginPayload = loginPayload;

    }


    private async retryRequest<T>(
        fn: () => Promise<T>,
        retries = 3,
        delayMs = 1500
    ): Promise<T> {
        let lastError: unknown;
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error;
                console.warn(`API attempt ${attempt}/${retries} failed: ${(error as Error).message}`);
                if (attempt < retries) {
                    await new Promise(resolve => setTimeout(resolve, delayMs));
                }
            }
        }
        throw lastError;
    }


    async getToken() {

        const loginResponse = await this.retryRequest<any>(() => this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            }));
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        const userId = loginResponseJson.userId;
        return { token, userId };
    }

    async createOrder(orderPayload: OrderPayload, token: string) {


        const orderResponse = await this.retryRequest<any>(() => this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'

                }
            }));

        const orderResponseJson = await orderResponse.json();
        const orderId = await orderResponseJson.orders[0];
        return orderId;
    }

    async getProductDetails(token:string,productId:string)
    {
        const response = await this.retryRequest<any>(() => this.apiContext.get(`https://rahulshettyacademy.com/api/ecom/product/get-product-detail/${productId}`,
            {
                headers: {
                    'Authorization': token
                }
            }))
            const responseBody = await response.json();
            return responseBody.data;
    }

    async addProductToCartApi(userId: string, productId: string, token: string) {


        const details = await this.getProductDetails(token,productId)

        const cartPayload = {
            _id: userId,
            product: details
        };

        const response = await this.retryRequest<any>(() =>
            this.apiContext.post("https://rahulshettyacademy.com/api/ecom/user/add-to-cart", {
                data: cartPayload,
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
        );

        const responseBody = await response.json();
        return { response, responseBody };
    }




}