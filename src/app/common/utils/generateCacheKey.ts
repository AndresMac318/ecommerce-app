import {
  ProductFilters,
  ProductPagination,
} from '../../features/products/+state/product.state';

interface cacheKeys {
  page: number;
  pageSize: number;
  filters: ProductFilters;
}

export const generateCacheKey = (
  pagination: ProductPagination,
  filters: ProductFilters
) => {
  const cacheKey = `${pagination.currentPage}|${pagination.pageSize}|${filters.category}|${filters.priceRange?.[0]}|${filters.priceRange?.[1]}|`;
  return cacheKey;
};

export const parseCacheKey = (cacheKey: string): cacheKeys => {
  const propertiesArr = cacheKey.split('|');

  return {
    page: Number.parseInt(propertiesArr[0]),
    pageSize: Number.parseInt(propertiesArr[1]),
    filters: {
      category: propertiesArr[2],
      priceRange: [
        Number.parseInt(propertiesArr[3]),
        Number.parseInt(propertiesArr[4]),
      ],
    },
  };
};
