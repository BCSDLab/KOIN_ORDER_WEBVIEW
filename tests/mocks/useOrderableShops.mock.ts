import { vi } from 'vitest';

vi.mock('@/pages/Home/hooks/useOrderableShops', () => ({
  useOrderableShops: vi.fn((params) => {
    const allShops = [
      {
        shop_id: 1,
        orderable_shop_id: 1,
        name: '치킨집A',
        is_delivery_available: true,
        is_takeout_available: true,
        category_ids: [1, 2],
        rating_average: 4.5,
        review_count: 120,
        is_open: true,
        images: [{ image_url: '/test.jpg', is_thumbnail: true }],
      },
      {
        shop_id: 2,
        orderable_shop_id: 2,
        name: '피자집A',
        is_delivery_available: true,
        is_takeout_available: false,
        category_ids: [1, 3],
        rating_average: 4.2,
        review_count: 200,
        is_open: true,
        images: [{ image_url: '/test2.jpg', is_thumbnail: true }],
      },
      {
        shop_id: 3,
        orderable_shop_id: 3,
        name: '치킨집B',
        is_delivery_available: true,
        is_takeout_available: true,
        category_ids: [1, 2],
        rating_average: 4.8,
        review_count: 80,
        is_open: true,
        images: [{ image_url: '/test3.jpg', is_thumbnail: true }],
      },
    ];

    const { category_filter, sorter } = params || {};

    let filteredShops = allShops;
    if (category_filter && category_filter !== 1) {
      filteredShops = allShops.filter((shop) => shop.category_ids.includes(category_filter));
    }

    if (sorter === 'RATING_DESC') {
      filteredShops = [...filteredShops].sort((a, b) => b.rating_average - a.rating_average);
    }

    if (sorter === 'COUNT_DESC') {
      filteredShops = [...filteredShops].sort((a, b) => b.review_count - a.review_count);
    }

    return { data: filteredShops };
  }),
}));
