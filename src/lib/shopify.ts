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
