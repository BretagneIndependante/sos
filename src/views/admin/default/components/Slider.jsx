import React from 'react';

const Slider = (props) => {
  return (
    <div>
      <div className=''>
        <ul className='m-2 gap-2 flex overflow-x-scroll '>
          {props.image.map((item) => <li key={item.id}><img className='max-w-none object-contain h-[300px] rounded-[15px]' src={item.url} alt="grjfqk" /></li>)}
        </ul>
      </div>
      {/* <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2  text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
      </button> */}
    </div>
  );
};

export default Slider;