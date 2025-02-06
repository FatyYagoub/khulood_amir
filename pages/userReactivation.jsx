import React from "react";

//components
import Layout from "../components/Layout";
import Header from "../components/Header";
import LogoHeader from "../components/LogoHeader";
import Footer from "../components/Footer";

//layouts
import MainLayout from "../layouts/MainLayout";
import ReactivationLayout from "../layouts/ReactivationLayout";

const UserReactivation = () => {
  return (
    <Layout title="Khouloud Amir">
      <Header />
      <LogoHeader />
      <MainLayout active="home">
        <ReactivationLayout />
      </MainLayout>
      <Footer />
    </Layout>
  );
};

export default UserReactivation;
