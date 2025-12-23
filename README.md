# 📘 Eliana AI - Business Assistant Companion (Backend API)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)

---


## Estructura del Frontend
eliana-ai/
├── public/
│   └── index.html           # Punto de entrada HTML (modificado para Vite)
├── src/
│   ├── components/          # Componentes visuales
│   │   ├── ui/
│   │   │   └── Button.tsx   # Botones reutilizables
│   │   ├── ChatInterface.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Landing.tsx
│   │   ├── MasterPlanView.tsx
│   │   └── Onboarding.tsx
│   ├── context/             # Estado global (Context API)
│   │   └── AppContext.tsx
│   ├── services/            # Lógica de negocio y APIs
│   │   └── geminiService.ts
│   ├── App.tsx              # Componente raíz y enrutamiento lógico
│   ├── index.tsx            # Punto de entrada (a veces main.tsx en Vite)
│   ├── index.css            # Estilos globales / Tailwind directives
│   └── types.ts             # Definiciones de TypeScript
├── .env                     # Variables de entorno (API KEY)
├── package.json             # Dependencias
├── tailwind.config.js       # Configuración de Tailwind
└── tsconfig.json            # Configuración de TypeScript

## 📌 Descripción del Proyecto

Este proyecto implementa el **backend API** para **Eliana AI**, una aplicación tipo Business Assistant diseñada para la gestión de perfiles de usuario, planes estratégicos, seguimiento diario y notificaciones.

El sistema está desarrollado con **Node.js** y **Express.js**, utiliza **PostgreSQL** (alojado en **Supabase**) como base de datos, y **Sequelize ORM** para la gestión de datos relacionales, siguiendo el paradigma **RESTful** y aplicando operaciones **CRUD** completas.

> 💡 **Arquitectura:** El diseño está optimizado para la futura integración de un motor de **Inteligencia Artificial** que generará planes personalizados basados en el contexto y perfil del usuario.

## 🎯 Objetivos

* Implementar una API REST robusta con Express.js.
* Gestionar datos relacionales y aplicar **migraciones** usando Sequelize.
* Conectar el backend a una base de datos PostgreSQL en Supabase.
* Utilizar **Supabase Auth** para una autenticación segura.
* Establecer relaciones entre entidades (Integridad Referencial).
* Preparar una base de código limpia y escalable para futuras **integraciones con IA**.

## 🛠️ Tecnologías Utilizadas

| Tecnología      | Uso                                            |
| :-------------- | :--------------------------------------------- |
| **Node.js** | Entorno de ejecución de JavaScript.             |
| **Express.js** | Framework para construir la API backend.         |
| **PostgreSQL** | Base de datos relacional.                      |
| **Supabase** | Hosting de DB (PostgreSQL) y servicio de Auth. |
| **Sequelize** | ORM (Object-Relational Mapping).               |
| `sequelize-cli` | Herramienta para gestionar migraciones.        |
| `dotenv`        | Gestión de variables de entorno.               |
| `Nodemon`       | Recarga automática durante el desarrollo.        |

---

## 📁 Estructura del Proyecto
eliana-ai-api/
├── index.js
├── package.json
├── .env
├── models/
│   ├── index.js
│   ├── profile.js
│   ├── master_plan.js
│   ├── daily_log.js
│   └── notification.js
├── migrations/
└── config/
    └── config.js


---

## 🗂️ Modelo de Datos

### 🔑 Autenticación (`auth.users`)

* Gestionada automáticamente por **Supabase Auth**.
* **Campos clave:** `id (UUID)`, `email`, `password (hash)`, `created_at`.
* *(Esta tabla no se crea manualmente a través de Sequelize).*

### 👤 Profiles

Extiende la información del usuario autenticado.

