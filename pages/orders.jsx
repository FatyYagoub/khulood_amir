import React from "react";

//components
import Layout from "../components/Layout";
import Header from "../components/Header";
import LogoHeader from "../components/LogoHeader";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";

//layouts
import MainLayout from "../layouts/MainLayout";
import OrderLayout from "../layouts/OrderLayout";

const Orders = () => {
  return (
    <ProtectedRoute>
      <Layout title="Khouloud Amir">
        <div className="lg:block hidden">
          <Header />
          <LogoHeader />
        </div>
        <MainLayout active="session" subActive="order">
          <OrderLayout />
        </MainLayout>

        <Footer />
      </Layout>
    </ProtectedRoute>
  );
};

export default Orders;
