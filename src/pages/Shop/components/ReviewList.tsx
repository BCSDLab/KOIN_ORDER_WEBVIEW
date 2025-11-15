import { useParams } from 'react-router-dom';
import { useGetMyShopReview } from '../hooks/useGetMyShopReview';
import { useShopReview } from '../hooks/useGetShopReview';
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

  const { data: totalData } = useShopReview(shopId, { sort });
  const { data: myData } = useGetMyShopReview(shopId, sort);

  const totalReviews = totalData?.reviews ?? [];
  const myReviews = myData?.reviews ?? [];

  const visibleReviews = showMineOnly ? myReviews : totalReviews;

  return (
    <div className="mt-[18px] flex w-full flex-col items-start gap-6">
      {visibleReviews.length > 0 ? (
        visibleReviews.map((review) => <ReviewCard key={review.review_id} review={review} />)
      ) : (
        <EmptyReview />
      )}
    </div>
  );
}
