// import multer from "multer";

// // export const upload = multer({storage: multer.diskStorage({})})
// const storage = multer.memoryStorage(); // keep in memory for Cloudinary upload from buffer
// export const upload = multer({ storage });


import multer from "multer";

// store file in memory so we can upload buffer to Cloudinary
const storage = multer.memoryStorage();

export const upload = multer({ storage });
