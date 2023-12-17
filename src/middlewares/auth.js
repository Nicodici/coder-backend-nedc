export const showLoginView = (req, res, next) => {
  // console.log("usuario",req.user)
  if (req.session.user) {
    console.log(req.session)
    res.redirect("/perfil");
  } else {
    next();
  }
};

export const checkRole = (req, res, next) => {
  return (req, res, next) => {
    console.log("rol del usuario logueado", req.user.role);
    if (roles.includes(req.user.role)) {
      next();
    }
  };
};

export const checkAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login")
    res.json({ status: "error", message: "Debes estar autenticado" });
  }
};

export const isLogin = (req,res,next) =>{
  console.log(req.session)
  if (req.session){
    next();
  }else{
    res.redirect("/login")
  }
}