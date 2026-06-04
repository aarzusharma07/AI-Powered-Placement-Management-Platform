import React, { useContext, useState } from 'react'
import { AppContext } from './context/AppContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import LoginView from './views/LoginView'
import StudentView from './views/StudentView'
import RecruiterView from './views/RecruiterView'
import OfficerView from './views/OfficerView'
import AdminView from './views/AdminView'
import SimulationHubView from './views/SimulationHubView'
import AiAssistant from './components/AiAssistant'
import './index.css'

function App() {
  const { currentRole, isAuthenticated } = useContext(AppContext)
  const [activeView, setActiveView] = useState('deliverables')

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginView />
  }

  // Determine which view to render based on current role or active view
  const renderView = () => {
    if (activeView === 'deliverables') {
      return <SimulationHubView />
    }

    if (currentRole === 'student') {
      return <StudentView activeView={activeView} />
    } else if (currentRole === 'recruiter') {
      return <RecruiterView activeView={activeView} setActiveView={setActiveView} />
    } else if (currentRole === 'officer') {
      return <OfficerView activeView={activeView} />
    } else if (currentRole === 'admin') {
      return <AdminView activeView={activeView} />
    }
    return <StudentView activeView={activeView} />
  }

  return (
    <div className="app-container">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="main-content">
        <Navbar setActiveView={setActiveView} />
        <main className="app-content-body" style={{ flexGrow: 1 }}>
          {renderView()}
        </main>
      </div>
      <AiAssistant />
    </div>
  )
}

export default App
