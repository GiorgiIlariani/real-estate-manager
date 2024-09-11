import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="border-b border-[#DBDBDB]">
      <div className="wrapper py-[38px]">
        <Image
          src="/assets/images/redberry-logo.png"
          alt="redberry logo"
          width={150}
          height={24}
        />
      </div>
    </header>
  );
};

export default Header;
