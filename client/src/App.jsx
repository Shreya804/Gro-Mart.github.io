import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import SellerLayout from "./pages/seller/SellerLayout";

// User Pages
import Footer from "./components/Footer";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ProductCategory from "./components/ProductCategory";
import SellerLogin from "./components/seller/SellerLogin";
import AddAddress from "./pages/AddAddress";
import AllProduct from "./pages/AllProduct";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import MyOrders from "./pages/MyOrders";
import ProductDetails from "./pages/ProductDetails";
// Seller Pages
import AddProduct from "./pages/seller/AddProduct";
import Orders from "./pages/seller/Orders";
import ProductList from "./pages/seller/ProductList";


const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.includes("seller");
  const { showUserLogin, isSeller, isLoading } = useAppContext();

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
         <Toaster position="top-center" reverseOrder={false} />
         {isSellerPath ? null : <Navbar/>}

{/* Login Modal */}
{showUserLogin ? <Login/> : null} 
<Routes>
  {/* User Routes */}
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<AllProduct />} />
  <Route path="/products/:category" element={<ProductCategory />} />
  <Route path="/products/:category/:id" element={<ProductDetails />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/add-address" element={<AddAddress />} />
  <Route path="/my-orders" element={<MyOrders />} />

  {/* Seller Routes */}
  <Route
    path="/seller"
    element={
      isLoading ? (
        <div>Loading...</div>
      ) : isSeller ? (
        <SellerLayout />
      ) : (
        <SellerLogin />
      )
    }
  >
    <Route index element={<AddProduct />} />
    <Route path="product-list" element={<ProductList />} />
    <Route path="orders" element={<Orders />} />
  </Route>
</Routes>

      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
