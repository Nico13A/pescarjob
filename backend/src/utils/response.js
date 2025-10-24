export const sendSuccess = (res, data = {}, message = "Operación exitosa", status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (res, message = "Error en la operación", status = 500, errors = null) => {
  return res.status(status).json({
    success: false,
    message,
    errors,
  });
};
