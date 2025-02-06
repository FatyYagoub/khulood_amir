import React from "react";

//components
import Header from "../../components/Header";
import LogoHeader from "../../components/LogoHeader";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";

//layouts
import MainLayout from "../../layouts/MainLayout";
import InterviewDetailsLayout from "../../layouts/InterviewDetailsLayout";

import { useRouter } from "next/router";

const InterviewDetail = () => {
  const router = useRouter();
  return (
    <ProtectedRoute>
      <Layout title="Khouloud Amir">
        <div className="lg:block hidden">
          <Header />
          <LogoHeader />
        </div>
        <MainLayout active={"interview"}>
          <InterviewDetailsLayout />
        </MainLayout>
        <Footer />
      </Layout>
    </ProtectedRoute>
  );
};

export default InterviewDetail;
