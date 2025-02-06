import React from "react";

//Hooks
import useTranslation from "../hooks/useTranslation";

const TermsLayout = () => {
  const { t } = useTranslation();

  return (
    <div className="lg:py-8 py-5 lg:px-0 px-8 lg:max-w-[1200px] lg:mx-auto">
      <span className="lg:text-[36px] text-xl font-semibold leading-[87px] text-primary uppercase">
        {t("termsOfUse")}
      </span>
      {/* <div className="lg:py-8 py-4 border-b border-[#D8D8D8]"></div> */}

      <div className="w-full lg:py-8 py-4  ">
        <ul className="font-medium leading-loose break-words text-base lg:text-lg space-y-6 lg:space-y-12 list-disc ">
          <h1 className="font-bold leading-loose text-base  md:text-xl lg:text-2xl break-words">
            {t("By using this website, you state that you have read and agreed to all the following terms and conditions:")}
          </h1>
          <p>{t("Term_1")}</p>
          <h1 className="font-bold leading-loose text-base  md:text-xl lg:text-2xl break-words">
            {t("Refund :")}
          </h1>
          <p>{t("Term_3")}</p>
          <p>
            {t("Term_2")}
            <ol className=" list-decimal list-inside ">
              <li>{t("A")}</li>
              <li>{t("B")}</li>
              <li>{t("C")}</li>
              <li>{t("D")}</li>
              <li>{t("E")}</li>
              <li>{t("F")}</li>
            </ol>
          </p> 
          <h1 className="font-bold leading-loose text-base  md:text-xl lg:text-2xl break-words">{t("Cancellation Policy:")}</h1>
              <p>{t("G")}</p>
              <p>{t("H")}</p>
              <p>{t("I")}</p>
              {/* 
              <li>{t("D")}</li>
              <li>{t("E")}</li>
              <li>{t("F")}</li> */}
          {/* <li>{t("Term_4")}</li>
          <li>{t("Term_5")}</li>
          <li>{t("Term_6")}</li>
          <li>{t("Term_7")}</li>
          <li>{t("Term_8")}</li> */}
          {/* <li>
          <h1 className="font-bold">
            {t("Term_6")}
          </h1>
            <ol className=" list-decimal list-inside ">
              <li>{t("A")}</li>
               <li>{t("B")}</li>
              <li>{t("C")}</li>
              <li>{t("D")}</li>
              <li>{t("E")}</li>
              <li>{t("F")}</li> 
            </ol>
          </li>  */}
          <span className="lg:text-[36px] text-xl font-semibold leading-[87px] text-primary uppercase">
            {t("Purchase policy, discounts and payment method:")}
          </span>
          <p>{t("J")}</p>
          <p>{t("K")}</p>
          <p>{t("L")}</p>
        </ul>
      </div>
    </div>
  );
};

export default TermsLayout;
