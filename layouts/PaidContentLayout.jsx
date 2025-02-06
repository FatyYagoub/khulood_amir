import React, { useState } from "react";

//components
import SearchBox from "../components/SearchBox";
import ContentCard from "../components/ContentCard";
import Pagination from "../components/Pagination";

//Translation
import useTranslation from "../hooks/useTranslation";

//services
import { fetcher } from "../services/fetcher";

//backend
import { domain } from "../global/domain";
import useSWR, { mutate } from "swr";
import { Skeleton } from "@mui/material";

const PaidContentLayout = () => {
  const [page, setPage] = useState(0);
  const [pagesize, setPagesize] = useState(6);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const { data, error } = useSWR(
    `${domain}/courses/?is_paid=true&is_published=true&search=${
      search ? search : ""
    }&page=${page + 1}&page_size=${pagesize}`,
    fetcher
  );
  console.log(data);
  return (
    <div className="lg:py-8 py-5 lg:max-w-[1200px] lg:mx-auto lg:px-0 px-8">
      <span className="lg:text-[36px] font-semibold lg:leading-[87px] text-primary text-[20px] leading-[36px] uppercase">
        {t("paidContent")}
      </span>
      <SearchBox search={search} setSearch={setSearch} setPage={setPage} />
      <div className="lg:py-8">
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
      <div className="flex justify-center items-center  py-4">
        {data && data.length !== 0 && (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {data &&
              Array.isArray(data.results) &&
              data?.results?.map((course, i) => (
                <ContentCard
                  img={course.picture}
                  key={course.id}
                  course={course}
                />
              ))}
          </div>
        )}

        {!data && (
          <div className="  w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {Array.from(Array(4)).map((e, i) => (
              <Skeleton
                className="h-[450px]"
                variant="rectangular"
                width="100%"
                // height={450}
                key={i}
              />
            ))}
          </div>
        )}
        {data && data.results.length === 0 && (
          <div className=" w-full flex justify-center items-center text-2xl text-[#9F9F9F] my-20">
            {t("No courses yet")}.
          </div>
        )}
      </div>
    </div>
  );
};

export default PaidContentLayout;
