import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Contact from './components/sections/Contact'
import HomePage           from './pages/HomePage'
import AboutPage          from './pages/AboutPage'
import SkillsPage         from './pages/SkillsPage'
import ProjectsPage       from './pages/ProjectsPage'
import WorkflowPage       from './pages/WorkflowPage'
import ExperiencePage     from './pages/ExperiencePage'
import CertificationsPage from './pages/CertificationsPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-nav">Skip to main content</a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/"               element={<HomePage />} />
          <Route path="/about"          element={<AboutPage />} />
          <Route path="/skills"         element={<SkillsPage />} />
          <Route path="/projects"       element={<ProjectsPage />} />
          <Route path="/workflow"       element={<WorkflowPage />} />
          <Route path="/experience"     element={<ExperiencePage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
        </Routes>
        <Contact />
      </main>
      <Footer />
    </>
  )
}
