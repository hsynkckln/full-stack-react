const mongoose = require("mongoose");

const ReviewSchema=mongoose.Schema(
    {
        text:{ type: String, required: true },
        rating:{type:Number,required: true},
        //userı başka bir modelden ilişkisek veritabanındaki gibi alıyoruz.
        user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},//referansı user modelimizden alıyoruz
       
    }
)

const productSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      img: [{ type: String, required: true }],
      reviews:[ReviewSchema],
      description:{type: String,required:true},
      colors:[{type:String,required:true}],
      size:[{type:String,required:true}],
      price:{
          current:{type:Number,required:true},
          discount:{type:Number}
      },
      category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        
      },
      
    },
    { timestamps: true } //yeni bir ürün oluşturduğumuzda date bilgisi veriyor
);

const Product=mongoose.model("Product",productSchema);

module.exports=Product;