import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';

function App() {
  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error('Ошибка:', err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
         <Route path="/feedback" element={<Feedback/>} />
      </Routes>
    </Router>
  )
}

export default App
