# PescarJob+ 

![Express](https://img.shields.io/badge/Express-5.1.0-green)
![React](https://img.shields.io/badge/React-19+-blue) 
![MySQL](https://img.shields.io/badge/MySQL-8+-orange) 
![GitHub](https://img.shields.io/badge/GitHub-Version-blue) 

**PescarJob+** es una plataforma web de gestión de postulaciones dirigida a **egresados**, **empresas** y **administradores**.  
Permite que los egresados se postulen a ofertas de empleo publicadas por las empresas, mientras que los administradores pueden gestionar usuarios y ofertas.

---

## 🎯 Objetivo del proyecto

Crear un sistema que conecte egresados y empresas de manera eficiente, donde los egresados puedan postularse a ofertas y las empresas puedan gestionar postulaciones.

---

## 🛠 Tecnologías utilizadas

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Base de datos:** MySQL (XAMPP)
- **Autenticación:** JWT
- **Control de versiones:** Git / GitHub

---

## 👤 Roles de usuario

- **Egresado:** puede registrarse, completar su perfil, postularse a ofertas y ver el estado de sus postulaciones.  
- **Empresa:** puede publicar, editar y eliminar ofertas, revisar postulaciones y gestionar información de la empresa.  
- **Administrador:** puede gestionar todos los usuarios y supervisar el funcionamiento de la plataforma.

---

## ⚡ Instalación desde cero

### 1 Clonar el repositorio

```bash
git clone https://github.com/Nico13A/pescarjob.git
cd pescarjob
```

### 2 Entrar a la carpeta backend
```bash
cd backend
npm install
```

### 3 Crear el archivo .env basado en .env.example y completar las credenciales
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=pescarproyecto
DB_PORT=3306
JWT_SECRET=claveSecreta
FRONTEND_URL=http://localhost:5173
```

### 4 Ejecutar migraciones (backend)
Ejecuta las migraciones con sequelize para crear las tablas en la base de datos:
```bash
npx sequelize db:migrate
```

### 5 Iniciar el servidor backend
```bash
npm run dev
```

### 6 Entrar a la carpeta frontend
```bash
cd ./frontend
npm install
```

### 7 Crear el archivo .env basado en .env.example
```env
VITE_API_URL=http://localhost:4000/api
```

### 8 Iniciar el cliente frontend
```bash
npm run dev
```
