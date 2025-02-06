import React from "react";
import { useRouter } from "next/router";
import StoreProvider from "../global/StoreProvider";

//fonts
import { Poppins, Cairo } from "@next/font/google";

const poppins = Poppins({ weight: "400" });
const cairo = Cairo({ weight: "400" });

//styles
import "../styles/globals.css";
import { ToastContainer } from "react-nextjs-toast";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // React.useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector("#jss-server-side");
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }
  // }, []);

  return (
    <>
      <StoreProvider>
        <div
          onCopy={(event) => {
            event.preventDefault();
          }}
          className={
            router.locale === "ar" ? cairo.className : poppins.className
          }
          dir={router.locale === "ar" ? "rtl" : "ltr"}
        >
          <ToastContainer align={"left"} />

          <Component {...pageProps} />
        </div>
      </StoreProvider>
    </>
  );
}

export default MyApp;
