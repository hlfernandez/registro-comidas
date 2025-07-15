#!/bin/bash

# Script para iniciar el servidor de desarrollo de Rexistro
# Uso: ./start-dev.sh

echo "🍽️ Iniciando Rexistro - Servidor de desarrollo"
echo "============================================="

# Verificar si conda está disponible
if ! command -v conda &> /dev/null; then
    echo "❌ Error: conda no está disponible"
    echo "   Instala Miniconda o Anaconda primero"
    exit 1
fi

# Activar el entorno conda
echo "🔧 Activando entorno conda..."
source /home/hlfernandez/miniconda3/etc/profile.d/conda.sh
conda activate rexistro-dev

# Verificar si el entorno existe
if [ $? -ne 0 ]; then
    echo "❌ Error: No se pudo activar el entorno 'rexistro-dev'"
    echo "   Ejecuta: conda env create -f environment.yml"
    exit 1
fi

# Verificar si las dependencias están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Iniciar servidor de desarrollo
echo "🚀 Iniciando servidor de desarrollo..."
echo "   La aplicación estará disponible en: http://localhost:5173"
echo "   Presiona Ctrl+C para detener el servidor"
echo ""

npm run dev
