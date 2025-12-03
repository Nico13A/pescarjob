import Usuario from "./user.model.js";
import Rol from "./rol.model.js";
import Egresado from "./egresado.model.js";
import Empresa from "./empresa.model.js";
import Oferta from "./oferta.model.js";
import Skill from "./skill.model.js";
import OfertaSkill from "./ofertaSkill.model.js";
import Postulacion from "./postulacion.model.js";
import EstadoPostulacion from "./estadoPostulacion.model.js";

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
});
Skill.belongsToMany(Oferta, {
    through: OfertaSkill,
    foreignKey: "idskill"
});

// ===================================
// RELACIONES Egresado <> Postulacion
// ===================================
Egresado.hasMany(Postulacion, { foreignKey: "idegresado" });
Postulacion.belongsTo(Egresado, { foreignKey: "idegresado" });

// ===================================
// RELACIONES Oferta <> Postulacion
// ===================================
Oferta.hasMany(Postulacion, { foreignKey: "idoferta" });
Postulacion.belongsTo(Oferta, { foreignKey: "idoferta" });

// ===================================
// RELACIONES Postulacion <> EstadoPostulacion
// ===================================
Postulacion.hasMany(EstadoPostulacion, { foreignKey: "idpostulacion" });
EstadoPostulacion.belongsTo(Postulacion, { foreignKey: "idpostulacion" });


// Exportar todos los modelos
export { Usuario, Rol, Egresado, Empresa, Oferta, Skill, OfertaSkill, Postulacion, EstadoPostulacion };