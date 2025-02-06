import React from "react";
import { useRouter } from "next/router";

//MUI
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ButtonBase } from "@mui/material";

//hooks
import useTranslation from "../hooks/useTranslation";

const Pagination = ({ data, pagesize, setPage, page }) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="flex flex-row items-center justify-end w-full gap-x-2 lg:gap-x-4 ">
      <ButtonBase
        onClick={() => {
          if (data?.previous) setPage(page - 1);
        }}
        disabled={!data?.previous}
      >
        {router.locale === "ar" ? (
          <ArrowForwardIosIcon
            style={{ color: `${data?.previous ? "#A93396" : "#e0e0eb"}` }}
            fontSize="small"
          />
        ) : (
          <ArrowBackIosIcon
            style={{ color: `${data?.previous ? "#A93396" : "#e0e0eb"}` }}
            fontSize="small"
          />
        )}
      </ButtonBase>
      <span className="text-sm md:text-base capitalize ">
        {t("page")}: {page + 1}
        {data?.count && Math.ceil(data?.count / pagesize) > 1
          ? " " + t("of") + " " + Math.ceil(data.count / pagesize)
          : " " + t("of") + " " + 1}
      </span>
      <span className=" text-sm md:text-base capitalize ">
        ({data?.count ? data?.count : 0} {t("results found")} )
      </span>
      <ButtonBase
        onClick={() => {
          if (data?.next) setPage(page + 1);
        }}
        disabled={!data?.next}
      >
        {router.locale === "ar" ? (
          <ArrowBackIosIcon
            style={{ color: `${data?.next ? "#A93396" : "#e0e0eb"}` }}
            fontSize="small"
          />
        ) : (
          <ArrowForwardIosIcon
            style={{ color: `${data?.next ? "#A93396" : "#e0e0eb"}` }}
            fontSize="small"
          />
        )}
      </ButtonBase>
    </div>
  );
};

export default Pagination;
