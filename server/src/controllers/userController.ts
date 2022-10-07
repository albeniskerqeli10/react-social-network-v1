import cloudinary from "cloudinary";
import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import streamifier from "streamifier";
import Comment from "../models/Comment";
import Post from "../models/Post";
import User from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken
} from "../utils/generateToken";
import sharp from "sharp";
let refreshTokens: Array<object | string> = [];
// Login Route
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try{
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const accessToken = generateAccessToken(user._id);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      accessToken,
      isVerified:user.isVerified
    });
  }}
  catch(err){
    res.status(404).json({message:"Invalid email or password"})

  }
};

let streamUpload = (req: any) => {
  return new Promise((resolve, reject) => {
    const data:any = sharp(req.file.buffer).webp({quality:60}).toBuffer();
    let stream = cloudinary.v2.uploader.upload_stream( {
      folder: "avatars"
    } ,(error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

      streamifier.createReadStream(data).pipe(stream);
  });
};









// Register Route
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
  const { username, email, avatar, password, posts } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(404).json({ message: "User already exists" });
  } else {
    const user = new User({
      username,
      email,
      password,
    });
    if(req?.file) {
      const result:any = await streamUpload(req);
      user.avatar = result.secure_url;
    }

    const savedUser = await user.save();
    const accessToken = generateAccessToken(savedUser._id);
    const refreshToken = generateRefreshToken(savedUser._id);

    res.json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      avatar: savedUser.avatar,
      accessToken,
    });
  }
}
catch(err){
  res.status(500).json({message:"Something went wrong"})
}
};




const getAllUsers = async (req: Request, res: Response, next: NextFunction) =>
  // dont display current user in list

  {
    const users = await User.find({ _id: { $ne: req.user._id } })
      .sort({ createdAt: -1 })
      .select("-password");
    res.json(users);
  };

const refreshAuth = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401).json("You are not authenticated");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid");
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN as Secret,(id:any) => {
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    const newAccessToken = generateAccessToken(id);
    const newRefreshToken = generateRefreshToken(id);

    refreshTokens.push(newRefreshToken);
    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  
  try{
  const userId = req.params.id;
  const user = await User.findById(userId)
    .select("-password")
    .populate("posts");

  if (user) {
    res.json(user);
 
}
}
catch(err) {
  res.status(404).json({ message: "User not found" });
}
}

const followUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.params.id === req.user._id) {
      res.status(404).json({ message: "You cannot follow yourself" });
    } else {
      let followUser = await User.findOneAndUpdate({_id:req.params.id}, {$addToSet: {followers: req.user._id}});
      let user = await User.findOneAndUpdate({_id:req.user._id}, {$addToSet: {following: req.params.id}});

      } return res.status(200).send({ message: "User followed successfully"});
    } catch(err) {
    return res
      .status(500)
      .send({ message: "Error while tried to follow a user" });
  }
};
const unfollowUser =async (req:Request, res:Response) => {
  try {
    let unfollowingUser = await User.findByIdAndUpdate(req.params.id, {
      $pull: { followers: req.user._id },
    })
      return res.status(200).send({ message: "User unfollowed successfully"});
  } catch (err) {
      return res.status(500).send({ message: "User UnFollow Failed" });
  }
};


const getUserFollowers = async(req:Request, res:Response) => {
  try{

const currentUser:any = await User.findById(req.params.id);
const followersArr = await User.find({ _id: { $in: currentUser.followers} }).select('-password').limit(10);

  
 if(followersArr) {
   res.json({data:followersArr , message:"Data found"});
  }
}
catch(err) {
  res.status(500).json({message: "Error while trying to get followers"})
}
}


const searchUsers = async(req:Request , res:Response) => {
 try{
  const userVal = new RegExp(req.params.query, 'i');
  const usersArr = await User.find({username: {$regex: userVal},})
    res.status(200).json(usersArr);

 }
catch(err) {
  res.status(404).json({message: "No user found"})
}
}

const editUser = async(req:Request, res:Response) => { 
try{
  let {username,email,avatar } = req.body;
  if(req?.file) {
    const result:any = await streamUpload(req);
    avatar = result.secure_url;
  }

  // update user info
 const editedUser:any =  await User.findOneAndUpdate({_id:req.params.id}, {
   $set:{
      username: username,
      email: email,
      avatar: avatar,

   }
 }, {new: true});
 // update all posts of user
  const posts = await Post.find({user: req.params.id});
  for(let i = 0; i < posts.length; i++) {
    await Post.findByIdAndUpdate(posts[i]._id, {
      $set: {
        avatar: avatar,
        username: username,

      },
    });
  }

  // update all comments of user
  const comments = await Comment.find({user: req.params.id});
  for(let i = 0; i < comments.length; i++) {
    await Comment.findByIdAndUpdate(comments[i]._id, {
      $set: {
        avatar: avatar,
        username: username,
      }
    })
  }
      res.status(200).json(editedUser);


}
catch(err){
  res.status(500).json({message:"Error while trying to edit user"})
}
}

export {
  loginUser,
  registerUser,
  getAllUsers,
  getUserById,
  getUserFollowers,
  followUser,
  searchUsers,
  editUser,
  unfollowUser
};

