import { useState, useContext, useEffect } from "react";
import { storeContext } from "../global/store";
import parse from "html-react-parser";

//mui
import Rating from "@mui/material/Rating";
//next
import Link from "next/link";
import { useRouter } from "next/router";
//translation
import useTranslation from "../hooks/useTranslation";

//services
import { getTheTokenFromStorage } from "../services/auth";
//backend
import axios from "axios";
import { domain } from "../global/domain";
import { Image } from "react-image-and-background-image-fade";

const ContentCard = ({ img, course }) => {
  let router = useRouter();
  const { store } = useContext(storeContext);
  const { t } = useTranslation();
  const [alreadyPaid, setAlreadyPaid] = useState(null);

  useEffect(() => {
    async function fetch() {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTheTokenFromStorage()}`,
        },
      };
      let res = await axios.get(
        `${domain}/enrollments/list?course=${course.id}`,
        config
      );
      setAlreadyPaid(res.data);
      /* setAlreadyPaid(["aa", "aa"]); */
      return res;
    }
    course && store.isLogged && fetch();
  }, [course]);
  return (
    <div className="border border-[#9F9F9F] relative rounded-lg w-full max-w-[450px] cursor-pointer">
      {/* <div
        className={`lg:block hidden absolute -bottom-[0.5px] ${
          router.locale === "ar"
            ? "right-0  translate-x-[50%]"
            : "left-0  -translate-x-[50%]"
        }`}
      >
        <img
          src={img}
          alt="khuloud amir"
          className="w-[220px] h-[400px] object-cover"
        />
      </div>
      <div className="lg:hidden flex flex-col-reverse px-4">
        <div className="flex justify-between items-end">
          <img
            src={img}
            alt="khuloud amir"
            className="w-[182px] h-[291px] object-cover"
          />

          <span className="text-primary font-semibold text-[28px] mx-auto leading-10 m-8">
            {course.is_paid ? course.price + "$" : t("Free")}
          </span>
        </div>
        <div className="lg:hidden block">
          <Content IsMobile course={course} alreadyPaid={alreadyPaid} />
        </div>
      </div> */}
      <div className="max-h-[250px] w-full">
        <img
          src={img ? img : "/images/contactUs.jpg"}
          width="100%"
          height="100%"
          className="max-h-[250px] w-full object-cover rounded-t-lg"
        />
      </div>
      <div className="p-2">
        <Content course={course} alreadyPaid={alreadyPaid} />
      </div>
    </div>
  );
};

export default ContentCard;

const Content = ({ course, alreadyPaid, IsMobile }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const router = useRouter();

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const { t } = useTranslation();
  return (
    <Link
      href={{
        pathname: `/content/ContentDetail/${course.slug}`,
        query: {
          id: course.id,
          slug: course.slug,
          name: course.title,
          description: course.description,
          price: course.price,
          url: course.picture,
          alreadyPaid: alreadyPaid,
          from: course.is_paid ? "content/paid" : "content/free",
        },
      }}
    >
      <div className={` px-4 lg:px-6 lg:pt-3 lg:pb-5 `}>
        <div
          className={`flex flex-col gap-6  ${
            router.locale === "ar"
              ? "text-right font-Cairo"
              : "text-left font-Poppins"
          } `}
        >
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-secondary text-xl capitalize cursor-pointer">
              {course?.title}
            </span>

            <Rating
              name={`rating-course-card${course?.id}`}
              readOnly
              value={course?.total_rating}
              precision={0.5}
            />
          </div>
          <div className="text-[#565656] text-sm max-w-[380px]  relative">
            {isReadMore
              ? parse(course?.description?.slice(0, 100))
              : parse(course?.description)}

            {course?.description?.length > 100 && (
              <span className="font-semibold">
                {isReadMore ? t("read more") : t("show less")}
              </span>
            )}
          </div>
          {!IsMobile && (
            <span
              className={`text-primary font-semibold text-[28px] lg:text-[32px]  leading-10 ${
                router.locale === "ar" ? "text-left" : "text-right"
              } `}
            >
              {course.is_paid ? course.price + "$" : t("Free")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
