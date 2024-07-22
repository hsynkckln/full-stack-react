const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

//yeni ürün oluşturma
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
  }
});

//tüm ürünleri getirme
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); //kategorideki tüm özellikleri getirmeye yarayan bir özellik

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

// belirli bir ürünü getirme(read-single)
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

//ürün güncelleme(update)
router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    //postmanda id kısmına yanlış bir fazla değer girersek server errora atar
    //ama bir değeri değiştirirsek category not founda atar
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: "product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updates,
      { new: true } //postman konsolda değiştirdiğimiz yeni değeri gösterir!!
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

//ürün silme(delete)
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "product not found" });
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

//ürünleri isme göre arama
router.get("/search/:productName",async(req,res)=>{
  try {
    const productName=req.params.productName;
    const products=await Product.find({
      name:{$regex:productName,$options:"i"} //her girdiğimiz değere göre veri gelmesi için regex kullanıyoruz
    })
    res.status(200).json(products)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
})

module.exports = router;
