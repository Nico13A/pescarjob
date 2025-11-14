import { Link } from "react-router-dom";
import { useContext } from "react";
import AutenticacionContext from "../../contexts/AutenticacionContext";
import { menuLinks } from "../../config/menuConfig";

const Footer = () => {
  const { usuario } = useContext(AutenticacionContext);
  const rol = usuario?.rol || null; 
  const links = rol ? menuLinks[rol] : [];

  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 py-12 border-t border-gray-300 px-5 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Izquierda: Logo y texto */}
        <div className="flex flex-col items-start">
          <img
            src="/LogoPescar.png"
            alt="Logo Pescar"
            className="h-16 w-16 md:h-30 md:w-30 object-contain"
          />
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-md">
            Conectamos egresados talentosos con las mejores oportunidades laborales. Tu próximo trabajo te está esperando.
          </p>
        </div>

        {/* Derecha: Links */}
        <div className="flex flex-col items-start md:items-end space-y-3">
          <h3 className="text-gray-950 font-medium text-lg border-b-2 border-gray-300">
            {rol === "Empresa" ? "Para empresas" : "Para egresados"}
          </h3>
          <ul className="space-y-2 text-sm md:text-base text-right">
            {links.length > 0
              ? links.map((l) => (
                  <li key={l.path}>
                    <Link
                      to={usuario ? l.path : "/login"}
                      className="text-gray-400 hover:text-blue-600 transition-colors font-medium"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))
              : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="text-gray-400 hover:text-blue-600 transition-colors font-medium"
                    >
                      Buscar empleos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="text-gray-400 hover:text-blue-600 transition-colors font-medium"
                    >
                      Mis postulaciones
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="text-gray-400 hover:text-blue-600 transition-colors font-medium"
                    >
                      Mi perfil
                    </Link>
                  </li>
                </>
              )
            }
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-4 border-t border-gray-300 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-700">Pescar Job+</span>. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;


