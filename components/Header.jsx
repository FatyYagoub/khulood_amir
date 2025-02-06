import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

//mui
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

//hooks
import useOnClickOutside from "../hooks/useOnClickOutside";
import useTranslation from "../hooks/useTranslation";

const Header = () => {
  const ref = useRef();
  const router = useRouter();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    open && setIsOpen(false);
  };
  useOnClickOutside(ref, toggleDrawer);

  return (
    <div className="bg-overlay ">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center py-5">
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
          <div
            ref={ref}
            className={`relative inline-block  ${
              router.locale === "ar" ? "text-right" : "text-left"
            }`}
          >
            <div
              onClick={() => {
                !isOpen && setIsOpen(true);
                isOpen && setIsOpen(false);
              }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <span className="text-sm">{t("Select language")}</span>
              <div className="flex items-center gap-1">
                {router.locale === "ar" ? (
                  <Image width={20} height={14} src="/svg/SA.svg" alt="arabe" />
                ) : (
                  <Image width={20} height={14} src="/svg/GB.svg" alt="arabe" />
                )}
                <KeyboardArrowDownIcon
                  sx={{
                    fontSize: 16,
                  }}
                />
              </div>
            </div>
            {isOpen && (
              <div
                className={`absolute  z-10 mt-2 w-40  rounded-md bg-white 
                shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
                ${
                  router.locale === "ar"
                    ? "left-0 origin-top-left"
                    : "right-0  origin-top-right"
                }
                `}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              >
                <div role="none">
                  <span
                    onClick={() => {
                      router.push(router.asPath, router.asPath, {
                        locale: "ar",
                      });
                      setIsOpen(false);
                    }}
                    className={`text-gray-700 block px-4 py-2 text-sm cursor-pointer ${
                      router.locale === "ar" && "bg-overlay"
                    } ha:hover:bg-overlay`}
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-0"
                  >
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-sm">{t("Arabic")}</span>
                      <div className="flex items-center gap-1">
                        <Image
                          width={20}
                          height={14}
                          src="/svg/SA.svg"
                          alt="arabe"
                        />
                      </div>
                    </div>
                  </span>
                </div>
                <div>
                  <span
                    onClick={() => {
                      router.push(router.asPath, router.asPath, {
                        locale: "en",
                      });
                      setIsOpen(false);
                    }}
                    className={`text-gray-700 block px-4 py-2 text-sm cursor-pointer ${
                      router.locale === "en" && "bg-overlay"
                    } ha:hover:bg-overlay`}
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-0"
                  >
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-sm">{t("English")}</span>
                      <div className="flex items-center gap-1">
                        <Image
                          width={20}
                          height={14}
                          src="/svg/GB.svg"
                          alt="arabe"
                        />
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
