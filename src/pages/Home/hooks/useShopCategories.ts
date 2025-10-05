import { useSuspenseQuery } from '@tanstack/react-query';
import { getShopCategories } from '@/api/shop/index';

export const useShopCategories = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['shopCategories'],
    queryFn: getShopCategories,
  });
  return { data };
};
