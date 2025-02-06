import React from "react";

//components
import Header from "../components/Header";
import LogoHeader from "../components/LogoHeader";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

//layouts
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

const Auth = () => {
  return (
    <Layout title="Khouloud Amir">
      <div className="lg:block hidden">
        <Header />
        <LogoHeader />
      </div>
      <MainLayout active="home">
        <AuthLayout />
      </MainLayout>

      <Footer />
    </Layout>
  );
};

export default Auth;
