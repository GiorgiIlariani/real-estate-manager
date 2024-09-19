import { RemoveAppartmentModal } from "@/components/shared/RemoveAppartmentModal";
import SimilarApartments from "@/components/shared/SimilarApartments";
import { fetchEachRealEstate, fetchRealEstates } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";

const EachRealEstate = async ({ params }: { params: { id: string } }) => {
  const eachRealEstate: RealEstateListing = await fetchEachRealEstate(
    params.id
  );

  const realEstates: RealEstateListing[] = await fetchRealEstates();

  const {
    id,
    address,
    zip_code,
    price,
    area,
    bedrooms,
    image,
    is_rental,
    created_at,
    city,
    agent,
    description,
  } = eachRealEstate;

  const date = new Date(created_at);
  const formattedDate = `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${date
    .getFullYear()
    .toString()
    .slice(-2)}`;

  const similarRealEstates: RealEstateListing[] = realEstates.filter(
    (item) => item.city.region.id === city.region.id && item.id !== id
  );

  return (
    <main className="wrapper pt-16 pb-[228px]">
      <Link href="/">
        <Image
          src="/assets/icons/go-back.png"
          alt="location"
          width={20}
          height={20}
        />
      </Link>

      <div className="w-full mt-[29px]">
        <div className="flex gap-[68px]">
          <div className="flex flex-col gap-1 items-end relative">
            <span
              className="absolute bg-[#02152680] text-white p-[6px] rounded-[15px] left-[23px] top-[23px] 
            text-lg font-medium">
              {is_rental ? "ქირავდება" : "იყიდება"}
            </span>
            <Image
              src={image}
              alt="card image"
              width={839}
              height={670}
              className="w-[839px] h-[670px] object-cover"
            />

            <p className="text-[#808A93] text-base text-center mt-[14px]">
              გამოქვეყნების თარიღი {formattedDate}
            </p>
          </div>
          <div className="pt-[30px] pb-[42px] max-w-[503px] flex-1">
            <span className="text-[48px] font-bold">{price} ₾</span>
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex items-center gap-1">
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
              <div className="flex items-center gap-1">
                <Image
                  src="/assets/icons/area.png"
                  alt="area"
                  width={20}
                  height={20}
                />
                <p className="text-[#021526B2] text-base"> ფართი {area} მ</p>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/assets/icons/bed.png"
                  alt="location"
                  width={20}
                  height={20}
                />
                <p className="text-[#021526B2] text-base">
                  {" "}
                  საძინებელი {bedrooms}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/assets/icons/Vector (7).png"
                  alt="location"
                  width={20}
                  height={20}
                />
                <p className="text-[#021526B2] text-base">
                  საფოსტო ინდექსი {zip_code}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col">
              <p className="text-[#808A93] text-base">{description}</p>

              <div className="border border-[#DBDBDB] rounded-[8px] py-6 px-5 flex flex-col gap-4 mt-[50px]">
                <div className="flex items-center gap-[14px]">
                  <Image
                    src={agent.avatar}
                    alt="person"
                    width={72}
                    height={72}
                    className="rounded-[100px]"
                  />
                  <div className="flex flex-col gap-1">
                    <h5 className="text-base">
                      {agent.name} {agent.surname}
                    </h5>
                    <p className="text-sm text-[#676E76]">აგენტი</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/assets/icons/email.png"
                      alt="email"
                      width={16}
                      height={13}
                    />
                    <p className="text-sm text-[#808A93]">{agent.email}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/assets/icons/phone-number.png"
                      alt="phone number"
                      width={13}
                      height={13}
                    />
                    <p className="text-sm text-[#808A93]">{agent.phone}</p>
                  </div>
                </div>
              </div>

              <RemoveAppartmentModal id={id} />
            </div>
          </div>
        </div>
      </div>

      {/* similar blogs */}
      <div className="mt-[53px]">
        <h3 className="text-[32px] font-medium">ბინები მსგავს ლოკაციაზე</h3>
        <div className="w-full mt-[52px] relative">
          <SimilarApartments similarRealEstates={similarRealEstates} />
        </div>
      </div>
    </main>
  );
};

export default EachRealEstate;
