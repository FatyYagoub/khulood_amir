import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AudioPlayer from "react-h5-audio-player";

//mui
import CircularProgress from "@mui/material/CircularProgress";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";

//hooks
import useTranslation from "../hooks/useTranslation";

//backend
import useSWR from "swr";
import { domain } from "../global/domain";

//services
import { fetcher, fetcherAuth } from "../services/fetcher";
import { getTheTokenFromStorage } from "../services/auth";
//other
import parse from "html-react-parser";
import LectureReviews from "../components/LectureReviews";
import { completeLecture } from "../services/enrollment";
import TabPanel from "../components/TabPanel";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        sx={{
          color: "#A93396",
        }}
        variant="determinate"
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        <Typography
          sx={{
            color: "#A93396",
          }}
          variant="caption"
          component="div"
          color="text.secondary"
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CourseContentLayout = () => {
  const [lectureSelected, setLectureSelected] = useState(null);

  const { t } = useTranslation();
  const router = useRouter();
  const courseSlug = router.query.name;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: courseDetails } = useSWR(
    `${domain}/courses/published/${courseSlug}?all_lectures=false`,
    fetcher
  );

  const { data: courseProgress, mutate: mutateProgress } = useSWR(
    [
      `${domain}/enrollments/progress/get/${courseSlug}`,
      getTheTokenFromStorage(),
    ],
    fetcherAuth
  );

  const { data: lectureDetail } = useSWR(
    [
      `${domain}/courses/enrolled/lectures/${lectureSelected}?for_preview=false`,
      getTheTokenFromStorage(),
    ],
    fetcherAuth
  );
  console.log("lectureDetail", lectureDetail);
  console.log("courseProgress", courseProgress);

  if (
    courseProgress &&
    courseProgress.message &&
    courseProgress.message === "Course not enrolled !"
  ) {
    return router.push("/");
  }
  if (courseDetails && courseProgress) {
    return (
      <div className="lg:py-8 py-5 lg:px-0 px-8 lg:max-w-[1200px] lg:mx-auto">
        <span className="lg:text-[36px] text-xl font-semibold leading-[87px] text-primary uppercase">
          {courseDetails?.is_paid ? t("paidContent") : t("freeContent")}
        </span>
        <div className="flex items-center justify-between pb-[38px]">
          {/* <span className="text-[#565656] font-medium text-base">
            Tincidunt amet, pulvinar id ut ut porttitor
          </span> */}
          <div className="flex items-center gap-2">
            <span className="text-[#565656] font-medium text-base">
              {t("Course Progression")}
            </span>
            <CircularProgressWithLabel
              value={parseInt(courseProgress.progress)}
            />
          </div>
        </div>
        <div className="flex lg:flex-row flex-col gap-9 border-[#D8D8D8] border-t pt-[38px]">
          <div className="lg:w-8/12">
            <div className="flex flex-col gap-4">
              {lectureSelected !== null && (
                <div className="w-full flex justify-between">
                  <div>
                    {lectureDetail?.previous_lecture && (
                      <button
                        onClick={() => {
                          setLectureSelected(lectureDetail.previous_lecture);
                        }}
                        className="flex flex-row items-center justify-center space-x-2 bg-primary border-2 border-white font-medium rounded text-white p-1 px-3 md:p-2 md:px-6 x-sm:text-sm md:text-base lg:text-lg outline-none focus:outline-none"
                      >
                        {router.locale === "ar" ? (
                          <FastForwardIcon />
                        ) : (
                          <FastRewindIcon />
                        )}
                        <span>{t("Previous lesson")}</span>
                      </button>
                    )}
                  </div>
                  <div>
                    <button
                      onClick={async () => {
                        if (
                          courseProgress.progress_in_lectures[
                            `${lectureDetail.id}`
                          ] === "Current"
                        ) {
                          await completeLecture(getTheTokenFromStorage(), {
                            lecture: lectureDetail.id,
                          });
                        }
                        if (lectureDetail.next_lecture) {
                          mutateProgress();
                          setLectureSelected(lectureDetail.next_lecture);
                        } else {
                          mutateProgress();
                          setLectureSelected(null);
                        }
                      }}
                      className="flex flex-row items-center justify-center space-x-2 bg-primary border-2 border-white font-medium rounded text-white p-1 px-3 md:p-2 md:px-6 x-sm:text-sm md:text-base lg:text-lg outline-none focus:outline-none"
                    >
                      <span>{t("Next Lesson")}</span>

                      {router.locale === "ar" ? (
                        <FastRewindIcon />
                      ) : (
                        <FastForwardIcon />
                      )}
                    </button>
                  </div>
                </div>
              )}

              <span className="py-4 capitalize font-semibold text-[25px] lg:block hidden">
                {courseDetails?.title}
              </span>
              <p className="text-base font-light lg:block hidden">
                {parse(courseDetails?.description)}
              </p>
              {lectureSelected === null && (
                <div
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #D8D8D8",
                  }}
                  className="w-full lg:h-[440px] h-[300px] "
                >
                  <img
                    style={{
                      borderRadius: "8px",
                    }}
                    className="block w-full h-full  object-cover"
                    src={courseDetails.picture}
                    alt="course"
                  />
                </div>
              )}

              {lectureSelected !== null && (
                <div className="flex flex-col gap-8">
                  {lectureDetail?.attachments.map((e) => {
                    if (e.type === "image") {
                      return <ImageDisplay url={e.content}></ImageDisplay>;
                    }
                    if (e.type === "video" || e.type === "link") {
                      return <VideoDisplay url={e.content}></VideoDisplay>;
                    }
                    if (e.type === "audio") {
                      return <AudioDisplay url={e.content}></AudioDisplay>;
                    }
                    if (e.type === "document") {
                      return <FileDisplay url={e.content}></FileDisplay>;
                    }
                    if (e.type === "text" || e.type === "custom_code") {
                      return <HtmlDisplay content={e.content}></HtmlDisplay>;
                    }
                    if (e.type === "quiz") {
                      return <QuizDisplay content={e.content}></QuizDisplay>;
                    }
                    return null;
                  })}
                  <div className="my-12 lg:block hidden">
                    <LectureReviews lectureSlug={lectureDetail?.slug} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="lg:hidden max-w-full block">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ m: 0 }}>
                <Tabs
                  value={value}
                  textColor="inherit"
                  indicatorColor="secondary"
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label="Overview"
                    {...a11yProps(0)}
                    sx={{
                      ".selected": {
                        color: "#A93396!important",
                        borderColor: "#A93396",
                      },
                    }}
                  />
                  <Tab
                    sx={{
                      ".selected": {
                        color: "#A93396!important",
                        borderColor: "#A93396",
                      },
                    }}
                    label="Course Content"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div className="flex flex-col w-full">
                  <span className="py-4 capitalize font-semibold text-[25px] lg:hidden block">
                    {courseDetails?.title}
                  </span>
                  <p className="text-base font-light lg:hidden block ">
                    {parse(courseDetails?.description)}
                  </p>
                  <div className="my-12 lg:hidden block">
                    <LectureReviews lectureSlug={lectureDetail?.slug} />
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="lg:hidden block">
                  <div className="border border-[#9F9F9F] rounded-lg p-8">
                    <div className="flex flex-col lg:gap-10 gap-4">
                      <span className="text-secondary font-semibold text-[22px] lg:pb-3">
                        {t("Course Curriculum")}
                      </span>
                      <div className="flex flex-col gap-4">
                        {courseDetails.sections.map((section, index) => (
                          <SectionList
                            key={section.id}
                            order={index + 1}
                            courseProgress={courseProgress}
                            section={section}
                            setLectureSelected={setLectureSelected}
                            lectureSelected={lectureSelected}
                          ></SectionList>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Box>
          </div>
          <div className="lg:w-4/12 lg:block hidden">
            <div className="border border-[#9F9F9F] rounded-lg p-8">
              <div className="flex flex-col lg:gap-10 gap-4">
                <span className="text-secondary font-semibold text-[22px] lg:pb-3">
                  {t("Course Curriculum")}
                </span>
                <div className="flex flex-col gap-4">
                  {courseDetails.sections.map((section, index) => (
                    <SectionList
                      key={section.id}
                      order={index + 1}
                      courseProgress={courseProgress}
                      section={section}
                      setLectureSelected={setLectureSelected}
                      lectureSelected={lectureSelected}
                    ></SectionList>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CourseContentLayout;

const SectionList = ({
  section,
  courseProgress,
  order,
  setLectureSelected,
  lectureSelected,
}) => {
  const { t } = useTranslation();

  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (
      section.lectures.some(
        (l) =>
          courseProgress.progress_in_lectures[`${l.id}`] === "Not started" ||
          courseProgress.progress_in_lectures[`${l.id}`] === "Current"
      )
    )
      handleChange(order);
  }, [courseProgress]);

  return (
    <div className="">
      <Accordion
        sx={{
          border: "none",
          outline: "none",
          boxShadow: "none",
        }}
        expanded={expanded === order}
        onChange={handleChange(order)}
      >
        <AccordionSummary
          sx={{
            borderBottom: "1px solid #D8D8D8",
          }}
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: "#A93396",
              }}
            />
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 500,
              color: "#565656",
            }}
          >
            {section?.title}
          </Typography>
        </AccordionSummary>
        {section.lectures.map((lecture) => (
          <AccordionDetails
            sx={{
              background: "#FAFAFA",
              p: "20px",
            }}
          >
            <div className="flex items-center justify-between ">
              <div className="flex gap-2 items-center">
                {courseProgress.progress_in_lectures[`${lecture.id}`] ===
                  "Not started" && (
                  <CircleOutlinedIcon
                    sx={{
                      color: "#A93396",
                    }}
                  />
                )}
                {courseProgress.progress_in_lectures[`${lecture.id}`] ===
                  "Current" && (
                  <CheckCircleOutlineIcon
                    sx={{
                      color: "#A93396",
                    }}
                  />
                )}
                {courseProgress.progress_in_lectures[`${lecture.id}`] ===
                  "Completed" && (
                  <CheckCircleIcon
                    sx={{
                      color: "#A93396",
                    }}
                  />
                )}
                {console.log(lecture, lectureSelected)}
                <span
                  className={`text-sm  ${
                    lecture.slug === lectureSelected
                      ? "font-bold text-primary"
                      : "font-medium"
                  }`}
                >
                  {lecture.title}
                </span>
              </div>
              <div
                // onClick={() => {
                //   router.push(`/courses/lecture/${lecture.slug}`);
                // }}
                onClick={() => {
                  setLectureSelected(lecture.slug);
                }}
                className="cursor-pointer "
              >
                <img src="/svg/run.svg" alt="run" />
              </div>
            </div>
          </AccordionDetails>
        ))}
      </Accordion>
    </div>
  );
};

