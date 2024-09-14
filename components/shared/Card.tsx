import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = () => {
  return (
    <Link
      className="w-[384px] flex flex-col shadow-custom cursor-pointer"
      href="/">
      <Image
        src="/assets/images/card-img1.png"
        alt="card img"
        width={384}
        height={304}
        className="rounded-t-[14px]"
      />

      <div className="py-[22px] px-[25px]">
        <div className="flex flex-col gap-[6px] mt-[22px]">
          <span className="text-[28px] font-bold">80 000 ₾</span>
          <div className="flex gap-1 mt-[6px]">
            <Image
              src="/assets/icons/location-marker.png"
              alt="location"
              width={20}
              height={20}
            />

            <p className="text-base text-[#021526B2]">
              თბილისი, ი. ჭავჭავაძის 53
            </p>
          </div>

          <div className="flex gap-8 mt-5">
            <div className="flex gap-[5px]">
              <Image
                src="/assets/icons/bed.png"
                alt="location"
                width={20}
                height={20}
              />

              <p className="text-[#021526B2] text-base">2</p>
            </div>
            <div className="flex gap-[5px]">
              <Image
                src="/assets/icons/area.png"
                alt="area"
                width={20}
                height={20}
              />
              <p className="text-[#021526B2] text-base">55 მ</p>
            </div>
            <div className="flex gap-[5px]">
              <Image
                src="/assets/icons/Vector (7).png"
                alt="location"
                width={20}
                height={20}
              />
              <p className="text-[#021526B2] text-base">0160</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </Link>
  );
};

export default Card;
