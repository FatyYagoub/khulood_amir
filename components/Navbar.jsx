import React, { useContext, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

//mui
import Button from "@mui/material/Button";

//translation
import useTranslation from "../hooks/useTranslation";

//store
import { storeContext } from "./../global/store";

//icons
import Cart from "../public/svg/cart.svg";
import User from "../public/svg/user.svg";

//hooks
import useOnClickOutside from "../hooks/useOnClickOutside";
//services
import { deleteTheUserAndTokenFromStorage } from "../services/auth";
import RtlConversion from "./RtlConversion";

const Navbar = ({ active, sticky, subActive }) => {
  const router = useRouter();
  const ref = useRef();
  const { t } = useTranslation();
  const { store, setStore } = useContext(storeContext);
  console.log(router);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    open && setIsOpen(false);
  };
  useOnClickOutside(ref, toggleDrawer);

  const routes = [
    {
      title: t("Home"),
      link: "/",
      active: "home",
    },
    {
      title: t("interviews"),
      link: "/interview",
      active: "interview",
    },
    {
      title: t("freeContent"),
      link: "/content/free",
      active: "freeContent",
    },
    {
      title: t("paidContent"),
      link: "/content/paid",
      active: "paidContent",
    },
    {
      title: t("sessions"),
      link: "/session",
      active: "session",
    },
    {
      title: t("consultations"),
      link: "/consultation",
      active: "consultation",
    },
    {
      title: t("blogs"),
      link: "/blog",
      active: "blog",
    },
  ];

  return (
    <div
      className={`${
        sticky ? "py-6" : "py-4"
      } border-t border-[#D8D8D8] duration-300`}
    >
      <div className={`flex items-center justify-between`}>
        <div className="flex items-center gap-16 ">
          {routes.map((item, index) => (
            <Link key={index} href={item.link}>
              <span
                className={`text-base  uppercase ${
                  item.active === active
                    ? "text-black font-medium "
                    : " font-light text-darkGrey ha:hover:text-black "
                }`}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </div>
        {!store.isLogged ? (
          <Link href="/auth">
            <Button
              className="bg-secondary "
              sx={{
                backgroundColor: "#0F114B",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "500",

                py: "8px",
                px: "40px",
                fontFamily:
                  router.locale === "ar" ? "font-Cairo" : "font-Poppins",
                "&:hover": {
                  backgroundColor: "rgba(15, 17, 75, 0.9)",
                },
              }}
              variant="contained"
            >
              {t("Login")}
            </Button>
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Cart />
            </Link>
            <div className="w-[1px] h-4 bg-[#D8D8D8]"></div>
            <div
              ref={ref}
              className={`relative inline-block  ${
                router.locale === "ar" ? "text-right" : "text-left"
              } `}
            >
              <div className="flex items-center gap-3 cursor-pointer ">
                <div className="flex items-center gap-1">
                  <User
                    onClick={() => {
                      isOpen && setIsOpen(false);
                      !isOpen && setIsOpen(true);
                    }}
                    className={`${subActive && "user-svg"} cursor-pointer `}
                  />
                </div>
              </div>
              {isOpen && (
                <div
                  className={`absolute ${
                    router.locale === "ar"
                      ? "left-0 origin-top-left"
                      : "right-0 origin-top-right"
                  }  z-10 mt-4 w-48   rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none `}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div className="flex flex-col gap-2 pt-4">
                    <Link href="/settings">
                      <div className="flex items-center gap-3 px-4 py-2">
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
                    {store.user && store.user.is_staff && (
                      <Link href="https://admin.khuloodamir.com">
                        <div className="flex items-center gap-3 px-4 py-2 pb-4 border-b-[0.4px] border-[#DADADA]">
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
                    <Link href="/courses">
                      <div className="flex items-center gap-3 px-4 py-2 pt-4">
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
                    <Link href="/session-owned">
                      <div className="flex items-center gap-3 px-4 py-2">
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
                    <Link href="/consultation-owned">
                      <div className="flex items-center gap-3 px-4 py-2">
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
                    <Link href="/orders">
                      <div className="flex items-center gap-3 px-4 py-2 pb-4 border-b-[0.4px] border-[#DADADA]">
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

                    <div
                      onClick={async () => {
                        setStore({
                          ...store,
                          isLogged: false,
                        });
                        deleteTheUserAndTokenFromStorage();
                      }}
                      className="flex items-center gap-3 px-4 py-4 cursor-pointer"
                    >
                      <img src="/svg/exit.svg" alt="icon" />
                      <span className="text-base text-[#FF4D4D] capitalize">
                        {t("Exit")}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
