import Layout from "../../components/Layout";
import Header from "../../components/Header";
import LogoHeader from "../../components/LogoHeader";
import Footer from "../../components/Footer";

//layouts
import MainLayout from "../../layouts/MainLayout";
import ResetPasswordLayout from "../../layouts/ResetPasswordLayout";

const ResetPassword = () => {
  return (
    <Layout title="Khouloud Amir">
      <Header />
      <LogoHeader />
      <MainLayout active="home">
        <ResetPasswordLayout />
      </MainLayout>
      <Footer />
    </Layout>
  );
};

export default ResetPassword;
