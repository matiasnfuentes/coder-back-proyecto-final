export const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(403).send({
      error: -1,
      descripcion: `Route ${req.baseUrl + req.path} method ${
        req.method
      } unauthorized`,
    });
  next();
};
