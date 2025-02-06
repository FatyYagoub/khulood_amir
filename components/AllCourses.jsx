import React, { useState } from "react";
//next
import { useRouter } from "next/router";

//components
import CourseCard from "../components/CourseCard";

//services
import { getTheTokenFromStorage } from "../services/auth";
import { fetcherAuth } from "../services/fetcher";

//backend
import useSWR, { mutate } from "swr";
import { domain } from "../global/domain";

//hooks
import useTranslation from "../hooks/useTranslation";

//mui
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Skeleton } from "@mui/material";

const AllCourses = () => {
  const [active, setActive] = useState("all");
  const { t } = useTranslation();
  const router = useRouter();

  const token = getTheTokenFromStorage();
  const [url, setUrl] = useState(`${domain}/enrollments/list`);
  const [isRotated, setIsRotated] = useState(false);

  const handleRotate = (act) => {
    if (act === active && isRotated) {
      setIsRotated(false);
    } else {
      setIsRotated(true);
    }
  };

  const { data, mutate } = useSWR([url, token], fetcherAuth);

  return (
    <div className="lg:my-24 my-16">
      <div className="lg:flex hidden lg:grid-cols-3 lg:gap-24 lg:border-b-[6px] lg:border-b-primary text-[24px] font-medium capitalize">
        <span
          onClick={() => {
            setActive("all");
            setUrl(`${domain}/enrollments/list`);
          }}
          style={{
            borderRadius: "32px 32px 0px 0px",
          }}
          className={`
          ${
            active === "all"
              ? "bg-primary text-white"
              : "bg-[#F2F2F2] text-[#9F9F9F] border border-[#BABABA] ha:hover:text-primary"
          }
          py-6 px-16 text-center cursor-pointer 
          `}
        >
          {t("All my courses")}
        </span>
        <span
          onClick={() => {
            setActive("free");
            setUrl(`${domain}/enrollments/list?is_paid=false`);
          }}
          style={{
            borderRadius: "32px 32px 0px 0px",
          }}
          className={`
          ${
            active === "free"
              ? "bg-primary text-white"
              : "bg-[#F2F2F2] text-[#9F9F9F] border border-[#BABABA] ha:hover:text-primary"
          }
          py-6 px-16  text-center cursor-pointer 
          `}
        >
          {t("My free courses")}
        </span>
        <span
          onClick={() => {
            setActive("paid");
            setUrl(`${domain}/enrollments/list?is_paid=true`);
          }}
          style={{
            borderRadius: "32px 32px 0px 0px",
          }}
          className={`
          ${
            active === "paid"
              ? "bg-primary text-white"
              : "bg-[#F2F2F2] text-[#9F9F9F] border border-[#BABABA] ha:hover:text-primary"
          }
          py-6 px-16  text-center cursor-pointer 
          `}
        >
          {t("My paid courses")}
        </span>
      </div>
      <div className="lg:hidden block">
        <Accordion
          sx={{
            border: "none",
            boxShadow: "none",
            position: "inherit",
            "> div": {
              padding: "0px!important",
              "> div": {
                margin: "0px auto!important",
              },
            },
          }}
        >
          <AccordionSummary>
            <div
              onClick={() => {
                handleRotate("all");
                setActive("all");
                setUrl(`${domain}/enrollments/list`);
                mutate();
              }}
              style={{
                borderRadius: "32px 32px 0px 0px",
              }}
              className={`
          ${
            active === "all"
              ? "bg-primary text-white"
              : "bg-[#F2F2F2] text-[#9F9F9F] border border-[#BABABA] ha:hover:text-primary"
          }
          py-6 w-full text-center cursor-pointer 
          `}
            >
              <div className="px-16 flex items-center justify-between">
                <span
                  onClick={() => {
                    setActive("all");
                    setUrl(`${domain}/enrollments/list`);
                  }}
                >
                  {t("All my courses")}
                </span>
                <ExpandMoreIcon
                  sx={{
                    transition: "all 0.3s ease",
                    rotate: !isRotated && active === "all" ? "180deg" : "0deg",
                  }}
                />
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="lg:border lg:border-[#BABABA] lg:py-14 lg:px-32 py-8">
              {data && data.length !== 0 && (
                <div className="flex flex-col lg:gap-20 gap-10">
                  {data &&
                    data.map((course, i) => (
                      <CourseCard
                        img={course?.picture}
                        key={course.id}
                        courseDetail={course}
                      ></CourseCard>
                    ))}
                </div>
              )}

              {!data && (
                <div className=" w-full flex flex-col lg:gap-20 gap-10">
                  {Array.from(Array(4)).map((e, i) => (
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={400}
                      key={i}
                    />
                  ))}
                </div>
              )}

              {data && data.length === 0 && (
                <div className="h-48 flex justify-center items-center bg-white rounded-xl">
                  <p className="text-3xl text-[#9F9F9F]">
                    {t("no courses available yet")}.
                  </p>
                </div>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            border: "none",
            boxShadow: "none",
            position: "inherit",
            "> div": {
              padding: "0px!important",
              "> div": {
                margin: "0px auto!important",
              },
            },
          }}
        >
          <AccordionSummary>
            <div
              onClick={() => {
                handleRotate("free");
                setActive("free");
                setUrl(`${domain}/enrollments/list?is_paid=false`);
                mutate();
              }}
              className={`
          ${
            active === "free"
              ? "bg-primary text-white"
              : "bg-[#F2F2F2] text-[#9F9F9F] border border-[#BABABA] ha:hover:text-primary"
          }
          py-6 w-full text-center cursor-pointer 
          `}
            >
              <div className="px-16 flex items-center justify-between">
                <span
                  onClick={() => {
                    setActive("free");
                    setUrl(`${domain}/enrollments/list?is_paid=false`);
                    mutate();
                    console.log(url);
                    console.log(data);
                  }}
                >
                  {t("My free courses")}
                </span>
                <ExpandMoreIcon
                  sx={{
                    transition: "all 0.3s ease",
                    rotate: !isRotated && active === "all" ? "180deg" : "0deg",
                  }}
                />
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="lg:border lg:border-[#BABABA] lg:py-14 lg:px-32 py-8">
              {data && data.length !== 0 && (
                <div className="flex flex-col lg:gap-20 gap-10">
                  {data &&
                    data.map((course, i) => (
                      <CourseCard
                        img={course?.picture}
                        key={course.id}
                        courseDetail={course}
                      ></CourseCard>
                    ))}
                </div>
              )}

              {!data && (
                <div className=" w-full flex flex-col lg:gap-20 gap-10">
                  {Array.from(Array(4)).map((e, i) => (
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={400}
                      key={i}
                    />
                  ))}
                </div>
              )}

              {data && data.length === 0 && (
                <div className="h-48 flex justify-center items-center bg-white rounded-xl">
                  <p className="text-3xl text-[#9F9F9F]">
                    {t("no courses available yet")}.
                  </p>
                </div>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            border: "none",
            boxShadow: "none",
            position: "inherit",
            "> div": {
              padding: "0px!important",
              "> div": {
                margin: "0px auto!important",
              },
            },
          }}
        >
          <AccordionSummary>
            <div
              onClick={() => {
                handleRotate("paid");
                setActive("paid");
                setUrl(`${domain}/enrollments/list?is_paid=true`);
                mutate();
              }}
              style={{
                borderRadius: "0px 0px 32px 32px",
              }}
              className={`
          ${
            active === "paid"
              ? "bg-primary text-white"
              : "bg-[#F2F2F2] text-[#9F9F9F] border border-[#BABABA] ha:hover:text-primary"
          }
          py-6 w-full text-center cursor-pointer 
          `}
            >
              <div className="px-16 flex items-center justify-between">
                <span
                  onClick={() => {
                    setActive("paid");
                    setUrl(`${domain}/enrollments/list?is_paid=true`);
                  }}
                >
                  {t("My paid courses")}
                </span>
                <ExpandMoreIcon
                  sx={{
                    transition: "all 0.3s ease",
                    rotate: !isRotated && active === "all" ? "180deg" : "0deg",
                  }}
                />
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="lg:border lg:border-[#BABABA] lg:py-14 lg:px-32 py-8">
              {data && data.length !== 0 && (
                <div className="flex flex-col lg:gap-20 gap-10">
                  {data &&
                    data.map((course, i) => (
                      <CourseCard
                        img={course?.picture}
                        key={course.id}
                        courseDetail={course}
                      ></CourseCard>
                    ))}
                </div>
              )}

              {!data && (
                <div className=" w-full flex flex-col lg:gap-20 gap-10">
                  {Array.from(Array(4)).map((e, i) => (
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={400}
                      key={i}
                    />
                  ))}
                </div>
              )}

              {data && data.length === 0 && (
                <div className="h-48 flex justify-center items-center bg-white rounded-xl">
                  <p className="text-3xl text-[#9F9F9F]">
                    {t("no courses available yet")}.
                  </p>
                </div>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="lg:block hidden lg:border lg:border-[#BABABA] lg:py-14 lg:px-32">
        {data && data.length !== 0 && (
          <div className="flex flex-col gap-20">
            {data &&
              data.map((course, i) => (
                <CourseCard
                  img={course?.picture}
                  key={course.id}
                  courseDetail={course}
                ></CourseCard>
              ))}
          </div>
        )}

        {!data && (
          <div className=" w-full flex flex-col gap-20">
            {Array.from(Array(4)).map((e, i) => (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={350}
                key={i}
              />
            ))}
          </div>
        )}
        {data && data.length === 0 && (
          <div className="h-48 flex justify-center items-center bg-white rounded-xl ">
            <p className="text-3xl text-[#9F9F9F]">
              {t("no courses available yet")}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
