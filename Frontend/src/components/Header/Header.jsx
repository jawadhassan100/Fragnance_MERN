import { BsTicketPerforated } from "react-icons/bs";

const Header = () => {

  return (
    <div className="">

    <div
      className="bg-black text-white flex justify-center items-center overflow-hidden py-5"
      style={{ position: "relative" }}
    
    >
      <div className="flex items-center gap-2 px-4">
        <BsTicketPerforated />
        <p className="text-[10px] md:text-xs lg:text-xs">
          30% off storewide — Limited time!
        </p>
      </div>
    </div>
    </div>
  );
};

export default Header;