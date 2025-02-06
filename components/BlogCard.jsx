import { useState, useContext } from "react";

import parse from "html-react-parser";

//mui
import Rating from "@mui/material/Rating";
//next
import Link from "next/link";
import { useRouter } from "next/router";
//translation
import useTranslation from "../hooks/useTranslation";

//services
import { getTheTokenFromStorage } from "../services/auth";
//backend
import axios from "axios";
import { domain } from "../global/domain";
import { Image } from "react-image-and-background-image-fade";

const BlogCard = ({ blog }) => {
  console.log(blog);
  let router = useRouter();

  const { t } = useTranslation();

  return (
    <div
      onClick={() =>
        router.push({
          pathname: `/blog/${blog.slug}`,
          query: {
            id: blog.id,
          },
        })
      }
      className="border border-[#9F9F9F] relative rounded-lg w-full max-w-[450px] cursor-pointer"
    >
      <div className="h-[250px] w-full">
        <img
          src={blog.image ? blog.image : "/images/default.jpg"}
          // src="/images/default.jpg"
          alt="blog-pic"
          width="100%"
          height="100%"
          className="h-[250px] w-full object-cover rounded-t-lg"
        />
      </div>
      <div className="p-2">
        <Content blog={blog} />
      </div>
    </div>
  );
};

export default BlogCard;

const Content = ({ blog }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const router = useRouter();

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const { t } = useTranslation();
  return (
    <div className={` px-4 lg:px-6 lg:pt-3 lg:pb-5 `}>
      <div
        className={`flex flex-col gap-1  ${
          router.locale === "ar"
            ? "text-right font-Cairo"
            : "text-left font-Poppins"
        } `}
      >
        <div className="w-full  flex flex-col ">
          <span className="font-semibold text-secondary text-xl capitalize cursor-pointer">
            {blog.title}
          </span>
          <div className="text-[#565656] text-sm max-w-[380px]  relative">
            {blog.created_at.substring(0, 10)}
          </div>
        </div>

        <span
          className={`text-primary font-semibold text-sm lg:text-base cursor-pointer  leading-10 hover:underline ${
            router.locale === "ar" ? "text-left" : "text-right"
          } `}
        >
          {t("Read more")}
        </span>
      </div>
    </div>
  );
};
