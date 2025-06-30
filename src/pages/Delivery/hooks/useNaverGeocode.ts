import { useEffect, useState } from 'react';

function useNaverGeocode(address: string) {
  const [coordinate, setCoordinate] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (!address) return;

    naver.maps.Service.geocode({ query: address }, (status, response) => {
      if (status !== naver.maps.Service.Status.OK) {
        alert('주소 변환 실패');
        return;
      }

      const result = response.v2.addresses[0];
      const lat = Number(result.y);
      const lng = Number(result.x);

      setCoordinate([lat, lng]);
    });
  }, [address]);

  return coordinate;
}

export default useNaverGeocode;