| Campo            | Tipo       | Descripción                                 |
| :--------------- | :--------- | :------------------------------------------ |
| **`id`** | `UUID`     | **FK** a `auth.users.id` (Clave Principal) |
| `age`            | `Integer`  | Edad del usuario.                           |
| `location`       | `String`   | Ubicación geográfica.                       |
| `personality`    | `JSONB`    | Rasgos y tipo de personalidad.              |
| `dreams`         | `Text`     | Aspiraciones a largo plazo.                 |
| `strengths`      | `JSONB`    | Fortalezas identificadas.                   |
| `weaknesses`     | `JSONB`    | Debilidades a mejorar.                      |
| `financial_goal` | `JSONB`    | Objetivo financiero (ej. ahorro, inversión).|
| `monthly_income` | `Decimal`  | Ingreso mensual actual.                     |
| `current_situation`| `Text`    | Descripción de su estado actual.            |

### 🧠 Master Plans

Planes estratégicos generados (futura integración con IA).

| Campo            | Tipo       | Descripción                                 |
| :--------------- | :--------- | :------------------------------------------ |
| `id`             | `Integer`  | Clave Primaria.                             |
| **`user_id`** | `UUID`     | **FK** a `Profiles.id`.                     |
| `generated_text` | `Text`     | Plan estratégico completo.                  |
| `tasks`          | `JSONB`    | Tareas estructuradas del plan.               |
| `created_at`     | `DateTime` | Fecha de generación.                        |
| `updated_at`     | `DateTime` | Fecha de última modificación.               |

### 📓 Daily Logs

Registros diarios de acciones, estado emocional y progreso.

| Campo            | Tipo       | Descripción                                 |
| :--------------- | :--------- | :------------------------------------------ |
| `id`             | `Integer`  | Clave Primaria.                             |
| **`user_id`** | `UUID`     | **FK** a `Profiles.id`.                     |
| `date`           | `Date`     | Día del registro.                           |
| `mood`           | `String`   | Estado emocional.                           |
| `actions_completed`| `JSONB`  | Acciones realizadas ese día.                |
| `created_at`     | `DateTime` | Fecha de creación del registro.             |

### 🔔 Notifications

Recordatorios programados para el usuario.

| Campo            | Tipo       | Descripción                                 |
| :--------------- | :--------- | :------------------------------------------ |
| `id`             | `Integer`  | Clave Primaria.                             |
| **`user_id`** | `UUID`     | **FK** a `Profiles.id`.                     |
| `type`           | `String`   | Tipo de notificación (ej. `reminder`, `plan`). |
| `scheduled_for`  | `DateTime` | Fecha y hora programada para el envío.      |
| `sent`           | `Boolean`  | Indica si ya fue enviada.                   |
| `created_at`     | `DateTime` | Fecha de creación.                          |

---

## ⚙️ Configuración y Ejecución (Paso a Paso)

### 1️⃣ Clonar el Repositorio

```
git clone <url-del-repositorio>
cd eliana-ai-api
```

2️⃣ Instalar Dependencias
```
npm install
```

3️⃣ Configurar Supabase
Crear un nuevo proyecto en https://supabase.com.

Obtener la Database URL de las configuraciones de proyecto.

Asegurarse de que Supabase Auth (Email/Password) esté activado.

4️⃣ Variables de Entorno
Crear un archivo llamado .env en la raíz del proyecto y completarlo:
```
DATABASE_URL="postgresql://user:password@host:port/database"
PORT=3000
```
5️⃣ Configurar Sequelize
Verificar la configuración en config/config.js para asegurar que está leyendo la variable de entorno:
```
require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
};
```
6️⃣ Ejecutar Migraciones
Crear las tablas en la base de datos de PostgreSQL:
```
npx sequelize-cli db:migrate
```
Esto creará las tablas: profiles, master_plans, daily_logs, y notifications.
7️⃣ Ejecutar el Servidor
```
npm run dev
```
El servidor estará disponible en:
```
http://localhost:3000
```




