import { useSuspenseQuery } from '@tanstack/react-query';
import { getStoreCategories } from '@/api/shop/index';

export const useStoreCategories = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['storeCategories'],
    queryFn: getStoreCategories,
  });
  return { data };
};
