export const handleApiError = (error) => {

  if (!error.response) {
    return { fieldErrors: null, error: "Error de conexión con el servidor" };
  }

  const { data, status } = error.response;
  
  if (data?.errors) {
    const fieldErrors = {};
    data.errors.forEach(e => {
      fieldErrors[e.path] = e.msg;
    });
    
    return { fieldErrors, error: null, status };
  }

  const message = data?.message || error.message || "Error desconocido";
  return { fieldErrors: null, error: message, status };
};

