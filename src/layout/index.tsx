import { Outlet } from "react-router-dom";
import "./style.css";
import { Footer, Navbar } from "../components/shared";

const Layout = () => {
  return (
    <section className="layout d-flex flex-column justify-content-between">
      <Navbar />

      <main className="flex-grow-1 px-3">
        <Outlet />
      </main>

      <Footer />
    </section>
  );
};

export default Layout;
