# 🌟 Life-Stream

[![Website](https://img.shields.io/badge/Website-life--stream.vercel.app-blue?style=for-the-badge&logo=vercel)](https://life-stream.vercel.app)
[![Figma](https://img.shields.io/badge/Figma-Design-F24E1E?style=for-the-badge&logo=figma)](https://www.figma.com/design/Qe9Z000000000000000000000000000000000000/Life-Stream?node-id=0-1&t=0-0)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Aiven](https://img.shields.io/badge/Aiven-Cloud-FF6F00?style=for-the-badge&logo=aiven&logoColor=white)](https://aiven.io)

<div style="column-count: 2; margin: 20px 0;">
  <img src="public/images/1.png" alt="Imagen 1" style="border-radius: 10px; width: 400px; height: auto; margin-bottom: 10px;">
  <img src="public/images/2.png" alt="Imagen 2" style="border-radius: 10px; width: 400px; height: auto; margin-bottom: 10px;">
  <img src="public/images/3.png" alt="Imagen 3" style="border-radius: 10px; width: 400px; height: auto; margin-bottom: 10px;">
  <img src="public/images/4.png" alt="Imagen 4" style="border-radius: 10px; width: 400px; height: auto; margin-bottom: 10px;">
</div>

---

## 🎯 **Sobre el Proyecto**

**Life-Stream** es un proyecto educativo con el objetivo de facilitar el proceso de agregar pacientes donantes y receptores de sangre en la ciudad de Lima, Perú. Con esta herramienta, buscamos eliminar los tediosos registros manuales, permitiendo que el proceso sea más eficiente y accesible para todos los usuarios.

---

## ✨ **Características**

- ✅ **Registro automático**
- 🎨 **Interfaz intuitiva**
- 📊 **Visualización de datos** mediante árboles binarios
- 🔒 **Seguridad**
- 🎭 **Manejo de roles** como Donante, Receptor, Administrador y Usuarios

---

## 🛠️ **Tecnologías**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-CC6699?style=flat&logo=sass&logoColor=white)
![D3.js](https://img.shields.io/badge/D3.js-F9A03C?style=flat&logo=d3dotjs&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide%20React-000000?style=flat&logo=react&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
![Day.js](https://img.shields.io/badge/Day.js-1E88E5?style=flat&logo=javascript&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=flat&logo=reacthookform&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-202020?style=flat&logo=zustand&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat&logo=react-query&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-336699?style=flat&logo=cloudinary&logoColor=white)

---

## 👨‍💻 **Desarrollador**

[![Luis Fernando](https://img.shields.io/badge/Luis_Fernando-Shun-181717?style=for-the-badge&logo=github)](https://github.com/Luis-Fernando-MP)

---

## 🚀 **Instalación**

1. **Instala [Node.js v20](https://nodejs.org/en/)**

2. **Instala PNPM globalmente:**

   ```bash
   npm install -g pnpm

   ```

3. Clona el repositorio:

   ```bash
   git clone https://github.com/Luis-Fernando-MP/life-stream.git
   cd life-stream
   ```

4. Instala las dependencias:

   ```bash
   pnpm install
   ```

5. Configura las variables de entorno:

   - Crea un archivo `.env` en la raíz del proyecto
   - Copia las siguientes variables y configura sus valores:

   ```env
    # Aiven db
    DATABASE_URL=mysql://

    # Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

    # Clerk Webhooks
    WEBHOOK_SECRET=

    #Web URL
    NEXT_PUBLIC_URL="http://localhost:3000"

    # Cloudinary
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    CLOUDINARY_URL=
    CLOUDINARY_PRESET=
   ```

6. Ejecuta el proyecto en modo desarrollo:

   ```bash
   pnpm dev
   ```

7. Para compilar el proyecto para producción:
   ```bash
   pnpm build
   pnpm start
   ```

### ¡Gracias por tu interés en Life-Stream! Juntos, podemos hacer la diferencia en la gestión de donaciones de sangre. 💖
