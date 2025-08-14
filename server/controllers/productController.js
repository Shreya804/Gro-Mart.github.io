import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"
// //Add Product : /api/product/add
// export const addProduct = async(req,res)=>{
//     try {
//         let productData = JSON.parse(req.body.productData)
//         const images = req.files

//         let imagesUrl = await Promise.all(
//             images.map(async (item)=>{
//                 let result = await cloudinary.uploader.upload(item.path,{resource_type: 'image'});
//                 return result.secure_url
//             })
//         )
//         await Product.create({...productData, images:imagesUrl})

//         res.json({success: true, message: "Product Added"})
//     } catch (error) {
//         console.error(error.message);
//         res.json({success: false, message: error.message})

//     }
// }

// //Get Product : /api/product/list
// export const productList = async(req,res)=>{
//     try {
//         const products = await Product.find({})
//         res.json({success:true, products})
//     } catch (error) {
//         console.error(error.message);
//         res.json({success: false, message: error.message})

//     }

// }

// //Get single Product : /api/product/id
// export const productById = async(req,res)=>{
//     try {
//         const { id } = req.body
//         const product = await Product.findId(id)
//         res.json({success:true, product})

//     } catch (error) {
//         console.error(error.message);
//         res.json({success: false, message: error.message})

//     }
// }

// //Change Product in a Stock : /api/product/stock
// export const changeStock = async(req,res)=>{
//     try {
//         const { id, inStock } = req.body
//         await Product.findByIdAndUpdate(id, {inStock})
//         res.json({success: true, message: "Stock Updated"})

//     } catch (error) {
//         console.error(error.message);
//         res.json({success: false, message: error.message})

//     }

// }




// import { cloudinary } from "../configs/cloudinary.js";
// import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const productData = JSON.parse(req.body.productData);

    const imagesUrl = await Promise.all(
      req.files.map(file =>
        cloudinary.uploader.upload(file.path, { resource_type: "image" })
          .then(result => result.secure_url)
      )
    );

    await Product.create({
      ...productData,
      images: imagesUrl,
      seller: req.user._id // ✅ from authSeller
    });

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const productById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
