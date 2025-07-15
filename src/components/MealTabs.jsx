import { useState } from 'react'

const MEAL_TYPES = {
  desayuno: { icon: '🌅', label: 'Desayuno' },
  comida: { icon: '☀️', label: 'Comida' },
  cena: { icon: '🌙', label: 'Cena' }
}

function MealTabs({ activeTab, onTabChange, onShowForm, onShowSuggestion, onShowIAConfig }) {
  return (
    <div className="meal-tabs">
      <div className="tab-nav">
        {Object.entries(MEAL_TYPES).map(([key, { icon, label }]) => (
          <button
            key={key}
            className={`tab-btn ${activeTab === key ? 'active' : ''}`}
            onClick={() => onTabChange(key)}
          >
            <span className="tab-icon">{icon}</span>
            {label}
          </button>
        ))}
      </div>
      
      <div className="tab-content">
        <div className="section-header">
          <h2>{MEAL_TYPES[activeTab].label}</h2>
          <div className="action-buttons">
            <button 
              className="btn btn-primary" 
              onClick={() => onShowForm(activeTab)}
            >
              ➕ Registrar
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => onShowSuggestion(activeTab)}
            >
              💡 Sugerencia
            </button>
            <button
              className="btn btn-config"
              onClick={onShowIAConfig}
              title="Configurar IA"
            >
              🤖 IA
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MealTabs
