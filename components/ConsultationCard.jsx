import React, { useState, useContext } from "react";
import { storeContext } from "../global/store";
import parse from "html-react-parser";

//mui
import { Modal, Box, Typography, ButtonBase } from "@mui/material";
import { Button } from "@mui/material";
//next
import { useRouter } from "next/router";
import { toast } from "react-nextjs-toast";
//Hooks
import useTranslation from "../hooks/useTranslation";

//form
import { useFormik } from "formik";
import * as Yup from "yup";

//services
import { getTheTokenFromStorage } from "../services/auth";
import { bookConsultation } from "../services/consultation";

//datepicker
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
//components
import ProtectedRoute from "./ProtectedRoute";
import RtlConversion from "./RtlConversion";

const ConsultationCard = ({ item, setLoading }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [value, setValue] = useState();
  const [fields, setFields] = useState({
    date: "",
    whatsApp: "",
  });

  // console.log(value);
  const router = useRouter();
  const { t } = useTranslation();
  const phoneRegExp =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

  const SubSchema = Yup.object().shape({
    date: Yup.date().required(t("this field is required.")),
    whatsApp: Yup.string()
      .matches(phoneRegExp, t("Phone number is not valid"))
      .required(t("this field is required.")),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      date: fields?.date,
      whatsApp: fields?.whatsApp,
    },
    validationSchema: SubSchema,
    onSubmit: async (values) => {
      if (item.is_paid) {
        router.push({
          pathname: `/check-out/`,
          query: {
            consultation: item.id,
            whatsapp_number: values.whatsApp,
            fixed_date: values.date,
            from: router.asPath,
          },
        });
        return;
      } else {
        let res = await bookConsultation(getTheTokenFromStorage(), {
          consultation: item.id,
          whatsapp_number: values.whatsApp,
          fixed_date: values.date,
        });
        // console.log(res);
        if (res && res.status === 200) {
          setLoading(false);

          toast.notify(res.data.message);
          router.push("/consultation-owned");
        } else {
          setLoading(false);
          toast.notify(t("There is something wrong."));
        }
      }
    },
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: router.locale !== "ar" && "50%",
    right: router.locale === "ar" && "50%",
    transform:
      router.locale === "ar" ? "translate(50%, -50%)" : "translate(-50%, -50%)",
    width: 620,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "8px",
    py: "43px",
    px: "67px",
  };

  return (
    <div>
      <div className="flex justify-end">
        <div className="border border-[#9F9F9F] relative rounded-lg w-full max-w-[450px] cursor-pointer">
          <div
            className={`lg:block hidden absolute  -bottom-[0.5px]  ${
              router.locale === "ar"
                ? "right-0 translate-x-[50%]"
                : "left-0 -translate-x-[50%]"
            }`}
          >
            <img
              src="/svg/paid2.svg"
              alt="khuloud amir"
              className="w-[220px] h-[400px] object-cover"
            />
          </div>
          <div className="lg:hidden flex flex-col-reverse ">
            <div className="flex justify-between items-end">
              <img
                src="/svg/paid2.svg"
                alt="khuloud amir"
                className="w-[182px] h-[291px] object-cover"
              />
            </div>
            <div className="lg:hidden block">
              <Content
                IsMobile
                item={item}
                openConfirm={openConfirm}
                setOpenConfirm={setOpenConfirm}
              />
            </div>
          </div>
          <div className="lg:block hidden">
            <Content
              item={item}
              openConfirm={openConfirm}
              setOpenConfirm={setOpenConfirm}
            />
          </div>
        </div>
      </div>

      <RtlConversion rtl={router.locale === "ar" ? true : false}>
        <Modal
          open={openConfirm}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ProtectedRoute>
            <Box sx={style}>
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col items-center gap-10">
                  <span className="text-base text-[#565656]">
                    {t(
                      "please enter a date for your consultation and your whatsapp"
                    )}
                  </span>
                  <div className="flex flex-col gap-5 w-full">
                    {/* <TextField
                    name="date"
                    value={formik.values.date}
                    onChange={(e) =>
                      setFields({ ...fields, date: e.target.value })
                    }
                    type="datetime-local"
                    sx={{
                      width: 480,
                    }}
                    inputProps={{
                      min: `${new Date()?.toISOString()?.substring(0, 16)}`,
                    }}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date}
                    label={t("date")}
                  /> */}

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        sx={{
                          width: 480,
                        }}
                        renderInput={(props) => (
                          <TextField
                            sx={{
                              width: "100%",
                            }}
                            {...props}
                          />
                        )}
                        label={t("DateTimePicker")}
                        name="date"
                        value={formik.values.date}
                        onChange={(e) => {
                          setValue(dayjs(e).format("YYYY-MM-DDThh:mm"));

                          setFields({ ...fields, date: value });
                        }}
                        error={
                          formik.touched.date && Boolean(formik.errors.date)
                        }
                        helperText={formik.touched.date && formik.errors.date}

                        // onChange={(newValue) => {
                        //   setValue(newValue);
                        // }}
                      />
                    </LocalizationProvider>

                    <TextField
                      name="whatsApp"
                      label={t("WhatsApp")}
                      variant="outlined"
                      fullWidth
                      value={formik.values.whatsApp}
                      onChange={(e) =>
                        setFields({ ...fields, whatsApp: e.target.value })
                      }
                      error={
                        formik.touched.whatsApp &&
                        Boolean(formik.errors.whatsApp)
                      }
                      helperText={
                        formik.touched.whatsApp && formik.errors.whatsApp
                      }
                    />
                  </div>
                  <div className="w-full flex lg:flex-row flex-col lg:items-center gap-14">
                    <button
                      onClick={() => setOpenConfirm(false)}
                      className="text-white py-3 bg-black rounded-lg w-[217px]"
                    >
                      {t("Cancel")}
                    </button>
                    <button
                      type="submit"
                      className="text-white py-3 bg-primary rounded-lg w-[217px]"
                    >
                      {t("Confirm")}
                    </button>
                  </div>
                </div>
              </form>
            </Box>
          </ProtectedRoute>
        </Modal>
      </RtlConversion>
    </div>
  );
};

