export const obtenerPaginacion = (pagina = 1, limite = 10) => {
    const desplazamiento = (pagina - 1) * limite;
    return { limite, desplazamiento };
};

export const obtenerDatosPaginados = (datos, pagina, limite) => {
    const { count: totalElementos, rows: elementos } = datos;
    const totalPaginas = Math.ceil(totalElementos / limite);
    return {
        elementos,
        totalElementos,
        totalPaginas,
        paginaActual: pagina
    };
};