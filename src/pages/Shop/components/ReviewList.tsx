import { useParams } from 'react-router-dom';
import { useShopTotalReview } from '../hooks/useGetShopReview';
import { useSortedReviews } from '../hooks/useSortedReviews';
import ReviewCard from './ReviewCard';
import type { SortType } from './SortModal';
import EmptyReview from '@/pages/Shop/components/EmptyReview';

interface ReviewListProps {
  showMineOnly?: boolean;
  sort?: SortType;
}

export default function ReviewList({ showMineOnly = false, sort = 'LATEST' }: ReviewListProps) {
  const { shopId } = useParams();
  if (!shopId) return null;

  const { data } = useShopTotalReview(shopId);
  const reviews = data?.reviews ?? [];

  const sortedReviews = useSortedReviews(reviews, sort, showMineOnly);

  return (
    <div className="mt-[18px] flex w-full flex-col items-start gap-6">
      {sortedReviews.length > 0 ? (
        sortedReviews.map((r) => (
          <ReviewCard
            rating={r.rating}
            nick_name={r.nick_name}
            content={r.content}
            image_urls={r.image_urls}
            menu_names={r.menu_names}
            is_mine={r.is_mine}
            is_modified={r.is_modified}
            is_reported={r.is_reported}
            created_at={r.created_at}
            review_id={r.review_id}
          />
        ))
      ) : (
        <EmptyReview />
      )}
    </div>
  );
}
