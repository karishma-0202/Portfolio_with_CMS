import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Resume from './pages/Resume'
import Feedback from './pages/Feedback'
import Contact from './pages/Contact'

function App() {
return ( <BrowserRouter> <Routes>
<Route element={<Layout />}>
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/skills" element={<Skills />} />
<Route path="/projects" element={<Projects />} />
<Route path="/experience" element={<Experience />} />
<Route path="/resume" element={<Resume />} />
<Route path="/feedback" element={<Feedback />} />
<Route path="/contact" element={<Contact />} />
<Route
path="*"
element={ <div className="px-5 py-24 text-center"> <h1 className="text-3xl font-bold">Page not found</h1> <p className="mt-3 text-slate-600">The page you requested doesn't exist.</p> </div>
}
/> </Route> </Routes> </BrowserRouter>
)
}

export default App
