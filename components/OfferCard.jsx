import React from "react";
import Link from "next/link";
import useTranslation from "../hooks/useTranslation";

const OfferCard = () => {
  const { t } = useTranslation();

  const data = [
    {
      title: t("Join our online sessions for an unlimited knowledge."),
      link: "/",
      p: t("A bunch of free courses that you can register to develop different areas of your life"),
    },
    {
      title: t("We could  provide you with the  consultation that you need."),
      link: "/",
      p: t("Driven courses with accurate and realistic content to help you expand your choices for a better life"),
    },
    {
      title: t("Book a spot in a life-changing experience."),
      link: "/",
      p: t("Periodic meetings to raise awareness and develop your personal potential in a practical way"),
    },
  ];
  return (
    <div className="flex justify-center items-center lg:pt-0 pt-10 max-w-[360px] md:max-w-[700px] lg:max-w-full ">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-10">
        {data.map((item, index) => (
          // <Link key={index} href={item.link}>
          <div className=" lg:max-w-auto max-w-[360px] h-full border border-[#9F9F9F] py-7 px-9 rounded-lg cursor-pointer bg-white hover:bg-primary text-[#929292] hover:text-white  duration-300 ease-in-out ha:hover:scale-[1.1]">
            <div className="flex flex-col text-start gap-6 ">
              {/* <div className="group-hover:h-auto h-20">
                {<h1 className="text-primary group-hover:text-white lg:text-[28px] text-[20px] font-semibold leading-10 duration-300 group-hover:line-clamp-none line-clamp-2">
                  {item.title}
                </h1>}
              </div> */}
              {/* <span className="text-[#565656] lg:text-lg text-sm font-medium group-hover:text-white duration-300">
                {item.subtitle}
              </span> */}
              <p className=" lg:text-base text-xs ">
                {item.p}
              </p>
            </div>
          </div>
          // </Link>
        ))}
      </div>
    </div>
  );
};

export default OfferCard;
