import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import Article from './pages/Article';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
         <Route path="/feedback" element={<Feedback/>} />
         <Route path="/news/:id" element={<Article/>} />
      </Routes>
    </Router>
  )
}

export default App
