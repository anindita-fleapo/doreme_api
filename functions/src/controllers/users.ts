import * as functions from "firebase-functions";
import fetch from "node-fetch";

export const createCustomer = functions.https.onRequest(
  async (request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    const { email, first_name, last_name } = request.body as {
      email: string;
      first_name: string;
      last_name: string;
    };
    console.log(request.body);
    const data = await fetch(
      "https://doremebusiness.myshopify.com/admin/api/2022-04/customers.json",
      {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": "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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer: { email, first_name, last_name } }),
      }
    ).then((e) => e.json());
    response.json(data);
  }
);

//https://your-development-store.myshopify.com/admin/api/2022-04/customers.json

export const getCustomer = functions.https.onRequest(
  async (request, response) => {
    const data = await fetch(
      `https://doremebusiness.myshopify.com/admin/api/2022-10/customers/${request.params.customerId}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": "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",
          "Content-Type": "application/json",
        },
      }
    ).then((e) => e.json());
    response.json(data);
  }
);

//https://your-development-store.myshopify.com/admin/api/2022-04/customers/207119551.json

export const getCustomerAddress = functions.https.onRequest(
  async (request, response) => {
    const data = await fetch(
      `https://doremebusiness.myshopify.com/admin/api/2022-10/customers/${request.params.customerId}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": "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",
          "Content-Type": "application/json",
        },
      }
    ).then((e) => e.json());
    response.json(data.customer.addresses);
  }
);

//https://your-development-store.myshopify.com/admin/api/2022-04/customers/207119551.json
