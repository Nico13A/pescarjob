import { Link } from "react-router-dom";

const NavbarPublic = () => {
  return (
    <nav className="bg-white shadow px-5 md:px-10 grid grid-cols-3 items-center">
      {/* Logo */}
      <div className="flex justify-start">
        <Link to="/">
          <img
            src="/LogoPescar.png"
            alt="Logo Pescar"
            className="h-14 w-14 md:h-30 md:w-30 object-contain"
          />
        </Link>
      </div>

      {/* Enlaces del medio */}
      <div className="flex justify-center space-x-4 md:space-x-8">
        <Link
          to="/login"
          className="text-gray-700 hover:text-blue-600 font-semibold text-sm md:text-base"
        >
          Empleos
        </Link>
      </div>

      <div></div>
    </nav>
  );
};

export default NavbarPublic;
