import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="border-b border-[#DBDBDB]">
      <div className="wrapper py-[38px]">
        <Link href="/">
          <Image
            src="/assets/images/redberry-logo.png"
            alt="redberry logo"
            width={150}
            height={24}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
