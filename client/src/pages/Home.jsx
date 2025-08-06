import { motion } from 'framer-motion';
import React from 'react';
import BestSellers from '../components/BestSellers';
import BottomBanner from '../components/BottomBanner';
import Categories from '../components/Categories';
import MainBanner from '../components/MainBanner';
import NewsLetter from '../components/NewsLetter';

const Home = () => {
  return (
    <motion.div
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
      <div className='mt-10'>
        <MainBanner />
        <motion.div
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { staggerChildren: 0.3, delayChildren: 0.3 },
            },
          }}
        >
          <Categories />
          <BestSellers />
          <BottomBanner />
          <NewsLetter />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;
