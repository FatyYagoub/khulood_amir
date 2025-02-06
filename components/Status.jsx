import React from "react";
import useTranslation from "../hooks/useTranslation";

const Status = ({ status, url }) => {
  const { t } = useTranslation();
  const redirect = () => {
    window.open(url, "_ blank");
  };
  return (
    <span
      onClick={() => url && redirect()}
      className={`
      text-xs
    ${
      status === "Confirmed"
        ? "bg-[#E0FFF0] text-[#00BC5F] font-semibold rounded-md py-1 px-[6px] capitalize"
        : status === "Canceled"
        ? "bg-[#FFEDED] text-[#FF0000] font-semibold rounded-md py-1 px-[6px] capitalize"
        : status === "Pending"
        ? "bg-[#FFF4D4] text-[#F8A608] font-semibold rounded-md py-1 px-[6px] capitalize"
        : status === "مرفوض"
        ? "bg-[#FFEDED] text-[#FF0000] font-semibold rounded-md py-1 px-[6px] capitalize"
        : status === "مقبول"
        ? "bg-[#E0FFF0] text-[#00BC5F] font-semibold rounded-md py-1 px-[6px] capitalize"
        : "text-[#A93396] underline uppercase font-bold cursor-pointer"
    }
  `}
    >
      {t(status)}
    </span>
  );
};

export default Status;
