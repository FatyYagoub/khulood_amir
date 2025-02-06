import React from "react";
//next
import { useRouter } from "next/router";
import Link from "next/link";

//mui
import EastIcon from "@mui/icons-material/East";

//components
import OrderTable from "../components/OrderTable";

//hooks
import useTranslation from "../hooks/useTranslation";

const OrderLayout = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className=" py-10  lg:px-0 px-8 max-w-[1200px] mx-auto">
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
          {t("My Orders")}
        </span>
      </div>
      <OrderTable />
    </div>
  );
};

export default OrderLayout;
