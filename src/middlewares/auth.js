export const showLoginView = (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    res.redirect("/perfil");
  } else {
    next();
  }
};

export const checkRole = (req, res, next) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    }
  };
};

export const checkAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
    res.json({ status: "error", message: "Debes estar autenticado" });
  }
};

export const isLogin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    const error = {
      status: 401,
      message: "Usuario no autenticado",
    };
    res.render("login", { error });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  }else{
    const errorAdmin = {
      status: 401,
      message: "No tienes permisos para agregar productos",
    };
    return errorAdmin;
  }
};
