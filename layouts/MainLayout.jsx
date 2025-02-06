import { useEffect, useState } from "react";

//components
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/NavbarMobile";

const MainLayout = ({ children, active, subActive }) => {
  //400 sticky
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY >= 700) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", (e) => {
        setSticky(false);
      });
    };
  }, []);
  return (
    <>
      <main
        className={
          sticky
            ? "fixed top-0 w-full z-40 bg-white border-b border-[#D8D8D8] duration-300"
            : "block duration-300"
        }
      >
        <div className="lg:block hidden mx-auto max-w-[1200px]">
          {active && (
            <Navbar sticky={sticky} active={active} subActive={subActive} />
          )}
        </div>
        <div className="lg:hidden block">
          <NavbarMobile sticky={sticky} active={active} subActive={subActive} />
        </div>
      </main>
      <div className="max-w-[1200px] mx-auto">{children}</div>
    </>
  );
};

export default MainLayout;
