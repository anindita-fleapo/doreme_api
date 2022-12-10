import * as functions from "firebase-functions";

import fetch from "node-fetch";

export const getMenu = functions.https.onRequest(async (request, response) => {
  console.log(request.params);
  const data = await (
    await fetch(
      "https://doremebusiness.myshopify.com/api/2022-10/graphql.json",
      {
        method: "POST",

        headers: {
          "X-Shopify-Storefront-Access-Token":
            "946acc2f0f4c814a8daf4d7320da5e38",
          "Content-Type": "application/graphql",
        },
        redirect: "follow", // manual, *follow, error
        body: `{
        menu(handle: "${request.query.cat}") {
            id
            title
            items {
              id 
              resourceId
              title
            }
          }
        }`,
      }
    )
  ).json();
  console.log(data);

  response.json(data);
});
