const express = require("express");
const router = express.Router();
const Category = require("../models/Category.js");

//yeni bir kategori oluşturma(Create)
router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body; //frontenddten gönderdiğimiz değeri yakalamak
    const newCategory = new Category({ name, img });
    await newCategory.save();

    // res.status(200).send("ok")
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
  }
});

//Tüm kategorileri getirme(read-all)
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find(); //kategorideki tüm özellikleri getirmeye yarayan bir özellik

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

// belirli bir kategoriyi getirme(read-single)
router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    try {
      const category = await Category.findById(categoryId);
      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

//kategori güncelleme(update)
router.put("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updates = req.body;

    //postmanda id kısmına yanlış bir fazla değer girersek server errora atar
    //ama bir değeri değiştirirsek category not founda atar
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ error: "category not found" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updates,
      { new: true } //postman konsolda değiştirdiğimiz yeni değeri gösterir!!
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

//kategori silme(delete)
router.delete("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: "category not found" });
    }

    res.status(200).json(deletedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
