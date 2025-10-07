import { Suspense } from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import './mocks/useShopCategories.mock';
import './mocks/useOrderableShops.mock';
import Home from '../src/pages/Home';
import { render, screen, fireEvent, waitFor } from './test-utils';

const renderHome = () =>
  render(
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>,
  );

describe('Initial Value', () => {
  beforeEach(renderHome);

  it("초기 진입 시, 기본 카테고리는 '전체보기'로 설정되어 있다.", async () => {
    const activeCategory = await screen.findByTestId('category-전체보기');
    expect(activeCategory).toHaveAttribute('aria-selected', 'true');
  });

  it('초기 진입 시, 모든 상점이 화면에 표시된다.', async () => {
    await screen.findByText('치킨집A');
    await screen.findByText('피자집A');
    await screen.findByText('치킨집B');
  });
});

describe('Category', () => {
  beforeEach(renderHome);

  it("'치킨' 카테고리를 선택하면, 치킨 카테고리에 속한 가게만 표시된다.", async () => {
    const chickenCategory = await screen.findByTestId('category-치킨');
    await fireEvent.click(chickenCategory);

    await waitFor(() => {
      expect(screen.getByText('치킨집A')).toBeInTheDocument();
      expect(screen.getByText('치킨집B')).toBeInTheDocument();
      expect(screen.queryByText('피자집A')).not.toBeInTheDocument();
    });
  });

  it("'피자/버거' 카테고리를 선택하면, 해당 카테고리에 속한 가게만 표시된다.", async () => {
    const pizzaCategory = await screen.findByTestId('category-피자/버거');
    await fireEvent.click(pizzaCategory);

    await waitFor(() => {
      expect(screen.getByText('피자집A')).toBeInTheDocument();
      expect(screen.queryByText('치킨집A')).not.toBeInTheDocument();
      expect(screen.queryByText('치킨집B')).not.toBeInTheDocument();
    });
  });
});

describe('Sort', () => {
  beforeEach(renderHome);

  it("'별점순' 필터를 선택하면, 별점이 높은 순서대로 가게가 정렬된다.", async () => {
    const sortButton = await screen.findByTestId('sortButton');
    await fireEvent.click(sortButton);

    const ratingOption = await screen.findByTestId('sortOption-RATING_DESC');
    await fireEvent.click(ratingOption);

    const shopNames = await screen.findAllByTestId(/^shopName-/);
    const shopNameTexts = shopNames.map((el) => el.textContent);

    expect(shopNameTexts).toEqual(['치킨집B', '치킨집A', '피자집A']);
  });

  it("'리뷰순' 필터를 선택하면, 리뷰 개수가 많은 순서대로 가게가 정렬된다.", async () => {
    const sortButton = await screen.findByTestId('sortButton');
    await fireEvent.click(sortButton);

    const reviewOption = await screen.findByTestId('sortOption-COUNT_DESC');
    await fireEvent.click(reviewOption);

    const shopNames = await screen.findAllByTestId(/^shopName-/);
    const shopNameTexts = shopNames.map((el) => el.textContent);

    expect(shopNameTexts).toEqual(['피자집A', '치킨집A', '치킨집B']);
  });
});
