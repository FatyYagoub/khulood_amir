import React, { useContext } from "react";

import { useRouter } from "next/router";

//services

import { fetcher } from "../services/fetcher";

//backend
import axios from "axios";
import useSWR, { mutate } from "swr";
import { domain } from "../global/domain";

//components
import BlogReviews from "../components/BlogReviews";

//other
import { storeContext } from "./../global/store";
import useTranslation from "../hooks/useTranslation";
import parse from "html-react-parser";

const ContentDetailsLayout = () => {
  const { t } = useTranslation();
  const { store } = useContext(storeContext);
  const router = useRouter();
  let slug = router.query.slug;

  const { data, error } = useSWR(
    `${domain}/blog/posts/details/${slug}`,
    fetcher
  );

  console.log(data);

  return (
    <div className="lg:py-8 py-5 lg:px-0 px-8">
      {data && (
        <div className="flex flex-col">
          <span className="lg:text-[36px] font-semibold lg:leading-[87px] text-primary text-[20px] leading-[36px] capitalize ">
            {data && data.title}
          </span>
          <span className="text-[#565656] text-xl leading-9 capitalize font-medium">
            {data && data.created_at.substring(0, 10)}
          </span>
          <div className="flex lg:flex-row flex-col lg:gap-16 gap-2 py-8">
            <img
              src={data?.image}
              alt="khuloud amir"
              className="w-full h-full max-w-[400px] max-h-[600px] border border-grey rounded"
            />
            <div className="w-full">
              {data && (
                <p className="text-sm text-[#565656] leading-7">
                  {parse(data?.content)}
                </p>
              )}
            </div>
          </div>

          {/* {data && store.isLogged && (
          <div className="w-full md:w-2/3 ">
            <BlogReviews
              slug={slug}
              blogId={data?.id}
              isLogged={store.isLogged}
            />
          </div>
        )} */}
        </div>
      )}
    </div>
  );
};

export default ContentDetailsLayout;
