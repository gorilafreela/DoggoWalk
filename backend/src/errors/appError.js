/**
 * Erro de aplicativo genérico.
 */
module.exports = class AppError extends Error {
  /**
   * Construtor.
   * @param {*} message mensagem de erro.
   */
  constructor(message) {
    super(message);
    this.name = "App Error";
  }
};
