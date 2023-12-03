import express from "express";
import { config } from "./config/config.js";
import { engine } from "express-handlebars";
import path from "path";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import { chatModel } from "./dao/models/chat.model.js";
import passport from "passport";
import session from "express-session";
import { initializePassport } from "./config/passport.config.js";
import MongoStore from "connect-mongo";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewRouter } from "./routes/view.routes.js";
import { sessionRouter } from "./routes/sessions.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { ProductsMongo } from "./dao/managers/mongo/productsMongo.js";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";
import { addLogger } from "./helpers/logger.js";
import {swaggerSpecs} from "./config/swagger.config.js"
import swaggerUI from "swagger-ui-express";

dotenv.config();

const port = config.server.port;
// Crea una aplicación Express
const app = express();
const logger = addLogger();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// Configura Handlebars como el motor de vistas
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));

// Configura la sesión
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongo.url,
    }),
    secret: config.server.secretSession,
    resave: true,
    saveUninitialized: true,
  })
);

// configuracion de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Inicia el servidor HTTP
const servidorHttp = app.listen(port, () => {
  logger?.http(`Servidor corriendo en el puerto ${port}`);
});

// Crea un servidor Socket.IO
const servidorSocket = new Server(servidorHttp);

// Crea una instancia de ProductManager
const administradorProductosSocket = new ProductsMongo();

let messages = [];

servidorSocket.on("connection", async (socket) => {
  console.log(`Cliente con ID: ${socket.id} conectado`);

  const listaProductos = await administradorProductosSocket.getProducts();
  servidorSocket.emit("sendProducts", listaProductos);

  socket.on("addProduct", async (product) => {
    await administradorProductosSocket.addProduct(product);
    console.log(administradorProductosSocket.addProduct(product));
    const listaProductosActualizada =
      await administradorProductosSocket.getProducts();
    servidorSocket.emit("sendProducts", listaProductosActualizada);
  });

  socket.on("deleteProduct", async (id) => {
    console.log(id);
    await administradorProductosSocket.deleteProduct(id);
    const listaProductosActualizada =
      await administradorProductosSocket.getProducts({});
    servidorSocket.emit("sendProducts", listaProductosActualizada);
  });

  console.log("nuevo cliente conectado");

  socket.on("authenticated", async (msg) => {
    const messages = await chatModel.find();
    socket.emit("messageHistory", messages);
    socket.broadcast.emit("newUser", msg);
  });

  socket.on("message", async (data) => {
    console.log("data", data);
    const messageCreated = await chatModel.create(data);
    const messages = await chatModel.find();
    servidorSocket.emit("messageHistory", messages);
  });
});

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/users",usersRouter)
app.use(viewRouter);
app.use(errorHandler);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs))