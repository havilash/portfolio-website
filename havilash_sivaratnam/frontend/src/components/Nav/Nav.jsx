import { useEffect, useRef, useState } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import data from "src/data.js";

import "./Nav.css";

export default function Nav({ session }) {
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const headerRef = useRef();
  const [navItems, setNavItems] = useState([]);
  const timeoutId = useRef(null);

  useEffect(() => {
    if (isNavOpen) {
      clearTimeout(timeoutId.current);
      headerRef.current.classList.remove("mix-blend-difference");
    } else {
      timeoutId.current = setTimeout(() => {
        headerRef.current.classList.add("mix-blend-difference");
      }, 150);
    }
  }, [isNavOpen]);

  useEffect(() => {
    const items = data.pages.map((page) => ({
      path: page.href,
      label: page.name,
      disabled:
        page.name === "Portfolio" &&
        (!session.user || session.user?.access < 1),
    }));

    if (session.user && session.user.access >= 2) {
      items.push({ path: "/admin", label: "Admin" });
    }

    setNavItems(items);
  }, [session]);

  const handleClick = (event) => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      setIsNavOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  function renderUser() {
    return session.user ? (
      <Link
        to="/login"
        className={`nav__user-link ${
          session.user.access >= 2 && "outline-none outline-white"
        }`}
      >
        <p className="nav__user-name">
          {session.user.name.charAt(0).toUpperCase()}
        </p>
      </Link>
    ) : (
      <Link to="/login" className="nav__link">
        <FaUser className="nav__user-icon" />
      </Link>
    );
  }

  return (
    <header ref={headerRef} className={`${!isNavOpen && "-left-full"}`}>
      <nav className="nav">
        {/* nav bars, logo */}
        <i
          className={`nav__bars-icon sm:hidden left-8 sm:left-0 ${
            isNavOpen ? "left-[60vw]" : "left-8"
          }`}
        >
          <FaBars
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="nav__bars nav__link"
          />
        </i>
        <i className="absolute sm:relative mix-blend-difference transform-gpu">
          {renderUser()}
        </i>

        {/* nav list */}
        <ul className="nav__list">
          {navItems.map((item) => {
            const isActive =
              (item.path === "/" && location.pathname === "/") ||
              (item.path !== "/" && location.pathname.startsWith(item.path));
            return (
              <li
                key={item.path}
                className={`nav__item ${isActive && "active"}`}
              >
                <div className="line" />
                <Link
                  to={item.path}
                  className={`nav__link ${item.disabled && "disabled"}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className="nav__social">
          {data.social.map((item, i) => (
            <li key={`nav-social-item-${i}`} className="nav__social__item">
              <a
                target="_blank"
                rel="noreferrer"
                className="nav__link"
                href={item.href}
              >
                <item.icon className="nav__social__icon" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
