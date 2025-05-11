
import  { Schema , model} from "mongoose";



const userschema = new Schema({
    username: { type:String , require:true , unique:true},
    password: { type:String , require:true},
    firstname:{type:String ,require:true},
    lastname:{ type:String , require:true}
})

const contentschema = new Schema({
    
})

export const usermodel = model("usersdata" , userschema)