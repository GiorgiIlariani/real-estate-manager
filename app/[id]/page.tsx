import { RemoveAppartmentModal } from "@/components/shared/RemoveAppartmentModal";
import SimilarApartments from "@/components/shared/SimilarApartments";
import Image from "next/image";
import Link from "next/link";

const EachApartment = ({ params }: { params: { id: string } }) => {
  console.log(params.id);

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
          <div className="flex flex-col gap-1 items-end">
            <Image
              src="/assets/images/card-img1.png"
              alt="card image"
              width={839}
              height={670}
              className=""
            />

            <p className="text-[#808A93] text-base text-center mt-[14px]">
              გამოქვეყნების თარიღი 08/08/24
            </p>
          </div>
          <div className="pt-[30px] pb-[42px] max-w-[503px]">
            <span className="text-[48px] font-bold">80, 458 ₾</span>
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex items-center gap-1">
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
              <div className="flex items-center gap-1">
                <Image
                  src="/assets/icons/area.png"
                  alt="area"
                  width={20}
                  height={20}
                />
                <p className="text-[#021526B2] text-base"> ფართი 55 მ</p>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/assets/icons/bed.png"
                  alt="location"
                  width={20}
                  height={20}
                />
                <p className="text-[#021526B2] text-base"> საძინებელი 2</p>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/assets/icons/Vector (7).png"
                  alt="location"
                  width={20}
                  height={20}
                />
                <p className="text-[#021526B2] text-base">
                  საფოსტო ინდექსი 0160
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col">
              <p className="text-[#808A93] text-base">
                იყიდება ბინა ჭავჭავაძის ქუჩაზე, ვაკეში. ბინა არის ახალი
                რემონტით, ორი საძინებლითა და დიდი აივნებით. მოწყობილია ავეჯითა
                და ტექნიკით.{" "}
              </p>

              <div className="border border-[#DBDBDB] rounded-[8px] py-6 px-5 flex flex-col gap-4 mt-[50px]">
                <div className="flex items-center gap-[14px]">
                  <Image
                    src="/assets/images/person.png"
                    alt="person"
                    width={72}
                    height={72}
                    className="rounded-[100px]"
                  />
                  <div className="flex flex-col gap-1">
                    <h5 className="text-base">სოფიო გელოვანი</h5>
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
                    <p className="text-sm text-[#808A93]">
                      sophio.gelovani@redberry.ge
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/assets/icons/phone-number.png"
                      alt="phone number"
                      width={13}
                      height={13}
                    />
                    <p className="text-sm text-[#808A93]">577 777 777</p>
                  </div>
                </div>
              </div>

              <RemoveAppartmentModal />
            </div>
          </div>
        </div>
      </div>

      {/* similar blogs */}
      <div className="mt-[53px]">
        <h3 className="text-[32px] font-medium">ბინები მსგავს ლოკაციაზე</h3>
        <div className="w-full mt-[52px] relative">
          <SimilarApartments />
        </div>
      </div>
    </main>
  );
};

export default EachApartment;
