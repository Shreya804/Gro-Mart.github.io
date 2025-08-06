import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCart from "../components/ProductCart";
import { currency } from "../config";
import { useAppContext } from "../context/AppContext";

const ProductDetails = () => {
  const { products, navigate, addToCart} = useAppContext();
  const { id } = useParams();
  const product = products.find((item) => item._id === id);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  

  useEffect(() => {
    if (products.length > 0 && product) {
      const sameCategory = products.filter(
        (item) => product.category === item.category && item._id !== id
      );
      setRelatedProducts(sameCategory.slice(0, 5));
    }
  }, [products, id]);

  useEffect(() => {
    if (product && product.image?.length > 0) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="mt-16 px-4 lg:px-20">
      {/* Breadcrumbs */}
      <p className="text-sm text-gray-500 mb-4">
        <Link to="/">Home</Link> /
        <Link to="/products" className="mx-1">
          Products
        </Link>
        /
        <Link to={`/products/${product.category.toLowerCase()}`} className="mx-1">
          {product.category}
        </Link>
        / <span className="text-primary">{product.name}</span>
      </p>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Images */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2">
            {product.image.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setThumbnail(img)}
                className={`w-16 h-16 object-cover border rounded-md cursor-pointer ${
                  thumbnail === img ? "border-primary" : "border-gray-300"
                }`}
                alt="thumb"
              />
            ))}
          </div>
          {/* Main image */}
          <motion.img
            key={thumbnail}
            src={thumbnail}
            alt="Selected"
            className="w-full max-w-md h-[400px] object-contain border rounded-xl shadow"
            initial={{ opacity: 0.3, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Right: Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold">{product.name}</h1>

          {/* Ratings */}
          <div className="flex items-center mt-2 gap-1 text-yellow-500">
            {Array(5).fill("").map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                className="w-4"
                alt="star"
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">(4 reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="text-gray-500 line-through">MRP:  {currency}{product.price}</p>
            <p className="text-2xl font-bold text-black"> {currency}{product.offerPrice}</p>
            <p className="text-sm text-gray-500">(inclusive of all taxes)</p>
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="text-lg font-medium mb-2">About Product</p>
            <ul className="list-disc ml-5 text-gray-600 space-y-1">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex gap-4">
            <button
              onClick={() => addToCart(product._id)}
              className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="flex-1 py-3 bg-primary hover:bg-primary-dull text-white font-medium rounded-md transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Related Products</h2>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto mt-2" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {relatedProducts
            .filter((p) => p.inStock)
            .map((product, i) => (
              <ProductCart key={i} product={product} />
            ))}
        </div>
        <button
          onClick={() => {
            navigate("/products");
            scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="mt-12 px-6 py-2 border border-primary text-primary rounded hover:bg-primary/10 transition block mx-auto"
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
