import Card from "components/card";

const Map = () => {
  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Carte
        </h2>
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="h-[250px] w-full xl:h-[350px]">
        </div>
      </div>
    </Card>
  );
};

export default Map;
