import { error } from 'console'
import User from '../models/UserModel.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signUp=async (req,res,next)=>{
    const{username,password,email}=req.body
    const hashedPassword=bcryptjs.hashSync(password,10)
    const user=new User({username,email,password:hashedPassword})
    try{
    await user.save()
    res.status(201).json({message:'User Created Successfully'});
    }
    catch(err){
        // res.status(500).json(err.message)
        next(error)
    }


}


export const signIn=async (req,res,next)=>{
    const {email,password}=req.body
    try{
        const validUser=await User.findOne({email});

        if(!validUser){
            return next(errorHandler(401,'Invalid Credentials'))
        }
        const validPassword=bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(401,'Invalid Credentials'))
        }
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        // console.log(token)
//Nalla note pannu
        const expiryDate=new Date(Date.now() + 3600000);
        const sendingData=await User.findOne({email}).select('-password')
        res.cookie('access_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(sendingData)

//mela iruka linea nalla note pannu

    }
    catch(err){
        next(err)
    }

}



export const google=async(req,res,next)=>{
    const { email } = req.body;
    
    try {
                            //sign in ku
        const user=await User.findOne({email})  
        // console.log(user)
        if(user){
        const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET); 
        // const sendingData = await User.findOne({ email: req.body.email }).select('-password'); 
         const expiryDate = new Date(Date.now() + 3600000);
         const sendingData = await User.findOne({ email }).select("-password");
         res.cookie("access_token", token, {
             httpOnly: true,
             expires: expiryDate, })
           .status(200)
           .json(sendingData);               
        } 
        else{
                                    //signup ku
            const generatedPassword =
              Math.random().toString(36).slice(-8) +
              Math.random().toString(36).slice(-8);

            const hashedPassword=bcryptjs.hashSync(generatedPassword,10);
            const newUser=new User({username:req.body.name.split(' ').join('').toLowerCase() + Math.floor( Math.random() * 10000).toString(),email:req.body.email,password:hashedPassword,profilePicture:req.body.photo});

            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET); 
            const sendingData = await User.findOne({email:req.body.email}).select("-password");
            const expiryDate = new Date(Date.now() + 3600000);

             res.cookie("access_token", token, {
                httpOnly: true,
                expires: expiryDate, }).status(200).json(sendingData);               
             }
            }
            catch (error) 
            {
                next(error)
            }

}


export const signOut=async (req,res)=>{
    res.clearCookie('access_token').status(200).json('Signout successfully completed ')

}