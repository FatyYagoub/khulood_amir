import React, { useEffect, useState, useContext } from "react";
import { storeContext } from "../global/store";

//components
import Layout from "../components/Layout";
import Header from "../components/Header";
import LogoHeader from "../components/LogoHeader";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";

//layouts
import MainLayout from "../layouts/MainLayout";

import CartLayout from "../layouts/CartLayout";

export default function Cart() {
  return (
    <ProtectedRoute>
      <Layout title="Khouloud Amir">
        <div className="lg:block hidden">
          <Header />
          <LogoHeader />
        </div>
        <MainLayout active="cart">
          <CartLayout />
        </MainLayout>
        <Footer />
      </Layout>
    </ProtectedRoute>
  );
}
