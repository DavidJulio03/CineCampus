const JWTService = require("../../application/utils/JWTService");

function auth(req, res, next) {

  const token = req.cookies.access_token;

  if (!token) {

    return res.status(401).json({
      message: "No autenticado",
    });

  }

  try {

    const payload = JWTService.verifyToken(token);
    req.user = payload;
    next();

  } catch (error) {

    return res.status(401).json({
      message: "Token inválido o expirado",
    });
    
  }
}

module.exports = auth;