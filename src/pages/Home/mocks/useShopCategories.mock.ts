import { vi } from 'vitest';

vi.mock('@/pages/Home/hooks/useShopCategories', () => ({
  useShopCategories: vi.fn(() => ({
    data: {
      shop_categories: [
        { id: 1, image_url: '/images/all.png', name: '전체보기' },
        { id: 2, image_url: '/images/chicken.png', name: '치킨' },
        { id: 3, image_url: '/images/pizza.png', name: '피자/버거' },
      ],
    },
  })),
}));
