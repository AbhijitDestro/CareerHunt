import jwt from 'jsonwebtoken';

const useAuth= async (req,res,next)=>{
  try{
   const authHeader = req.headers.authorization;
   const bearerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
   const token = req.cookies.token || bearerToken;
   if(!token){
    return res.status(401).json({message: 'Unauthorized', success: false});
   }
   const decode= await jwt.verify(token, process.env.JWT_SECRET);
   if(!decode){
    return res.status(401).json({message: 'Invalid token', success: false});
   }
   req.id= decode.userId;
   next();
  }catch(error){
    return res.status(401).json({message: 'Unauthorized', success: false});
  }
}

export default useAuth;
