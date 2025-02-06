import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { storeContext } from "../global/store";

//mui
import { Button, ButtonBase, Divider, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

//Form
import { useFormik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import jwt from "jwt-decode";

//google
import { GoogleLogin } from "react-google-login";
//services
import { login, storeTheUser, loginWithGoogle } from "../services/auth";

import { toast, ToastContainer } from "react-nextjs-toast";
import { useRouter } from "next/router";
import useTranslation from "../hooks/useTranslation";

const LoginForm = () => {
  const { t } = useTranslation();
  const { store, setStore } = useContext(storeContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // console.log(router);

  const item = router.query;

  useEffect(() => {
    if (store.isLogged) {
      router.push("/");
    }
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("Wrong email address"))
      .required(t("This field is required")),
    password: Yup.string()
      .required(t("This field is required"))
      .min(8, t("password to short, should be at least 8 characters long")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await login(values);
      // console.log(res, "👀");
      if (res && res.status === 200 && res.data) {
        // console.log("user exists");

        const token = res.data.access;
        // console.log(token);
        const refresh = res.data.refresh;
        // console.log(refresh);
        const user = jwt(res.data.access);
        // console.log(user);

        /* Setting the store with user */

        const exp = new Date(user.exp * 1000);
        const now = new Date();
        const isLogged = now < exp ? true : false;
        setStore({
          ...store,
          isLogged,
          user,
          token: res.data.access,
        });
        storeTheUser(user, token, refresh);
        // console.log(store);

        item?.from ? router.push(item?.from) : router.push("/");
      }
      if (
        res &&
        res.status === 400 &&
        res.data.message === "There's no active account with this credentials"
      ) {
        setLoading(false);
        router.push("/userReactivation");
      } else if (
        res &&
        res.status === 400 &&
        res.data.message === "Wrong password"
      ) {
        setLoading(false);
        toast.notify(t("Wrong password"));
      } else if (
        res &&
        res.status === 400 &&
        res.data.message === "User already registered with google"
      ) {
        setLoading(false);
        toast.notify(
          t(
            "account registered with google, please try to login with google button below"
          )
        );
      } else if (
        res &&
        res.status === 400 &&
        res.data.message !== "User already registered with google" &&
        res.data.message !== "There's no active account with this credentials"
      ) {
        setLoading(false);
        toast.notify(t(res.data.message));
      }

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
          type="email"
          name="email"
          placeholder={t("Email address")}
          className="border text-base mt-8 border-[#9F9F9F]  h-[60px] rounded-lg w-full outline-none"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          placeholder={t("password")}
          className="border text-base border-[#9F9F9F] h-[60px] rounded-lg w-full outline-none"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <span className="text-base text-[#636363] leading-7 font-normal">
          {t("Forgot your password?")}
          <Link href="/reset_password">
            <span className="text-primary font-semibold mx-1">
              {t("click here")}
            </span>
          </Link>
        </span>
        {loading ? (
          <ButtonBase
            className="bg-primary ha:hover:bg-darkPurple duration-300 font-Poppins capitalize"
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
            className={`bg-[#A93396] ha:hover:bg-darkPurple text-white duration-300 capitalize ${
              router.locale === "ar" ? "font-Cairo" : "font-Poppins"
            } `}
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
            {t("Login")}
          </ButtonBase>
        )}
        <Divider
          sx={{
            color: "#D8D8D8",
          }}
        >
          <span className="text-[#636363] text-base font-Poppins">
            {t("Or")}
          </span>
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
                  <span className="font-Poppins text-base font-medium">
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

              const exp2 = new Date(user2.exp * 1000);
              const now2 = new Date();
              const isLogged = now2 < exp2 ? true : false;
              setStore({
                ...store,
                token2: res2.data.access,
                user2,
                isLogged,
              });
              storeTheUser(user2, token2, refresh2);

              item?.from ? router.push(item?.from) : router.push("/");
            }
            if (
              res2 &&
              res2?.response?.status === 400 &&
              res2?.response?.data?.message ===
                "this account is not registered with google"
            ) {
              setLoading(false);
              toast.notify(
                t(
                  "this account is not registered with google, please try to login with your email and password"
                )
              );
            } else {
              // console.log(res2);
              toast.notify(t("There is something wrong."));
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

export default LoginForm;
