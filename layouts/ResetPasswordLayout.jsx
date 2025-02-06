import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { storeContext } from "../global/store";
//form
import * as Yup from "yup";
import { useFormik } from "formik";
import { ref } from "yup";
//services
import { resetPasswordToken } from "../services/auth";

//mui
import { Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//hooks
import useTranslation from "../hooks/useTranslation";

const ResetPasswordLayout = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [resetPassword, setResetPassword] = useState(false);
  const { store } = useContext(storeContext);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, t("password to short, should be at least 8 characters long"))
      .required(t("This field is required")),
    confirmPassword: Yup.string()
      .min(8, t("password to short, should be at least 8 characters long"))
      .required(t("This field is required"))
      .oneOf([ref("password")], t("passwords should be the same")),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const { token } = router.query;
      const res = await resetPasswordToken(
        { password: values.password },
        token
      );
      // console.log(res);
      setLoading(false);
      if (res && res.status === 200) {
        setResetPassword(true);
        console.log("password changed");
      } else {
        console.log(" error ,password didnt change");
        alert(res.data.message);
      }
    },
  });

  return (
    <div className="border-t border-[#D8D8D8]">
      <div className="py-20">
        <div className="flex flex-col items-center gap-8">
          {/* <img src="/svg/logo-final.svg" alt="logo" className="w-32 h-32" /> */}

          <span className="max-w-[800px] font-bold text-[24px] text-[#565656] text-center">
            {t("Reset Password")}
          </span>

          {!resetPassword ? (
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-4 mt-8 w-[400px]">
                <TextField
                  fullWidth
                  type="password"
                  name="password"
                  placeholder={t("Password")}
                  className="border text-base mt-8 border-[#9F9F9F]  h-[60px] rounded-lg w-full outline-none"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                  fullWidth
                  type="password"
                  name="confirmPassword"
                  placeholder={t("Confirm password")}
                  className="border text-base mt-8 border-[#9F9F9F]  h-[60px] rounded-lg w-full outline-none"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
                {loading ? (
                  <Button
                    className="bg-[#A93396] ha:hover:bg-darkPurple duration-300  capitalize mt-10 "
                    sx={{
                      backgroundColor: "#A93396",
                      borderRadius: "8px",
                      fontSize: "18px",
                      color: "#FFF",
                      fontWeight: "500",
                      height: "60px",
                      px: "40px",
                    }}
                    variant="contained"
                  >
                    <CircularProgress className="text-white" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-[#A93396] ha:hover:bg-darkPurple duration-300  capitalize mt-10 "
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
                    {t("Reset Password")}
                  </Button>
                )}
              </div>
            </form>
          ) : (
            <>
              <span className="max-w-[800px] font-medium text-[24px] text-[#565656] text-center">
                {t("your password was updated successfully")}
              </span>

              <Button
                onClick={() => router.push("/")}
                className="bg-[#A93396] ha:hover:bg-darkPurple duration-300  capitalize mt-10"
                sx={{
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
                {t("go to homepage")}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordLayout;
