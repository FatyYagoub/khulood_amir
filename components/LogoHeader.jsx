import Image from "next/image";
import Link from "next/link";
import React from "react";

const LogoHeader = () => {
  return (
    <div className="py-4">
      <div className="flex items-center justify-center">
        <Link href="/">
          <img
            width={122}
            height={178}
            src="/svg/logo.svg"
            alt="khulood amir"
          />
        </Link>
      </div>
    </div>
  );
};

export default LogoHeader;
