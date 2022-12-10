import * as functions from "firebase-functions";
import fetch from "node-fetch";

export const getProductByCollection = functions.https.onRequest(
  async (request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    const id = request.body.id.split("/").at(-1);
    console.log(id);
    //console.log(request.body);
    console.log(request.body.id);
    const url = `https://doremebusiness.myshopify.com/admin/api/2022-10/collections/${id}/products.json`;
    console.log(url);
    const data = await fetch(url, {
      headers: {
        "X-Shopify-Access-Token": "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",
        "Content-Type": "application/json",
      },
    }).then((e) => e.json());
    console.log(request.params);
    response.json(data);
  }
);

//https://your-development-store.myshopify.com/admin/api/2022-10/collections/841564295/products.json

export const getProductDetails = functions.https.onRequest(
  async (request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });

    const data = await fetch(
      `https://doremebusiness.myshopify.com/admin/api/2022-04/products/${request.params.productId}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": "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",
          "Content-Type": "application/json",
        },
      }
    ).then((e) => e.json());
    console.log(data);
    const postData = {
      id: data.product.id,
      title: data.product.title,
      images: data.product.images.map((image: any) => image.src),
      price: data.product.price,
      variants: data.product.variants,
    };

    console.log(request.params);
    response.json(postData);
  }
);

//https://your-development-store.myshopify.com/admin/api/2022-04/products/632910392.json
