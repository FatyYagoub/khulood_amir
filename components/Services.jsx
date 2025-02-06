import React from "react";
import useTranslation from "../hooks/useTranslation";

const Services = () => {
  const { t } = useTranslation();
  return (
    <div className="lg:py-10 max-w-[360px] md:max-w-[700px] lg:max-w-full">
      <div className="flex flex-col items-center">
        {/* <span className="lg:text-[40px] text-3xl font-medium leading-[33px] lg:leading-[53px] text-center max-w-[1100px]">
          {t(
            "Start a life coaching cycle that will change your entire life, right now"
          )}
        </span> */}
      </div>
    </div>
  );
};

export default Services;
