import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "src/components/Footer/Footer";

import Nav from "src/components/Nav/Nav";
import SortAlgorithm from "src/components/SortAlgorithm/SortAlgorithm";
// Pages
import useSession from "src/hooks/useSession";
import Admin from "src/pages/Admin/Admin";
import Career from "src/pages/Career/Career";
import PortfolioDocument from "src/pages/Document/PortfolioDocument";
import ProjectDocument from "src/pages/Document/ProjectDocument";
import Home from "src/pages/Home/Home";
import Login from "src/pages/Login/Login";
import Portfolio from "src/pages/Portfolio/Portfolio";
import Projects from "src/pages/Projects/Projects";
import Registration from "src/pages/Registration/Registration";
import Skills from "src/pages/Skills/Skills";
import Error404 from "src/pages/errors/Error404/Error404";
import ProjectDemo from "./pages/ProjectDemo/ProjectDemo";

function App() {
  const session = useSession();
  const location = useLocation();
  const footerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(96);

  function handleResize() {
    if (footerRef.current) {
      setFooterHeight(footerRef.current.offsetHeight);
    }
  }

  useEffect(() => {
    if (footerRef.current) {
      handleResize();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app relative h-auto w-full overflow-hidden">
      <Nav session={session} />
      {location.pathname !== "/" && (
        <SortAlgorithm
          sorted={true}
          className="rotate-180 absolute top-0 left-0 -z-50 w-full"
          style={{ height: `calc(100% - ${footerHeight}px - 1rem)` }}
        />
      )}
      <main className="content h-auto w-full flex justify-center items-center z-10">
        <Routes>
          <Route exact path="/*" element={<Error404 />} />

          <Route exact path="/" element={<Home />} />
          <Route exact path="/career" element={<Career />} />
          <Route exact path="/skills" element={<Skills />} />
          <Route exact path="/projects" element={<Projects />} />
          <Route path="/projects/:project" element={<ProjectDocument />} />
          {/* <Route
            exact
            path="/projects/:project/demo"
            element={<ProjectDemo />}
          /> */}
          <Route
            exact
            path="/portfolio"
            element={<Portfolio session={session} />}
          />
          <Route
            path="/portfolio/:document"
            element={<PortfolioDocument session={session} />}
          />
          <Route exact path="/login" element={<Login session={session} />} />
          <Route
            exact
            path="/registration"
            element={<Registration session={session} />}
          />
          <Route exact path="/admin" element={<Admin session={session} />} />
        </Routes>
      </main>
      <Footer divRef={footerRef} />
    </div>
  );
}

export default App;
