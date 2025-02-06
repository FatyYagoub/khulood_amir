import React from "react";
//next
import { useRouter } from "next/router";
import Link from "next/link";
//backend
import useSWR from "swr";
import { domain } from "../global/domain";

//services
import { fetcher } from "../services/fetcher";
//mui
import { Button } from "@mui/material";
//hooks
import useTranslation from "../hooks/useTranslation";

const ActivationLayout = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const search = router.asPath;

  const { data, error } = useSWR(
    `${domain}/users/verify-email?token=${search.split("=")[1]}`,
    fetcher
  );
  return (
    <div className="border-t border-[#D8D8D8]">
      <div className="py-20">
        {(data || error) && (
          <div className="flex flex-col items-center gap-8">
            {data && (
              <span className="max-w-[800px] font-medium text-[24px] text-[#565656] text-center">
                {t("your account got activated successfully")}
              </span>
            )}

            {error && (
              <>
                <span className="max-w-[800px] font-medium text-[24px] text-[#565656] text-center">
                  {t("the link is not working")}
                </span>

                <Button
                  onClick={() => router.push("/userReactivation")}
                  className="bg-[#0F114B] border border-[#0F114B] text-[#FFFFFF]  duration-300  capitalize"
                  sx={{
                    border: 1,
                    borderColor: "#0F114B",
                    color: "#FFFFFF ",
                    backgroundColor: "#0F114B",
                    borderRadius: "8px",
                    fontSize: "18px",
                    fontWeight: "500",
                    textTransform: "capitalize",
                    height: "60px",
                    px: "40px",
                    "&:hover": {
                      backgroundColor: "rgba(15, 17, 75, 0.9)",
                    },
                  }}
                  variant="contained"
                >
                  {t("reactivation")}
                </Button>
              </>
            )}

            <div className="flex flex-col gap-4 mt-8 w-[400px]">
              <Button
                onClick={() => router.push("/")}
                className="bg-white border border-[#0F114B] text-[#0F114B] ha:hover:bg-secondary ha:hover:text-white duration-300  capitalize"
                sx={{
                  border: 1,
                  borderColor: "#0F114B",
                  backgroundColor: "#FFFFFF",
                  color: "#0F114B",
                  borderRadius: "8px",
                  fontSize: "18px",
                  fontWeight: "500",
                  textTransform: "capitalize",
                  height: "60px",
                  px: "40px",
                  "&:hover": {
                    backgroundColor: "#0F114B",
                  },
                }}
                variant="contained"
              >
                {t("go to homepage")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivationLayout;
