import React from "react";
//next
import { useRouter } from "next/router";

//Hooks
import useTranslation from "../hooks/useTranslation";

//other
import { toast } from "react-nextjs-toast";

const InterviewCard = ({ meet, setFilter, filter, setPage }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const youtubeThumbnail = (url) => {
    return `http://img.youtube.com/vi/${url.split("watch?v=")[1]}/0.jpg`;
  };
  return (
    <div
      onClick={() => router.push(`/interview/${meet.slug}`)}
      className="rounded-lg w-full cursor-pointer border border-[#9F9F9F]"
    >
      <div className="flex flex-col">
        {meet.video.includes("youtube") ? (
          <img
            src={youtubeThumbnail(meet?.video)}
            alt="interview"
            className="w-full h-[220px] object-cover rounded-tr-lg rounded-tl-lg"
          />
        ) : (
          <video
            className="object-cover w-full h-full"
            src={meet?.video}
            alt="interview"
          />
        )}

        <div className=" rounded-br-lg rounded-bl-lg px-5 pb-9 pt-7">
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-primary text-xl line-clamp-2 leading-7 font-semibold">
                {meet?.title}
              </span>
              <div className="px-4 w-full flex flex-row leading-loose gap-x-2">
                {Array.isArray(meet.tags) &&
                  meet?.tags?.map((tag, i) => (
                    <span
                      key={tag.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!filter.find((item) => item.id === tag.id)) {
                          setPage(0);
                          setFilter([...filter, tag]);
                        } else {
                          toast.notify(t("tag already add"));
                        }
                      }}
                      className=" text-[#0000FF] hover:opacity-80 cursor-pointer "
                    >
                      #{tag.name}
                    </span>
                  ))}
              </div>
            </div>

            <p className="text-sm leading-6">{meet?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
