import React, { useState, useContext, useEffect } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
//services
import { getTheTokenFromStorage } from "../services/auth";
import { addToCart } from "../services/cart";
import { fetcher } from "../services/fetcher";
import { enroll } from "../services/enrollment";

//backend
import axios from "axios";
import useSWR, { mutate } from "swr";
import { domain } from "../global/domain";

//mui
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

//components
import CourseReviews from "../components/CourseReviews";

//other
import { storeContext } from "./../global/store";
import useTranslation from "../hooks/useTranslation";
import parse from "html-react-parser";
import { toast } from "react-nextjs-toast";

const ContentDetailsLayout = () => {
  const { t, i18n } = useTranslation();
  const { store } = useContext(storeContext);
  const router = useRouter();
  let slug = router.query.slug;
  let location = router.asPath;

  const [alreadyPaid, setAlreadyPaid] = useState(null);
  const [alreadyReview, setAlreadyReview] = useState(null);

  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data, error } = useSWR(
    `${domain}/courses/published/${slug}`,
    fetcher
  );

  useEffect(() => {
    async function fetch() {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTheTokenFromStorage()}`,
        },
      };
      let res = await axios.get(
        `${domain}/enrollments/list?course=${data.id}`,
        config
      );
      setAlreadyPaid(res.data);
      /* setAlreadyPaid(["aa", "aa"]); */
      return res;
    }
    async function fetchReview() {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTheTokenFromStorage()}`,
        },
      };
      let res = await axios.get(`${domain}/reviews/check/${data.id}`, config);
      setAlreadyReview(res.data);
      /* setAlreadyPaid(["aa", "aa"]); */
      return res;
    }
    data && store.isLogged && fetch();
    data && store.isLogged && fetchReview();
    !store.isLogged && setAlreadyPaid(null);
    !store.isLogged && setAlreadyReview(null);
    data && setRating(data.total_rating);
  }, [data, store]);

  console.log(data);

  return (
    <div className="lg:py-8 py-5 lg:px-0 px-8">
      <div className="flex flex-col">
        <span className="lg:text-[36px] font-semibold lg:leading-[87px] text-primary text-[20px] leading-[36px] uppercase">
          {data?.is_paid ? t("paidContent") : t("freeContent")}
        </span>
        {/* <span className="text-[#565656] text-xl leading-9 capitalize font-medium">
          Tristique courses
        </span> */}
        <div className="flex lg:flex-row flex-col lg:gap-16 gap-2 py-8">
          <img
            src={data?.picture ? data?.picture : "/images/paid.jpg"}
            alt="khuloud amir"
            className="w-[400px] h-max"
          />
          <div className="flex flex-col gap-9 pt-8">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-xl leading-7">
                {data?.title}
              </span>
              <Rating
                name="rating-course-detail"
                readOnly
                value={rating}
                precision={0.5}
                size="small"
              />
            </div>
            {data && (
              <p className="text-sm text-[#565656] leading-7">
                {parse(data?.description)}
              </p>
            )}
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-8 lg:items-center lg:justify-between mt-auto">
              <span className="text-primary text-[48px] leading-[67px] font-semibold uppercase">
                {data?.is_paid ? data.price + "$" : t("Free")}
              </span>
              {store.isLogged &&
                data &&
                data.is_paid &&
                alreadyPaid &&
                alreadyPaid.length === 0 &&
                !loading && (
                  <Button
                    onClick={async (e) => {
                      // add to cart
                      e.preventDefault();
                      setLoading(true);
                      let res = await addToCart(getTheTokenFromStorage(), {
                        course: data.id,
                      });
                      // console.log(res);
                      if (res.status === 201) {
                        router.push("/cart");
                      } else if (res.status === 200) {
                        toast.notify(`${res.data.message}`);
                      }
                      setLoading(false);
                    }}
                    className="bg-secondary "
                    sx={{
                      backgroundColor: "#0F114B",
                      borderRadius: "8px",
                      py: "8px",
                      px: "40px",
                      "&:hover": {
                        backgroundColor: "rgba(15, 17, 75, 0.9)",
                      },
                    }}
                    variant="contained"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-xl leading-9 capitalize">
                        {t("add to cart")}
                      </span>
                    </div>
                  </Button>
                )}
              {store.isLogged &&
                data &&
                data.is_paid &&
                alreadyPaid &&
                alreadyPaid.length === 0 &&
                loading && (
                  <Button
                    className="bg-secondary "
                    sx={{
                      backgroundColor: "#0F114B",
                      borderRadius: "8px",
                      py: "8px",
                      px: "40px",
                      "&:hover": {
                        backgroundColor: "rgba(15, 17, 75, 0.9)",
                      },
                    }}
                    variant="contained"
                  >
                    <CircularProgress className="text-white" />
                  </Button>
                )}

              {store.isLogged &&
                data &&
                !data.is_paid &&
                alreadyPaid &&
                alreadyPaid.length === 0 &&
                !loading && (
                  <Button
                    onClick={async () => {
                      // enroll
                      setLoading(true);
                      let res = await enroll(getTheTokenFromStorage(), {
                        course: data.id,
                      });
                      // console.log(res);
                      if (res.status === 201) {
                        router.push("/courses");
                      } else if (res.status === 200) {
                        toast.notify(`${res.data.message}`);
                      }
                      setLoading(false);
                    }}
                    className="bg-secondary "
                    sx={{
                      backgroundColor: "#0F114B",
                      borderRadius: "8px",
                      py: "8px",
                      px: "40px",
                      "&:hover": {
                        backgroundColor: "rgba(15, 17, 75, 0.9)",
                      },
                    }}
                    variant="contained"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-xl leading-9 capitalize">
                        {t("get it now")}
                      </span>
                    </div>
                  </Button>
                )}

              {store.isLogged &&
                data &&
                !data.is_paid &&
                alreadyPaid &&
                alreadyPaid.length === 0 &&
                loading && (
                  <Button
                    className="bg-secondary "
                    sx={{
                      backgroundColor: "#0F114B",
                      borderRadius: "8px",
                      py: "8px",
                      px: "40px",
                      "&:hover": {
                        backgroundColor: "rgba(15, 17, 75, 0.9)",
                      },
                    }}
                    variant="contained"
                  >
                    <CircularProgress className="text-white" />
                  </Button>
                )}

              {store.isLogged &&
                data &&
                alreadyPaid &&
                alreadyPaid.length > 0 && (
                  <Button
                    onClick={async () => {
                      router.push("/courses");
                    }}
                    className="bg-secondary"
                    sx={{
                      backgroundColor: "#0F114B",
                      borderRadius: "8px",
                      py: "8px",
                      px: "40px",
                      "&:hover": {
                        backgroundColor: "rgba(15, 17, 75, 0.9)",
                      },
                    }}
                    variant="contained"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-xl leading-9 capitalize">
                        {t("go to owned courses")}
                      </span>
                    </div>
                  </Button>
                )}

              {!store.isLogged && data && data.is_paid && (
                <Button
                  onClick={async () => {
                    router.push({
                      pathname: "/auth",
                      query: { from: location },
                    });
                  }}
                  className="bg-secondary "
                  sx={{
                    backgroundColor: "#0F114B",
                    borderRadius: "8px",
                    py: "8px",
                    px: "40px",
                    "&:hover": {
                      backgroundColor: "rgba(15, 17, 75, 0.9)",
                    },
                  }}
                  variant="contained"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-xl leading-9 capitalize">
                      {t("login to buy")}
                    </span>
                  </div>
                </Button>
              )}

              {!store.isLogged && data && !data.is_paid && (
                <Button
                  onClick={async () => {
                    router.push({
                      pathname: "/auth",
                      query: { from: location },
                    });
                  }}
                  className="bg-secondary "
                  sx={{
                    backgroundColor: "#0F114B",
                    borderRadius: "8px",
                    py: "8px",
                    px: "40px",
                    "&:hover": {
                      backgroundColor: "rgba(15, 17, 75, 0.9)",
                    },
                  }}
                  variant="contained"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-xl leading-9 capitalize">
                      {t("login to get it")}
                    </span>
                  </div>
                </Button>
              )}
            </div>
          </div>
        </div>
        {((data && !store.isLogged && data.what_you_get) ||
          (data &&
            alreadyPaid &&
            alreadyPaid.length === 0 &&
            data.what_you_get)) && (
          <div className="flex flex-col gap-5">
            <span className="font-semibold text-xl leading-7 capitalize">
              {t("What you will get from this course?")}
            </span>
            <p className="text-sm text-[#565656] leading-[26px]">
              {parse(data.what_you_get)}
            </p>
          </div>
        )}
        {data && (
          <div className="w-full md:w-2/3 ">
            <CourseReviews
              key={data.id}
              setLoading={setLoading}
              isLogged={store.isLogged}
              alreadyPaid={alreadyPaid}
              alreadyReview={alreadyReview}
              courseId={data.id}
              courseSlug={slug}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentDetailsLayout;
