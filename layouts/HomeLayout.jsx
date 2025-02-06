import { useState } from "react";

//components
import OfferCard from "../components/OfferCard";
import Services from "../components/Services";
import StartForm from "../components/StartForm";
import News from "../components/News";
import useTranslation from "../hooks/useTranslation";
import { useRouter } from "next/router";

const HomeLayout = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [isReadMore, setIsReadMore] = useState(true);
  const text = t("text_home_top");

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <div className="lg:py-12 py-10 mx-auto lg:max-w-[1200px] max-w-full lg:px-0 px-9">
      <div className="flex justify-center items-center gap-16">
        <div className="flex flex-col item ">
          <div className="flex lg:flex-row flex-col-reverse lg:pt-28 lg:pb-10 items-center justify-center lg:gap-16 gap-10">
            <div className="lg:block hidden relative w-[520px] h-[600px] bg-darkPurple z-10 rounded-lg">
            {/* modified images to svg */}
              <img
                className="absolute bottom-0 z-20"
                src="/svg/home-large.svg"
                alt="khouloud amir"
              />
            </div>
            <div className="lg:hidden block relative w-[360px] lg:h-[530px] h-[400px] bg-darkPurple z-10 rounded-lg">
              <img
                className="absolute bottom-0 z-20"
                src="/svg/home-mobile.svg"
                alt="khouloud amir"
              />
            </div>
            <div className="flex flex-col lg:gap-5 gap-3 h-full lg:pb-0 pb-[7rem]">
              <h1
                className={`text-darkPurple font-semibold lg:text-[42px] lg:leading-[87px] text-[24px] leading-[43px]  uppercase ${
                  router.locale !== "ar" && "tracking-[0.54em]"
                } `}
              >
                {t("khuloodAmir")}
              </h1>
              <p className=" font-light lg:text-xl text-lg text-[#565656] md:max-w-[650px]   max-w-[360px] text-justify">
                <span className="lg:hidden block">
                  {isReadMore ? text.slice(0, 250) : text}
                  {text.length > 150 && (
                    <span
                      className="font-semibold text-primary cursor-pointer"
                      onClick={toggleReadMore}
                    >
                      {isReadMore ? t("read more") : t("show less")}
                    </span>
                  )}
                </span>

                <span className="lg:block hidden ">{text}</span>
              </p>
            </div>
          </div>

          <StartForm />
          <Services />
          <OfferCard />
          <News />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
