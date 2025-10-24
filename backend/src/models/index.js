import Usuario from "./user.model.js";
import Rol from "./rol.model.js";
import Egresado from "./egresado.model.js";
import Empresa from "./empresa.model.js";

// ===================================
// RELACIONES Usuario ↔ Rol
// ===================================
Usuario.belongsTo(Rol, { foreignKey: "idrol" });
Rol.hasMany(Usuario, { foreignKey: "idrol" });

// ===================================
// RELACIONES Usuario ↔ Egresado
// ===================================
Usuario.hasOne(Egresado, { foreignKey: "idusuario" });
Egresado.belongsTo(Usuario, { foreignKey: "idusuario" });

// ===================================
// RELACIONES Usuario ↔ Empresa
// ===================================
Usuario.hasOne(Empresa, { foreignKey: "idusuario" });
Empresa.belongsTo(Usuario, { foreignKey: "idusuario" });

// Exportar todos los modelos
export { Usuario, Rol, Egresado, Empresa };