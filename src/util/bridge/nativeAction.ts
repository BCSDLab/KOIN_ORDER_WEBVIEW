import { NativeBridge } from './bridge';

/*
  뒤로가기 함수 : 브라우저 히스토리는 웹에서 관리 필요
  네이티브 구현 상황
  iOS : 호출 시 웹뷰 종료
  Android : {
    payment에서 호출 시 : 장바구니 페이지로 이동
    orderCancel, result에서 호출 시 : 웹뷰 종료(상점 목록 화면으로 이동)
    기타 : 이전 히스토리 이동 / 히스토리 없을 경우 상점 목록 화면으로 이동
  }
*/
export const backButtonTapped = async () => {
  await NativeBridge.call('navigateBack');
};

/*
  로그인 리다이렉트 함수 (TODO: iOS 메뉴 담기 페이지 구현 완료 시 삭제)
  네이티브 구현 상황
  iOS : 웹뷰 페이지 유지하면서 웹뷰 페이지 위에 로그인 페이지 표시
  Android : 미구현
*/
export const redirectToLogin = async () => {
  await NativeBridge.call('redirectToLogin');
};

export const goToShopDetail = async (shopId: number) => {
  await NativeBridge.call('goToShopDetail', shopId);
};
