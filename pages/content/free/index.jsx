import React from "react";

//components
import Header from "../../../components/Header";
import LogoHeader from "../../../components/LogoHeader";
import Footer from "../../../components/Footer";
import Layout from "../../../components/Layout";

//layouts
import MainLayout from "../../../layouts/MainLayout";
import FreeContentLayout from "../../../layouts/FreeContentLayout";

const ContentFree = () => {
  return (
    <Layout title="Khouloud Amir">
      <div className="lg:block hidden">
        <Header />
        <LogoHeader />
      </div>
      <MainLayout active="freeContent">
        <FreeContentLayout />
      </MainLayout>
      <Footer />
    </Layout>
  );
};

export default ContentFree;
