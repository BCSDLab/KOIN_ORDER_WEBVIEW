import { useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import AddToCartBottomModal from '../components/AddToCartBottomModal';
import Header from '../components/Header';
import ImageCarousel from '../components/ImageCarousel';
import LoginRequiredModal from '../components/LoginRequiredModal';
import MenuCounter from '../components/MenuCounter';
import MenuDescription from '../components/MenuDescription';
import MenuOptions from '../components/MenuOptions';
import MenuPriceSelects from '../components/MenuPriceSelects';
import NoticeModal from '../components/NoticeModal';
import ResetModal from '../components/ResetModal';
import useAddCart from '../hooks/useAddCart';
import { useGetShopMenuDetail } from '../hooks/useGetShopInfo';
import { useMenuSelection } from '../hooks/useMenuSelection';
import useGetCartItemOptions from '@/pages/Cart/hooks/useGetCartItemOptions';
import useUpdateCartItemOptions from '@/pages/Cart/hooks/useUpdateCartItemOptions';
import useCart from '@/pages/Payment/hooks/useCart';
import { useOrderStore } from '@/stores/useOrderStore';
import useBooleanState from '@/util/hooks/useBooleanState';
import { useToast } from '@/util/hooks/useToast';

export default function MenuDetail() {
  const { shopId, menuId } = useParams();

  if (!shopId) {
    throw new Error('Shop ID is required');
  }

  const [searchParams] = useSearchParams();
  const editCartItemId = searchParams.get('editCartItemId');
  const isEdit = !!editCartItemId;

  const targetRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const { showToast } = useToast();

  const { orderType } = useOrderStore();
  const { data: cartInfo } = useCart(orderType);
  const { data: menuInfo } = useGetShopMenuDetail(Number(shopId), Number(menuId));
  const { data: editInfo } = useGetCartItemOptions(Number(editCartItemId), isEdit);
  const { mutate: addToCart } = useAddCart();
  const { mutate: updateCartItemOptions } = useUpdateCartItemOptions(Number(editCartItemId));

  const [isResetModalOpen, openResetModal, closeResetModal] = useBooleanState(false);
  const [isNoticeModalOpen, openNoticeModal, closeNoticeModal] = useBooleanState(false);
  const [noticeMessage, setNoticeMessage] = useState('');
  const [isLoginRequiredModalOpen, openLoginRequiredModal, closeLoginRequiredModal] = useBooleanState(false);

  const info = isEdit && editInfo ? editInfo : menuInfo;

  const AUTH_FAIL = ''; //이 케이스는 올바르지 않은 인증정보일 떄 발생합니다. 백엔드 작업이 끝난 후에 다시 작업해야함.
  const totalQuantity = cartInfo.items.reduce((sum, item) => sum + item.quantity, 0);
  const {
    priceId,
    count,
    selectedOptions,
    selectPrice,
    selectOption,
    increaseCount,
    decreaseCount,
    totalPrice,
    isAllRequiredOptionsSelected,
    addToCartRequest,
    updateCartItemOptionsRequest,
  } = useMenuSelection(shopId, info, isEdit);

  const imagesForCarousel = info.images.map((image) => ({
    image_url: image,
    is_thumbnail: false,
  }));

  const handleAddToCart = () => {
    if (isEdit && 'orderable_shop_menu_price_id' in updateCartItemOptionsRequest) {
      updateCartItemOptions(updateCartItemOptionsRequest, {
        onSuccess: () => {
          showToast('메뉴 옵션이 변경되었습니다.');
          navigate(-1);
        },
      });
    } else if ('menuInfo' in addToCartRequest) {
      addToCart(addToCartRequest, {
        onSuccess: () => {
          showToast('장바구니에 담았습니다');
          navigate(-1);
        },
        onError: (error) => {
          const parsed = JSON.parse(error.message);
          switch (parsed.code) {
            case 'DIFFERENT_SHOP_ITEM_IN_CART':
              openResetModal();
              break;
            case 'MENU_SOLD_OUT':
              setNoticeMessage('영업시간이 아니라서\n장바구니에 담을 수 없어요.');
              openNoticeModal();
              break;
            case AUTH_FAIL: //이 케이스는 올바르지 않은 인증정보일 떄 발생합니다.
              openLoginRequiredModal();
              break;
            default:
              setNoticeMessage(parsed.message);
              openNoticeModal();
              break;
          }
        },
      });
    }
  };

  return (
    <div>
      <Header name={info.name} targetRef={targetRef} cartItemCount={totalQuantity} />
      <ImageCarousel images={imagesForCarousel} targetRef={targetRef} />
      <MenuDescription name={info.name} description={info.description} price={info.prices[0].price} />
      <div className="mb-40 px-6">
        {menuInfo.prices.length > 1 && (
          <MenuPriceSelects prices={info.prices} selectedPriceId={priceId} selectPrice={selectPrice} />
        )}
        <MenuOptions optionGroups={info.option_groups} selectedOptions={selectedOptions} selectOption={selectOption} />
        <MenuCounter count={count} increaseCount={increaseCount} decreaseCount={decreaseCount} />
      </div>
      <AddToCartBottomModal
        price={totalPrice}
        isActive={isAllRequiredOptionsSelected}
        onAddToCart={() => handleAddToCart()}
        isEdit={isEdit}
      />
      <ResetModal isOpen={isResetModalOpen} onClose={closeResetModal} />
      <NoticeModal isOpen={isNoticeModalOpen} onClose={closeNoticeModal} message={noticeMessage} />
      <LoginRequiredModal
        isOpen={isLoginRequiredModalOpen}
        onClose={closeLoginRequiredModal}
        menuOptions={'menuInfo' in addToCartRequest ? addToCartRequest : undefined}
      />
    </div>
  );
}
