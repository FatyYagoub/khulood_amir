import React, { useState, useEffect, useContext } from "react";

//components
import SessionCard from "../components/SessionCard";
//Hooks
import useTranslation from "../hooks/useTranslation";
//backend
import useSWR from "swr";
import { domain } from "../global/domain";
//services
import { fetcher } from "../services/fetcher";
import { Skeleton } from "@mui/material";

const SessionLayout = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const { data, error } = useSWR(
    `${domain}/coaching/sessions/manage/?is_published=true`,
    fetcher
  );

  console.log(data);
  return (
    <div className="lg:py-8 py-5 lg:px-0 px-8 lg:max-w-[1200px] lg:mx-auto">
      <span className="lg:text-[36px] font-semibold lg:leading-[87px] text-primary text-[20px] leading-[36px] uppercase ">
        {t("sessions")}
      </span>
      <div className=" border-b border-[#D8D8D8] mt-6"></div>
      {data && data.length !== 0 && (
        <div className="flex justify-center">
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-20 gap-10 lg:py-24 py-10 w-full md:w-3/4 lg:w-full  ">
            {data &&
              Array.isArray(data) &&
              data?.map((item) => (
                <SessionCard
                  key={item.id}
                  item={item}
                  setLoading={setLoading}
                />
              ))}
          </div>
        </div>
      )}

      {!data && (
        <div className=" w-full grid lg:grid-cols-2 grid-cols-1 lg:gap-20 gap-10 lg:py-24 py-10">
          {Array.from(Array(4)).map((e, i) => (
            <Skeleton variant="rectangular" width="100%" height={250} key={i} />
          ))}
        </div>
      )}
      {data && data?.length === 0 && (
        <div className=" w-full flex justify-center items-center text-2xl text-[#9F9F9F] my-20">
          {t("No sessions yet")}.
        </div>
      )}
    </div>
  );
};

export default SessionLayout;