🌐 Endpoints DisponiblesProfiles (/api/profiles)MétodoRutaDescripciónPOST/Crear el perfil inicial del usuario.GET/Obtener todos los perfiles (uso administrativo/prueba).GET/:idObtener un perfil específico.PATCH/:idActualizar la información del perfil.DELETE/:idEliminar un perfil.

Master Plans (/api/master-plans)MétodoRutaDescripciónPOST/Crear un nuevo plan maestro.GET/user/:userIdObtener todos los planes de un usuario.PATCH/:idActualizar un plan existente.Daily Logs (/api/daily-logs)MétodoRutaDescripciónPOST/Crear un nuevo registro diario.GET/user/:userIdObtener todos los registros diarios de un usuario.PATCH/:idActualizar un registro.DELETE/:idEliminar un registro.Notifications (/api/notifications)MétodoRutaDescripciónPOST/Crear una nueva notificación/recordatorio.GET/user/:userIdObtener notificaciones pendientes de un usuario.

🧠 Arquitectura y Escalabilidad
El diseño de este proyecto se centra en:

Desacoplamiento: Separación clara entre la autenticación (Supabase Auth) y los datos de negocio.

Escalabilidad de Entidades: La estructura de modelos y migraciones permite añadir nuevas entidades de forma sencilla sin refactorizar el núcleo.

Preparación para IA: La arquitectura de Master Plans y Daily Logs está diseñada para consumir y almacenar resultados de servicios de Inteligencia Artificial (ej. generación de planes, análisis de comportamiento).

✅ Conclusión
Este backend implementa los conceptos fundamentales del desarrollo moderno: API REST, CRUD completo, ORM (Sequelize), Migraciones e Integridad Referencial. Además, establece una base sólida para futuras extensiones enfocadas en la Inteligencia Artificial y la Automatización de la gestión empresarial personal.

🔜 Trabajo Futuro
Integración con Gemini API para generación de planes y análisis de datos.

Implementación de Autenticación por Middleware y control de roles.

Programador de Notificaciones (cron job) para envíos automáticos.

Análisis de Patrones de comportamiento a partir de Daily Logs.

----
---
👨‍💻 Autor
Proyecto académico – Desarrollo Backend

Eliana AI – Business Assistant Companion
---
---

⚙️ Archivo .sequelizerc
require('dotenv').config({ silent: true });


Esto permite que Sequelize lea el archivo .env.

🧱 Generación de modelos y migraciones
Profiles
npx sequelize-cli model:generate \
--name Profile \
--attributes age:integer,location:string,personality:jsonb,dreams:text,strengths:jsonb,weaknesses:jsonb,financial_goal:jsonb,monthly_income:decimal,current_situation:text

MasterPlan
npx sequelize-cli model:generate \
--name MasterPlan \
--attributes userId:uuid,generatedText:text,tasks:jsonb

DailyLog
npx sequelize-cli model:generate \
--name DailyLog \
--attributes userId:uuid,date:date,mood:string,actionsCompleted:jsonb

Notification
npx sequelize-cli model:generate \
--name Notification \
--attributes userId:uuid,type:string,scheduledFor:date,sent:boolean

▶️ Ejecutar migraciones
npx sequelize-cli db:migrate


✔️ Las tablas se crean en Supabase
✔️ Se registra SequelizeMeta

🔌 Conexión desde Express

En index.js (parte superior):

require('dotenv').config({ silent: true });
const db = require('./models');


Ejemplo de uso:

app.get('/api/profiles', async (req, res) => {
  const profiles = await db.Profile.findAll();
  res.json(profiles);
});


Equivalente en SQL:

SELECT * FROM profiles;

✅ Verificación

Entrar a:

http://localhost:3000/api/profiles


Resultado esperado:

[]

🧠 Conclusión académica

El proyecto Eliana AI implementa correctamente:

Bases de datos relacionales

ORM (Sequelize)

Migraciones versionadas

Integración backend–database

Buenas prácticas de persistencia

Todo esto siguiendo los principios del desarrollo backend moderno.
