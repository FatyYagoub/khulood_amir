import React from "react";
import { storeContext } from "../global/store";
import { useRouter } from "next/router";

//components
import Layout from "../components/Layout";
import Header from "../components/Header";
import LogoHeader from "../components/LogoHeader";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";

//layouts
import MainLayout from "../layouts/MainLayout";

import CheckoutLayout from "../layouts/CheckoutLayout";

export default function Cart() {
  const router = useRouter();
  const from = router.query.from;

  return (
    <ProtectedRoute>
      <Layout title="Khouloud Amir">
        <div className="lg:block hidden">
          <Header />
          <LogoHeader />
        </div>
        <MainLayout
          active={
            from === "/cart"
              ? "cart"
              : from === "/session"
              ? "session"
              : "consultation"
          }
        >
          <CheckoutLayout />
        </MainLayout>
        <Footer />
      </Layout>
    </ProtectedRoute>
  );
}
