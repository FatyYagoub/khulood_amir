import React, { useState, useContext } from "react";
import { storeContext } from "../global/store";

//mui
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
//next
import { useRouter } from "next/router";
import { toast } from "react-nextjs-toast";
//Hooks
import useTranslation from "../hooks/useTranslation";
//services
import { bookSession } from "../services/session";
import { getTheTokenFromStorage } from "../services/auth";

const SessionCard = ({ item, setLoading }) => {
  const router = useRouter();

  const { store, setStore } = useContext(storeContext);
  const { t } = useTranslation();
  return (
    <div className="border border-[#9F9F9F] rounded-lg px-3 md:px-9 py-8 w-full">
      <div key={item.id} className="flex flex-col gap-9">
        <div className="flex items-center justify-between">
          <span className="font-medium text-secondary leading-6 text-sm uppercase px-2  ">
            {t("Zoom Meetings")}
          </span>
          <div className="flex items-center gap-3">
            <GroupIcon size="small" />
            <span className="text-sm text-secondary font-medium">
              {" "}
              {item.participants_count}
            </span>
          </div>
        </div>
        <div className=" relative flex gap-4 md:gap-9 justify-start ">
          <div className="w-20 h-20 md:w-44 md:h-44 bg-[#F6F6F6] rounded-lg">
            <div className=" w-full h-full">
              <img
                src={item.image ? item.image : "/svg/zoom.svg"}
                alt="zoom"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className=" flex flex-col  gap-2 md:gap-4">
            <span className="text-lg md:text-xl leading-9 text-secondary font-semibold">
              {item.title}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-xs md:text-sm text-[#565656]">
                {item.date}
              </span>
              <span className="text-xs md:text-sm text-[#565656]">
                {item?.time?.substring(0, 5)}
              </span>
            </div>

            <div className=" flex items-center justify-between mt-auto">
              <span className="text-sm md:text-2xl font-semibold text-primary leading-6">
                {item.is_paid ? item.price + "$" : t("Free")}
              </span>
              {item && (
                <div
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (!store.isLogged) {
                      router.push("/auth");
                      return;
                    }
                    if (item.is_full) {
                      toast.notify(t("This session is full"));
                      return;
                    }
                    if (item.is_paid) {
                      router.push({
                        pathname: `/check-out/`,
                        query: {
                          sessionId: item.id,
                          from: router.asPath,
                        },
                      });

                      return;
                    } else {
                      let res = await bookSession(
                        getTheTokenFromStorage(),
                        {
                          session: item.id,
                        },
                        router.locale
                      );

                      if (res && res.status === 200) {
                        setLoading(false);
                        toast.notify(res.data.message);
                        router.push("/session-owned");
                      } else {
                        setLoading(false);
                        toast.notify(
                          t("The operation was not completed successfully")
                        );
                      }
                    }
                  }}
                  className={`absolute  cursor-pointer ${
                    router.locale === "ar" ? "left-0" : "right-0"
                  }`}
                >
                  <ShoppingCartIcon
                    size="small"
                    sx={{
                      color: "#9F9F9F",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
