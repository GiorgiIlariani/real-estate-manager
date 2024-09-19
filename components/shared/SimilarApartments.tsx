"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import { Navigation } from "swiper/modules";
import Card from "@/components/shared/Card";
import Image from "next/image";

const SimilarApartments = ({
  similarRealEstates,
}: {
  similarRealEstates: RealEstateListing[];
}) => {
  return (
    <>
      <div className="flex items-center gap-x-4">
        <button className="image-swiper-btn image-swiper-button-prev">
          <Image
            src="/assets/icons/icon-left.png"
            alt="left icon"
            width={30}
            height={30}
          />
        </button>
        <button className="image-swiper-btn image-swiper-button-next">
          <Image
            src="/assets/icons/icon-right.png"
            alt="right icon"
            width={30}
            height={30}
          />
        </button>
      </div>
      <Swiper
        mousewheel
        direction="horizontal"
        className="mySwiper"
        pagination={false}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        modules={[Navigation]}
        breakpoints={{
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          700: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        }}>
        {similarRealEstates.map((item) => (
          <SwiperSlide key={item.id}>
            <Card {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SimilarApartments;
