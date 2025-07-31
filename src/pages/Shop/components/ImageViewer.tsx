import { Navigation, Pagination, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ShopInfoSummaryResponse } from '@/api/shop/entity';
import Portal from '@/components/Portal';

import 'swiper/swiper-bundle.css';

interface ImageViewerProps {
  images: ShopInfoSummaryResponse['images'];
  onClose: () => void;
}

export default function ImageViewer({ images, onClose }: ImageViewerProps) {
  return (
    <Portal>
      <div className="bg-opacity-90 fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black">
        <button className="absolute top-4 right-4 z-50 h-7 w-7 text-2xl text-white" onClick={onClose}>
          ✕
        </button>
        <Swiper
          zoom={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Zoom, Navigation, Pagination]}
          style={
            {
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            } as React.CSSProperties
          }
          className="flex h-full w-full items-center justify-center"
        >
          {images.map((image) => (
            <SwiperSlide key={image.image_url} className="flex items-center justify-center">
              <div
                className="swiper-zoom-container flex h-full w-full items-center justify-center"
                key={image.image_url}
              >
                <img src={image.image_url} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Portal>
  );
}
