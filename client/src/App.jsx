import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Assessment from './pages/Assessment'
import Dashboard from './pages/Dashboard'
import CareerDetails from './pages/CareerDetails'
import AIResults from './pages/AIResults'
import CollegeFinder from './pages/CollegeFinder'
import JobFinder from './pages/JobFinder'
import Courses from './pages/Courses'
import Footer from './components/Footer'
import AIAssistant from './components/AIAssistant'

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/assessment" element={<Assessment />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/career/:id" element={<CareerDetails />} />
                    <Route path="/results" element={<AIResults />} />
                    <Route path="/colleges" element={<CollegeFinder />} />
                    <Route path="/jobs" element={<JobFinder />} />
                    <Route path="/courses" element={<Courses />} />
                </Routes>
            </main>
            <Footer />
            {/* AI Assistant floating chatbot — visible on all pages */}
            <AIAssistant />
        </div>
    )
}

export default App
