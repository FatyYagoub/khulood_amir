import React from "react";

//components
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import LogoHeader from "../../components/LogoHeader";
import Footer from "../../components/Footer";

//layouts
import MainLayout from "../../layouts/MainLayout";
import ForgetPasswordLayout from "../../layouts/ForgetPasswordLayout";

const ForgetPassword = () => {
  return (
    <Layout title="Khouloud Amir">
      <Header />
      <LogoHeader />
      <MainLayout active="home">
        <ForgetPasswordLayout />
      </MainLayout>
      <Footer />
    </Layout>
  );
};

export default ForgetPassword;
