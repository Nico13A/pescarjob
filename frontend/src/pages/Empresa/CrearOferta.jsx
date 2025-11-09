import { useState } from "react";
import { crearOferta } from "../../services/oferta";

const CrearOferta = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    modalidad: "remoto",
    ubicacion: "",
    fecha_fin: "",
    salario: "",
    jornada: "Tiempo completo",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);
    setError(null);
    setFieldErrors({});

    const res = await crearOferta(formData);

    if (res?.success) {
      setMensaje("✅ Oferta creada con éxito");
      setFormData({
        titulo: "",
        descripcion: "",
        modalidad: "remoto",
        ubicacion: "",
        fecha_fin: "",
        salario: "",
        jornada: "Tiempo completo",
      });
    } else if (res?.fieldErrors) {
      // Errores específicos del backend (express-validator)
      setFieldErrors(res.fieldErrors);
    } else {
      setError(res?.error || "Error al crear la oferta");
    }

    setCargando(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear nueva oferta</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={formData.titulo}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${fieldErrors.titulo ? "border-red-500" : ""}`}
          />
          {fieldErrors.titulo && <p className="text-red-500 text-sm">{fieldErrors.titulo}</p>}
        </div>

        <div>
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
            className={`w-full border p-2 rounded h-24 ${fieldErrors.descripcion ? "border-red-500" : ""}`}
          />
          {fieldErrors.descripcion && <p className="text-red-500 text-sm">{fieldErrors.descripcion}</p>}
        </div>

        <select
          name="modalidad"
          value={formData.modalidad}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="remoto">Remoto</option>
          <option value="presencial">Presencial</option>
          <option value="hibrido">Híbrido</option>
        </select>

        <select
          name="jornada"
          value={formData.jornada}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Tiempo completo">Tiempo completo (8 hs)</option>
          <option value="Medio tiempo">Medio tiempo (4 hs)</option>
        </select>

        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación"
          value={formData.ubicacion}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="salario"
          placeholder="Salario (opcional)"
          value={formData.salario}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div>
          <input
            type="date"
            name="fecha_fin"
            value={formData.fecha_fin}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${fieldErrors.fecha_fin ? "border-red-500" : ""}`}
          />
          {fieldErrors.fecha_fin && <p className="text-red-500 text-sm">{fieldErrors.fecha_fin}</p>}
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          {cargando ? "Creando..." : "Crear oferta"}
        </button>
      </form>

      {mensaje && <p className="text-green-600 mt-4 text-center">{mensaje}</p>}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default CrearOferta;

