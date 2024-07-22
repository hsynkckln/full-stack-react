const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true } //yeni bir ürün oluşturduğumuzda date bilgisi veriyor
);

const Category=mongoose.model("Category",categorySchema);

module.exports=Category;