import { useState, useEffect } from 'react'
import './App.css'
import MealTabs from './components/MealTabs'
import MealList from './components/MealList'
import MealForm from './components/MealForm'
import SuggestionModal from './components/SuggestionModal'
import { loadMeals, saveMeal, getMealsByType, getOldestMeals } from './utils/storage'

function App() {
  const [activeTab, setActiveTab] = useState('desayuno')
  const [showForm, setShowForm] = useState(false)
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [meals, setMeals] = useState([])
  const [currentMealType, setCurrentMealType] = useState('')

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

  const handleShowSuggestion = (mealType) => {
    setCurrentMealType(mealType)
    setShowSuggestion(true)
  }

  const getSuggestions = (mealType) => {
    const mealsByType = getMealsByType(mealType)
    return getOldestMeals(mealsByType, 3)
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
      />

      <main className="app-main">
        <MealList meals={currentMeals} mealType={activeTab} />
      </main>

      {showForm && (
        <MealForm
          mealType={currentMealType}
          onSave={handleSaveMeal}
          onCancel={() => setShowForm(false)}
        />
      )}

      {showSuggestion && (
        <SuggestionModal
          mealType={currentMealType}
          suggestions={getSuggestions(currentMealType)}
          onClose={() => setShowSuggestion(false)}
        />
      )}
    </div>
  )
}

export default App
