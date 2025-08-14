// server/configs/cloudinary.js

import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log('Cloudinary Connected');
  } catch (error) {
    console.error('Cloudinary Connection Failed:', error.message);
  }
};

export default connectCloudinary;

// server/routes/product.js

// import { v2 as cloudinary } from 'cloudinary';
// import express from 'express';
// import multer from 'multer';
// import Product from '../models/Product.js';

// const router = express.Router();

// // Use multer to handle file uploads in memory
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// router.post('/add', upload.array('images', 4), async (req, res) => {
//   try {
//     const { productData } = req.body;
//     const parsedProduct = JSON.parse(productData);

//     // Upload all images to Cloudinary
//     const imageUrls = await Promise.all(
//       req.files.map(file =>
//         cloudinary.uploader.upload_stream(
//           { folder: 'products' },
//           (error, result) => {
//             if (error) throw new Error(error.message);
//             return result.secure_url;
//           }
//         )
//       )
//     );

//     // Save product with uploaded image URLs
//     const newProduct = new Product({
//       ...parsedProduct,
//       image: imageUrls, // ✅ Now MongoDB stores URLs
//     });

//     await newProduct.save();

//     res.json({ success: true, message: 'Product added successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// export default router;
