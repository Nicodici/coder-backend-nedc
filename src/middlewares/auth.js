export const checkUserAuth = (req, res, next) => {
  console.log("objeto session usuario logueado:", req.session)
  if (req.session) {
    next();
  } else {
    res.redirect("/login",);
  }
};

export const showLoginView = (req, res, next) => {
  if (req.session?.userInfo) {
    res.redirect("/perfil");
  } else {
    next();
  }
};

export const checkRole = (roles)=>{ 
  return (req,res,next)=>{
    console.log("rol del usuario logueado", req.user.role)
      if(roles.includes(req.user.role)){
          next();
      }
  }
};

export const checkAuthenticated = (req,res,next)=>{
  if(req.user){
      next();
  } else {
      res.json({status:"error", message:"Debes estar autenticado"});
  }
};