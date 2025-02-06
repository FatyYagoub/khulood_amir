import React from "react";

//mui
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
//hooks
import useTranslation from "../hooks/useTranslation";
import { useRouter } from "next/router";

const SearchBox = ({ search, setSearch, setPage, setFilter, filter }) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className=" w-full flex justify-center my-6">
      {/* <div className=" px-4 lg:px-10 py-6  border border-[#D8D8D8] rounded-2xl w-full lg:w-2/3">
        {<div className="flex flex-col gap-6 justify-center text-center ">
          {<span className="md:text-base text-xs leading-6 tracking-[0.14em] text-[#565656]">
            {t(
              "Book a spot in a life-changing experience. Search for a package that suits you."
            )}
          </span>}
          <div className="w-full flex md:flex-row flex-col lg:items-center gap-5 justify-center">
            <TextField
              fullWidth
              type="text"
              placeholder={t("Type subject you want to search")}
              className="border text-base border-[#9F9F9F]  h-[60px] rounded-lg w-full max-w-[800px] outline-none"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
            />
            <Button
              className="bg-secondary "
              sx={{
                backgroundColor: "#0F114B",
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "500",
                fontFamily:
                  router.locale === "ar" ? "font-Cairo" : "font-Poppins",
                height: "60px",
                px: "60px",
                "&:hover": {
                  backgroundColor: "rgba(15, 17, 75, 0.9)",
                },
              }}
              variant="contained"
            >
              <div className="flex items-center gap-3">
                <span>{t("Search")}</span>
                <SearchIcon
                  sx={{
                    fontSize: 22,
                  }}
                />
              </div>
            </Button>
          </div>

          {filter && (
            <div className="flex flex-row w-full sm:w-1/2 gap-x-1">
              {filter.length === 0
                ? null
                : filter.map((tag, i) => (
                    <FiltringTag
                      key={tag.id}
                      tag={tag}
                      setFilter={setFilter}
                      filter={filter}
                      setPage={setPage}
                    />
                  ))}
            </div>
          )}
        </div>}
      </div> */}
    </div>
  );
};

export default SearchBox;

const FiltringTag = ({ tag, setFilter, filter, setPage }) => {
  return (
    <div
      style={{ backgroundColor: "#e0e0e0" }}
      className="flex flex-row items-center justify-center rounded-full px-2 py-1 gap-x-2"
    >
      <span>{tag.name}</span>
      <button
        onClick={() => {
          setPage(0);
          setFilter(filter.filter((item, i) => item.id !== tag.id));
        }}
        className="flex items-center justify-center"
      >
        <CancelIcon fontSize="small" style={{ color: "#aeaeae" }} />
      </button>
    </div>
  );
};
