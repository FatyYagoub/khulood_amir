import React from "react";

//components
import Header from "../../../components/Header";
import LogoHeader from "../../../components/LogoHeader";
import Footer from "../../../components/Footer";
import Layout from "../../../components/Layout";

//layouts
import MainLayout from "../../../layouts/MainLayout";
import ContentDetailsLayout from "../../../layouts/ContentDetailsLayout";

import { useRouter } from "next/router";

const ContentDetail = () => {
  const router = useRouter();
  return (
    <Layout title="Khouloud Amir">
      <div className="lg:block hidden">
        <Header />
        <LogoHeader />
      </div>
      <MainLayout
        active={
          router.query.from === "content/paid" ? "paidContent" : "freeContent"
        }
      >
        <ContentDetailsLayout />
      </MainLayout>
      <Footer />
    </Layout>
  );
};

export default ContentDetail;
