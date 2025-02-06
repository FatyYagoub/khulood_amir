import React from "react";

//components
import Layout from "../../../components/Layout";
import Header from "../../../components/Header";
import LogoHeader from "../../../components/LogoHeader";
import Footer from "../../../components/Footer";
import ProtectedRoute from "../../../components/ProtectedRoute";

//layouts
import MainLayout from "../../../layouts/MainLayout";
import CourseContentLayout from "../../../layouts/CourseContentLayout";

const Content = () => {
  return (
    <ProtectedRoute>
      <Layout title="Khouloud Amir">
        <div className="lg:block hidden">
          <Header />
          <LogoHeader />
        </div>
        <MainLayout active="paidContent" subActive="course">
          <CourseContentLayout />
        </MainLayout>
        <Footer />
      </Layout>
    </ProtectedRoute>
  );
};

export default Content;
