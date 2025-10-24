import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccion } from "../hooks/useAccion";
import { register } from "../services/auth";
import { InputField } from "../components/InputField/InputField";
import { Spinner } from "../components/Spinner/Spinner";
import { useAuthContext } from "../context/AuthContext";

export const Register = () => {
    const navigate = useNavigate();
    
    const { usuario } = useAuthContext();

    useEffect(() => {
        if (usuario) navigate("/");
    }, [usuario, navigate]);

    const [formData, setFormData] = useState({
        usnombre: "",
        usapellido: "",
        usmail: "",
        uspass: "",
        ustelefono: "",
        rodescripcion: "Egresado",
    });

    const { ejecutar: ejecutarRegister, cargando, error, erroresCampos } = useAccion(register);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await ejecutarRegister(formData);
        if (res.success) {
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen bg-sky-50 px-5 pb-20">
            <img src="/LogoPescar.png" alt="Logo Pescar" className="w-40 h-40 md:w-60 md:h-60 object-contain m-auto" />
            <div className="bg-white p-10 rounded-2xl shadow-md md:w-full max-w-lg m-auto">
                <h2 className="text-xl md:text-2xl font-bold mb-3 text-center">Crear Cuenta</h2>
                <p className="text-center text-xs md:text-sm text-gray-400 mb-6">
                    Completa tus datos para crear una cuenta
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        label="Nombre"
                        id="usnombre"
                        name="usnombre"
                        type="text"
                        placeholder="Nombre"
                        value={formData.usnombre}
                        onChange={handleChange}
                        error={erroresCampos?.usnombre}
                    />
                    <InputField
                        label="Apellido"
                        id="usapellido"
                        name="usapellido"
                        type="text"
                        placeholder="Apellido"
                        value={formData.usapellido}
                        onChange={handleChange}
                        error={erroresCampos?.usapellido}
                    />
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
                    <InputField
                        label="Teléfono"
                        id="ustelefono"
                        name="ustelefono"
                        type="text"
                        placeholder="Teléfono (opcional)"
                        value={formData.ustelefono}
                        onChange={handleChange}
                        error={erroresCampos?.ustelefono}
                    />

                    {/* Rol */}
                    <div className="flex flex-col">
                        <label className="text-sm md:text-base mb-1 font-medium">Rol</label>
                        <select
                            name="rodescripcion"
                            value={formData.rodescripcion}
                            onChange={handleChange}
                            className="border rounded p-2 text-sm md:text-base"
                        >
                            <option value="Egresado">Egresado</option>
                            <option value="Empresa">Empresa</option>
                        </select>
                        {erroresCampos?.rodescripcion && (
                            <p className="text-red-500 text-sm mt-1">{erroresCampos.rodescripcion}</p>
                        )}
                    </div>

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={cargando}
                        className="text-sm md:text-base font-medium cursor-pointer w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {cargando ? <Spinner /> : "Crear cuenta"}
                    </button>
                </form>

                <p className="mt-4 text-center text-xs md:text-sm text-gray-600">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-blue-600 font-bold hover:underline">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};
