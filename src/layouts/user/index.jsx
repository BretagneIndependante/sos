import VideoIcon from 'components/icons/VideoIcon';
import React, {useRef, useState, useEffect} from 'react';

const UserLayout = () => {
  const input  = useRef(null);

  const handleClick = () => {
    input.current.click();
  }

  const handleChange = (event) => {
    const file = event.target.files[0];
    // faire quelque chose avec le fichier sélectionné
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className='w-full max-w-md'>
        <form className='bg-white rounded-lg shadow-lg px-8 pt-6 pb-8 mb-4 flex flex-col justify center items-center'>
            <div>
              <button className='my-4 bg-brand-500 hover:bg-brand-700 text-white font-bold py-2 px-4 rounded-[12px] focus:outline-none focus:shadow-outline flex items-center w-full shadow-md hover:shadow-lg
              ease-in-out duration-200' onClick={handleClick}>
                {/*Une icone svg d'appareil photo et son path*/}
                <svg className='w-auto h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" fill='white'/></svg>
                <p className='mx-4 break-normal'>Prenez une photo</p>
              </button>
              <input ref={input} className="hidden" id="file_input" type="file" accept='image/*' onChange={handleChange}/>
            </div>
            <div>
              <textarea className='rounded-[15px] resize-none bg-[#F4F7FF] w-full p-4 shadow' name="description" placeholder='Décrivez les faits...' id="" cols="30" rows="10"></textarea>
              <button></button>
            </div>
            <div>
              <input className='my-4 bg-brand-500 hover:bg-brand-700 text-white font-bold py-2 px-4 rounded-[12px] focus:outline-none focus:shadow-outline flex w-full shadow-md hover:shadow-lg' type="submit" value="Submit"/>
            </div>
        </form>
      </div>
    </div>
  );
};

export default UserLayout;