import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import {
  TbSquareArrowLeftFilled,
  TbSquareArrowRightFilled,
} from "react-icons/tb";

type Props = {
  showNav: boolean;
  setShowNav: Dispatch<SetStateAction<boolean>>;
};

export const Header = ({ showNav, setShowNav }: Props) => {
  return (
    <section
      className={`fixed z-[9999] w-full h-24 bg-white flex items-center transition-all duration-[900ms] shadow-sm ${
        showNav ? "pl-[20%]" : "md:pl-20"
      }`}
    >
      <div className="flex justify-between w-full items-center flex-1 px-4 md:pr-12">
        <div className="flex items-center justify-center gap-5">
          {showNav ? (
            <button
              className="h-8 w-8 cursor-pointer text-gray-700 hover:text-orange-500 transition-colors ease-in-out duration-[900ms]"
              onClick={() => setShowNav((prev) => !prev)}
            >
              <TbSquareArrowLeftFilled size={24} />
            </button>
          ) : (
            <button
              className="h-8 w-8 cursor-pointer text-gray-700 hover:text-orange-500 transition-colors ease-in-out duration-[900ms]"
              onClick={() => setShowNav((prev) => !prev)}
            >
              <TbSquareArrowRightFilled size={24} />
            </button>
          )}
          <h1 className="font-bold text-2xl text-gray-800">TravelHunt</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-orange-500 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-orange-500 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-orange-500 transition-colors duration-200"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
};