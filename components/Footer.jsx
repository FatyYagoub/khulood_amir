import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
//hooks
import useTranslation from "../hooks/useTranslation";
import { storeContext } from "../global/store";
//services
import { deleteTheUserAndTokenFromStorage } from "../services/auth";

const Footer = () => {
  const { t } = useTranslation();
  const { store, setStore } = useContext(storeContext);
  return (
    <div className="bg-secondary text-white text-base font-normal pb-12 pt-32 ">
      <div className="flex flex-col gap-24 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between">
          <Image
            width={122}
            height={178}
            src="/svg/logo.white.svg"
            alt="khouloud amir"
            className="lg:mx-0 mx-auto"
          />
          <div className="lg:flex hidden items-center gap-16 uppercase">
            <Link href="/">
              <span className="ha:hover:text-primary">{t("Home")}</span>
            </Link>
            <Link href="/terms">
              <span className="ha:hover:text-primary"> {t("termsOfUse")}</span>
            </Link>
            <Link href="/privacy">
              <span className="ha:hover:text-primary">
                {t("privacyPolicy")}
              </span>
            </Link>
            <Link href="/contact-us">
              <span className="ha:hover:text-primary"> {t("Contact us")}</span>
            </Link>
            {!store.isLogged ? (
              <Link href="/auth">
                <button className="uppercase  font-medium h-[40px] text-sm py-[8px] px-[40px] rounded-lg bg-white text-secondary ha:hover:bg-primary ha:hover:text-white">
                  {t("Login")}
                </button>
              </Link>
            ) : (
              <button
                onClick={async () => {
                  setStore({
                    ...store,
                    isLogged: false,
                  });
                  deleteTheUserAndTokenFromStorage();
                }}
                className="uppercase font-medium h-[40px] text-sm py-[8px] px-[40px] rounded-lg bg-white text-secondary ha:hover:bg-primary ha:hover:text-white"
              >
                {t("Logout")}
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-9">
          <div className="flex items-center gap-5">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://web.facebook.com/khuloodamirpage/?_rdc=1&_rdr"
            >
              <Image
                width={24}
                height={24}
                src="/svg/Facebook.svg"
                alt="facebook"
                className="cursor-pointer"
              />
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/khuloodamirak?s=21&t=cTPmk6C0sHMItooqgLwuvA"
            >
              <Image
                width={24}
                height={24}
                src="/svg/Twitter.svg"
                alt="Twitter"
                className="cursor-pointer"
              />
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.youtube.com/channel/UCleMdeARb2uFmumjYvPo7Xw"
            >
              <Image
                width={24}
                height={24}
                src="/svg/Youtube.svg"
                alt="Youtube"
                className="cursor-pointer"
              />
            </Link>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/khuloodamir/"
            >
              <Image
                width={24}
                height={24}
                src="/svg/Instagram.svg"
                alt="Instagram"
                className="cursor-pointer"
              />
            </Link>
          </div>
          <span className="text-[13px] font-light text-[#DCDCDC] leading-[17px] tracking-[0.21em]">
            {t("Designed and developed by")}
            <Link target="_blank" href="https://smartinia.dz/">
              <span className="mx-1 underline">Smartinia.dz</span>
            </Link>
            <br />
            {t("© all Rights Reserved to")} <span>{t("khuloodAmir")}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
