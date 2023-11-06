// funcion para generar un mensaje de error personalizado hacia el cliente

export const createProductErrorMsg = (product) => {
  return `
    Uno o mas campos son invalidos,
    Listado de campos requeridos:
    Title: Campo obligatorio de tipo string. El dato recibido fue ${product.title},
    description: Campo obligatorio de tipo string. El dato recibido fue ${product.description},
    price: Campo obligatorio de tipo Number. El dato recibido fue ${product.price},
    thumbnail:Campo obligatorio de tipo String. El dato recibido fue ${product.thumbnail},
    code:Campo obligatorio de tipo String y unico. El dato recibido fue ${product.code},
    stock:Campo obligatorio de tipo Number. El dato recibido fue ${product.stock},
    category:Campo obligatorio de tipo String. Opciones disponibles: "Zapatilla","Pantalon","Remera","Campera",
    El dato recibido fue ${product.category},


    `;
};
