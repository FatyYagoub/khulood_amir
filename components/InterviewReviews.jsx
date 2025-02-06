import React, { useState, useEffect } from "react";
//next
import { useRouter } from "next/router";
import Link from "next/link";

//backend
import useSWR, { mutate } from "swr";
import { domain } from "../global/domain";

//services
import { fetcher } from "../services/fetcher";
import {
  getTheTokenFromStorage,
  getTheUserFromStorage,
} from "../services/auth";
import {
  addComment,
  updateComment,
  deleteComment,
  addReply,
  updateReply,
  deleteReply,
} from "../services/meeting";

//mui
import { InputAdornment, TextField, CircularProgress } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

//other
import useTranslation from "../hooks/useTranslation";
import Moment from "react-moment";

//validation
import * as Yup from "yup";
import { useFormik } from "formik";

const InterviewReviews = ({ isLogged, interviewId, interviewSlug }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { data, mutate, error } = useSWR(
    `${domain}/reviews/interview/get/${interviewSlug}`,
    fetcher
  );

  return (
    <div className="">
      <div className="py-10">
        <span className="text-xl font-semibold leading-7">{t("Reviews")}</span>
      </div>

      {isLogged && (
        <AddReview setLoading={setLoading} mutate={mutate}></AddReview>
      )}
      <div className="py-4">
        {data && data.length != 0 ? (
          <span className="px-3  text-lg  font-normal">
            {data.length > 1
              ? `${data.length} ${t("Reviews")}`
              : `${t("one Review")}`}
          </span>
        ) : (
          <span className="px-3 text-lg  font-normal">
            {t("No reviews yet")}
          </span>
        )}
      </div>
      <div className="flex flex-wrap  gap-8">
        {data &&
          data.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              setLoading={setLoading}
              mutate={mutate}
              isLogged={isLogged}
            ></ReviewCard>
          ))}
      </div>
    </div>
  );
};

const AddReview = ({ mutate, setLoading, loading }) => {
  const router = useRouter();
  const slug = router.query.slug;
  // console.log(router);

  const { t } = useTranslation();
  const user = getTheUserFromStorage();

  const [content, setContent] = useState("");

  const ReviewSchema = Yup.object().shape({
    content: Yup.string()
      .min(4, t("Too Short!"))
      .max(500, t("Too Long!"))
      .required(t("this field is required.")),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      content: content,
    },
    validationSchema: ReviewSchema,
    onSubmit: async (e, values) => {
      // console.log(values);
      setLoading(true);
      let url = null;

      let res = await addComment(getTheTokenFromStorage(), {
        interview_slug: slug,
        content: content,

        image: null,
      });

      // console.log(res);

      if (res && res.status === 201) {
        mutate();
      } else {
        alert("retry! something wrong");
      }
      setContent("");

      setLoading(false);
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
        <div className="relative max-width-850 flex flex-col items-center justify-center">
          <TextField
            name="comment"
            fullWidth
            placeholder={t("Add a comment") + "..."}
            multiline
            value={content}
            maxRows={5}
            onChange={(event) => setContent(event.target.value)}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div className="w-10 h-10 rounded-full bg-primary flex justify-center items-center ">
                    <img
                      className="rounded-full w-full  h-full object-cover  "
                      alt="logo"
                      src={user?.image ? user?.image : "/svg/user-pic.svg"}
                    />
                  </div>
                </InputAdornment>
              ),

              endAdornment: (
                <InputAdornment position="end">
                  {loading ? (
                    <button className=" flex items-center justify-center text-lg bg-secondary rounded-md py-1 px-4  text-white cursor-pointer hover:opacity-75  ">
                      <span className="  text-base sm:text-lg ">
                        <CircularProgress className="text-white" />
                      </span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className=" flex items-center justify-center text-lg bg-secondary rounded-md py-1 px-4  text-white cursor-pointer hover:opacity-75  "
                    >
                      <span className="  text-base sm:text-lg capitalize">
                        {t("Post")}
                      </span>
                    </button>
                  )}
                </InputAdornment>
              ),
            }}
            className=" border-1 overflow-auto w-full min-h-45 sm:min-h-65 border-1 border-gray-200 bg-white"
          />
        </div>
      </form>
    </>
  );
};

