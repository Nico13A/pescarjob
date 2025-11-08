import { useState } from "react";
import { crearOferta } from "../../services/oferta";

const CrearOferta = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    modalidad: "remoto",
    ubicacion: "",
    fecha_fin: "",
  });

  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);
    setError(null);

    const res = await crearOferta(formData);

    if (res?.success) {
      setMensaje("Oferta creada con éxito");
    } else {
      setError(res?.error || "Error al crear la oferta");
    }
    setCargando(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Crear nueva oferta</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={formData.titulo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

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

        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación"
          value={formData.ubicacion}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          name="fecha_fin"
          value={formData.fecha_fin}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {cargando ? "Creando..." : "Crear oferta"}
        </button>
      </form>

      {mensaje && <p className="text-green-600 mt-3">{mensaje}</p>}
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default CrearOferta;
