function SuggestionModal({ mealType, suggestions, onClose, onAddFromSuggestion }) {
  const mealTypeLabels = {
    desayuno: 'Desayuno',
    comida: 'Comida',
    cena: 'Cena'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const getDaysAgoText = (days) => {
    if (days === 0) return 'Hoy'
    if (days === 1) return 'Ayer'
    return `hace ${days} días`
  }

  const getFrequencyText = (frequency) => {
    if (frequency === 0) return 'No consumida en los últimos 10 días'
    if (frequency === 1) return '1 vez en los últimos 10 días'
    return `${frequency} veces en los últimos 10 días`
  }

  const handleAddMeal = (suggestion) => {
    onAddFromSuggestion(suggestion)
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Sugerencia de {mealTypeLabels[mealType]}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="suggestion-content">
          {suggestions.length === 0 ? (
            <div className="no-suggestions">
              <p>No hay comidas registradas para generar sugerencias.</p>
              <p>¡Registra algunas comidas primero!</p>
            </div>
          ) : (
            <div className="suggestions-list">
              <p className="suggestion-intro">
                Sugerencias basadas en frecuencia y tiempo desde la última vez:
              </p>
              {suggestions.map(meal => (
                <div key={meal.id} className="suggestion-item">
                  <div className="suggestion-header">
                    <h4>{meal.name}</h4>
                    <div className="suggestion-stats">
                      <span className="frequency-badge">
                        {getFrequencyText(meal.frequency)}
                      </span>
                    </div>
                  </div>
                  {meal.description && (
                    <p className="suggestion-description">{meal.description}</p>
                  )}
                  <div className="suggestion-footer">
                    <span className="suggestion-date">
                      Última vez: {formatDate(meal.date)} ({getDaysAgoText(meal.daysAgo)})
                    </span>
                    <button 
                      className="btn btn-primary btn-small"
                      onClick={() => handleAddMeal(meal)}
                    >
                      ➕ Añadir hoy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="form-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuggestionModal
