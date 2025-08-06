import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ProductCart from "../components/ProductCart";
import { useAppContext } from "../context/AppContext";

const AllProduct = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProduct, setFilteredProduct] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProduct(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProduct(products);
    }
  }, [products, searchQuery]);

  // Variants for the product card
  const cardVariants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 25 },
    },
  };

  return (
    <motion.div
      className="mt-16 flex flex-col gap-4 container mx-auto px-4"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: { opacity: 0, y: 50 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 100, damping: 25 },
        },
        exit: { opacity: 0, y: -30 },
      }}
    >
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full" />
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 gap-3 mt-6 mb-16"
        variants={{
          initial: { opacity: 0 },
          animate: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
              delayChildren: 0.2,
            },
          },
        }}
        initial="initial"
        animate="animate"
      >
        {filteredProduct
          .filter((product) => product.inStock)
          .map((product, index) => (
            <motion.div key={index} variants={cardVariants}>
              <ProductCart product={product} />
            </motion.div>
          ))}
      </motion.div>
    </motion.div>
  );
};

export default AllProduct;
