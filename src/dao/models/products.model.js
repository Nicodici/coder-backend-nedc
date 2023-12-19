import mongoose from "mongoose";
import { productsCollection } from "../../constants/index.js";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail:{
    type: String
  },
  code: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Zapatilla", "Pantalon", "Remera", "Campera"],
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
},
});

productSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, productSchema);
