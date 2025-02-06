import { useState } from "react";

//mui
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

//component
import TabPanel from "../components/TabPanel";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
//hooks
import useTranslation from "../hooks/useTranslation";
import { useRouter } from "next/router";
import { autocompleteClasses } from "@mui/material";

const AuthLayout = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className="flex lg:flex-row flex-col-reverse justify-center  lg:gap-40 gap-10 lg:pb-14 pb-6 lg:pt-0 pt-3">
      <div className={`block mx-auto  `}>
        <Box className="lg:pt-16" sx={{ width: "100%" }}>
          <Box>
            <Tabs
              sx={{
                "& .MuiButtonBase-root.MuiTab-root": {
                  color: "black",
                  width: "180px",
                  fontSize: "24px",

                  fontFamily:
                    router.locale === "ar" ? "font-Cairo" : "font-Poppins",

                  textTransform: "capitalize",
                },
                "& .Mui-selected": {
                  color: "#A93396!important",
                },
              }}
              TabIndicatorProps={{
                style: {
                  background: "#A93396",
                  height: 6,
                  borderRadius: " 6.73913px 6.73913px 0px 0px",
                },
              }}
              value={value}
              onChange={handleChange}
            >
              <Tab label={t("Sign in")} {...a11yProps(1)} />
              <Tab label={t("sign up")} {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <LoginForm />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RegisterForm value={value} setValue={setValue} />
          </TabPanel>
        </Box>
      </div>

      <img
        src="/images/khulood_2.png"
        alt="khouloud amir"
        className="lg:block hidden"
      />
      <img
        src="/images/khulood_2_mob_.png"
        width={360}
        height={530}
        alt="khouloud amir"
        className="lg:hidden block mx-auto"
      />
    </div>
  );
};

export default AuthLayout;
