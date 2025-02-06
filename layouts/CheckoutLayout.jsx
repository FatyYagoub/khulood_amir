import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-nextjs-toast";
//mui
import CloseIcon from "@mui/icons-material/Close";
import { FormControlLabel, Checkbox } from "@mui/material";
//backend
import useSWR from "swr";
import { domain } from "../global/domain";
//services
import { fetcherAuth } from "../services/fetcher";
import { deleteFromCart, clearCart } from "../services/cart";
import { getTheTokenFromStorage } from "../services/auth";
//hooks
import useTranslation from "../hooks/useTranslation";
//components
import StripeButton from "../components/checkout/StripeButton";
import PayButton from "../components/checkout/PayButton";

const CheckoutLayout = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const from = router.query.from;

  const token = getTheTokenFromStorage();

  // from cart

  const courses = JSON.parse(
    router.query?.courses ? router.query?.courses : null
  );
  // console.log("courses ", courses);
  const coursesData = router.query;
  // console.log(coursesData);

  //from session
  const sessionId = router.query?.sessionId;
  console.log(sessionId);
  const { data: sessionData } = useSWR(
    [
      `${domain}/coaching/sessions/manage/${sessionId}/`,
      getTheTokenFromStorage(),
    ],
    fetcherAuth
  );
  // console.log(sessionData);

  if (sessionData && sessionData.is_full) {
    toast.notify("This session is full" + "❌");
    router.push("/session");
  }

  // from consultation
  const consultationId = router.query?.consultation;

  const { data: consultationData } = useSWR(
    [
      `${domain}/coaching/consultations/manage/${consultationId}/`,
      getTheTokenFromStorage(),
    ],
    fetcherAuth
  );
  // console.log(consultationData);

  return (
    <>
      <div className=" lg:px-0 px-8 lg:max-w-[1200px] lg:mx-auto">
        <span className="lg:text-[36px] text-xl font-semibold leading-[87px] text-primary uppercase">
          {t("Checkout")}
        </span>
        <div className="flex gap-32 py-8">
          <div className="border-[0.4px] border-[#9F9F9F] rounded min-w-[516px]">
            <div className="py-10 px-11">
              <div className="flex flex-col">
                <span className="text-secondary font-semibold text-[30px] leading-10 pb-[40px]">
                  {t("Summary")}
                </span>
                {from === "/cart" && (
                  <div className="flex flex-col gap-6">
                    {courses &&
                      courses.length > 0 &&
                      courses.map((item, i) => {
                        return (
                          <div
                            key={i}
                            className="flex justify-between items-center"
                          >
                            <span className="text-[#565656] text-base">
                              {item.course.title} :
                            </span>
                            <span className="text-[#565656] text-base font-bold">
                              {`${item.price}$`}
                            </span>
                          </div>
                        );
                      })}

                    <div className="border-b border-[#D8D8D8] w-full h-1"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#565656] text-base font-semibold">
                        {t("Total")}:
                      </span>
                      <span className="text-[#565656] text-lg font-bold ">
                        {`${coursesData?.total}$`}
                      </span>
                    </div>
                  </div>
                )}

                {from === "/session" && (
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[#565656] text-base">
                        {t("date")}:
                      </span>
                      <span className="text-[#565656] text-base font-bold">
                        {`${sessionData?.date}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#565656] text-base">
                        {t("time")}:
                      </span>
                      <span className="text-[#565656] text-base font-bold">
                        {`${sessionData?.time}`}
                      </span>
                    </div>

                    <div className="border-b border-[#D8D8D8] w-full h-1"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#565656] text-base font-semibold">
                        {t("price")}:
                      </span>
                      <span className="text-[#565656] text-lg font-bold ">
                        {`${sessionData?.price}$`}
                      </span>
                    </div>
                  </div>
                )}

                {from === "/consultation" && (
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[#565656] text-base font-semibold">
                        {t("price")}:
                      </span>
                      <span className="text-[#565656] text-lg font-bold ">
                        {`${consultationData?.price}$`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-16 border-[0.4px] border-[#9F9F9F] rounded ">
            <div className="py-10 px-11">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-[#565656] text-lg font-bold ">
                    {t("payment")}
                  </p>
                  <p className="text-[#565656] text-base  ">
                    Please make the payment to start viewing all the features
                    and products as soon as possible.
                  </p>
                </div>

                <StripeButton
                  setLoading={setLoading}
                  cartId={from === "/cart" && coursesData?.cartId}
                  sessionId={from === "/session" && sessionId}
                  consultationId={
                    from === "/consultation" && consultationData?.id
                  }
                />
                <PayButton
                  setLoading={setLoading}
                  total={
                    from === "/cart"
                      ? coursesData?.total
                      : from === "/session"
                      ? sessionData?.price
                      : from === "/consultation"
                      ? consultationData?.price
                      : null
                  }
                  courses={from === "/cart" && courses?.map((e) => e.course.id)}
                  sessionId={from === "/session" && sessionId}
                  consultationId={
                    from === "/consultation" && consultationData?.id
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutLayout;
