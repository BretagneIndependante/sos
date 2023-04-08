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
            <textarea readOnly className='h-full outline-none rounded-[15px] resize-none bg-[#F4F7FF] w-full p-4 shadow' name="text" id="" cols="30" rows="10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit iusto temporibus ullam, veniam voluptate optio dolores praesentium eos exercitationem! Tenetur minima tempore officiis error quo eos. Nobis voluptas exercitationem temporibus tempore eum veniam accusantium sunt, doloribus perspiciatis. Atque in autem soluta, sequi neque, vero culpa dolor fugiat alias earum recusandae maiores dolorum ad ea libero consectetur tenetur cupiditate quibusdam. Minus asperiores iusto obcaecati hic, deserunt dolores at, soluta ullam ad dolore exercitationem? Magnam nulla reiciendis animi, quod voluptas ipsa quidem, corporis ratione odit praesentium error perspiciatis ea pariatur aperiam rem amet ducimus. Illo dolores quos sed laudantium a cumque, rerum quia sapiente iusto, natus, officia temporibus voluptatibus dolorem fuga vitae! Optio, cum voluptatibus? Quasi, ipsum minus illum accusamus consequuntur explicabo, sequi veniam repellendus dolorem sit laborum inventore necessitatibus odit soluta quod reiciendis aut perferendis enim sed! Placeat repudiandae blanditiis nesciunt?</textarea>
            </div>
        </div>
      </Card>
    );
};

export default Description;