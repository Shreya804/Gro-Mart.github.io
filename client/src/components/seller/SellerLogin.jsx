import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const { data } = await axios.post(
        "/api/seller/login",
        { email, password },
        { withCredentials: true } // important for cookies
      );

      if (data.success) {
        toast.success(data.message || "Login successful");
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center text-gray-600"
      >
        <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">Seller</span> Login
          </p>

          <div className="w-full">
            <p>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white w-full py-2 rounded-md cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
