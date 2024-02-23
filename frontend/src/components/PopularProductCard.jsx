import { Link } from "react-router-dom";
import { star } from "../assets/icons";

const PopularProductCard = ({ imgURL, name, price }) => {
  return (
    <Link
      className="flex flex-1 flex-col max-sm:w-full items-center"
      to={`/product/${name}`}
    >
      <div className="group h-full [perspective:1000px]">
        <div className="relative w-[282px] h-[282px] rounded-xl shadow-xl [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all duration-500">
          <div className="absolute inset-0">
            <img src={imgURL} alt={name} className="h-full w-full object-cover rounded-lg" />
            <div className="absolute top-3 left-3 flex justify-start items-center gap-2">
              <img src={star} alt="rating" width={24} height={24} />
              <p className="font-montserrat font-bold text-xl leading-normal text-slate-gray">
                (4.5)
              </p>
            </div>
          </div>
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex flex-col min-h-full items-center justify-center">
            <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin">
              {name}
            </h3>
            <p className="mt-2 font-semibold font-montserrat text-coral-red text-2xl leading-normal">
              {price}
            </p>
          </div>
        </div>
        </div>
      </div>

    </Link>
  );
};

export default PopularProductCard;
