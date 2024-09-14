import Card from "@/components/shared/Card";
import Filters from "@/components/shared/Filters";

const HomePage = () => {
  return (
    <main className="w-full flex flex-col">
      <Filters />

      <div className="wrapper mt-8">
        <div className="w-full flex flex-wrap gap-4">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
