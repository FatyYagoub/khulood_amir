import React from "react";

//components
import Layout from "../components/Layout";
import Header from "../components/Header";
import LogoHeader from "../components/LogoHeader";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";

//layouts
import MainLayout from "../layouts/MainLayout";

import ConsultationOwnedLayout from "../layouts/ConsultationOwnedLayout";

const Consultation = () => {
  return (
    <ProtectedRoute>
      <Layout title="Khouloud Amir">
        <div className="lg:block hidden">
          <Header />
          <LogoHeader />
        </div>
        <MainLayout active="consultation" subActive="consultation">
          <ConsultationOwnedLayout />
        </MainLayout>

        <Footer />
      </Layout>
    </ProtectedRoute>
  );
};

export default Consultation;
