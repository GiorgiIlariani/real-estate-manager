import Card from "@/components/shared/Card";
import Navbar from "@/components/shared/Navbar";
import { fetchRealEstates } from "@/lib/actions";

const HomePage = async () => {
  const realEstates: RealEstateListing[] = await fetchRealEstates();

  return (
    <main className="w-full flex flex-col">
      <Navbar />

      <div className="wrapper mt-8">
        <div className="w-full flex flex-wrap gap-4">
          {realEstates.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
