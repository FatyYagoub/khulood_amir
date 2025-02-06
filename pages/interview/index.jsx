import React from "react";

//components
import Header from "../../components/Header";
import LogoHeader from "../../components/LogoHeader";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";

//layouts
import MainLayout from "../../layouts/MainLayout";
import InterviewLayout from "../../layouts/InterviewLayout";

const Interview = () => {
  return (
    <Layout title="Khouloud Amir">
      <div className="lg:block hidden">
        <Header />
        <LogoHeader />
      </div>
      <MainLayout active="interview">
        <InterviewLayout />
      </MainLayout>
      <Footer />
    </Layout>
  );
};

export default Interview;
