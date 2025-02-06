import React, { useState, useEffect, useContext } from "react";

//components
import ConsultationCard from "../components/ConsultationCard";
//Hooks
import useTranslation from "../hooks/useTranslation";
//backend
import useSWR from "swr";
import { domain } from "../global/domain";
//services
import { fetcher } from "../services/fetcher";
import { Skeleton } from "@mui/material";

const ConsultationLayout = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const { data, error } = useSWR(
    `${domain}/coaching/consultations/manage/?is_published=true`,
    fetcher
  );
  console.log(data);

  return (
    <>
      <div className="py-6 lg:px-0 px-8 lg:max-w-[1200px] lg:mx-auto">
        <span className="lg:text-[36px] font-semibold lg:leading-[87px] text-primary text-[20px] leading-[36px] uppercase ">
          {t("consultations")}
        </span>
        {/* <div className=" border-b border-[#D8D8D8]"></div> */}
        {data && data.length !== 0 && (
          <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-20 gap-10 lg:py-24 py-10 ">
            {data &&
              data?.map((item) => (
                <ConsultationCard
                  key={item.id}
                  item={item}
                  setLoading={setLoading}
                />
              ))}
          </div>
        )}

        {!data && (
          <div className=" w-full grid lg:grid-cols-2 grid-cols-1 lg:gap-20 gap-10 lg:py-24 py-10">
            {Array.from(Array(4)).map((e, i) => (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={250}
                key={i}
              />
            ))}
          </div>
        )}

        {data && data.length === 0 && (
          <div className=" w-full flex justify-center items-center text-2xl text-[#9F9F9F] my-20">
            {t("No consultations yet")}.
          </div>
        )}
      </div>
    </>
  );
};

export default ConsultationLayout;
