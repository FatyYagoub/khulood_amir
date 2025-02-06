import React from "react";

//components
import Header from "../../../components/Header";
import LogoHeader from "../../../components/LogoHeader";
import Footer from "../../../components/Footer";
import Layout from "../../../components/Layout";

//layouts
import MainLayout from "../../../layouts/MainLayout";
import PaidContentLayout from "../../../layouts/PaidContentLayout";

const PaidContent = () => {
  return (
    <Layout title="Khouloud Amir">
      <div className="lg:block hidden">
        <Header />
        <LogoHeader />
      </div>
      <MainLayout active="paidContent">
        <PaidContentLayout />
      </MainLayout>
      <Footer />
    </Layout>
  );
};

export default PaidContent;
