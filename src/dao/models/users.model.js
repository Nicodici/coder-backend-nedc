import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required:true
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
          required:true,
          default:""
        },
        reference:{
          type:String,
          required:true,
          default:""
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
    required:true,
    default:""
  }
});

export const usersModel = mongoose.model(usersCollection, userSchema);
