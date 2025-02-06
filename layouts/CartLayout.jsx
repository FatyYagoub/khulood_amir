import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
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

const CartLayout = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [agreeConditions, setAgreeConditions] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const { data, mutate } = useSWR(
    [`${domain}/cart/courses/cart-details`, getTheTokenFromStorage()],
    fetcherAuth
  );

  // console.log({ data });

  const courses = data?.items;

  // console.log({ courses });
  return (
    <div className=" lg:px-0 px-8 lg:max-w-[1200px] lg:mx-auto">
      <span className="lg:text-[36px] text-xl font-semibold leading-[87px] text-primary uppercase">
        {t("Cart")}
      </span>
      <div className=" border-b border-[#D8D8D8]"></div>
      {(!data || data?.items?.length < 1 || Object.keys(data).length === 0) && (
        <div className="text-center flex flex-row items-center justify-center pt-6 ">
          <h1 className="text-gray-600 text-xl lg:text-4xl py-20">
            {t("Empty cart")}
          </h1>
        </div>
      )}
      {data && data?.items?.length > 0 && (
        <div className="flex gap-32 py-8">
          <div className="w-full flex flex-col gap-16">
            {data &&
              data.items.length > 0 &&
              data.items.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="relative border-[0.4px] border-[#9F9F9F] rounded"
                  >
                    <div
                      onClick={async () => {
                        setLoading(true);
                        let res = await deleteFromCart(
                          getTheTokenFromStorage(),
                          {
                            course: item.course.id,
                          }
                        );
                        // console.log(res);
                        if (res.status === 200) {
                          mutate();
                        } else {
                          alert("something wrong, login and retry"); //add translation and deleted successfully message
                        }
                        setLoading(false);
                      }}
                      style={{
                        transform: "translate(50%,-50%)",
                      }}
                      className={`absolute   top-1/2 flex justify-center 
                      items-center cursor-pointer  ${
                        router.locale === "ar" ? "-left-12" : "-right-6"
                      }`}
                    >
                      <CloseIcon
                        className=" "
                        sx={{
                          fontSize: 18,
                          color: "#B1B1B1",
                        }}
                      />
                    </div>
                    <div
                      className={`flex items-center  py-10 ${
                        router.locale === "ar" ? " pr-24 pl-11" : " pl-24 pr-11"
                      }`}
                    >
                      <Image
                        width={100}
                        height={170}
                        src="/svg/paid1.svg"
                        className={`absolute rtl:right-0  left-0 bottom-0 `}
                      />
                      <div className="w-full flex items-center gap-24 justify-between px-4">
                        <span className="max-w-[250px] text-base lg:text-xl text-secondary font-semibold">
                          {item.course.title}
                        </span>
                        <span className="text-primary text-[25px] font-semibold leading-9">
                          {`${item.price}$`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="border-[0.4px] border-[#9F9F9F] rounded min-w-[516px]">
            <div className="py-10 px-11">
              <div className="flex flex-col">
                <span className="text-secondary font-semibold text-[30px] leading-10 pb-[40px]">
                  {t("Summary")}
                </span>
                <div className="flex flex-col gap-6">
                  {data &&
                    data.items.length > 0 &&
                    data.items.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className="flex justify-between items-center "
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
                    <span className="text-[#565656] text-base">
                      {t("Total")}:
                    </span>
                    <span className="text-[#565656] text-lg font-medium">
                      {`${data.total_cost}$`}
                    </span>
                  </div>
                  <div className="flex flex-col pt-16">
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={() => {
                            setAgreeConditions(!agreeConditions);
                          }}
                          sx={{
                            color: "#5A5A5A",
                            "&.Mui-checked": {
                              color: "#A93396",
                            },
                          }}
                        />
                      }
                      label={
                        <span className=" text-[#5A5A5A] text-xs">
                          {t("I agree to")}
                          <Link href="/terms">
                            <span className="underline text-secondary mx-1">
                              {t("the terms and conditions")}
                            </span>
                          </Link>
                        </span>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={() => {
                            setAgreeTerms(!agreeTerms);
                          }}
                          sx={{
                            color: "#5A5A5A",
                            "&.Mui-checked": {
                              color: "#A93396",
                            },
                          }}
                        />
                      }
                      label={
                        <span className=" text-[#5A5A5A] text-xs">
                          {t("I agree to")}
                          <Link href="/privacy">
                            <span className="underline text-secondary mx-1">
                              {t("the return policy")}
                            </span>
                          </Link>
                        </span>
                      }
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (agreeConditions && agreeTerms) {
                        router.push({
                          pathname: "/check-out",
                          query: {
                            total: data?.total_cost,
                            courses: JSON.stringify(data?.items),
                            cartId: data?.id,
                            from: router.asPath,
                          },
                        });
                      } else {
                        alert("You need to accept the conditions");
                      }
                    }}
                    className="w-full border-[2px] border-primary text-primary ha:hover:bg-primary ha:hover:text-white duration-200 flex justify-center items-center py-3 rounded-lg"
                  >
                    {t("Checkout")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartLayout;
