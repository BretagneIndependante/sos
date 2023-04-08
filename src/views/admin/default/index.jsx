import Map from "views/admin/default/components/Map";
import Description from "views/admin/default/components/Description";
import Chat from './components/chat';
import Rapport from './components/Rapport';

const Dashboard = () => {
  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <Map lat="-1.6777926" long="48.117266" />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Chat/>
        <Description/>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5">
        <Rapport />
      </div>
    </div>
  );
};

export default Dashboard;
