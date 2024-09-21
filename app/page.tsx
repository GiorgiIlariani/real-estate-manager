import Card from "@/components/shared/Card";
import Navbar from "@/components/shared/Navbar";
import { fetchRealEstates, fetchRegions } from "@/lib/actions";

const HomePage = async ({
  searchParams,
}: {
  searchParams: {
    regions?: string;
    price?: string;
    area?: string;
    bedrooms?: string;
  };
}) => {
  const allRealEstates: RealEstateListing[] = await fetchRealEstates();
  const regions = await fetchRegions();

  // Filtering logic
  const filteredRealEstates = allRealEstates.filter((item) => {
    // If no filters are set, return all real estates
    if (
      !searchParams.regions &&
      !searchParams.price &&
      !searchParams.area &&
      !searchParams.bedrooms
    ) {
      return true; // Show all listings
    }

    let matches = false; // Start with false

    // Check regions
    if (searchParams.regions) {
      const selectedRegions = searchParams.regions.split(",").map(Number);
      if (selectedRegions.includes(item.city.region_id)) {
        matches = true; // Match found in regions
      }
    }

    // Check price
    if (searchParams.price) {
      const [minPrice, maxPrice] = searchParams.price.split("-").map(Number);
      if (item.price >= minPrice && item.price <= maxPrice) {
        matches = true; // Match found in price range
      }
    }

    // Check area
    if (searchParams.area) {
      const [minArea, maxArea] = searchParams.area.split("-").map(Number);
      if (item.area >= minArea && item.area <= maxArea) {
        matches = true; // Match found in area range
      }
    }

    // Check bedrooms
    if (searchParams.bedrooms) {
      const selectedBedrooms = Number(searchParams.bedrooms);
      if (item.bedrooms === selectedBedrooms) {
        matches = true; // Match found in bedrooms
      }
    }

    return matches; // Return true if at least one condition matched
  });

  return (
    <main className="w-full flex flex-col">
      <Navbar regions={regions} />

      <div className="wrapper mt-8 mb-[60px]">
        <div className="w-full flex flex-wrap gap-4">
          {filteredRealEstates.length === 0 ? (
            <div className="text-lg text-[#021526CC] font-normal mt-[65px]">
              აღნიშნული მონაცემებით განცხადება არ იძებნება
            </div>
          ) : (
            filteredRealEstates.map((item) => <Card key={item.id} {...item} />)
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