export default ConsultationCard;

const Content = ({ item, openConfirm, setOpenConfirm }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const router = useRouter();

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const { t } = useTranslation();
  return (
    <div
      className={` ${router.locale === "ar" ? "font-Cairo" : "font-Poppins"}`}
    >
      <div
        className={`  lg:px-auto px-8 pt-12  lg:pb-8 relative ${
          router.locale === "ar"
            ? "lg:pl-10 lg:pr-[110px]"
            : "lg:pr-10 lg:pl-[110px]"
        }`}
      >
        <div
          className={`flex flex-col gap-2 lg:gap-6  ${
            router.locale === "ar" ? " text-right " : "text-left"
          } `}
        >
          <div
            className={` bg-primary absolute  top-0 flex items-center justify-center ${
              router.locale === "ar" ? " left-0 shape-rtl" : "right-0 shape-ltr"
            } `}
          >
            <p
              className={`font-semibold text-white text-xl  capitalize  mb-3 ${
                router.locale === "ar" ? "mr-3" : "ml-3"
              }`}
            >
              {item.is_paid ? item.price + "$" : t("Free")}
            </p>
          </div>
          <div
            className={`flex flex-col gap-2  ${
              router.locale === "ar" ? "pr-[10px]" : "pl-[10px]"
            } `}
          >
            <span className="font-semibold text-secondary text-xl  capitalize cursor-pointer">
              {item?.title}
            </span>
            <div className="text-[#565656] text-base max-w-[380px]  relative min-h-[100px]">
              {isReadMore
                ? parse(item?.description?.slice(0, 100))
                : parse(item?.description)}

              {item?.description?.length > 150 && (
                <span className="font-semibold" onClick={toggleReadMore}>
                  {isReadMore ? t("read more") : t("show less")}
                </span>
              )}
            </div>
          </div>
          <div
            className={` ${router.locale === "ar" ? "pr-[10px]" : "pl-[10px]"}`}
          >
            <ButtonBase
              onClick={async (e) => {
                e.stopPropagation();
                setOpenConfirm(true);
              }}
              className="bg-white  text-[#A93396] ha:hover:bg-[#A93396] ha:hover:text-white duration-300 capitalize "
              sx={{
                border: 1,
                borderColor: "#A93396",
                borderRadius: "8px",
                color: "#A93396",
                fontSize: "18px",
                fontWeight: "500",
                height: "60px",
                width: "100%",
                px: "40px",
              }}
              variant="outlined"
            >
              {t("book now")}
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
};