const ReviewCard = ({ review, mutate, isLogged, setLoading, loading }) => {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [addReply, setAddReply] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const [content, setContent] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    setContent(review.content);
  }, [review]);

  //Moment
  const calendarStrings = {
    lastDay: "[Yesterday at] LT",
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    lastWeek: "[last] dddd [at] LT",
    nextWeek: "dddd [at] LT",
    sameElse: "L",
  };

  return (
    <div className="border border-[rgba(0, 0, 0, 0.05)] w-full rounded-lg">
      <div className="py-5 px-4">
        <div className="flex flex-col gap-6  ">
          <div className="flex items-start justify-between gap-5">
            <div className="flex items-center  gap-5 ">
              <div className="w-14 h-14 rounded-full bg-primary flex justify-center items-center ">
                <img
                  className="rounded-full w-full  h-full object-cover  "
                  alt="logo"
                  src={
                    review?.user?.picture
                      ? review?.user?.picture
                      : "/svg/user-pic.svg"
                  }
                />
              </div>
              <div className="flex flex-col ">
                <span className="text-sm leading-5">
                  {" "}
                  {review?.user?.family_name} {review?.user?.given_name}
                </span>
                <span className="text-xs leading-5 text-[#676767]">
                  {" "}
                  <Moment locale={router.locale} fromNow>
                    {review.created_at}
                  </Moment>
                </span>
              </div>
            </div>
            {/* icon of edit, reply and close  */}
            {isLogged && (
              <div className="flex flex-row  justify-center gap-2 ">
                <span
                  onClick={() => setAddReply(!addReply)}
                  className="cursor-pointer"
                >
                  <ReplyIcon fontSize="small" />
                </span>

                {getTheUserFromStorage().user_id === review?.user?.id && (
                  <span
                    onClick={() => setEdit(!edit)}
                    className="cursor-pointer"
                  >
                    <EditIcon fontSize="small" />
                  </span>
                )}
                {getTheUserFromStorage().user_id === review?.user?.id && (
                  <span
                    onClick={async () => {
                      setLoading(true);
                      let res = await deleteComment(
                        getTheTokenFromStorage(),
                        review.id
                      );
                      if (res && res.status === 204) {
                        mutate();
                      } else {
                        alert("retry! something wrong");
                      }
                      setLoading(false);
                    }}
                    className="cursor-pointer"
                  >
                    <CloseIcon fontSize="small" />
                  </span>
                )}
              </div>
            )}
            {/* icon of edit  guess  */}
          </div>

          {!edit && (
            <div className="relative w-full flex flex-row items-start justify-between   py-2  ">
              <p className="text-sm leading-5 text-[#3E3E3E]">
                {review?.content}
              </p>
              {review?.replies.length === 0 ? null : showReply ? (
                <KeyboardArrowUpIcon
                  className={`absolute cursor-pointer hover:opacity-75 bottom-5 ${
                    router.locale === "ar" ? "left-0" : " right-0"
                  }`}
                  onClick={(e) => {
                    setShowReply(false);
                  }}
                />
              ) : (
                <KeyboardArrowDownIcon
                  className={`absolute cursor-pointer hover:opacity-75 bottom-5 ${
                    router.locale === "ar" ? "left-0" : " right-0"
                  }`}
                  onClick={(e) => {
                    setShowReply(true);
                  }}
                />
              )}
            </div>
          )}

          {edit && (
            <div className=" relative w-full flex flex-col items-center justify-center px-8">
              <TextField
                name="comment"
                fullWidth
                placeholder={t("Add a comment") + "..."}
                multiline
                value={content}
                maxRows={3}
                onChange={(event) => {
                  setContent(event.target.value);
                }}
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {loading ? (
                        <button className=" flex items-center justify-center text-lg bg-secondary rounded-md py-1 px-4  text-white cursor-pointer hover:opacity-75  ">
                          <span className="  text-base sm:text-lg capitalize">
                            <CircularProgress className="text-white" />
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={async (e) => {
                            e.preventDefault();
                            setLoading(true);
                            let url = null;

                            let res = await updateComment(
                              getTheTokenFromStorage(),
                              review.id,
                              {
                                content: content,
                                image: null,
                              }
                            );

                            if (res && res.status === 200) {
                              mutate();
                              setEdit(false);
                            } else {
                              alert("retry! something wrong");
                            }
                            setLoading(false);
                          }}
                          className=" flex items-center justify-center text-lg bg-secondary rounded-md py-1 px-4  text-white cursor-pointer hover:opacity-75  "
                        >
                          <span className="  text-base sm:text-lg capitalize">
                            {t("save")}
                          </span>
                        </button>
                      )}
                    </InputAdornment>
                  ),
                }}
                className="  overflow-auto w-full min-h-45 sm:min-h-65 border-1 border-gray-200 bg-white "
              />
            </div>
          )}

          {showReply && (
            <div className="w-full py-2 px-8 border-t border-gray-200  ">
              {review.replies.map((reply) => (
                <Reply
                  key={reply.id}
                  reply={reply}
                  setLoading={setLoading}
                  mutate={mutate}
                  isLogged={isLogged}
                ></Reply>
              ))}
            </div>
          )}

          {isLogged && addReply && (
            <AddReply
              setShowReply={setShowReply}
              ReviewId={review.id}
              setLoading={setLoading}
              mutate={mutate}
            ></AddReply>
          )}
        </div>
      </div>
    </div>
  );
};

