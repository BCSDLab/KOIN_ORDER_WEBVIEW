import { useNavigate } from 'react-router-dom';
import useDeleteCartItem from '../hooks/useDeleteCartItem';
import useUpdateCartItemQuantity from '../hooks/useUpdateCartItemQuantity';
import type { CartItem } from '@/api/cart/entity';
import Minus from '@/assets/Cart/minus-icon.svg';
import Plus from '@/assets/Cart/plus-icon.svg';
import Trash from '@/assets/Cart/trash-icon.svg';
import Button from '@/components/UI/Button';

interface CartItemProps {
  shopId: number;
  item: CartItem;
}

export default function CartItem({ shopId, item }: CartItemProps) {
  const navigate = useNavigate();
  const { mutate: deleteCartItem } = useDeleteCartItem();
  const { mutate: updateCartItemQuantity } = useUpdateCartItemQuantity();

  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="leading-[160%] font-semibold">{item.name}</div>
          <div className="text-[13px] leading-[160%] text-neutral-500">
            <div>가격 : {item.price.price.toLocaleString()}원</div>
            {item.options && item.options.length > 0 && (
              <div>
                {item.options.map((option, index) => (
                  <div key={index}>
                    {option.option_group_name} : {option.option_name}{' '}
                    {option.option_price > 0 && <>({option.option_price.toLocaleString()}원)</>}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="text-[15px] leading-[160%] font-semibold">{item.total_amount.toLocaleString()}원</div>
        </div>
        {item.menu_thumbnail_image_url && (
          <img
            src={item.menu_thumbnail_image_url}
            className="h-15 w-15 rounded-[5px] border-[0.5px] border-neutral-400"
            alt={`${item.name} thumbnail`}
          />
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button
          size="sm"
          color="gray"
          className="text-xs leading-[160%] font-normal text-neutral-600 shadow-none"
          onClick={() =>
            navigate(`/shop/${shopId}/menus/${item.orderable_shop_menu_id}?editCartItemId=${item.cart_menu_item_id}`)
          }
        >
          옵션 변경
        </Button>

        <div className="flex items-center gap-3 rounded-full border-[0.5px] border-neutral-300 bg-white px-2 py-1">
          {item.quantity === 1 ? (
            <button onClick={() => deleteCartItem(item.cart_menu_item_id)}>
              <Trash />
            </button>
          ) : (
            <button
              onClick={() =>
                updateCartItemQuantity({
                  cartMenuItemId: item.cart_menu_item_id,
                  quantity: item.quantity - 1,
                })
              }
            >
              <Minus />
            </button>
          )}

          <div className="text-xs text-neutral-600">{item.quantity}</div>

          <button
            onClick={() => {
              if (item.quantity < 10) {
                updateCartItemQuantity({
                  cartMenuItemId: item.cart_menu_item_id,
                  quantity: item.quantity + 1,
                });
              }
            }}
            disabled={item.quantity >= 10}
          >
            <Plus />
          </button>
        </div>
      </div>
    </>
  );
}
