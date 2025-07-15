// Clave para almacenar las comidas en localStorage
const MEALS_STORAGE_KEY = 'rexistro-meals'

// Cargar todas las comidas desde localStorage
export const loadMeals = () => {
  try {
    const storedMeals = localStorage.getItem(MEALS_STORAGE_KEY)
    return storedMeals ? JSON.parse(storedMeals) : []
  } catch (error) {
    console.error('Error al cargar comidas:', error)
    return []
  }
}

// Guardar todas las comidas en localStorage
export const saveMeals = (meals) => {
  try {
    localStorage.setItem(MEALS_STORAGE_KEY, JSON.stringify(meals))
  } catch (error) {
    console.error('Error al guardar comidas:', error)
  }
}

// Guardar una nueva comida
export const saveMeal = (meal) => {
  const meals = loadMeals()
  meals.push(meal)
  saveMeals(meals)
}

// Obtener comidas por tipo (desayuno, comida, cena)
export const getMealsByType = (type) => {
  const meals = loadMeals()
  return meals
    .filter(meal => meal.type === type)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

// Obtener comidas únicas (por nombre) para el combobox
export const getUniqueMealNames = (type = null) => {
  const meals = loadMeals()
  const filteredMeals = type ? meals.filter(meal => meal.type === type) : meals
  
  const uniqueNames = [...new Set(filteredMeals.map(meal => meal.name))]
  return uniqueNames.sort()
}

// Obtener detalles de una comida por nombre (para autocompletar descripción)
export const getMealDetailsByName = (name, type = null) => {
  const meals = loadMeals()
  const filteredMeals = type ? meals.filter(meal => meal.type === type) : meals
  
  const meal = filteredMeals.find(meal => meal.name.toLowerCase() === name.toLowerCase())
  return meal ? { description: meal.description || '' } : null
}

// Obtener estadísticas de frecuencia de comidas en los últimos N días
export const getMealFrequencyStats = (meals, days = 10) => {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  
  const recentMeals = meals.filter(meal => new Date(meal.date) >= cutoffDate)
  
  const frequencyMap = recentMeals.reduce((acc, meal) => {
    const key = meal.name.toLowerCase()
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})
  
  return frequencyMap
}

// Calcular días transcurridos desde una fecha
export const getDaysAgo = (dateString) => {
  const date = new Date(dateString)
  const today = new Date()
  const diffTime = today.setHours(0,0,0,0) - date.setHours(0,0,0,0)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 0
  if (diffDays === 1) return 1
  return diffDays
}

// Obtener sugerencias inteligentes basadas en frecuencia y tiempo
export const getSmartSuggestions = (meals, limit = 3) => {
  // Agrupar por nombre de comida y obtener la fecha más reciente de cada una
  const mealsByName = meals.reduce((acc, meal) => {
    const key = meal.name.toLowerCase()
    if (!acc[key] || new Date(meal.date) > new Date(acc[key].date)) {
      acc[key] = meal
    }
    return acc
  }, {})

  // Obtener estadísticas de frecuencia en los últimos 10 días
  const frequencyStats = getMealFrequencyStats(meals, 10)
  
  // Crear array con información completa para sugerencias
  const suggestions = Object.values(mealsByName).map(meal => {
    const frequency = frequencyStats[meal.name.toLowerCase()] || 0
    const daysAgo = getDaysAgo(meal.date)
    
    return {
      ...meal,
      frequency,
      daysAgo,
      // Puntuación para ordenar: menor frecuencia = mayor puntuación, más días = mayor puntuación
      score: (10 - frequency) * 10 + daysAgo
    }
  })

  // Ordenar por puntuación (menor frecuencia primero, luego por días)
  return suggestions
    .sort((a, b) => {
      if (a.frequency !== b.frequency) {
        return a.frequency - b.frequency // Menor frecuencia primero
      }
      return b.daysAgo - a.daysAgo // Más días primero si misma frecuencia
    })
    .slice(0, limit)
}

// Obtener las comidas más antiguas por tipo para sugerencias (versión legacy)
export const getOldestMeals = (meals, limit = 3) => {
  return getSmartSuggestions(meals, limit)
}

// Eliminar una comida
export const deleteMeal = (mealId) => {
  const meals = loadMeals()
  const updatedMeals = meals.filter(meal => meal.id !== mealId)
  saveMeals(updatedMeals)
}

// Obtener estadísticas de comidas
export const getMealStats = () => {
  const meals = loadMeals()
  const today = new Date().toISOString().split('T')[0]
  const thisWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  
  return {
    total: meals.length,
    today: meals.filter(meal => meal.date === today).length,
    thisWeek: meals.filter(meal => meal.date >= thisWeek).length,
    byType: {
      desayuno: meals.filter(meal => meal.type === 'desayuno').length,
      comida: meals.filter(meal => meal.type === 'comida').length,
      cena: meals.filter(meal => meal.type === 'cena').length
    }
  }
}

// Exportar todas las comidas (para backup)
export const exportMeals = () => {
  const meals = loadMeals()
  const dataStr = JSON.stringify(meals, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
  
  const exportFileDefaultName = `rexistro-backup-${new Date().toISOString().split('T')[0]}.json`
  
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

// Importar comidas (desde backup)
export const importMeals = (jsonData) => {
  try {
    const meals = JSON.parse(jsonData)
    if (Array.isArray(meals)) {
      saveMeals(meals)
      return { success: true, count: meals.length }
    } else {
      return { success: false, error: 'Formato de datos inválido' }
    }
  } catch (error) {
    return { success: false, error: 'Error al procesar el archivo' }
  }
}
