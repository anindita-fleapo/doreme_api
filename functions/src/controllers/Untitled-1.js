https://doremebusiness.myshopify.com/api/2022-10/graphql.json

headers: {
    "X-Shopify-Storefront-Access-Token": "aa14697fc3905910165a5699016f216f",
    "Content-Type": "application/json"
}

body: {
    `{
	menu(handle: "${menu}") {
		id
    title
    items {
      id 
      resourceId
      title
    }
  }
}`
}

query {
	orders(first: 10) {
   	edges {
      node {
        id
        name
      }
    }
	}
}