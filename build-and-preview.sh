#!/bin/bash

# Script para construir y previsualizar Rexistro
# Uso: ./build-and-preview.sh

echo "🍽️ Construyendo y previsualizando Rexistro"
echo "=========================================="

# Activar entorno conda
echo "🔧 Activando entorno conda..."
source /home/hlfernandez/miniconda3/etc/profile.d/conda.sh
conda activate rexistro-dev

if [ $? -ne 0 ]; then
    echo "❌ Error: No se pudo activar el entorno 'rexistro-dev'"
    exit 1
fi

# Construir el proyecto
echo "🏗️ Construyendo el proyecto..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error en la construcción"
    exit 1
fi

# Previsualizar
echo "🚀 Iniciando servidor de previsualización..."
echo "   La aplicación estará disponible en: http://localhost:4173"
echo "   Presiona Ctrl+C para detener el servidor"
echo ""

npm run preview
