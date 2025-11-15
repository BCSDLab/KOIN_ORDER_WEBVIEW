import { useParams } from 'react-router-dom';
import { useShopTotalReview } from '../hooks/useGetShopTotalReview';
import Rating from './Rating';
import StarList from './StarList';

export default function AverageRating() {
  const { shopId } = useParams();
  const { data: totalReviews } = useShopTotalReview(shopId!);

  const average = totalReviews.statistics.average_rating;
  const ratings = totalReviews.statistics.ratings;
  const totalReviewCount = totalReviews.total_count;
  const rateList = ['5', '4', '3', '2', '1'] as const;

  return (
    <div className="flex w-full gap-[29px] border-b border-neutral-300 px-6 pb-[14px]">
      <div className="flex flex-col items-center justify-center">
        <div className="text-[32px] leading-[160%]">{average.toFixed(1)}</div>
        <div className="mt-1">
          <StarList average_rating={average} />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        {rateList.map((rate) => {
          const count = ratings[rate];
          const fillPercent = totalReviewCount ? (count / totalReviewCount) * 100 : 0;
          return <Rating key={rate} point={rate} count={count} rate={fillPercent} />;
        })}
      </div>
    </div>
  );
}
