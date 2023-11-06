//diccionario con distintos tipos de errores

export const EError = {
  ROUTING_ERROR: 1, //errores de ruta
  DATABASE_ERROR: 2, //errores relacionados a base de datos
  AUTH_ERROR: 3, //errores de autenticacion
  INVALID_JSON: 4, //errores relacionados al json de la peticion ( puede ser por falta de algun dato para crear el usuario o producto)
  CREATEPROD_ERROR: 5, //error relacionado a la creacion de un producto
  INVALID_PARAM: 6,
};
