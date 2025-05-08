import { AddressSearchResponse } from '@/types/api/roadAddress';

interface GetRoadNameAddressProps {
  keyword: string;
}

// TODO: 추후 백엔드와 협업 후 수정
export async function getRoadNameAddress({ keyword }: GetRoadNameAddressProps): Promise<AddressSearchResponse> {
  const queryParams = new URLSearchParams({
    confmKey: import.meta.env.VITE_DEVELOPMENT_ROAD_NAME_ADDRESS_KEY,
    keyword,
    resultType: 'json',
  });

  const res = await fetch(`/api/road-address?${queryParams.toString()}`);
  if (!res.ok) throw new Error('주소 검색 실패');

  return await res.json();
}
