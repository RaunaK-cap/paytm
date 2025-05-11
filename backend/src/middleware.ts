
import { NextFunction } from "express"
import Jwt from "jsonwebtoken" 
const jwt_password = "won'ttellyoubabe"



export function middleware (req:any,res:any , next:NextFunction){
    const headers = req.headers.authorization
    const decodedtoken : any = Jwt.verify(headers , jwt_password)
    if(decodedtoken){
            req.userid = decodedtoken.id
            next()
    }else{
        res.json({
            message:"token isn't correct try again "
        })
    }
}