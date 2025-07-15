#!/bin/bash

# Script para usar live-server con el build de producción
# Uso: ./serve-with-live-server.sh

echo "🍽️ Sirviendo Rexistro con live-server"
echo "===================================="

# Activar entorno conda
echo "🔧 Activando entorno conda..."
source /home/hlfernandez/miniconda3/etc/profile.d/conda.sh
conda activate rexistro-dev

if [ $? -ne 0 ]; then
    echo "❌ Error: No se pudo activar el entorno 'rexistro-dev'"
    exit 1
fi

# Construir si no existe dist/ o si es más antiguo que src/
if [ ! -d "dist" ] || [ "src" -nt "dist" ]; then
    echo "🏗️ Construyendo el proyecto..."
    npm run build
fi

# Verificar si live-server está instalado
if ! command -v live-server &> /dev/null; then
    echo "📦 Instalando live-server..."
    npm install -g live-server
fi

# Servir con live-server
echo "🚀 Iniciando live-server..."
echo "   La aplicación estará disponible en: http://127.0.0.1:8080"
echo "   live-server recargará automáticamente al cambiar archivos"
echo "   Presiona Ctrl+C para detener el servidor"
echo ""

live-server dist/
