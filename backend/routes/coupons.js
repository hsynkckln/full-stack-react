const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon.js");

//yeni bir kuponoluşturma(Create)
router.post("/", async (req, res) => {
  try {
    const { code } = req.body;

    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ error: "this coupon is already exist" });
    }
    const newCoupon = new Coupon(req.body);
    await newCoupon.save();

    // res.status(200).send("ok")
    res.status(201).json(newCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

//Tüm kuponları getirme(read-all)
router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find(); //kategorideki tüm özellikleri getirmeye yarayan bir özellik

    res.status(200).json(coupons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

// belirli bir kuponu getirme(read-single by coupon id)
router.get("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;

    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return res.status(404).json({ error: "coupon not found" });
    }

    res.status(200).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

// belirli bir kuponu getirme(read-single by coupon code)
router.get("/code/:couponCode", async (req, res) => {
  try {
    const couponCode = req.params.couponCode;

    const coupon = await Coupon.findOne({ code: couponCode }); //şemadaki belli bir özelliğe göre arama yaparız
    if (!coupon) {
      return res.status(404).json({ error: "coupon not found" });
    }

    const { discountPercent } = coupon;
    res.status(200).json({ discountPercent: discountPercent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

//kupon güncelleme(update)
router.put("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const updates = req.body;

    //postmanda id kısmına yanlış bir fazla değer girersek server errora atar
    //ama bir değeri değiştirirsek category not founda atar
    const existingCoupon = await Coupon.findById(couponId);
    if (!existingCoupon) {
      return res.status(404).json({ error: "coupon not found" });
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      couponId,
      updates,
      { new: true } //postman konsolda değiştirdiğimiz yeni değeri gösterir!!
    );

    res.status(200).json(updatedCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

//kategori silme(delete)
router.delete("/:couponId", async (req, res) => {
    try {
      const couponId = req.params.couponId;
      const deletedCoupon = await Coupon.findByIdAndDelete(couponId);
  
      if (!deletedCoupon) {
        return res.status(404).json({ error: "coupon not found" });
      }
  
      res.status(200).json(deletedCoupon);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "server error" });
    }
  });

module.exports = router;
