import { useNavigate, useParams } from 'react-router-dom';
import LoginRequiredModal from './LoginRequiredModal';
import StarList from './StarList';
import CheckBookMark from '@/assets/Shop/check-bookmark.svg';
import NoImageIcon from '@/assets/Shop/no-image-icon.svg';
import Button from '@/components/UI/Button';
import useBooleanState from '@/util/hooks/useBooleanState';
import { getCookie } from '@/util/ts/cookie';

export interface ReviewCardProps {
  rating: number;
  nick_name: string;
  content: string;
  image_urls: string[];
  menu_names: string[];
  is_mine: boolean;
  is_modified: boolean;
  is_reported: boolean;
  created_at: string;
  review_id: string | number;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default function ReviewCard({
  rating,
  nick_name,
  content,
  image_urls,
  menu_names,
  is_mine,
  //is_modified,
  is_reported,
  created_at,
  review_id,
}: ReviewCardProps) {
  const [loginModalOpen, openLoginModal, closeLoginModal] = useBooleanState(false);
  const navigate = useNavigate();
  const { shopId } = useParams();
  if (!shopId) return null;

  if (is_reported) {
    return (
      <div className="flex w-full items-center gap-2 py-3">
        <NoImageIcon />
        <span className="text-[14px] font-medium text-neutral-500">신고에 의해 숨김 처리 되었습니다.</span>
      </div>
    );
  }

  const handleReportClick = () => {
    const isLogin = getCookie('AUTH_TOKEN_KEY');
    if (!isLogin) {
      openLoginModal();
      return;
    }

    navigate(`/shop-review/report/${shopId}?reviewId=${review_id}`);
  };

  return (
    <div className="flex w-full flex-col items-start gap-[10px] pb-1">
      {is_mine ? (
        <div className="flex w-full flex-col items-start gap-1">
          <div className="text-primary-500 flex text-[12px]">
            <CheckBookMark />
            <span>내가 작성한 리뷰</span>
          </div>
          <div className="flex w-full items-center justify-between gap-[6px]">
            <span className="text-[16px] font-medium">{nick_name}</span>
            <div className="flex gap-[6px]">
              <Button color="darkGray" size="sm" className="text-[12px] !shadow-none">
                수정
              </Button>
              <Button color="darkGray" size="sm" className="text-[12px] !shadow-none">
                삭제
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[12px] text-neutral-500">
            <StarList average_rating={rating} />
            <span>{formatDate(created_at)}</span>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col items-start gap-1">
          <div className="flex w-full items-center justify-between">
            <span className="text-[16px] font-medium">{nick_name}</span>
            <button className="text-[14px] text-neutral-500" onClick={handleReportClick} disabled={is_reported}>
              신고하기
            </button>
          </div>
          <div className="flex items-center gap-3 text-[12px] text-neutral-500">
            <StarList average_rating={rating} />
            <span>{formatDate(created_at)}</span>
          </div>
        </div>
      )}
      <span className="flex text-[14px]">{content}</span>
      {image_urls?.length > 0 && (
        <div className="flex items-start gap-2">
          {image_urls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              className="h-[148px] w-[148px] rounded-[10px] bg-center bg-no-repeat object-cover"
            />
          ))}
        </div>
      )}

      {menu_names?.length > 0 && (
        <div className="flex w-full flex-wrap items-start gap-[10px]">
          {menu_names.map((name, idx) => (
            <span
              key={idx}
              className="border-primary-300 text-primary-300 flex inline-flex max-w-full items-center justify-center rounded-[5px] border px-[10px] py-[3px] text-[12px] break-words"
            >
              {name}
            </span>
          ))}
        </div>
      )}
      <LoginRequiredModal
        isOpen={loginModalOpen}
        onClose={closeLoginModal}
        title={`리뷰를 작성하기 위해\n로그인이 필요해요.`}
        subTitle={`리뷰작성은 회원만 사용 가능합니다.`}
      />
    </div>
  );
}
