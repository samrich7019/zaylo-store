const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();

type ShopifyFetchResult<T> = {
  data?: T;
  error?: string;
};

async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<ShopifyFetchResult<T>> {
  if (!domain || !storefrontAccessToken) {
    const missing = [];
    if (!domain) missing.push("SHOPIFY_STORE_DOMAIN");
    if (!storefrontAccessToken) missing.push("SHOPIFY_STOREFRONT_ACCESS_TOKEN");
    return { error: `Missing credentials: ${missing.join(", ")}` };
  }

  try {
    const url = `https://${domain}/api/2024-01/graphql.json`;
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });

    if (!result.ok) {
      const text = await result.text();
      return { error: `API Error ${result.status}: ${result.statusText} - ${text.substring(0, 100)}` };
    }

    const body = await result.json();

    if (body.errors) {
      return { error: `GraphQL Error: ${body.errors[0].message}` };
    }

    return { data: body.data };
  } catch (e) {
    return { error: `Fetch Error: ${e instanceof Error ? e.message : String(e)}` };
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

export async function getProducts(): Promise<{ products: ShopifyProduct[], error?: string }> {
  const { data, error } = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({
    query: PRODUCTS_QUERY,
    variables: { first: 10 },
  });

  if (error) return { products: [], error };
  return { products: data?.products.edges.map((edge) => edge.node) || [] };
}

export async function getCollectionProducts(handle: string): Promise<{ products: ShopifyProduct[], error?: string }> {
  const { data, error } = await shopifyFetch<{ collection: { products: { edges: { node: ShopifyProduct }[] } } }>({
    query: COLLECTION_QUERY,
    variables: { handle },
  });

  if (error) return { products: [], error };
  return { products: data?.collection?.products.edges.map((edge) => edge.node) || [] };
}

export async function getProduct(handle: string): Promise<{ product?: ShopifyProduct, error?: string }> {
  const { data, error } = await shopifyFetch<{ product: ShopifyProduct }>({
    query: PRODUCT_QUERY,
    variables: { handle },
  });

  if (error) return { product: undefined, error };
  return { product: data?.product };
}
