require('dotenv').config()
import jwt from "jsonwebtoken"
import User from '../models/users'


const verifyToken = async (req: any, res: any, next: any) => {
  try {
    const token: string =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).json({ message: "A token is required for authentication" })
    }
    
    
    const JWT_SECRET: any = process.env.JWT_SECRET
    const decoded: any = jwt.verify(token, JWT_SECRET);
    if(decoded.id){
      const user = await User.findById(decoded.id);
      if(user) {
        req.user = user;
        next();
      }else{
        return res.status(401).json({ message: "Invalid Token" })    
      }
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" })
  }
    
  };
  
export default verifyToken