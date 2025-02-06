import React, { useState, useEffect, useContext } from "react";

//components
import BlogCard from "../components/BlogCard";
//Hooks
import useTranslation from "../hooks/useTranslation";
//backend
import useSWR from "swr";
import { domain } from "../global/domain";
//services
import { fetcher } from "../services/fetcher";
import { Skeleton } from "@mui/material";
//MUI
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import cn from "classnames";

const BlogLayout = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const [blogsUrl, setBlogsUrl] = useState(`${domain}/blog/posts/`);

  const { data: categories } = useSWR(`${domain}/blog/categories/`, fetcher);
  console.log(categories);
  const { data, error } = useSWR(blogsUrl, fetcher);
  const [currentCategory, setCurrentCategory] = useState(t("all"));

  const [menuOpen, setMenuOpen] = useState(false);
  let menuStyle = cn("relative cursor-pointer", { dropdownBlog: menuOpen });

  let menuItemsStyle = cn(
    "mt-4 w-full  bg-white text-primary rounded p-2 absolute  top-8 shadow-xl z-[999]",
    {
      dropdownContentBlog: menuOpen,
    }
  );

  console.log(data);
  return (
    <div className="lg:py-8 py-5 lg:px-0 px-8 lg:max-w-[1200px] lg:mx-auto">
      <div className="flex justify-between items-center">
        <span className="lg:text-[36px] font-semibold lg:leading-[87px] text-primary text-[20px] leading-[36px] uppercase ">
          {t("blogs")}
        </span>
        <div className={` ${menuStyle}`}>
          <button
            onClick={() => {
              setMenuOpen(!menuOpen), console.log(menuOpen);
            }}
            className="self-start flex flex-row items-center justify-center gap-2 bg-primary text-white font-extrabold p-2 px-8 rounded text-sm lg:text-base outline-none focus:outline-none "
          >
            <KeyboardArrowDownIcon />
            <span> {currentCategory} </span>
          </button>
          <div className={`${menuItemsStyle} ${menuOpen ? "block" : "hidden"}`}>
            {console.log(categories)}
            {categories &&
              [{ id: 0, title: t("all") }, ...categories].map((category) => (
                <div
                  onClick={() => {
                    if (category.id === 0) {
                      setBlogsUrl(`${domain}/blog/posts/`);
                      setMenuOpen(!menuOpen);
                      setCurrentCategory(category.title);
                      return;
                    }

                    setBlogsUrl(
                      `${domain}/blog/posts/?category=${category.id}`
                    );
                    setMenuOpen(!menuOpen);
                    setCurrentCategory(category.title);
                    return;
                  }}
                  className="bg-white text-primary py-2 flex flex-cols gap-1 items-center justify-center cursor-pointer "
                >
                  <span className="text-sm text-center">{category.title}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className=" border-b border-[#D8D8D8] mt-6"></div>
      {data && data.length !== 0 && (
        <div className="flex justify-center">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-20 gap-10 lg:py-16 py-10 w-full   ">
            {data &&
              data.results.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
          </div>
        </div>
      )}

      {!data && (
        <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-20 gap-10 lg:py-16 py-10 w-full ">
          {Array.from(Array(4)).map((e, i) => (
            <Skeleton variant="rectangular" width="100%" height={350} key={i} />
          ))}
        </div>
      )}

      {data && data.length === 0 && (
        <div className=" w-full flex justify-center items-center text-2xl text-[#9F9F9F] my-20">
          {t("No blogs yet")}.
        </div>
      )}
    </div>
  );
};

export default BlogLayout;
