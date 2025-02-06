import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

//mui
import EastIcon from "@mui/icons-material/East";

//components
import AllCourses from "../components/AllCourses";
//hooks
import useTranslation from "../hooks/useTranslation";

const CourseLayout = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="lg:py-8 py-5 max-w-[1200px] lg:mx-auto lg:px-0 px-8">
      <div className="flex items-center gap-5 border-b border-[#D8D8D8] pb-4 ">
        <Link href="/">
          <EastIcon
            size="small"
            sx={{
              rotate: router.locale !== "ar" && "180deg",
              color: "#292D32",
            }}
          />
        </Link>
        <span className="capitalize lg:text-[36px] font-semibold lg:leading-[87px] text-primary text-[20px] leading-[36px]">
          {t("All my courses")}
        </span>
      </div>
      <AllCourses />
    </div>
  );
};

export default CourseLayout;
