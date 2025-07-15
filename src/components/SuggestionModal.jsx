function SuggestionModal({ mealType, suggestions, onClose }) {
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

  const getDaysAgo = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = today - date
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Hoy'
    if (diffDays === 1) return 'Ayer'
    return `Hace ${diffDays} días`
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
                Estas son las comidas que no has tomado hace más tiempo:
              </p>
              {suggestions.map(meal => (
                <div key={meal.id} className="suggestion-item">
                  <div className="suggestion-header">
                    <h4>{meal.name}</h4>
                    <span className="last-eaten">{getDaysAgo(meal.date)}</span>
                  </div>
                  {meal.description && (
                    <p className="suggestion-description">{meal.description}</p>
                  )}
                  <div className="suggestion-footer">
                    <span className="suggestion-date">
                      Última vez: {formatDate(meal.date)}
                    </span>
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
