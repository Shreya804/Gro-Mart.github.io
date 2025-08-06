import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets"; // ✅ Add this
import { currency } from "../config";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  
    const fetchSeller = async () => {
      try {
        const { data } = await axios.get("/api/seller/is-auth", {
          withCredentials: true,
        });
        setIsSeller(data.success);
      } catch (err) {
        setIsSeller(false);
      } finally {
        setIsLoading(false); // ✅ Don't render app until check is done
      }
    };
  

  // ✅ Define fetchProducts function
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  useEffect(() => {
    fetchSeller();
    fetchProducts(); // ✅ Now it exists
  }, []);

  const addToCart = async (itemId) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Item added to cart");
  };

  const updateCartItem = async (itemId, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Item updated in cart");
  };

  const removeFromCart = async (itemId) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) delete cartData[itemId];
    }
    setCartItems(cartData);
    toast.success("Item removed from cart");
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        total += product.offerPrice * cartItems[itemId];
      }
    }
    return Math.floor(total * 100) / 100;
  };

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
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
