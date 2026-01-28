# Instrucciones para Ejecutar el Sitio

## Pasos Rápidos

### 1. Navegar al directorio correcto

Desde PowerShell, ejecuta estos comandos:

```powershell
# Si estás en 'backend', vuelve a la raíz del proyecto
cd ..

# Ahora entra a nextjs-app
cd nextjs-app
```

### 2. Instalar dependencias (solo la primera vez)

```powershell
npm install
```

### 3. Ejecutar el servidor

```powershell
npm run dev
```

### 4. Abrir en el navegador

Ve a: **http://localhost:3000**

---

## Comandos Completos (Copia y Pega)

```powershell
cd ..
cd nextjs-app
npm install
npm run dev
```

---

## ¿Problemas?

### Error: "npm no se reconoce"
- Instala Node.js desde: https://nodejs.org/

### Error: "Puerto 3000 en uso"
- Next.js usará automáticamente el puerto 3001, 3002, etc.

### Error al instalar
- Prueba: `npm install --legacy-peer-deps`

---

¡Listo! Tu sitio estará corriendo en http://localhost:3000 🚀
