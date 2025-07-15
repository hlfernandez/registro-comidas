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

// Obtener las comidas más antiguas por tipo para sugerencias
export const getOldestMeals = (meals, limit = 3) => {
  // Agrupar por nombre de comida y obtener la fecha más reciente de cada una
  const mealsByName = meals.reduce((acc, meal) => {
    const key = meal.name.toLowerCase()
    if (!acc[key] || new Date(meal.date) > new Date(acc[key].date)) {
      acc[key] = meal
    }
    return acc
  }, {})

  // Convertir a array y ordenar por fecha más antigua
  return Object.values(mealsByName)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, limit)
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
