import Usuario from "./user.model.js";
import Rol from "./rol.model.js";
import Egresado from "./egresado.model.js";
import Empresa from "./empresa.model.js";
import Oferta from "./oferta.model.js";
import Skill from "./skill.model.js";
import OfertaSkill from "./ofertaSkill.model.js";

// ===================================
// RELACIONES Usuario <> Rol
// ===================================
Usuario.belongsTo(Rol, { foreignKey: "idrol" });
Rol.hasMany(Usuario, { foreignKey: "idrol" });

// ===================================
// RELACIONES Usuario <> Egresado
// ===================================
Usuario.hasOne(Egresado, { foreignKey: "idusuario" });
Egresado.belongsTo(Usuario, { foreignKey: "idusuario" });

// ===================================
// RELACIONES Usuario <> Empresa
// ===================================
Usuario.hasOne(Empresa, { foreignKey: "idusuario" });
Empresa.belongsTo(Usuario, { foreignKey: "idusuario" });

// ===================================
// RELACIONES Empresa <> Oferta
// ===================================
Empresa.hasMany(Oferta, { foreignKey: "idempresa" });
Oferta.belongsTo(Empresa, { foreignKey: "idempresa" });

// ===================================
// RELACIONES Oferta <> Skill
// ===================================
Oferta.belongsToMany(Skill, {
    through: OfertaSkill,
    foreignKey: "idoferta"
})
Skill.belongsToMany(Oferta, {
    through: OfertaSkill,
    foreignKey: "idskill"
})

// Exportar todos los modelos
export { Usuario, Rol, Egresado, Empresa, Oferta, Skill, OfertaSkill };