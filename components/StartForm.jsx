import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-nextjs-toast";

//mui
import { Button, CircularProgress, TextField } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

//form
import { useFormik } from "formik";
import * as Yup from "yup";
//hooks
import useTranslation from "../hooks/useTranslation";
import { addToNewsletter } from "../services/newsletter";

const StartForm = () => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  const NewsletterSchema = Yup.object().shape({
    name: Yup.string().required(t("this field is required.")),
    email: Yup.string()
      .email(t("Wrong email address"))
      .required(t("this field is required.")),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: fields?.name,
      email: fields?.email,
    },
    validationSchema: NewsletterSchema,
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      let res = await addToNewsletter({
        name: values.name,
        email: values.email,
      });
      console.log(res);
      if (res && res.data && res.status === 201) {
        setFields({ ...fields, name: "", email: "" });
        toast.notify(t("Contact created successfully"));
      } else if (
        res &&
        res.error.response.data.email[0] ===
          "Subscriber with this email already exists."
      ) {
        toast.notify(t("Subscriber with this email already exists."));
      } else {
        alert(t("Failed, please check that the text fields are not empty"));
      }
      setLoading(false);
    },
  });
  return (
    <div className=" w-full flex justify-center max-w-[360px] md:max-w-[700px] lg:max-w-full mt-20 mb-10 ">
      <div className=" py-6  px-4 lg:px-10 border border-[#9F9F9F] rounded-2xl w-full lg:w-2/3">
        <div className="flex flex-col items-center gap-6 justify-center text-center">
          <span className="lg:text-xl text-base tracking-[0.14em] leading-5  text-center">
            {t(
              "Don't know how to start living the life of your dreams? reach me out"
            )}
          </span>
          <form className="w-full" onSubmit={formik.handleSubmit}>
            <div className="w-full flex md:flex-row flex-col items-center justify-between gap-4">
              <TextField
                fullWidth
                type="text"
                placeholder={t("Full Name")}
                className="w-full border text-base border-[#9F9F9F]  rounded-lg outline-none"
                value={formik.values.name}
                onChange={(e) => setFields({ ...fields, name: e.target.value })}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <TextField
                fullWidth
                type="text"
                placeholder={t("Email address")}
                className=" w-full border text-base border-[#9F9F9F]  rounded-lg outline-none"
                value={formik.values.email}
                onChange={(e) =>
                  setFields({ ...fields, email: e.target.value })
                }
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              {loading ? (
                <Button
                  className="bg-secondary  "
                  sx={{
                    backgroundColor: "#0F114B",
                    borderRadius: "8px",
                    fontSize: "18px",
                    fontWeight: "500",
                    height: "55px",
                    px: "50px",
                    "&:hover": {
                      backgroundColor: "rgba(15, 17, 75, 0.9)",
                    },
                  }}
                  variant="contained"
                >
                  <CircularProgress className="text-white" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-secondary  "
                  sx={{
                    backgroundColor: "#0F114B",
                    borderRadius: "8px",
                    fontSize: "18px",
                    fontWeight: "500",
                    height: "55px",
                    px: "50px",
                    "&:hover": {
                      backgroundColor: "rgba(15, 17, 75, 0.9)",
                    },
                  }}
                  variant="contained"
                >
                  <div className="flex items-center gap-4">
                    <span>{t("start")}</span>
                    <ArrowForwardIcon
                      sx={{
                        fontSize: 22,
                        rotate: router.locale === "ar" && "180deg",
                      }}
                    />
                  </div>
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StartForm;
