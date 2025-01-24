export const HeroHeadline = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-7 px-1 bg-blue-200 dark:bg-blue-950 rounded-[29px] border dark:border-blue-800  border-blue-300 justify-center items-center gap-2.5 inline-flex">
        <div className="px-2 justify-center items-center gap-2.5 flex">
          <div className="text-center">
            <span>
              Скидка 70% на все услуги 🔥
            </span>
          </div>
        </div>
      </div>
      <h1 className="text-center text-5xl font-bold">
        Привет! Меня зовут Лиана, я UI/UX Дизайнер
      </h1>
      <p className="text-center opacity-40">Меня нанимают чтобы сделать всё быстро и качественно</p>
    </div>
  );
};
