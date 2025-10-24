import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useAccion } from "../hooks/useAccion";
import { InputField } from "../components/InputField/InputField";
import { Spinner } from "../components/Spinner/Spinner";

export const Login = () => {
  const navigate = useNavigate();

  const { usuario, iniciarSesion } = useAuthContext();

  const [formData, setFormData] = useState({ usmail: "", uspass: "" });

  const { ejecutar: ejecutarLogin, cargando, error, erroresCampos } = useAccion(iniciarSesion);

  useEffect(() => {
    if (usuario) navigate("/");
  }, [usuario, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await ejecutarLogin(formData);
    if (res.success) navigate("/");
  };

  return (
    <div className="min-h-screen bg-sky-50 p-5 md:p-0">
      <img src="/LogoPescar.png" alt="Logo Pescar Job" className="w-40 h-40 md:w-60 md:h-60 object-contain m-auto" />
      <div className="bg-white p-5 md:p-10 rounded-2xl shadow-md max-w-lg m-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-3 text-center">Iniciar Sesión</h2>
        <p className="text-center text-xs md:text-sm text-gray-400 mb-6">
          Ingresa tus credenciales para acceder a esta cuenta
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Correo electrónico"
            id="usmail"
            name="usmail"
            type="email"
            placeholder="Email"
            value={formData.usmail}
            onChange={handleChange}
            error={erroresCampos?.usmail}
          />
          <InputField
            label="Contraseña"
            id="uspass"
            name="uspass"
            type="password"
            placeholder="Contraseña"
            value={formData.uspass}
            onChange={handleChange}
            error={erroresCampos?.uspass}
          />

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="text-sm md:text-base font-medium cursor-pointer w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {cargando ? <Spinner /> : "Iniciar sesión"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs md:text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-blue-600 font-bold hover:underline">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};









