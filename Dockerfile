# 1. Etapa de Construcción (Builder)
# Usamos una imagen ligera de Node.js como base
FROM node:18-alpine AS builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias primero (para aprovechar la caché de Docker)
COPY package.json pnpm-lock.yaml ./

# Instalamos pnpm globalmente y luego las dependencias del proyecto
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copiamos el resto del código fuente
COPY . .

# Construimos la aplicación (crea la carpeta dist/)
RUN pnpm build

# 2. Etapa de Producción (Runner)
# Empezamos de nuevo con una imagen limpia para que pese menos
FROM node:18-alpine AS runner

WORKDIR /app

# Copiamos solo lo necesario de la etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Exponemos el puerto 3000
EXPOSE 3000

# Comando para iniciar la app en producción
CMD ["node", "dist/main"]
