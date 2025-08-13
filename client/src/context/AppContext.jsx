
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { currency as currencySymbol } from "../config";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Check seller authentication
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth", {
        withCredentials: true,
      });
      setIsSeller(!!data.success);
    } catch {
      setIsSeller(false);
    } finally {
      setIsLoading(false); // ⬅️ App only renders after this
    }
  };

  
  // ✅ Load products
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // ✅ Cart helpers
  const addToCart = (itemId) => {
    const cartData = { ...cartItems, [itemId]: (cartItems[itemId] || 0) + 1 };
    setCartItems(cartData);
    toast.success("Item added to cart");
  };

  const updateCartItem = (itemId, quantity) => {
    const cartData = { ...cartItems, [itemId]: quantity };
    setCartItems(cartData);
    toast.success("Item updated in cart");
  };

  const removeFromCart = (itemId) => {
    const cartData = { ...cartItems };
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) delete cartData[itemId];
    }
    setCartItems(cartData);
    toast.success("Item removed from cart");
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((total, qty) => total + qty, 0);

  const getCartAmount = () =>
    Math.floor(
      Object.entries(cartItems).reduce((total, [id, qty]) => {
        const product = products.find((p) => p._id === id);
        return product ? total + product.offerPrice * qty : total;
      }, 0) * 100
    ) / 100;

  // ✅ On mount: check seller + load products
  useEffect(() => {
    fetchSeller();
    fetchProducts();
  }, []);

  const value = {
    navigate,
    axios,
    user,
    setUser,
    isSeller,
    setIsSeller,
    isLoading,
    showUserLogin,
    setShowUserLogin,
    products,
    currency: currencySymbol,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    fetchSeller,
  };

  return (
    <AppContext.Provider value={value}>
      {/* ⬅️ Don't render children until seller status is checked */}
      {!isLoading && children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

// import axios from "axios";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { dummyProducts } from "../assets/assets";
// import { currency } from "../config";

// // Axios global config
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [isSeller, setIsSeller] = useState(false);
//   const [isLoading, setIsLoading] = useState(true); // ✅ important
//   const [showUserLogin, setShowUserLogin] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");

//   // ✅ Check seller authentication
//   // const fetchSeller = async () => {
//   //   try {
//   //     const { data } = await axios.get("/api/seller/is-auth");
//   //     setIsSeller(!!data.success);
//   //   } catch {
//   //     setIsSeller(false);
//   //   } finally {
//   //     setIsLoading(false); // ⬅️ done checking
//   //   }
//   // };
//   const fetchSeller = async () => {
//     try {
//       const { data } = await axios.get("/api/seller/is-auth", { withCredentials: true });
//       setIsSeller(!!data.success);
//     } catch {
//       setIsSeller(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ✅ Load products
//   const fetchProducts = async () => {
//     setProducts(dummyProducts);
//   };

//   // ✅ Cart functions
//   const addToCart = (itemId) => {
//     const cartData = structuredClone(cartItems);
//     cartData[itemId] = (cartData[itemId] || 0) + 1;
//     setCartItems(cartData);
//     toast.success("Item added to cart");
//   };

//   const updateCartItem = (itemId, quantity) => {
//     const cartData = structuredClone(cartItems);
//     cartData[itemId] = quantity;
//     setCartItems(cartData);
//     toast.success("Item updated");
//   };

//   const removeFromCart = (itemId) => {
//     const cartData = structuredClone(cartItems);
//     if (cartData[itemId]) {
//       cartData[itemId] -= 1;
//       if (cartData[itemId] === 0) delete cartData[itemId];
//     }
//     setCartItems(cartData);
//     toast.success("Item removed");
//   };

//   const getCartCount = () =>
//     Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

//   const getCartAmount = () => {
//     let total = 0;
//     for (const itemId in cartItems) {
//       const product = products.find((p) => p._id === itemId);
//       if (product) {
//         total += product.offerPrice * cartItems[itemId];
//       }
//     }
//     return Math.floor(total * 100) / 100;
//   };

//   // ✅ Run on page load
//   useEffect(() => {
//     fetchSeller();
//     fetchProducts();
//   }, []);

//   const value = {
//     navigate,
//     axios,
//     user,
//     setUser,
//     isSeller,
//     setIsSeller,
//     isLoading,
//     showUserLogin,
//     setShowUserLogin,
//     products,
//     currency,
//     addToCart,
//     updateCartItem,
//     removeFromCart,
//     cartItems,
//     searchQuery,
//     setSearchQuery,
//     getCartCount,
//     getCartAmount,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => useContext(AppContext);
