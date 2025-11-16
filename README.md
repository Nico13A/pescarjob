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

- **Egresado:** Puede registrarse, completar su perfil, postularse a ofertas y ver el estado de sus postulaciones.  
- **Empresa:** Puede publicar, editar y eliminar ofertas, revisar postulaciones y gestionar información de la empresa.  
- **Administrador:** Puede gestionar todos los usuarios y supervisar el funcionamiento de la plataforma.

---

## ⚡ Instalación desde cero

### BACKEND

1. Clonar el repositorio.
```bash
git clone https://github.com/Nico13A/pescarjob.git
cd pescarjob
```

2. Entrar a la carpeta backend.
```bash
cd backend
npm install
```

3. Crear el archivo .env basado en .env.example y completar las credenciales.
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=pescarproyecto
DB_PORT=3306
JWT_SECRET=claveSecreta
FRONTEND_URL=http://localhost:5173
```

4. Ejecutar migraciones (backend)<br>
OBS. Antes de realizar las migraciones borrar la linea "type": "module", del package.json y después de realizar las migraciones volver a incorporarlo.<br>
Ejecuta las migraciones con sequelize para crear las tablas en la base de datos:
```bash
npx sequelize db:migrate
```

5. Crear roles manualmente en la base de datos:
```sql
INSERT INTO rol (rodescripcion) VALUES
('Egresado'),
('Empresa'),
('Admin');
```

6. Iniciar el servidor backend
```bash
npm run dev
```

### FRONTEND

1. Entrar a la carpeta frontend e instalar dependencias
```bash
cd ./frontend
npm install
```

2. Crear el archivo .env basado en .env.example
```env
VITE_API_URL=http://localhost:4000/api
```

3. Iniciar el cliente frontend
```bash
npm run dev
```

### Extras (Para crear usuario admin)

Actualmente el registro solo permite crear usuarios **Egresado** o **Empresa**.  
Para crear un **Admin**, seguí estos pasos:

---

### 1️⃣ Registrar un usuario desde la web

Ingresá a la pantalla de registro y creá un usuario con los siguientes datos:

- **Nombre:** Fundación  
- **Apellido:** Pescar  
- **Email:** `admin@gmail.com`  
- **Contraseña:** `admin123`  
- **Rol (temporal):** `Empresa` o `Egresado` (cualquiera)

> ⚠️ Esto es necesario porque el sistema no permite registrarse directamente como Admin.

---

### 2️⃣ Convertir el usuario a Admin desde la base de datos

Ingresá a **phpMyAdmin**:

👉 http://localhost/phpmyadmin/

Luego ejecutá esta consulta SQL en tu base de datos:

```sql
UPDATE usuario
SET idrol = 3
WHERE usmail = 'admin@gmail.com';
```