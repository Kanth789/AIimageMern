import cors from "cors"
import mongoose from "mongoose"
import * as dotenv from "dotenv"
import express from 'express'
import PostRouter from "./routes/Posts.js";
import GenerateImageRouter from "./routes/GenerateImages.js";

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true}))


app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!!..';
    return res.status(status).json({
        success:false,
        status,
        message
    })
})

app.get("/",async(req,res)=>{
 res.status(200).json({
    message:'Hello Developer'
 })
})

app.use("/api/post",PostRouter)
app.use("/api/generateImage", GenerateImageRouter);

const connectMongoo = ()=>{
    mongoose.set('strictQuery',true)
    mongoose.connect(process.env.MONGOB_URL)
    .then(()=>console.log('MongoDB Connected!....'))
    .catch((err)=>console.error(err))
}

const startServer = async()=>{
    try{
        connectMongoo()
        app.listen(8080,()=>console.log('started server...'))
    }catch(err){
        console.log(err)
    }
}



startServer()