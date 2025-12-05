const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '');
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T | undefined> {
  if (!domain || !storefrontAccessToken) {
    console.warn("Shopify credentials not found. Using mock data if available.");
    console.warn("Missing: ", !domain ? "SHOPIFY_STORE_DOMAIN" : "", !storefrontAccessToken ? "SHOPIFY_STOREFRONT_ACCESS_TOKEN" : "");
    return undefined;
  }

  try {
    const result = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store', // or 'force-cache' depending on needs
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return body.data;
  } catch (e) {
    console.error("Shopify API Error:", e);
    return undefined;
  }
}

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: {
        url: string;
        altText: string;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
      };
    }[];
  };
};

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

const COLLECTION_QUERY = `
  query Collection($handle: String!) {
    collection(handle: $handle) {
      products(first: 20) {
        edges {
          node {
            id
            handle
            title
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_QUERY = `
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  }
`;

export async function getProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({
    query: PRODUCTS_QUERY,
    variables: { first: 10 },
  });

  return data?.products.edges.map((edge) => edge.node) || [];
}

export async function getCollectionProducts(handle: string): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ collection: { products: { edges: { node: ShopifyProduct }[] } } }>({
    query: COLLECTION_QUERY,
    variables: { handle },
  });

  return data?.collection?.products.edges.map((edge) => edge.node) || [];
}

export async function getProduct(handle: string): Promise<ShopifyProduct | undefined> {
  const data = await shopifyFetch<{ product: ShopifyProduct }>({
    query: PRODUCT_QUERY,
    variables: { handle },
  });

  return data?.product;
}
