// Esto se va a handlear de una forma diferente , a través de un login
// probablemente utilizando JWT u otro.

const ADMINISTRADOR = true;

export const esAdministrador = (req, res, next) => {
  if (!ADMINISTRADOR)
    return res.status(403).send({
      error: -1,
      descripcion: `ruta ${req.baseUrl + req.path} método ${
        req.method
      } no autorizada`,
    });
  next();
};
