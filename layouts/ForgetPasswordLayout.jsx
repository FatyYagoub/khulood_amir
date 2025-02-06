import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
//form
import * as Yup from "yup";
import { useFormik } from "formik";
//services
import { forgotPassword } from "../services/auth";

//mui
import { Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//hooks
import useTranslation from "../hooks/useTranslation";

const ForgetPasswordLayout = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [resetPassword, setResetPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("Wrong email address"))
      .required(t("This field is required")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const res = await forgotPassword({ ...values }, router.locale);
      setLoading(false);
      if (res && res.status === 200) {
        setResetPassword(true);
      } else {
        alert(res.data.message);
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="border-t border-[#D8D8D8]">
      <div className="py-20">
        <div className="flex flex-col items-center gap-8">
          <span className="max-w-[800px] font-bold text-[24px] text-[#565656] text-center">
            {t("Reset Password")}
          </span>

          {!resetPassword ? (
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-4 mt-8 w-[400px]">
                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  placeholder={t("email")}
                  className="border text-base mt-8 border-[#9F9F9F]  h-[60px] rounded-lg w-full outline-none"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />

                {loading ? (
                  <Button
                    className="bg-primary ha:hover:bg-darkPurple duration-300  capitalize mt-10 "
                    sx={{
                      borderRadius: "8px",
                      fontSize: "18px",
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
                    className="bg-primary ha:hover:bg-darkPurple duration-300  capitalize mt-10 "
                    sx={{
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
                {t("we have sent you an email to change your password")}
              </span>

              <Button
                onClick={() => router.push("/")}
                className="bg-primary ha:hover:bg-darkPurple duration-300 capitalize mt-10"
                sx={{
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

export default ForgetPasswordLayout;
