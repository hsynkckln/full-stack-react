const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const brcryptJS=require('bcryptjs');
const { Await } = require("react-router-dom");

const generateRandomAvatar=()=>{
  const randomAvatar=Math.floor(Math.random()*71);
  return `https://i.pravatar.cc/300?img=${randomAvatar}`
}

//kullanıcı oluşturma(create-register)

router.post("/register", async (req, res) => {
  try {
    //console.log(req.body) direk postmandan istek gönderek burda konsolda gelen veriyi görebiliriz
    const { username,email,password } = req.body; //frontenddten gönderdiğimiz değeri yakalamak
    const defaultAvatar=generateRandomAvatar()
    const existingUser=await User.findOne({email})//istediğimiz key'e göre arama yapabiliriz
    if(existingUser){
      return res.status(400).json({error:"email addres is already registed"})
    }
    
    const hashedPasword=await brcryptJS.hash(password,10);

    const newUser = new User(
      { username,
        email,
        password:hashedPasword ,
        avatar:defaultAvatar
      });
    await newUser.save();

    // res.status(200).send("ok")
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
});

//Kullanıcı girisi(login)
router.post("/login",async(req,res)=>{
  try {
    const{email,password}=req.body;

    const user=await User.findOne({email});
    if(!user){
      return res.status(401).json({error:"ınvalid email"});
    }
    //sol tarafa kullanıcının girdiği şifreyi,sağ tarafa ise elimizdeki şifreyi
    const isPasswordValid=await brcryptJS.compare(password,user.password);
    if(!isPasswordValid){
      return res.status(401).json({error:"ınvalid password"});
    }

    res.status(200).json({
      id:user._id,
      email:user.email,
      username:user.username,
      role:user.role,
      avatar:user.avatar
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});


//Tüm kullanıcıları getirme(read-all)
router.get("/", async (req, res) => {
  try {
    const auth = await User.find(); //kategorideki tüm özellikleri getirmeye yarayan bir özellik

    res.status(200).json(auth);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
