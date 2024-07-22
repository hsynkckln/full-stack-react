const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const mainRoute=require("./routes/index.js")
const app=express()
const logger=require('morgan')
const port=5000
const cors=require('cors');

dotenv.config()

const connect=async()=>{
    try{
        await mongoose.connect("mongodb+srv://kucukalanhuseyin:4S0Cd6ccRjZGMegC@e-commerce.njyxxrc.mongodb.net/mern-stack")
        console.log("mongodb connect");
    }catch(error){
        throw error;
    }
}

//middlewares
app.use(logger('dev'))
app.use(express.json())//gelen tüm dataları json'a çeviriyoruz
app.use(cors());//eklememiz lazım çünkü frontend tarafından veri gönderirsek çalışmaz
app.use("/api",mainRoute);



app.listen(port,()=>{
    connect();
    console.log(`sunucu ${port} portunda çalışıyor`);
})