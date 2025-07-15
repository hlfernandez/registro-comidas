import { useState, useEffect } from 'react'
import { getMealDetailsByName } from '../utils/storage'

function MealForm({ mealType, existingMealNames, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return
    
    onSave(formData)
  }

  const handleNameChange = (e) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, name: value }))
    
    // Filtrar sugerencias basadas en la entrada
    if (value.trim()) {
      const filtered = existingMealNames.filter(name => 
        name.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
      setFilteredSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestionName) => {
    setFormData(prev => ({ ...prev, name: suggestionName }))
    setShowSuggestions(false)
    
    // Autocompletar descripción si existe
    const mealDetails = getMealDetailsByName(suggestionName, mealType)
    if (mealDetails && mealDetails.description) {
      setFormData(prev => ({ ...prev, description: mealDetails.description }))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNameFocus = () => {
    if (existingMealNames.length > 0) {
      setFilteredSuggestions(existingMealNames)
      setShowSuggestions(true)
    }
  }

  const handleNameBlur = () => {
    // Retrasar el ocultamiento para permitir clics en sugerencias
    setTimeout(() => setShowSuggestions(false), 200)
  }

  const mealTypeLabels = {
    desayuno: 'Desayuno',
    comida: 'Comida',
    cena: 'Cena'
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Registrar {mealTypeLabels[mealType]}</h3>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="meal-form">
          <div className="form-group">
            <label htmlFor="name">Nombre de la comida:</label>
            <div className="autocomplete-container">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                onFocus={handleNameFocus}
                onBlur={handleNameBlur}
                required
                placeholder="Ej: Tostadas con aguacate"
                autoComplete="off"
              />
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="suggestions-dropdown">
                  {filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item-dropdown"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Descripción (opcional):</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Describe los ingredientes o detalles adicionales"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Fecha:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MealForm
