const jwt = require("jsonwebtoken");

class JWTService {
    
  /**
   * Genera un JWT
   * @param {Object} payload - Información mínima del usuario
   * @param {String} expiresIn - Tiempo de expiración
   * @returns {String} token
   */
  static generateToken(payload, expiresIn = "1h") {

    if (!payload || typeof payload !== "object") {

      throw new Error("Payload inválido para generar JWT");

    }

    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn }
    );

  }


  /**
   * Verifica un JWT
   * @param {String} token - JWT recibido del cliente
   * @returns {Object} payload decodificado
   */
  static verifyToken(token) {

    if (!token) {

      throw new Error("Token no proporcionado");

    }

    try {

      return jwt.verify(token, process.env.JWT_SECRET);

    } catch (error) {

      throw new Error("Token inválido o expirado");

    }

  }

}

module.exports = JWTService;
