import React, { useState } from "react";
import parse from "html-react-parser";

//mui
import Rating from "@mui/material/Rating";
//next
import Link from "next/link";
import { useRouter } from "next/router";
//hooks
import useTranslation from "../hooks/useTranslation";

const CourseCard = ({ img, courseDetail }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <div className="border border-[#9F9F9F] relative rounded-lg">
      {/* <div
        className={`absolute -bottom-[0.5px]  ${
          router.locale === "ar"
            ? "right-0  translate-x-[50%]"
            : "left-0  -translate-x-[50%]"
        } `}
      >
        <img
          src={img}
          alt="khuloud amir"
          className="w-[220px] h-[400px] object-cover lg:block hidden"
        />
      </div> */}
      <div className="flex md:flex-row flex-col gap-12 p-5 min-h-full">
        <img
          src={img}
          alt="course_img"
          className="md:object-cover object-contain md:max-w-[250px] lg:max-w-[350px] max-h-[200px] mx-auto md:max-h-[285px] lg:max-h-[385px]"
        />
        <div className="flex flex-col  gap-2 md:gap-6 rtl:text-right text-left">
          <div className="flex flex-col gap-2">
            <Link href="/content/paid/1">
              <span className="font-semibold text-secondary text-xl font-Poppins capitalize cursor-pointer">
                {courseDetail.title}
              </span>
            </Link>
            <Rating
              size="small"
              name="simple-controlled"
              readOnly
              value={courseDetail.total_rating}
            />
          </div>
          <div className="text-[#565656] text-sm max-w-[400px] z-30 relative md:pb-11">
            {isReadMore
              ? parse(courseDetail?.description?.slice(0, 150))
              : parse(courseDetail?.description)}

            {courseDetail?.description?.length > 150 && (
              <span
                className="font-semibold cursor-pointer"
                onClick={toggleReadMore}
              >
                {isReadMore ? t("read more") : t("show less")}
              </span>
            )}
          </div>

          <span
            onClick={() => {
              router.push(`/courses/content/${courseDetail.slug}`);
            }}
            className={`md:block hidden capitalize text-primary font-semibold 
            lg:text-[28px] text-xl  lg:leading-10  cursor-pointer
            ${router.locale === "ar" ? " mr-auto" : " ml-auto"}
            `}
          >
            {t("go to course")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
