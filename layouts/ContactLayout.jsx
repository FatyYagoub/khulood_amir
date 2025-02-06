import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-nextjs-toast";

//form
import * as Yup from "yup";
import { useFormik } from "formik";

//Hooks
import useTranslation from "../hooks/useTranslation";
//backend
import useSWR from "swr";
import { domain } from "../global/domain";
//services
import { fetcher } from "../services/fetcher";
import { ButtonBase, Skeleton, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { sendMessage } from "../services/contactUs";

const ContactLayout = () => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  const SubSchema = Yup.object().shape({
    name: Yup.string().required(t("this field is required.")),
    email: Yup.string()
      .email(t("Wrong email address"))
      .required(t("this field is required.")),
    message: Yup.string().required(t("this field is required.")),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: fields?.name,
      email: fields?.email,
      message: fields?.message,
    },
    validationSchema: SubSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let res = await sendMessage({
        name: values.name,
        email: values.email,
        number: null,
        message: values.message,
      });

      if (res && res.data && res.status === 201) {
        setFields({ ...fields, name: "", email: "", message: "" });
        toast.notify(t("Your message has been sent successfully"));
      } else {
        alert(
          t(
            "your message has not been sent, please check that the text fields are not empty"
          )
        );
      }
      setLoading(false);
    },
  });

  return (
    <>
      <div className="lg:py-16 py-10 lg:px-0 px-8 lg:max-w-[1200px] lg:mx-auto">
        {/* <span className="lg:text-[48px] text-xl font-semibold leading-[87px] text-primary uppercase">
          {t("contactUs")}
        </span> */}

        <div className=" flex items-center relative  mx-auto  ">
          <img
            src="/images/contactUs.jpg"
            alt="shape"
            width={860}
            height={918}
            className={`absolute  ${
              router.locale === "ar" ? " left-0" : " right-0"
            }`}
          />
          <div className="w-full  mx-auto my-auto">
            <div className="px-2 lg:px-6 w-full lg:w-3/5 py-2 ">
              <div
                className="transform flex flex-col bg-white bg-opacity-80 px-2 sm:px-8 py-4"
                style={{
                  boxShadow:
                    "0px 4px 7px -1px rgba(0, 0, 0, 0.11), 0px 2px 4px -1px rgba(0, 0, 0, 0.07)",
                  borderRadius: "8px",
                }}
              >
                <div className="flex flex-col items-center justify-center gap-y-4 pb-4 px-2 sm:px-12">
                  <h1 className="text-primary text-3xl font-bold capitalize">
                    {t("Contact us")}
                  </h1>
                  <p className="text-center text-base">
                    {t(
                      "For further questions, including partnership opportunities, please text to us using our contact form."
                    )}
                  </p>
                </div>
                <form
                  className="flex flex-col items-start justify-center  gap-y-6"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="grid gap-2 grid-cols-1 md:grid-cols-2  w-full ">
                    <TextField
                      name="name"
                      placeholder={t("Full Name")}
                      value={formik.values.name}
                      onChange={(e) =>
                        setFields({ ...fields, name: e.target.value })
                      }
                      className="w-full border text-base border-[#9F9F9F]  rounded-lg outline-none focus:outline-none"
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      label={t("name")}
                    />
                    <TextField
                      name="email"
                      placeholder={t("Email address")}
                      value={formik.values.email}
                      onChange={(e) =>
                        setFields({ ...fields, email: e.target.value })
                      }
                      className="w-full border text-base border-[#9F9F9F]  rounded-lg outline-none focus:outline-none"
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      label={t("email")}
                    />
                  </div>

                  <TextField
                    name="message"
                    placeholder={t(
                      "Describe your problem in at least 250 characters"
                    )}
                    fullWidth
                    multiline
                    value={formik.values.message}
                    rows={5}
                    onChange={(e) =>
                      setFields({ ...fields, message: e.target.value })
                    }
                    className="w-full border text-base border-[#9F9F9F]  rounded-lg outline-none focus:outline-none"
                    error={
                      formik.touched.message && Boolean(formik.errors.message)
                    }
                    helperText={formik.touched.message && formik.errors.message}
                    label={t("How can we help you?")}
                  />
                  <div className="flex py-4 lg:px-4 items-center justify-center w-full ">
                    {loading ? (
                      <ButtonBase>
                        <div className="bg-primary flex rounded-xl items-center justify-center border-1 border-secondary cursor-wait ">
                          <span className="text-sm uppercase text-white py-2 px-6">
                            {t("send message")}...
                          </span>
                        </div>
                      </ButtonBase>
                    ) : (
                      <ButtonBase className="" type="submit">
                        <div className="bg-primary flex rounded-xl items-center justify-center border-1 border-secondary cursor-pointer">
                          <span className="text-sm uppercase text-white py-2 px-6">
                            {t("send message")}
                          </span>
                        </div>
                      </ButtonBase>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactLayout;
