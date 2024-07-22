
const mongoose = require("mongoose");

const couponSchema = mongoose.Schema(
  {
    code: { type: String, required: true },//kupon kodu
    discountPercent: { type: Number, required: true },//indirim oranı
  },
  { timestamps: true } //yeni bir ürün oluşturduğumuzda date bilgisi veriyor
);

const Coupon=mongoose.model("Coupon",couponSchema);

module.exports=Coupon;