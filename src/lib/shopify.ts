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
        selectedOptions: {
          name: string;
          value: string;
        }[];
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
  options: {
    id: string;
    name: string;
    values: string[];
  }[];
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
          productType
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
            productType
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
      options {
        id
        name
        values
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
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
// ... existing code ...

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
    totalTaxAmount: { amount: string; currencyCode: string };
  };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        cost: {
          totalAmount: { amount: string; currencyCode: string };
        };
        merchandise: {
          id: string;
          title: string;
          selectedOptions: { name: string; value: string }[];
          product: {
            handle: string;
            title: string;
            featuredImage: { url: string; altText: string };
          };
          price: { amount: string; currencyCode: string };
        };
      };
    }[];
  };
};

const CART_FRAGMENT = `
  id
  checkoutUrl
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
    totalTaxAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            selectedOptions {
              name
              value
            }
            product {
              handle
              title
              featuredImage {
                url
                altText
              }
            }
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

const CREATE_CART_MUTATION = `
  mutation cartCreate {
    cartCreate {
      cart {
        ${CART_FRAGMENT}
      }
    }
  }
`;

const ADD_TO_CART_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FRAGMENT}
      }
    }
  }
`;

const REMOVE_FROM_CART_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ${CART_FRAGMENT}
      }
    }
  }
`;

const UPDATE_CART_LINES_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FRAGMENT}
      }
    }
  }
`;

const GET_CART_QUERY = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ${CART_FRAGMENT}
    }
  }
`;

export async function createCart(): Promise<ShopifyCart | undefined> {
  const { data } = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({
    query: CREATE_CART_MUTATION,
  });
  return data?.cartCreate?.cart;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<ShopifyCart | undefined> {
  const { data } = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
    query: ADD_TO_CART_MUTATION,
    variables: { cartId, lines },
  });
  return data?.cartLinesAdd?.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<ShopifyCart | undefined> {
  const { data } = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>({
    query: REMOVE_FROM_CART_MUTATION,
    variables: { cartId, lineIds },
  });
  return data?.cartLinesRemove?.cart;
}

export async function updateCartLines(cartId: string, lines: { id: string; quantity: number }[]): Promise<ShopifyCart | undefined> {
  const { data } = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>({
    query: UPDATE_CART_LINES_MUTATION,
    variables: { cartId, lines },
  });
  return data?.cartLinesUpdate?.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | undefined> {
  const { data } = await shopifyFetch<{ cart: ShopifyCart }>({
    query: GET_CART_QUERY,
    variables: { cartId },
  });
  return data?.cart;
}
