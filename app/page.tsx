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
    let matches = true;

    // Filter by regions
    if (searchParams.regions) {
      const selectedRegions = searchParams.regions.split(",").map(Number);
      matches = matches && selectedRegions.includes(item.city.region_id); // Adjust `item.regionId` based on your data structure
    }

    // Filter by price
    if (searchParams.price) {
      const [minPrice, maxPrice] = searchParams.price.split("-").map(Number);
      matches = matches && item.price >= minPrice && item.price <= maxPrice; // Adjust `item.price` based on your data structure
    }

    // Filter by area
    if (searchParams.area) {
      const [minArea, maxArea] = searchParams.area.split("-").map(Number);
      matches = matches && item.area >= minArea && item.area <= maxArea; // Adjust `item.area` based on your data structure
    }

    // Filter by bedrooms
    if (searchParams.bedrooms) {
      const selectedBedrooms = Number(searchParams.bedrooms);
      matches = matches && item.bedrooms === selectedBedrooms; // Adjust `item.bedrooms` based on your data structure
    }

    return matches;
  });

  return (
    <main className="w-full flex flex-col">
      <Navbar regions={regions} />

      <div className="wrapper mt-8 mb-[60px]">
        <div className="w-full flex flex-wrap gap-4">
          {filteredRealEstates.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
