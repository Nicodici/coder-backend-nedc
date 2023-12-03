import { __dirname } from "../utils.js";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

//creamos un objeto de configuración para swagger
const swaggerOptions = {
    definition:{
        openapi:"3.0.1",
        info:{
            title:"Documentación Ecommerce",
            version:"1.0.0",
            description:"Definicion de endpoints para la API del ecommerce"
        }
    },
    apis:[`${path.join(__dirname,"docs/**/*.yaml")}`], //definimos la ruta donde se encuentran los archivos yaml de la documentación
};
//crear una variable que interpreta las opciones para trabajar con swagger
export const swaggerSpecs = swaggerJSDoc(swaggerOptions);