import React, { useState } from "react";
import { useRouter } from "next/router";
//form
import * as Yup from "yup";
import { useFormik, Form, ErrorMessage } from "formik";
//services
import { sendEmailUserActivation } from "../services/userActivation";

//mui
import { Button, ButtonBase, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//hooks
import useTranslation from "../hooks/useTranslation";

const ReactivationLayout = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [resendEmail, setResendEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
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
      const { email } = values;
      const res = await sendEmailUserActivation(email, router.locale);
      setLoading(false);
      if (res && res.status === 200) {
        setEmailSent(true);
      } else {
        alert("لا يوجد مستخدم بهذا البريد الإلكتروني");
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="border-t border-[#D8D8D8]">
      <div className="py-20">
        <div className="flex flex-col items-center gap-8">
          {/* <img src="/svg/logo-final.svg" alt="logo" className="w-32 h-32" /> */}

          {!emailSent && (
            <span className="max-w-[800px] font-medium text-[24px] text-[#565656] text-center">
              {t(
                "An activation email has been sent to your email address, you can Resend and email by clicking the button"
              )}
            </span>
          )}
          {!resendEmail && !emailSent && (
            <Button
              className="bg-[#A93396] ha:hover:bg-darkPurple duration-300  capitalize mt-10"
              sx={{
                backgroundColor: "#A93396",
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "500",
                height: "60px",
                px: "40px",
              }}
              variant="contained"
              onClick={() => setResendEmail(true)}
            >
              {t("resend")}
            </Button>
          )}
          {resendEmail && !emailSent && (
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
                    <CircularProgress className="text-white" />
                  </Button>
                ) : (
                  <ButtonBase
                    type="submit"
                    className="bg-[#A93396] ha:hover:bg-darkPurple duration-300  capitalize mt-10 "
                    sx={{
                      backgroundColor: "#A93396",
                      borderRadius: "8px",
                      fontSize: "18px",
                      color: "#FFFFFF",
                      fontWeight: "500",
                      textTransform: "capitalize",
                      height: "60px",
                      px: "40px",
                      "&:hover": {
                        backgroundColor: "#6B185E",
                      },
                    }}
                    variant="contained"
                  >
                    {t("send")}
                  </ButtonBase>
                )}
              </div>
            </form>
          )}

          {emailSent && (
            <>
              <span className="max-w-[800px] font-medium text-[24px] text-[#565656] text-center">
                {t("A new email has been sent to your email address")}
              </span>

              <Button
                onClick={() => setEmailSent(false)}
                className="bg-[#A93396]  ha:hover:bg-darkPurple  duration-300  capitalize mt-10"
                sx={{
                  backgroundColor: "#A93396",
                  borderRadius: "8px",
                  fontSize: "18px",
                  color: "#FFFFFF",
                  fontWeight: "500",
                  textTransform: "capitalize",
                  height: "60px",
                  px: "40px",
                  "&:hover": {
                    backgroundColor: "#6B185E",
                  },
                }}
                variant="contained"
              >
                {t("resend")}
              </Button>
            </>
          )}

          <Button
            onClick={() => router.push("/")}
            className="bg-white border border-[#0F114B] text-[#0F114B] ha:hover:bg-[#0F114B] ha:hover:text-white duration-300  capitalize"
            sx={{
              border: 1,
              borderColor: "#0F114B",
              backgroundColor: "#FFFFFF",
              color: "#0F114B",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "500",
              textTransform: "capitalize",
              height: "60px",
              px: "40px",
              "&:hover": {
                backgroundColor: "#0F114B",
                color: "#FFFFFF",
              },
            }}
            variant="contained"
          >
            {t("go to homepage")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReactivationLayout;
