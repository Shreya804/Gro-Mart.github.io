import React, { useState } from "react";
import { assets } from "../assets/assets";
import { currency } from "../config";
import { useAppContext } from "../context/AppContext";

const ProductCart = ({ product }) => {
  const { addToCart, removeFromCart, cartItems, navigate } = useAppContext();
  
  const [count, setCount] = useState(0);
  
  return (
    product && (
      <div
        onClick={() => {
          navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
          scrollTo(0, 0);
        }}
        className="border border-gray-500/20 rounded-md px-3 py-3 sm:px-4 bg-white w-full max-w-xs sm:max-w-sm mx-auto" // updated for responsive width
      >
        <div className="group cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-105 transition-transform duration-300 ease-in-out w-32 sm:w-36 h-auto object-contain" // updated for responsive image
            src={product.image[0]}
            alt={product.name}
          />
        </div>

        <div className="text-gray-500/60 text-sm mt-2"> 
          <p className="capitalize">{product.category}</p> 
          <p className="text-gray-700 font-medium text-lg truncate w-full">
            {product.name}
          </p>

          <div className="flex items-center gap-1 mt-1"> 
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                  className="w-3 sm:w-4" 
                />
              ))}
            <p className="text-xs sm:text-sm">(4)</p> 
          </div>

          <div className="flex items-end justify-between mt-3">
            <p className="text-base sm:text-xl font-medium text-primary"> 
            {currency}{product.offerPrice}{" "}
              <span className="text-gray-500/60 text-xs sm:text-sm line-through">
              {currency}{product.price}
              </span>
            </p>

            <div
              onClick={(e) => e.stopPropagation()}
              className="text-primary"
            >
              {!cartItems[product._id] ? (
                <button
                  onClick={() => addToCart(product._id)}
                  className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 text-xs sm:text-sm w-16 sm:w-20 h-8 rounded" // responsive button
                >
                  <img src={assets.cart_icon} alt="cartIcon" className="w-4 sm:w-5" /> 
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 bg-primary/25 rounded w-16 sm:w-20 h-8 text-sm select-none">
                  <button
                    onClick={() => {removeFromCart(product._id)}}
                    className="px-2"
                  >
                    -
                  </button>
                  <span className="w-4 text-center">{cartItems[product._id]}</span>
                  <button
                    onClick={() => {addToCart(product._id)}}
                    className="px-2"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCart;
