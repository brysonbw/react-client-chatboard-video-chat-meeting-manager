import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import './index.css';
import Home from './pages/home/Home';
import PageNotFound from './pages/pagenotfound/PageNotFound';

function App() {
  return (
    <div className="App">
     <Navbar />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
     </Routes>
    </div>
  );
}

export default App;
