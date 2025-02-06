import React from "react";

//Hooks
import useTranslation from "../hooks/useTranslation";

const PrivacyLayout = () => {
  const { t } = useTranslation();

  return (
    <div className="lg:py-8 py-5 px-8 lg:max-w-[1200px] lg:mx-auto">
      <span className="lg:text-[36px] text-xl font-semibold leading-[87px] text-primary uppercase">
        {t("privacyPolicy")}
      </span>

      <div className="w-full lg:py-8 py-4  ">
        <div className=" w-full  text-base lg:text-lg space-y-6 ">
          {/* <h1 className="font-bold  text-base  md:text-xl lg:text-2xl  break-words capitalize">
            {t("introduction")}
          </h1> */}
          <p className="font-medium leading-loose break-words">{t("P_1")}</p>
          <p className="font-medium leading-loose break-words">{t("P_2")}</p>
          <p className="font-medium leading-loose break-words">{t("P_3")}</p>
          <p className="font-medium leading-loose break-words">{t("P_4X")}</p>
          {/* <p className="font-medium leading-loose break-words">
            {t("P_3")}
            <ol className="  list-disc list-inside ">
              <li>{t("L1")}</li>
              <li>{t("L2")}</li>
              <li>{t("L3")}</li>
              <li>{t("L4")}</li>
            </ol>
            {t("P_33")}
          </p> */}
          <h1 className="font-bold leading-loose text-base  md:text-xl lg:text-2xl break-words">
            {t("T_3")}
          </h1>
          <p className="font-medium leading-loose break-words">{t("P_4")}</p>
          <p className="font-medium leading-loose break-words">{t("P_5")}</p>
          <h1 className="font-bold leading-loose text-base  md:text-xl lg:text-2xl break-words">
            {t("T_A")}
          </h1>
          <p className="font-medium leading-loose break-words">{t("P_C")}</p>
          <p className="font-medium leading-loose break-words">{t("P_D")}</p>
          <p className="font-medium leading-loose break-words">{t("P_E")}</p>
          <p className="font-medium leading-loose break-words">{t("P_F")}</p>
          <p className="font-medium leading-loose break-words">{t("P_G")}</p>
          <p className="font-medium leading-loose break-words">{t("P_H")}</p>
          <p className="font-medium leading-loose break-words">{t("P_I")}</p>
          <p className="font-medium leading-loose break-words">{t("P_J")}</p>
          <h1 className="font-bold leading-loose text-base  md:text-xl lg:text-2xl break-words">
            {t("T_4")}
          </h1>
          <p className="font-medium leading-loose break-words">{t("P_A")}</p>
          <p className="font-medium leading-loose break-words">{t("P_B")}</p>
          <h1 className="font-bold leading-loose text-base  md:text-xl lg:text-2xl break-words">
            {t("T_5")}
          </h1>
          <p className="font-medium leading-loose break-words">{t("P_6")}</p>
          <h1 className="font-bold leading-loose text-base  md:text-xl lg:text-2xl break-words">
            {t("T_6")}
          </h1>
          <p className="font-medium leading-loose break-words">{t("P_7")}</p>
          <h1 className="font-bold leading-loose text-base  md:text-xl lg:text-2xl break-words">
            {t("T_7")}
          </h1>
          <p className="font-medium leading-loose break-words">{t("P_8")}</p>
          <h1 className="font-bold leading-loose text-base  md:text-xl lg:text-2xl break-words">
            {t("T_8")}
          </h1>
          <p className="font-medium leading-loose break-words">{t("P_9")}</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyLayout;
