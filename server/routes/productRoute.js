import express from 'express';
import { upload } from '../configs/multer.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';
import authSeller from '../middlewares/authSeller.js';

// const productRouter = express.Router();

// productRouter.post('/add', upload.array(["images"]), authSeller,addProduct);
// productRouter.get('/list', productList)
// productRouter.get('/id', productById)
// productRouter.get('/stock', authSeller, changeStock)


// export default productRouter;


// server/routes/productRoute.js
// import express from 'express';
// import { upload } from '../configs/multer.js';
// import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';
// import authSeller from '../middlewares/authSeller.js';

const productRouter = express.Router();

// Note: field name 'images' must match the frontend FormData append key
productRouter.post('/add', upload.array('images', 4), authSeller, addProduct);
productRouter.get('/list', productList);
productRouter.get('/id', productById);
productRouter.get('/stock', authSeller, changeStock);

export default productRouter;

