import { useState } from 'react'

function IAConfigModal({ isOpen, onClose, onSave, initialConfig }) {
  const [openAIApiKey, setOpenAIApiKey] = useState(initialConfig.openAIApiKey || '')
  const [hfApiKey, setHfApiKey] = useState(initialConfig.hfApiKey || '')

  const handleSave = () => {
    onSave({ openAIApiKey, hfApiKey })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Configuración de IA</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <label>
            API Key de OpenAI (ChatGPT):
            <input
              type="password"
              value={openAIApiKey}
              onChange={e => setOpenAIApiKey(e.target.value)}
              placeholder="sk-..."
              autoComplete="off"
            />
          </label>
          <label>
            API Key de Hugging Face:
            <input
              type="password"
              value={hfApiKey}
              onChange={e => setHfApiKey(e.target.value)}
              placeholder="hf_..."
              autoComplete="off"
            />
          </label>
          <p className="info">Las claves se guardan solo en tu navegador.</p>
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" onClick={handleSave}>Guardar</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default IAConfigModal
