import { Router } from "express";
import mongoose from "mongoose";
import {z} from "zod"
import { usermodel } from "../db";

import Jwt from "jsonwebtoken" 
import { middleware } from "../middleware";
const jwt_password = "won'ttellyoubabe"


export const users = Router()

mongoose.connect("mongodb+srv://admin69:iwillfucktheworld@cluster0.w2yaa.mongodb.net/paytm")

users.post("/signup" , async (req , res)=>{
    
    const requirebody = z.object({
        username: z.string().min(2).max(20),
        password: z.string().min(2).max(20),
        firstname:z.string(),
        lastname:z.string()
    })

    const verifieddata = requirebody.safeParse(req.body)
    if(!verifieddata.success){
        res.send("please write the correct credentails")
    }

    const {username , password , firstname , lastname}  = req.body

    try{
         await usermodel.create({
            username,
            password,
            firstname,
            lastname
        })

    }catch(error){

        res.json({
            message:"there's some error while login .. please try again"
        })
    }

    res.json({
        message:"signup done ..!"
    })
})

users.post("/login" , async (req,res)=>{
     const username = req.body.username
     const password = req.body.password
     
     const existinguser= await usermodel.find({
        username,
        password
     })

    //  console.log("your data", existinguser[0]._id)

     if(existinguser){
     
        const token = Jwt.sign({id: existinguser[0]._id } , jwt_password) 
        res.json({
            message:"you're logged in ",
            your_token :token
        }) 
     }else{
        res.status(403).json({
            message:"error while log-in ...please try again ",

        })
     }

})


users.put("/update" , middleware , async (req : any ,res)=>{
    const data= z.object({
        username: z.string().min(2).max(20).optional(),
        password: z.string().min(2).max(20).optional(),
        firstname:z.string().optional(),
        lastname:z.string().optional()
    })

   const {success}= data.safeParse(req.body)
   if(!success){
    res.json({
        message:"please enter correctly"
    })
   }

    try {
        const updating = await usermodel.updateOne({ _id: req.userid } , req.body)
        res.json({
            message:"update successfully "
        })
        
    } catch (error) {
        res.json({
            message:"there's some error while updating please try again"
        })
    }

})

users.get("/info" , middleware , async(req:any,res)=>{
        try {
            const info = await usermodel.findOne({ _id: req.userid})
            res.json({
                message:"users info :",
                firstname:info?.firstname,
                lastname:info?.lastname,
                username:info?.username
            })
        } catch (error) {
            res.json({
                message:"error..! try again "
            })
        }
})



