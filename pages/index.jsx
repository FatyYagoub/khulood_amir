import React, { useEffect, useState, useContext } from "react";
import { storeContext } from "../global/store";

//components
import Layout from "../components/Layout";
import Header from "../components/Header";
import LogoHeader from "../components/LogoHeader";
import Footer from "../components/Footer";

//layouts
import MainLayout from "../layouts/MainLayout";
import HomeLayout from "../layouts/HomeLayout";

export default function Home() {
  const { store } = useContext(storeContext);
  return (
    <Layout title="Khouloud Amir">
      <div className="lg:block hidden">
        <Header />
        <LogoHeader />
      </div>
      <MainLayout active="home">
        <HomeLayout />
      </MainLayout>
      <Footer />
    </Layout>
  );
}
