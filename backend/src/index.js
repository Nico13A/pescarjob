import app from "./app.js";
import sequelize from "./config/db.js";

const startServer = async () => {
  try {
    await sequelize.authenticate(); 
    console.log("Conexión a la base de datos exitosa");
    app.listen(4000, () => {
      console.log("Server on port 4000");
    });
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
    process.exit(1);
  }
};

startServer();

