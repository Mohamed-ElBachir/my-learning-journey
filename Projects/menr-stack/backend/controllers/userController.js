import User from "../models/userModel.js";
import asynchandler from "../middelwares/asynchandler.js";
import bcrypt from "bcryptjs";
import createToken from '../utils/createToken.js';

const createUser = asynchandler(async (req , res)=>{
    const {username , email , password} = req.body;
    
    if (!username || !email || !password) {
        throw new Error("Please fill all the inputs")
    }

    const userExists = await User.findOne({email});
    if(userExists) res.status(400).send("User already exists");

    const salt =  await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt)
    const newUser =  new User({username,email,password: hashPassword})

    try {
        await newUser.save()
        createToken(res , newUser._id)

        res.status(201).json({
            _id : newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin : newUser.isAdmin
        });
    } catch (error) {
        res.status(400)
        throw new Error('invalid user data ')
    }

})

const loginUser = asynchandler(async(req,res)=>{
    const{email,password} = req.body;

    const existingUser = await User.findOne({email});
    if (existingUser) {
        const isPasswordvalid = await bcrypt.compare(password,existingUser.password)

        if (isPasswordvalid) {
            createToken(res,existingUser._id)
            res.status(201).json({
                _id:existingUser._id,
                username:existingUser.username,
                email :existingUser.email,
                isAdmin: existingUser.isAdmin,
            })
            return;
        }
    }
})

const logoutCurrentUser = asynchandler(async(req,res)=>{
    res.cookie("jwt",'',{
        httpOnly:true,
        expires: new Date(0), 
    })
    res.status(200).json({message:"Loggout successfully" })
})

export {
    createUser,
    loginUser,
    logoutCurrentUser
};