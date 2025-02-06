import React from "react";

//components
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import LogoHeader from "../../components/LogoHeader";
import Footer from "../../components/Footer";
import ProtectedRoute from "../../components/ProtectedRoute";

//layouts
import MainLayout from "../../layouts/MainLayout";
import CourseLayout from "../../layouts/CourseLayout";

const Courses = () => {
  return (
    <ProtectedRoute>
      <Layout title="Khouloud Amir">
        <div className="lg:block hidden">
          <Header />
          <LogoHeader />
        </div>
        <MainLayout active="session" subActive="course">
          <CourseLayout />
        </MainLayout>

        <Footer />
      </Layout>
    </ProtectedRoute>
  );
};

export default Courses;
