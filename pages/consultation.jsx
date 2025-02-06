import React from "react";

//components
import Layout from "../components/Layout";
import Header from "../components/Header";
import LogoHeader from "../components/LogoHeader";
import Footer from "../components/Footer";

//layouts
import MainLayout from "../layouts/MainLayout";

import ConsultationLayout from "../layouts/ConsultationLayout";

const Consultation = () => {
  return (
    <Layout title="Khouloud Amir">
      <div className="lg:block hidden">
        <Header />
        <LogoHeader />
      </div>
      <MainLayout active="consultation">
        <ConsultationLayout />
      </MainLayout>

      <Footer />
    </Layout>
  );
};

export default Consultation;
