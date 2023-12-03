import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user","premium"],
    default: "user",
  },
  documents:{
    type: [
      {
        name:{
          type:String,
          required:true
        },
        reference:{
          type:String,
          required:true
        }
      }
    ],
    default:[]
  },
  last_connection:{
    type:Date,
    default:null
  },
  status:{
    type:String,
    enums:["pendiente","incompleto","completo"],
    default:"pendiente"
  },
  avatar:{
    type:String,
    required:true
  }
});

export const usersModel = mongoose.model(usersCollection, userSchema);