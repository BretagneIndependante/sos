import Card from "components/card";

const Description = () => {
    return (
        <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
            <div className="mb-auto flex items-center justify-between px-6">
            <h2 className="text-lg font-bold text-navy-700 dark:text-white">
                Description
            </h2>
            <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
            </button>
            </div>
  
        <div className="md:mt-16 lg:mt-0 h-full">
          <div className="h-full w-full xl:h-full p-2">
            <textarea readOnly className='h-full outline-none rounded-[15px] resize-none bg-[#F4F7FF] w-full p-4 shadow' name="text" id="" cols="30" rows="10">Je me baladais dans la rue lorsque j'ai aperçu ces 3 individus en train d'agresser une jeune femme.</textarea>
            </div>
        </div>
      </Card>
    );
};

export default Description;