const ImageDisplay = ({ url }) => {
  return (
    <div
      style={{
        borderRadius: "8px",
        border: "1px solid #D8D8D8",
      }}
      className="w-full lg:h-[440px] h-[300px] "
    >
      <img
        style={{ width: "100%", height: "100%" }}
        className="block object-cover w-full h-full"
        src={url}
      />
    </div>
  );
};

const VideoDisplay = ({ url }) => {
  const myUrl = url.replace("watch?v=", "embed/");
  return (
    <div
      style={{
        borderRadius: "8px",
        border: "1px solid #D8D8D8",
      }}
      className="w-full lg:h-[440px] h-[300px] "
    >
      <iframe
        style={{
          borderRadius: "8px",
        }}
        className="w-full h-full"
        src={myUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

const AudioDisplay = ({ url }) => {
  return (
    <div className="w-full ">
      <AudioPlayer autoPlay={false} autoPlayAfterSrcChange={true} src={url} />
    </div>
  );
};

const FileDisplay = ({ url }) => {
  return (
    <div
      style={{
        borderRadius: "8px",
        border: "1px solid #D8D8D8",
      }}
      className="w-full lg:h-[440px] h-[400px] my-4"
    >
      <iframe
        title="file"
        style={{ height: "100%", width: "100%" }}
        className="w-full h-full"
        src={url}
      />
    </div>
  );
};

const HtmlDisplay = ({ content }) => {
  return <div className="w-full">{parse(content)}</div>;
};

const QuizDisplay = ({ content }) => {
  const [choosed, setChoosed] = useState(null);
  const [showResult, setShowResult] = useState(null);
  const { t } = useTranslation();

  return (
    <div
      style={{
        borderRadius: "8px",
        border: "1px solid #D8D8D8",
      }}
      className="w-full p-4  flex flex-col items-center justify-center space-y-4"
    >
      <div className="w-full text-center text-primary mb-4 x-sm:text-lg md:text-xl font-bold">
        {content.question}
      </div>
      {!showResult ? (
        <>
          {content.answers.map((answer) => (
            <div
              onClick={() => {
                setChoosed({ id: answer.order });
              }}
              style={{
                borderRadius: "8px",
              }}
              className={`cursor-pointer w-full text-center opacity-80 x-sm:text-sm md:text-base  ${
                choosed && choosed.id === answer.order
                  ? "border-2 border-primary"
                  : "border border-grey hover:border-grey"
              } py-2`}
            >
              {answer.answer}
            </div>
          ))}
        </>
      ) : (
        <>
          {content.answers.map((answer) => (
            <div className="w-full flex flex-row items-center justify-center space-x-2">
              <div
                style={{
                  borderRadius: "8px",
                }}
                className={`w-3/4 md:w-11/12 text-center opacity-80 x-sm:text-sm md:text-base   ${
                  showResult
                    ? answer.is_correct
                      ? "border-2 border-green-700"
                      : "border-2 border-red-700"
                    : ""
                }  py-2`}
              >
                {answer.answer}
              </div>
              <div
                className={
                  "w-1/4 md:w-1/12 flex flex-row items-center justify-center p-2"
                }
              >
                {answer.is_correct ? (
                  <DoneIcon color="#10913c"></DoneIcon>
                ) : (
                  <CloseIcon color="#db2c2c"></CloseIcon>
                )}
              </div>
            </div>
          ))}
        </>
      )}

      {choosed && (
        <div className="w-full flex flex-row items-center justify-end py-2">
          <button
            style={{
              borderRadius: "8px",
            }}
            onClick={() => {
              if (showResult) {
                setShowResult(null);
                setChoosed(null);
              } else {
                setShowResult(true);
              }
            }}
            className="bg-primary text-white p-1 px-6  x-sm:text-sm md:text-base 2xl:text-2xl outline-none focus:outline-none"
          >
            {showResult ? t("retake") : t("check")}
          </button>
        </div>
      )}
    </div>
  );
};
