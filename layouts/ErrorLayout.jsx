import React from "react";

//mui
import { Button } from "@mui/material";
import Link from "next/link";
import useTranslation from "../hooks/useTranslation";

const ErrorLayout = () => {
  const { t } = useTranslation();
  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-8">
        <img
          src="/svg/notfound.svg"
          alt="logo"
          className=" object-cover lg:w-[440px] lg:h-[440px] w-[200px] h-[200px]"
        />
        <span className="max-w-[800px] font-medium text-[24px] text-[#565656] text-center">
          {t("Page not found")}
        </span>
        <span className="max-w-[800px] font-medium text-[16px]  text-center">
          {t("We couldn’t find the page you were looking for")}
        </span>
        <div className="flex flex-col items-center gap-4 mt-8 w-[400px]">
          <Link href="/">
            <Button
              className="bg-white border border-secondary text-secondary ha:hover:bg-secondary ha:hover:text-white duration-300  capitalize"
              sx={{
                border: 1,
                borderColor: "#0F114B",
                color: "#0F114B ",
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "500",
                height: "60px",
                px: "40px",
                "&:hover": {
                  backgroundColor: "#0F114B",
                  color: "#FFFFFF",
                },
              }}
              variant="contained"
            >
              {t("go to home")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorLayout;
