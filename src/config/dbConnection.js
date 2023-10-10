import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect( config.mongo.url);
        console.log("Base de datos conectada");
    } catch (error) {
        console.error("Hubo un error al conectar a la Base de datos",error.message);
    }
}