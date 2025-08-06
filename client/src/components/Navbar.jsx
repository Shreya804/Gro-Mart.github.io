import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    getCartCount,
  } = useAppContext();

  const logout = () => {
    setUser(null);
    navigate("/");
    setMenuOpen(false);
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="h-20 flex items-center justify-between px-4 md:px-16 lg:px-24 border-b bg-white relative">
      {/* Logo */}
      <NavLink to="/" onClick={() => setMenuOpen(false)}>
        <img className="h-14 md:h-20" src={assets.logo_3} alt="logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/">Contact</NavLink>

        {/* Search */}
        <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search_icon" className="h-4 w-4" />
        </div>

        {/* Cart Icon */}
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <img src={assets.nav_cart_icon} alt="cart" className="w-6" />
          
            <span className="absolute -top-2 -right-3 text-xs text-white bg-red-500 w-[18px] h-[18px] rounded-full flex items-center justify-center">
              {getCartCount() || 0}
            </span>
          
        </div>

        {/* Login/Profile */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-6 py-2 bg-primary text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-10" alt="profile" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2 rounded-md w-30 text-sm z-40">
              <li
                onClick={() => navigate("my-orders")}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Icons */}
      {/* Mobile Icons */}
<div className="flex sm:hidden items-center gap-4">
  {!showSearch && (
    <button onClick={() => setShowSearch(true)}>
      <img src={assets.search_icon} alt="search" className="h-6 w-6" />
    </button>
  )}
  <div
    className="relative cursor-pointer"
    onClick={() => navigate("/cart")}
  >
    <img src={assets.nav_cart_icon} alt="cart" className="h-6 w-6" />
    <span className="absolute -top-2 -right-3 text-xs text-white bg-red-500 w-[18px] h-[18px] rounded-full flex items-center justify-center">
      {getCartCount() || 0}
    </span>
  </div>
  <button onClick={() => setMenuOpen(!menuOpen)}>
    <img src={assets.menu_icon} alt="menu" className="h-6 w-6" />
  </button>
</div>

      {/* Mobile Search */}
      {showSearch && (
        <div
          ref={searchRef}
          className="absolute top-[70px] left-0 w-full px-4 sm:hidden z-40"
        >
          <div className="flex items-center border border-gray-300 px-3 rounded-full bg-white shadow">
            <input
              autoFocus
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 px-3 w-full outline-none bg-transparent placeholder-gray-500 text-sm"
              type="text"
              placeholder="Search products..."
            />
            <img
              src={assets.search_icon}
              alt="search_icon"
              className="h-4 w-4"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white shadow-md py-5 px-4 flex flex-col gap-3 text-sm sm:hidden z-30">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setMenuOpen(false)}>
            All Products
          </NavLink>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>

          {!user ? (
            <button
              onClick={() => {
                setMenuOpen(false);
                setShowUserLogin(true);
              }}
              className="px-6 py-2 mt-2 bg-primary hover:bg-primary-dull text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="px-6 py-2 mt-2 bg-primary hover:bg-primary-dull text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
