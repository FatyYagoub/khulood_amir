import { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

//drawer
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

//mui
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

//hooks
import useOnClickOutside from "../hooks/useOnClickOutside";
import useTranslation from "../hooks/useTranslation";

//store
import { storeContext } from "../global/store";

//services
import {
  deleteTheUserAndTokenFromStorage,
  getTheUserFromStorage,
} from "../services/auth";
import { Button } from "@mui/material";

const NavbarMobile = ({ active, subActive }) => {
  const { store, setStore } = useContext(storeContext);
  const user = getTheUserFromStorage();
  const { t } = useTranslation();
  const ref = useRef();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  console.log(store);

  const handleSubMenu = () => {
    setIsSubOpen((prevState) => !prevState);
  };

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  useOnClickOutside(ref, toggleDrawer);
  return (
    <div className="relative">
      {
        <div
          className={` w-1/5 h-20 flex justify-center items-center absolute  top-0 z-[999] duration-300 ${
            !isOpen && "hidden "
          } ${router.locale === "ar" ? "right-0 " : "left-0"}`}
        >
          <div
            onClick={() => {
              setIsOpen(false);
            }}
            className="bg-white w-[50px] h-[50px] shadow-lg rounded-full flex justify-center
         items-center cursor-pointer"
          >
            <img src="/svg/times.svg" />
          </div>
        </div>
      }

      <Drawer
        ref={ref}
        size="80%"
        open={isOpen}
        direction={router.locale === "ar" ? "left" : "right"}
        enableOverlay={true}
        duration={500}
        overlayColor="black"
        zIndex={20}
      >
        {!isSubOpen ? (
          <div className="flex flex-col h-full ">
            {store.isLogged && (
              <>
                <div className="px-12 py-4 bg-[#F3F3F3] h-20">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Image
                        width={50}
                        height={50}
                        // src={
                        //   store?.user?.image
                        //     ? store?.user?.image
                        //     : "/svg/profile.svg"
                        // }
                        src="/svg/profile.svg" // to be reviewd
                        alt="profile"
                      />
                      <span className="text-base text-black">
                        {store?.user?.username}
                      </span>
                    </div>
                    <ArrowForwardIosIcon
                      sx={{
                        fontSize: 22,
                        rotate: router.locale === "ar" && "180deg",
                      }}
                      className="cursor-pointer"
                      onClick={handleSubMenu}
                    />
                  </div>
                </div>
                <div className="px-12 py-4">
                  <div className="flex items-center gap-3">
                    <div className="invisible w-[50px] h-[50px]" />

                    <Link href="/">
                      <span className="text-sm text-[#565656] font-light capitalize">
                        {t("Cart")}
                      </span>
                    </Link>
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col gap-2 pt-10 px-12 border-t border-[#ACACAC]">
              <div className="flex items-center gap-3">
                <div className="invisible w-[50px] h-[50px]" />
                <Link href="/">
                  <span
                    className={`text-base ${
                      active === "home"
                        ? "text-black font-normal"
                        : "text-[#565656] font-light"
                    } uppercase`}
                  >
                    {t("Home")}
                  </span>
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <div className="invisible w-[50px] h-[50px]" />
                <Link href="/interview">
                  <span
                    className={`text-base ${
                      active === "freeContent"
                        ? "text-black font-normal"
                        : "text-[#565656] font-light"
                    } uppercase`}
                  >
                    {t("interviews")}
                  </span>
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <div className="invisible w-[50px] h-[50px]" />
                <Link href="/content/free">
                  <span
                    className={`text-base ${
                      active === "freeContent"
                        ? "text-black font-normal"
                        : "text-[#565656] font-light"
                    } uppercase`}
                  >
                    {t("freeContent")}
                  </span>
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <div className="invisible w-[50px] h-[50px]" />
                <Link href="/content/paid">
                  <span
                    className={`text-base ${
                      active === "paidContent"
                        ? "text-black font-normal"
                        : "text-[#565656] font-light"
                    } uppercase`}
                  >
                    {t("paidContent")}
                  </span>
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <div className="invisible w-[50px] h-[50px]" />
                <Link href="/session">
                  <span
                    className={`text-base ${
                      active === "session"
                        ? "text-black font-normal"
                        : "text-[#565656] font-light"
                    } uppercase`}
                  >
                    {t("sessions")}
                  </span>
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <div className="invisible w-[50px] h-[50px]" />
                <Link href="/consultation">
                  <span
                    className={`text-base ${
                      active === "consultation"
                        ? "text-black font-normal"
                        : "text-[#565656] font-light"
                    } uppercase`}
                  >
                    {t("consultations")}
                  </span>
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <div className="invisible w-[50px] h-[50px]" />
                <Link href="/blog">
                  <span
                    className={`text-base ${
                      active === "consultation"
                        ? "text-black font-normal"
                        : "text-[#565656] font-light"
                    } uppercase`}
                  >
                    {t("blogs")}
                  </span>
                </Link>
              </div>
            </div>

            {!store.isLogged && (
              <div className="w-full justify-center  gap-3 flex  items-center my-6">
                <div className="">
                  <Link href="/auth">
                    <Button
                      className="bg-secondary "
                      sx={{
                        backgroundColor: "#0F114B",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "500",

                        py: "8px",
                        px: "20px",
                        fontFamily:
                          router.locale === "ar"
                            ? "font-Cairo"
                            : "font-Poppins",
                      }}
                      variant="contained"
                    >
                      {t("Login")}
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            <div className="py-6 flex flex-col items-center gap-8 mt-auto bg-[#F9EFF7]">
              <div className="flex items-center gap-8">
                <Image
                  onClick={() => {
                    router.push(router.asPath, router.asPath, {
                      locale: "ar",
                    });
                  }}
                  width={41}
                  height={31}
                  src="/svg/SA.svg"
                  alt="arabe"
                  className={
                    router.locale === "ar"
                      ? "p-1 border border-primary rounded-sm"
                      : "p-1 border border-transparent rounded-sm"
                  }
                />
                <Image
                  onClick={() => {
                    router.push(router.asPath, router.asPath, {
                      locale: "en",
                    });
                  }}
                  width={41}
                  height={31}
                  src="/svg/GB.svg"
                  alt="english"
                  className={
                    router.locale === "en"
                      ? "p-1 border border-primary rounded-sm"
                      : "p-1 border border-transparent rounded-sm"
                  }
                />
              </div>
              <div className="flex items-center gap-5">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://web.facebook.com/khuloodamirpage/?_rdc=1&_rdr"
                >
                  <Image
                    src="/svg/Facebook.svg"
                    alt="facebook"
                    className="cursor-pointer"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/khuloodamirak?s=21&t=cTPmk6C0sHMItooqgLwuvA"
                >
                  <Image
                    src="/svg/Twitter.svg"
                    alt="Twitter"
                    className="cursor-pointer"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/channel/UCleMdeARb2uFmumjYvPo7Xw"
                >
                  <Image
                    src="/svg/Youtube.svg"
                    alt="Youtube"
                    className="cursor-pointer"
                    width={24}
                    height={24}
                  />
                </Link>

                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/khuloodamir/"
                >
                  <Image
                    src="/svg/Instagram.svg"
                    alt="Instagram"
                    className="cursor-pointer"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col ">
            <div className="px-12 py-4 bg-[#F3F3F3] h-20">
              <div className="flex items-center gap-3 h-full">
                <div className="w-[10px] h-[10px]" />
                <ArrowBackIosIcon
                  sx={{
                    fontSize: 22,
                    rotate: router.locale === "ar" && "180deg",
                  }}
                  className={`cursor-pointer`}
                  onClick={handleSubMenu}
                />
                <span className="text-base text-black capitalize">
                  {t("menu")}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-10  pt-10">
              <div className="flex items-center gap-3 px-20">
                <div className="w-[10px] h-[10px]" />
                <Link href="/settings">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        subActive === "setting"
                          ? "/svg/setting.active.svg"
                          : "/svg/setting.svg"
                      }
                      alt="icon"
                    />
                    <span
                      className={`text-base capitalize ${
                        subActive === "setting"
                          ? "text-primary"
                          : "text-[#5A5A5A]"
                      }`}
                    >
                      {t("settings")}
                    </span>
                  </div>
                </Link>
              </div>
              <div className="flex items-center gap-3 px-20 border-b border-[#ACACAC] pb-10">
                <div className="w-[10px] h-[10px]" />
                {store.user && store.user.is_staff && (
                  <Link href="https://admin.khuloodamir.com">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          subActive === "dashboard"
                            ? "/svg/dashboard.active.svg"
                            : "/svg/dashboard.svg"
                        }
                        alt="icon"
                      />
                      <span
                        className={`text-base capitalize ${
                          subActive === "dashboard"
                            ? "text-primary"
                            : "text-[#5A5A5A]"
                        }`}
                      >
                        {t("dashboard")}
                      </span>
                    </div>
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-3 px-20">
                <div className="w-[10px] h-[10px]" />
                <Link href="/courses">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        subActive === "course"
                          ? "/svg/courses.active.svg"
                          : "/svg/courses.svg"
                      }
                      alt="icon"
                    />
                    <span
                      className={`text-base capitalize ${
                        subActive === "course"
                          ? "text-primary"
                          : "text-[#5A5A5A]"
                      }`}
                    >
                      {t("courses")}
                    </span>
                  </div>
                </Link>
              </div>
              <div className="flex items-center gap-3 px-20">
                <div className="w-[10px] h-[10px]" />
                <Link href="/session-owned">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        subActive === "session"
                          ? "/svg/sessions.active.svg"
                          : "/svg/sessions.svg"
                      }
                      alt="icon"
                    />
                    <span
                      className={`text-base capitalize ${
                        subActive === "session"
                          ? "text-primary"
                          : "text-[#5A5A5A]"
                      }`}
                    >
                      {t("sessions")}
                    </span>
                  </div>
                </Link>
              </div>
              <div className="flex items-center gap-3 px-20">
                <div className="w-[10px] h-[10px]" />
                <Link href="/consultation-owned">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        subActive === "consultation"
                          ? "/svg/consultations.active.svg"
                          : "/svg/consultations.svg"
                      }
                      alt="icon"
                    />
                    <span
                      className={`text-base capitalize ${
                        subActive === "consultation"
                          ? "text-primary"
                          : "text-[#5A5A5A]"
                      }`}
                    >
                      {t("consultations")}
                    </span>
                  </div>
                </Link>
              </div>
              <div className="flex items-center gap-3 px-20 border-b border-[#ACACAC] pb-10">
                <div className="w-[10px] h-[10px]" />
                <Link href="/orders">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        subActive === "order"
                          ? "/svg/orders.active.svg"
                          : "/svg/orders.svg"
                      }
                      alt="icon"
                    />
                    <span
                      className={`text-base capitalize ${
                        subActive === "order"
                          ? "text-primary"
                          : "text-[#5A5A5A]"
                      }`}
                    >
                      {t("orders")}
                    </span>
                  </div>
                </Link>
              </div>
              <div className="flex items-center gap-3 px-20">
                <div className="w-[10px] h-[10px]" />
                <div
                  onClick={async () => {
                    setStore({
                      ...store,
                      isLogged: false,
                    });
                    deleteTheUserAndTokenFromStorage();
                    handleSubMenu();
                    toggleDrawer();
                  }}
                  className="flex items-center gap-4 cursor-pointer"
                >
                  <img src="/svg/exit.svg" alt="icon" />
                  <span className="text-base text-[#FF4D4D] capitalize">
                    {" "}
                    {t("Exit")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
      <div className="py-4 px-9 border-b border-[rgba(0, 0, 0, 0.44)]">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/svg/logoMobile.svg"
              alt="logo"
              width={102}
              height={43}
            />
          </Link>
          <Image
            onClick={() => {
              setIsOpen(true);
            }}
            src="/svg/menu.svg"
            className="cursor-pointer"
            alt="logo"
            width={32}
            height={32}
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
