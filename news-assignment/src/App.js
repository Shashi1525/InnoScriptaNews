import React from 'react';
import { useState } from 'react';
import {BrowserRouter, Routes, Route  } from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/Search';
import Settings from './pages/Settings';
import NavBar from './components/NavBar';

function App() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <BrowserRouter>
        <NavBar activeTab={activeTab} setActiveTab={handleTabClick}/>
        <div className='container-wrapper'>
            <Routes>
              <Route path="/" element={<Home activeTab={activeTab} setActiveTab={handleTabClick}/>} > </Route>
              <Route path="/search" element={<SearchPage activeTab={activeTab} setActiveTab={handleTabClick}/>} > </Route>
              <Route path="/settings" element={<Settings/>} > </Route>
            </Routes>
            
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;