import React, { useState, useContext } from "react";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import Link from "next/link";
//store
import { storeContext } from "../global/store";
//backend
import useSWR from "swr";
import { domain } from "../global/domain";
//services
import { fetcher } from "../services/fetcher";

//hooks
import useTranslation from "../hooks/useTranslation";

//components

import InterviewReviews from "../components/InterviewReviews";
import { Skeleton } from "@mui/material";

const InterviewDetailsLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { store, setStore } = useContext(storeContext);
  const slug = router.query.slug;

  const { t } = useTranslation();

  const { data, error } = useSWR(
    `${domain}/interviews/details/${slug}`,
    fetcher
  );
  // console.log(data);

  const url = data?.video.replace("watch?v=", "embed/");
  return (
    <div className="lg:py-8 py-5 lg:max-w-[1200px] lg:mx-auto lg:px-0 px-8">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col lg:gap-2">
          <span className="lg:text-[36px] text-xl font-semibold lg:leading-[87px] leading-[50px] text-primary uppercase">
            {t("interviews")}
          </span>
          <span className="lg:text-xl text-base font-medium text-[#565656]">
            {data?.title}
          </span>
        </div>
        <div className="w-full lg:h-[680px] h-[300px]">
          {!data ? (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          ) : (
            <iframe
              style={{
                borderRadius: "8px",
              }}
              width="100%"
              height="100%"
              src={url}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          )}
        </div>
        <div className="flex lg:flex-col flex-col-reverse">
          <div className="flex lg:flex-row lg:gap-0 gap flex-col justify-between lg:items-center pt-9 lg:pb-0 pb-8">
            <span className="text-black font-semibold text-[25px] leading-9 lg:block hidden">
              {data?.title}
            </span>
            <Link href="https://www.youtube.com/channel/UCleMdeARb2uFmumjYvPo7Xw?sub_confirmation=1">
              <button className="py-3 px-10 text-primary border border-primary rounded-lg text-base capitalize ha:hover:bg-primary ha:hover:text-white">
                {t("subscribe")}
              </button>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-black font-semibold text-[25px] leading-9 lg:hidden block">
              {data?.title}
            </span>
            <p className="pt-6 text-base text-black font-normal">
              {data?.description}
            </p>
          </div>
        </div>
        <InterviewReviews
          key={data?.id}
          setLoading={setLoading}
          isLogged={store.isLogged}
          interviewId={data?.id}
          interviewSlug={slug}
        />
      </div>
    </div>
  );
};

export default InterviewDetailsLayout;
