
import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized - No token" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = tokenDecode.id; // ✅ Store in req.userId
    next();
  } catch (error) {
    return res.json({ success: false, message: "Token verification failed: " + error.message });
  }
};

export default authUser;
