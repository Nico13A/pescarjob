import { useState, useEffect } from "react"
import { InputField } from "../../components/InputField/InputField"
import { Spinner } from "../../components/Spinner/Spinner"
import { useAccion } from "../../hooks/useAccion"
import { crearOferta, actualizarOferta } from "../../services/oferta"
import EmpresaLayout from "../../layout/EmpresaLayout"

const FormularioOferta = ({ ofertaInicial = null }) => {
  const esEdicion = Boolean(ofertaInicial)

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    modalidad: "remoto",
    ubicacion: "",
    fecha_fin: "",
    salario: "",
    jornada: "Tiempo completo",
  })

  const [mensaje, setMensaje] = useState(null)

  // Hook reutilizable
  const { ejecutar, cargando, error, erroresCampos, limpiarErrores } = useAccion(
    esEdicion ? actualizarOferta : crearOferta
  )

  useEffect(() => {
    if (ofertaInicial) setFormData(ofertaInicial)
  }, [ofertaInicial])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    limpiarErrores()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje(null)
    const res = await ejecutar(formData)
    if (res?.success) {
      setMensaje(esEdicion ? "Oferta actualizada con éxito" : "Oferta creada con éxito")
      if (!esEdicion) {
        setFormData({
          titulo: "",
          descripcion: "",
          modalidad: "remoto",
          ubicacion: "",
          fecha_fin: "",
          salario: "",
          jornada: "Tiempo completo",
        })
      }
    }
  }

  return (
    <EmpresaLayout>
      <div className="py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">
            {esEdicion ? "Editar oferta" : "Crear nueva oferta"}
          </h2>
          <p className="text-gray-600 mb-6">
            {esEdicion
              ? "Modifica los datos de la oferta laboral"
              : "Completa los datos para publicar tu oferta laboral"}
          </p>

          {/* FORMULARIO */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-white/90 backdrop-blur-sm shadow-md px-4 py-6 md:p-10 rounded-xl border border-gray-100"
          >
            <InputField
              label="Título de la posición"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ej: Desarrollador Frontend Senior"
              error={erroresCampos?.titulo}
            />

            {/* Descripción */}
            <div>
              <label htmlFor="descripcion" className="block text-sm font-semibold text-gray-500 mb-1">
                Descripción del puesto
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Describe las responsabilidades, requisitos y beneficios..."
                className="text-xs md:text-base w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none transition-all"
              />
              {erroresCampos?.descripcion && (
                <p className="text-red-500 text-xs md:text-sm">{erroresCampos.descripcion}</p>
              )}
            </div>

            {/* Modalidad y jornada */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="modalidad" className="block text-sm font-semibold text-gray-500 mb-1">
                  Modalidad de trabajo
                </label>
                <select
                  id="modalidad"
                  name="modalidad"
                  value={formData.modalidad}
                  onChange={handleChange}
                  className="text-xs md:text-base w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="remoto">Remoto</option>
                  <option value="presencial">Presencial</option>
                  <option value="hibrido">Híbrido</option>
                </select>
              </div>

              <div>
                <label htmlFor="jornada" className="block text-sm font-semibold text-gray-500 mb-1">
                  Jornada laboral
                </label>
                <select
                  id="jornada"
                  name="jornada"
                  value={formData.jornada}
                  onChange={handleChange}
                  className="text-xs md:text-base w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="Tiempo completo">Tiempo completo (8 hs)</option>
                  <option value="Medio tiempo">Medio tiempo (4 hs)</option>
                </select>
              </div>
            </div>

            {/* Ubicación y salario */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Ubicación"
                id="ubicacion"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                placeholder="Ej: Buenos Aires, Argentina"
              />
              <InputField
                label="Salario (opcional)"
                id="salario"
                name="salario"
                type="number"
                value={formData.salario}
                onChange={handleChange}
                placeholder="Monto mensual en ARS"
              />
            </div>

            {/* Fecha fin */}
            <InputField
              label="Fecha de finalización"
              id="fecha_fin"
              name="fecha_fin"
              type="date"
              value={formData.fecha_fin}
              onChange={handleChange}
              error={erroresCampos?.fecha_fin}
            />

            {/* Botón */}
            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-blue-600 text-white py-4 rounded-xl cursor-pointer hover:bg-blue-700 transition"
            >
              {cargando ? <Spinner /> : esEdicion ? "Guardar cambios" : "Publicar oferta"}
            </button>
          </form>

          {/* Mensajes */}
          {mensaje && (
            <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-xl text-center text-green-700 font-medium">
              {mensaje}
            </div>
          )}
          {error && (
            <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-xl text-center text-red-600 font-medium">
              {error}
            </div>
          )}
        </div>
      </div>
    </EmpresaLayout>
  )
}

export default FormularioOferta
