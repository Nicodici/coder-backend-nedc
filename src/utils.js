import path from "path";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import multer from "multer";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));
// __dirname hace refencia a la ruta del archivo SRC

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const isValidPassword = (userDB, password) => {
  return bcrypt.compareSync(password, userDB.password);
};

//funcion para validar los campos del usuario y que no se suba una imagen sin usuario

const checkValidFields = (body) => {
  const { first_name, email, password } = body;
  if (!first_name || !email || !password) {
    return false;
  }
  return true;
};

//configuracion para guardas las imagenes de los usuarios
const profileStorage = multer.diskStorage({
  // definimos la ruta donde se van a guardar los archivos
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/multer/users/profile"));
  }, //definimos el nombre de los archivos a guardar
  filename: function (req, file, cb) {
    cb(null, `${req.body.email}-perfil-${file.originalname}`);
  },
});
const multerProfileFilter = (req, file, cb) => {
  const valid = checkValidFields(req.body);
  if (valid) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
//creamos uploader de profiles
export const profileUploader = multer({
  storage: profileStorage,
  fileFilter: multerProfileFilter,
});

export const verifyAdmin = ((req, res, next) => {
  console.log(req);
  if (req === "admin") {
   return true;
  }
  return false;

});

//configuracion para guardar la imagen de los products
const productsStorage = multer.diskStorage({
  // definimos la ruta donde se van a guardar los archivos
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/multer/products"));
  }, //definimos el nombre de los archivos a guardar
  filename: function (req, file, cb) {
    cb(null, `${req.body.code}-productImg-${file.originalname}`);
  },
});
//creamos uploader de profiles
export const productUploader = multer({ storage: productsStorage });

//creacion de filtro para nuestra carga de imagenes de perfil
