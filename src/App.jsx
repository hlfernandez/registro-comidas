import { useState, useEffect } from 'react'
import './App.css'
import MealTabs from './components/MealTabs'
import MealList from './components/MealList'
import MealForm from './components/MealForm'
import SuggestionModal from './components/SuggestionModal'
import IAConfigModal from './components/IAConfigModal'
import { loadMeals, saveMeal, getMealsByType, getSmartSuggestions, getUniqueMealNames, deleteMeal } from './utils/storage'
import { getIASuggestions } from './utils/ia'

function App() {
  const [activeTab, setActiveTab] = useState('desayuno')
  const [showForm, setShowForm] = useState(false)
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [showIAConfig, setShowIAConfig] = useState(false)
  const [meals, setMeals] = useState([])
  const [currentMealType, setCurrentMealType] = useState('')
  const [iaConfig, setIAConfig] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('rexistro-ia-config')) || {}
    } catch {
      return {}
    }
  })
  const [iaSuggestions, setIASuggestions] = useState([])
  const [loadingIASuggestions, setLoadingIASuggestions] = useState(false)

  useEffect(() => {
    const allMeals = loadMeals()
    setMeals(allMeals)
  }, [])

  const handleSaveMeal = (mealData) => {
    const newMeal = {
      ...mealData,
      id: Date.now(),
      type: currentMealType,
      createdAt: new Date().toISOString()
    }
    
    saveMeal(newMeal)
    setMeals(loadMeals())
    setShowForm(false)
  }

  const handleShowForm = (mealType) => {
    setCurrentMealType(mealType)
    setShowForm(true)
  }

  const handleShowIAConfig = () => setShowIAConfig(true)
  const handleSaveIAConfig = (config) => {
    setIAConfig(config)
    localStorage.setItem('rexistro-ia-config', JSON.stringify(config))
  }

  const handleShowSuggestion = async (mealType) => {
    setCurrentMealType(mealType)
    setShowSuggestion(true)
    setLoadingIASuggestions(true)
    // IA: obtener sugerencias IA (máx 3)
    const historial = getMealsByType(mealType)
    const iaSugs = await getIASuggestions({ historial, ...iaConfig, limit: 3 })
    setIASuggestions(iaSugs)
    setLoadingIASuggestions(false)
  }

  const getSuggestions = (mealType) => {
    const mealsByType = getMealsByType(mealType)
    return getSmartSuggestions(mealsByType, 3)
  }

  const getUniqueMealNamesForType = (mealType) => {
    return getUniqueMealNames(mealType)
  }

  const handleAddFromSuggestion = (suggestionMeal) => {
    const newMeal = {
      name: suggestionMeal.name,
      description: suggestionMeal.description || '',
      date: new Date().toISOString().split('T')[0],
      id: Date.now(),
      type: currentMealType,
      createdAt: new Date().toISOString()
    }
    
    saveMeal(newMeal)
    setMeals(loadMeals())
    setShowSuggestion(false)
  }

  const handleDeleteMeal = (mealId) => {
    deleteMeal(mealId)
    setMeals(loadMeals())
  }

  const currentMeals = getMealsByType(activeTab)

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍽️ Rexistro</h1>
        <p>Registro de comidas por franja horaria</p>
      </header>

      <MealTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onShowForm={handleShowForm}
        onShowSuggestion={handleShowSuggestion}
        onShowIAConfig={handleShowIAConfig}
      />

      <main className="app-main">
        <MealList meals={currentMeals} mealType={activeTab} onDeleteMeal={handleDeleteMeal} />
      </main>

      {showForm && (
        <MealForm
          mealType={currentMealType}
          existingMealNames={getUniqueMealNamesForType(currentMealType)}
          onSave={handleSaveMeal}
          onCancel={() => setShowForm(false)}
        />
      )}

      {showSuggestion && (
        <SuggestionModal
          mealType={currentMealType}
          suggestions={getSuggestions(currentMealType)}
          iaSuggestions={iaSuggestions}
          loadingIASuggestions={loadingIASuggestions}
          onClose={() => setShowSuggestion(false)}
          onAddFromSuggestion={handleAddFromSuggestion}
        />
      )}
      {showIAConfig && (
        <IAConfigModal
          isOpen={showIAConfig}
          onClose={() => setShowIAConfig(false)}
          onSave={handleSaveIAConfig}
          initialConfig={iaConfig}
        />
      )}
    </div>
  )
}

export default App
