import React, { useEffect, useState } from "react";
import { assets, dummyAddress } from "../assets/assets";
import { currency } from "../config";
import { useAppContext } from "../context/AppContext";

const Cart = () => {
  const {
    products,
    cartItems,
    updateCartItem,
    removeFromCart,
    getCartCount,
    getCartAmount,
    navigate
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddress] = useState(dummyAddress);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress?.[0] || {});
  const [paymentOption, setPaymentOption] = useState("COD");

  const placeOrder = async () => {
    console.log("Placing order with:", selectedAddress, paymentOption);
    console.log("Addresses:", dummyAddress);

    // Add your order logic here
  };

  useEffect(() => {
    const tempArray = [];

    if (!cartItems || !products) return;

    for (const key in cartItems) {
      const product = products.find((item) => String(item._id) === String(key));
      if (product) {
        tempArray.push({ ...product, quantity: cartItems[key] });
      }
    }

    setCartArray(tempArray);
  }, [cartItems, products]);

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto gap-12">
      {/* LEFT */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-semibold mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">
            ({getCartCount()} item{getCartCount() > 1 ? "s" : ""})
          </span>
        </h1>

        {/* Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3 border-b">
          <p>Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {/* Products */}
        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] items-center py-4 border-b"
          >
            {/* Product Detail */}
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 border rounded cursor-pointer overflow-hidden"
                onClick={() => {
                  navigate(`/product/${product.category.toLowerCase()}/${product._id}`);
                  scrollTo(0, 0);
                }}
              >
                <img
                  src={product.image?.[0] || assets.fallback_image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">Weight: {product.weight || "N/A"}</p>
                <div className="flex items-center mt-1 text-sm">
                  <label className="mr-2">Qty:</label>
                  <select
                    value={product.quantity}
                    onChange={(e) =>
                      updateCartItem(product._id, parseInt(e.target.value))
                    }
                    className="border px-2 py-1 rounded text-sm"
                  >
                    {Array.from(
                      { length: Math.max(9, product.quantity) },
                      (_, i) => i + 1
                    ).map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Subtotal */}
            <p className="text-center font-medium text-gray-700">
              {currency}{product.offerPrice * product.quantity}
            </p>

            {/* Action */}
            <div className="flex justify-center">
              <button onClick={() => removeFromCart(product._id)}>
                <img
                  src={assets.remove_icon}
                  alt="remove"
                  className="w-5 hover:scale-110 transition"
                />
              </button>
            </div>
          </div>
        ))}

        {/* Continue Shopping */}
        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group mt-8 flex items-center gap-2 text-primary hover:text-primary-dull transition"
        >
          <img
            src={assets.arrow_right_icon_colored}
            className="group-hover:-translate-x-1 transition w-4"
          />
          Continue Shopping
        </button>
      </div>

      {/* RIGHT: Order Summary */}
      <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {/* Address */}
        
        <div className="mb-6">
          <p className="text-sm font-medium uppercase text-gray-600 mb-1">
            Delivery Address
          </p>
          <div className="relative">
            <p className="text-gray-600 text-sm mb-1">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address selected"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary text-sm hover:underline"
            >
              Change
            </button>

            {showAddress && (
              <div className="absolute top-full left-0 mt-2 bg-white border shadow z-10 w-full text-sm">
                {addresses.map((address, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.country}
                  </div>
                ))}
                <div
                  onClick={() => navigate("/add-address")}
                  className="text-primary text-center py-2 hover:bg-indigo-50 cursor-pointer border-t"
                >
                  + Add New Address
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <label className="text-sm font-medium uppercase text-gray-600 block mb-1">
            Payment Method
          </label>
          <select
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        {/* Price Details */}
        <div className="text-gray-700 space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span>Price</span>
            <span>{currency}{getCartAmount()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (2%)</span>
            <span>{currency}{(getCartAmount() * 0.02).toFixed(2)}</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>
              {currency}{(getCartAmount() + getCartAmount() * 0.02).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Place Order */}
        <button
          onClick={placeOrder}
          className="w-full py-3 bg-primary hover:bg-primary-dull text-white rounded-md font-medium transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
