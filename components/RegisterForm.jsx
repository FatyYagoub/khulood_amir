import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { storeContext } from "../global/store";

//mui
import { Button, ButtonBase, Divider, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

//Form
import { setNestedObjectValues, useFormik } from "formik";
import * as Yup from "yup";
import jwt from "jwt-decode";

//google
import { GoogleLogin } from "react-google-login";
//services
import { storeTheUser, loginWithGoogle, signup } from "../services/auth";

import { toast, ToastContainer } from "react-nextjs-toast";
import { useRouter } from "next/router";
import useTranslation from "../hooks/useTranslation";

const RegisterForm = ({ setValue }) => {
  const { t } = useTranslation();
  const { store, setStore } = useContext(storeContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object({
    username: Yup.string().required(t("This field is required")),
    email: Yup.string()
      .email(t("Wrong email address"))
      .required(t("This field is required")),
    password: Yup.string()
      .required(t("This field is required"))
      .min(8, t("password to short, should be at least 8 characters long")),
    confirmPassword: Yup.string()
      .required(t("This field is required"))
      .oneOf([Yup.ref("password"), null], t("passwords should be the same")),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const { username, password, email } = values;
      const res = await signup(
        {
          email,
          password,
          username,
          given_name: username,
          family_name: username,
          auth_provider: "email",
        },
        router.locale
      );
      // console.log(res);
      if (res && res.data && res.status === 200) {
        setLoading(false);
        toast.notify(`${t(res.data.message)} ✔`);
        setValue(0);
        // router.push("/auth");
      } else {
        setLoading(false);
        toast.notify(t(res.data.message));
      }
      console.log(res.data.message);
      setLoading(false);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={` ${router.locale === "ar" ? "font-Cairo" : "font-Poppins"}`}
    >
      <div className="flex flex-col gap-8">
        <TextField
          type="text"
          name="username"
          placeholder={t("Full Name")}
          className="border text-base mt-8 border-[#9F9F9F] h-[60px] rounded-lg w-full outline-none"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          type="email"
          name="email"
          placeholder={t("Email address")}
          className="border text-base border-[#9F9F9F] h-[60px] rounded-lg w-full outline-none"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          type="password"
          name="password"
          placeholder={t("password")}
          className="border text-base border-[#9F9F9F] h-[60px] rounded-lg w-full outline-none"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          type="password"
          name="confirmPassword"
          placeholder={t("Confirm password")}
          className="border text-base border-[#9F9F9F] h-[60px] rounded-lg w-full outline-none"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        {loading ? (
          <ButtonBase
            className="bg-primary ha:hover:bg-darkPurple duration-300 capitalize"
            sx={{
              backgroundColor: "#A93396",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "500",
              height: "60px",
              px: "40px",
            }}
            variant="contained"
          >
            <CircularProgress className="text-white" />
          </ButtonBase>
        ) : (
          <ButtonBase
            type="submit"
            className="bg-primary ha:hover:bg-darkPurple text-white duration-300  capitalize"
            sx={{
              border: 1,
              borderColor: "#A93396",
              backgroundColor: "#A93396",
              color: "#FFFFFF",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "500",
              height: "60px",
              px: "40px",
            }}
            variant="contained"
          >
            {t("sign up")}
          </ButtonBase>
        )}
        <Divider
          sx={{
            color: "#D8D8D8",
          }}
        >
          <span className="text-[#636363] text-base ">{t("Or")}</span>
        </Divider>
        <GoogleLogin
          clientId="779569317705-me5eddufquua7b46t3noklraqq9h6856.apps.googleusercontent.com"
          render={(renderProps) => (
            <div className="w-full flex flex-row items-center">
              <button
                className="rounded-lg w-full border border-black ha:hover:bg-[#efeeef]"
                onClick={renderProps.onClick}
              >
                <div className="flex justify-center items-center gap-3 h-[60px] px-[40px]">
                  <img src="/svg/google.svg" alt="google"></img>
                  <span className=" text-base font-medium">
                    {t("with google")}
                  </span>
                </div>
              </button>
            </div>
          )}
          onSuccess={async (res) => {
            let token = res.tokenId;
            let user = { ...jwt(token) };

            let values = {
              username: user.name,
              email: user.email,
              auth_provider: "google.com",
              family_name: user.family_name,
              given_name: user.given_name,
              image: user.picture,
            };

            const res2 = await loginWithGoogle(values);
            // console.log("test", res2);
            if (res2 && res2.status === 200 && res2.data) {
              const token2 = res2.data.access;
              const refresh2 = res2.data.refresh;
              const user2 = jwt(res2.data.access);
              setStore({
                ...store,
                token2,
                user2,
                isLogged: true,
              });
              storeTheUser(user2, token2, refresh2);

              item?.from ? router.push(item?.from) : router.push("/");
            } else {
              toast.notify("There is something wrong.");
            }
          }}
          onFailure={(res) => {
            console.log(res);
          }}
        />
      </div>
    </form>
  );
};

export default RegisterForm;
