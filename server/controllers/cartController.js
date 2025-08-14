import User from "../models/User.js";
//update user CartData : /api/cart/update


export const updateCart = async (req,res) =>{
    try {
        const { userId, cartItems } = req.body
        await User.findByIdAndUpdate(userId, {cartItems})
        // resizeBy.json({success: true,message: "Cart Updated"})
        res.json({ success: true, message: "Cart Updated" });


    } catch (error) {
        console.error(error.message);
        res.json({success: false, message: error.message})

    }
}

// import User from "../models/User.js";

// // update user CartData : /api/cart/update
// export const updateCart = async (req, res) => {
//     try {
//         const { userId, cartItems } = req.body;
//         await User.findByIdAndUpdate(userId, { cartItems });
//         res.json({ success: true, message: "Cart Updated" });
//     } catch (error) {
//         console.error(error.message);
//         res.json({ success: false, message: error.message });
//     }
// };
