import * as functions from "firebase-functions";
import fetch from "node-fetch";

export const getOrdersOfCustomer = functions.https.onRequest(
  async (request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });

    const data = await fetch(
      `https://doremebusiness.myshopify.com/admin/api/2022-04/customers/${request.params.customerId}/orders.json`,
      {
        headers: {
          "X-Shopify-Access-Token": "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",
          "Content-Type": "application/json",
        },
      }
    ).then((e) => e.json());
    console.log(request.params);
    response.json(data);
  }
);

//https://your-development-store.myshopify.com/admin/api/2022-04/customers/207119551/orders.json

export const create_orders = functions.https.onRequest(
  async (request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    const { title, price, quentity } = request.body as {
      title: string;
      price: number;
      quentity: number;
    };
    console.log(request.body);
    const data = await fetch(
      "https://doremebusiness.myshopify.com/admin/api/2022-10/orders.json",
      {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": "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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ order: title, price, quentity }]),
      }
    ).then((e) => e.json());
    response.json(data);
  }
);

//https://your-development-store.myshopify.com/admin/api/2022-10/orders.json
