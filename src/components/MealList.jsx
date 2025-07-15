import './MealTabs.css'
import { deleteMeal } from '../utils/storage'

function MealList({ meals, mealType, onDeleteMeal }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (meals.length === 0) {
    return (
      <div className="empty-state">
        <h3>No hay comidas registradas</h3>
        <p>Registra tu primera comida para {mealType}</p>
      </div>
    )
  }

  return (
    <div className="meal-list">
      <h3>Historial de {mealType}</h3>
      <div className="meal-items">
        {meals.map(meal => (
          <div key={meal.id} className="meal-item">
            <div className="meal-header">
              <h4>{meal.name}</h4>
              <span className="meal-time">{formatTime(meal.createdAt)}</span>
            </div>
            {meal.description && (
              <p className="meal-description">{meal.description}</p>
            )}
            <div className="meal-footer">
              <span className="meal-date">{formatDate(meal.date)}</span>
              <button className="btn btn-danger btn-small" onClick={() => onDeleteMeal(meal.id)} title="Eliminar">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MealList
