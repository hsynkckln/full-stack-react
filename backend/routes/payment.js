const express = require("express");
const router = express.Router();
const stripe = require('stripe')('sk_test_51PPNNwRrScK7QPPQF4uPziOHGzljI9BtVz8f36YMybsSXqk3W5Tw1bKmHJCqQGAtnDlQdQMAhcmUjRXQ3L4gR1Ch00rbzG4dh0');

router.post("/", async (req, res) => {
  try {
    const{products,user,cargoFee}=req.body;

    const lineItems=products.map((item)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:item.name
            },
            unit_amount:Math.round(item.price *100),
        },
        quantity:item.quantity 
    }))

    if(!cargoFee==0){
        lineItems.push({
            price_data:{
                currency:"usd",
                product_data:{
                    name:"Hızlı kargo",
    
                },
                unit_amount:cargoFee * 100
            },
            quantity:1
        })
    }
    

    const session=await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/success"
    })

    res.status(200).json({id:session.id});
  } catch (error) {
    console.log(error);
  }
});

module.exports=router
