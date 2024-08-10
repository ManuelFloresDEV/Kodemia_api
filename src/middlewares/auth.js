const createError = require("http-errors");
const jwt = require("../lib/jwt");
const kodersUseCases = require("../usecases/koder.usecases");

function auth(request, response, next) {
  try {
    const authorization = request.headers.authorization;

    const token = authorization?.replace("Bearer", "");

    if (!token) {
      throw createError(401, "token is required in authorization header");
    }
    const payload = jwt.verify(token);

    const koder = kodersUseCases.getById(payload.id);

    request.koder = koder;
    next();
  } catch (error) {
    response.status(error.status || 401);
    response.json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = auth;
