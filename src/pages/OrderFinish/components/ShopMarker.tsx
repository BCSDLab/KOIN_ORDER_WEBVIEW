interface ShopMarkerProps {
  map: naver.maps.Map;
  latitude: number;
  longitude: number;
  name: string;
}

export default function ShopMarker({ map, latitude, longitude, name }: ShopMarkerProps) {
  const styleId = 'shop-marker-style';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .shop-marker{
        position: relative;
      }
      .shop-marker-text{
        padding: 4px 12px;
        background: #CE86FD;
        color:#fff;
        font-weight: 600;
        font-size: 14px;
        line-height: 1.6;
        border-radius: 8px;
        white-space: nowrap;
        text-align: center;
        display: inline-block;
      }
      .shop-marker::after{
        content:"";
        position:absolute;
        left:50%;
        top:100%;
        transform: translateX(-50%);
        border-left:6px solid transparent;
        border-right:6px solid transparent;
        border-top:6px solid #CE86FD;
      }
    `;
    document.head.appendChild(style);
  }

  const el = document.createElement('div');
  el.className = 'shop-marker';

  const label = document.createElement('div');
  label.className = 'shop-marker-text';
  label.textContent = name;
  el.appendChild(label);

  el.style.visibility = 'hidden';
  el.style.position = 'absolute';
  el.style.left = '-99999px';
  document.body.appendChild(el);

  const ARROW_HEIGHT = 6;
  const anchorX = el.offsetWidth / 2;
  const anchorY = el.offsetHeight + ARROW_HEIGHT;

  document.body.removeChild(el);
  el.style.visibility = '';
  el.style.position = '';
  el.style.left = '';

  const marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(latitude, longitude),
    map,
    icon: { content: el, anchor: new naver.maps.Point(anchorX, anchorY) },
    animation: naver.maps.Animation.DROP,
  });

  return {
    marker,
    remove() {
      marker.setMap(null);
    },
  };
}
