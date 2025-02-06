import React from "react";
import { useRouter } from "next/router";

//mui
import EastIcon from "@mui/icons-material/East";
import Link from "next/link";

//components
import SessionTable from "../components/SessionTable";

//hooks
import useTranslation from "../hooks/useTranslation";

const SessionOwnedLayout = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="py-10 lg:px-0 px-8 max-w-[1200px] mx-auto">
      <div className="flex items-center gap-5 border-b border-[#D8D8D8] pb-10">
        <Link href="/">
          <EastIcon
            size="small"
            sx={{
              rotate: router.locale !== "ar" && "180deg",
              color: "#292D32",
              cursor: "pointer",
            }}
          />
        </Link>
        <span className="capitalize lg:text-[48px] font-semibold lg:leading-[87px] text-primary text-[20px] leading-[36px]">
          {t("My Sessions")}
        </span>
      </div>
      <SessionTable />
    </div>
  );
};

export default SessionOwnedLayout;
