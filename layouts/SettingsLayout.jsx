import React, { useState, useEffect } from "react";
import { toast } from "react-nextjs-toast";
import { useRouter } from "next/router";

import Link from "next/link";

//form
import * as Yup from "yup";
import { Form, Formik, useFormik } from "formik";

//Hooks
import useTranslation from "../hooks/useTranslation";
//backend
import useSWR from "swr";
import { domain } from "../global/domain";
//services
import { fetcher } from "../services/fetcher";
import { updatePassword, updateProfile } from "../services/profile";
import { getTheUserFromStorage } from "../services/auth";
import { upload } from "../services/media";

//MUI
import {
  ButtonBase,
  CircularProgress,
  Skeleton,
  TextField,
} from "@mui/material";

import EastIcon from "@mui/icons-material/East";

const SettingsLayout = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const user = getTheUserFromStorage();
  const id = user?.user_id;
  console.log(user?.user_id);

  const [image, setImage] = useState(null);

  const validationSchema = Yup.object({
    givenName: Yup.string().required(t("This field is required")),
    familyName: Yup.string().required(t("This field is required")),
  });

  const validationSchemaPassword = Yup.object({
    oldPassword: Yup.string().required(t("This field is required")),
    newPassword: Yup.string()
      .required(t("This field is required"))
      .min(8, t("password to short, should be at least 8 characters long")),
    confirmNewPassword: Yup.string()
      .required(t("This field is required"))
      .min(8, t("password to short, should be at least 8 characters long"))
      .oneOf([Yup.ref("newPassword"), null], t("passwords should be the same")),
  });

  const { data, error } = useSWR(`${domain}/users/profile/${id}`, fetcher);
  console.log(data);

  useEffect(() => {
    console.log(data, "🎃");
    data && setImage(data.User.image);
  }, [data]);

  const formik = useFormik({
    initialValues: {
      givenName: data?.User.given_name,
      familyName: data?.User.family_name,
      // nn
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values, "👀");
      setLoading(true);
      let urlImg = null;
      console.log(image);
      if (image && typeof image !== "string") {
        console.log("true");
        const progressFn = (progressEvent) => {
          let progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
        };
        urlImg = await upload(image, progressFn);
        console.log(urlImg);
        if (urlImg) {
          setImage(urlImg);
        }
      }
      console.log(urlImg);
      let res = await updateProfile(id, {
        family_name: values.familyName,
        given_name: values.givenName,
        image: urlImg,
      });
      console.log(res);
      if (res.status === 200) {
        setLoading(false);
        toast.notify(res.data.message);
        mutate(`${domain}/users/profile/${id}`);
      } else {
        setLoading(false);
        alert("something wrong,retry");
      }
      setSubmitting(false);
    },
  });

  const formik_2 = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: validationSchemaPassword,
    onSubmit: async (values) => {
      console.log(values, "👀");
      setLoading(true);
      let res = await updatePassword({
        user: getTheUserFromStorage().user_id,
        old_password: values.oldPassword,
        new_password: values.newPassword,
      });
      console.log(res);
      if (res.status === 200) {
        setLoading(false);
        toast.notify(res.data.message);
        router.push("/");
      } else {
        setLoading(false);
        alert("something wrong,retry");
      }
    },
  });
  return (
    <>
      <div className="py-20 lg:px-0 px-8 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-5 border-b border-[#D8D8D8] pb-10">
          <Link href="/">
            <EastIcon
              size="small"
              sx={{
                rotate: router.locale !== "ar" && "180deg",
                color: "#292D32",
                cursor: "pointer",
              }}
            />
          </Link>
          <span className="capitalize lg:text-[48px] font-semibold lg:leading-[87px] text-primary text-[20px] leading-[36px]">
            {t("settings")}
          </span>
        </div>
        <div className="py-8 w-full flex flex-col lg:flex-row gap-12 justify-center">
          <div className="w-full flex flex-col  lg:w-2/3 gap-8 ">
            <h1 className="font-semibold text-base md:text-xl leading-[35px] ">
              {t("personal info")}
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="w-full flex flex-col gap-8 border-[0.4px] rounded  px-3 py-8 md:p-12">
                <div className="w-full flex flex-col md:flex-row items-center md:justify-between gap-4">
                  <TextField
                    fullWidth
                    name="givenName"
                    type="text"
                    placeholder={t("Full Name")}
                    className="w-full border text-base border-[#9F9F9F]  rounded-lg outline-none"
                    value={
                      formik.values.givenName
                        ? formik.values.givenName
                        : data?.User.given_name
                    }
                    onChange={formik.handleChange}
                    error={
                      formik.touched.givenName &&
                      Boolean(formik.errors.givenName)
                    }
                    helperText={
                      formik.touched.givenName && formik.errors.givenName
                    }
                  />

                  <TextField
                    fullWidth
                    name="familyName"
                    type="text"
                    placeholder={t("lastname")}
                    className=" w-full border text-base border-[#9F9F9F]  rounded-lg outline-none"
                    value={
                      formik.values.familyName
                        ? formik.values.familyName
                        : data?.User.family_name
                    }
                    onChange={formik.handleChange}
                    error={
                      formik.touched.familyName &&
                      Boolean(formik.errors.familyName)
                    }
                    helperText={
                      formik.touched.familyName && formik.errors.familyName
                    }
                  />
                </div>
                <div className="w-full flex flex-row items-star justify-between gap-4 ">
                  <img
                    className="w-[35px] h-[35px] md:w-[75px] md:h-[75px] rounded-full "
                    src={
                      image
                        ? typeof image === "string"
                          ? image
                          : URL.createObjectURL(image)
                        : "/svg/user-pic.svg"
                    }
                  />
                  <div className="w-full flex justify-center py-8  border-2 border-dashed rounded-lg px-2 ">
                    <div className=" flex flex-col  gap-4  text-center">
                      <img
                        width={44}
                        height={36}
                        src="/svg/uploadIcon.svg"
                        className="block mx-auto"
                      />
                      <div>
                        <input
                          onChange={(event) => {
                            if (event.target.files[0]) {
                              setImage(event.target.files[0]);
                            }
                          }}
                          id="upload-img"
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                        />
                        <div
                          onClick={() => {
                            document.querySelector("#upload-img").click();
                          }}
                        >
                          <span className="text-xs md:text-base text-primary  leading-7 font-normal hover:underline cursor-pointer ">
                            {t("upload new picture")}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs md:text-base text-grey">
                        {t("JPG or PNG , file size no more than 10MB")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end ">
                  {loading ? (
                    <button className="text-white py-3 bg-primary rounded-lg w-[170px]">
                      <CircularProgress className="text-white" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="text-white py-3 bg-primary rounded-lg w-[170px] ha:hover:bg-darkPurple duration-300"
                    >
                      {t("save")}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="w-full flex flex-col md:w-2/3 lg:w-1/3 gap-8 ">
            <h1 className="font-semibold text-base md:text-xl leading-[35px]">
              {t("change password")}
            </h1>
            <form onSubmit={formik_2.handleSubmit}>
              <div className="w-full flex flex-col gap-8 border-[0.4px] rounded  px-3 py-8 md:p-12">
                <TextField
                  name="oldPassword"
                  fullWidth
                  type="password"
                  placeholder={t("current password")}
                  className="w-full border text-base border-[#9F9F9F]  rounded-lg outline-none"
                  value={formik.values.oldPassword}
                  onChange={formik_2.handleChange}
                  error={
                    formik.touched.oldPassword &&
                    Boolean(formik.errors.oldPassword)
                  }
                  helperText={
                    formik.touched.oldPassword && formik.errors.oldPassword
                  }
                />
                <TextField
                  name="newPassword"
                  fullWidth
                  type="password"
                  placeholder={t("New password")}
                  className="w-full border text-base border-[#9F9F9F]  rounded-lg outline-none"
                  value={formik.values.newPassword}
                  onChange={formik_2.handleChange}
                  error={
                    formik.touched.newPassword &&
                    Boolean(formik.errors.newPassword)
                  }
                  helperText={
                    formik.touched.newPassword && formik.errors.newPassword
                  }
                />
                <TextField
                  name="confirmNewPassword"
                  fullWidth
                  type="password"
                  placeholder={t("Confirm password")}
                  className="w-full border text-base border-[#9F9F9F]  rounded-lg outline-none"
                  value={formik.values.confirmNewPassword}
                  onChange={formik_2.handleChange}
                  error={
                    formik.touched.confirmNewPassword &&
                    Boolean(formik.errors.confirmNewPassword)
                  }
                  helperText={
                    formik.touched.confirmNewPassword &&
                    formik.errors.confirmNewPassword
                  }
                />
                <span className="text-base text-[#636363] leading-7 font-normal text-end ">
                  {t("Forgot your password?")}
                  <Link href="/reset_password">
                    <span className="text-primary font-semibold mx-1">
                      {t("click here")}
                    </span>
                  </Link>
                </span>
                <div className="w-full flex justify-end ">
                  {loading ? (
                    <button className="text-white py-3 bg-primary rounded-lg w-[170px]">
                      <CircularProgress className="text-white" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="text-white py-3 bg-primary rounded-lg w-[170px] ha:hover:bg-darkPurple duration-300"
                    >
                      {t("save")}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsLayout;
