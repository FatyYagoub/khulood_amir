import React from "react";
import Head from "next/head";

const Layout = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <link rel="icon" href="/khulood_fav.ico" />
      </Head>
      {props.children}
    </>
  );
};

export default Layout;
