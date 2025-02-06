import React, { useEffect, useState } from "react";
//next
import { useRouter } from "next/router";

//components
import SearchBox from "../components/SearchBox";
import InterviewCard from "../components/InterviewCard";
import Pagination from "../components/Pagination";

//mui
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

//backend
import useSWR, { mutate } from "swr";

//services
import { fetcher } from "../services/fetcher";

//Hooks
import useTranslation from "../hooks/useTranslation";
import { domain } from "../global/domain";
import { Skeleton } from "@mui/material";

const InterviewLayout = () => {
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [pagesize, setPagesize] = useState(6);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const skeleton = 6;
  const { t } = useTranslation();

  const { data } = useSWR(
    `${domain}/interviews/?search=${search ? search : ""}${
      filter === 0
        ? ""
        : filter
            .map((item) => `&tags=${item.id}`)
            .toString()
            .replaceAll(",", "")
    }&page=${page + 1}&page_size=${pagesize}`,
    fetcher
  );

  return (
    <div className=" lg:py-8 py-5  lg:max-w-[1200px] lg:mx-auto lg:px-0 px-8">
      <span className="lg:text-[36px] font-semibold lg:leading-[87px] text-primary text-[20px] leading-[36px] uppercase ">
        {t("interviews")}
      </span>
      <SearchBox
        setFilter={setFilter}
        filter={filter}
        search={search}
        setSearch={setSearch}
        setPage={setPage}
      />
      <div className="py-8">
        <div className="border-b border-[#D8D8D8] py-3">
          {data && (data?.previous || data?.next) && (
            <Pagination
              data={data}
              pagesize={pagesize}
              setPage={setPage}
              page={page}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center">
        {data && data.length !== 0 && (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
            {data &&
              Array.isArray(data.results) &&
              data?.results?.map((meet) => (
                <InterviewCard
                  key={meet.id}
                  meet={meet}
                  setFilter={setFilter}
                  filter={filter}
                  setPage={setPage}
                ></InterviewCard>
              ))}
          </div>
        )}

        {!data && (
          <div className=" w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
            {Array.from(Array(skeleton)).map((e, i) => (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={300}
                key={i}
              />
            ))}
          </div>
        )}
      </div>
      <div className="py-8">
        <div className="border-t border-[#D8D8D8] py-5">
          {data && (data?.previous || data?.next) && (
            <Pagination
              data={data}
              pagesize={pagesize}
              setPage={setPage}
              page={page}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewLayout;
