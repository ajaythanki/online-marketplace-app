const ItemCard = ({ title, thumbnail, price, description }) => {
  return (
    <div className="relative cursor-pointer p-2 rounded-md border shadow-xl transition-all duration-300 hover:scale-100">
      <div className="w-full overflow-hidden rounded-md bg-slate-400">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover object-center lg:h-80"
        />
      </div>
      <div className="flex my-4 px-3 justify-between">
        <div>
          <div className="flex justify-between">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="text-lg font-bold text-blue-500">${price}</p>
          </div>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
