import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({
  id,
  address,
  zip_code,
  price,
  area,
  bedrooms,
  image,
  is_rental,
  city,
}: RealEstateListing) => {
  return (
    <Link
      className="w-[384px] flex flex-col shadow-custom cursor-pointer relative rounded-t-[14px]"
      href={`real-estate/${id}`}>
      <span className="absolute bg-[#02152680] text-white p-[6px] rounded-[15px] left-[23px] top-[23px] text-xs font-medium">
        {is_rental ? "ქირავდება" : "იყიდება"}
      </span>
      <Image
        src={image}
        alt="card img"
        width={384}
        height={307}
        className="rounded-t-[14px] w-[384px] h-[307px] object-cover"
      />

      <div className="py-[22px] px-[25px]">
        <div className="flex flex-col gap-[6px] mt-[22px]">
          <span className="text-[28px] font-bold">{price}</span>
          <div className="flex gap-1 mt-[6px]">
            <Image
              src="/assets/icons/location-marker.png"
              alt="location"
              width={20}
              height={20}
            />

            <p className="text-base text-[#021526B2]">
              {city?.name}, {address}
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

              <p className="text-[#021526B2] text-base">{bedrooms}</p>
            </div>
            <div className="flex gap-[5px]">
              <Image
                src="/assets/icons/area.png"
                alt="area"
                width={20}
                height={20}
              />
              <p className="text-[#021526B2] text-base">{area}</p>
            </div>
            <div className="flex gap-[5px]">
              <Image
                src="/assets/icons/Vector (7).png"
                alt="location"
                width={20}
                height={20}
              />
              <p className="text-[#021526B2] text-base">{zip_code}</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </Link>
  );
};

export default Card;
