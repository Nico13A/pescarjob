import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import AutenticacionContext from "../../contexts/AutenticacionContext";

const Navbar = () => {
    const {cerrarSesion} = useContext(AutenticacionContext)

    const [menuAbierto, setMenuAbierto] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const manejarClickFuera = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuAbierto(false);
            }
        };
        document.addEventListener("mousedown", manejarClickFuera);
        return () => document.removeEventListener("mousedown", manejarClickFuera);
    }, []);

    const handleToggleMenu = () => setMenuAbierto((prev) => !prev);
    const handleCerrarMenu = () => setMenuAbierto(false);

    const handleCerrarSesion = () => {
        handleCerrarMenu();
        cerrarSesion();
    };

    return (
        <nav className="bg-white shadow px-5 md:px-10 grid grid-cols-3 items-center relative">
            {/* Logo */}
            <div className="flex justify-start">
                <img
                    src="/LogoPescar.png"
                    alt="Logo Pescar"
                    className="h-14 w-14 md:h-30 md:w-30 object-contain"
                />
            </div>

            {/* Enlaces del medio */}
            <div className="flex justify-center space-x-4 md:space-x-8">
                <Link
                    to="/egresado/empleos"
                    className="text-gray-700 hover:text-blue-600 font-semibold text-sm md:text-base"
                >
                    Empleos
                </Link>
            </div>

            {/* Menú perfil */}
            <div className="flex justify-end relative" ref={menuRef}>
                <button onClick={handleToggleMenu} className="focus:outline-none">
                    <FaUserCircle className="text-gray-700 hover:text-blue-600 text-3xl cursor-pointer" />
                </button>

                {/* Dropdown */}
                {menuAbierto && (
                    <div className="absolute right-0 mt-8 w-48 bg-white rounded-xl shadow border border-gray-200 py-2 z-50">
                        <Link
                            to="/egresado/perfil"
                            onClick={handleCerrarMenu}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Editar perfil
                        </Link>
                        <button
                            onClick={handleCerrarSesion}
                            className="cursor-pointer block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

