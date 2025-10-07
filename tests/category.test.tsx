import { Suspense } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from '../src/pages/Home';
import { render, screen, fireEvent, waitFor } from './test-utils';

vi.mock('@/pages/Home/hooks/useShopCategories', () => ({
  useShopCategories: vi.fn(() => ({
    data: {
      shop_categories: [
        { id: 1, name: '전체보기', image_url: '/images/all.png' },
        { id: 2, name: '치킨', image_url: '/images/chicken.png' },
        { id: 3, name: '피자/버거', image_url: '/images/pizza.png' },
      ],
    },
  })),
}));

vi.mock('@/pages/Home/hooks/useOrderableShops', () => ({
  useOrderableShops: vi.fn((params) => {
    const allShops = [
      {
        shop_id: 1,
        orderable_shop_id: 1,
        name: '치킨집A',
        category_ids: [1, 2],
        rating_average: 4.5,
        review_count: 120,
        is_open: true,
        is_delivery_available: true,
        is_takeout_available: true,
        images: [{ image_url: '/test.jpg', is_thumbnail: true }],
      },
      {
        shop_id: 2,
        orderable_shop_id: 2,
        name: '피자집A',
        category_ids: [1, 3],
        rating_average: 4.2,
        review_count: 200,
        is_open: true,
        is_delivery_available: true,
        is_takeout_available: false,
        images: [{ image_url: '/test2.jpg', is_thumbnail: true }],
      },
      {
        shop_id: 3,
        orderable_shop_id: 3,
        name: '치킨집B',
        category_ids: [1, 2],
        rating_average: 4.8,
        review_count: 80,
        is_open: true,
        is_delivery_available: true,
        is_takeout_available: true,
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

describe('Home-category', () => {
  beforeEach(() => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>,
    );
  });

  it('초기 상태에서 카테고리가 전체로 설정되어 있어야 한다.', async () => {
    const activeCategory = await screen.findByTestId('category-전체보기');
    expect(activeCategory).toHaveAttribute('aria-selected', 'true');
  });

  it('정렬 필터의 초기값이 기본순인지 확인한다.', async () => {
    const sortButton = await screen.findByTestId('sortButton');
    await fireEvent.click(sortButton);

    const defaultOption = await screen.findByTestId('sortOption-NONE');
    expect(defaultOption).toHaveAttribute('aria-selected', 'true');
  });

  it('초기 상태에 모든 상점이 나오는지 확인한다.', async () => {
    await screen.findByText('치킨집A');
    await screen.findByText('피자집A');
    await screen.findByText('치킨집B');
  });

  it('치킨 카테고리를 눌렀을 때 치킨 카테고리에 포함되는 가게만 나오는지 확인한다.', async () => {
    const chickenCategory = await screen.findByTestId('category-치킨');
    await fireEvent.click(chickenCategory);

    await waitFor(() => {
      expect(screen.getByText('치킨집A')).toBeInTheDocument();
      expect(screen.getByText('치킨집B')).toBeInTheDocument();
      expect(screen.queryByText('피자집A')).not.toBeInTheDocument();
    });
  });

  it('피자/버거 카테고리를 눌렀을 때 피자/버거 카테고리에 포함되는 가게만 나오는지 확인한다.', async () => {
    const chickenCategory = await screen.findByTestId('category-피자/버거');
    await fireEvent.click(chickenCategory);

    await waitFor(() => {
      expect(screen.getByText('피자집A')).toBeInTheDocument();
      expect(screen.queryByText('치킨집A')).not.toBeInTheDocument();
      expect(screen.queryByText('치킨집B')).not.toBeInTheDocument();
    });
  });

  it('별점 높은 순 필터를 선택했을 때, 별점이 높은 가게순으로 나오는지 확인한다.', async () => {
    const sortButton = await screen.findByTestId('sortButton');
    await fireEvent.click(sortButton);

    const ratingOption = await screen.findByTestId('sortOption-RATING_DESC');
    await fireEvent.click(ratingOption);

    const shopNames = await screen.findAllByTestId(/^shopName-/);
    const shopNameTexts = shopNames.map((el) => el.textContent);

    expect(shopNameTexts).toEqual(['치킨집B', '치킨집A', '피자집A']);
  });

  it('리뷰순 필터를 선택했을 때, 리뷰 개수가 많은 가게순으로 나오는지 확인한다.', async () => {
    const sortButton = await screen.findByTestId('sortButton');
    await fireEvent.click(sortButton);

    const reviewOption = await screen.findByTestId('sortOption-COUNT_DESC');
    await fireEvent.click(reviewOption);

    const shopNames = await screen.findAllByTestId(/^shopName-/);
    const shopNameTexts = shopNames.map((el) => el.textContent);

    expect(shopNameTexts).toEqual(['피자집A', '치킨집A', '치킨집B']);
  });
});
