import Card from "components/card";
import Slider from './Slider';
import { useEffect, useState } from 'react';

const Rapport = () => {
  const [image, setImage] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(json => setImage(json))
  }, [])
  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Rapport
        </h2>
      </div>
        
      <Slider image={image.slice(0,5)}/>

      <div className="md:mt-16 lg:mt-0 p-2">
        <textarea className='rounded-[15px] resize-none bg-[#F4F7FF] w-full p-4 shadow' placeholder='Ecrivez votre rapport...' name="text" id="" cols="30" rows="10"></textarea>
      </div>
  </Card>
  );
};

export default Rapport;