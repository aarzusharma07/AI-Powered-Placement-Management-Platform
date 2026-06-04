import React, { useState, useContext, useEffect, useRef } from 'react'
import { AppContext } from '../context/AppContext'

const AiAssistant = () => {
  const { currentRole, chatHistory, sendAiMessage, isAiLoading } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [chatHistory, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    sendAiMessage(input, currentRole)
    setInput('')
  }

  const getPresets = () => {
    switch (currentRole) {
      case 'student':
        return [
          'Resume score tips',
          'Academic CGPA mismatch help',
          'Microsoft drive interview prep'
        ]
      case 'recruiter':
        return [
          'Highest matching candidates',
          'Draft React Engineer job description',
          'Suggest technical test topics'
        ]
      case 'officer':
        return [
          'Placement stats summary',
          'Review GPA audit warnings',
          'Draft drive notice text'
        ]
      default:
        return [
          'System health log check',
          'API tokens usage report'
        ]
    }
  }

  const handlePresetClick = (preset) => {
    sendAiMessage(preset, currentRole)
  }

  return (
    <div className="ai-copilot-container">
      {isOpen ? (
        <div className="ai-copilot-window glass-card">
          <div className="ai-copilot-header">
            <div>
              <span className="ai-copilot-title">AI Copilot</span>
              <span className="ai-copilot-subtitle">Active Mode: {currentRole.toUpperCase()}</span>
            </div>
            <button className="ai-copilot-close" onClick={() => setIsOpen(false)}>
              [ Close ]
            </button>
          </div>

          <div className="ai-copilot-messages">
            {chatHistory.map((msg) => (
              <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                <div style={{ fontWeight: '600', fontSize: '0.7rem', marginBottom: '0.15rem', color: 'var(--primary)' }}>
                  {msg.sender === 'ai' ? 'CO-PILOT' : 'YOU'}
                </div>
                <div>{msg.text}</div>
                <span className="chat-bubble-time">{msg.timestamp}</span>
              </div>
            ))}
            {isAiLoading && (
              <div className="chat-bubble ai">
                <div style={{ color: 'var(--text-muted)' }}>Thinking...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-copilot-presets">
            {getPresets().map((preset) => (
              <button
                key={preset}
                className="preset-chip"
                onClick={() => handlePresetClick(preset)}
              >
                {preset}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="ai-copilot-input-area">
            <input
              type="text"
              className="ai-copilot-input"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="ai-copilot-send">
              Send
            </button>
          </form>
        </div>
      ) : (
        <button className="ai-copilot-toggle" onClick={() => setIsOpen(true)}>
          AI Copilot
        </button>
      )}
    </div>
  )
}

export default AiAssistant
