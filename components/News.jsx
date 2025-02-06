import React, { useRef, useState } from "react";
import Image from "next/image";

//mui
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import useTranslation from "../hooks/useTranslation";

const News = () => {
  const router = useRouter();
  const swiperRef = useRef();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col max-w-[360px] md:max-w-[700px] lg:max-w-full">
      <div className="py-10 lg:py-20 flex justify-center items-center">
        {/* <span className="lg:text-[40px] text-3xl font-medium  leading-[33px] lg:leading-[53px] text-center max-w-[1100px]">
          {t(
            "I learned how to change, and I would be glad to help you do the same for yourself."
          )}
        </span> */}
      </div>
      <div className="bg-[#F8F8F8] rounded-2xl text-black w-full max-w-[1200px] mx-auto">
        <div className="w-full flex lg:flex-row flex-col-reverse justify-between ">
          <div className=" lg:py-16 py-10 lg:px-12 px-4  ">
            <div className="h-full lg:max-w-[550px] bg-[#F8F8F8]   ">
              <div className="flex flex-col justify-between gap-10 lg:gap-20 h-full  bg-[#F8F8F8]  ">
                {router.locale !== "ar" && (
                  <div className="" dir="ltr">
                    <Swiper
                      ref={swiperRef}
                      dir={"ltr"}
                      spaceBetween={100}
                      slidesPerView={1}
                      loop={true}
                      autoplay={{ delay: 5000, disableOnInteraction: false }}
                    >
                      <SwiperSlide className="w-full h-full bg-[#F8F8F8]  ">
                        <div className="h-full flex flex-col gap-8">
                          <span className="lg:text-[28px] text-[20px] font-bold leading-[38px]">
                            “ {t("quote_1")} ”
                          </span>
                          <div className="w-full  flex flex-col gap-2 font-normal lg:max-w-[450px] items-end">
                            <span className="text-xl leading-7  ">
                              {t("khuloodAmir")}
                            </span>
                            {/* <span className="text-sm leading-5 text-[#3C3C43]   ">
                              {t("Journalist at MBC")}
                            </span> */}
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="w-full h-full bg-[#F8F8F8]  ">
                        <div className="h-full flex flex-col gap-8">
                          <span className="lg:text-[28px] text-[20px] font-bold leading-[38px]">
                            “ {t("quote_2")} ”
                          </span>
                          <div className="w-full flex flex-col gap-2 font-normal lg:max-w-[450px] items-end">
                            <span className="text-xl leading-7">
                              {t("khuloodAmir")}
                            </span>
                            {/* <span className="text-sm leading-5 text-[#3C3C43]">
                              {t("Journalist at MBC")}
                            </span> */}
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="w-full h-full bg-[#F8F8F8]  ">
                        <div className="h-full flex flex-col gap-8">
                          <span className="lg:text-[28px] text-[20px] font-bold leading-[38px]">
                            “ {t("quote_3")} ”
                          </span>
                          <div className="w-full flex flex-col gap-2 font-normal lg:max-w-[450px] items-end">
                            <span className="text-xl leading-7">
                              {t("khuloodAmir")}
                            </span>
                            {/* <span className="text-sm leading-5 text-[#3C3C43]">
                              {t("Journalist at MBC")}
                            </span> */}
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                )}
                {router.locale === "ar" && (
                  <div className="bg-[#F8F8F8]" dir="rtl">
                    <Swiper
                      ref={swiperRef}
                      dir={"rtl"}
                      spaceBetween={100}
                      slidesPerView={1}
                      loop={true}
                      autoplay={{ delay: 5000, disableOnInteraction: false }}
                    >
                      <SwiperSlide className="w-full h-full bg-[#F8F8F8]  ">
                        <div className="h-full flex flex-col gap-8">
                          <span className="lg:text-[28px] text-[20px] font-bold leading-[38px]">
                            “ {t("quote_1")} ”
                          </span>
                          <div className="w-full flex flex-col gap-2 font-normal lg:max-w-[450px] items-end">
                            <span className="text-xl leading-7">
                              {t("khuloodAmir")}
                            </span>
                            {/* <span className="text-sm leading-5 text-[#3C3C43]">
                              {t("Journalist at MBC")}
                            </span> */}
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="w-full h-full bg-[#F8F8F8]  ">
                        <div className="h-full flex flex-col gap-8">
                          <span className="lg:text-[28px] text-[20px] font-bold leading-[38px]">
                            “ {t("quote_2")} ”
                          </span>
                          <div className="w-full flex flex-col gap-2 font-normal lg:max-w-[450px] items-end">
                            <span className="text-xl leading-7">
                              {t("khuloodAmir")}
                            </span>
                            {/* <span className="text-sm leading-5 text-[#3C3C43]">
                              {t("Journalist at MBC")}
                            </span> */}
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="w-full h-full bg-[#F8F8F8]  ">
                        <div className="h-full flex flex-col gap-8">
                          <span className="lg:text-[28px] text-[20px] font-bold leading-[38px]">
                            “ {t("quote_3")} ”
                          </span>
                          <div className="w-full flex flex-col gap-2 font-normal lg:max-w-[450px] items-end">
                            <span className="text-xl leading-7">
                              {t("khuloodAmir")}
                            </span>
                            {/* <span className="text-sm leading-5 text-[#3C3C43]">
                              {t("Journalist at MBC")}
                            </span> */}
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                )}

                <div className="lg:flex hidden items-center justify-between bg-[#F8F8F8]">
                  <ArrowBackIosIcon
                    onClick={() => swiperRef.current.swiper.slideNext()}
                    sx={{
                      fontSize: 36,
                      cursor: "pointer",
                      rotate: router.locale === "ar" && "180deg",
                      opacity: 0.4,
                      "&:hover": {
                        opacity: 1,
                      },
                    }}
                  />
                  <ArrowForwardIosIcon
                    onClick={() => swiperRef.current.swiper.slideNext()}
                    sx={{
                      fontSize: 36,
                      cursor: "pointer",
                      rotate: router.locale === "ar" && "180deg",
                      opacity: 0.4,
                      "&:hover": {
                        opacity: 1,
                      },
                    }}
                  />
                </div>
                <div className="lg:hidden flex items-center justify-between pt-20">
                  <ArrowBackIosIcon
                    onClick={() => swiperRef.current.swiper.slideNext()}
                    sx={{
                      fontSize: 22,
                      cursor: "pointer",
                      rotate: router.locale === "ar" && "180deg",
                      opacity: 0.4,
                      "&:hover": {
                        opacity: 1,
                      },
                    }}
                  />
                  <ArrowForwardIosIcon
                    onClick={() => swiperRef.current.swiper.slideNext()}
                    sx={{
                      fontSize: 22,
                      cursor: "pointer",
                      rotate: router.locale === "ar" && "180deg",
                      opacity: 0.4,
                      "&:hover": {
                        opacity: 1,
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=" lg:w-auto w-full h-auto">
            <img
              className=" w-full h-full"
              src="/images/khulood_3.png"
              alt="khuloud amir"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
