import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSelectCategory } from "../actions/categoryAction";
import { fetchCategories } from "../actions/categoryAction";
import googleplayimg from "../assets/img/icon/googleplay.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Menu = () => {
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting);
  const { categories, selectCategory } = useSelector(
    (state) => state.categories
  );
  const [activeLink, setActiveLink] = useState("home");
  const [showSubMenu, setShowSubMenu] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showToggleSubMenu, setShowToggleSubMenu] = useState(false);
  const [showToggleMenu, setShowToggleMenu] = useState(false);
  const moreCategories = categories.filter(
    (category) => category.position === "more"
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    dispatch(fetchSelectCategory(link));
    setShowToggleSubMenu(false);
    setShowToggleMenu(false);
  };

  const handleViewMoreHover = () => {
    setShowSubMenu(true);
  };

  const handleViewMoreLeave = () => {
    setShowSubMenu(false);
  };

  const handleMenuToggleOpenClick = () => {
    setShowToggleMenu(true);
  };
  const handleMenuToggleCloseClick = () => {
    setShowToggleMenu(false);
  };

  const handleShowToggleSubMenu = () => {
    setShowToggleMenu(true);
    setShowToggleSubMenu(!showToggleSubMenu);
  };

  const getCurrentDate = () => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  return (
    <header className="header-style-six">
      <div id="header-fixed-height"></div>
      <div id="sticky-left-menu" className="left-sub-menu">
        <div className="container">
          <div className="row ">
            <ul className="dropdown-content">
              <li
                className={
                  (selectCategory ? selectCategory : activeLink) === "home"
                    ? "active"
                    : ""
                }
              >
                <Link
                  to="/"
                  onClick={() => handleLinkClick("home")}
                  className="nav-bar-link"
                >
                  Home
                </Link>
              </li>
              {categories.length > 8 &&
                categories.slice(0, 7).map((category) => (
                  <li
                    key={category.id}
                    className={
                      (selectCategory ? selectCategory : activeLink) ===
                      category.name
                        ? "active"
                        : ""
                    }
                  >
                    <Link
                      to={`/news/${category.data_query}`}
                      onClick={() => handleLinkClick(category.name)}
                      className="nav-bar-link"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  to="#"
                  onMouseEnter={handleViewMoreHover}
                  onMouseLeave={handleViewMoreLeave}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="nav-bar-link"
                >
                  View More
                  <FontAwesomeIcon
                    icon="fa-solid fa-chevron-down"
                    className="mx-2"
                  />
                </Link>
                <ul className="left-sub-menu-dropdown dropdown-content">
                  {showDropdown &&
                    categories.slice(7).map((category) => (
                      <li
                        className={activeLink === category.name ? "active" : ""}
                        key={category.id}
                      >
                        <Link
                          key={category.id}
                          to={`/news/${category.data_query}`}
                          onClick={() => handleLinkClick(category.name)}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            </ul>
          </div>
          <div className="row left-menu-store">
            <Link to="https://play.google.com/store/" className="mb-3 "> <img src={googleplayimg} /> </Link>
          </div>
          <div className="row left-menu-footer ">
            <span className="mt-2"> <Link to={'/about'}>About Us &middot; </Link><Link to={'/about'}>Privacy Policy</Link></span> 
          </div>
        </div>
      </div>
    </header>
  );
};

export default Menu;