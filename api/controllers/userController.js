import {errorHandler} from '../utils/error.js';
import bcryptjs from 'bcryptjs'
import User from '../models/UserModel.js'

export const getAllUser=(req,res)=>{
    res.send('Hello')
}

export const updateUser = async (req, res,next) => {
  if(req.user.id!==req.params.id){
    return next(errorHandler(401, "You can Update only Your Account!!"));
  }
  try{
    if(req.body.password){
      req.body.password=bcryptjs.hashSync(req.body.password,10);
    }
    const updatedUser=await User.findByIdAndUpdate(
      req.params.id,{
        $set:{
          username:req.body.username,
          password:req.body.password,
          profilePicture:req.body.profilePicture,
        }    
        },
        {new:true}
    );
      // console.log(updateUser)
      const sendingData=await User.findById(req.params.id).select('-password')
      res.status(200).json(sendingData)

  }
  catch(err){
    next(err)
  }
};


export const deleteUser=async (req,res,next)=>{
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can Update only Your Account!!"));
  }
  try{
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json("User has been deleted.... ")
  }
  catch(err){

  }
}



