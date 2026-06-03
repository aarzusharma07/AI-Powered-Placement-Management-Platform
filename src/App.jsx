import React, { useContext, useState } from 'react'
import { AppContext } from './context/AppContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import StudentView from './views/StudentView'
import RecruiterView from './views/RecruiterView'
import './index.css'

function App() {
  const { currentRole } = useContext(AppContext)
  const [activeView, setActiveView] = useState('home')

  // Determine which view to render based on current role
  const renderView = () => {
    if (currentRole === 'student') {
      return <StudentView activeView={activeView} />
    } else if (currentRole === 'recruiter') {
      return <RecruiterView activeView={activeView} />
    } else if (currentRole === 'officer') {
      return <RecruiterView activeView={activeView} /> // Placeholder: Can create OfficerView later
    } else if (currentRole === 'admin') {
      return <RecruiterView activeView={activeView} /> // Placeholder: Can create AdminView later
    }
    return <StudentView activeView={activeView} />
  }

  return (
    <div className="app-container">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="app-main">
        <Navbar setActiveView={setActiveView} />
        <main className="app-content">
          {renderView()}
        </main>
      </div>
    </div>
  )
}

export default App