const Reply = ({ reply, mutate, isLogged, setLoading, loading }) => {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const { t } = useTranslation();

  const calendarStrings = {
    lastDay: "[Yesterday at] LT",
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    lastWeek: "[last] dddd [at] LT",
    nextWeek: "dddd [at] LT",
    sameElse: "L",
  };

  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(reply.content);
  }, [reply]);

  return (
    <div className="w-full flex flex-row items-start justify-start pt-1 ">
      <div className="flex w-full items-center  gap-4">
        <div className="w-14 h-14  rounded-full bg-primary flex justify-center items-center ">
          <img
            className="rounded-full w-full  h-full object-cover  "
            alt="logo"
            src={
              reply?.user?.picture ? reply?.user?.picture : "/svg/user-pic.svg"
            }
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center ">
          <div className="w-full flex flex-row items-center justify-between  ">
            <div className="flex flex-row items-center justify-start md:justify-center md:gap-3">
              <span className="sm:text-lg  font-normal">
                {reply?.user?.family_name} {reply?.user?.given_name}
              </span>
              <span className="text-xs leading-5 text-[#676767]">
                {". "}
                <Moment locale={router.locale} fromNow>
                  {reply?.created_at}
                </Moment>
              </span>
            </div>

            {isLogged && (
              <div className="flex flex-row items-center justify-center gap-1 md:gap-3">
                {getTheUserFromStorage().user_id === reply?.user?.id && (
                  <span
                    onClick={() => setEdit(!edit)}
                    className="cursor-pointer"
                  >
                    <EditIcon fontSize="small" />
                  </span>
                )}
                {getTheUserFromStorage().user_id === reply?.user?.id && (
                  <span
                    onClick={async () => {
                      setLoading(true);
                      let res = await deleteReply(
                        getTheTokenFromStorage(),
                        reply.id
                      );
                      if (res && res.status === 204) {
                        mutate();
                      } else {
                        alert("retry! something wrong");
                      }
                      setLoading(false);
                    }}
                    className="cursor-pointer"
                  >
                    <CloseIcon fontSize="small" />
                  </span>
                )}
              </div>
            )}
          </div>

          {!edit && (
            <div className="w-full flex flex-row items-start justify-start pb-5 border-b border-gray-200 mx-8 py-2 ">
              <p className="text-sm leading-5 text-[#3E3E3E]">
                {reply?.content}
              </p>
            </div>
          )}

          {edit && (
            <div className=" relative w-full flex flex-col items-center justify-center">
              <TextField
                name="comment"
                fullWidth
                placeholder={t("Add a reply") + "..."}
                multiline
                value={content}
                maxRows={3}
                onChange={(event) => {
                  setContent(event.target.value);
                }}
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {loading ? (
                        <button className=" flex items-center justify-center text-lg bg-secondary rounded-md  py-1 px-4  text-white cursor-pointer hover:opacity-75  ">
                          <span className="  text-base sm:text-lg ">
                            <CircularProgress className="text-white" />
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={async (e) => {
                            e.preventDefault();
                            setLoading(true);
                            let url = null;

                            let res = await updateReply(
                              getTheTokenFromStorage(),
                              reply.id,
                              {
                                content: content,
                                image: null,
                              }
                            );

                            if (res && res.status === 200) {
                              mutate();
                              setEdit(false);
                            } else {
                              alert("retry! something wrong");
                            }
                            setLoading(false);
                          }}
                          className=" flex items-center justify-center text-lg bg-secondary rounded-md  py-1 px-4  text-white cursor-pointer hover:opacity-75  "
                        >
                          <span className="  text-base sm:text-lg capitalize">
                            {t("save")}
                          </span>
                        </button>
                      )}
                    </InputAdornment>
                  ),
                }}
                className=" border-1 overflow-auto w-full min-h-45 sm:min-h-65 border-1 border-gray-200 bg-white "
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AddReply = ({ ReviewId, mutate, setLoading, setShowReply, loading }) => {
  const router = useRouter();

  const { t } = useTranslation();
  const user = getTheUserFromStorage();
  const [content, setContent] = useState("");

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <TextField
        name="comment"
        fullWidth
        placeholder={t("Add a reply") + "..."}
        multiline
        value={content}
        maxRows={3}
        onChange={(event) => setContent(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <div className="w-10 h-10 rounded-full bg-primary flex justify-center items-center ">
                <img
                  className="rounded-full w-full  h-full object-cover  "
                  alt="logo"
                  src={user?.image ? user?.image : "/svg/user-pic.svg"}
                />
              </div>
            </InputAdornment>
          ),

          endAdornment: (
            <InputAdornment position="end">
              {loading ? (
                <button className=" flex items-center justify-center text-lg bg-secondary  rounded-md py-1 px-4  text-white cursor-pointer hover:opacity-75  ">
                  <span className="  text-base sm:text-lg ">
                    <CircularProgress className="text-white" />
                  </span>
                </button>
              ) : (
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    setLoading(true);

                    let res = await addReply(getTheTokenFromStorage(), {
                      parent: ReviewId,
                      content: content,
                      image: null,
                    });
                    if (res && res.status === 201) {
                      mutate();
                      setShowReply(true);
                    } else {
                      alert("retry! something wrong");
                    }
                    setContent("");

                    setLoading(false);
                  }}
                  className=" flex items-center justify-center text-lg bg-secondary  rounded-md py-1 px-4  text-white cursor-pointer hover:opacity-75  "
                >
                  <span className="  text-base sm:text-lg capitalize">
                    {t("Post")}
                  </span>
                </button>
              )}
            </InputAdornment>
          ),
        }}
        className=" border-1 overflow-auto w-full min-h-45 sm:min-h-65 border-1 border-gray-200 bg-white"
      />
    </div>
  );
};

export default InterviewReviews;
