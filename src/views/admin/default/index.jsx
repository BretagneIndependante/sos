import Map from "views/admin/default/components/Map";

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5">
        <Map />
      </div>
    </div>
  );
};

export default Dashboard;
